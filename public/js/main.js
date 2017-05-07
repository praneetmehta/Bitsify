	$(document).ready(function(){
		var width = $(window).width();
		var height = $(window).height() - $("#controls_flex_container").height()-20;
		$('#window').css({
			'width':width*.727 + 'px',
			'height': height*.929+'px',
			'left': width*.14 + 'px'
		});
		setTimeout(function(){
			$('#preload').fadeOut(1500);
			$('#main').fadeIn(1500);
			resizeFunction();	
		},2000);
		$('#now_playing_list_body').sortable();
		$('#remove_now_playing').click(function(){
			$('#now_playing_list_body').html('');
		});
		$('.modal').modal();
		$('#youtube_holder').draggable();
		$('#iframeFix').css('display','none');
		var currentsong = '';
		window.nextSong = '';
		window.prevSong = '';
		$('#click_status').click(function(){
			if($('#iframeFix').css('display') == 'none'){
				$('#iframeFix').css('display','block');
				$('#click_status').html('lock_open');
				// console.log($('#iframeFix').css('display'));
			}else{
				$('#iframeFix').css('display','none');
				// console.log($('#iframeFix').css('display'));
				$('#click_status').html('lock_outline');
			}
		});
		addToPlaylistEventListeners();
		$('#youtube').click(function(){
			youtubeFeed($('#title_now_playing').text() +' '+ currentsong.artist + ' video song');
		});
		$("#search_form").submit(function(e) {
		    return false;
		});
		$("#backup_form").submit(function(e) {
		    return false;
		});
		$("#restore_form").submit(function(e) {
		    return false;
		});
		$("#youtube_search_form").submit(function(e) {
		    return false;
		});
		$('#youtube_button').click(function(){
			youtubeFeed($('#youtube_search').val());
			$('#youtube_search').val('');
		});
		$('#youtube_status').click(function(){
			if($('#youtube_status').html() == 'visibility'){
				$('#youtube_player').attr('src',$('#youtube_player').attr('src'));
				$('#youtube_holder').css('display','none');
				$('#youtube_status').html('visibility_off')
				setTimeout(function(){
					var player = $('audio')[0];
					player.pause();
				},600);
			}else{
				var player = $('audio')[0];
				player.pause();
				$('#youtube_holder').css('display','block');
				$('#youtube_status').html('visibility');
			}
		});
		$('#next').click(function(){
			var player = $('audio')[0];

			var ele = window.nextSong;
			// console.log(ele);
			selfClick = true;
			player.pause();
			var waitTime = 150;

			var nextSongtoPlay = $('#now_playing_list tr').length != 0 ? ele.find('td').first() : ele.find('td').first().next().find('span');
			// console.log(nextSongtoPlay.html());
			setTimeout(function () {      
			  // Resume play if the element if is paused
			    nextSongtoPlay.click();
			    // console.log('ck');
			  
			}, waitTime);
			
		});
		$('#previous').click(function(){
			var player = $('audio')[0];

			var ele = window.prevSong;
			selfClick = true;
			player.pause();
			var waitTime = 150
			var nextSongtoPlay = $('#now_playing_list tr').length != 0 ? ele.find('td').first() : ele.find('td').first().next().find('span');
			setTimeout(function () {      
			  // Resume play if the element if is paused
			    nextSongtoPlay.click();
			    // console.log('ck');
			  
			}, waitTime);
			
		});
		var player = $('audio')[0];
		$(player).on('ended', function(){
			var ele = window.nextSong;
			selfClick = true;
			player.pause();
			var waitTime = 150
			var nextSongtoPlay = ele.find('td').first();
			setTimeout(function () {      
			  // Resume play if the element if is paused
			    nextSongtoPlay.click();
			    // console.log('ck');
			  
			}, waitTime);
		});
		// $('#search_song').change(function(){
		// 	searchSong();
		// })
		$('#search_song').on('keyup', function() {
		    var val1 = $('#search_song').val();
		    setTimeout(function(){
		    	if($('#search_song').val() == val1 && $('#search_song').val() != ''){
		    		searchSong();
		    	}else if(val1 == ''){
		    		renderSearchResult([], 'nothingFound')
		    	}
		    },800);

		});

		$('#backup_playlist').click(function(){
			$('#modal2').modal('open');
		});
		$('#saveConfirm').click(function(){
			if($('#playlistname').val() != ''){
				var playlistData = $('#now_playing_list_body').html();
				var name = $('#playlistname').val();
				savePlaylist(playlistData, name);				
			}else{
				$('#backup_form').submit();
			}
		});
		$('#restore_playlist').click(function(){
			$('#modal3').modal('open');
		});
		$('#loadConfirm').click(function(){
			if($('#loadPlaylistname').val() != ''){
				var name = $('#loadPlaylistname').val();
				loadPlaylist(name);				
			}else{
				$('#restore_form').submit();
			}
		});
		
		$('#loadConfirm').click(function(){
			if($('#loadPlaylistname').val() != ''){
				var name = $('#loadPlaylistname').val();
				loadPlaylist(name);				
			}else{
				$('#restore_form').submit();
			}
		});
		
		var e =document.getElementById('art_now_playing');
		var h = $('#controls_flex_container').height()-10;
		var w = $(window).width();
		e.style.width = h+'px';
		e.style.height = h+'px';
		e.style.bottom = h*.08 + 'px';
		$('#slider').css({
			'marginBottom':h*.15+'px'
		});
		// console.log(w*.05);
		$('#title_now_playing').css({
			'marginLeft':w*.02+'px'
		});
		$('#album_now_playing').css({
			'margin-left':w*.02+'px'
		});
		$(window).resize(function () 
		{
		    var width = $(window).width();
		    var height = $(window).height() - $("#controls_flex_container").height()-20;
		    $('#window').css({
		    	'width':width*.727 + 'px',
		    	'height': height+10+'px',
		    	'left': width*.14 + 'px'

		    });
		    setTimeout(resizeFunction(),500);
		});
		var w1 = $('#warning_text').width();
        var w2 = $(window).width();
        var w3 = $('#warning_icon').width();
		$('#warning_text').css({'position': 'fixed','top': ($(window).height())/2.5 +'px','left': (w2-w1)/2+'px'});
		$('#warning_icon').css({'position': 'fixed','top': ($(window).height())/2.1 +'px','left': (w2-w3)/2+'px'});
		// console.log(w1);
		// $('#nav_flex_container').resizable({
		//     handles: 'n,w,s,e',
		//     minWidth: 200,
		//     maxWidth: 300
		// });
		var e =document.getElementById('art_now_playing');
		e.addEventListener('click', function(){
			// console.log('clicked');
			w = $('#nav_flex_container').width()-10;
			h = $('#controls_flex_container').height()-10;
			if(e.style.width == w+'px'){
				e.style.transition = "all 0.5s";
				e.style.width = h+'px';
				e.style.height = h+'px';
				e.style.bottom = '4px';
				e.style.transform = 'rotateY(180deg)';
				$('#art_holder').css({"width":"50px"});
				setTimeout(function(){
					e.style.transition = "all 0.01s";
					e.style.transform = 'rotateY(0deg)';
				},190);
				$('#art_holder').css({"width":"50px"});

			}else{
				e.style.transition = "all 0.5s";
				e.style.width = w+'px';
				e.style.height = w+'px';
				e.style.position = 'fixed';
				e.style.bottom = '10%';
				e.style.transform = 'rotateY(180deg)';
				setTimeout(function(){
					e.style.transition = "all 0.01s";
					e.style.transform = 'rotateY(0deg)';
				},190);
				$('#art_holder').css({"width":"0px"});
			}
		});

		var obj = document.getElementsByClassName('title');
		[].forEach.call(document.getElementsByClassName('title'),function(ele){
			ele.addEventListener('click', function(){
				[].forEach.call(document.getElementsByClassName('_row'),function(e){
					if($(e).hasClass('hover2')){
						$(e).removeClass('hover2');
					}
					$(e).mouseover(function(){
						$(e).addClass('hover');
					});
					$(e).mouseout(function(){
						$(e).removeClass('hover');
					});
				});

					// $('.hover2')[0].removeClass('hover2');	
				
				elej = $(ele);
				var now = window.nextSong;
				var prev = window.prevSong;
				window.nextSong =  $('#now_playing_list tr').length != 0 ? now : elej.closest('tr').next('tr');
				window.prevSong =  $('#now_playing_list tr').length != 0 ? prev :elej.closest('tr').prev('tr');
				//nextSong($(ele).closest('tr').next('tr'));
				//previousSong($(ele).closest('tr').prev('tr'))
				// console.log(ele.parentNode.parentNode.rows);
				var song = elej.closest('td').text();
				var album = elej.closest('td').next('td').text();
				songChange(song, album);
				$('.indicator').css({'background':'rgba(255,255,255,0.0)'});
				elej.closest('td').prev('td').css({'background':'#339933'});
				elej.closest('tr').addClass('hover2');
				
				// $('#now_playing_list_body').html('');
				// var id = "now_playing_item_"+$('#now_playing_list tr').length;
				// $('<tr><td style="padding-left:10px;opacity:0;transition:all .5s; transform:translateX(100px);" id='+id+'>'+song+'</td></tr>').appendTo('#now_playing_list_body');
				// setTimeout(function(){
				// 	$('#'+id).css({'opacity':'1', 'transform':'translateX(0px)'});
				// },100);
				// if($('#now_playing_list tr').length == 1){
				// 	window.nextSong = $(ele).closest('tr').next('tr');
				// 	window.prevSong = $(ele).closest('tr').prev('tr');
				// }else{
				// 	window.nextSong = $('#now_playing_item_2');
				// }
			});
		});
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



		function searchSong(){
			var song = $('#search_song').val();
			// console.log(song);
			$.ajax({
				type: "POST",
				url: '/search',
				data: JSON.stringify({search_song: song}),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					if(data.length == 0){
						// console.log(typeof(data[1]));
						renderSearchResult([{title:'Nothing Found', artist:''}], 'nothingFound');
					}else{
						// var html = new EJS({url: '/table.ejs'}).render(data)
						// console.log(html);
						renderSearchResult(data, 'search_result_list');
					}
				},
				failure: function(errMsg) {
				    alert(errMsg);
				}

			});
		}

		function renderSearchResult(data, classtoadd){
			html = '<ul>';
			for(var i=0;i<data.length;i++){
				html += '<div class="'+classtoadd+'" style="display:flex; flex-direction:row;background:rgba(255,255,255,.06);"><img style="width:60px;height:60px" src="data:image/jpeg;base64,'+data[i].image+'"><div style="display:flex;flex-direction:column;font-size:12px;overflow-x:hidden;color:white;padding:5px 2px 5px 10px;font-weight:100;max-height:60px;overflow-y:hidden"><li style="" class="'+classtoadd+'song"><strong>'+data[i].title+'</strong></li><li style="font-size:10px">'+data[i].artist+'</li></div></div><i class="material-icons small search_to_now_playing" style="font-size:15px">playlist_add</i><br>'
			}
			html+='</ul>';
			$('#search_results').html(html);
			attachListeners();
			searchToPlaylistEventListeners();
		}

		function attachListeners(){
			[].forEach.call(document.getElementsByClassName('search_result_list'),function(ele){
				ele.addEventListener('click', function(){
					ele.style.cursor = 'pointer';
					songChange($(ele).find('li').first('li').text(),' ');
					$('#search_song').val('');
				});
			});
		}
		function resizeFunction(){
		    	var e =document.getElementById('art_now_playing');
		    	var h = $('#controls_flex_container').height()-10;
		    	var w = $(window).width();
		    	e.style.width = h+'px';
		    	e.style.height = h+'px';
		    	e.style.bottom = h*.08 + 'px';
		    	$('#slider').css({
		    		'marginBottom':h*.15+'px'
		    	});
				var w1 = $('#warning_text').width();
		        var w2 = $(window).width();
		        var w3 = $('#warning_icon').width();
				$('#warning_text').css({'position': 'fixed','top': ($(window).height())/2.5 +'px','left': (w2-w1)/2+'px'});
				$('#warning_icon').css({'position': 'fixed','top': ($(window).height())/2.1 +'px','left': (w2-w3)/2+'px'});
				// console.log(w*.05);
				$('#title_now_playing').css({
					'margin-left':w*.02+'px'
				});
				$('#album_now_playing').css({
					'margin-left':w*.02+'px'
				});
		    }
		function youtubeFeed(songtosearch){
			var song = songtosearch
			// console.log(song);
			// console.log('current song ' + currentsong );
			$.ajax({
				type: "POST",
				url: '/youtubeFeed',
				data: JSON.stringify({search_song: song}),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					// console.log(data);
					if(data[0].token == 'missing'){
						// console.log(typeof(data[1]));
						// console.log('youtube search failed');
					}else{
						// var html = new EJS({url: '/table.ejs'}).render(data)
						// console.log(html);
						$('#youtube_player').css({'display':'block'});
						$('#youtube_holder').css({'display': 'block'});
						var embedlink = 'https://www.youtube.com/embed/'+data[0].token + '?autoplay=0&showinfo=0&autoplay=1&controls=1&version=3&enablejsapi=1';
						$('#youtube_player').attr('src',embedlink);
						var player = $('audio')[0];
						player.pause();
						$('#youtube_status').html('visibility');

					}
				},
				failure: function(errMsg) {
				    alert(errMsg);
				}

			});
		}

		function savePlaylist(data, name){
			console.log('sending data');
			console.log(name);
			$.ajax({
				type:"POST",
				url: '/savePlaylist',
				data: JSON.stringify({playlistData:data, name:name}),
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				success: function(data){
					if(data.status == 'saved'){
						$('#modal2').modal('close');
						console.log('playlist saved');
					}else{
						$('#modal2').modal('close');
						alert(data.status);
					}
				},
				failure: function(errmsg){
					alert(errmsg)
				}
			});
		}

		function loadPlaylist(name){
			console.log('sending data');
			console.log(name);
			$.ajax({
				type:"POST",
				url: '/loadPlaylist',
				data: JSON.stringify({name:name}),
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				success: function(data){
					if(data.status == 'loaded'){
						$('#modal3').modal('close');
						$('#remove_now_playing').click();
						$('#now_playing_list_body').html(data.data);
						for(var i=0;i<$('#now_playing_list tr').length;i++){
							$('#now_playing_item_'+i).click(function(e){
								var next = $(e.target).closest('tr').next('tr');
								var prev = $(e.target).closest('tr').prev('tr');
								var playlist_entry = $(this).text();
								songChange(playlist_entry, ' ');
								window.nextSong = next;
								window.prevSong = prev;
							});
						}
						console.log('playlist loaded');

					}else{
						$('#modal3').modal('close');
						alert(data.status);
					}
				},
				failure: function(errmsg){
					alert(errmsg)
				}
			});
		}

		function addToPlaylistEventListeners(){
			[].forEach.call(document.getElementsByClassName('add_to_now_playing'),function(ele){
				ele.addEventListener('click', function(){
					elej = $(ele);

					var playlist_entry = elej.closest('tr').text().split('\n')[2].split('\t')[3];
					// console.log(elej.closest('tr').text());
					var id = "now_playing_item_"+$('#now_playing_list tr').length;
					$('<tr><td style="padding-left:10px;opacity:0;transition:all .5s; transform:translateX(100px);" id='+id+'>'+playlist_entry+'</td></tr>').appendTo('#now_playing_list_body');
					
						setTimeout(function(){
							$('#'+id).css({'opacity':'1', 'transform':'translateX(0px)'});
						},100);
					
					//console.log($('#now_playing_item_'+$('#now_playing_list tr').length).text());
					//nextSong($(ele).closest('tr').next('tr'));
					//previousSong($(ele).closest('tr').prev('tr'))
					// console.log(ele.parentNode.parentNode.rows);
					setTimeout(function(){
						$('#'+id).click(function(e){
							var next = $(e.target).closest('tr').next('tr');
							var prev = $(e.target).closest('tr').prev('tr');
							songChange(playlist_entry, ' ');
							window.nextSong = next;
							window.prevSong = prev;

						});
					},500);
				});
			});
		}
		function searchToPlaylistEventListeners(){
			[].forEach.call(document.getElementsByClassName('search_to_now_playing'),function(ele){
				ele.addEventListener('click', function(){
					elej = $(ele);
					var playlist_entry = elej.prev('div').closest('div').find('div').find('strong').html();
					// console.log(playlist_entry)
					var id = "now_playing_item_"+$('#now_playing_list tr').length;
					$('<tr><td style="padding-left:10px;opacity:0;transition:all .5s; transform:translateX(100px);" id='+id+'>'+playlist_entry+'</td></tr>').appendTo('#now_playing_list_body');
					
						setTimeout(function(){
							$('#'+id).css({'opacity':'1', 'transform':'translateX(0px)'});
						},100);
					
					//console.log($('#now_playing_item_'+$('#now_playing_list tr').length).text());
					//nextSong($(ele).closest('tr').next('tr'));
					//previousSong($(ele).closest('tr').prev('tr'))
					// console.log(ele.parentNode.parentNode.rows);
					setTimeout(function(){
						$('#'+id).click(function(e){
							var next = $(e.target).closest('tr').next('tr');
							var prev = $(e.target).closest('tr').prev('tr');
							songChange(playlist_entry, ' ');
							window.nextSong = next;
							window.prevSong = prev;
						});
					},500)
				});
			});
		}

		// function nextSong(ele){
		// 	var player = $('audio')[0];
		// 	var selfClick = false;
		// 	$(player).on('ended', function(){ 
		// 	    player.pause();
		// 	    var waitTime = 150
		// 	    player.currentTime = 0;
		// 	    var nextSongtoPlay = ele.find('td').first().find('span');
		// 	    setTimeout(function () {      
		// 	      // Resume play if the element if is paused
		// 	        if(!selfClick){
		// 	        	console.log('clicked');
		// 	        	nextSongtoPlay.click();
		// 	        }
			      
		// 	    }, waitTime);
			    
		// 	});
		// 	// $('#next').click(function(){
		// 	// 	selfClick = true;
		// 	// 	player.pause();
		// 	// 	var waitTime = 150
		// 	// 	player.currentTime = 0;
		// 	// 	var nextSongtoPlay = ele.find('td').first().find('span');
		// 	// 	setTimeout(function () {      
		// 	// 	  // Resume play if the element if is paused
		// 	// 	    nextSongtoPlay.click();
		// 	// 	    console.log('ck');
				  
		// 	// 	}, waitTime);
				
		// 	// });

		// }
		// function previousSong(ele){
		// 	var player = $('audio')[0]

		// 	$('#previous').click(function(){
		// 		player.pause();
		// 		var waitTime = 150
		// 		player.currentTime = 0;
		// 		var preSongToPlay = ele.find('td').first().find('span');
		// 		setTimeout(function () {      
		// 		  // Resume play if the element if is paused
		// 			if(preSongToPlay){
		// 				preSongToPlay.click();
		// 			}else{
		// 				console.log('last song');
		// 			}				  
		// 		}, waitTime);
				
		// 	});
		// }
	});


