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
        setupDragAndDrop(); 
        
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
        slides.forEach(slide => {
            slide.classList.remove('active');
            if(parseInt(slide.dataset.slide) === currentSlide) {
                slide.classList.add('active');
            }
        });

        const pct = ((currentSlide - 1) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${pct}%`;

        slideCounter.textContent = `Slide ${currentSlide} / ${totalSlides}`;

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
        currentSlide = parseInt(n);
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

    // DRAG AND DROP (Simple implementation avoiding DOMMatrix complexity)
    function setupDragAndDrop() {
        const draggables = document.querySelectorAll('.draggable');
        let activeItem = null;
        let startX, startY, initialLeft, initialTop;

        draggables.forEach(item => {
            item.addEventListener('mousedown', dragStart);

            function dragStart(e) {
                // Prevent selecting text while dragging
                e.preventDefault(); 
                
                activeItem = item;
                
                // Get mouse start pos
                startX = e.clientX;
                startY = e.clientY;

                // Get current element pos relative to parent (using offsetLeft/Top)
                // This resets transform to leverage absolute positioning logic if mixed
                const rect = activeItem.getBoundingClientRect();
                const parentRect = activeItem.parentElement.getBoundingClientRect();
                
                // Calculate position relative to the container
                initialLeft = rect.left - parentRect.left;
                initialTop = rect.top - parentRect.top;

                // Bring to front
                activeItem.style.zIndex = 100;
            }
        });

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function drag(e) {
            if (activeItem) {
                e.preventDefault();
                
                // Calculate delta
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                // We apply transform: translate. 
                // Note: This temporarily ignores the 'rotation' from CSS unless we preserve it.
                // For simplicity in this vanilla JS version, we allow it to straighten out while dragging
                // or we could append the rotation string if we parsed it. 
                // Let's use simple left/top manipulation for stability in this specific use case
                // since we have mixed transforms (rotate) in CSS.
                
                // Actually, updating left/top directly is safer than conflicting with CSS transforms
                // But we need to clear the CSS 'top/bottom/left/right' if they are set by class.
                // Instead, let's use translate3d and just accept the rotation loss for the "picked up" look.
                activeItem.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.1)`;
            }
        }

        function dragEnd(e) {
            if(activeItem) {
                // "Drop" it - it snaps back to its CSS position + the transform we just applied?
                // No, we need to commit the move. 
                // Since this is a simple toy, let's just leave the transform applied.
                // It will stay where dropped relative to original pos.
                activeItem.style.zIndex = ""; 
                activeItem.style.transform = activeItem.style.transform.replace('scale(1.1)', 'scale(1)');
                activeItem = null;
            }
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