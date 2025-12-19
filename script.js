// --- SCROLL PROGRESS ---
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};

// --- PRESENTER TIPS TOGGLE ---
function toggleTips() {
    const list = document.getElementById("tips-list");
    list.style.display = list.style.display === "block" ? "none" : "block";
}

// --- CARD EXPAND ---
function toggleCard(element) {
    const deepDive = element.querySelector('.deep-dive');
    deepDive.classList.toggle('visible');
}

// --- CHAOS MODE ---
function toggleChaos() {
    document.body.classList.toggle('chaos-active');
    const btn = document.getElementById('chaos-btn');
    btn.classList.toggle('active');
    btn.innerText = document.body.classList.contains('chaos-active') ? "CHAOS MODE: ON" : "TOGGLE CHAOS MODE";
}

// --- GENERATE EVIDENCE ---
const fakeFacts = [
    "My source is a screenshot that has been saved 14 times.",
    "This is either a cover-up or a skincare routine from another dimension.",
    "The dots are dotting. Loudly.",
    "If you disagree, you're obviously part of the acoustic cover-up.",
    "This is what Big Pop doesn't want you to giggle at.",
    "I have connected unrelated events. That's called research."
];

function generateEvidence() {
    const cards = document.querySelectorAll('.evidence-card .summary');
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const randomFact = fakeFacts[Math.floor(Math.random() * fakeFacts.length)];
    
    randomCard.style.color = "var(--accent-green)";
    randomCard.innerText = "DECRYPTING...";
    
    setTimeout(() => {
        randomCard.innerText = randomFact;
        randomCard.style.color = "var(--accent-green)";
    }, 500);
}

// --- MODAL ---
function openModal() {
    document.getElementById('fake-modal').style.display = 'flex';
}

function closeModal(e) {
    if (e.target.id === 'fake-modal' || e.target.classList.contains('close-modal')) {
        document.getElementById('fake-modal').style.display = 'none';
    }
}