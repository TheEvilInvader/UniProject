const resetLevelButton = document.getElementById("resetLevel");
const resetExpButton = document.getElementById("resetExp");

function resetLevel() 
{
    localStorage.setItem('level', 1); 
    alert("Level has been reset to 1.");
}

function resetExp() 
{
    localStorage.setItem('exp', 0);
    alert("Exp has been reset to 0.");
}

if (resetLevelButton && resetExpButton) 
{
    resetLevelButton.addEventListener("click", resetLevel);
    resetExpButton.addEventListener("click", resetExp);
} 
else 
{
    console.error("Reset buttons not found!");
}