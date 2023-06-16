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
    // touchRatio: 0.1,
    // allowTouchMove: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.next_btn',
      prevEl: '.prev_btn',
      clickable: true
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
    loop: true,
    autoHeight: true,
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
  let modeBtn02 = document.getElementsByClassName('mode-switch')[0];
  modeBtn.addEventListener ('click', () => {
    if (container.classList.contains('dark')) {
      container.classList.remove('dark');
    } else {
      container.classList.add('dark');
    }
  });
  modeBtn02.addEventListener ('click', () => {
    if (container.classList.contains('dark')) {
      container.classList.remove('dark');
      mobileNav.classList.remove("on");
      body.classList.remove("scrollLock");
    } else {
      container.classList.add('dark');
      mobileNav.classList.remove("on");
      body.classList.remove("scrollLock");
    }
  });

  /* Navigation class on 넣어 열고 닫기*/
  const body = document.getElementsByTagName('body')[0];
  let navBtn = document.getElementsByClassName('btn-m-gnb')[0];
  let mobileNav = document.getElementsByClassName('mobile-nav-overlay')[0];
  let closeBtn = document.getElementsByClassName('close')[0];
  navBtn.onclick = function navOpen() {
    mobileNav.classList.add("on");
    body.classList.add("scrollLock");
    /* 메뉴 버튼 누르면 네비 사라짐 */
    let x = mobileNav.getElementsByClassName('swiper-pagination-bullet');
    for(var i = 0; i < x.length; i++) {
        let closeNav = x[i]
        closeNav.onclick = function navClose() {
          mobileNav.classList.remove("on");
          body.classList.remove("scrollLock");
        }
      }
  };
  closeBtn.onclick = function navOpen() {
    mobileNav.classList.remove("on");
    body.classList.remove("scrollLock");
  };
  let bodyWidth = document.body.offsetWidth;
  window.addEventListener('resize', function(){
    if (bodyWidth >= 1183){
      mobileNav.classList.remove("on");
      body.classList.remove("scrollLock");
    };
  });
  /* 모바일 각 슬라이드 높이  swiper-wrapper에 다시 넣어 주기 */
    let slideH01 = document.getElementsByClassName('fullpage-slide')[1];
    let slideH02 = document.getElementsByClassName('fullpage-slide')[2];
    let slideH03 = document.getElementsByClassName('fullpage-slide')[3];
    let slideH04 = document.getElementsByClassName('fullpage-slide')[4];
    let slideH05 = document.getElementsByClassName('fullpage-slide')[5];
    let pagebtn01 = document.getElementsByClassName('swiper-pagination-bullet')[1];
    let pagebtn02 = document.getElementsByClassName('swiper-pagination-bullet')[2];
    let pagebtn03 = document.getElementsByClassName('swiper-pagination-bullet')[3];
    let pagebtn04 = document.getElementsByClassName('swiper-pagination-bullet')[4];
    let pagebtn05 = document.getElementsByClassName('swiper-pagination-bullet')[5];
    let swiperH = document.getElementsByClassName('swiper-wrapper')[0];
    pagebtn01.addEventListener('click', ()=>{
      let clientHeight = slideH01.clientHeight;
      swiperH.style.height= clientHeight +'px';
    });
    pagebtn02.addEventListener('click', ()=>{
      let clientHeight = slideH02.clientHeight;
      swiperH.style.height= clientHeight +'px';
    });
    pagebtn03.addEventListener('click', ()=>{
      let clientHeight = slideH03.clientHeight;
      swiperH.style.height= clientHeight +'px';
    });
    pagebtn04.addEventListener('click', ()=>{
      let clientHeight = slideH04.clientHeight;
      swiperH.style.height= clientHeight +'px';
    });
    pagebtn05.addEventListener('click', ()=>{
      let clientHeight = slideH05.clientHeight;
      swiperH.style.height= clientHeight +'px';
    });


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
  let Tab_about01 = tabs[0];
  let Tab_about02 = tabs[1];
  let Tab_work01 = tabs[2];
  let Tab_work02 = tabs[3];
  let Tab_work03 = tabs[4];
  // console.log(rightTab);
  let con_about01 = document.getElementsByClassName('con01')[0];
  let con_about02 = document.getElementsByClassName('con02')[0];
  let con_work01 = document.getElementsByClassName('con01')[1];
  let con_work02 = document.getElementsByClassName('con02')[1];
  let con_work03 = document.getElementsByClassName('con03')[0];
  
  Tab_about01.addEventListener('click', ()=>{
    if(!Tab_about01.classList.contains('active')){
      Tab_about01.classList.add('active');
      con_about01.classList.add('active');
    }
    if(Tab_about02.classList.contains('active')){
      Tab_about02.classList.remove('active');
      con_about02.classList.remove('active');
    }
    /* swiper-wrapper 높이 변경해 주기 */
    let clientHeight = document.getElementsByClassName('swiper-slide-active')[0].clientHeight;
    swiperH.style.height= clientHeight +'px';
  });

  Tab_about02.addEventListener('click', ()=>{
    if(!Tab_about02.classList.contains('active')){
      Tab_about02.classList.add('active');
      con_about02.classList.add('active');
    }
    
    if(Tab_about01.classList.contains('active')){
      Tab_about01.classList.remove('active');
      con_about01.classList.remove('active');
    }
    /* swiper-wrapper 높이 변경해 주기 */
    var clientHeight = document.getElementsByClassName('swiper-slide-active')[0].clientHeight;
    swiperH.style.height= clientHeight +'px';
  });

  Tab_work01.addEventListener('click', ()=>{
    if(!Tab_work01.classList.contains('active')){
      Tab_work01.classList.add('active');
      con_work01.classList.add('active');
    }
    
    if(Tab_work02.classList.contains('active')){
      Tab_work02.classList.remove('active');
      con_work02.classList.remove('active');
    }
    if(Tab_work03.classList.contains('active')){
      Tab_work03.classList.remove('active');
      con_work03.classList.remove('active');
    }
  
    /* sub work slide */
  var swiper = new Swiper('.rps_web_slider01', {
    direction: 'vertical',
    autoHeight: true,
    spaceBetween: 0,
    mousewheel: true,
    effect: 'fade',
    pagination: {
      el: '.work-pagination01',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    on: {
      reachEnd: function () {
        swiper.mousewheel.disable();
      }
    }
  });//Swiper(rps_web_slider)
  window.addEventListener('wheel', function (event) {
    if (event.deltaY < 0) {
      swiper.mousewheel.enable();
    } else if (event.deltaY > 0) {
    }
  });

    /* swiper-wrapper 높이 변경해 주기 */
    var clientHeight = document.getElementsByClassName('swiper-slide-active')[0].clientHeight;
    swiperH.style.height= clientHeight +'px';
  });
  Tab_work02.addEventListener('click', ()=>{
    if(!Tab_work02.classList.contains('active')){
      Tab_work02.classList.add('active');
      con_work02.classList.add('active');
    }
    
    if(Tab_work01.classList.contains('active')){
      Tab_work01.classList.remove('active');
      con_work01.classList.remove('active');
    }
    if(Tab_work03.classList.contains('active')){
      Tab_work03.classList.remove('active');
      con_work03.classList.remove('active');
    }
    /* swiper-wrapper 높이 변경해 주기 */
    var clientHeight = document.getElementsByClassName('swiper-slide-active')[0].clientHeight;
    swiperH.style.height= clientHeight +'px';

    /* sub work slide */
    var swiper = new Swiper('.rps_web_slider02', {
      direction: 'vertical',
      autoHeight: true,
      spaceBetween: 0,
      mousewheel: true,
      effect: 'fade',
      pagination: {
        el: '.work-pagination02',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      on: {
        reachEnd: function () {
          swiper.mousewheel.disable();
        }
      }
    });//Swiper(rps_web_slider02)
    window.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) {
        swiper.mousewheel.enable();
      } else if (event.deltaY > 0) {
      }
    });
  });
  Tab_work03.addEventListener('click', ()=>{
    if(!Tab_work03.classList.contains('active')){
      Tab_work03.classList.add('active');
      con_work03.classList.add('active');
    }
    
    if(Tab_work02.classList.contains('active')){
      Tab_work02.classList.remove('active');
      con_work02.classList.remove('active');
    }
    if(Tab_work01.classList.contains('active')){
      Tab_work01.classList.remove('active');
      con_work01.classList.remove('active');
    }
    /* swiper-wrapper 높이 변경해 주기 */
    var clientHeight = document.getElementsByClassName('swiper-slide-active')[0].clientHeight;
    swiperH.style.height= clientHeight +'px';

    /* sub work slide */
    var swiper = new Swiper('.rps_web_slider03', {
      direction: 'vertical',
      autoHeight: true,
      spaceBetween: 0,
      mousewheel: true,
      effect: 'fade',
      pagination: {
        el: '.work-pagination03',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      on: {
        reachEnd: function () {
          swiper.mousewheel.disable();
        }
      }
    });//Swiper(rps_web_slider02)
    window.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) {
        swiper.mousewheel.enable();
      } else if (event.deltaY > 0) {
      }
    });
  });

  /* sub work slide */
  var swiper = new Swiper('.rps_web_slider01', {
    direction: 'vertical',
    autoHeight: true,
    spaceBetween: 0,
    mousewheel: true,
    effect: 'fade',
    pagination: {
      el: '.work-pagination01',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    on: {
      reachEnd: function () {
        swiper.mousewheel.disable();
      }
    }
  });//Swiper(rps_web_slider)
  window.addEventListener('wheel', function (event) {
    if (event.deltaY < 0) {
      swiper.mousewheel.enable();
    } else if (event.deltaY > 0) {
    }
  });
  

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
    if (container.classList.contains('dark')) {
      modalImg.src = "./images/dark_design_detail01.jpg";
    } else {
      modalImg.src = "./images/design_detail01.jpg";
    }
  })
  design02.addEventListener('click',()=>{
    if (container.classList.contains('dark')) {
      modalImg.src = "./images/dark_design_detail02.jpg";
    } else {
      modalImg.src = "./images/design_detail02.jpg";
    }
  })
  design03.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail03.jpg";
  })
  design04.addEventListener('click',()=>{
    if (container.classList.contains('dark')) {
      modalImg.src = "./images/dark_design_detail04.jpg";
    } else {
      modalImg.src = "./images/design_detail04.jpg";
    }
  })
  design05.addEventListener('click',()=>{
    if (container.classList.contains('dark')) {
      modalImg.src = "./images/dark_design_detail05.jpg";
    } else {
      modalImg.src = "./images/design_detail05.jpg";
    }
  })
  design06.addEventListener('click',()=>{
    if (container.classList.contains('dark')) {
      modalImg.src = "./images/dark_design_detail06.jpg";
    } else {
      modalImg.src = "./images/design_detail06.jpg";
    }
  })
  design07.addEventListener('click',()=>{
    modalImg.src = "./images/design_detail07.jpg";
  })
  design08.addEventListener('click',()=>{
    if (container.classList.contains('dark')) {
      modalImg.src = "./images/dark_design_detail08.jpg";
    } else {
      modalImg.src = "./images/design_detail08.jpg";
    }
  })
  design09.addEventListener('click',()=>{
    if (container.classList.contains('dark')) {
      modalImg.src = "./images/dark_design_detail09.jpg";
    } else {
      modalImg.src = "./images/design_detail09.jpg";
    }
  })

  /* Mobile Mockup */
  let mockclose = document.getElementsByClassName('close_btn')[0];
  let overlay = document.getElementsByClassName('overlay')[0];
  let mobilego01 = document.getElementsByClassName('go_mobile')[0];
  let mobilego02 = document.getElementsByClassName('go_mobile')[1];
  let mobilego03 = document.getElementsByClassName('go_mobile')[2];
  let mobilego04 = document.getElementsByClassName('go_mobile')[3];
  let mobilego05 = document.getElementsByClassName('go_mobile')[4];
  let mobilego06 = document.getElementsByClassName('go_mobile')[5];
  let mobilego07 = document.getElementsByClassName('go_mobile')[6];
  let iframeImg = document.getElementsByClassName('iframe-mobile')[0];
  mockclose.addEventListener('click', ()=> {
    overlay.classList.remove('active');
  })
  overlay.addEventListener('click', ()=> {
    overlay.classList.remove('active');
  })
  mobilego01.addEventListener('click', ()=> {
    overlay.classList.add('active');
    iframeImg.src ="https://unaunao.github.io/Portfolio-Ver02/";
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

