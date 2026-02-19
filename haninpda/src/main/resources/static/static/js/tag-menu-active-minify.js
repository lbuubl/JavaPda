$('.tab-menu a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (t) {
    if (
      ($(".tab-menu li.active").removeClass("active"),
      $(this).parent().addClass("active"),
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") && location.hostname == this.hostname)
    ) {
      var e = $(this.hash);
      (e = e.length ? e : $("[name=" + this.hash.slice(1) + "]")).length &&
        (t.preventDefault(),
        $("html, body").animate(
          { scrollTop: e.offset().top - 80 },
          1e3,
          function () {
            var t = $(e);
            if ((t.focus(), t.is(":focus")))
                return (
                    $("html, body").animate(
                        { scrollTop: e.offset().top - 160 },
                        500
                    ),
                    !1
                );
            t.attr("tabindex", "-1"), t.focus();
            // if ((t.focus(), t.is(":focus"))) return !1;
            // t.attr("tabindex", "-1"), t.focus();
          }
        ));
    }
  });

function tabScrollActive() {
  var imgDetailArray = [];
  var $imgDetail = $('.wheel-detail .image-detail');
  var len = $imgDetail.length;

  $('.wheel-detail .image-detail').each(function(){
    imgDetailArray.push($(this).offset().top);
  });

  $(window).off('scroll.tabsc').on('scroll.tabsc', function(){
    for (var i = 0; i < len; i++ ) {

      if ($(this).scrollTop() + ($(window).outerHeight() / 2) > imgDetailArray[len - (i + 1)]) {
        $('.wheel-tab li').removeClass('active');
        $('.wheel-tab li').eq(len - (i + 1)).addClass('active').find('a').focus();
        break;
      }
    }
  });
}
tabScrollActive();

$(window).on('resize', tabScrollActive);
