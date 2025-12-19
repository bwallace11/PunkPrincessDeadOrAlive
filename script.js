document.addEventListener('DOMContentLoaded', () => {
    // STATE
    let currentSlide = 1;
    const totalSlides = 12;
    let isCorkboardMode = false;
    let isOverview = false;

    // EVIDENCE DATA
    const evidenceData = {
        'e1': { title: 'The Photoshoot', text: 'Note the lighting. Shadows do not lie. The nose shadow angle is off by 3 degrees.' },
        'e2': { title: 'The Sharpie', text: 'Why did she switch from Fine Point to Chisel Tip? Chisel Tip is the tool of a corporate fraud.' },
        'e3': { title: 'The Forum Post', text: 'User "Sk8rBoi99" predicted this in 2003. They were banned. Coincidence?' },
        'e4': { title: 'Pitch Analysis', text: 'We ran this through some freeware audio software. The results were inconclusive, which is extremely suspicious.' },
        'e5': { title: 'Laughter Hz', text: 'Real Avril laughs at 440Hz. Melissa laughs at 442Hz. Do the math.' },
        'e6': { title: 'The Yodel', text: 'The signature yodel in "Complicated" vs "Girlfriend". One is soul, one is science.' },
        'e7': { title: 'Loop Analysis', text: 'The "L" loop used to be counter-clockwise. Now it is clockwise. Only a different hand does that.' },
        'e8': { title: 'Pen Pressure', text: 'Graphology experts (me looking closely) suggest the new signature lacks angst.' },
        'e9': { title: 'Expert Opinion', text: 'My cousin works at a stationery store. He agrees it looks weird.' }
    };

    // DOM ELEMENTS
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter');
    const dotsContainer = document.getElementById('dots-container');
    const corkboardSwitch = document.getElementById('corkboard-switch');
    const body = document.body;
    const overviewGrid = document.getElementById('overview-grid');
    
    // Modals
    const evidenceModal = document.getElementById('evidence-modal');
    const zoomModal = document.getElementById('zoom-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Zoom Controls
    const zoomSlider = document.getElementById('zoom-slider');
    const enhanceBtn = document.getElementById('enhance-btn');
    const enhanceStatus = document.getElementById('enhance-status');
    const zoomContainer = document.getElementById('zoom-target-container');

    // INITIALIZATION
    function init() {
        createDots();
        updateUI();
        createOverviewThumbnails();
        
        // Corkboard Toggle
        corkboardSwitch.addEventListener('change', (e) => {
            isCorkboardMode = e.target.checked;
            if (isCorkboardMode) body.classList.add('corkboard-on');
            else body.classList.remove('corkboard-on');
        });

        // Navigation Buttons
        document.getElementById('next-btn').addEventListener('click', nextSlide);
        document.getElementById('prev-btn').addEventListener('click', prevSlide);
        document.getElementById('restart-btn').addEventListener('click', () => goToSlide(1));

        // Keyboard Nav
        document.addEventListener('keydown', handleKeydown);

        // Modal Closers
        closeButtons.forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });

        // Evidence Card Clicks
        document.querySelectorAll('.evidence-card').forEach(card => {
            card.addEventListener('click', () => openEvidence(card.dataset.id));
        });

        // Zoom Target Clicks
        document.querySelectorAll('.zoom-trigger').forEach(target => {
            target.addEventListener('click', () => openZoom(target));
        });

        // Zoom Slider
        zoomSlider.addEventListener('input', (e) => {
            zoomContainer.style.transform = `scale(${e.target.value})`;
        });

        // Enhance Button
        enhanceBtn.addEventListener('click', triggerEnhance);
    }

    // NAVIGATION LOGIC
    function updateUI() {
        // Update Slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            if(parseInt(slide.dataset.slide) === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update Progress
        const pct = ((currentSlide - 1) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${pct}%`;

        // Update Counter
        slideCounter.textContent = `Slide ${currentSlide} / ${totalSlides}`;

        // Update Dots
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx + 1 === currentSlide);
        });
    }

    function nextSlide() {
        if (currentSlide < totalSlides) {
            currentSlide++;
            updateUI();
        }
    }

    function prevSlide() {
        if (currentSlide > 1) {
            currentSlide--;
            updateUI();
        }
    }

    function goToSlide(n) {
        currentSlide = n;
        updateUI();
        
        // FIX: Force close overview grid when a slide is selected
        isOverview = false;
        overviewGrid.classList.add('hidden');
    }

    function createDots() {
        for(let i=1; i<=totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function createOverviewThumbnails() {
        for(let i=1; i<=totalSlides; i++) {
            const thumb = document.createElement('div');
            thumb.className = 'thumb';
            thumb.textContent = i;
            thumb.addEventListener('click', () => goToSlide(i));
            overviewGrid.appendChild(thumb);
        }
    }

    // KEYBOARD HANDLING
    function handleKeydown(e) {
        // Ignore if modal open (unless Escape)
        const modalOpen = !evidenceModal.classList.contains('hidden') || !zoomModal.classList.contains('hidden');
        
        if (e.key === 'Escape') {
            closeAllModals();
            if(isOverview) toggleOverview(); // also close overview on Esc
            return;
        }

        if (modalOpen) return;

        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                nextSlide();
                break;
            case 'ArrowLeft':
                prevSlide();
                break;
            case 'o':
            case 'O':
                toggleOverview();
                break;
        }
    }

    // FEATURES
    function toggleOverview() {
        isOverview = !isOverview;
        if(isOverview) overviewGrid.classList.remove('hidden');
        else overviewGrid.classList.add('hidden');
    }

    // MODAL LOGIC
    function openEvidence(id) {
        const data = evidenceData[id];
        if(!data) return;

        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-text').textContent = data.text;
        evidenceModal.classList.remove('hidden');
    }

    function openZoom(targetElement) {
        // Clear previous
        zoomContainer.innerHTML = '';
        
        // Clone the clicked image
        const clone = targetElement.cloneNode(true);
        clone.classList.remove('zoom-trigger'); 
        clone.style.border = "none";
        clone.style.boxShadow = "none";
        
        zoomContainer.appendChild(clone);
        
        // Reset controls
        zoomSlider.value = 1;
        zoomContainer.style.transform = `scale(1)`;
        enhanceStatus.textContent = "";
        
        zoomModal.classList.remove('hidden');
    }

    function triggerEnhance() {
        enhanceStatus.textContent = "ENHANCING...";
        
        // Silly animation sequence
        zoomContainer.style.transition = "transform 0.1s";
        let count = 0;
        const interval = setInterval(() => {
            const randomScale = 1 + (Math.random() * 0.2);
            zoomContainer.style.transform = `scale(${randomScale})`;
            count++;
            if(count > 10) {
                clearInterval(interval);
                zoomContainer.style.transform = `scale(${zoomSlider.value})`;
                enhanceStatus.textContent = "DEFINITELY REAL SCIENCE COMPLETE.";
                zoomContainer.style.transition = "transform 0.2s"; // restore smooth
            }
        }, 50);
    }

    function closeAllModals() {
        evidenceModal.classList.add('hidden');
        zoomModal.classList.add('hidden');
    }

const evidenceData = {
  e1: {
    title: "The Photoshoot",
    text: "Fans claim the photoshoot era looks like a different person. The scientific method used here is: squinting at pixels and trusting vibes.",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/OOjs_UI_icon_camera.svg",
    alt: "Camera icon evidence",
    caption: "Exhibit: photographic vibes (not legally binding)"
  },
  e2: {
    title: "The Sharpie",
    text: "Signature consistency becomes a full-time job for conspiracy forums. A Sharpie line becomes a personality test.",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/OOjs_UI_icon_edit-ltr.svg",
    alt: "Marker icon evidence",
    caption: "Exhibit: handwriting and marker-based chaos"
  },
  e3: {
    title: "The Forum Post",
    text: "A 2007 forum post is treated like a government document. Screenshots were taken. Feelings were felt.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0c/OOjs_UI_icon_speechBubble.svg",
    alt: "Forum icon evidence",
    caption: "Exhibit: sacred internet texts"
  },
  e4: {
    title: "Pitch Analysis",
    text: "We compared vocal tone using the latest lab equipment: headphones and overconfidence. Results: dramatic.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/92/OOjs_UI_icon_chart.svg",
    alt: "Chart icon evidence",
    caption: "Exhibit: charts make it feel real"
  },
  e5: {
    title: "Laughter Hz",
    text: "Somebody, somewhere, decided laughter has a measurable frequency that proves identity replacement. Respect the grind, I guess.",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/43/OOjs_UI_icon_smile.svg",
    alt: "Smile icon evidence",
    caption: "Exhibit: smile science (unlicensed)"
  },
  e6: {
    title: "The Yodel",
    text: "A vocal moment becomes a ‘tell.’ Because nothing says forensic proof like a single weird note in a chorus.",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3b/OOjs_UI_icon_music.svg",
    alt: "Music icon evidence",
    caption: "Exhibit: the note that launched 1,000 comments"
  },
  e7: {
    title: "Loop Analysis",
    text: "Signature loops are examined like they’re crop circles. One loop too round and suddenly it’s a cover-up.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/92/OOjs_UI_icon_loop.svg",
    alt: "Loop icon evidence",
    caption: "Exhibit: loop-based suspicion"
  },
  e8: {
    title: "Pen Pressure",
    text: "Pen pressure changes over time for normal reasons. But normal reasons do not get clicks, so here we are.",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7f/OOjs_UI_icon_bold.svg",
    alt: "Bold icon evidence",
    caption: "Exhibit: pressure = conspiracy"
  },
  e9: {
    title: "Expert Opinion",
    text: "The ‘expert’ is usually a stranger online who owns a printer and too much confidence. Still, we salute the commitment.",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/OOjs_UI_icon_userAvatar.svg",
    alt: "Expert icon evidence",
    caption: "Exhibit: internet-certified expertise"
  }
};

const evidenceModal = document.getElementById("evidence-modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalImg = document.getElementById("modal-img");
const modalImgCaption = document.getElementById("modal-img-caption");

document.querySelectorAll(".evidence-card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-id");
    const data = evidenceData[id];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalText.textContent = data.text;

    modalImg.src = data.img;
    modalImg.alt = data.alt;
    modalImgCaption.textContent = data.caption;

    evidenceModal.classList.remove("hidden");
  });
});

// close modal (keeps your existing close buttons working)
document.querySelectorAll(".close-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
  });
});

    // Run Init
    init();
});