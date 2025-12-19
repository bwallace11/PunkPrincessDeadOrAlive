document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 1;
  const totalSlides = 12;
  let isCorkboardMode = false;
  let isOverview = false;

  // Evidence now uses real Avril-related media (Commons) where possible
  const evidenceData = {
    e1: {
      title: "The Photoshoot",
      text: "Exhibit A: two photos, one pop star. If you stare long enough, your brain starts inventing details. That is basically the internet.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Avril%20Lavigne%20in%20Amsterdam,%202008%20X%20(crop).jpg?width=1200",
      alt: "Avril Lavigne performing in 2008",
      caption: "Real Avril photo (Commons). Used as ‘comparison evidence’ for the joke."
    },
    e2: {
      title: "The “Melissa” Marker",
      text: "People swear there’s a ‘Melissa’ clue in a photoshoot. I cannot confirm your eyes are not just doing capitalism-induced hallucinations.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Avril%20Lavigne%27s%20signature.svg?width=1200",
      alt: "Avril Lavigne signature",
      caption: "Avril’s real signature (Commons). Substitute your own screenshot of the ‘Melissa’ hand clue if you have it."
    },
    e3: {
      title: "The Forum Post",
      text: "User ‘Sk8rBoi99’ predicted this in 2003. They were banned. Coincidence? Or moderation doing its job? (No, it’s the conspiracy.)",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Avril%20Lavigne%202013.jpg?width=1200",
      alt: "Avril Lavigne performing in 2013",
      caption: "Real Avril photo (Commons). Placeholder for your screenshot of a legendary forum thread."
    },
    e4: {
      title: "Pitch Analysis",
      text: "We ran it through freeware audio software. The results were inconclusive, which is extremely suspicious because conspiracy math hates uncertainty.",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Waveform_example.png",
      alt: "Waveform example",
      caption: "Generic waveform example. Looks scientific enough to scare a casual audience."
    },
    e5: {
      title: "Laughter Hz",
      text: "Real Avril laughs at 440Hz. Melissa laughs at 442Hz. Do the math. I will not show the math.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Avril%20Lavigne%202013.jpg?width=1200",
      alt: "Avril Lavigne performing in 2013",
      caption: "Real Avril photo (Commons). Replace with a ‘laugh clip’ screenshot if you want."
    },
    e6: {
      title: "The Yodel",
      text: "The yodel in ‘Complicated’ vs later tracks. One is teenage chaos, one is grown-up studio polish. Clearly: a shadow government.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Avril%20Lavigne%20in%20Amsterdam,%202008%20X%20(crop).jpg?width=1200",
      alt: "Avril Lavigne performing in 2008",
      caption: "Real Avril photo (Commons). Add a screenshot of an audio editor timeline if you want extra ‘proof.’"
    },
    e7: {
      title: "Loop Analysis",
      text: "Signature loops change when you age, change pens, change moods, or get replaced by a body double. Obviously it’s the last one.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Avril%20Lavigne%27s%20signature.svg?width=1200",
      alt: "Avril Lavigne signature",
      caption: "Avril’s signature (Commons). Perfect for conspiracy ‘handwriting analysis.’"
    },
    e8: {
      title: "Pen Pressure",
      text: "Graphology experts (me squinting) say the new signature lacks angst. That is not a signature. That is a press release.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Avril%20Lavigne%27s%20signature.svg?width=1200",
      alt: "Avril Lavigne signature",
      caption: "Same real signature again because, frankly, that’s how evidence boards work in movies."
    },
    e9: {
      title: "Expert Opinion",
      text: "My cousin knows a guy who once saw a documentary. He agrees it’s weird. That’s basically peer review.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Avril%20Lavigne%202013.jpg?width=1200",
      alt: "Avril Lavigne performing in 2013",
      caption: "Real Avril photo (Commons). Placeholder until you add your ‘expert’ screenshot."
    }
  };

  const slides = document.querySelectorAll(".slide");
  const progressBar = document.getElementById("progress-bar");
  const slideCounter = document.getElementById("slide-counter");
  const dotsContainer = document.getElementById("dots-container");
  const corkboardSwitch = document.getElementById("corkboard-switch");
  const body = document.body;
  const overviewGrid = document.getElementById("overview-grid");

  const evidenceModal = document.getElementById("evidence-modal");
  const zoomModal = document.getElementById("zoom-modal");
  const closeButtons = document.querySelectorAll(".close-modal");

  const zoomSlider = document.getElementById("zoom-slider");
  const enhanceBtn = document.getElementById("enhance-btn");
  const enhanceStatus = document.getElementById("enhance-status");
  const zoomContainer = document.getElementById("zoom-target-container");

  function init() {
    createDots();
    updateUI();
    createOverviewThumbnails();

    corkboardSwitch.addEventListener("change", (e) => {
      isCorkboardMode = e.target.checked;
      if (isCorkboardMode) body.classList.add("corkboard-on");
      else body.classList.remove("corkboard-on");
    });

    document.getElementById("next-btn").addEventListener("click", nextSlide);
    document.getElementById("prev-btn").addEventListener("click", prevSlide);
    document.getElementById("restart-btn").addEventListener("click", () => goToSlide(1));

    document.addEventListener("keydown", handleKeydown);

    closeButtons.forEach((btn) => btn.addEventListener("click", closeAllModals));

    document.querySelectorAll(".evidence-card").forEach((card) => {
      card.addEventListener("click", () => openEvidence(card.dataset.id));
    });

    document.querySelectorAll(".zoom-trigger").forEach((target) => {
      target.addEventListener("click", () => openZoom(target));
    });

    zoomSlider.addEventListener("input", (e) => {
      zoomContainer.style.transform = `scale(${e.target.value})`;
    });

    enhanceBtn.addEventListener("click", triggerEnhance);
  }

  function updateUI() {
    slides.forEach((slide) => {
      slide.classList.remove("active");
      if (parseInt(slide.dataset.slide) === currentSlide) slide.classList.add("active");
    });

    const pct = ((currentSlide - 1) / (totalSlides - 1)) * 100;
    progressBar.style.width = `${pct}%`;

    slideCounter.textContent = `Slide ${currentSlide} / ${totalSlides}`;

    document.querySelectorAll(".dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx + 1 === currentSlide);
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
    isOverview = false;
    overviewGrid.classList.add("hidden");
  }

  function createDots() {
    for (let i = 1; i <= totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function createOverviewThumbnails() {
    for (let i = 1; i <= totalSlides; i++) {
      const thumb = document.createElement("div");
      thumb.className = "thumb";
      thumb.textContent = i;
      thumb.addEventListener("click", () => goToSlide(i));
      overviewGrid.appendChild(thumb);
    }
  }

  function handleKeydown(e) {
    const modalOpen =
      !evidenceModal.classList.contains("hidden") || !zoomModal.classList.contains("hidden");

    if (e.key === "Escape") {
      closeAllModals();
      if (isOverview) toggleOverview();
      return;
    }

    if (modalOpen) return;

    switch (e.key) {
      case "ArrowRight":
      case " ":
        nextSlide();
        break;
      case "ArrowLeft":
        prevSlide();
        break;
      case "o":
      case "O":
        toggleOverview();
        break;
    }
  }

  function toggleOverview() {
    isOverview = !isOverview;
    if (isOverview) overviewGrid.classList.remove("hidden");
    else overviewGrid.classList.add("hidden");
  }

  function openEvidence(id) {
    const data = evidenceData[id];
    if (!data) return;

    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-text").textContent = data.text;

    const modalImg = document.getElementById("modal-img");
    const modalCap = document.getElementById("modal-img-caption");

    modalImg.src = data.img;
    modalImg.alt = data.alt || data.title;
    modalCap.textContent = data.caption || "";

    evidenceModal.classList.remove("hidden");
  }

  function openZoom(targetElement) {
    zoomContainer.innerHTML = "";

    const clone = targetElement.cloneNode(true);
    clone.classList.remove("zoom-trigger");
    clone.style.border = "none";
    clone.style.boxShadow = "none";

    zoomContainer.appendChild(clone);

    zoomSlider.value = 1;
    zoomContainer.style.transform = `scale(1)`;
    enhanceStatus.textContent = "";

    zoomModal.classList.remove("hidden");
  }

  function triggerEnhance() {
    enhanceStatus.textContent = "ENHANCING...";

    zoomContainer.style.transition = "transform 0.1s";
    let count = 0;
    const interval = setInterval(() => {
      const randomScale = 1 + Math.random() * 0.2;
      zoomContainer.style.transform = `scale(${randomScale})`;
      count++;
      if (count > 10) {
        clearInterval(interval);
        zoomContainer.style.transform = `scale(${zoomSlider.value})`;
        enhanceStatus.textContent = "DEFINITELY REAL SCIENCE COMPLETE.";
        zoomContainer.style.transition = "transform 0.2s";
      }
    }, 50);
  }

  function closeAllModals() {
    evidenceModal.classList.add("hidden");
    zoomModal.classList.add("hidden");
  }

  init();
});

// --- Slide 10 interactivity: pins + dragging + confidence meter ---
let confidence = 0;
const maxConfidence = 4; // number of pin-photos

function setConfidenceUI() {
  const fill = document.getElementById("confidence-fill");
  const text = document.getElementById("confidence-text");
  if (!fill || !text) return;

  const pct = Math.min(100, (confidence / maxConfidence) * 100);
  fill.style.width = pct + "%";

  const lines = [
    "Click evidence pins to “confirm” the conspiracy.",
    "Okay… you are looking at pixels way too hard.",
    "We are reaching levels of delusion previously thought impossible.",
    "Congratulations. You have achieved Full Conspiracy Brain.",
    "Case closed. Reality is optional."
  ];
  text.textContent = lines[Math.min(confidence, lines.length - 1)];
}

// Pin photos open evidence modal + increase confidence
document.querySelectorAll(".pin-photo").forEach((pin) => {
  pin.addEventListener("click", () => {
    const id = pin.getAttribute("data-evidence");
    if (id) openEvidence(id);

    // only count first time per pin
    if (!pin.dataset.clicked) {
      pin.dataset.clicked = "true";
      confidence++;
      setConfidenceUI();
    }
  });
});

// Simple draggable for notes (and you can reuse it for anything with .draggable)
function makeDraggable(el) {
  let isDown = false;
  let startX = 0, startY = 0;
  let origX = 0, origY = 0;

  el.addEventListener("pointerdown", (e) => {
    isDown = true;
    el.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startY = e.clientY;

    const rect = el.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
  });

  el.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Convert to absolute positioning
    el.style.left = origX + dx + "px";
    el.style.top = origY + dy + "px";
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.position = "fixed";
    el.style.zIndex = 999;
  });

  el.addEventListener("pointerup", () => {
    isDown = false;
  });

  el.addEventListener("pointercancel", () => {
    isDown = false;
  });
}

document.querySelectorAll(".draggable").forEach(makeDraggable);

// Init confidence UI
setConfidenceUI();
