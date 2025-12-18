/* THE TRUTH ENGINE */

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
    const circle = document.getElementById('redCircle');
    const rect = element.getBoundingClientRect();
    const containerRect = document.getElementById('faceArea').getBoundingClientRect();
    
    circle.style.display = 'block';
    circle.style.left = (rect.left - containerRect.left) + 'px';
    circle.style.top = (rect.top - containerRect.top) + 'px';
    circle.style.animation = 'shake 0.2s infinite';

    setTimeout(() => {
        document.getElementById('faceText').style.display = 'block';
        updateMeter(25);
    }, 1000);
}

// Logic for hovering over lyrics (Evidence #2)
function revealLyric(element, text) {
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
    updateMeter(10);
}

// Logic for Audio Visualizer (Evidence #2.5)
function playAudioAnalysis() {
    const bars = document.querySelectorAll('.bar');
    const text = document.getElementById('audio-text');
    
    text.innerText = "ANALYZING FREQUENCY...";
    text.style.color = "yellow";

    let counter = 0;
    // Chaotic interval
    const interval = setInterval(() => {
        bars.forEach(bar => {
            const height = Math.floor(Math.random() * 90) + 10;
            bar.style.height = height + '%';
            bar.classList.add('active');
        });
        counter++;

        if (counter > 20) { // Stop after ~2 seconds
            clearInterval(interval);
            bars.forEach(bar => {
                bar.style.height = '10px';
                bar.classList.remove('active');
                bar.style.backgroundColor = 'red';
            });
            text.innerHTML = "RESULT: <span style='color:red; font-weight:bold;'>VOICE PRINT MISMATCH (ERROR 404)</span>";
            updateMeter(15);
        }
    }, 100);
}

// Logic for Skin Enhancement (Evidence #2.9)
function enhanceSkin(element) {
    // Invert colors to show "X-Ray" mode
    element.style.filter = "invert(100%) contrast(200%)";
    
    // If it's the second circle (the fake one), trigger a message
    if (element.innerText.includes("FAKE")) {
        if(!element.dataset.scanned) {
            updateMeter(10);
            element.dataset.scanned = "true";
        }
    }
}

// Add mouseout listener for Skin Enhancement
document.querySelectorAll('.skin-patch').forEach(patch => {
    patch.addEventListener('mouseout', () => {
        patch.style.filter = "none";
    });
});

// Logic for the Red String board (Evidence #3)
function drawStrings() {
    const canvas = document.getElementById('canvas-area');
    
    for(let i=0; i<5; i++) {
        let line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.height = '2px';
        line.style.background = 'red';
        line.style.width = '100px';
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

// RESET FUNCTION
function resetInvestigation() {
    beliefLevel = 0;
    
    // Reset visual meter
    const meter = document.getElementById('beliefMeter');
    meter.style.width = '0%';
    meter.innerText = 'TRUTH METER: 0%';

    // Remove red strings
    const canvas = document.getElementById('canvas-area');
    const lines = canvas.querySelectorAll('div'); 
    lines.forEach(line => line.remove());

    // Reset Faces
    document.getElementById('redCircle').style.display = 'none';
    document.getElementById('faceText').style.display = 'none';

    // Reset Audio Visualizer
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.backgroundColor = '#003300';
        bar.style.height = '10px';
    });
    document.getElementById('audio-text').innerText = "[ CLICK TO RUN SPECTROGRAPH ]";
    document.getElementById('audio-text').style.color = "grey";

    // Reset Skin Scan data
    document.querySelectorAll('.skin-patch').forEach(p => p.dataset.scanned = "");

    // Close modal
    document.getElementById('truthModal').style.display = 'none';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    alert("SYSTEM REBOOTED. THE TRUTH IS STILL OUT THERE.");
}

// Random glitch effect
setInterval(() => {
    if(Math.random() > 0.9) {
        document.body.style.transform = `translate(${Math.random()*4 - 2}px, ${Math.random()*4 - 2}px)`;
        setTimeout(() => {
            document.body.style.transform = 'none';
        }, 100);
    }
}, 2000);