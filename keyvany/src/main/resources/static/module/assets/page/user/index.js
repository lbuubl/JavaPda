 var $sigdiv=""
 var doSearch=""
$(function() {

	  i18next.loadNamespaces(["user"], function(err, t){
		jqueryI18next.init(i18next, $);		//jquery 사용위해 선언
		$('body').localize();				//다국어 반영
	  });

	 if(isMobile){
		pageViewitemCnt=10;
		vPages =5

		var mobile_call =function() {
				if(document.activeElement.name!="Search_nm"){//현재 포커스된 오브젝트가 검색박스가 아니라면..
					if ($(window).width() > 600)
					{
						$("#seach_input").appendTo("#pc_seach");
					}else{
						$("#seach_input").appendTo("#mobile_seach");
					}
				}
		}
		$(window).resize(mobile_call);
		mobile_call();

		var btnResize=function(){
			if ($(window).width() < 600){
				$("#addBtnText").hide();
			}else{
				$("#addBtnText").show();
			}
		}
		$(window).resize(btnResize);
		btnResize();
	 }else{
		if (cWidth>=1200)
		{
			pageViewitemCnt=20;
			vPages =10
		}else if(cWidth>=1000){
			pageViewitemCnt=16;
			vPages =10
		}else if(cWidth>=800){
			pageViewitemCnt=12;
			vPages =7
		}else{
			pageViewitemCnt=8;
			vPages =5
		}
	 }

	 $("#pagesize").val(pageViewitemCnt);
	  var $pagination = $('#userPg');
	  var defaultOpts = {
		totalPages: 20,
		 visiblePages: vPages
	  };

	 $pagination.twbsPagination(defaultOpts);

	//page first load
	 loadData("s");

	//View mode
	var elem = document.querySelector('.switch-mode');
	var init = new Switchery(elem);
	var suno="";

	 //사용자 작성창
	$('#write_modal').on('show.bs.modal', function(e) {

		var mode="i";
		var ssid=$("#ssid").val();
		ajaxUser(mode, ssid, "");

	});

	//사용자 선택
	$('#edit_modal').on('show.bs.modal', function(e) {

		var Choice_user = $(e.relatedTarget)
		var mode="e";
		var ssid=$("#ssid").val();
		     suno=$(Choice_user).attr("uno");
		     ajaxUser(mode, ssid,  suno);

	});


	$("#detailView").on("click", function(){
			$('.collapseP').trigger('click');
	});

	//검색
	$('#Search_nm').keydown(function (key) {
		if(key.keyCode == 13){
		    doSearch();
		    $(this).blur();//모바일키보드 숨김
		}

	});

	$(document).on("click", ".po, .st, .uc, .sLicense", function (e) {
		BlockShow($("#user_box"));

		cl=$(this).attr("class");
		cv=$(this).attr("cd");
		//console.log($(this));
		if (cv!="")
		{
			$("#"+cl).val(cv);
		}else{
			$("#"+cl).val("");
		}

		var new_wh="";
		if ($("#po").val()!="")
		{
			new_wh="po="+$("#po").val() +",";
		}
		if ($("#st").val()!="")
		{
			new_wh=new_wh+"st="+$("#st").val() +",";
		}
		if ($("#uc").val()!="")
		{
			new_wh=new_wh+"uc="+$("#uc").val() +",";
		}
		if ($("#sLicense").val()!="")
		{
			new_wh=new_wh+"sLicense="+$("#sLicense").val() +",";
		}

		if (cv=="")
		{
			vt=$("#"+cl).attr("viewTxt");
			vc =$("#"+cl).attr("viewCs");
		}else{
			vt=$(this).text();
			vc =$("#"+cl).attr("viewCs").replace("4","3")
		}
		// Change in dropdown
		$(this).closest(".dropdown").find('.dropdown-toggle').html( '<i class='+vc+' position-left></i> '+ vt+ ' <i class="caret" />' );

		$("#wh").val(new_wh);
		$("#page").val(1);
		 loadData("s");
	});

	doSearch=function(){
		BlockShow($("#user_box"));
		$('#key').val($("#Search_nm").val());
		$("#page").val(1);
		loadData("s");
	}

	function Pageinit(user, calltype){
		    var recordsTotal = user.recordsTotal;
		    var totalPages= user.Totalpage;

		    if (recordsTotal >0)
		    {
			     $("#user_box").attr("align", "");
				if (calltype=="s")
				{
					   var currentPage = 1;
				}else{
					   var currentPage = $pagination.twbsPagination('getCurrentPage');
				}

			    $pagination.twbsPagination('destroy');
			    $pagination.twbsPagination($.extend({}, defaultOpts, {
					initiateStartPageClick: false ,
					startPage: currentPage,
					totalPages: totalPages,
					 first : '<<',
					 prev : '<',
					 next : '>',
					 last : '>>',
					onPageClick: function (evt, page) {
						BlockShow($("#user_box"));
						$("#page").val(page);
						loadData("p");
					}
			    }));
		    }else{
			    $("#user_box").html( i18next.t("common:datatable.option.emptyTable") );
			    $("#user_box").attr("align", "center");
			    $pagination.twbsPagination('destroy');
		    }
	}

	function loadData(calltype){

			currentPage=$("#page").val();
			$.ajax({
				//url:'/module/sysmodule/User/User_list.do',
				url:'/module/sysmodule/user/userList',
				type:'post',
				data: $('#User_form').serialize(),
				success: function (user) {
					   $("#totalCnt").text(" "+ user.recordsTotal+" 건");
					   $("#user_box").html("");

					   Pageinit(user, calltype);
					   DrawGrid(user.data);
					   try
					   {
						   $('#user_box').localize();		//다국어 반영
					   }
					   catch (e) {}
					   BlockHide();
				},
				 error:function(request,status,error){
					 alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					 BlockHide();
				 }
			    });
	}

	function callDatepicker(objnm){

		//var d = new Date();
		//var todayDate = '' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();

		$("#"+objnm).daterangepicker({
			locale: datepicker_locale,  //다국어 js에 선언
			singleDatePicker: true,
			autoUpdateInput: false,
			showDropdowns: true,
			minDate: moment().subtract(100, 'years'),
			maxDate: moment().add(5, 'years')
		},
	        function(start, end, label) {
		    $("#"+objnm).val(start.format('YYYY-MM-DD'));
	        });
	}

	function ajaxUser(mode, ssid, uno ){
		if (mode=="i")
		{
			call_div="write";
		}else{
			call_div="edit";
		}

		$.ajax({
			  //url:'/module/sysModule/User/User_write.page',
			  url:'/module/sysmodule/user/userWrite',
			  type:'post',
			  data: "mode="+mode+"&uno="+uno,
			  success:function(data){

				$('#write_modal').html("");
				$('#edit_modal').html("");
				$('#'+call_div+'_modal').html(data);

				$('#'+call_div+'_modal').localize();	//다국어 반영

				$('.select').select2({
					minimumResultsForSearch: Infinity
				 });

				datepickerI18n();			//datepicker 다국어함수호출

				$(".daterangepicker").remove();

				callDatepicker("bday");
				callDatepicker("indt");
				callDatepicker("outdt");

				$sigdiv = $("#signature").jSignature({'UndoButton':true});//

				userInfoCheck(); // validate init
			   }
		});
	}
});

/* 상세보기 클릭 */
$(document).on("click", ".collapseP", function (e) {

	e.preventDefault();

	ToggleObj=$(this).closest(".panel").find('.dtlinfo');
    $(this).parents('.panel').toggleClass('panel-collapsed');
    $(this).toggleClass('rotate-180');
     ToggleObj.slideToggle(150);

});

$(document).on("click", ".navbar-nav [data-toggle=collapse]", function (e) {
	$("#paginBox").toggleClass('hide');
});

function DrawGrid(data){
	$("#UserBoxTemplate").tmpl(data).appendTo("#user_box");

	//상세보기
	if($("#detailView").is(":checked")){
		$(".dtlinfo").slideToggle(150);
		$(".collapseP").addClass("rotate-180")

		$("#user_box .panel").addClass("panel-collapsed")
	}
}
