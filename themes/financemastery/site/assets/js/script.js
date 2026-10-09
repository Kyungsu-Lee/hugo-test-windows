$(document).ready(function() {
    var sliderSelector = '.benefits',
    options = {
      init: false,
      speed: 800,
      slidesPerView: 3, // or 'auto'
      slidesPerColumn: 1,
      slidesPerGroup: 3,
      spaceBetween: 32,
      grabCursor: true,
      breakpoints: {
        1300: {
            slidesPerView: 3,
            slidesPerColumn: 1,
            spaceBetween: 32,
            navigation: {
                nextEl: '.swiper-nav-next',
                prevEl: '.swiper-nav-prev',
              },
          },
        1200: {
          slidesPerView: 2,
          slidesPerColumn: 1,
          spaceBetween: 32,
          navigation: {
            nextEl: '.swiper-nav-next',
            prevEl: '.swiper-nav-prev',
          },
        },
        768: {
            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 32,
            navigation: {
                nextEl: '.swiper-nav-next',
                prevEl: '.swiper-nav-prev',
              },
          }
      },
      // Events
      on: {
        init: function(){
          this.autoplay.stop();
        },
        imagesReady: function(){
          //this.autoplay.start();
          this.el.classList.remove('loading');
        }
      }
    };
var mySwiper = new Swiper(sliderSelector, options);

// Initialize slider
mySwiper.init();
});

$(document).ready(function() {
    var sliderSelector1 = '.cards',
    options = {
      init: false,
      speed: 800,
      slidesPerView: 3, // or 'auto'
      slidesPerColumn: 2,
      slidesPerGroup: 3,
      spaceBetween: 32,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-nav-next',
        prevEl: '.swiper-nav-prev',
      },
      breakpoints: {
        1300: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            spaceBetween: 32,
            
          },
        1200: {
          slidesPerView: 2,
          slidesPerColumn: 2,
          spaceBetween: 32,
          
        },
        768: {
            slidesPerView: 1,
            slidesPerColumn: 2,
            spaceBetween: 32,
           
          }
      },
      // Events
      on: {
        init: function(){
          this.autoplay.stop();
        },
        imagesReady: function(){
          //this.autoplay.start();
          this.el.classList.remove('loading');
        }
      }
    };
var mySwiper1 = new Swiper(sliderSelector1, options);

// Initialize slider
mySwiper1.init();
});

$(document).ready(function() {
    var sliderSelector2 = '.features',
    options = {
      init: false,
      speed: 800,
      slidesPerView: 3, // or 'auto'
      spaceBetween: 32,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-nav-next',
        prevEl: '.swiper-nav-prev',
      },
      breakpoints: {
        1200: {
          slidesPerView: 2,
          spaceBetween: 32,
          //autoHeight: true,
        },
        992: {
            slidesPerView: 1,
            //autoHeight: true,
            spaceBetween: 32,
          }
      },
      // Events
      on: {
        init: function(){
          this.autoplay.stop();
        },
        imagesReady: function(){
          //this.autoplay.start();
          this.el.classList.remove('loading');
        }
      }
    };
var mySwiper2 = new Swiper(sliderSelector2, options);

// Initialize slider
mySwiper2.init();
});