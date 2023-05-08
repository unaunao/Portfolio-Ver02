// JavaScript
// Navigation bar scrollEvent
const nav_bar = document.querySelector(".nav");

function scrollEvent () {
  document.addEventListener ("scroll", function(){
    if(document.documentElement.scrollTop > 0) {
      nav_bar.classList.add("nav-down");
    } else {
      nav_bar.classList.remove("nav-down");
    }
  });
}
function init() {
  document.addEventListener("scroll", scrollEvent);
}
init();

// jQuery
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
  //  높이를 측정하여 스크롤 업 하는 함수 
  function activeHeightSet() {
    // 스크롤업 함수 만든것을 불러옴
    scrollUp();
  }
  // 스크롤 업 함수 
  function scrollUp() {
    // 애니메이션으로 0.001초 만에 body와 html의 스크롤 위치 top 0로 이동
    $("body, html").stop(true).animate(
      {
        scrollTop: "0",
      },
      1
    );
  }
  swiper.on("slideChangeTransitionStart", activeHeightSet);

})
