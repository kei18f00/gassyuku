const electron = require('electron')
const desktopCapturer = electron.desktopCapturer;

function handleStream (stream) {
    console.log("Hit")
    var video = document.createElement('video');
 document.body.appendChild(video);
 video.src = window.URL.createObjectURL(stream);
 video.play();
  }
  

    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
        if (error) throw error
        
        sources.forEach(source => {
           if(source.name === 'hitotume'){
            console.log(source)
           } 
        });
      })
