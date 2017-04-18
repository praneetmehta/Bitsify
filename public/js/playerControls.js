$(document).ready(function(){
	function controllAdjust(){
		var player = $('audio')[0];
		var timeNow = $('#timeNow');
		var length = $('#length');
		var pOffset = $('#progress').offset();
		var width = $('#progress').width();
		var scrub;
		var current_play = 0;
		function updateCounter(n){
			current_play +=n;
			console.log(current_play);
		}
		$('#play').click(function(){
			if($(this).html() == 'play_circle_outline'){
				player.play();
				$(this).html('pause_circle_outline');
			}else if($(this).html() == 'pause_circle_outline'){
				player.pause();
				$(this).html('play_circle_outline');
			}
		});
		$('#next').click(function(){
			player.pause();
			
		});
		$('#previous').click(function(){
			player.pause();
		});
		//Event listener when track is playing
		$(player).on('timeupdate' ,function()   {   
		    $('#progress-bar').css('width', ( (player.currentTime/player.duration) *100)+"%");
			timeNow.html('<span>'+('0'+Math.floor(player.currentTime/60)).slice(-2)+'</span>:<span>'+('0'+Math.floor(player.currentTime%60)).slice(-2)+'</span>');
			length.html('<span>'+('0'+Math.floor(player.duration/60)).slice(-2)+'</span>:<span>'+('0'+Math.floor(player.duration/60*10)).slice(-2)+'</span>');
		});
		
		//Event listener when the track finishes  
		$(player).on('ended', function(){ 
			$("#play")
		      .html('play_circle_outline')   
		    $('#progress-bar').css('width', '0');

		});
		//Get position of mouse for scrubbing
		$('#progress').mousemove(function(e){ 
		    scrub = (e.pageX-pOffset.left);
		    $('#progress-bar').css({'background-color':'#339933'});
		    $('#progress').css({'height':'4px'});
		    console.log(scrub);
		});
		$('#progress').mouseout(function(e){
			$('#progress').css({'height':'2px'});
			$('#progress-bar').css({'background-color':'#bbb'});
		})

		$('#progress').click(function(){ //Use the position to seek when clicked
		    $('progress-bar').css('width',scrub+"px");
		    var seek = player.duration*(scrub/width);
		    player.currentTime = seek;
		});

		$('#forward').click(function(){
			player.currentTime += 30;
		});
		$('#replay').click(function(){
			player.currentTime -= 30;
		});
	}
	$(window).resize(function(){
		player = $('audio')[0];
		timeNow = $('#timeNow');
		length = $('#length');
		pOffset = $('#progress').offset();
		width = $('#progress').width();
		$('#progress').mousemove(function(e){ 
		    scrub = (e.pageX-pOffset.left);
		    $('#progress-bar').css({'background-color':'#339933'});
		    $('#progress').css({'height':'4px'});
		    console.log(scrub);
		});
		$('#progress').click(function(){ //Use the position to seek when clicked
		    $('progress-bar').css('width',scrub+"px");
		    var seek = player.duration*(scrub/width);
		    player.currentTime = seek;
		});

	})
	controllAdjust();
});