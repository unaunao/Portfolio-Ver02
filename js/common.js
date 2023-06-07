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
  var swiper = new Swiper('.fullpage', {
    autoHeight: true, //enable auto height
    spaceBetween: 0,
    loop: true,
    touchRatio: 0.1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      // nextEl: '.swiper-button-next',
      nextEl: '.next_btn',
      // prevEl: '.swiper-button-prev',
      prevEl: '.prev_btn'
    },
    on: {
      /* 다음 슬라이드로 넘어갈때 항상위로)(일반화면및 버튼적용) */
      slideChange: function () {
        $("body, html").stop(true).animate(
          {
            scrollTop: "0",
          },
          1
        );
      }
    }
  });//Swiper(swiper-pages)

/* 모바일 네비 페이지 네이션 */
  var swiper = new Swiper('.fullpage', {
    pagination: {
      el: '.menu_list',
      clickable: true,
    },
  });//Swiper(swiper-pages)



  /* page navigation에 tage 추가 */
  function addTag() {
    const modeTag = document.getElementsByClassName('swiper-pagination')[0];
    const htmlBtn = document.createElement('button');
    htmlBtn.classList.add('mode_btn');
    modeTag.appendChild(htmlBtn);
  }
  addTag();

  /* Dark Mode */
  const container =  document.getElementsByClassName('container')[0];
  let modeBtn = document.getElementsByClassName('mode_btn')[0];
  modeBtn.addEventListener ('click', () => {
    if (container.classList.contains('dark')) {
      container.classList.remove('dark');
    } else {
      container.classList.add('dark');
    }
  });


  /* Navigation class on 넣어 열고 닫기*/
  let navBtn = document.getElementsByClassName('btn-m-gnb')[0];
  let mobileNav = document.getElementsByClassName('mobile-nav-overlay')[0];
  let closeBtn = document.getElementsByClassName('close')[0];
  navBtn.onclick = function navOpen() {
    mobileNav.classList.add("on");
    /* 메뉴 버튼 누르면 네비 사라짐 */
    let x = mobileNav.getElementsByClassName('swiper-pagination-bullet');
    for(var i = 0; i < x.length; i++) {
        let closeNav = x[i]
        closeNav.onclick = function navClose() {
          mobileNav.classList.remove("on");
        }
      }
  };
  closeBtn.onclick = function navOpen() {
    mobileNav.classList.remove("on");
  };
  let bodyWidth = document.body.offsetWidth;
  window.addEventListener('resize', function(){
    if (bodyWidth >= 1183){
      mobileNav.classList.remove("on");
    };
  });
  /* 모바일 각 슬라이드 높이  swiper-wrapper에 다시 넣어 주기 */
  // if (bodyWidth <= 1183){
    let slideH = document.getElementsByClassName('swiper-slide');
    let pagebtn = document.getElementsByClassName('swiper-pagination-bullet');
    let swiperH = document.getElementsByClassName('swiper-wrapper')[0];

    for ( var i = 1; i <= 5; i++) {
      let mBtn = pagebtn[i];
      let height = slideH[i].clientHeight;
      mBtn.addEventListener('click', ()=> {
        swiperH.style.height = height + 'px';
      })
    }
  // };

     /* 다음 슬라이드로 넘어갈때 항상위로 */
  //  높이를 측정하여 스크롤 업 하는 함수 (네비게이션 메뉴에 적용됨)
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

  /* Tab 버튼 황성화 애니메이션 */
  let tabs = document.getElementsByClassName('tab');
  let leftTab = tabs[0];
  let centerTab = tabs[1];
  // let rightTab = tabs[2];
  let con01 = document.getElementsByClassName('con01')[0];
  let con02 = document.getElementsByClassName('con02')[0];
  // let con03 = document.getElementsByClassName('con03')[0];
  
  leftTab.addEventListener('click', ()=>{
    if(!leftTab.classList.contains('active')){
      leftTab.classList.add('active');
      con01.classList.add('active');
    }
    if(centerTab.classList.contains('active')){
      centerTab.classList.remove('active');
      con02.classList.remove('active');
    }
    /* swiper-wrapper 높이 변경해 주기 */
    let clientHeight = document.getElementsByClassName('swiper-slide-active')[0].clientHeight;
    swiperH.style.height= clientHeight +'px';
  });

  centerTab.addEventListener('click', ()=>{
    if(!centerTab.classList.contains('active')){
      centerTab.classList.add('active');
      con02.classList.add('active');
    }
    
    if(leftTab.classList.contains('active')){
      leftTab.classList.remove('active');
      con01.classList.remove('active');
    }
    /* swiper-wrapper 높이 변경해 주기 */
    var clientHeight = document.getElementsByClassName('swiper-slide-active')[0].clientHeight;
    swiperH.style.height= clientHeight +'px';
  });

  /* sub work slide */
  var swiper = new Swiper('.rps_web_slider', {
    direction: 'vertical',
    autoHeight: true,
    spaceBetween: 0,
    mousewheel: true,
    effect: 'fade',
    // touchRatio: 0,
    pagination: {
      el: '.work-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
  });//Swiper(rps_web_slider)

  /* Modal design */
  // const modalBody = document.getElementsByClassName('container')[0];
  const modalClose = document.getElementsByClassName('desgin-modal-close')[0];
  let design = document.getElementsByClassName('design-item');
  const modalImg = document.getElementsByClassName('desgin-modal-img')[0];
  let design01 = design[0]
  let design02 = design[1]
  let design03 = design[2]
  let design04 = design[3]
  let design05 = design[4]
  let design06 = design[5]
  let design07 = design[6]
  let design08 = design[7]
  let design09 = design[8]
  for ( var i= 0; i < design.length; i++){
    let designItems = design[i];
    designItems.addEventListener('click',()=>{
      container.classList.add('modal');
    })
  }
  modalClose.addEventListener('click',()=>{
    container.classList.remove('modal');
  })
  design01.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail01.jpg";
  })
  design02.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail02.jpg";
  })
  design03.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail03.jpg";
  })
  design04.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail04.jpg";
  })
  design05.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail05.jpg";
  })
  design06.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail06.jpg";
  })
  design07.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail07.jpg";
  })
  design08.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail08.jpg";
  })
  design09.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail09.jpg";
  })


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

/* Modal */

