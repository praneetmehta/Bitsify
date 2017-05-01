$(document).ready(function(){
	function controllAdjust(){
		var player = $('audio')[0];
		var timeNow = $('#timeNow');
		var length = $('#length');
		var pOffset = $('#progress-bar');
		console.log(pOffset);
		var width = $('#progress').width()/100 * $(window).width();
		var scrub = 0;
		var current_play = 0;
		$('#play').click(function(){
			if($(this).html() == 'play_circle_outline'){
				player.play();
				$(this).html('pause_circle_outline');
			}else if($(this).html() == 'pause_circle_outline'){
				player.pause();
				$(this).html('play_circle_outline');
			}
		});
	
		//Event listener when track is playing
		$(player).on('timeupdate' ,function()   {   
		    $('#progress-bar').css('width', ( (player.currentTime/player.duration) *100)+"%");
			timeNow.html('<span>'+('0'+Math.floor(player.currentTime/60)).slice(-2)+'</span>:<span>'+('0'+Math.floor(player.currentTime%60)).slice(-2)+'</span>');
			length.html('<span>'+('0'+Math.floor(player.duration/60)).slice(-2)+'</span>:<span>'+('0'+Math.floor(player.duration%60)).slice(-2)+'</span>');
		});
		
		//Event listener when the track finishes  
		$(player).on('ended', function(){ 
			$("#play")
		      .html('play_circle_outline')   
		    $('#progress-bar').css('width', '0');

		});
		//Get position of mouse for scrubbing
		$('#progress').mousemove(function(e){ 
		    // scrub = (e.pageX-pOffset);
		    $('#progress-bar').css({'background-color':'#339933'});
		    $('#progress').css({'height':'4px'});
		});
		$('#progress').mouseout(function(e){
			$('#progress').css({'height':'2px'});
			$('#progress-bar').css({'background-color':'#bbb'});
		})

		$('#progress').click(function(){ //Use the position to seek when clicked
		    $('progress-bar').css('width',scrub+"px");
		    console.log('scrubber value '+scrub);
		    console.log('width value '+width);
		    console.log('duration value '+player.duration);
		    console.log('ratio value '+ scrub/width );
		    var seek = player.duration*(scrub/width);
		    console.log('seek'+seek);
		    console.log(scrub/width);
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
		});
		$('#progress').click(function(){ //Use the position to seek when clicked
		    $('progress-bar').css('width',scrub+"px");
		    var seek = player.duration*(scrub/width);
		    player.currentTime = seek;
		});

	})
	controllAdjust();
});