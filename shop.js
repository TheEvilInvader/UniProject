let userLevel = 1;

function checkUnlocks() 
{
    const sections = document.querySelectorAll('.ShopContent');
    sections.forEach(section => {
        const requiredLevel = parseInt(section.dataset.level);
        if (userLevel >= requiredLevel) 
            {
            section.classList.add('unlocked');
            }
    });
}

function setBackgroundColor() 
{
    const colorPicker = document.getElementById('bgColorPicker');
    const color = colorPicker.value;
    document.querySelectorAll('.BigBox').forEach(box => {box.style.backgroundColor = color;});
    localStorage.setItem('customBgColor', color);
}

function setCustomBackground() 
{
    const imageUrl = document.getElementById('bgImageInput').value;
    document.querySelector('.Conwayb').style.backgroundImage = `url(${imageUrl})`;
    localStorage.setItem('customBgImage', imageUrl);
}

function setCustomFont() {
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
    if (savedColor) 
    {
        document.querySelectorAll('.BigBox').forEach(box => {box.style.backgroundColor = savedColor;});
    }
    if (savedImage) 
    {
        document.querySelector('.Conwayb').style.backgroundImage = `url(${savedImage})`;
    }
    if (savedFont) 
    {
        document.body.style.fontFamily = savedFont;
    }
}

document.addEventListener('DOMContentLoaded', () => {checkUnlocks();loadSavedPreferences();});

// For testing purposes - function to level up
function levelUp() {
    userLevel++;
    document.querySelector('.BigBox > u').textContent = `Life Manager - Shop (Level ${userLevel})`;
    checkUnlocks();
}

// Add test button to increase level (remove in production)
const testButton = document.createElement('button');
testButton.textContent = 'Level Up (Test)';
testButton.style.position = 'fixed';
testButton.style.top = '10px';
testButton.style.right = '10px';
testButton.addEventListener('click', levelUp);
document.body.appendChild(testButton);