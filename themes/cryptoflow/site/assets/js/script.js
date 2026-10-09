$(document).ready(function () {
  new Swiper("#slider2", {
    loop: true,
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },
    pagination: {
      el: "#slider2-pagination",
      clickable: true,
      type: "bullets",
    },
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 24,
    touchMoveStopPropagation: true,
    freeMode: {
      enabled: true,
      sticky: false,
      momentumRatio: 1,
    },
    mousewheel: {
      forceToAxis: false,
      sensitivity: 1,
      releaseOnEdges: true,
    },

    breakpoints: {
      1920: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      968: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      728: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      360: {
        slidesPerView: 1,
        spaceBetween: 32,
        //autoHeight: true
      },
    },
  });


});


