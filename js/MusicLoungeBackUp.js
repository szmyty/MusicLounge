/*
 * File: MusicLounge.js
 * Created by Alan Szmyt
 * Email: szmyty@gmail.com
 * This file's purpose is to manipulate a Music Lounge that has been
 * modeled in Blender and exported to this file for use. 
 */
	
	
	/* Global Variables */	
	var scene, camera, renderer;
	var controls, guiControls, datGUI;
	var axis, grid;
	var spotLight, light;
	var stats;
	var SCREEN_WIDTH, SCREEN_HEIGHT;
	var mouse, raycaster;
	var Audio = [];
	var Albums = [];
	var Vinyls = [];
	var loop = true;
	var shuffle = false;
	var min = 0;
	var max = 9;
	var randomNumber;
	
	// Visualizer global variables
	var cube, cubeMaterial, cubeGeometry;
	var UtopiaVisualizer = [], KratomVisualizer = [], EmpathyVisualizer = [];
	var LayersVisualizer = [], FloatingVisualizer = [], InBetweenVisualizer = [], OUTTHERESOMEWHEREVisualizer = [];
	var DissonanceVisualizer = [], ISeeVisualizer = [], OdetotheAwakenedVisualizer = [];
	var UtopiafrequencyData, UtopiaAnalyser, UtopiaAudio, UtopiaAudioSrc;
	var KratomfrequencyData, KratomAnalyser, KratomAudio, KratomAudioSrc;
	var EmpathyfrequencyData, EmpathyAnalyser, EmpathyAudio, EmpathyAudioSrc;
	var LayersfrequencyData, LayersAnalyser, LayersAudio, LayersAudioSrc;
	var FloatingfrequencyData, FloatingAnalyser, FloatingAudio, FloatingAudioSrc;
	var InBetweenfrequencyData, InBetweenAnalyser, InBetweenAudio, InBetweenAudioSrc;
	var OUTTHERESOMEWHEREfrequencyData, OUTTHERESOMEWHEREAnalyser, OUTTHERESOMEWHEREAudio, OUTTHERESOMEWHEREAudioSrc;
	var DissonancefrequencyData, DissonanceAnalyser, DissonanceAudio, DissonanceAudioSrc;
	var ISeefrequencyData, ISeeAnalyser, ISeeAudio, ISeeAudioSrc;
	var OdetotheAwakenedfrequencyData, OdetotheAwakenedAnalyser, OdetotheAwakenedAudio, OdetotheAwakenedAudioSrc;
	
	// Animation global variables 
	var UtopiaPosition;
	var UtopiaTarget;
	var UtopiaTween;
	

 /* Function found on stack overflow. Answer was given by Druzion. */
 /* Returns a random number between two values (both are inclusive) */
function getRandomInt(min, max) {
    
	randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

}
	
	function PopUp( AudioIndex ){
		
		var song;
		var artwork;
		
		if(AudioIndex == 0){
		    song = "Utopia";
			artwork = "models/Utopia Baked.png";
			$("#Utopia").attr("controls", "controls");
		}
		else if(AudioIndex == 1){
			song = "Kratom";
			artwork = "models/Kratom Baked.png";
			$("#Kratom").attr("controls", "controls");
		}
		else if(AudioIndex == 2){
			song = "Empathy";
			artwork = "models/Empathy Baked.png";
			$("#Empathy").attr("controls", "controls");
		}
		else if(AudioIndex == 3){
			song = "Layers";
			artwork = "models/Layers Baked.png";
			$("#Layers").attr("controls", "controls");
		}
		else if(AudioIndex == 4){
			song = "Floating";
			artwork = "models/Floating Baked.png";
			$("#Floating").attr("controls", "controls");
		}
		else if(AudioIndex == 5){
			song = "In Between";
			artwork = "models/In Between Baked.png";
			$("#InBetween").attr("controls", "controls");
		}
		else if(AudioIndex == 6){
			song = "OUT THERE SOMEWHERE";
			artwork = "models/OUT THERE SOMEWHERE Baked.png";
			$("#OUTTHERESOMEWHERE").attr("controls", "controls");
		}
		else if(AudioIndex == 7){
			song = "Dissonance";
			artwork = "models/Dissonance Baked.png";
			$("#Dissonance").attr("controls", "controls");
		}
		else if(AudioIndex == 8){
			song = "I See";
			artwork = "models/I See Baked.png";
			$("#ISee").attr("controls", "controls");
		}
		else if(AudioIndex == 9){
			song = "Ode to the Awakened";
			artwork = "models/Ode to the Awakened Baked.png";
			$("#Ode to the Awakened").attr("controls", "controls");
		}
		
		$( "#overlay" ).empty();
		$( "#popup" ).append( "<div id='overlay'><button class='closeSong'>X</button><p id='nowPlaying'>Now Playing: " + song + "<br><br><img id='nowArtwork' height='90px' width:'80px' src='" + artwork + "'></p></div>" );
		//$("#popup").show();
		$("#popup").fadeIn('slow');
		$(".closeSong").click(function(){
		$('#popup').fadeOut('slow');
	});
	}	
	
	function StartVisualizer( AudioIndex ){

	
		if(AudioIndex == 0){
			//Start Utopia Visualizer
			
			for(var i = 0; i < 1000; i++){
				cubeGeometry = new THREE.BoxGeometry(.4,.4,.4);
				cubeMaterial = new THREE.MeshPhongMaterial({color: UtopiafrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(0);
				var max = Math.floor(10);
				var minY = Math.ceil(0);
				var maxY = Math.floor(4);
				
				cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
				/*x =+ 1;
				if(x == 10){
					z =+ 1;
					x = 0;
				}
				else if(z == 10){
					x = 0;
					y =+ 1;
					z =0;
				}
				cube.position.y = y;
				cube.position.z = z;*/
				
				UtopiaVisualizer.push(cube);
			}
			for(var j = 0; j < 1000; j++){
				scene.add(UtopiaVisualizer[j]);
			}
			//AnimateVinyl(0);
		}
		
		if(AudioIndex == 1){
			//Start Kratom Visualizer
			for(var i = 0; i < 2000; i++){
				cubeGeometry = new THREE.SphereGeometry(.4,.4,.4);
				cubeMaterial = new THREE.MeshPhongMaterial({color: EmpathyfrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(0);
				var max = Math.floor(30);
				var minY = Math.ceil(0);
				var maxY = Math.floor(8);
				
				cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
			
				
				KratomVisualizer.push(cube);
			}
			for(var j = 0; j < 2000; j++){
				scene.add(KratomVisualizer[j]);
			}
		}
		
		
		
		
		if(AudioIndex == 2){
			//Start Empathy Visualizer
			var x = -500;
			var xPos;
			for(var i = 0; i < 1000; i++){
				cubeGeometry = new THREE.SphereGeometry(.5,.5,.5);
				cubeMaterial = new THREE.MeshPhongMaterial({color: EmpathyfrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(-20);
				var max = Math.floor(20);
				var minY = Math.ceil(-10);
				var maxY = Math.floor(10);
				
				//cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
				xPos = Math.sin(x);
				xPos = xPos * 50;
				cube.position.set(xPos, (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1)  );
				x++;
				
				EmpathyVisualizer.push(cube);
			}
			for(var j = 0; j < 1000; j++){
				scene.add(EmpathyVisualizer[j]);
			}
		}
		
		if(AudioIndex == 3){
			//Start Layers Visualizer
			
			for(var i = 0; i < 1000; i++){
				cubeGeometry = new THREE.BoxGeometry(.4,.4,.4);
				cubeMaterial = new THREE.MeshPhongMaterial({color: LayersfrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(0);
				var max = Math.floor(10);
				var minY = Math.ceil(0);
				var maxY = Math.floor(4);
				
				cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
				
				LayersVisualizer.push(cube);
			}
			for(var j = 0; j < 1000; j++){
				scene.add(LayersVisualizer[j]);
			}
		}
		
		if(AudioIndex == 4){
			//Start Floating Visualizer
			
			for(var i = 0; i < 1000; i++){
				cubeGeometry = new THREE.BoxGeometry(.4,.4,.4);
				cubeMaterial = new THREE.MeshPhongMaterial({color: FloatingfrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(0);
				var max = Math.floor(10);
				var minY = Math.ceil(0);
				var maxY = Math.floor(4);
				
				cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
				
				FloatingVisualizer.push(cube);
			}
			for(var j = 0; j < 1000; j++){
				scene.add(FloatingVisualizer[j]);
			}
		}
		
		if(AudioIndex == 5){
			//Start In Between Visualizer
			
			for(var i = 0; i < 1000; i++){
				cubeGeometry = new THREE.BoxGeometry(.4,.4,.4);
				cubeMaterial = new THREE.MeshPhongMaterial({color: InBetweenfrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(0);
				var max = Math.floor(10);
				var minY = Math.ceil(0);
				var maxY = Math.floor(4);
				
				cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
				
				InBetweenVisualizer.push(cube);
			}
			for(var j = 0; j < 1000; j++){
				scene.add(InBetweenVisualizer[j]);
			}
		}
		
		if(AudioIndex == 6){
			//Start OUT THERE SOMEWHERE Visualizer
			
			for(var i = 0; i < 1000; i++){
				cubeGeometry = new THREE.BoxGeometry(.4,.4,.4);
				cubeMaterial = new THREE.MeshPhongMaterial({color: OUTTHERESOMEWHEREfrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(0);
				var max = Math.floor(10);
				var minY = Math.ceil(0);
				var maxY = Math.floor(4);
				
				cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
				
				OUTTHERESOMEWHEREVisualizer.push(cube);
			}
			for(var j = 0; j < 1000; j++){
				scene.add(OUTTHERESOMEWHEREVisualizer[j]);
			}
		}
		
		if(AudioIndex == 7){
			//Start Dissonance Visualizer
			
			for(var i = 0; i < 1000; i++){
				cubeGeometry = new THREE.BoxGeometry(.4,.4,.4);
				cubeMaterial = new THREE.MeshPhongMaterial({color: DissonancefrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(0);
				var max = Math.floor(10);
				var minY = Math.ceil(0);
				var maxY = Math.floor(4);
				
				cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
				
				DissonanceVisualizer.push(cube);
			}
			for(var j = 0; j < 1000; j++){
				scene.add(DissonanceVisualizer[j]);
			}
		}
		
		if(AudioIndex == 8){
			//Start I See Visualizer
			
			for(var i = 0; i < 1000; i++){
				cubeGeometry = new THREE.BoxGeometry(.4,.4,.4);
				cubeMaterial = new THREE.MeshPhongMaterial({color: ISeefrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(0);
				var max = Math.floor(10);
				var minY = Math.ceil(0);
				var maxY = Math.floor(4);
				
				cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
				
				ISeeVisualizer.push(cube);
			}
			for(var j = 0; j < 1000; j++){
				scene.add(ISeeVisualizer[j]);
			}
		}
		
		if(AudioIndex == 9){
			//Start Ode to the Awakened Visualizer
			
			for(var i = 0; i < 1000; i++){
				cubeGeometry = new THREE.BoxGeometry(.4,.4,.4);
				cubeMaterial = new THREE.MeshPhongMaterial({color: OdetotheAwakenedfrequencyData[i]*0x0033ff});
				cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.name = i;
				var min = Math.ceil(0);
				var max = Math.floor(10);
				var minY = Math.ceil(0);
				var maxY = Math.floor(4);
				
				cube.position.set((Math.floor(Math.random() * (max - min)) + min) * (Math.round(Math.random()) * 2 - 1) , (Math.floor(Math.random() * (maxY - minY)) + minY) * (Math.round(Math.random()) * 2 - 1), (Math.floor(Math.random() * (max - min)) + min) *  (Math.round(Math.random()) * 2 - 1));
				
				OdetotheAwakenedVisualizer.push(cube);
			}
			for(var j = 0; j < 1000; j++){
				scene.add(OdetotheAwakenedVisualizer[j]);
			}
		}
		
	}

	function StopVisualizer( AudioIndex ){
		
		if(AudioIndex == 0){
			removeControls(0);
			for(var i = 0; i < 1000; i++){
				scene.remove(UtopiaVisualizer[i]);
			}
			UtopiaVisualizer.length = 0; 
			//to clear the array
		}
		else if(AudioIndex == 1){
			removeControls(1);
			for(var i = 0; i < 1000; i++){
				scene.remove(KratomVisualizer[i]);
			}
			KratomVisualizer.length = 0; 
			//to clear the array
		}
		else if(AudioIndex == 2){
			removeControls(2);
			for(var i = 0; i < 1000; i++){
				scene.remove(EmpathyVisualizer[i]);
			}
			EmpathyVisualizer.length = 0; 
			//to clear the array
		}
		else if(AudioIndex == 3){
			removeControls(3);
			for(var i = 0; i < 1000; i++){
				scene.remove(LayersVisualizer[i]);
			}
			LayersVisualizer.length = 0; 
			//to clear the array
		}
		else if(AudioIndex == 4){
			removeControls(4);
			for(var i = 0; i < 1000; i++){
				scene.remove(FloatingVisualizer[i]);
			}
			FloatingVisualizer.length = 0; 
			//to clear the array
		}
		else if(AudioIndex == 5){
			removeControls(5);
			for(var i = 0; i < 1000; i++){
				scene.remove(InBetweenVisualizer[i]);
			}
			InBetweenVisualizer.length = 0; 
			//to clear the array
		}
		else if(AudioIndex == 6){
			removeControls(6);
			for(var i = 0; i < 1000; i++){
				scene.remove(OUTTHERESOMEWHEREVisualizer[i]);
			}
			OUTTHERESOMEWHEREVisualizer.length = 0; 
			//to clear the array
		}
		else if(AudioIndex == 7){
			removeControls(7);
			for(var i = 0; i < 1000; i++){
				scene.remove(DissonanceVisualizer[i]);
			}
			DissonanceVisualizer.length = 0; 
			//to clear the array
		}
		else if(AudioIndex == 8){
			removeControls(8);
			for(var i = 0; i < 1000; i++){
				scene.remove(ISeeVisualizer[i]);
			}
			ISeeVisualizer.length = 0; 
			//to clear the array
		}
		else if(AudioIndex == 9){
			removeControls(9);
			for(var i = 0; i < 1000; i++){
				scene.remove(OdetotheAwakenedVisualizer[i]);
			}
			OdetotheAwakenedVisualizer.length = 0; 
			//to clear the array
		}
		
		/* If the shuffle button is activated then play a random song */
		if(shuffle == true){
			
			getRandomInt(min, max);
			console.log(randomNumber);
			if(randomNumber == 0){
				UtopiaAudio.play();
				StartVisualizer(0);
			}
			else if(randomNumber == 1){
				KratomAudio.play();
				StartVisualizer(1);
			}
			else if(randomNumber == 2){
				EmpathyAudio.play();
				StartVisualizer(2);
			}
			else if(randomNumber == 3){
				LayersAudio.play();
				StartVisualizer(3);
			}
			else if(randomNumber == 4){
				FloatingAudio.play();
				StartVisualizer(4);
			}
			else if(randomNumber == 5){
				InBetweenAudio.play();
				StartVisualizer(5);
			}
			else if(randomNumber == 6){
				OUTTHERESOMEWHEREAudio.play();
				StartVisualizer(6);
			}
			else if(randomNumber == 7){
				DissonanceAudio.play();
				StartVisualizer(7);
			}
			else if(randomNumber == 8){
				ISeeAudio.play();
				StartVisualizer(8);
			}
			else if(randomNumber == 9){
				OdetotheAwakenedAudio.play();
				StartVisualizer(9);
			}
			
			
		}
		
	}	

	function removeControls( AudioIndex ){
		
		if(AudioIndex == 0){
			$("#Utopia").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		else if(AudioIndex == 1){
			$("#Kratom").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		else if(AudioIndex == 2){
			$("#Empathy").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		else if(AudioIndex == 3){
			$("#Layers").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		else if(AudioIndex == 4){
			$("#Floating").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		else if(AudioIndex == 5){
			$("#In Between").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		else if(AudioIndex == 6){
			$("#OUTTHERESOMEWHERE").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		else if(AudioIndex == 7){
			$("#Dissonance").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		else if(AudioIndex == 8){
			$("#I See").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		else if(AudioIndex == 9){
			$("#Ode to the Awakened").attr("controls", false);
			$('#popup').fadeOut('slow');
		}
		
		
	}

	function toggleLoop(){
		
		if(loop == true){
			
			loop = false;
			$("#Utopia").attr("loop", false);
			$("#Kratom").attr("loop", false);
			$("#Empathy").attr("loop", false);
			$("#Layers").attr("loop", false);
			$("#Floating").attr("loop", false);
			$("#InBetween").attr("loop", false);
			$("#OUTTHERESOMEWHERE").attr("loop", false);
			$("#Dissonance").attr("loop", false);
			$("#ISee").attr("loop", false);
			$("#Ode to the Awakened").attr("loop", false);
			$(".loopOverlay").css("background-image", "url('images/infinite loop bw.png')");
			
		}
		else if(loop == false){
			
			loop = true;
			shuffle = true;
			shufflePlay();
			$("#Utopia").attr("loop", true);
			$("#Kratom").attr("loop", true);
			$("#Empathy").attr("loop", true);
			$("#Layers").attr("loop", true);
			$("#Floating").attr("loop", true);
			$("#InBetween").attr("loop", true);
			$("#OUTTHERESOMEWHERE").attr("loop", true);
			$("#Dissonance").attr("loop", true);
			$("#ISee").attr("loop", true);
			$("#Ode to the Awakened").attr("loop", true);
			$(".loopOverlay").css("background-image", "url('images/infinite loop.png')");
			
		}
		
	}

	function shufflePlay(){
		
		console.log("called");
		if(shuffle == false){
			
			shuffle = true;
			loop = true;
			toggleLoop();
			$(".shuffleOverlay").css("background-image", "url('images/shufflecolor.png')");
			
			
		}
		else if(shuffle == true){
			
			shuffle = false;
			$(".shuffleOverlay").css("background-image", "url('images/shufflebw.png')");
			
		}
		
	}
	
$(function (){
		/*********************************************************/
		/*                                                       */
		/*              Adding in All of the Music               */
		/*                                                       */
		/*********************************************************/
		
	$(".popup").hide();
		
	/* JQuery Popup to let the User know how to use application */
	$('.popup-outer').fadeIn('slow');
	$(".close").click(function(){
		$('.popup-outer').fadeOut('slow');
	});
	
	/* JQuery Popup to give the option to turn off looping of tracks */
	$('.loopPopup').fadeIn('slow');
	$(".loopPopup").click(function(){
		toggleLoop();
	});
	
	/* JQuery Popup to give the option to turn off looping of tracks */
	$('.shufflePopup').fadeIn('slow');
	$('.shufflePopup').click(function(){
		console.log("clicked");
		shufflePlay();
	});
	
	loadAudio();
	
	function loadAudio(){
		// Loading Utopia Audio
		var context = new AudioContext();
		UtopiaAudio = document.getElementById('Utopia');
		UtopiaAudioSrc = context.createMediaElementSource(UtopiaAudio);
		UtopiaAnalyser = context.createAnalyser();
			
		UtopiaAudioSrc.connect(UtopiaAnalyser);
		UtopiaAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		UtopiafrequencyData = new Uint8Array(UtopiaAnalyser.frequencyBinCount);
		Audio[0] = UtopiaAudio;
		
		
		// Loading Kratom Audio
		KratomAudio = document.getElementById('Kratom');
		KratomAudioSrc = context.createMediaElementSource(KratomAudio);
		KratomAnalyser = context.createAnalyser();
			
		KratomAudioSrc.connect(KratomAnalyser);
		KratomAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		KratomfrequencyData = new Uint8Array(KratomAnalyser.frequencyBinCount);
		Audio[1] = KratomAudio;
		
		// Loading Empathy Audio
		EmpathyAudio = document.getElementById('Empathy');
		EmpathyAudioSrc = context.createMediaElementSource(EmpathyAudio);
		EmpathyAnalyser = context.createAnalyser();
			
		EmpathyAudioSrc.connect(EmpathyAnalyser);
		EmpathyAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		EmpathyfrequencyData = new Uint8Array(EmpathyAnalyser.frequencyBinCount);
		Audio[2] = EmpathyAudio;
		
		// Loading Layers Audio
		LayersAudio = document.getElementById('Layers');
		LayersAudioSrc = context.createMediaElementSource(LayersAudio);
		LayersAnalyser = context.createAnalyser();
			
		LayersAudioSrc.connect(LayersAnalyser);
		LayersAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		LayersfrequencyData = new Uint8Array(LayersAnalyser.frequencyBinCount);
		Audio[3] = LayersAudio;
		
		// Loading Floating Audio
		FloatingAudio = document.getElementById('Floating');
		FloatingAudioSrc = context.createMediaElementSource(FloatingAudio);
		FloatingAnalyser = context.createAnalyser();
			
		FloatingAudioSrc.connect(FloatingAnalyser);
		FloatingAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		FloatingfrequencyData = new Uint8Array(FloatingAnalyser.frequencyBinCount);
		Audio[4] = FloatingAudio;
		
		// Loading In Between Audio
		InBetweenAudio = document.getElementById('InBetween');
		InBetweenAudioSrc = context.createMediaElementSource(InBetweenAudio);
		InBetweenAnalyser = context.createAnalyser();
			
		InBetweenAudioSrc.connect(InBetweenAnalyser);
		InBetweenAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		InBetweenfrequencyData = new Uint8Array(InBetweenAnalyser.frequencyBinCount);
		Audio[5] = InBetweenAudio;
		
		// Loading OUT THERE SOMEWHERE Audio
		OUTTHERESOMEWHEREAudio = document.getElementById('OUTTHERESOMEWHERE');
		OUTTHERESOMEWHEREAudioSrc = context.createMediaElementSource(OUTTHERESOMEWHEREAudio);
		OUTTHERESOMEWHEREAnalyser = context.createAnalyser();
			
		OUTTHERESOMEWHEREAudioSrc.connect(OUTTHERESOMEWHEREAnalyser);
		OUTTHERESOMEWHEREAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		OUTTHERESOMEWHEREfrequencyData = new Uint8Array(OUTTHERESOMEWHEREAnalyser.frequencyBinCount);
		Audio[6] = OUTTHERESOMEWHEREAudio;
		
		// Loading Dissonance Audio
		DissonanceAudio = document.getElementById('Dissonance');
		DissonanceAudioSrc = context.createMediaElementSource(DissonanceAudio);
		DissonanceAnalyser = context.createAnalyser();
			
		DissonanceAudioSrc.connect(DissonanceAnalyser);
		DissonanceAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		DissonancefrequencyData = new Uint8Array(DissonanceAnalyser.frequencyBinCount);
		Audio[7] = DissonanceAudio;
		
		// Loading I See Audio
		ISeeAudio = document.getElementById('ISee');
		ISeeAudioSrc = context.createMediaElementSource(ISeeAudio);
		ISeeAnalyser = context.createAnalyser();
			
		ISeeAudioSrc.connect(ISeeAnalyser);
		ISeeAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		ISeefrequencyData = new Uint8Array(ISeeAnalyser.frequencyBinCount);
		Audio[8] = ISeeAudio;
		
		// Loading Ode to the Awakened Audio
		OdetotheAwakenedAudio = document.getElementById('Ode to the Awakened');
		OdetotheAwakenedAudioSrc = context.createMediaElementSource(OdetotheAwakenedAudio);
		OdetotheAwakenedAnalyser = context.createAnalyser();
			
		OdetotheAwakenedAudioSrc.connect(OdetotheAwakenedAnalyser);
		OdetotheAwakenedAudioSrc.connect(context.destination);
		//frequencyBinCount tells you how many values you will receive from the analyser
		OdetotheAwakenedfrequencyData = new Uint8Array(OdetotheAwakenedAnalyser.frequencyBinCount);
		Audio[9] = OdetotheAwakenedAudio;
	}
	
	
	function init(){
				
		/* Creating an empty scene object and renderer */
		/* Adding in fog */
		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0xF93E8A, 0.01 );
		camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .01, 1000);
		renderer = new THREE.WebGLRenderer({antialias: true});
		
		/* Setting up the renderer */
		renderer.setClearColor(0xdddddd);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		
		/* Adding controls */
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.addEventListener('change', render);
		/* How far away you can zoom in and out */
		controls.minDistance = 0;
		controls.maxDistance = 25;
		/* How far you can orbit horizontally, upper and lower limits. */
		controls.minAzimuthAngle = -((Math.PI)/4) * 3; // radians
		controls.maxAzimuthAngle = ((Math.PI)/4) * 3; // radians
		/* How far you can orbit vertically, upper and lower limits. */
		controls.minPolarAngle = ((Math.PI)/2.8); // radians
		controls.maxPolarAngle = ((Math.PI)/5) * 3; // radians
		
		
		/* Adding axis helper */
		//axis = new THREE.AxisHelper(10);
		//scene.add(axis);
		
		/*Adding grid helper */
		//grid = new THREE.GridHelper(50, 5, 0x000000, 0x000000);
		//color = new THREE.Color("rgb(255,0,0)");
		//grid.setColors(color, 0x000000);
		
		//scene.add(grid);
		
		/* Position the camera to look at the objects in the scene */
		camera.position.x = 10;
		camera.position.y = 10;
		camera.position.z = 20;
		camera.lookAt(scene.position);
		addObjects();

		/**************************************************/
		/*                                                */
		/* 	       Loading in all of the Objects 	      */
		/*                                                */
		/**************************************************/
		
	function addObjects(){
	// instantiate a JSONloader
	var loader = new THREE.JSONLoader();

	// load the Aurora Borealis Art Object
	loader.load('models/AuroraBorealis.json', addLeftWall);
	function addLeftWall( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Aurora Borealis Art";
	
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Aurora Borealis Art");
		console.log(object);
}	
	
	// load the Left Wall Object
	loader.load('models/LeftWall.json', addLeftWall);
	function addLeftWall( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Left Wall";
	
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Left Wall");
		console.log(object);
} 

	// load the Middle Wall Object
	loader.load('models/MiddleWall.json', addMiddleWall);
	function addMiddleWall( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Middle Wall";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Middle Wall");
		console.log(object);
}

	// load the Right Wall Object
	loader.load('models/Right Wall.json', addRightWall);
	function addRightWall( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Right Wall";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Right Wall");
		console.log(object);
}

	// load the Back Wall Object
	loader.load('models/BackWall.json', addBackWall);
	function addBackWall( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Back Wall";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Back Wall");
		console.log(object);
}

	// load the Ceiling Object
	loader.load('models/Ceiling.json', addCeiling);
	function addCeiling( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Ceiling";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Ceiling");
		console.log(object);
}

	// load the Floor Object
	loader.load('models/Carpet.json', addFloor);
	function addFloor( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Floor";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Floor");
		console.log(object);
}
    /* Adding in the Couch parts */
	/* This couch was modeled by Blender Guru. I followed his tutorial for modeling this couch and mine is pretty much the exact same except it kept crashing my computer 
	when I reloaded it for some reason. I'm not sure why, so I just decided to use his and he said that it is okay to use his stuff. I am crediting him here though.*/
	
	// load the Lower Cushions Object
	loader.load('models/LowerCushions.json', addFloor);
	function addFloor( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "LowerCushions";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("LowerCushions");
		console.log(object);
}
	
	// load the Couch Object
	loader.load('models/Couch.json', addFloor);
	function addFloor( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Couch";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Couch");
		console.log(object);
}

	// load the Arm Rest Object
	loader.load('models/Arm Rest.json', addFloor);
	function addFloor( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "ArmRest";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("ArmRest");
		console.log(object);
}

	// load the Upper Arm Rest Object
	loader.load('models/UpperArmRest.json', addFloor);
	function addFloor( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "UpperArmRest";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("UpperArmRest");
		console.log(object);
}

	// load the Upper Cushions Object
	loader.load('models/Upper Cushions.json', addFloor);
	function addFloor( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Upper Cushions";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
			}
		});
		scene.add( object );
		object = scene.getObjectByName("UpperCushions");
		console.log(object);
}

    /* Adding All of the Vinyls */
	
	// load the Utopia Vinyl Object
	loader.load('models/Vinyl Utopia.json', addVinylUtopia);
	function addVinylUtopia( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Utopia Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[0] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Utopia Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.15);
}
	
	// load the Kratom Vinyl Object
	loader.load('models/Vinyl.json', addVinyl);
	function addVinyl( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Kratom Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[1] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Kratom Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.35);
}

	// load the Empathy Vinyl Object
	loader.load('models/Vinyl Empathy.json', addVinylEmpathy);
	function addVinylEmpathy( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Empathy Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[2] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Empathy Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.35);
}

	// load the Layers Vinyl Object
	loader.load('models/Vinyl Layers.json', addVinylLayers);
	function addVinylLayers( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Layers Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[3] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Layers Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.35);
}

	// load the Floating Vinyl Object
	loader.load('models/Vinyl Floating.json', addVinylFloating);
	function addVinylFloating( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Floating Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[4] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Floating Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.35);
}

	// load the In Between Vinyl Object
	loader.load('models/Vinyl In Between.json', addVinylInBetween);
	function addVinylInBetween( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "In Between Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[5] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("In Between Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.35);
}

	// load the OUT THERE SOMEWHERE Vinyl Object
	loader.load('models/Vinyl OUT THERE SOMEWHERE.json', addVinylOUTTHERESOMEWHERE);
	function addVinylOUTTHERESOMEWHERE( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "OUT THERE SOMEWHERE Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[6] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("OUT THERE SOMEWHERE Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.35);
}

	// load the Dissonance Vinyl Object
	loader.load('models/Vinyl Dissonance.json', addVinylDissonance);
	function addVinylDissonance( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Dissonance Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[7] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Dissonance Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.35);
}

	// load the I See Vinyl Object
	loader.load('models/Vinyl I See.json', addVinylISee);
	function addVinylISee( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "I See Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[8] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("I See Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.35);
}

	// load the OUT THERE SOMEWHERE Vinyl Object
	loader.load('models/Vinyl Ode to the Awakened.json', addVinylOdetotheAwakened);
	function addVinylOdetotheAwakened( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Ode to the Awakened Vinyl";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Vinyls[9] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Ode to the Awakened Vinyl");
		console.log(object);
		object.translateX(2.6);
		object.translateY(-.35);
}

	/* Adding all of the Albums */
	// load the Utopia Object
	loader.load('models/Utopia.json', addUtopia);
	function addUtopia( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Utopia";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[0] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Utopia");
		console.log(object);
}

	// load the Kratom Object
	loader.load('models/Kratom.json', addKratom);
	function addKratom( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Kratom";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[1] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Kratom");
		console.log(object);
}

	// load the Empathy Object
	loader.load('models/Empathy.json', addEmpathy);
	function addEmpathy( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Empathy";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[2] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Empathy");
		console.log(object);
}

	// load the Layers Object
	loader.load('models/Layers.json', addLayers);
	function addLayers( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Layers";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[3] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Layers");
		console.log(object);
}

	// load the Floating Object
	loader.load('models/Floating.json', addFloating);
	function addFloating( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Floating";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[4] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Floating");
		console.log(object);
}

	// load the In Between Object
	loader.load('models/In Between.json', addInBetween);
	function addInBetween( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "In Between";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[5] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("In Between");
		console.log(object);
}

	// load the OUTTHERESOMEWHERE Object
	loader.load('models/OUTTHERESOMEWHERE.json', addOUTTHERESOMEWHERE);
	function addOUTTHERESOMEWHERE( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "OUT THERE SOMEWHERE";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[6] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("OUT THERE SOMEWHERE");
		console.log(object);
}

	// load the Dissonance Object
	loader.load('models/Dissonance.json', addDissonance);
	function addDissonance( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Dissonance";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[7] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Dissonance");
		console.log(object);
}

	// load the I See Object
	loader.load('models/I See.json', addISee);
	function addISee( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "I See";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[8] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("I See");
		console.log(object);
}

	// load the Ode to the Awakened Object
	loader.load('models/Ode to the Awakened.json', addOdetotheAwakened);
	function addOdetotheAwakened( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		var object = new THREE.Mesh( geometry, material );
		object.name = "Ode to the Awakened";
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				//need to do this to ensure that all of the normals are calculated correctly
				child.geometry.computeVertexNormals();
				Albums[9] = child;
			}
		});
		scene.add( object );
		object = scene.getObjectByName("Ode to the Awakened");
		console.log(object);
}
}

		/**************************************************/
		/*                                                */
		/* 	  Enabling Interactivity with the Objects 	  */
		/*                                                */
		/**************************************************/		
		
		/* Adding a raycaster and a mouse as a 2D Vector */
		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();
		
		/* Adding an event listener for mouse */
		document.addEventListener('mousedown', onDocumentMouseDown, false);
		document.addEventListener('touchstart', onDocumentTouchStart, false);	
   
		/* Setting Up datGUI controls for the objects */
		guiControls = new function(){

			this.intensity = 0.6;
			//this.color = "#C17DDC";	

		}
				
		/* Adding in the spotlight with default parameters */
		spotLight = new THREE.SpotLight(0x0F40AA);
		spotLight.castShadow = true;
		spotLight.position.set(20,35,40);	
		scene.add(spotLight); 
		
		light = new THREE.AmbientLight();
		light.intensity = guiControls.intensity;
		light.color.set = 0xC17DDC;
		
        scene.add(light);
		
		/* Adding the controls to the scene */
		datGUI = new dat.GUI();
		
	    datGUI.add(guiControls, 'intensity',0.01, 5).onChange(function(value){
			light.intensity = value;
		});

		datGUI.addColor(light, "color");
		
		$("#webGL-container").append(renderer.domElement);
		
		/* Stats */
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.bottom = '0px';
		$("#webGL-container").append(stats.domElement);

	}
		
	function Utopia(){
		
		/* If Utopia is playing then pause it and reset it and stop visualizer */
		if(Audio[0].paused == false){
			Audio[0].pause(); 
			Audio[0].currentTime = 0;
			StopVisualizer(0);
		}
		/* If not then stop all other songs and play this one */
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					//Animate Utopia Vinyl back
					StopVisualizer(i);
				}
			}
			UtopiaAudio.play();
			StartVisualizer(0);
		}		
	}
		
	function Kratom(){
		
		if(Audio[1].paused == false){
			Audio[1].pause();
			Audio[1].currentTime = 0;
			StopVisualizer(1);
		}
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					StopVisualizer(i);
				}	
			}
			KratomAudio.play();
			StartVisualizer(1);
		}		
	}
	
	function Empathy(){
		
		if(Audio[2].paused == false){
			Audio[2].pause();
			Audio[2].currentTime = 0;
			StopVisualizer(2);
		}
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					StopVisualizer(i);
				}
				
			}
			EmpathyAudio.play();
			StartVisualizer(2);
		}	
		
	}
	
	function Layers(){
		
		if(Audio[3].paused == false){
			Audio[3].pause();
			Audio[3].currentTime = 0;
			StopVisualizer(3);
		}
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					StopVisualizer(i);
				}
				
			}
			LayersAudio.play();
			StartVisualizer(3);
		}	
		
	}
	
	function Floating(){
		
		if(Audio[4].paused == false){
			Audio[4].pause();
			Audio[4].currentTime = 0;
			StopVisualizer(4);
		}
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					StopVisualizer(i);
				}
				
			}
			FloatingAudio.play();
			StartVisualizer(4);
		}	
		
	}
	
	function InBetween(){
		
		if(Audio[5].paused == false){
			Audio[5].pause();
			Audio[5].currentTime = 0;
			StopVisualizer(5);
		}
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					StopVisualizer(i);
				}
				
			}
			InBetweenAudio.play();
			StartVisualizer(5);
		}
		
	}
	
	function OUTTHERESOMEWHERE(){
		
		if(Audio[6].paused == false){
			Audio[6].pause();
			Audio[6].currentTime = 0;
			StopVisualizer(6);
		}
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					StopVisualizer(i);
				}
				
			}
			OUTTHERESOMEWHEREAudio.play();
			StartVisualizer(6);
		}
		
	}
	
	function Dissonance(){
		
		if(Audio[7].paused == false){
			Audio[7].pause();
			Audio[7].currentTime = 0;
			StopVisualizer(7);
		}
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					StopVisualizer(i);
				}
				
			}
			DissonanceAudio.play();
			StartVisualizer(7);
		}
		
	}
	
	function ISee(){
		
		if(Audio[8].paused == false){
			Audio[8].pause();
			Audio[8].currentTime = 0;
			StopVisualizer(8);
		}
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					StopVisualizer(i);
				}
				
			}
			ISeeAudio.play();
			StartVisualizer(8);
		}
		
	}
	
	function OdetotheAwakened(){
		
		if(Audio[9].paused == false){
			Audio[9].pause();
			Audio[9].currentTime = 0;
			StopVisualizer(9);
		}
		else{
			for(i = 0; i <= 9; i++){
				if(Audio[i].paused == false){	
					Audio[i].pause();
					Audio[i].currentTime = 0;
					StopVisualizer(i);
				}
				
			}
			OdetotheAwakenedAudio.play();
			StartVisualizer(9);
		}
		
	}
	

/*	function AnimateVinyl( AudioIndex ){
		
		if(AudioIndex == 0){
			
			UtopiaPosition = {x: Vinyls[0].position.x, y: Vinyls[0].position.y};
			UtopiaTarget = {x: Vinyls[0].translateX(2.6), y: Vinyls[0].translateY(-.15)};
			UtopiaTween = new TWEEN.Tween(UtopiaPosition).to(UtopiaTarget, 6000);
			tween.delay(1000);
			tween.start();
			
		}
		
	}*/
	
	function onDocumentTouchStart( event ){
		
		event.preventDefault();
		
		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;
		onDocumentMouseDown( event );
		
	}
	
	function onDocumentMouseDown( event ){
		
		event.preventDefault();
		
		mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
		mouse.y = -( event.clientY / renderer.domElement.height ) * 2 + 1;
		
		raycaster.setFromCamera( mouse, camera );
		
		var intersects = raycaster.intersectObjects( Albums );
		
		if(intersects.length > 0){
			
			if( intersects[ 0 ].object.name == "Utopia"){
				
				Utopia();
				
			}
			else if( intersects[ 0 ].object.name == "Kratom"){
				
				Kratom();
				
			}
			else if( intersects[ 0 ].object.name == "Empathy"){
				
				Empathy();
				
			}
			else if( intersects[ 0 ].object.name == "Layers"){
				
				Layers();
				
			}
			else if( intersects[ 0 ].object.name == "Floating"){
				
				Floating();
				
			}
			else if( intersects[ 0 ].object.name == "In Between"){
				
				InBetween();
				
			}
			else if( intersects[ 0 ].object.name == "OUT THERE SOMEWHERE"){
				
				OUTTHERESOMEWHERE();
				
			}
			else if( intersects[ 0 ].object.name == "Dissonance"){
				
				Dissonance();
				
			}
			else if( intersects[ 0 ].object.name == "I See"){
				
				ISee();
				
			}
			else if( intersects[ 0 ].object.name == "Ode to the Awakened"){
				
				OdetotheAwakened();
				
			}
		}
		
	}
	
	init();
	animate();
	
	function render(){
		
		if(Audio[0].paused == false){
			UtopiaAnalyser.getByteFrequencyData(UtopiafrequencyData);
			for(var i = 0; i < 1000; i++ )	{
				UtopiaVisualizer[i].rotation.x += UtopiafrequencyData[50]/1000;
				UtopiaVisualizer[i].rotation.y = UtopiafrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				UtopiaVisualizer[i].material.color.setRGB(UtopiafrequencyData[i]/500, UtopiafrequencyData[i]/100, UtopiafrequencyData[100]/255);
			}

		}	

		if(Audio[1].paused == false){
			KratomAnalyser.getByteFrequencyData(KratomfrequencyData);
			for(var i = 0; i < 2000; i++ )	{
				KratomVisualizer[i].rotation.x += KratomfrequencyData[50]/1000;
				KratomVisualizer[i].rotation.y = KratomfrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				KratomVisualizer[i].material.color.setRGB(KratomfrequencyData[i]/400, KratomfrequencyData[i]/140, KratomfrequencyData[100]/255);
				KratomVisualizer[i].scale.set(KratomfrequencyData[i]/80, KratomfrequencyData[i]/90, KratomfrequencyData[i]/85);
				light.color.set = KratomfrequencyData[i]/50;
				
			}
		}
		
		if(Audio[2].paused == false){
			EmpathyAnalyser.getByteFrequencyData(EmpathyfrequencyData);
			for(var i = 0; i < 1000; i++ )	{
				EmpathyVisualizer[i].rotation.x += EmpathyfrequencyData[50]/1000;
				EmpathyVisualizer[i].rotation.y = EmpathyfrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				EmpathyVisualizer[i].material.color.setRGB(EmpathyfrequencyData[i]/500, EmpathyfrequencyData[i]/100, EmpathyfrequencyData[100]/255);
			}
		}
		
		if(Audio[3].paused == false){
			LayersAnalyser.getByteFrequencyData(LayersfrequencyData);
			for(var i = 0; i < 1000; i++ )	{
				LayersVisualizer[i].rotation.x += LayersfrequencyData[50]/1000;
				LayersVisualizer[i].rotation.y = LayersfrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				LayersVisualizer[i].material.color.setRGB(LayersfrequencyData[i]/500, LayersfrequencyData[i]/100, LayersfrequencyData[100]/255);
			}
		}
		
		if(Audio[4].paused == false){
			FloatingAnalyser.getByteFrequencyData(FloatingfrequencyData);
			for(var i = 0; i < 1000; i++ )	{
				FloatingVisualizer[i].rotation.x += FloatingfrequencyData[50]/1000;
				FloatingVisualizer[i].rotation.y = FloatingfrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				FloatingVisualizer[i].material.color.setRGB(FloatingfrequencyData[i]/500, FloatingfrequencyData[i]/100, FloatingfrequencyData[100]/255);
			}
		}
		
		if(Audio[5].paused == false){
			InBetweenAnalyser.getByteFrequencyData(InBetweenfrequencyData);
			for(var i = 0; i < 1000; i++ )	{
				InBetweenVisualizer[i].rotation.x += InBetweenfrequencyData[50]/1000;
				InBetweenVisualizer[i].rotation.y = InBetweenfrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				InBetweenVisualizer[i].material.color.setRGB(InBetweenfrequencyData[i]/500, InBetweenfrequencyData[i]/100, InBetweenfrequencyData[100]/255);
			}
		}
		
		if(Audio[6].paused == false){
			OUTTHERESOMEWHEREAnalyser.getByteFrequencyData(OUTTHERESOMEWHEREfrequencyData);
			for(var i = 0; i < 1000; i++ )	{
				OUTTHERESOMEWHEREVisualizer[i].rotation.x += OUTTHERESOMEWHEREfrequencyData[50]/1000;
				OUTTHERESOMEWHEREVisualizer[i].rotation.y = OUTTHERESOMEWHEREfrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				OUTTHERESOMEWHEREVisualizer[i].material.color.setRGB(OUTTHERESOMEWHEREfrequencyData[i]/500, OUTTHERESOMEWHEREfrequencyData[i]/100, OUTTHERESOMEWHEREfrequencyData[100]/255);
			}
		}
		
		if(Audio[7].paused == false){
			DissonanceAnalyser.getByteFrequencyData(DissonancefrequencyData);
			for(var i = 0; i < 1000; i++ )	{
				DissonanceVisualizer[i].rotation.x += DissonancefrequencyData[50]/1000;
				DissonanceVisualizer[i].rotation.y = DissonancefrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				DissonanceVisualizer[i].material.color.setRGB(DissonancefrequencyData[i]/500, DissonancefrequencyData[i]/100, DissonancefrequencyData[100]/255);
			}
		}
		
		if(Audio[8].paused == false){
			ISeeAnalyser.getByteFrequencyData(ISeefrequencyData);
			for(var i = 0; i < 1000; i++ )	{
				ISeeVisualizer[i].rotation.x += ISeefrequencyData[50]/1000;
				ISeeVisualizer[i].rotation.y = ISeefrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				ISeeVisualizer[i].material.color.setRGB(ISeefrequencyData[i]/500, ISeefrequencyData[i]/100, ISeefrequencyData[100]/255);
			}
		}
		
		if(Audio[9].paused == false){
			OdetotheAwakenedAnalyser.getByteFrequencyData(OdetotheAwakenedfrequencyData);
			for(var i = 0; i < 1000; i++ )	{
				OdetotheAwakened[i].rotation.x += OdetotheAwakenedfrequencyData[50]/1000;
				OdetotheAwakenedVisualizer[i].rotation.y = OdetotheAwakenedfrequencyData[i]/100;
				var color = new THREE.Color(1,0,0);
				OdetotheAwakenedVisualizer[i].material.color.setRGB(OdetotheAwakenedfrequencyData[i]/500, OdetotheAwakenedfrequencyData[i]/100, OdetotheAwakenedfrequencyData[100]/255);
			}
		}
		
		
	}
	
	
	function animate(){
		
		requestAnimationFrame(animate);
		render();
		stats.update();
		// update the tweens from TWEEN library
		//TWEEN.update();
		renderer.render(scene, camera);
		//console.log(KratomfrequencyData);
		
	}
	
	$(window).resize(function(){
		
		SCREEN_WIDTH = window.innerWidth;
		SCREEN_HEIGHT = window.innerHeight;
		
		camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
		camera.updateProjectionMatrix();
	});

})