document.addEventListener('DOMContentLoaded', function () {


  const introScreen   = document.getElementById('introScreen');
  const introEnvelope = document.getElementById('introEnvelope');
  const scene         = document.getElementById('scene');

  introEnvelope.addEventListener('click', function () {
    introEnvelope.classList.add('opening');

    setTimeout(function () {
      introScreen.classList.add('fade-out');
      scene.classList.add('revealed');

      setTimeout(function () {
        document.querySelectorAll('.scene-element').forEach(function (el) {
          el.classList.add('assembled');
        });
      }, 200);

      setTimeout(function () {
        introScreen.remove();
      }, 800);
    }, 650);
  });


  const letterCard    = document.getElementById('letterCard');
  const letterOverlay = document.getElementById('letterOverlay');
  const closeOverlay  = document.getElementById('closeOverlay');

  let isOpen = false;


  function openLetterOverlay() {
    isOpen = true;
    letterOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    spawnFloatingHearts();
  }

  function closeLetterOverlay() {
    isOpen = false;
    letterOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  letterCard.addEventListener('click', function () {
    if (!isOpen) openLetterOverlay();
  });

  closeOverlay.addEventListener('click', closeLetterOverlay);

  letterOverlay.addEventListener('click', function (e) {
    if (e.target === letterOverlay || e.target.classList.contains('overlay-backdrop')) {
      closeLetterOverlay();
    }
  });


  const pCards = Array.from(document.querySelectorAll('.p-card'));
  pCards.forEach(card => {
    card.addEventListener('click', function () {
      const topCard = pCards.filter(c => !c.classList.contains('p-fly-off')).pop();
      if (!topCard || card !== topCard) return;
      topCard.classList.add('p-fly-off');
      setTimeout(() => {
        topCard.classList.remove('p-fly-off');
        topCard.style.zIndex = '0';
        const visible = pCards.filter(c => !c.classList.contains('p-fly-off'));
        visible.forEach((c, i) => { c.style.zIndex = i + 1; });
        topCard.style.zIndex = '0';
        pCards.unshift(pCards.pop());
      }, 400);
    });
  });




  const photoCards  = document.querySelectorAll('.photo-card');
  const prevCard    = document.getElementById('prevCard');
  const nextCard    = document.getElementById('nextCard');
  const cardCounter = document.querySelector('.card-counter');

  let currentCardIndex = 0;
  const totalCards = photoCards.length;

  function initializeCards() {
    updateCardPositions();
    updateCardControls();
  }

  function updateCardPositions() {
    photoCards.forEach((card, index) => {
      card.classList.remove('active', 'next', 'prev', 'hidden');

      if (index === currentCardIndex) {
        card.classList.add('active');
      } else if (index === (currentCardIndex + 1) % totalCards) {
        card.classList.add('next');
      } else if (index === (currentCardIndex - 1 + totalCards) % totalCards) {
        card.classList.add('prev');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  function updateCardControls() {
    cardCounter.textContent = `${currentCardIndex + 1} / ${totalCards}`;
    prevCard.disabled = currentCardIndex === 0;
    nextCard.disabled = currentCardIndex === totalCards - 1;
  }

  function showNextCard() {
    if (currentCardIndex < totalCards - 1) {
      currentCardIndex++;
      updateCardPositions();
      updateCardControls();
    }
  }

  function showPrevCard() {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      updateCardPositions();
      updateCardControls();
    }
  }

  photoCards.forEach((card, index) => {
    card.addEventListener('click', function (e) {
      e.stopPropagation();
      if (index === currentCardIndex) {
        const img   = this.querySelector('img');
        const title = this.querySelector('.card-content h4').textContent;
        createLightbox(img.src, title);
      } else if (index === (currentCardIndex + 1) % totalCards) {
        showNextCard();
      } else if (index === (currentCardIndex - 1 + totalCards) % totalCards) {
        showPrevCard();
      }
    });
  });

  nextCard.addEventListener('click', function (e) {
    e.stopPropagation();
    showNextCard();
  });

  prevCard.addEventListener('click', function (e) {
    e.stopPropagation();
    showPrevCard();
  });

  initializeCards();


  function createLightbox(imgSrc, caption) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="close-lightbox">×</button>
        <img src="${imgSrc}" alt="${caption}" />
        <div class="lightbox-caption">${caption}</div>
      </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    setTimeout(() => lightbox.classList.add('open'), 10);

    function closeLightbox() {
      lightbox.classList.remove('open');
      setTimeout(() => {
        if (document.body.contains(lightbox)) {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }
      }, 300);
    }

    lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }


  function createFloatingHeart() {
    const hearts = ['♥', '♡', '❤', '💕'];
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left            = Math.random() * 90 + 5 + 'vw';
    heart.style.bottom          = '-20px';
    heart.style.color           = `hsl(${340 + Math.random() * 30}, 80%, ${50 + Math.random() * 20}%)`;
    heart.style.fontSize        = (0.9 + Math.random() * 1.2) + 'rem';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';

    document.body.appendChild(heart);

    heart.addEventListener('animationend', function () {
      if (document.body.contains(heart)) document.body.removeChild(heart);
    });
  }

  function spawnFloatingHearts() {
    for (let i = 0; i < 8; i++) {
      setTimeout(createFloatingHeart, i * 180);
    }
  }

  setInterval(createFloatingHeart, 3000);


  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (letterOverlay.classList.contains('open')) {
        closeLetterOverlay();
      }
      const lightbox = document.querySelector('.lightbox');
      if (lightbox && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
        setTimeout(() => {
          if (document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
          }
        }, 300);
      }
    }
  });


  let touchStartY = 0;
  let touchEndY   = 0;

  letterOverlay.addEventListener('touchstart', function (e) {
    touchStartY = e.changedTouches[0].screenY;
  });

  letterOverlay.addEventListener('touchend', function (e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndY > touchStartY + 50) {
      if (letterOverlay.classList.contains('open')) {
        closeLetterOverlay();
      }
    }
  }
});