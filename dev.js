document.addEventListener('DOMContentLoaded', () => 
{
    const videoElement = document.getElementById("secretVideo");
    const codeActions = {
        // Insert the name type and target accordingly!
        'crypt': 
        {
            type: 'video',target: './videos/crypt.mp4'
        },
        'fight-gabriel': 
        {
            type: 'video',target: './videos/Peakv2.mp4'
        },
        'relax':
        {
            type: 'video',target: './videos/Cinema.mp4'
        },
        'arise':
        {
            type: 'redirect',target: './Arise.html'
        },
        'motivation':
        {
            type: 'video',target: './videos/Motivation.mp4'
        },
        'home': 
        {
            type: 'redirect',target: './index.html'
        },
        'shop': 
        {
            type: 'redirect',target: './shop.html'
        }
    };

    videoElement.addEventListener('ended', () => {videoElement.style.display = 'none';});

    // Modular function
    function handleSecretCode(input) 
    {
        const normalizedInput = input.trim().toLowerCase();
        const action = codeActions[normalizedInput];
        if (!action) return false;

        switch(action.type) {
            case 'video':
                videoElement.src = action.target;
                videoElement.style.display = 'block';
                videoElement.play().catch(() => {
                    alert("Click the video to start playback!");
                });
                return true;

            case 'redirect':
                window.location.href = action.target;
                return true;

            default:
                return false;
        }
    }
    const checkButton = document.getElementById("checkButton");
    const secretInput = document.getElementById("secretInput");
    checkButton.addEventListener("click", () => {
        if (!handleSecretCode(secretInput.value)) {
            alert("Invalid code! Try 'crypt'");
        }
    });

    secretInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') checkButton.click();
    });
});
