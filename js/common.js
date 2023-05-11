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

// Sub페이지 불러오기
function includeHTML(){
  let z, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (let i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("html-include");
    // if문을 통해 file이 null값이 아니면 다음의 내용을 실행함
    if (file) {
      
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("html-include");
          includeHTML();
        }//if
      }//onreadystatechange

      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }//if - file
  }//for
}//includeHTML


/* 실행 */
window.addEventListener('DOMContentLoaded',()=>{
  includeHTML();
});

function init() {
  scrollEvent();
}
init();

// jQuery
$("document").ready(function () {
  let activePage = 0;
  let total_count = 5;

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
    // 페이지 특정페이지로 이동하기
    on : {
      slideChange : function(){
        activePage = this.activeIndex;
        if(activePage > total_count) activePage = 1;
        if(activePage <= 0) activePage = total_count;
      }
    }
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

  $("#next").click(function(){
    console.log("잘 작동함");
    var NextPage = activePage + 1;
    swiper.slideTo(NextPage, 400);
  });

})
