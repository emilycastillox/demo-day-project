const studied = document.getElementsByClassName("fa-check");
const trash = document.getElementsByClassName("fa-trash");
const star = document.getElementsByClassName('fa-star')
const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
const soundClips = document.querySelector('.sound-clips');
const form = document.getElementById('newChar')
const fileInput = document.getElementById('sound-clips')
const canvas = document.querySelector('.visualizer');
const mainSection = document.querySelector('.main-controls');

Array.from(studied).forEach(function(element) {
      element.addEventListener('click', function(){
        const character = this.parentNode.parentNode.childNodes[1].innerText
        const definition = this.parentNode.parentNode.childNodes[3].innerText
        const pinyin = this.parentNode.parentNode.childNodes[5].innerText
        const likes = parseFloat(this.parentNode.parentNode.childNodes[9].innerText)
        fetch('characters', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'character': character,
            'definition': definition,
            'pinyin':pinyin,
            'likes':likes,
            'action': 'like'
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(star).forEach(function(element) {
  element.addEventListener('click', function(e){
    e.preventDefault()
    const character = this.parentNode.parentNode.childNodes[1].innerText
    const definition = this.parentNode.parentNode.childNodes[3].innerText
    const pinyin = this.parentNode.parentNode.childNodes[5].innerText
    const favorites = e.target.classList.contains('purple') ? true : false
    fetch('favorites', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'character': character,
        'definition': definition,
        'pinyin':pinyin,
        'favorited': favorites
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const character = this.parentNode.parentNode.childNodes[1].innerText
        const definition = this.parentNode.parentNode.childNodes[3].innerText
        const pinyin = this.parentNode.parentNode.childNodes[5].innerText
        fetch('characters', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'character': character,
            'definition': definition,
            'pinyin':pinyin,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});











// Practice Characters 

document.querySelector('button').addEventListener('click', getNewChar)

function getNewChar(){
fetch("http://ccdb.hemiola.com/characters?filter=gb&fields=kDefinition,kMandarin,string") 
    .then(res => res.json()) // parse response as JSON 
    .then(data => { 
      console.log(data) 
      let max = data.length
 let randomIndex = Math.floor(Math.random() * data.length);
        let randomChar = data[randomIndex]
        console.log(randomChar)
      let ul = document.querySelector('ul')
        const li = document.createElement('li')
        ul.appendChild(li)
        let h3 = document.createElement('h3')
        li.appendChild(h3)
        h3.innerText = randomChar.string
        let p = document.createElement('p')
        li.appendChild(p)
        p.innerText = randomChar.kDefinition
        let p2 = document.createElement('p')
        li.appendChild(p2) 
        p2.innerText = randomChar.kMandarin

        let a = document.createElement('a')
        a.href = `/profile/${randomChar.string}/${randomChar.kDefinition}/${randomChar.kMandarin}`
        li.appendChild(a)

        let addButton = document.createElement('button')
        addButton.innerText = 'Add to Library'
        a.appendChild(addButton)

       // data.length max range 
        // diplay data
        // math.random is giving u a random index 
        // run random character function, check to see/ conditional
        //loop through to see if random is equal favorited 
        // let ul = document.querySelector('ul')
        // const li = document.createElement('li')
        // ul.appendChild(li)
        // let h3 = document.createElement('h3')
        // li.appendChild(h3)
        // h3.innerText = element.string
        // let p = document.createElement('p')
        // li.appendChild(p)
        // p.innerText = element.kDefinition
        // let p2 = document.createElement('p')
        // li.appendChild(p2) 
        // p2.innerText = element.kMandarin
  })
    .catch(err => { 
        console.log(`error ${err}`) 
    }); 

  }





































//audio

let audioCtx;
const canvasCtx = canvas.getContext("2d");

//main block for doing the audio recording

if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];

  let onSuccess = function(stream) {
    const mediaRecorder = new MediaRecorder(stream);

    visualize(stream);

    record.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      record.style.background = "red";

      stop.disabled = false;
      record.disabled = true;
    }

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      record.style.background = "";
      record.style.color = "";
      // mediaRecorder.requestData();

      stop.disabled = true;
      record.disabled = false;
    }

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

      const clipContainer = document.createElement('article');
      const clipLabel = document.createElement('p');
      const audio = document.createElement('audio');
      const deleteButton = document.createElement('button');

      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';

      if(clipName === null) {
        clipLabel.textContent = 'My unnamed clip';
      } else {
        clipLabel.textContent = clipName;
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");

      deleteButton.onclick = function(e) {
        let evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      }

      clipLabel.onclick = function() {
        const existingName = clipLabel.textContent;
        const newClipName = prompt('Enter a new name for your sound clip?');
        if(newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      }
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  let onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

} else {
   console.log('getUserMedia not supported on your browser!');
}

function visualize(stream) {
  if(!audioCtx) {
    audioCtx = new AudioContext();
  }

  const source = audioCtx.createMediaStreamSource(stream);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  //analyser.connect(audioCtx.destination);

  draw()

  function draw() {
    const WIDTH = canvas.width
    const HEIGHT = canvas.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    let sliceWidth = WIDTH * 1.0 / bufferLength;
    let x = 0;


    for(let i = 0; i < bufferLength; i++) {

      let v = dataArray[i] / 128.0;
      let y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();

  }
}

window.onresize = function() {
  canvas.width = mainSection.offsetWidth;
}

window.onresize();