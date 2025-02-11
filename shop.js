let userLevel = parseInt(localStorage.getItem('level')) || 1;
let exp = parseInt(localStorage.getItem('exp')) || 0;

function updateProgressBar() 
{
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const levelDisplay = document.getElementById("levelDisplay");

    levelDisplay.textContent = userLevel;

    const progress = (exp % 100) / 100 * 360;
    progressBar.style.background = `conic-gradient(#4564E1 ${progress}deg, #eee ${progress}deg 360deg)`;
    progressText.textContent = `${exp % 100}/100`;
}

function checkUnlocks() 
{
    const sections = document.querySelectorAll('.ShopContent');
    sections.forEach(section => {
        const requiredLevel = parseInt(section.dataset.level);
        if (userLevel >= requiredLevel) {
            section.classList.add('unlocked');
        }
    });
}

function setBackgroundColor() 
{
    const colorPicker = document.getElementById('bgColorPicker');
    const color = colorPicker.value;
    document.querySelectorAll('.BigBox').forEach(box => { box.style.backgroundColor = color; });
    localStorage.setItem('customBgColor', color);
}

function setCustomBackground() 
{
    let imageUrl = document.getElementById('bgImageInput').value;
    if (!imageUrl.endsWith('.gif')) {
        imageUrl += '.gif';}
    document.querySelector('.Conwayb').style.backgroundImage = `url(${imageUrl})`;
    localStorage.setItem('customBgImage', imageUrl);
}

function setCustomFont() 
{
    const fontSelect = document.getElementById('fontSelect');
    const selectedFont = fontSelect.value;
    document.body.style.fontFamily = selectedFont;
    localStorage.setItem('customFont', selectedFont);
}

function loadSavedPreferences() 
{
    const savedColor = localStorage.getItem('customBgColor');
    const savedImage = localStorage.getItem('customBgImage');
    const savedFont = localStorage.getItem('customFont');
    if (savedColor) {
        document.querySelectorAll('.BigBox').forEach(box => { box.style.backgroundColor = savedColor; });
    }
    if (savedImage) {
        document.querySelector('.Conwayb').style.backgroundImage = `url(${savedImage}).`;
        
    }
    if (savedFont) {
        document.body.style.fontFamily = savedFont;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkUnlocks();
    loadSavedPreferences();
    updateProgressBar();
});