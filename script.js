// Performance optimized initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize critical functions first
  initImagePopup();
  initButtonEffects();
  
  // Defer non-critical initializations
  setTimeout(() => {
    initSwiper();
    initTypedJs();
  }, 100);
});

// Image popup modal logic
function initImagePopup() {
  $(document).on('click', '.popup-trigger', function() {
    var imgSrc = $(this).attr('data-img') || $(this).attr('src');
    $('#img-popup-content').attr('src', imgSrc);
    $('#img-popup-modal').addClass('active');
  });

  $(document).on('click', '.img-popup-close', function() {
    $('#img-popup-modal').removeClass('active');
    $('#img-popup-content').attr('src', '');
  });

  $('#img-popup-modal').on('click', function(e) {
    if (e.target === this) {
      $(this).removeClass('active');
      $('#img-popup-content').attr('src', '');
    }
  });
}

// Button hover effects
function initButtonEffects() {
  $('.button').hover(function() {
    $('.image-button-second, .image-button-first', this).toggleClass('hovered');
  });
}

// Swiper initialization with performance optimizations
function initSwiper() {
  if (typeof Swiper === 'undefined') {
    setTimeout(initSwiper, 100);
    return;
  }

  const swipe2 = new Swiper('.comparison-first', {
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    speed: 800,
    spaceBetween: 24,
    lazy: true,
    breakpoints: {
      766: {
        spaceBetween: -150,
        slidesPerView: 'auto',
      }
    },
    navigation: {
      nextEl: '#second-right',
      prevEl: '#second-left',
    },
    pagination: {
      el: "#swiper-pagination2334",
      clickable: true,
    },
  });

  const swipe1 = new Swiper('.slider-first', {
    slidesPerView: "auto",
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 400,
    lazy: true,
    navigation: {
      nextEl: '#first-right',
      prevEl: '#first-left',
    },
    pagination: {
      el: "#swiper-pagination233",
      clickable: true,
    },
  });
}

// Typed.js initialization with performance check
function initTypedJs() {
  if (typeof Typed === 'undefined') {
    setTimeout(initTypedJs, 100);
    return;
  }

  var typed = new Typed(".typedjs-multiple", {
    strings: ["Pay For Themselves Instantly", "Get You Funded Fast", "Pass Any Prop Firm Challenge", "Print Consistent Profits Every Month", "Pay For Themselves Instantly"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    showCursor: false,
  });
}

// Opening screen logic - optimized
(function() {
  var isFirstVisit = !document.cookie.includes('visited=true');
  if (isFirstVisit) {
    document.cookie = "visited=true; max-age=" + 60 * 60 * 24 * 365 + "; path=/";
    requestAnimationFrame(() => {
      var style = document.createElement('style');
      style.innerHTML = '.opening_screen { display: flex !important; }';
      document.head.appendChild(style);
    });
  }
})();
