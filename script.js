$(window).on('load', function () {
  "use strict";

  let count = 1;

  function contentRotator() {
    $(`#container p:nth-child(${count})`).fadeIn(2000, function(){
      if($(this).is(`#container p:last-child`)){
        setTimeout(function () {
          $(`#container p:nth-child(${count})`).fadeOut(2000, function() {
            count = 1;
            contentRotator();
          })
        },5700)
      }
      else {
        setTimeout( function () {
          $(`#container p:nth-child(${count})`).fadeOut(2000, function() {
            count++;
            contentRotator();
          })
        }, 5700)
      }
    });
  }

  contentRotator();

  $("#caption").animate({ fontSize: '38px' }, 2000, 'easeInQuad');

  createRain();

  createSound();

  const imgCount = $('#slider ul li').length;
  const imgWidth = $('#slider ul li').first().width();
  const totalWidth = (imgWidth * imgCount) + 'px';

  let leftPosition = 0;
  let counter = 0;

  $('#slider ul').css("width", totalWidth);

  let timer = setInterval(slider, 2000);
  $('#slider ul li').mouseover(function () {
      clearInterval(timer);
    });

  $('#slider ul li').mouseout(function () {
      timer=setInterval(slider, 2000);
    });

  function slider() {
    counter++;
        
    if (counter == imgCount) {
      $('#slider ul').clone().appendTo('#slider');
      $('#slider ul').last().css('left', imgWidth + 'px');
          
      leftPosition = `-${totalWidth}`
          
      $('#slider ul').last().animate({ left: 0 }, 700, "easeInQuad");
      $('#slider ul').first().animate({ left: leftPosition }, 700, "easeInQuad", function () {
        $('#slider ul').first().remove();
      });
        
      counter = 0;
      } else {
        leftPosition = `-${counter * imgWidth}px`;
        $("#slider ul").animate({ left: leftPosition }, 700, "easeInQuad");
      }
    };
});

function createRain() {
  var canvas = document.getElementById('rain');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext('2d');

  var drops = [];

  class Raindrop {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.length = Math.random() * 10 + 10;
      this.color = 'rgba(255, 255, 255, 0.5)';
    }

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

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 5 + 15;
    const drop = new Raindrop(x, y, speed);
    drops.push(drop);
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops.length; i++) {
      drops[i].update();
    }
  };

    animate();
}; 

function createSound(){
  var audio = document .getElementById("audio");
  var soundIcon = document.getElementById("sound-icon");
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