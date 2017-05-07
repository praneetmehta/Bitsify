function songChange(song, album){
			$.ajax({
			        type: "POST",
			        url: "/",
			        data: JSON.stringify({song:song, album:album}),
			        contentType: "application/json; charset=utf-8",
			        dataType: "json",
			        success: function(data){
			        	if(data[0].status == 'OK'){
			        		// console.log(typeof(data[1]));
			        		 currentsong = data[1]
			        		$('#title_now_playing').html(data[1].title.split('(')[0]);
			        		$('#album_now_playing').html(data[1].album.split('(')[0].slice(0,28));
			        		if(data[1].image == '/images/none.png'){
			        			$('#art_now_playing').attr('src',data[1].image);
			        		}else{
			        			$('#art_now_playing').attr('src',"data:image/jpeg;base64," + data[1].image);
			        		}
			        		$('#song_source').attr('src', data[1].path);
			        		$('#controls_flex_container_bg').css({
			        			'background': "url(data:image/jpeg;base64," + data[1].image + ")",
			        			'background-size':'1000% 1000%',
			        			'background-position':'bottom',
			        			'opacity':'0.5',
			        			'filter':'blur(20px)',
			        			'overflow-y':'hidden',
			        			'transition':'all 0.7s'
			        		});

			        		document.getElementById("audio_player").load();
			        		setTimeout(function(){
			        			$('audio')[0].play();
			        			$('#play').html('pause_circle_outline');
			        			$('#youtube_player').attr('src','');
			        			$('#youtube_player').css({'display':'none'});
			        			$('#youtube_status').html('visibility_off');
			        		},300);
			        	}else{
			        		alert('failed');
			        	}
			        },
			        failure: function(errMsg) {
			            alert(errMsg);
			        }
			  });
		}
		function refresh(){
			$.ajax({
			        type: "POST",
			        url: "/refresh",
			        data: JSON.stringify({task:refresh}),
			        contentType: "application/json; charset=utf-8",
			        dataType: "json",
			        success: function(data){
			        	if(data[0].status == 'OK'){
			        		// console.log(typeof(data[1]));
			        		// console.log(data[1]);
			        		
			        	}else{
			        		alert('failed');
			        	}
			        },
			        failure: function(errMsg) {
			            alert(errMsg);
			        }
			  });
		}