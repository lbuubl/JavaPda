$(document).ready(function() {

    kendo.culture("ko-KR");

    $("#resizable").mCustomScrollbar({
		scrollbarPosition:"outside"
	});		
	
	// 위치 네비게이션 설정
	$("nav a.active").each(function(i) {
		$('<span">').text(' > ').appendTo($('div.nav_history'));
		var $nav = $('<strong>').text($(this).find('span.menu_name').text()).appendTo($('div.nav_history'));
	
		if(i == $("nav a.active").length -1) {
			$nav.addClass('active');
		}
	});
	
    //menu left toggle
    $('.toggle_nav').click(function() {
        $this = $(this);
        $this.attr('data-init', true);
        $this.toggleClass('active');
        $toggleArea = $('header, aside, .wrap_container, .left_bg');
        $toggleArea.toggleClass('open');
        
        if($toggleArea.hasClass('open')) {
        	UI.setCookie('folding', 0, 7);
        } else {
        	UI.setCookie('folding', 1, 7);
        }
        
		try{
			resizeGrid(); // 그리드 리사이즈 이벤트 호출	
		}catch(e){}        
    });

    //drop down menu
    $('.btn_1depth').on('click', function(e) {
        e.preventDefault();
        $this = $(this);
        $parent = $this.parent().next();
        $tar = $('.menu_2depth');

        if (!$parent.hasClass('active')) {
            $tar.removeClass('active').slideUp('fast');
            $parent.addClass('active').slideDown('fast');
        } else {
            $parent.removeClass('active').slideUp('fast');
        }
    });

    $('.btn_2depth').on('click', function(e) {
        e.preventDefault();
        $this = $(this);
        $parent = $this.parent().next();
        $tar = $('.menu_3depth');
        if (!$parent.hasClass('active')) {
            $tar.removeClass('active').slideUp('fast');
            $parent.addClass('active').slideDown('fast');
        } else {
            $parent.removeClass('active').slideUp('fast');
        }
    });

    //중메뉴 클릭
    $('nav').on('click', "a.depth*", function(e) {
        e.preventDefault();
        var $this = $(this);
        var $parent = $this.next();
        var menuSeqno = $this.data('seqno');

        if ($this.data('linkyn') == 'Y') { // 페이지 이동인경우
            // 외부 링크 팝업인경우는 window.open()
            if ($this.attr('target') == '_blank') {
                if ($this.attr('href')) {
                    window.open($this.attr('href'));
                }
            } else { // 그 외에는 페이지 이동
                if ($this.attr('href')) {
                    location.href = $this.attr('href');
                }
            }
        }
    });

    /**
     * layout, resize
     */
    // 레이아웃 반응형 사이즈 조절
    var pc = window.matchMedia("screen and (min-width: 961px)");
    if (pc.matches) {
        $('body').removeClass('Spad Smobile');
        $('body').addClass('Spc');
        $('header, aside, .wrap_container, .left_bg').addClass('open');
    }

    pc.addListener(function(e) {
        if (e.matches) {
            $('body').removeClass('Spad Smobile');
            $('body').addClass('Spc');

            var isInit = $('.toggle_nav').attr('data-init');
            if (isInit == 'false') {
                $('header, aside, .wrap_container, .left_bg').addClass('open');
            }
        }
    });

    var pad = window.matchMedia("screen and (min-width: 768px) and (max-width: 960px)");
    if (pad.matches) {
        $('body').removeClass('Spc Smobile');
        $('body').addClass('Spad');
        $('header, aside, .wrap_container, .left_bg').removeClass('open');
    }

    pad.addListener(function(e) {
        if (e.matches) {
            $('body').removeClass('Spc Smobile');
            $('body').addClass('Spad');
            var isInit = $('.toggle_nav').attr('data-init');
            if (isInit == 'false') {
                $('header, aside, .wrap_container, .left_bg').removeClass('open');
            }
        }
    });

    var mobile = window.matchMedia("screen and (max-width: 767px)");
    if (mobile.matches) {
        $('body').removeClass('Spc Spad');
        $('body').addClass('Smobile');
        $('header, aside, .wrap_container, .left_bg').removeClass('open');
    }

    mobile.addListener(function(e) {
        if (e.matches) {
            $('body').removeClass('Spc Spad');
            $('body').addClass('Smobile');
            $('header, aside, .wrap_container, .left_bg').removeClass('open');
        } else {
            if ($('.toggle_nav').hasClass('active')) {
                $('header, aside, .wrap_container, .left_bg').addClass('open');
            }
        }
    });
    
    if(UI.getCookie('folding') == 1) {
    	$('header, aside, .wrap_container, .left_bg').removeClass('open');
    }    
});
