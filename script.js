const fonts = ['Lyno-Jean 2', 'Lyno-Stan 2', 'Lyno-Ulys 2', 'Lyno-Walt 2'];
const title = document.getElementById('title');
const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
title.style.fontFamily = `'${randomFont}', sans-serif`;

const images = ['images/ojavi.png', 'images/ojavi2.png'];
const randomImage = images[Math.floor(Math.random() * images.length)];
document.getElementById('random-image').src = randomImage;