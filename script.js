let currentSlide = 0;
let prevButton, nextButton, indicators;

const slides = [
    {
        title: "THEY DO NOT WANT YOU TO KNOW",
        content: `
            <div class="text-center space-y-6">
                <div class="emoji-large animate-pulse">
                <img src="images/eye.png" alt="all seeing eye" style="width: 150px; height: 150px; justify-content: center; align-items: center;"></div>
                <h2 class="text-5xl font-bold text-red-600 -rotate-1">
                    THE AVRIL LAVIGNE REPLACEMENT CONSPIRACY
                </h2>
                <p class="text-2xl text-yellow-400 animate-bounce">
                    MELISSA VANDELLA IS AVRIL LAVIGNE
                </p>
                <div class="text-lg box-black rotate-1">
                    <p class="font-bold text-red-500">WARNING</p>
                    <p class="text-white">What you are about to see will SHATTER your reality</p>
                    <p class="text-yellow-400">The rabbit hole goes DEEP</p>
                    <p class="text-sm text-gray-400 mt-4">(Disclaimer: This is satire for entertainment purposes)</p>
                </div>
            </div>
        `
    },
    {
        title: "THE TIMELINE OF DECEPTION",
        content: `
            <div class="space-y-4">
                <div class="text-center text-3xl font-bold text-red-500 mb-6">
                    WHEN DID IT HAPPEN
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <div class="box-red -rotate-1">
                        <p class="text-xl font-bold text-yellow-300">2002-2003</p>
                        <p class="text-white">The REAL Avril was struggling with fame. She was SAD. She was TIRED. The industry needed her to PERFORM.</p>
                    </div>
                    <div class="box-purple rotate-1">
                        <p class="text-xl font-bold text-green-300">2003</p>
                        <p class="text-white">Enter MELISSA VANDELLA - hired as a body double for paparazzi. Coincidence? I THINK NOT!</p>
                    </div>
                    <div class="box-blue -rotate-2">
                        <p class="text-xl font-bold text-red-300">Late 2003</p>
                        <p class="text-white">Her grandfather dies. She is devastated. She DISAPPEARS for weeks. When she returns... SHE IS DIFFERENT.</p>
                    </div>
                    <div class="box-black rotate-2">
                        <p class="text-xl font-bold text-white">2004 onwards</p>
                        <p class="text-red-500 text-2xl font-bold">MELISSA TAKES OVER COMPLETELY</p>
                        <p class="text-yellow-300">The music changes. The style changes. EVERYTHING CHANGES.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "THE PHYSICAL EVIDENCE",
        content: `
            <div class="space-y-6">
                <div class="text-center text-3xl font-bold text-yellow-400 mb-4">
                    THE BODY NEVER LIES
                </div>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="box-gray">
                        <img src="images/avril2002.png" alt="BEFORE: Avril 2002-2003" class="slide-image">
                        <p class="text-xl font-bold text-yellow-300 text-center">BEFORE</p>
                    </div>
                    <div class="box-gray" style="border-color: #f87171;">
                        <img src="images/avrilafter2002.png" alt="AFTER: Avril 2004+" class="slide-image">
                        <p class="text-xl font-bold text-red-300 text-center">AFTER</p>
                    </div>
                </div>
                
                <div class="text-center p-4" style="background: #7f1d1d; border: 4px solid #fbbf24; margin-bottom: 1.5rem;">
                    <p class="text-2xl text-yellow-300 font-bold">SIDE-BY-SIDE COMPARISON: THE SMOKING GUN</p>
                </div>
                
                <div class="box-gray mb-6" style="border: 4px solid #dc2626;">
                    <img src="images/Compare.jpg" alt="COMPARISON: Side-by-side facial analysis" class="slide-image-large">
                    <p class="text-2xl font-bold text-red-500 text-center mt-4">LOOK AT THE DIFFERENCES!</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="box-red">
                        <p class="text-xl font-bold text-yellow-300">THE NOSE</p>
                        <p class="text-white">Pre-2003: Slightly wider bridge</p>
                        <p class="text-red-300">Post-2003: Narrower, more refined</p>
                        <p class="text-xs text-gray-300 mt-2">(Note: Lighting and aging change appearance)</p>
                    </div>
                    <div class="box-purple">
                        <p class="text-xl font-bold text-green-300">THE EYES</p>
                        <p class="text-white">Pre-2003: Rounder, wider set</p>
                        <p class="text-red-300">Post-2003: More almond-shaped</p>
                        <p class="text-xs text-gray-300 mt-2">(Note: Makeup techniques evolved)</p>
                    </div>
                    <div class="box-blue">
                        <p class="text-xl font-bold text-red-300">FACIAL STRUCTURE</p>
                        <p class="text-white">Pre-2003: Softer jawline</p>
                        <p class="text-red-300">Post-2003: Sharper features</p>
                        <p class="text-xs text-gray-300 mt-2">(Note: She literally grew up)</p>
                    </div>
                    <div class="box-green" style="border-color: #a855f7;">
                        <p class="text-xl font-bold text-purple-300">BIRTHMARKS</p>
                        <p class="text-white">Some MYSTERIOUSLY DISAPPEARED</p>
                        <p class="text-red-300">Or LASER REMOVED?</p>
                        <p class="text-xs text-gray-300 mt-2">(People remove birthmarks)</p>
                    </div>
                </div>
                <div class="text-center p-4 box-black">
                    <p class="text-2xl text-red-500 font-bold">BUT WAIT THERE IS MORE!</p>
                </div>
            </div>
        `
    },
    {
        title: "THE SMOKING GUN: HANDWRITING",
        content: `
            <div class="space-y-6">
                <div class="text-center text-4xl font-bold text-red-500 mb-6">
                    THE PEN DOES NOT LIE
                </div>
                <div class="box-yellow -rotate-1">
                    <p class="text-2xl font-bold text-white mb-4">THE MOST DAMNING EVIDENCE:</p>
                    <p class="text-xl text-yellow-300">Autographs from 2002 vs 2004 show COMPLETELY DIFFERENT handwriting!</p>
                </div>
                <div class="grid grid-cols-2 gap-6 mb-6">
                    <div class="box-gray">
                        <img src="images/avrilsigbefore2002.jpg" alt="2002 SIGNATURE" class="slide-image">
                        <p class="text-center text-yellow-300 font-bold">2002 SIGNATURE</p>
                    </div>
                    <div class="box-gray" style="border-color: #f87171;">
                        <img src="images/avrilsigafter2002.jpeg" alt="2004 SIGNATURE" class="slide-image">
                        <p class="text-center text-red-300 font-bold">2004 SIGNATURE</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <div class="box-blue">
                        <p class="text-xl font-bold text-white mb-3">BEFORE 2002:</p>
                        <ul class="text-yellow-300 space-y-2">
                            <li>Loopy circular letters</li>
                            <li>More feminine curves</li>
                            <li>Consistent slant</li>
                            <li>Signature flows naturally</li>
                        </ul>
                    </div>
                    <div class="box-red">
                        <p class="text-xl font-bold text-white mb-3">AFTER 2004:</p>
                        <ul class="text-yellow-300 space-y-2">
                            <li>Sharper more angular</li>
                            <li>Different letter formation</li>
                            <li>Inconsistent slant</li>
                            <li>Looks PRACTICED not natural</li>
                        </ul>
                    </div>
                </div>
                <div class="box-black text-center" style="border-color: #fbbf24;">
                    <p class="text-3xl text-red-500 font-bold">MELISSA HAD TO LEARN TO FORGE IT!</p>
                    <p class="text-sm text-gray-400 mt-3">(Or handwriting changes over time)</p>
                </div>
            </div>
        `
    },
    {
        title: "THE MUSICAL SHIFT",
        content: `
            <div class="space-y-6">
                <div class="text-center text-4xl font-bold text-purple-400 mb-6">
                    THE SOUND OF DECEPTION
                </div>
                <div class="space-y-4">
                    <div class="gradient-pink-purple -rotate-1">
                        <p class="text-2xl font-bold text-white mb-3">THE OLD AVRIL 2002-2003:</p>
                        <ul class="text-yellow-300 space-y-2 text-lg">
                            <li>Raw punk-rock edge</li>
                            <li>Rebellious attitude</li>
                            <li>Complicated Sk8er Boi - AUTHENTIC ANGST</li>
                            <li>Songs from REAL EMOTIONS</li>
                        </ul>
                    </div>
                    <div class="gradient-red-orange rotate-1">
                        <p class="text-2xl font-bold text-white mb-3">THE NEW AVRIL 2004:</p>
                        <ul class="text-yellow-300 space-y-2 text-lg">
                            <li>More pop-oriented less punk</li>
                            <li>Softer commercial sound</li>
                            <li>Girlfriend Hot - MANUFACTURED POP</li>
                            <li>Songs that feel CALCULATED</li>
                        </ul>
                    </div>
                </div>
                <div class="p-6 text-center" style="background: black; border: 8px solid #dc2626;">
                    <p class="text-3xl text-red-500 font-bold mb-3">MELISSA COULD NOT CAPTURE THE PUNK SPIRIT!</p>
                    <p class="text-xl text-yellow-300">A TRAINED PERFORMER not a TORTURED ARTIST!</p>
                    <p class="text-xs text-gray-400 mt-4">(Or artists evolve their sound)</p>
                </div>
            </div>
        `
    },
    {
        title: "THE CRYPTIC MESSAGES",
        content: `
            <div class="space-y-6">
                <div class="text-center text-4xl font-bold text-green-400 mb-6 animate-pulse">
                    HIDDEN IN PLAIN SIGHT
                </div>
                <div class="p-6" style="background: #450a0a; border: 4px solid #fbbf24;">
                    <p class="text-2xl font-bold text-yellow-300 mb-4">THEORY: Melissa leaves CLUES in the music!</p>
                </div>
                <div class="space-y-4">
                    <div class="box-purple -rotate-1">
                        <p class="text-xl font-bold text-yellow-300">Slipped Away (2004)</p>
                        <p class="text-white text-lg">A song about LOSS and someone DISAPPEARING</p>
                        <p class="text-red-400 font-bold mt-2">About THE REAL AVRIL?</p>
                    </div>
                    <div class="box-blue rotate-1">
                        <p class="text-xl font-bold text-yellow-300">Nobody Home (2004)</p>
                        <p class="text-white text-lg">About someone lost inside not themselves</p>
                        <p class="text-red-400 font-bold mt-2">MELISSA SINGING ABOUT HERSELF?!</p>
                    </div>
                    <div class="box-green -rotate-2">
                        <p class="text-xl font-bold text-yellow-300">My Happy Ending (2004)</p>
                        <p class="text-white text-lg">About a FAKE relationship PRETENDING</p>
                        <p class="text-red-400 font-bold mt-2">CONFESSING THE LIE?!</p>
                    </div>
                </div>
                <div class="p-6 text-center" style="background: black; border: 8px solid #dc2626;">
                    <p class="text-2xl text-red-500 font-bold">THE GUILT IS EATING HER ALIVE!</p>
                    <p class="text-sm text-gray-400 mt-3">(Or songwriters write emotional songs)</p>
                </div>
            </div>
        `
    },
    {
        title: "THE MELISSA VANDELLA DOSSIER",
        content: `
            <div class="space-y-6">
                <div class="text-center text-4xl font-bold text-red-500 mb-6">
                    WHO IS MELISSA VANDELLA?
                </div>
                <div class="box-yellow -rotate-1">
                    <p class="text-2xl font-bold text-white mb-4">THE MYSTERIOUS WOMAN:</p>
                    <img src="images/Melissa.jpg" alt="MELISSA VANDELLA" class="slide-image">
                    <p class="text-yellow-300 text-lg">Almost NO information exists about her before 2003!</p>
                    <p class="text-red-400 text-xl font-bold mt-3">CONVENIENT RIGHT?</p>
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <div class="box-purple">
                        <p class="text-xl font-bold text-yellow-300">OFFICIAL STORY:</p>
                        <p class="text-white">Hired as body double for paparazzi</p>
                        <p class="text-white">Helped maintain privacy</p>
                        <p class="text-white">Let go after months</p>
                        <p class="text-red-400 font-bold mt-2">OR WAS SHE?!</p>
                    </div>
                    <div class="box-blue">
                        <p class="text-xl font-bold text-yellow-300">THE TRAINING:</p>
                        <p class="text-white">Melissa underwent INTENSE preparation:</p>
                        <p class="text-white">Voice coaching</p>
                        <p class="text-white">Studying footage</p>
                        <p class="text-white">Learning instruments</p>
                        <p class="text-white">Memorizing life story</p>
                    </div>
                    <div class="box-red">
                        <p class="text-xl font-bold text-yellow-300">THE MOTIVE:</p>
                        <p class="text-white text-lg">Record label had MILLIONS invested!</p>
                        <p class="text-white">If she quit they lose EVERYTHING!</p>
                        <p class="text-red-400 font-bold text-2xl mt-3">SOLUTION: REPLACE HER!</p>
                    </div>
                </div>
                <div class="p-6 text-center" style="background: black; border: 8px solid #fbbf24;">
                    <p class="text-3xl text-red-500 font-bold">THE PERFECT CRIME!</p>
                    <p class="text-sm text-gray-400 mt-3">(This theory started on a Brazilian blog as satire)</p>
                </div>
            </div>
        `
    },
    {
        title: "THE PHOTOGRAPHIC EVIDENCE",
        content: `
            <div class="space-y-6">
                <div class="text-center text-4xl font-bold text-yellow-400 mb-6">
                    PICTURES DO NOT LIE... OR DO THEY?
                </div>
                <div class="box-red">T-SHIRT
                    <p class="text-2xl font-bold text-white mb-4">THE MELISSA MESSAGE INCIDENT:</p>
                    <img src="images/melissaonhand.png" alt="MELISSA written on hand" class="slide-image">
                    <p class="text-yellow-300 text-lg">In 2004 Avril was photographed with the name MELISSA written on her hand</p>
                    <p class="text-red-400 text-xl font-bold mt-3">WAS THIS A CRY FOR HELP?!</p>
                    <p class="text-white mt-2">Conspiracy theorists say she was DESPERATE to reveal her true identity!</p>
                    <p class="text-xs text-gray-400 mt-3">(It was likely just a friend Name or a brand name)</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="box-purple -rotate-1">
                        <p class="text-xl font-bold text-yellow-300">MOLE ANALYSIS:</p>
                        <p class="text-white">Facial moles visible in early photos</p>
                        <p class="text-red-400">MYSTERIOUSLY VANISHED in later years!</p>
                        <p class="text-xs text-gray-400 mt-2">(Makeup, laser removal, photo editing exist)</p>
                    </div>
                    <div class="box-blue rotate-1">
                        <p class="text-xl font-bold text-yellow-300">THE DEAD EYES:</p>
                        <p class="text-white">Post-2003 photos show emptiness</p>
                        <p class="text-red-400">The spark is GONE!</p>
                        <p class="text-xs text-gray-400 mt-2">(Or she was just tired/older)</p>
                    </div>
                </div>
                <div class="box-green">
                    <p class="text-xl font-bold text-yellow-300 mb-3">FACIAL RECOGNITION ANALYSIS:</p>
                    <p class="text-white">Some theorists claim to have run facial recognition software</p>
                    <p class="text-white">Results allegedly showed: Different person with 85% certainty</p>
                    <p class="text-red-400 font-bold mt-2">BOOM! SCIENTIFIC PROOF!</p>
                    <p class="text-xs text-gray-400 mt-3">(No verified analysis has ever been published by actual experts)</p>
                </div>
            </div>
        `
    },
    {
        title: "THE TRUTH IS OUT THERE",
        content: `
            <div class="text-center space-y-8">
                <div class="emoji-large animate-pulse">🛸👽🔍</div>
                <h2 class="text-5xl font-bold text-red-600">
                    WHAT HAPPENED TO THE REAL AVRIL?
                </h2>
                <div class="grid grid-cols-1 gap-6 max-w-4xl mx-auto" style="text-align: left;">
                    <div class="box-red -rotate-1">
                        <p class="text-2xl font-bold text-yellow-300">THEORY 1: Living in hiding</p>
                        <p class="text-white">Paid off by label living under new identity</p>
                    </div>
                    <div class="box-purple rotate-1">
                        <p class="text-2xl font-bold text-yellow-300">THEORY 2: In a facility</p>
                        <p class="text-white">Mental breakdown locked away for treatment</p>
                    </div>
                    <div class="box-blue -rotate-2">
                        <p class="text-2xl font-bold text-yellow-300">THEORY 3: Ultimate cover-up</p>
                        <p class="text-white">Something far darker happened...</p>
                        <p class="text-xs text-gray-400 mt-2">(Too dark even for this presentation)</p>
                    </div>
                </div>
                <div class="p-8 max-w-4xl mx-auto" style="background: black; border: 8px solid #dc2626;">
                    <p class="text-4xl text-red-500 font-bold mb-4">THE TRUTH IS OUT THERE</p>
                    <p class="text-xl text-yellow-400">But THEY do not want you to find it</p>
                    <p class="text-lg text-white mt-4">Question EVERYTHING</p>
                    <p class="text-lg text-white">Trust NO ONE</p>
                    <p class="text-lg text-white">The REAL Avril deserves justice</p>
                    <div class="mt-6 text-sm text-gray-500">
                        <p>Reminder: This is satire based on an internet conspiracy theory</p>
                        <p>Avril Lavigne is very much herself and alive</p>
                    </div>
                </div>
            </div>
        `
    }
];

// Image modal functionality - DEFINED OUTSIDE OF INIT
function setupImageModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <button class="image-modal-close" id="modal-close">&times;</button>
            <img class="image-modal-content" id="modal-image" src="" alt="">
            <div class="image-modal-caption" id="modal-caption"></div>
        `;
        document.body.appendChild(modal);

        // Close modal on click
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.id === 'modal-close') {
                modal.classList.remove('active');
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
            }
        });
    }

    // Add click handlers to all images
    const images = document.querySelectorAll('.slide-image, .slide-image-large');
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modalImg = document.getElementById('modal-image');
            const modalCaption = document.getElementById('modal-caption');
            modal.classList.add('active');
            modalImg.src = this.src;
            modalCaption.textContent = this.alt;
        });
    });
}

function renderSlide() {
    const slideTitle = document.getElementById('slide-title');
    const slideCounter = document.getElementById('slide-counter');
    const slideContent = document.getElementById('slide-content');

    slideTitle.textContent = slides[currentSlide].title;
    slideCounter.textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
    slideContent.innerHTML = slides[currentSlide].content;

    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slides.length - 1;

    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    // Setup image modal for any images on this slide
    setupImageModal();
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        renderSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        renderSlide();
    }
}

function goToSlide(index) {
    currentSlide = index;
    renderSlide();
}

function init() {
    const root = document.getElementById('root');
    
    root.innerHTML = `
        <div class="container">
            <div class="header">
                <div class="header-icons">
                    <i data-lucide="alert-triangle" class="text-red-500" style="width: 48px; height: 48px;"></i>
                    <h1 class="classified-title">CLASSIFIED</h1>
                    <i data-lucide="alert-triangle" class="text-red-500" style="width: 48px; height: 48px;"></i>
                </div>
                <p class="subtitle">TOP SECRET INVESTIGATION</p>
            </div>

            <div class="slide-container">
                <div class="slide-header">
                    <h2 class="slide-title" id="slide-title"></h2>
                    <p class="slide-counter" id="slide-counter"></p>
                </div>

                <div class="slide-content" id="slide-content"></div>

                <div class="navigation">
                    <button class="nav-button" id="prev-button">
                        <i data-lucide="chevron-left" style="width: 24px; height: 24px;"></i>
                        PREVIOUS
                    </button>

                    <div class="slide-indicators" id="indicators-container">
                        ${slides.map((_, index) => `
                            <button class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
                        `).join('')}
                    </div>

                    <button class="nav-button" id="next-button">
                        NEXT
                        <i data-lucide="chevron-right" style="width: 24px; height: 24px;"></i>
                    </button>
                </div>
            </div>

            <div class="footer">
                <p class="warning-text">SHARE THIS TRUTH BEFORE THEY SILENCE US</p>
                <p class="disclaimer">(Just kidding - this is satire for entertainment)</p>
            </div>
        </div>
    `;

    // Initialize references to buttons and indicators
    prevButton = document.getElementById('prev-button');
    nextButton = document.getElementById('next-button');
    indicators = document.querySelectorAll('.indicator');

    // Add event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Initialize lucide icons and render first slide
    lucide.createIcons();
    renderSlide();
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);