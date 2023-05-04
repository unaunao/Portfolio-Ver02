$("document").ready(function () {
  var swiper = new Swiper('.swiper-pages', {
    autoHeight: true, //enable auto height
    spaceBetween: 0,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})