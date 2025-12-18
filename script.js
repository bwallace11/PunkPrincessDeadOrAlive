/* THE TRUTH ENGINE - LOGIC FILE */

let beliefLevel = 0;

// Updates the visual progress bar based on user interaction
function updateMeter(amount) {
    beliefLevel += amount;
    if (beliefLevel > 100) beliefLevel = 100;
    
    const meter = document.getElementById('beliefMeter');
    meter.style.width = beliefLevel + '%';
    meter.innerText = 'TRUTH METER: ' + beliefLevel + '%';
}

// Logic for clicking the faces (Evidence #1)
function analyzeFace(element) {
    // Randomly position the red circle to look like "analysis"
    const circle = document.getElementById('redCircle');
    const rect = element.getBoundingClientRect();
    const containerRect = document.getElementById('faceArea').getBoundingClientRect();
    
    circle.style.display = 'block';
    // Calculate position relative to the container
    circle.style.left = (rect.left - containerRect.left) + 'px';
    circle.style.top = (rect.top - containerRect.top) + 'px';
    
    // Shake the circle using CSS animation
    circle.style.animation = 'shake 0.2s infinite';

    // After 1 second, show the "result" text
    setTimeout(() => {
        document.getElementById('faceText').style.display = 'block';
        updateMeter(25);
    }, 1000);
}

// Logic for hovering over lyrics (Evidence #2)
function revealLyric(element, text) {
    // Store original text if needed, though we pass it back in hideLyric
    element.dataset.original = element.innerText;
    element.innerText = text;
    element.style.color = 'red';
    element.style.fontFamily = 'Impact';
    element.style.letterSpacing = '2px';
}

function hideLyric(element, originalText) {
    element.innerText = originalText;
    element.style.color = '#00ff00';
    element.style.fontFamily = 'Courier New';
    element.style.letterSpacing = 'normal';
    // Give a small reward for checking the evidence
    updateMeter(10);
}

// Logic for the Red String board (Evidence #3)
function drawStrings() {
    const canvas = document.getElementById('canvas-area');
    
    // Create 5 crazy red lines every time you click
    for(let i=0; i<5; i++) {
        let line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.height = '2px';
        line.style.background = 'red';
        line.style.width = '100px';
        
        // Randomize position and rotation
        line.style.top = Math.random() * 100 + 'px';
        line.style.left = Math.random() * 200 + 'px';
        line.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        
        canvas.appendChild(line);
    }
    updateMeter(20);
}

// Logic for the Final Reveal Button
function finalReveal() {
    if (beliefLevel < 50) {
        alert("YOU HAVEN'T LOOKED AT ENOUGH EVIDENCE! SCROLL UP SHEEPLE!");
        window.scrollTo(0,0);
    } else {
        document.getElementById('truthModal').style.display = 'flex';
    }
}

// RESET FUNCTION - Clears the board
function resetInvestigation() {
    // 1. Reset the logic variable
    beliefLevel = 0;
    
    // 2. Reset the visual meter
    const meter = document.getElementById('beliefMeter');
    meter.style.width = '0%';
    meter.innerText = 'TRUTH METER: 0%';

    // 3. Remove all red strings from the canvas area
    const canvas = document.getElementById('canvas-area');
    // We only remove div elements (the lines), keeping the span elements (text)
    const lines = canvas.querySelectorAll('div'); 
    lines.forEach(line => line.remove());

    // 4. Reset Face Analysis visuals
    document.getElementById('redCircle').style.display = 'none';
    document.getElementById('faceText').style.display = 'none';

    // 5. Close the modal if it's open
    document.getElementById('truthModal').style.display = 'none';

    // 6. Scroll back to the top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    alert("SYSTEM REBOOTED. THE TRUTH IS STILL OUT THERE.");
}

// Random glitch effect on body background
setInterval(() => {
    // 10% chance to trigger a glitch every 2 seconds
    if(Math.random() > 0.9) {
        // Jitter the screen slightly
        document.body.style.transform = `translate(${Math.random()*4 - 2}px, ${Math.random()*4 - 2}px)`;
        
        // Reset it back quickly
        setTimeout(() => {
            document.body.style.transform = 'none';
        }, 100);
    }
}, 2000);