$("document").ready(function () {

  /* 메인 body 화면 슬라이드 */
  var swiper = new Swiper('.swiper-pages', {
    autoHeight: true, //enable auto height
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

   /* 다음 슬라이드로 넘어갈때 항상위로 */
  function activeHeightSet() {
    var activeHt = $(".swiper-slide-active .mainImg").height();
    eventActiveHt(activeHt);
    scrollUp();
  }

  function eventActiveHt(activeHt) {
    $(".swiper-container").stop(true).animate(
      {
      },
      100
    );
  }
  function scrollUp() {
    $("body, html").stop(true).animate(
      {
      scrollTop: "0",
      },
      1
    );
  }
  swiper.on("slideChangeTransitionStart", activeHeightSet);
})