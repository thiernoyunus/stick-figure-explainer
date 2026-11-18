import json, wave
from pathlib import Path
p=Path(__file__).parent
script=(p/'script.txt').read_text().strip().split('\n\n')
with wave.open(str(p/'assets/outro-question.wav')) as recording:
 outro_seconds=recording.getnframes()/recording.getframerate()
duration=round(61+outro_seconds,3)
# Caption starts come from the generated recording's word-timed transcript.
rows=[
('hook','map-open',0,5.55,4.8,'LOOK AT THE MAP',['Why a separate','continent?'],'#4969a0',[(0,'Why is Europe a separate continent?'),(2.7,"There's no ocean separating it from Asia.")]),
('connected','walk-map',5.55,12.9,6.75,'PORTUGAL → CHINA',['The mainland','is connected.'],'#28765a',[(0,'Look at a map.'),(1.37,'From Portugal to China,'),(3.01,'the mainland is connected.'),(4.65,'No ocean separates Europe from Asia.')]),
('eurasia','name-eurasia',12.9,16.05,2.44,'ONE CONNECTED LANDMASS',['It has a name.','Eurasia.'],'#28765a',[(0,'That landmass has a name:'),(2,'Eurasia.')]),
('definition','definition-book',16.05,21.75,4.95,'IF CONTINENT = A SEPARATE LANDMASS',['Europe doesn’t','qualify alone.'],'#b45309',[(0,'If a continent is a major, separate landmass,'),(3.45,"Europe doesn't qualify on its own.")]),
('origin','history-atlas',21.75,24.75,2.17,'FOLLOW THE HISTORY',['Where did the','division begin?'],'#b45309',[(0,'So where did the division come from?')]),
('identity','place-labels',24.75,35.15,9.49,'ANCIENT GREEK DISTINCTIONS',['Identity.','Politics.'],'#b45309',[(0,'Ancient Greek thinkers distinguished Europe from Asia,'),(3.09,'including their Persian rivals.'),(4.79,'The separation became tied to identity and politics—'),(8.17,'not just the shape of the land.')]),
('boundary','draw-boundary',35.15,43.82,7.91,'A CONVENTIONAL BOUNDARY • SCHEMATIC',['A line doesn’t','split the land.'],'#b45309',[(0,'Later, European geographers chose the Ural Mountains'),(3.42,'as a boundary.'),(4.77,'But drawing a line across a landmass'),(6.55,"doesn't create another one.")]),
('schools','school-books',43.82,53.77,9.24,'GEOGRAPHY ISN’T TAUGHT ONE WAY',['Some textbooks','teach Eurasia.'],'#4969a0',[(0,"The seven-continent system isn't taught everywhere."),(3.38,'Russian and Japanese school materials'),(4.78,'describe Eurasia as one continent,'),(7.08,'with Europe and Asia as regions within it.')]),
('closing','one-landmass',53.77,60,5.25,'ONE LANDMASS • HISTORICAL LABELS',['A historical','division.'],'#28765a',[(0,"Europe's separate-continent status"),(1.97,'comes from a historical division—'),(3.91,'not a separate piece of the Earth.')]),
('question','map-question',60,duration,outro_seconds,'WHAT WOULD YOU CALL IT?',['Europe—or','Eurasia?'],'#4969a0',[(0,'So, would you call Europe a continent—'),(2.2,'or part of Eurasia?'),(4.22,'Tell me in the comments.')])]
# Script paragraphs six/seven each cover two narration sentences; preserve the approved words.
assert len(script)==len(rows)==10
beats=[]
for (id,scene,start,end,voice,eyebrow,title,accent,caps),narration in zip(rows,script):
 beats.append(dict(id=id,scene=scene,start=start,duration=round(end-start,3),voiceDuration=voice,eyebrow=eyebrow,title=title,accent=accent,narration=narration,captions=[x[1] for x in caps],captionStarts=[x[0] for x in caps]))
data=dict(title='Why is Europe a separate continent?',outputFile='europe-continent.mp4',width=1080,height=1920,fps=30,duration=duration,safe=dict(left=60,top=220,right=960,bottom=1500),contactChecks=json.loads((p/'assets/contact-targets.json').read_text()),beats=beats)
assert all(abs(a['start']+a['duration']-b['start'])<.001 for a,b in zip(beats,beats[1:]))
assert '\n\n'.join(b['narration'] for b in beats)==(p/'script.txt').read_text().strip()
(p/'content.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

# Keep the standalone drawing file usable by the native check and export tools.
(p/'scenes.js').write_text((p/'assets/map-data.js').read_text()+'\n'+(p/'scene-drawings.js').read_text())
