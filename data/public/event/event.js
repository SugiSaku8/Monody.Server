const event = {
	set:function(value){
		//EventInfo
		const Status = value.status;
		const Info = value.info;
		const Title = Info.title;
		const Mini = Info.mini;
		const Medium = Info.medium;
		const Long = Info.long
		const Loong = Info.loong;
		//Missions
		const Missions = value.data.mission;
		const I = Missions.levelI;
		const II = Missions.levelII;
		const III = Missions.LevelIII;
		const IIII = Missions.LevelIIII;
		const V = Missions.LevelV;
		const VI = Missions.LevelVI;
		const VII = Missions.LevelVII;
		const VIII = Missions.LevelVIII;
		const IX = Missions.LevelIX;
		const X = Missions.LevelX;
		const XI = Missions.LevelXI;
		const XII = Missions.LevelXII;
		const Max = Missions.LevelMax;
		const Special = Missions.Special;
		//Story
		const Story = value.other.story.q + "\n" + value.other.story.w + "\n" + value.other.story.e + "\n" + value.other.story.r + "\n" + value.other.story.t + "\n" + value.other.story.y + "\n" + value.other.story.u + "\n" + value.other.story.i;
		//images
		const Src = value.img.Main;
		document.getElementById('Event_title').textContent = Title;
		document.getElementById('mijikai').textContent = Mini;
		document.getElementById('hutuu').textContent = Medium;
		document.getElementById('nagai').textContent = Long;
		document.getElementById('nagasugi').textContent = Loong;
		document.getElementById('titleIMG').src = Src;
		function updateMission(level, missionInfo) {
		    const missionDiv = document.createElement('div');
		    missionDiv.textContent = `Level ${level}: `+ missionInfo;
		    document.getElementById('mission').appendChild(missionDiv);
		}
		updateMission('I', I);
		/*
		updateMission('II', II);
		updateMission('III', III);
		updateMission('IIII', IIII);
		updateMission('V', V);
		updateMission('VI', VI);
		updateMission('VII', VII);
		updateMission('VIII', VIII);
		updateMission('IX', IX);
		updateMission('X', X);
		updateMission('XI', XI);
		updateMission('XII', XII);
		updateMission('Max', Max);
		updateMission('Special', Special);
		*/
		document.getElementById('story').textContent = Story;
		//hidden
		var elements = document.getElementsByClassName('text');
		for (var i = 0; i < elements.length; i++) {
		    elements[i].style.display = 'none';
		}

		document.getElementById('titleIMG').style.display = 'none';
		//auto
		document.getElementById('Event_title').style.display = 'block';
		document.getElementById('titleIMG').style.display = 'block';
		document.getElementById('mijikai').style.display = 'block';
		document.getElementById('Close_eve').addEventListener('click', function() {
		    document.getElementById('Event').style.display = 'none';
		});
	}
}
function GetEventInfo(){
	fetch('./event/event/event.json')
	 .then(response => response.json())
	 .then(data => {
	event.set(data);
	 })
	 .catch(error => console.error('Error:', error));
}
//GetEventInfo();
//過去イチうまくいってる。