const fonts = ['Lyno-Jean 2', 'Lyno-Stan 2', 'Lyno-Walt 2'];
const title = document.getElementById('title');

if (title) {
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    title.style.fontFamily = `'${randomFont}', sans-serif`;
}