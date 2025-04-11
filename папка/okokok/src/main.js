import './style.css';

const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext('2d');
const player = {
 color: "red",
 size: 20,
color: 'red',
speed: 5
};

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener('keydown', function(e){

})

function clearCanvas() {
 ctx.fillStyle = "#000000";
 ctx.fillRect(0, 0, canvas.width, canvas.height);
}
clearCanvas();

function drawPlayer() {
 ctx.fillStyle = player.color;
 ctx.fillRect(player.coords.x, player.coords.y, player.size, player.size);
}


// const objs = [
//  {
//   color: "green",
//   coords: {
//    x: 100,
//   },
//  },
// ];

document.addEventListener("keydown", (e) => {
 if (e.code == "ArrowRight") {
  player.coords.x += 10;
 }
 if (e.code == "ArrowLeft") {
  player.coords.x -= 10;
 }
 if (e.code == "ArrowUp") {
  player.coords.y -= 10;
 }
 if (e.code == "ArrowDown") {
  player.coords.y += 10;
 }
});


function render() {
 clearCanvas();
 drawPlayer();
 requestAnimationFrame(render);
}
render();
// // написать функцию по отрисовки объектов
// // написать функцию isCollide для проверки столкновений