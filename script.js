$(window).on('load', function () {
  "use strict";

  AddRain();
  AddSound();

  const imgCount = $('#slider ul li').length;
  const imgWidth = $('#slider ul li').first().width();
  const totalWidth = (imgWidth * imgCount) + 'px';

  let leftPosition = 0;
  let counter = 0;

  $('#slider ul').css("width", totalWidth);

  $('#next').click(function () {
    counter++;

    if (counter === imgCount) {
      counter = 0;
    }

    leftPosition = `-${counter * imgWidth}px`
    $("#slider ul").animate({ left: leftPosition }, 700, "easeInQuad")
  });

  $('#previous').click(function () {
    counter--;

    if (counter === -1) {
      counter = imgCount - 1;
    }

    leftPosition = `-${counter * imgWidth}px`
    $("#slider ul").animate({ left: leftPosition }, 700, "easeInQuad")
  });

});

function AddRain() {
  const canvas = document.getElementById('rain');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');

  const drops = [];

  class Raindrop {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.length = Math.random() * 10 + 10;
      this.color = 'rgba(255, 255, 255, 0.5)';
    }

    // Update the raindrop position and draw it on the canvas
    update() {
      this.y += this.speed;
      if (this.y > canvas.height) {
        this.y = Math.random() * -50;
      }
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  for (var i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 5 + 5;
    const drop = new Raindrop(x, y, speed);
    drops.push(drop);
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops.length; i++) {
      drops[i].update();
    }
  }

  animate();
}

function AddSound() {
  const audio = document.getElementById("audio");
  const soundIcon = document.getElementById("sound-icon");
  soundIcon.src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-volume-mute-512.png";
  $('#audio').prop('volume', 0.08);

  soundIcon.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      soundIcon.src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-volume-high-512.png";
    } else {
      audio.pause();
      soundIcon.src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-volume-mute-512.png";
    }
  });
}