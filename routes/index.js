const express = require('express');
const router = express.Router();
const testFolder = process.platform == 'win32' ? "D:\\Music\\": "/media/praneet/Trash/Music/";
const fs = require('graceful-fs');
const path = require('path');
var PythonShell = require('python-shell');
var slist = require('../config/symlinkcreator.js');
global.song_list = slist.song_list;
var counter = 0;
const mm = require('musicmetadata');
var EventEmitter = require('events');
var user = process.platform == 'win32' ? 'praneetWin':'praneet';
EventEmitter.defaultMaxListeners = 9999;
var file_list = []

/* GET home page. */
router.get('/', function(req, res) {
    res.render("index", {list:global.song_list});
});

router.post('/', function(req, res){
    store = [];
    console.log(req.body);
    var index = 0;
    var found = false;
    for(var j=0;j<global.song_list.length;j++){
        if(global.song_list[j].title == req.body.song){
            index = j;
            found = true;
            store.push(global.song_list[index]);
            break;
        }else{
            found = false;
        }
    }
    if(store.length!=0 && found==true){
        res.send([{'status':'OK'},store[0]]);
    }else{
        res.send([{'status':'OOPS'}]);
    }
});

router.post('/search', function(req, res){
    var data = req.body;
    var song = data.search_song.toLowerCase();
    var search_query = song.split(' ');
    store = []
    function search(search_query, search_array, store, callback){
        var doneCount = 0;
        for(var j=0;j<search_array.length;j++){
            for(var k=0;k<search_query.length;k++){
                if(search_array[j].title.toLowerCase().includes(search_query[k]) || search_array[j].artist.toLowerCase().includes(search_query[k])  ){
                    store.push(search_array[j]);
                    doneCount++;
                    break;
                }else{
                    console.log('Not found');
                }
            }
        if(j==search_array.length-1){
            callback();
        }
        }
    }

    search(search_query, global.song_list, store, renderFunc);

    function renderFunc(){
        res.send(store).status(200);
    }
});

router.post('/youtubeFeed', function(req, res){
    var data = req.body;
    var song_info = data.search_song;
    var done = false;
    var sp = process.platform == 'win32' ? 'D:\\Projects\\Web\\Bitsify\\config\\' : '/media/praneet/Trash/Projects/Web/Bitsify/config/';
    var options = {
      mode: 'text',
      scriptPath: sp,
      args: [song_info]
    };
    var token = '';
    PythonShell.run('youtubeFeed.py', options, function(err, results){
            if(err){console.log(err)}
            else{
                token = results[1].split('watch?v=')[1];
                console.log('youtube embed token ' + token);
                done = true;
            }

            if(token != '' && done == true){
                res.send([{token: token}]).status(200);
            }else if(token == '' && done == true){
                res.send([{token: 'missing'}]).status(200);
            }
    });
});

router.post('/savePlaylist', function(req, res){
    console.log('recieving data .....');
    var data = req.body;
    var playlistData = data.playlistData;
    var name = data.name;
    console.log(data);
    if(fs.existsSync('./public/playlists/'+name+'.txt')){
        console.log('file exists');
        respond('try some other file name. file name already exists');
    }else{
        fs.writeFile('./public/playlists/'+name+'.txt', playlistData, function(err){
            if(err){
                console.log(err);
                res.send({data:'error'});
            }
            else{
                respond('saved');
            }
        });
    }
    function respond(stat){
        res.send({status:stat}).status(200);
    }
});

router.post('/loadPlaylist', function(req, res){
    console.log('reciecing data ....');
    var data = req.body;
    var name = data.name;
    if(fs.existsSync('./public/playlists/'+name+'.txt')){
        fs.readFile('./public/playlists/'+name+'.txt', 'utf8', function(err, data) {
          if (err){
            console.log(err);
            respond('some error in loading the playlist',' ');
          }else{
            respond('loaded', data);
          }
        });
        
    }else{
        console.log('playlist not found');
        respond('playlist not found',' ');
    }
    function respond(stat, playlistData){
        res.send({status:stat, data:playlistData}).status(200);
    }
})
module.exports = router;