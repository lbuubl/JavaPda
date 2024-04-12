$(document).ready(function () {
  $("#fullpage").fullpage({
    autoScrolling: !0,
    scrollHorizontally: !0,
    anchors: ["catalog", "exterior", "interior", "video", "packet"],
    navigation: !0,
    navigationPosition: "left",
    navigationTooltips: ["catalog", "exterior", "interior", "video", "packet"],
    showActiveTooltip: false,
    scrollOverflow: true,
    afterLoad: function (o, e) {
      // console.log(e),
      //   $("body").hasClass("fp-viewing-video") &&
      //     $("body").hasClass("temp") &&
      //     (console.log("YTPlayer Start"),
      //     jQuery(function () {
      //       jQuery("#background-video").YTPlayer();
      //     }),
      //     $("body").removeClass("temp"));

      $(".header").addClass("sticky");
      // console.log('add sticky');
    },
    onLeave: function (origin, destination, direction) {
      console.log(origin, destination, direction);
      $(".tab-menu").find("li").removeClass("active");

      $(".tab-menu")
        .find("li")
        .eq(destination - 1)
        .addClass("active");

      // .not(function () {
      //   $(this).removeClass("active");
      // });
    },
    onSlideLeave: function (o, e, t, a) {
      console.log(o + "/" + e + "/" + t + "/" + a);
    },
  });

  $('.tab-menu a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (s) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var o = $(this.hash);
        (o = o.length ? o : $("[name=" + this.hash.slice(1) + "]")).length &&
          (s.preventDefault(),
          $("html, body").animate(
            { scrollTop: o.offset().top },
            1e3,
            function () {
              var s = $(o);
              if ((s.focus(), s.is(":focus")))
                return (
                  $("html, body").animate(
                    { scrollTop: o.offset().top - 95 },
                    500
                  ),
                  !1
                );
              s.attr("tabindex", "-1"), s.focus();
            }
          ));
      }
    }),
    $("#sec02 .showroom-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: !1,
      adaptiveHeight: !0,
      infinite: !1,
      useTransform: !0,
      speed: 400,
      autoplay: false,
    }),
    $("#sec02 .showroom-slider-nav")
      .on("init", function (s, o) {
        $("#sec02 .showroom-slider-nav .slick-slide.slick-current").addClass(
          "is-active"
        );
      })
      .slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        dots: !1,
        focusOnSelect: !1,
        infinite: !1,
        responsive: [
          { breakpoint: 1e3, settings: { slidesToShow: 4, slidesToScroll: 4 } },
          { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } },
          { breakpoint: 420, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        ],
      }),
    $("#sec02 .showroom-slider").on("afterChange", function (s, o, e) {
      $("#sec02 .showroom-slider-nav").slick("slickGoTo", e);
      var i =
        '#sec02 .showroom-slider-nav .slick-slide[data-slick-index="' +
        e +
        '"]';
      $("#sec02 .showroom-slider-nav .slick-slide.is-active").removeClass(
        "is-active"
      ),
        $(i).addClass("is-active");
    }),
    $("#sec02 .showroom-slider-nav").on("click", ".slick-slide", function (s) {
      s.preventDefault();
      var o = $(this).data("slick-index");
      $("#sec02 .showroom-slider").slick("slickGoTo", o);
    }),
    $("#sec03 .showroom-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: !1,
      adaptiveHeight: !0,
      infinite: !1,
      useTransform: !0,
      speed: 400,
      autoplay: false,
    }),
    $("#sec03 .showroom-slider-nav")
      .on("init", function (s, o) {
        $("#sec03 .showroom-slider-nav .slick-slide.slick-current").addClass(
          "is-active"
        );
      })
      .slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        dots: !1,
        focusOnSelect: !1,
        infinite: !1,
        responsive: [
          { breakpoint: 1e3, settings: { slidesToShow: 4, slidesToScroll: 4 } },
          { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } },
          { breakpoint: 420, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        ],
      }),
    $("#sec03 .showroom-slider").on("afterChange", function (s, o, e) {
      $("#sec03 .showroom-slider-nav").slick("slickGoTo", e);
      var i =
        '#sec03 .showroom-slider-nav .slick-slide[data-slick-index="' +
        e +
        '"]';
      $("#sec03 .showroom-slider-nav .slick-slide.is-active").removeClass(
        "is-active"
      ),
        $(i).addClass("is-active");
    }),
    $("#sec03 .showroom-slider-nav").on("click", ".slick-slide", function (s) {
      s.preventDefault();
      var o = $(this).data("slick-index");
      $("#sec03 .showroom-slider").slick("slickGoTo", o);
    });
});

/* $(".trigger").on("click", function () {
  $(".modal-wrapper").toggleClass("open");
  $(".page-wrapper").toggleClass("blur-it");
  return false;
}); */

// 확대/축소
/* function zoomin() {
  var myImg = document.getElementsByClassName("gallery-img");
  var currWidth = myImg.clientWidth;
  if (currWidth == 2500) return false;
  else {
    myImg.style.width = currWidth + 100 + "px";
  }
}
function zoomout() {
  var myImg = document.getElementsByClassName("gallery-img");
  var currWidth = myImg.clientWidth;
  if (currWidth == 100) return false;
  else {
    myImg.style.width = currWidth - 100 + "px";
  }
} */

// photo swipe
// ("use strict");

/* global jQuery, PhotoSwipe, PhotoSwipeUI_Default, console */

(function ($) {
  // Init empty gallery array
  var container01 = [];
  var container02 = [];

  // Loop over gallery items and push it to the array
  $(".gallery01")
    .find("figure")
    .each(function () {
      var $link = $(this).find("a"),
        item = {
          src: $link.attr("href"),
          w: $link.data("width"),
          h: $link.data("height"),
          title: $link.data("caption"),
        };
      container01.push(item);
    });

  $(".gallery02")
    .find("figure")
    .each(function () {
      var $link = $(this).find("a"),
        item = {
          src: $link.attr("href"),
          w: $link.data("width"),
          h: $link.data("height"),
          title: $link.data("caption"),
        };
      container02.push(item);
    });

  // Define click event on gallery item
  $(document)
    .find(".gallery01 .trigger")
    .off("click.slide")
    .on("click.slide", function (event) {
      event.preventDefault();
      photoSwipeAct(this, container01);
    });

  $(document)
    .find(".gallery02 .trigger")
    .off("click.slide")
    .on("click.slide", function (event) {
      event.preventDefault();
      photoSwipeAct(this, container02);
    });

  function photoSwipeAct(a, d) {
    var swSlide = $(a).closest(".swiper-slide");
    var slideIdx = swSlide.attr("data-swiper-slide-index");
    var $pswp = $(".pswp")[0];
    var options = {
      index:
        slideIdx !== undefined ? Number(slideIdx) : Number(swSlide.index()),
      bgOpacity: 0.85,
      showHideOpacity: true,
    };

    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, d, options);

    gallery.listen("gettingData", function (index, item) {
      // 이미지값 유동적으로 구해오기
      if (item.w < 1 || item.h < 1) {
        // unknown size
        var img = new Image();
        img.onload = function () {
          // will get size after load
          item.w = this.width; // set image width
          item.h = this.height; // set image height
          gallery.invalidateCurrItems(); // reinit Items
          gallery.updateSize(true); // reinit Items
        };
        img.src = item.src; // let's download image
      }
    });

    gallery.init();
  }
})(jQuery);

// select
// $(function () {
//   var select = new CustomSelectBox(".select_box");
// });

// function CustomSelectBox(selector) {
//   (this.$selectBox = null),
//     (this.$select = null),
//     (this.$list = null),
//     (this.$listLi = null);
//   CustomSelectBox.prototype.init = function (selector) {
//     this.$selectBox = $(selector);
//     this.$select = this.$selectBox.find(".box .select");
//     this.$list = this.$selectBox.find(".box .list");
//     this.$listLi = this.$list.children("li");
//   };
//   CustomSelectBox.prototype.initEvent = function (e) {
//     var that = this;
//     this.$select.on("click", function (e) {
//       that.listOn();
//     });
//     this.$listLi.on("click", function (e) {
//       that.listSelect($(this));
//     });
//     $(document).on("click", function (e) {
//       that.listOff($(e.target));
//     });
//   };
//   CustomSelectBox.prototype.listOn = function () {
//     this.$selectBox.toggleClass("on");
//     if (this.$selectBox.hasClass("on")) {
//       this.$list.css("display", "block");
//     } else {
//       this.$list.css("display", "none");
//     }
//   };
//   CustomSelectBox.prototype.listSelect = function ($target) {
//     $target.addClass("selected").siblings("li").removeClass("selected");
//     this.$selectBox.removeClass("on");
//     this.$select.text($target.text());
//     this.$list.css("display", "none");
//   };
//   CustomSelectBox.prototype.listOff = function ($target) {
//     if (!$target.is(this.$select) && this.$selectBox.hasClass("on")) {
//       this.$selectBox.removeClass("on");
//       this.$list.css("display", "none");
//     }
//   };
//   this.init(selector);
//   this.initEvent();
// }

// light Slider
// $(document).ready(function () {
//   $("#sec02 .lightSlider, #sec03 .lightSlider").lightSlider({
//     gallery: true,
//     item: 1,
//     loop: true,
//     slideMargin: 0,
//     thumbItem: 4,
//   });
// });

// Swiper
var galleryThumbs01 = new Swiper("#sec02 .gallery-thumbs", {
  spaceBetween: 10,
  slidesPerView: "auto",
  loop: false,
  freeMode: true,
  loopedSlides: 5, //looped slides should be the same
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  // centeredSlides: true,
});
var galleryTop01 = new Swiper("#sec02 .gallery-top", {
  spaceBetween: 10,
  loop: false,
  loopedSlides: 5, //looped slides should be the same
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: galleryThumbs01,
  },
});

var galleryThumbs02 = new Swiper("#sec03 .gallery-thumbs", {
  spaceBetween: 10,
  slidesPerView: "auto",
  loop: false,
  freeMode: true,
  loopedSlides: 4, //looped slides should be the same
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  // centeredSlides: true,
});
var galleryTop02 = new Swiper("#sec03 .gallery-top", {
  spaceBetween: 10,
  loop: false,
  loopedSlides: 5, //looped slides should be the same
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: galleryThumbs02,
  },
});

/* iframe scroll */
$(".play-video").on("click", function () {
  $(this).toggleClass("on");
  if ($(this).hasClass("on")) {
    $("#video-iframe")[0].contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
    //$(this).css("z-index","1");
  } else {
    $("#video-iframe")[0].contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
    //$(this).css("z-index","-1");
  }
});
