const fs = require('graceful-fs');
const express = require('express');
const path = require('path');
const mm = require('musicmetadata');

console.log(process.platform);
var user = process.platform == 'win32' ? 'praneetWin':'praneet';
const windowsPath = "D:\\Music\\"
const linuxPath = "/media/praneet/Trash/Music/"
const testFolder = process.platform == 'win32' ? windowsPath: linuxPath ;
global.song_list = [];

function readorcreateSymlink(){
    try{
            fs.symlink(testFolder, 'public/symlink/'+user, function(log){
                console.log('symlink created');
            });
        }catch(e){
            console.log('symlink was not created');
        }
        var fileList = [];
        global.song_list = [];
        var counter = 0;
        var i = 0;

        fs.readdir(testFolder, (err, files) => {console.log('reading files');
            if (err) console.log(err);
            else {
                for(var i in files) {
                   if(path.extname(files[i]) === ".mp3") {
                       fileList.push(files[i]);
                   }
                }
            }
            console.log(fileList.length);
            fileList.forEach(function(i){
                
                var fileh = (testFolder + i);
                var readableStream = fs.createReadStream(fileh);
                var parser = mm(readableStream, function(err, metadata) {
                    counter++;
                    // console.log(counter);
                    if (err) {
                        readableStream.close();
                    } else {
                        readableStream.close();
                        var o = {}
                        o.path = '/symlink/'+user+'/'+i;
                        o.title = metadata.title;
                        o.artist = metadata.artist.join(',');
                        o.album = metadata.album;
                        var image = metadata.picture;
                        // console.log(image[0].data)
                        var base64String = '';
                        if (image.length!=0) {
                            // for (var i = 0; i < image[0].data.length; i++) {
                            //     base64String += String.fromCharCode(image[0].data[i]);
                            // }
                            base64String = new Buffer(image[0].data).toString('base64');
                            //console.log(base64String);

                        } else {
                            base64String = '/images/none.png';
                        }
                        o.image = base64String;
                        global.song_list.push(o);
                        // console.log('----------');
                        // console.log(fileList[fileList.length-1]);
                        // console.log('----------');
                        // console.log(fileList.length-1);
                    }
                });
            });

        // var id3 = id3.fetch(testFolder+file_list[0]);
        // res.send(id3);

    });
}
readorcreateSymlink();

exports.song_list = global.song_list;