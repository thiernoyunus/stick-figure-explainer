"""Optional Gemini narration; supplied recordings need no API or Python packages."""
import argparse
import base64
import getpass
import io
import json
import os
from pathlib import Path
import urllib.error
import urllib.request
import wave


def generate(script, destination, key, model, voice, style):
    metadata = destination.with_suffix('.generation.json')
    if destination.exists() or metadata.exists():
        raise ValueError('Audio or metadata already exists; choose a new output file.')
    transcript = script.read_text(encoding='utf-8')
    if not transcript.strip():
        raise ValueError('The speech transcript is empty.')
    body = {
        'model': model,
        'input': [{'type': 'user_input', 'content': [{
            'type': 'text', 'text': transcript,
            'annotations': [{'type': 'speech_metadata', 'style': style}],
        }]}],
        'response_format': {'type': 'audio'},
        'generation_config': {'speech_config': [{'voice': voice}]},
    }
    request = urllib.request.Request(
        'https://generativelanguage.googleapis.com/v1beta/interactions',
        data=json.dumps(body).encode(),
        headers={'x-goog-api-key': key, 'Content-Type': 'application/json'},
    )
    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            result = json.load(response)
    except urllib.error.HTTPError as error:
        message = error.read().decode(errors='replace').replace(key, '[redacted]')
        raise ValueError(f'Gemini returned {error.code}: {message[:800]}') from None
    except urllib.error.URLError as error:
        raise ValueError(f'Gemini connection failed: {str(error.reason).replace(key, "[redacted]")}') from None
    audio = [c for step in result.get('steps', []) if step.get('type') == 'model_output'
             for c in step.get('content', []) if c.get('type') == 'audio']
    if not audio:
        raise ValueError('Gemini returned no audio; nothing was written.')
    wav = base64.b64decode(audio[-1]['data'], validate=True)
    with wave.open(io.BytesIO(wav), 'rb') as recording:
        if recording.getnframes() <= 0 or recording.getnchannels() <= 0:
            raise ValueError('Gemini returned an empty recording; nothing was written.')
    with destination.open('xb') as output:
        output.write(wav)
    with metadata.open('x', encoding='utf-8') as output:
        json.dump({'model': model, 'voice': voice, 'bytes': len(wav), 'usage': result.get('usage')}, output, indent=2)
    return len(wav)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('script', type=Path)
    parser.add_argument('destination', type=Path)
    parser.add_argument('--model', default='gemini-3.8-flash-tts')
    parser.add_argument('--voice', default='Charon')
    parser.add_argument('--style', default='warm, conversational, clear; moderate pace')
    args = parser.parse_args()
    key = os.environ.get('GEMINI_API_KEY') or getpass.getpass('Gemini API key: ')
    if not key.strip():
        parser.error('A key is required only for Gemini generation; supplied audio needs no key.')
    try:
        size = generate(args.script, args.destination, key, args.model, args.voice, args.style)
    except (ValueError, OSError, wave.Error) as error:
        raise SystemExit(str(error).replace(key, '[redacted]')) from None
    print(f'Generated {size} bytes of WAV audio with {args.model} / {args.voice}.')
