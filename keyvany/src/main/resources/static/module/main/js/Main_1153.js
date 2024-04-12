		

	$(function() {
		
		// 다국어 초기화
		i18next.loadNamespaces(["widget", "attendance"], function(err, t){
			//jquery 사용위해 선언
			jqueryI18next.init(i18next, $);
			$('body').localize();	//다국어 반영
		});

	    //출퇴근 정보
	    realtimeClock();

		$(".styled").uniform({
			radioClass: 'choice'
		});

		// Basic select
		$('.bootstrap-select').selectpicker();

		//날씨정보 바이딩
		//getWeather(jWeather_Area);
		/*********************** 작업관리 *********************/
	
		//작업관리 메뉴코드
		workMenuSn = "<%=fntEncodingUrl(workMenuSn)%>"

		//업무관리 COMMENT 로드
		/*fn_loadMainTaskComment({
			"BeforeDays" : 5
		}); */

	//전자결재 처리할 문서 로드
		fn_loadMainApproval({
			"warningHour" : 12
			,"loadModule" : "app"
			,"cmtDayCount" : 10
		});
/*
		fn_loadMainApproval({
			"warningHour" : 12
			,"loadModule" : "send"
			,"cmtDayCount" : 10
		});
*/
		fn_loadMainApproval({
			"warningHour" : 12
			,"loadModule" : "receive"
			,"cmtDayCount" : 10
		});
/*
		fn_loadMainApproval({
			"warningHour" : 12
			,"loadModule" : "complete"
			,"cmtDayCount" : 5
		});
*/
		//결재할문서  로드 끝


		/****************** 게시판   ******************/
		fn_loadBBSList("bbs-mainNotice", jnoticeMenuSn,"Notice", jnoticeCnt , "main_notice_Cnt");
		fn_loadBBSList("bbs-mainBbs", jbbsMenuSn,"BBS",  jbbsCnt , "main_bbs_Cnt");

		//fn_loadBbsCommentList();

		$(document).on("click",".bbsLink",function(){
			DetailMove($(this).data("m"), $(this).data("seq"))
		})

		$(document).on("click",".bbsMore",function(){
			DetailMove($(this).data("m"),"");
		})

		//게시판, 공지사항 more변경
		$(".nav-tabs li a").on("click", function(){
			$(".bbs_more_btn").attr("data-m", $(this).data("m"));
		});

		//게시판, 공지사항 이동
		$(".bbs_more_btn").on("click", function(){
			DetailMove($(this).data("m"), "")
		});
		/****************** /게시판  ******************/


		/****************** 일정관리 ******************/
		//일정관리 메뉴코드
		scheduleMenuSn = jscheduleMenuSn;

		//검색을 위한 기간변수 설정
		$("#mainScheduleSDate").val(moment().format('YYYY-MM-DD'))
		$("#mainScheduleEDate").val(moment().add('days', 29).format('YYYY-MM-DD'))

		//일정목록 로드
		//fn_loadScheduleList();

		//일정클릭
		$("#schedule_list").on("click", ".detailLink", function(){
			var sn = $(this).closest("tr").data("sn");
			fn_loadScheduleDetailModal(sn);
		});

		//더보기
		$(".scheduleMoreLink").on("click", function(){
			DetailMove(scheduleMenuSn, "")
		});
		/***************** //일정관리 *****************/


		/****************** 최근자료 ******************/
		//자료실 메뉴코드
		//pdsMenuSn = jpdsMenuSn;

		//최근자료 로드
		if(jAuthKind_pds != "N"){

			$("#mainPdsConfig_topNum option[value='"+$.cookie("mainPdsConfig_topNum")+"']").attr("selected", "selected")		//최대갯수
			$("#mainPdsConfig_colNum option[value='"+$.cookie("mainPdsConfig_colNum")+"']").attr("selected", "selected")		//최대갯수
			$("#mainPdsConfig_dates option[value='"+$.cookie("mainPdsConfig_dates")+"']").attr("selected", "selected")			//최대갯수
			$(".mainPdsConfig_fileAuth:input[value='"+$.cookie("mainPdsConfig_fileAuth")+"']").prop("checked", true);			//파일권한


			if(isMobile){
				$("#modal_mainPdsConfig_colNum_wrap").hide();
			}

			fn_loadPdsList();

		}


		//최근자료 more 버튼 클릭
		$(".latestPdsMoreLink").on("click", function(){
			DetailMove(jpdsMenuSn, "")
		});



		//설정저장
		$("#btn_mainPdsConfig_save").on("click", function(){

			//설정 쿠키에 저장
			$.cookie("mainPdsConfig_topNum", $("#mainPdsConfig_topNum").val(), { expires : 3600 });					//최대갯수
			$.cookie("mainPdsConfig_colNum", $("#mainPdsConfig_colNum").val(), { expires : 3600 });					//컬럼갯수
			$.cookie("mainPdsConfig_dates", $("#mainPdsConfig_dates").val(), { expires : 3600 });					//이전일수
			$.cookie("mainPdsConfig_fileAuth", $(".mainPdsConfig_fileAuth:checked").val(), { expires : 3600 });		//파일권한

			$("#modal_mainPdsConfig").modal("hide");

			fn_loadPdsList();
		});
		/***************** //최근자료 *****************/
		/*
		$('.bxslider').bxSlider({
			auto:true,
			responsive:true,
			startSlide:0,
			speed: 1000,
			controls:false
		}); */
});

var bbs_i18_loaded = false;


//게시판 로드 함수
// div id, menu seq , moduleSeq , 게시판타입, 며칠 전 데이터 갖고 올 것인지
function fn_loadBBSList(_id, mSeq, kind , defaultDt, countTaget){
	$.ajax({
		url : "/Module/UserModule/BBS/MainBBSList.page",
		type: "POST",
		dataType: "HTML",
		data:{
			"mSeq" : mSeq ,
			"kind" : kind ,
			"defaultDt" : defaultDt ,
			"TitleShowYn": "N" ,
			"_id" : _id ,
			"countTaget" : countTaget
		},
		success: function(data) {
			$("#"+_id).html(data);
		},
		error:function(request,status,error){
			console.log("BBS 로드 오류");
		}
	});
}

//최근 댓글목록 로드
function fn_loadBbsCommentList(){
	//id : bbs-commentList
	// 다국어 초기화
	if(bbs_i18_loaded == false){
		i18next.loadNamespaces(["bbs"], function(err, t){
			//jquery 사용위해 선언
			jqueryI18next.init(i18next, $);
			bbs_i18_loaded = true;
		});
	}
	$.ajax({
		url : "/Module/UserModule/bbs/MainCommentList.page",
		type: "POST",
		dataType: "HTML",
		data:{
		},
		success: function(data) {
			$("#bbs-commentList").html(data);

			try {
				//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
				$("#bbs-commentList").localize();
			}catch(exception){}
			var commentCnt = $("#bbs-commentList").find("ul").attr("data-commCnt");
			$("#main_bbs_commCnt").html(commentCnt)
		},
		error:function(request,status,error){
			console.log("작업관리 코멘트 로드 오류");
		}
	});

}


/*********************** 작업관리 *********************/

//업무관리 COMMENT 로드
function fn_loadMainTaskComment(param){
	$.ajax({
		url : "/Module/UserModule/Work/main_CommentList.page",
		type: "POST",
		dataType: "HTML",
		data:{
			"menuSn" : jworkMenuSn,				//메뉴코드
			"BeforeDays" : param.BeforeDays		//0:오늘만, 1:1일이전부터, 2:2일이전부터...
		},
		success: function(data) {
			$("#messages-tue").html(data);

			try {
				//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
				$("#messages-tue").localize();
			}catch(exception){}

			var commentCnt = $("#messages-tue").find("ul").attr("data-commCnt");
			$("#main_task_commCnt").html(commentCnt)
		},
		error:function(request,status,error){
			console.log("작업관리 코멘트 로드 오류");
		}
	});
}

//결재할문서  로드 시작
/*
function fn_loadMainApproval(param){
	$.ajax({
		url : "/module/UserModule/approval/common/main_load.do",
		type: "POST",
		dataType: "HTML",
		data:{
			"warningHour" : param.warningHour,			//경고표시해주는 시간
			"loadModule" : param.loadModule,				//로드타입 app:결재할문서, send:발신할문서, receive:수신할문서
			"myPendingMenuSn" : jmyPendingMenuSn	//메뉴일련번호
		},
		success: function(data) {
			switch (param.loadModule)
			{
			case "app":
				$("#appAppLayer").html(data);
				try {
					//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
					$("#appAppLayer").localize();
				var commentCnt = $("#appLayerCnt").val();
				$("#appAppLayerCnt").html(commentCnt);
				if (commentCnt.toString()=="0")
				{
					//$("#appAppLayer").to
				}

				}catch(exception){}

				break;
			case "send":
				$("#appSendLayer").html(data);
				try {
					//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
					$("#appSendLayer").localize();
				}catch(exception){}

				var commentCnt = $("#sendLayerCnt").val();
				$("#appSendLayerCnt").html(commentCnt);
				break;
			case "receive":
				$("#appReceiveLayer").html(data);
				try {
					//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
					$("#appReceiveLayer").localize();
				}catch(exception){}

				var commentCnt = $("#receiveLayerCnt").val();
				$("#appReceiveLayerCnt").html(commentCnt);
				break;
			}
		},
		error:function(request,status,error){
			switch (param.loadModule)
			{
			case "app":
				console.log("결재문서 로드 오류");
				break;
			case "send":
				console.log("문서발신 로드 오류");
				break;
			case "receive":
				console.log("문서수신 로드 오류");
				break;
			}
		}
	});
} */

//결재할문서  로드 끝
function fn_loadMainApproval(param){
	$.ajax({
		url : "/module/UserModule/approval/common/main_load_type2.do",
		type: "POST",
		dataType: "HTML",
		data:{
			"warningHour" : param.warningHour,	// 경고표시해주는 시간
			"cmtDayCount" : param.cmtDayCount,	// 완료문서일경우 몇일 전 문서까지 가져올지 지정
			"loadModule" : param.loadModule		// 로드타입 app:결재할문서, send:발신할문서, receive:수신할문서, complete : 완료된 문서
			//"myPendingMenuSn": param.myMenuSn //"<%=fntEncodingUrl(myPendingMenuSn)%>"	//메뉴일련번호
		},
		success: function(data) {
			switch (param.loadModule)
			{
			case "app":
				$("#appAppLayer").html(data);
				
				try {
					//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
					$("#appAppLayer").localize();

				}catch(exception){}

				var commentCnt = $("#appLayerCnt").val();
				$("#appAppLayerCnt").html(commentCnt);
				

				if (commentCnt>0)//결재항목이 있으면.. 자동확장 20180725 khs
				{
					$("#appAppLayer").addClass("in")
					$("#appAppLayer").attr('aria-expanded', true);
				}


				break;
			case "send":
				$("#appSendLayer").html(data);
				try {
					//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
					$("#appSendLayer").localize();
				}catch(exception){}

				var commentCnt = $("#sendLayerCnt").val();
				$("#appSendLayerCnt").html(commentCnt);

				break;

			case "receive":
				$("#appReceiveLayer").html(data);
				try {
					//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
					$("#appReceiveLayer").localize();
				}catch(exception){}

				var commentCnt = $("#receiveLayerCnt").val();
				$("#appReceiveLayerCnt").html(commentCnt);

				if (commentCnt>0) //수신항목이 있으면.. 자동확장 20180725 khs
				{
					$("#appReceiveLayer").addClass("in")
					$("#appReceiveLayer").attr('aria-expanded', true);
				}

				break;
			case "complete":
				$("#appCompleteLayer").html(data);
				try {
					//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
					$("#appCompleteLayer").localize();
				}catch(exception){}

				var commentCnt = $("#completeLayerCnt").val();
				$("#appCompleteLayerCnt").html(commentCnt);
			break;
			}
		},
		error:function(request,status,error){
			switch (param.loadModule)
			{
			case "app":
				console.log("결재문서 로드 오류");
				break;
			case "send":
				console.log("문서발신 로드 오류");
				break;
			case "receive":
				console.log("문서수신 로드 오류");
				break;
			case "complete":
				console.log("완료문서 로드 오류");
				break;
			}
		}
	});
}


//ActivityModal load
var work_i18_loaded = false;
function fn_loadActivityModal(actSn){
	$.ajax({
		url : "/Module/UserModule/Work/activityDetail.page",
		type: "POST",
		dataType: "HTML",
		data:{
			"menuSn" : workMenuSn,	//메뉴코드
			"actSn" : actSn
		},
		success: function(data) {

			var modalActDetail = $("#modal_activityDetail");
			modalActDetail.find(".modal-dialog").html(data);
			modalActDetail.modal("show")

			//panel관련 class modal로 변경
			modalActDetail.find(".panel").removeClass("panel").removeClass("panel-white").addClass("modal-content");
			modalActDetail.find(".panel-heading").eq(0).removeClass("panel-heading").addClass("modal-header").addClass("bg-primary");
			modalActDetail.find(".panel-body").removeClass("panel-body").addClass("modal-body");
			modalActDetail.find(".panel-title").removeClass("panel-title").addClass("modal-title");

			//modal close 추가(X)
			modalActDetail.find(".modal-header").prepend("<button class='close' type='button' data-dismiss='modal'>×</button>")
			modalActDetail.find(".heading-elements").remove(); //접기버튼에 x버튼이 가려 삭제

			//닫기버튼 생성
			var footerHtml = ""
			footerHtml += "<div class='modal-footer pt10'>"
			footerHtml += "	<button type='button' class='btn btn-default btn-xs' data-dismiss='modal'><i class='icon-cross position-left'></i><span data-i18n='btn.close'>Close</span></button> "
			footerHtml += "</div>"

			//닫기버튼 추가
			modalActDetail.find(".modal-content").append(footerHtml);



			// 다국어 초기화
			i18next.loadNamespaces(["work"], function(err, t){
				//jquery 사용위해 선언
				jqueryI18next.init(i18next, $);
				$('#modal_activityDetail').localize();	//다국어 반영
				work_i18_loaded = true;
			});
			if(work_i18_loaded){
				$('#modal_activityDetail').localize();	//다국어 반영
			}

		},
		error:function(request,status,error){
			console.log("작업관리 코멘트 로드 오류");
		}
	});
}

/********************** //작업관리 ********************/


/*********************** 일정관리 *********************/
var scheduleMenuSn; //일정관리 메뉴코드

//일정목록 로딩
function fn_loadScheduleList(param){
	$.ajax({
		url : "/Module/UserModule/schedule/main_scheduleList.page",
		type: "POST",
		dataType: "HTML",
		data:{
			"menuSn" : jscheduleMenuSn,					//메뉴코드
			"sDate" : $("#mainScheduleSDate").val(),	//시작일
			"eDate" : $("#mainScheduleEDate").val()		//종료일
		},
		success: function(data) {
			$("#schedule_list").html(data);
			$('#schedule_list').localize();	//다국어 반영

		},
		error:function(request,status,error){
			console.log("일정목록 로드 오류");
		}
	});
}

//일정상세 로딩
function fn_loadScheduleDetailModal(sn){
	$.ajax({
		url : "/Module/UserModule/schedule/scheduleDetail.page",
		type: "POST",
		dataType: "HTML",
		data:{
			"menuSn" : jscheduleMenuSn,					//메뉴코드
			"sn" : sn
		},
		success: function(data) {
			$("#modal_scheduleEdit").html(data);
			$('#modal_scheduleEdit').localize();	//다국어 반영
			$("#modal_scheduleEdit").modal("show");

		},
		error:function(request,status,error){
			console.log("일정상세 로드 오류");
		}
	});
}
/*********************** //일정관리 *********************/


/*********************** 자료실 *********************/
//var pdsMenuSn; //메뉴코드

//최근자료목록 로딩
function fn_loadPdsList(){
	$.ajax({
		url : "/Module/UserModule/PDS/main_pdsListType.page",
		type: "POST",
		dataType: "HTML",
		data:{
			"menuSn" :		jpdsMenuSn,										// 메뉴코드
			"TNum" :			$("#mainPdsConfig_topNum").val(),			// 최대갯수
			"CNum" :		$("#mainPdsConfig_colNum").val(),			// 컬럼갯수
			"BeforeDays" :	 $("#mainPdsConfig_dates").val(),				// 이전일수
			"fileAuthType" : $(".mainPdsConfig_fileAuth:checked").val()	// 파일권한
		},
		success: function(data) {
			$("#main_pds_list").html(data);
			//$(window).resize();

			try {
				//jqueryI18next가 init 이 안끝났을때 처음에 호출하면 에러발생하여 예외처리
				$("#main_pds_list").localize();
			}catch(exception){}

		},
		error:function(request,status,error){
			console.log("최근자료목록 로드 오류");
		}
	});
}
/********************** //자료실 ********************/

function SetMainWeathder(bastDt, max, min, desc, hdy, ws){
	icon=geticon(desc);
	$(".today .icon").addClass("wi-"+icon);
	$(".today .hiTemp").text( max+"°");
	$(".today .weekDay").text(bastDt+"("+ getTodayLabel(bastDt)+")");
	$(".today .Descript").text(desc);
	$(".today .humidity").text(hdy);
	$(".today .wind").text(ws);
}

function SetForcast(bastDt, xs_num, max, min, desc){

	v_day=bastDt.split("-")[2];
	//console.log("v_day:"+ v_day)
	icon=geticon(desc);
	html="";
	html += ' <div class="col-xs-'+xs_num+'">';
	html += '	   <div class="weather-day vertical-align"> ';
	html += '		 <div class="vertical-align-middle font-size-14"> ';
	html += '<table border=0  align="center"> '
	html += '<tr><td align="center"><div class="margin-bottom-10 weekNm">'+v_day +" / "+ getTodayLabel(bastDt)+ '</div></td></tr>'
	html += '<tr><td align="center"><i class="wi wi-'+icon+' font-size-24 margin-bottom-10"></i></td></tr>'
	html += '<tr><td align="center"> '+max +"°/ "+min+'° </td></tr>'
	html += '<tr><td align="center"> '+desc+'</td></tr>'
	html += '</table>'
	html += '		 </div>';
	html += '	   </div>';
	html += ' </div>';
	return 	html;
}

function geticon(desc){
	var date = new Date();
	dTime=date.getHours();

	if ((dTime>=16 && dTime<=24) || (dTime>=0 && dTime<=3) ) //밤아이콘
	{

		if (desc=="맑음")
		{
			icon_num=4
		}else if (desc=="구름 조금"){
			icon_num=5
		}else if (desc=="구름 많음"){
			icon_num=6
		}
	}else{//낮아이콘

		if (desc=="맑음")
		{
			icon_num=1
		}else if (desc=="구름 조금"){
			icon_num=2
		}else if (desc=="구름 많음"){
			icon_num=3
		}
	}

	if (desc=="흐림")
	{
		icon_num=7
	}else if (desc=="소나기"){
		icon_num=8
	}else if (desc=="비"){
		icon_num=9
	}else if (desc=="눈"){
		icon_num=11
	}else if (desc=="천둥번개"){
		icon_num=17
	}else if (desc=="연무"){
		icon_num=18
	}else if (desc=="안개"){
		icon_num=19
	}else if (desc=="박무"){
		icon_num=20
	}else if (desc=="황사"){
		icon_num=21
	}else if (desc=="가끔 비, 한때 비"){
		icon_num=10
	}else if (desc=="가끔 눈, 한때 눈"){
		icon_num=12
	}else if (desc=="비 또는 눈"  || desc=="비/눈"){
		icon_num=13
	}else if (desc=="눈 또는 비" || desc=="눈/비"){
		icon_num=15
	}else if (desc=="가끔 비 또는 눈, 한때 비 또는 눈"){
		icon_num=14
	}else if (desc=="가끔 눈 또는 비, 한때 눈 또는 비"){
		icon_num=16
	}

	return icon_num;
}

function DayPlus(baseDt, plusDay, view){

	 baseDt=baseDt.replace(/-/g, '/');
     var dt = new Date(baseDt);
     dt.setDate(dt.getDate() + plusDay);

	var dd = dt.getDate();
	var mm = dt.getMonth() + 1;
	var yyyy = dt.getFullYear();
	var dtPlus =yyyy +view+  mm +view+  dd;
	return dtPlus;
}

function realtimeClock() {

	  $("#Ctime").text(getTimeStamp());
	  setTimeout("realtimeClock()", 1000);
}

function getTimeStamp() { // 24시간제
	  var d = new Date();

	  var s =
		leadingZeros(d.getFullYear(), 4) + '-' +
		leadingZeros(d.getMonth() + 1, 2) + '-' +
		leadingZeros(d.getDate(), 2) + ' ' +

		leadingZeros(d.getHours(), 2) + ':' +
		leadingZeros(d.getMinutes(), 2) + ':' +
		leadingZeros(d.getSeconds(), 2);

	  return s;
}

function leadingZeros(n, digits) {
	  var zero = '';
	  n = n.toString();

	  if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
		  zero += '0';
	  }
	  return zero + n;
}

function getdate(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	dateStr = year + '-' + month+ '-' +day;
	return dateStr;
}

function getTodayLabel(arg) {
	 arg=arg.replace(/-/g, '/');
	var week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
	var today = new Date(arg).getDay();
	var todayLabel = week[today];
	return todayLabel;
}

//다국어 초기화 완료시 호출, 2017-06-20, 김영식
function fn_i18nextLoaded(){
	//Daterange picker
	//일정정보 조회 기간 선택 초기화
	$('.daterange-ranges').daterangepicker({
		startDate: moment(),
		endDate: moment().add('days', 29),
		dateLimit: { days: 60 },
		ranges: {
			'Today': [moment(), moment()],
			'Tomorrow': [moment().add('days', 1), moment().add('days', 1)],
			'After 7 Days': [moment(), moment().add('days', 6)],
			'After 30 Days': [moment(), moment().add('days', 29)],
			'This Month': [moment().startOf('month'), moment().endOf('month')]
		},
		opens: 'left',
		applyClass: 'btn-small bg-slate-600 btn-block',
		cancelClass: 'btn-small btn-default btn-block',
		/*
		locale: {
		  format: 'YY-MM-DD'
		}
		*/
		locale: datepicker_locale
	},
	function(start, end) {
		$('.daterange-ranges span').html(start.format('YY.MM.DD') + ' - ' + end.format('YY.MM.DD'));

		//검색을 위한 기간변수 설정
		$("#mainScheduleSDate").val(start.format('YYYY-MM-DD'));
		$("#mainScheduleEDate").val(end.format('YYYY-MM-DD'));

		fn_loadScheduleList();	//기간 변경시 schedule reload
	});
	fn_loadScheduleList();

	//일정기간 정보 노출
	$('.daterange-ranges span').html(moment().format('YY.MM.DD') + ' - ' + moment().add('days', 29).format('YY.MM.DD'));

	//daterangepicker show 이벤트
	$(".daterange-ranges").on('show.daterangepicker', function(ev, picker) {
		//일정기간 선택에 input 숨기기, 2017-06-20, 김영식
		$(picker.container).find(".daterangepicker-inputs").hide();
		$(picker.container).find(".ranges li[data-range-key='Today']").html(i18next.t("daterangepicker.range.toDay"));
		$(picker.container).find(".ranges li[data-range-key='Tomorrow']").html(i18next.t("daterangepicker.range.tomorrow"));
		$(picker.container).find(".ranges li[data-range-key='After 7 Days']").html(i18next.t("daterangepicker.range.after7Days"));
		$(picker.container).find(".ranges li[data-range-key='After 30 Days']").html(i18next.t("daterangepicker.range.after30Days"));
		$(picker.container).find(".ranges li[data-range-key='This Month']").html(i18next.t("daterangepicker.range.thisMonth"));
		$(picker.container).find(".ranges li[data-range-key='Custom']").html(i18next.t("daterangepicker.range.custom"));

		var rangeKey = $(picker.container).find(".ranges .active").data("range-key");

		if(rangeKey != "Custom"){
			$(picker.container).removeClass("show-calendar")
		}
	});

}
