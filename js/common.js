/* 실행 */
$('document').ready(function () {
  // console.log('document ready complete');

  /* Pages 슬라이드 구조안에 불러오기 */
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

  /* 메인 body 화면 슬라이드 */
  var swiper = new Swiper('.swiper-pages', {
    autoHeight: true, //enable auto height
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      // el: '.menu_list',
      clickable: true,
    },
    navigation: {
      // nextEl: '.swiper-button-next',
      nextEl: '.next_btn',
      // prevEl: '.swiper-button-prev',
      prevEl: '.prev_btn'
    },
  });//Swiper(swiper-pages)


  var swiper = new Swiper('.swiper-pages', {
    pagination: {
      // el: '.swiper-pagination',
      el: '.menu_list',
      clickable: true,
    },
  });//Swiper(swiper-pages)


  /* page navigation에 tage 추가 */
  function addTag() {
    const modeTag = document.getElementsByClassName('swiper-pagination')[0];
    const htmlBtn = document.createElement('button');
    modeTag.appendChild(htmlBtn);
  }

  addTag();

  /* Navigation class on 넣어 열고 닫기*/
  let navBtn = document.getElementsByClassName('btn-m-gnb')[0];
  let mobileNav = document.getElementsByClassName('mobile-nav-overlay')[0];
  let closeBtn = document.getElementsByClassName('close')[0];
  navBtn.onclick = function navOpen() {
    mobileNav.classList.add("on");
  };
  closeBtn.onclick = function navOpen() {
    console.log(mobileNav);
    mobileNav.classList.remove("on");
  };
  window.addEventListener('resize', function(){
    let bodyWidth = document.body.offsetWidth;
    console.log(bodyWidth);
    if (bodyWidth >= 1183){
      mobileNav.classList.remove("on");
    };
  })

   /* 다음 슬라이드로 넘어갈때 항상위로 */
  //  높이를 측정하여 스크롤 업 하는 함수 
  function activeHeightSet() {
    // 스크롤업 함수 만든것을 불러옴
    scrollUp();
  }
  
  swiper.on("slideChangeTransitionStart", activeHeightSet);

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

  }//includeHTML

  /* Navigation bar scrollEvent 네비게이션 바 색상 넣기 */
  const nav_bar = document.querySelector(".nav");

  function scrollEvent () {
    document.addEventListener ("scroll", function(){
      if(document.documentElement.scrollTop > 0) {
        nav_bar.classList.add("nav-down");
      } else {
        nav_bar.classList.remove("nav-down");
      }
    });
    
  }//scrollEvent
  
  
  includeHTML();
  scrollEvent();
});

