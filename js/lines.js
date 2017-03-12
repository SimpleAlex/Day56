window.onload = function() {
var c = document.getElementById('c'),
  ctx = c.getContext('2d'),
  w = c.width=window.innerWidth,
  h = c.height=window.innerHeight,
  X = w/2,
  Y = h/2,

  goX1 = 3,
  goX2 = 1,
  goY1 = 3,
  goY2 = 1,
  colorUpdate = 0,
  mouse = {
    x: X,
    y: Y
  };
  document.addEventListener('mousemove', function(event){
  mouse.x =  event.pageX;
  mouse.y = event.pageY;
});
  document.addEventListener('click', function(){
   ctx.fillStyle = "#222",
  ctx.fillRect(0,0,w,h);
});

var particles = {},
        particleIndex = 1,
        settings = {
          density: 10
        };

function Particle(){
this.x = mouse.x;
this.y = mouse.y;
this.vx = Math.random() * goX1 - goX2;
this.vy = Math.random() * goY1 - goY2;
particleIndex++;
particles[particleIndex] = this;
this.id = particleIndex;
this.life = 0;
this.maxLife = 100;
}
Particle.prototype.draw= function(){
var e = this;
e.x += e.vx;
e.y += e.vy;
e.life++;
if(e.life >= e.maxLife){
  delete particles[e.id];
}
ctx.beginPath();
ctx.arc(this.x,this.y,1,0,Math.PI*2);
ctx.fillStyle = "hsla(" + (colorUpdate % 360) + ",35%,45%,0.75)";
ctx.fill();
};

var drawing = function() {
      for (var i = 0; i < settings.density; i++) {
        if (Math.random() < 0.5) {
         new Particle();
        }else{new Particle();}

      }
    colorUpdate += 1;
      for (var i in particles) {
        particles[i].draw();
      }
 requestAnimationFrame(drawing);
    };
  drawing();
};
