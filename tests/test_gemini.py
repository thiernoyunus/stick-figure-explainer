import base64
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import urllib.error
import wave

spec = importlib.util.spec_from_file_location('tts', Path(__file__).parents[1] / 'scripts/gemini-tts.py')
tts = importlib.util.module_from_spec(spec)
spec.loader.exec_module(tts)


class AdapterTests(unittest.TestCase):
    def test_preserves_transcript_and_writes_audio_without_key(self):
        buffer = io.BytesIO()
        with wave.open(buffer, 'wb') as wav:
            wav.setnchannels(1); wav.setsampwidth(2); wav.setframerate(24000); wav.writeframes(b'\x01\x00' * 240)
        payload = {'steps': [{'type': 'model_output', 'content': [{'type': 'audio', 'data': base64.b64encode(buffer.getvalue()).decode()}]}]}
        with tempfile.TemporaryDirectory() as folder:
            script = Path(folder) / 'input.txt'; output = Path(folder) / 'voice.wav'
            transcript = 'shara and ishtara. وَمَا أَدْرَاكَ\n'; script.write_text(transcript)
            def respond(request, timeout):
                self.assertEqual(json.loads(request.data)['input'][0]['content'][0]['text'], transcript)
                return io.BytesIO(json.dumps(payload).encode())
            with patch.object(tts.urllib.request, 'urlopen', side_effect=respond):
                tts.generate(script, output, 'test-secret', 'test-model', 'Charon', 'clear')
            self.assertEqual(output.read_bytes(), buffer.getvalue())
            self.assertNotIn('test-secret', output.with_suffix('.generation.json').read_text())
            with self.assertRaisesRegex(ValueError, 'already exists'):
                tts.generate(script, output, 'test-secret', 'test-model', 'Charon', 'clear')

    def test_redacts_service_error(self):
        with tempfile.TemporaryDirectory() as folder:
            script = Path(folder) / 'input.txt'; script.write_text('Hello')
            error = urllib.error.HTTPError('https://example.test', 401, 'Denied', {}, io.BytesIO(b'test-secret denied'))
            with patch.object(tts.urllib.request, 'urlopen', side_effect=error):
                with self.assertRaises(ValueError) as caught:
                    tts.generate(script, Path(folder) / 'out.wav', 'test-secret', 'test-model', 'Charon', 'clear')
            self.assertNotIn('test-secret', str(caught.exception))
            self.assertFalse((Path(folder) / 'out.wav').exists())


if __name__ == '__main__':
    unittest.main()
