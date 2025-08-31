// Image popup modal logic
$(document).ready(function() {
  // Open modal on image click
  $(document).on('click', '.popup-trigger', function() {
    var imgSrc = $(this).attr('data-img') || $(this).attr('src');
    $('#img-popup-content').attr('src', imgSrc);
    $('#img-popup-modal').addClass('active');
  });

  // Close modal on close icon click
  $(document).on('click', '.img-popup-close', function() {
    $('#img-popup-modal').removeClass('active');
    $('#img-popup-content').attr('src', '');
  });

  // Close modal on background click (not image)
  $('#img-popup-modal').on('click', function(e) {
    if (e.target === this) {
      $(this).removeClass('active');
      $('#img-popup-content').attr('src', '');
    }
  });
});
// Opening screen logic
(function() {
  var isFirstVisit = !document.cookie.includes('visited=true');
  if (isFirstVisit) {
    document.cookie = "visited=true; max-age=" + 60 * 60 * 24 * 365 + "; path=/";
    var style = document.createElement('style');
    style.innerHTML = '.opening_screen { display: flex !important; }';
    document.head.appendChild(style);
  }
})();

// Button hover effect
$('.button').hover(function() {
  $('.image-button-second, .image-button-first', this).toggleClass('hovered');
});

// Swiper sliders
const swipe2 = new Swiper('.comparison-first', {
  centeredSlides: true,
  slidesPerView: 1,
  loop: true,
  speed: 800,
  spaceBetween: 24,
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
  navigation: {
    nextEl: '#first-right',
    prevEl: '#first-left',
  },
  pagination: {
    el: "#swiper-pagination233",
    clickable: true,
  },
});

// Typed.js effect
var typed = new Typed(".typedjs-multiple", {
  strings: ["Pay For Themselves Instantly", "Get You Funded Fast", "Pass Any Prop Firm Challenge", "Print Consistent Profits Every Month", "Pay For Themselves Instantly"],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
  showCursor: false,
});
