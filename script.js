document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. RANDOM ROTATION FOR CARDS ---
    const cards = document.querySelectorAll('.evidence-card');
    cards.forEach(card => {
        const randomRot = (Math.random() * 6) - 3; // -3 to 3 deg
        card.style.setProperty('--rotation', `${randomRot}deg`);
        
        // Expand functionality
        card.addEventListener('click', () => {
            const expanded = card.querySelector('.expanded-text');
            expanded.classList.toggle('hidden');
            drawRedStrings(); // Redraw strings as cards change height
        });
    });

    // --- 2. SCROLL PROGRESS ---
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + "%";
        
        // Random classified stamp effect logic could go here
    });

    // --- 3. RED STRINGS GENERATOR ---
    function drawRedStrings() {
        const svg = document.getElementById('redStrings');
        svg.innerHTML = ''; // Clear existing
        const container = document.getElementById('evidenceGrid');
        const cardElements = Array.from(document.querySelectorAll('.evidence-card'));
        const containerRect = container.getBoundingClientRect();
        
        // Draw 5-8 random connections
        const intensity = parseInt(document.getElementById('intensitySlider').value);
        const numLines = 5 + (intensity * 3);

        for(let i=0; i<numLines; i++) {
            const cardA = cardElements[Math.floor(Math.random() * cardElements.length)];
            let cardB = cardElements[Math.floor(Math.random() * cardElements.length)];
            while(cardA === cardB) {
                cardB = cardElements[Math.floor(Math.random() * cardElements.length)];
            }

            // Get pin coordinates relative to container
            const rectA = cardA.querySelector('.pin').getBoundingClientRect();
            const rectB = cardB.querySelector('.pin').getBoundingClientRect();

            // Calculate center of pin relative to SVG (which overlays the grid)
            const x1 = rectA.left - containerRect.left + (rectA.width/2);
            const y1 = rectA.top - containerRect.top + (rectA.height/2);
            const x2 = rectB.left - containerRect.left + (rectB.width/2);
            const y2 = rectB.top - containerRect.top + (rectB.height/2);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            svg.appendChild(line);
        }
    }

    // Draw strings on load and resize
    window.addEventListener('load', drawRedStrings);
    window.addEventListener('resize', drawRedStrings);

    // --- 4. INTENSITY SLIDER ---
    const slider = document.getElementById('intensitySlider');
    const label = document.getElementById('intensityLabel');
    const body = document.body;

    slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        body.className = ''; // reset
        
        if (val === 1) {
            label.innerText = "LOW";
            body.classList.add('intensity-low');
            document.documentElement.style.setProperty('--noise-opacity', '0.05');
        } else if (val === 2) {
            label.innerText = "MEDIUM";
            body.classList.add('intensity-med');
            document.documentElement.style.setProperty('--noise-opacity', '0.15');
        } else {
            label.innerText = "HIGH (UNHINGED)";
            body.classList.add('intensity-high');
            document.documentElement.style.setProperty('--noise-opacity', '0.3');
        }
        drawRedStrings();
    });

    // --- 5. GENERATE EVIDENCE BUTTON ---
    const newEvidenceLines = [
        "My source is a forum post from 2007 and I trust it with my life.",
        "This is either a cover-up or a very intense skincare routine.",
        "They don’t want you to know this because it sounds ridiculous.",
        "Wake up. The dots are dotting.",
        "If you deny this, you are simply afraid of the truth and also fun.",
        "I have connected 14 unrelated events. That’s called research."
    ];

    document.getElementById('generateEvidenceBtn').addEventListener('click', () => {
        const cards = document.querySelectorAll('.evidence-card');
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        const shortText = randomCard.querySelector('.short-text');
        
        // Add glitch effect
        shortText.style.color = "var(--neon-green)";
        shortText.innerText = "DECRYPTING...";
        
        setTimeout(() => {
            shortText.innerText = newEvidenceLines[Math.floor(Math.random() * newEvidenceLines.length)];
            shortText.style.color = "inherit";
            // Flash effects
            randomCard.style.boxShadow = "0 0 20px white";
            setTimeout(() => { randomCard.style.boxShadow = ""; }, 300);
        }, 500);
    });

    // --- 6. QUIZ LOGIC ---
    let yesCount = 0;
    const qBtns = document.querySelectorAll('.q-btn');
    
    qBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Visual selection
            const siblings = this.parentElement.querySelectorAll('.q-btn');
            siblings.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    document.getElementById('calculateResult').addEventListener('click', () => {
        yesCount = document.querySelectorAll('.q-btn.selected[data-val="yes"]').length;
        const resultDiv = document.getElementById('quizResult');
        const rTitle = document.getElementById('resultTitle');
        const rDesc = document.getElementById('resultDesc');
        
        resultDiv.classList.remove('hidden');
        
        if (yesCount <= 1) {
            rTitle.innerText = "RESULT: 0–1 YES";
            rDesc.innerText = "You are still reachable. Go touch grass while you can.";
        } else if (yesCount <= 3) {
            rTitle.innerText = "RESULT: 2–3 YES";
            rDesc.innerText = "You are halfway on the corkboard. One more documentary and you're ours.";
        } else {
            rTitle.innerText = "RESULT: 4–5 YES";
            rDesc.innerText = "Welcome. Here’s your red string. The meetings are on Tuesdays.";
        }
    });

    // --- 7. EXTRAS ---
    // Signal Interference
    document.getElementById('toggleInterference').addEventListener('click', () => {
        document.body.classList.toggle('active-interference');
    });

    // Modal
    const modal = document.getElementById('modal');
    document.getElementById('downloadBtn').addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});