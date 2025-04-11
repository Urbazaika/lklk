import './style.css';

import derevo from "/derevo.webp";
import ogon from "/ogon.webp";
import red from "/red.webp";
import ugol from "/ugol.webp";
import zoloto from "/zoloto.webp";

const clickImg = document.querySelector(".game .clickImg");
const clickUpgrade = document.querySelector(".game .clickUpgrade")
const clickCount = document.querySelector(".game .clickCount");
const clickAuto = document.querySelector(".game .clickAuto")

let clicks = 0;
let scorePerClick = 1;
let upgradePrice = 10;
let auto = false;

clickImg.addEventListener("click", () => {
  clicks = clicks + scorePerClick;
  clickCount.textContent = clicks;
  if (clicks >= upgradePrice) {
    clickUpgrade.style.cssText = "background-color: #73a4db;";
  }
});

clickUpgrade.addEventListener("click", () => {
  if (clicks >= upgradePrice) {
    clicks = clicks - upgradePrice;
    scorePerClick++;
    upgradePrice = upgradePrice * 2;
    clickUpgrade.style.cssText = "background-color: #73a4db;";
  }

})

clickAuto.addEventListener("click", () => {
  auto = !auto;
  if (auto) {
    clickAuto.style.cssText = "backgroud-color: #73a4db;";
  } else {
    clickAuto.style.cssText = "background-color: #c26161;";
  }
});

setInterval(function() {
  if (auto) {
    clicks++;
    clickCount.textContent = clicks;
  }
}, 1000);



function changeImg() {
  if (clicks < 100) {
    clickImg.src = derevo;
  } else if (clicks < 200) {
    cliclImg.src = ogon;
  } else if ( clicks < 300) {
    clickImg.src = red;
  } else if (clicks < 400) {
    clickImg.src = ugol;
  }else if (clicks < 500) {
    clickImg.src = zoloto;
  }
};

const render = () => {
  requestAnimationFrame(render);
  clickCount.textContent = clicks;
  changeImg();
};
render();