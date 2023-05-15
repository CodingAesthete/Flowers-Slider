$(window).on('load', function () {
  "use strict";

  $("#caption").animate({ fontSize: '44px' }, 2000, 'easeInQuad');

  createRain();

  createSound();

  var imgCount = $('#slider ul li').length;
  var imgWidth = $('#slider ul li').first().width();
  var totalWidth = (imgWidth * imgCount) + 'px';

  var leftPosition = 0;
  var counter = 0;

  $('#slider ul').css("width", totalWidth);

  var timer = setInterval(slider, 2000);

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
    }
    else {
      leftPosition = `-${counter * imgWidth}px`;
      $("#slider ul").animate({ left: leftPosition }, 700, "easeInQuad");
    }
  };

  // $('#previous').click(function () {
  //   counter--;

  //   if (counter === -1) {

  //     $('#slider ul').clone().prependTo('#slider');
  //     $('#slider ul').first().css('left', -imgCount*imgWidth + 'px');

  //     leftPosition = `${imgWidth}`

  //     $('#slider ul').first().animate({left: -(imgCount-1)*imgWidth}, 700, "easeInQuad");
  //     $('#slider ul').last().animate({left: imgWidth}, 700, "easeInQuad", function() {
  //       $('#slider ul').last().remove();
  //     });
  //     counter=imgCount-1;
  //   }  
  //   else{
  //     leftPosition = `-${counter * imgWidth}px`;
  //     $("#slider ul").animate({ left: leftPosition }, 700, "easeInQuad");
  //   }

  // });

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
    const speed = Math.random() * 5 + 10;
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
  var audio = document.getElementById("audio");
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