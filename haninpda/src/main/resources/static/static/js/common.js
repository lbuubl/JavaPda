$(function() {
    page.init();
});

var page = {
    init: function() {
        page.gnb();
    },
    gnb: function() {
        //gnb 메뉴
        $("#gnb .sub_menu").each(function() {
            var getMenu = $(this).parent();
            getMenu.find(".btn_menu").on("click", function() {
                if(getMenu.hasClass("active")) {
                    getMenu.removeClass("active").find(".sub_menu").stop(true,true).slideUp(200);
                }
                else {
                    //$("#gnb .gnb_menu.active").removeClass("active").find(".sub_menu").stop(true,true).slideUp(200);
                    getMenu.addClass("active").find(".sub_menu").stop(true,true).slideDown(200);
                }
                return false;
            });
        });

        var header = $("#header");
        var headerMask = $("#header_mask").on("click", function() {
            headerMask.stop(true,true).animate({ opacity:0 }, 200, function() {
                $(this).hide();
            });
            header.stop(true,true).animate({ left:-250 }, 200);
            return false;
        });
        $("#btn_gnb_menu").on("click", function() {
            headerMask.stop(true,true).css("opacity",0).show().animate({ opacity:0.5 }, 200);
            header.stop(true,true).animate({ left:0 }, 200);
            return false;
        });
    }
}


var gl_whCd = function(){
	return $('#glWhCd').val();
}

var gl_facCd = function(){
	return $('#glFacCd').val();
}


var gf_alert = function(msg){
	alert(msg)
	return true;
}

var gf_confirm = function(msg){
	return confirm(msg);
}

var gf_toDay = function(){
	let today = new Date();
	let year = today.getFullYear();
	let month = ('0' + (today.getMonth() + 1)).slice(-2);
	let day = ('0' + today.getDate()).slice(-2);
	return year + '-' + month  + '-' + day;
}
