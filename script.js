const audioContext = new AudioContext();

const pianoKeys = {
  "C": 261.63,
  "C#": 277.18,
  "D": 293.66,
  "D#": 311.13,
  "E": 329.63,
  "F": 349.23,
  "F#": 369.99,
  "G": 392.00,
  "G#": 415.30,
  "A": 440.00,
  "A#": 466.16,
  "B": 493.88
};

document.getElementById('soundFile').addEventListener('change', function() {
  const reader = new FileReader();
  reader.onload = function(e) {
    const buffer = e.target.result;
    audioContext.decodeAudioData(buffer, function(decodedData) {
      const source = audioContext.createBufferSource();
      source.buffer = decodedData;
      source.connect(audioContext.destination);
      const keySound = document.getElementById('keySound');
      keySound.src = "";
      source.connect(audioContext.destination);
      keySound.onended = function() {
        source.disconnect();
      };
      const selectedKey = document.querySelector('.selected');
      const frequency = pianoKeys[selectedKey.id];
      const rate = frequency / 261.63;
      source.playbackRate.value = rate;
      source.start();
    });
  };
  reader.readAsArrayBuffer(this.files[0]);
});

document.querySelectorAll('.key').forEach(function(key) {
  key.addEventListener('mousedown', function() {
    this.classList.add('selected');
    const keySound = document.getElementById('keySound');
    keySound.src = "";
    const frequency = pianoKeys[this.id];
    const rate = frequency / 261.63;
    keySound.playbackRate = rate;
    keySound.src = "path/to/your/default/key/sound";
    keySound.play();
  });
  key.addEventListener('mouseup', function() {
    this.classList.remove('selected');
    const keySound = document.getElementById('keySound');
    keySound.pause();
    keySound.currentTime = 0;
  });
});
