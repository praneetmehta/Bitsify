$(document).ready(function(){
	function getTags(url){
    ID3.loadTags(url, function() {
        showTags(url);
      }, {
        tags: ["title","artist","album","picture"]
      });
  }

    function showTags(url) {
      var tags = ID3.getAllTags(url);
      console.log(tags);
      var title = tags.title;
      var album = tags.album;
      var base64 = ''
      $('#title_now_playing').html(title || "---");
      $('#album_now_playing').html(album || "---");
      var image = tags.picture;
      if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        base64 = "data:" + image.format + ";base64," +
                window.btoa(base64String);
       	$('#art_now_playing').attr('src',base64);
      } else {
        $('#art_now_playing').attr('src','/imgages/none.png');
      }
      return [title, album, base64];
    }
  getTags('/music/test.mp3')
});