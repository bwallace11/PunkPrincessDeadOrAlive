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
        setupDragAndDrop(); // Init draggable corkboard items
        
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
        
        // Force close overview
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

    // Generate useful thumbnails with titles
    function createOverviewThumbnails() {
        slides.forEach((slide, index) => {
            const i = index + 1;
            const title = slide.dataset.title || `Slide ${i}`;
            
            const thumb = document.createElement('div');
            thumb.className = 'thumb';
            // Insert Slide Number + Title
            thumb.innerHTML = `<strong>${i}</strong><span>${title}</span>`;
            
            thumb.addEventListener('click', () => goToSlide(i));
            overviewGrid.appendChild(thumb);
        });
    }

    // Drag and Drop for Corkboard Items
    function setupDragAndDrop() {
        const draggables = document.querySelectorAll('.draggable');
        let activeItem = null;
        let initialX, initialY, currentX, currentY, xOffset = 0, yOffset = 0;

        draggables.forEach(item => {
            item.addEventListener('mousedown', dragStart);

            function dragStart(e) {
                // Get current transform if any to resume offset
                const style = window.getComputedStyle(item);
                const matrix = new WebKitCSSMatrix(style.transform);
                xOffset = matrix.m41;
                yOffset = matrix.m42;

                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;

                if (e.target === item || item.contains(e.target)) {
                    activeItem = item;
                    activeItem.style.zIndex = 100; // bring to front
                }
            }
        });

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function drag(e) {
            if (activeItem) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                setTranslate(currentX, currentY, activeItem);
            }
        }

        function dragEnd(e) {
            if(activeItem) {
                initialX = currentX;
                initialY = currentY;
                activeItem.style.zIndex = ""; // reset z
                activeItem = null;
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    }

    // KEYBOARD HANDLING
    function handleKeydown(e) {
        const modalOpen = !evidenceModal.classList.contains('hidden') || !zoomModal.classList.contains('hidden');
        
        if (e.key === 'Escape') {
            closeAllModals();
            if(isOverview) toggleOverview();
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
        zoomContainer.innerHTML = '';
        const clone = targetElement.cloneNode(true);
        clone.classList.remove('zoom-trigger'); 
        clone.style.border = "none";
        clone.style.boxShadow = "none";
        zoomContainer.appendChild(clone);
        
        zoomSlider.value = 1;
        zoomContainer.style.transform = `scale(1)`;
        enhanceStatus.textContent = "";
        zoomModal.classList.remove('hidden');
    }

    function triggerEnhance() {
        enhanceStatus.textContent = "ENHANCING...";
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
                zoomContainer.style.transition = "transform 0.2s"; 
            }
        }, 50);
    }

    function closeAllModals() {
        evidenceModal.classList.add('hidden');
        zoomModal.classList.add('hidden');
    }

    init();
});