

$(function(){

	// 다국어 초기화
	i18next.loadNamespaces(["schedule"], function(err, t){
		//jquery 사용위해 선언
		jqueryI18next.init(i18next, $);
		//$('body').localize();				//다국어 반영

		// 메인페이지 주요일정 로딩
		loadMainSechduleType();
	});

	//다국어 변경시 fullcalendar 언어 변경
    $('.languageC').on('click', function () {
		var lang = changeLanCode_fullcalendar($(this).attr("class").substr(0, 2));
		$('.fullcalendar-external').fullCalendar('option', 'locale', lang);


		//$(".fc-write-button").text(i18next.t("btn.write"));		//달력 등록버튼 다국어처리
		//$(".fc-search-button").html("<i class='icon-search4 position-left'></i>" + i18next.t("btn.search"));	//달력 검색버튼 다국어처리

		//달력 등록버튼
		$(".fc-write-button").html("<i class='icon-plus3 position-left'></i>" + i18next.t("btn.write"));

		//달력 검색버튼
		$(".fc-search-button").html("<i class='icon-search4 position-left'></i>" + i18next.t("btn.search"));

		if(isMobile){
			$('.fullcalendar-external').fullCalendar( 'changeView', 'listMonth');
			$(".fc-write-button").show();	//작성버튼
		}else{
			$(".fc-write-button").hide();	//작성버튼
		}
	});


	/* 화면 크기 변경시 UI 컨트롤 처리 */
	$(window).resize(function() {
		//uiFixed_schedule();
	});


	//일정 등록/수정 모달 닫힐때 -> 모바일 UI 적용여부 초기화
	$('#modal_scheduleEdit').on('hidden.bs.modal', function () {
		edit_eDateTime_moved = false;
	});

});

//i18Next 로드완료
function fn_i18nextLoaded(){
	createFullcalendar();	//FullCalendar 생성

	//벨리데이션 다국어 처리
	validatorI18n();

	//언어 변경시 다국어 처리
	i18next.on('languageChanged', function(lng) {
		validatorI18n();
	});
}

//FullCalendar 생성
function createFullcalendar(){
	/*---------------------------------------------------------------------*/
	/***************************** FullCalendar ****************************/
	/*---------------------------------------------------------------------*/

	//var lang = i18next.language
	var lang = changeLanCode_fullcalendar(i18next.language);
	var calHeight = cHeight-190;
	var defaultView = "month";
	if (isMobile){
		calHeight = cHeight-125;
		defaultView = "listMonth";
	}

    // calendar 초기화
    $('.fullcalendar-external').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title, search, write',
            right: 'month,agendaWeek,agendaDay,listMonth'
        },
		customButtons: {
			write: {
				text: i18next.t("btn.write"),
				click: function() {
					$("#scheAddForm input[name='sdate']").val(getTimeStamp);
					$("#scheAddForm input[name='sn']").val("");
					$("#scheAddForm input[name='AllDay_Yn']").val("Y");
					showScheduleEdit();
				}
			},
			search: {
				text: i18next.t("btn.search"),
				click: function() {
					$("#modal_search").modal("show");
				}
			}
		},
		slotLabelFormat: 'HH:mm',
		timeFormat: 'HH:mm',
		defaultView: defaultView,
        editable: true,
        defaultDate: getTimeStamp(),
        locale: lang,
        droppable: true, // this allows things to be dropped onto the calendar
		forceEventDuration : true,				//event duration 설정여부
		defaultTimedEventDuration: '01:00:00',	//시간일정은 기본 1시간으로 설정
		fixedWeekCount: false,					//월의 해당 주만큼만 달력표시
		height: calHeight,
		nextDayThreshold: '00:00:00', // 9am


		eventSources: [{
            //url: '/module/usermodule/schedule/json/getCalData.do',
            url: '/module/usermodule/schedule/getCalData',
            type: 'POST',
			data: function(){
				return{
					//kindCd: $("#frmScheduleSearch input[name='kindCd']").val(),
					scheduleGubun: $("#frmScheduleSearch select[name='scheduleGubun']").val(),
					sourceType: $("#frmScheduleSearch select[name='sourceType']").val(),
					keyWord: $("#frmScheduleSearch input[name='keyWord']").val(),
					srchUserNm: $("#frmScheduleSearch input[name='srchUserNm']").val()
				}
			},
            error: function() {
                alert('there was an error while fetching events!');
            }
		}],

		/* selectable 추가 */
		selectable: true,
		select: function (start, end, jsEvent, view) {

			var sDate	= start.format();
			var eDate	= end.format();
			var sTime	= "";
			var eTime	= "";
			var AllDay_Yn = "";

			//console.log("orgSDate : " + sDate)
			//console.log("orgEDate : " + eDate)

			//전일일정 선택시 종료일을 다음날 0시로 리턴해주므로 -1일 처리
			if(sDate.length == 10){
				var endDate = new Date(eDate.replace(/-/g, '/'));
				endDate.setDate(endDate.getDate() - 1);

				var eYYYY = endDate.getFullYear();
				var eMM = (endDate.getMonth()+1+"").lpad(2, "0");
				var eDD = (endDate.getDate()+"").lpad(2, "0");

				eDate = eYYYY +"-"+ eMM +"-"+ eDD;
				AllDay_Yn = "Y"


			//시간까지 선택시 일, 시간 분리
			}else{
				//2017-02-23T08:00:00
				sTime = sDate.substring(11, 16)
				eTime = eDate.substring(11, 16)
				sDate = sDate.substring(0, 10)
				eDate = eDate.substring(0, 10)
			}

			//console.log("sDate : " + sDate)
			//console.log("eDate : " + eDate)
			//console.log("sTime : " + sTime)
			//console.log("eTime : " + eTime)

			$("#scheAddForm input[name='sdate']").val(sDate);
			$("#scheAddForm input[name='edate']").val(eDate);
			$("#scheAddForm input[name='stime']").val(sTime);
			$("#scheAddForm input[name='etime']").val(eTime);
			$("#scheAddForm input[name='AllDay_Yn']").val(AllDay_Yn);
			$("#scheAddForm input[name='sn']").val("");


			showScheduleEdit();

			//$("#calendar").fullCalendar("unselect");
		},

		selectOverlap: function(event) {
			return ! event.block;
		},
		/* //selectable 추가 */


		eventRender: function(event, element) {
			if(event.icon){
				//element.find(".fc-title").prepend("<i class='fa fa-"+event.icon+"'></i>");
				element.find(".fc-title").prepend("<img src='"+event.icon+"'> ");
				element.addClass("kind_" + event.kindCd);
				element.data("kindcd", event.kindCd);
				element.data("id", event.id);

				if (event.openType != undefined && event.openType == "Z"){	//비공개일정
					element.find(".fc-title").append(" <i class='icon-lock2 iconLock'/>");
				}

				//element.find(".fc-title").prepend("<i class='f_icons file_ppt' style='display: table-cell; text-align: center; vertical-align: middle;'/>");
			}
		},

		//전체 랜딩후 작성버튼 설정
		eventAfterAllRender: function(view) {
			if(isMobile){
				$(".fc-write-button").show();	//작성버튼

			}else{
				$(".fc-write-button").hide();	//작성버튼
			}

			//달력 등록버튼
			$(".fc-write-button").html("<i class='icon-plus3 position-left'></i>" + i18next.t("btn.write"));

			//달력 검색버튼
			$(".fc-search-button").html("<i class='icon-search4 position-left'></i>" + i18next.t("btn.search"));


			//주요일정 obx 높이 조정
			//if(! isMobile){
				var calTableHeight = $(".fullcalendar-external .fc-view-container").height();
				$("#mainSechduleTypeContent").height(calTableHeight-20);
			//}

			//주요일정 카운트 표시
			fn_drowScehduleKindCount();

			//일정종류에 따른 필터링
			eventVisible_eventType();

		},

		eventMouseover: function(calEvent, jsEvent) {
		//eventMouseover : function(event, e, view) {

			var $target = $(jsEvent.currentTarget).data("isMouseOver", true);

			setTimeout(function() {
				$("div.scheduleHint").remove();

				if($target.data("isMouseOver")) {
					var schedule = calEvent.schedule;

					/*
					console.log(calEvent);
					console.log(jsEvent);
					console.log("allDay : " + calEvent.allDay)
					console.log("title : " + calEvent.title)
					console.log("start : " + calEvent.start.format("YYYY-MM-DD HH:mm"))
					console.log("end : " + calEvent.end.format("YYYY-MM-DD HH:mm"))
					console.log("regNm : " + schedule.regNm)
					console.log("regDt : " + schedule.regDt)
					console.log("attendNm : " + schedule.attendNm)
					*/

					/*
					var startDate	= calEvent.start.format("YYYY-MM-DD HH:mm");
					var endDate		= calEvent.end.format("YYYY-MM-DD HH:mm");
					var registDate	= calEvent.schedule.regDt;
					*/

					var startDate	= moment(calEvent.start);
					var endDate		= moment(calEvent.end);
					var registDate	= calEvent.schedule.regDt;

					var hintData = {

						iconUrl : calEvent.icon,
						title : calEvent.title,
						color : calEvent.color,
						time : startDate.format(calEvent.allDay == 1 ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm"),	// 시작시간
						registerName : schedule.regNm,
						registDate : schedule.regDt,
						attendNm : schedule.attendNm,

						//pubObjNm : schedule.pubObjNm,	//공용설비
						pubObjNm : schedule.pubObjNm.replace(/, /gi, "<br>"),

						title_registerName : i18next.t("schedule:label.registerer"),
						title_attendNm : i18next.t("schedule:label.participant"),
						title_pubObj : i18next.t("schedule:label.scheduleEdit.publicObject")
						/*
						,conferenceRooms : $.grep(schedule.facilityList, function(facility) { return facility.categoryId == "FC0000000"; }),
						facilities : $.grep(schedule.facilityList, function(facility) { return facility.categoryId != "FC0000000"; })
						*/
					};

					//console.log()
					//console.log((schedule.attendNm).replace(/, /gi, "<br>"))

					if(calEvent.allDay){	// 종료시간
						if(startDate.format("YYYY-MM-DD") == endDate.add(-1, 'days').format("YYYY-MM-DD")){
							hintData.time += " " + i18next.t("schedule:label.scheduleEdit.allDay");
						}else{
							hintData.time += " ~ " + endDate.format("YYYY-MM-DD");
						}

					}else{
						if(startDate.format("YYYY-MM-DD") == endDate.format("YYYY-MM-DD")) {
							hintData.time += " ~ " + endDate.format("HH:mm")
						}else {
							hintData.time += " ~ " + endDate.format("YYYY-MM-DD HH:mm")
						}
					}

					var $hint = $("#tmpScheduleHint").tmpl(hintData).appendTo("body");
						$hint.fadeIn('500');
						$hint.fadeTo('10', 1.9);

					var $event = $(jsEvent.target);
					if($event.hasClass("fc-resizer")) $event = $event.parent();

					var position = $event.offset(),
						//top = position.top - 12,
						top = position.top + 12,
						left = position.left + $event.width() + 4;

					if(left + $hint.outerWidth() > $(window).width()) left = position.left - $hint.outerWidth() - 6;
					$hint.css({
						top : top + "px",
						left : left + "px"
					});
				}
			}, 300);
		},

		eventMouseout: function(calEvent, jsEvent) {
			$("div.scheduleHint").remove();
			$(jsEvent.currentTarget).data("isMouseOver", false);
		},

		//이벤트 클릭
		eventClick: function(calEvent, jsEvent, view) {
			//console.log("title : " + calEvent.title)
			//console.log("id : " + calEvent.id)
			//console.log("kindCd : " + calEvent.kindCd)
			showEvent(calEvent.id);

			//미리보기 숨김처리
			$("div.scheduleHint").remove();
			$(jsEvent.currentTarget).data("isMouseOver", false);
		},

		//날짜 클릭 이벤트

		dayClick: function(date, jsEvent, view) {
			if (isMobile)
			{
						var sDate	= date.format();
						var eDate	= date.format();
						var sTime	= "";
						var eTime	= "";
						var AllDay_Yn = "";

						//전일일정 선택시 종료일을 다음날 0시로 리턴해주므로 -1일 처리
						if(sDate.length == 10){
							var endDate = new Date(eDate.replace(/-/g, '/'));
							endDate.setDate(endDate.getDate() );

							var eYYYY = endDate.getFullYear();
							var eMM = (endDate.getMonth()+1+"").lpad(2, "0");
							var eDD = (endDate.getDate()+"").lpad(2, "0");

							eDate = eYYYY +"-"+ eMM +"-"+ eDD;
							AllDay_Yn = "Y"


						//시간까지 선택시 일, 시간 분리
						}else{
							//2017-02-23T08:00:00
							sTime = sDate.substring(11, 16)
							eTime = eDate.substring(11, 16)
							sDate = sDate.substring(0, 10)
							eDate = eDate.substring(0, 10)
						}

						$("#scheAddForm input[name='sdate']").val(sDate);
						$("#scheAddForm input[name='edate']").val(eDate);
						$("#scheAddForm input[name='stime']").val(sTime);
						$("#scheAddForm input[name='etime']").val(eTime);
						$("#scheAddForm input[name='AllDay_Yn']").val(AllDay_Yn);
						$("#scheAddForm input[name='sn']").val("");

					showScheduleEdit();
			}
		},


		//이벤트 드레그해서 이동
		eventDrop: function(event) { // called when an event (already on the calendar) is moved
			//console.log('eventDrop', event);
			moveEvent(event);	//일정 변경
		},

		//주요일정 끌어놓기
		eventReceive: function(event){
			saveExternalEvent(event);	//일정 저장
		},

		//일정 늘리기, 줄이기
		eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) {
			//console.log("eventResize", event);
			moveEvent(event);	//일정 변경
		},

		viewRender: function(view, element) {	//뷰가 변경되면 발생
			if (view.name=="listMonth"){		//다른곳에 갔다오면 이름 다시 지정
			   listViewPrvNext();
			}
		}

    });

	/*---------------------------------------------------------------------*/
	/**************************** // FullCalendar *******************/
	/*---------------------------------------------------------------------*/

}

var HSMA =null;

function listViewPrvNext(){

	$(".fc-scroller").attr("id", "ListView");

	var listview= document.getElementById('ListView');

	//제호출시 기존obj삭제
	if (HSMA!=null) {
		HSMA.destroy();
	}

	HSMA = new Hammer.Manager(listview);
	HSMA.add( new Hammer.Pan({ event: 'panend', threshold: 80 }) );

	HSMA.on("panend", function(ev) {
		if (ev.direction == 2){
			$('.fc-next-button').trigger('click');
		}else if(ev.direction == 4){
			$('.fc-prev-button').trigger('click');
		}
	});
}


// 날자 클릭 (신규/수정)
function showScheduleEdit(){
	var param = $("#scheAddForm").serialize();

	var cmd = $("#scheAddForm input[name='cmd']").val()

	$.post(
		//"/Module/UserModule/schedule/scheduleEdit.page", param,
		"/module/usermodule/schedule/scheduleEdit", param,
		function(data) {

			$("#modal_scheduleEdit").html(data);

			//등록된 일정종류, 신규등록 가능한 일정종류
			var kindCdLen = $("#kindCd option").length
			var newKindSn = $("#newKindSn option").length

			if(kindCdLen + newKindSn == 0){	//일정종류가 없을경우
				//alert("코드관리에 등록된 일정종류가 없습니다. 코드관리에서 등록 후 사용가능합니다");
				swal({
					title: i18next.t("schedule:msg.emptyScheduleKindCd"),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});

			}else{
				$("#modal_scheduleEdit").localize();	//다국어 적용
				$("#modal_scheduleEdit").modal("show");
			}

		}
	);
}


//일정 보기
function showEvent(sn){

	$.post(
		//"/Module/UserModule/schedule/scheduleDetail.page",
        "/module/usermodule/schedule/scheduleDetail",
		{
			"sn" : sn
		},
		function(data) {
			$("#modal_scheduleEdit").html(data);
			$("#modal_scheduleEdit").localize();	//다국어 적용
			$("#modal_scheduleEdit").modal("show");
		}
	);
}


//주요일정 끌어서 일정 등록
function saveExternalEvent(event){
	var openType = "";

	//쿠키에 저장된 공개여부가 있으면 저장시 처리
	var cookie_openType = $.cookie("schedule_openType_"+$.cookie("menu_Seqno"));
	if (cookie_openType != "" && cookie_openType != undefined && cookie_openType != null && cookie_openType != "null"){
		openType = cookie_openType;
	}

	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/schedule/scheduleEditDml.do",
		url: "/module/usermodule/schedule/scheduleEditDml",
		data: {
			"SSID" : $("#gssid").val(),
			"dmlType" : "add",
			"kindCd" : event.kindCd,
			"subject" : event.title,
			"sdate" : event.start.format("YYYY-MM-DD"),
			//"edate" : event.end.format("YYYY-MM-DD"),
			"edate" : event.start.format("YYYY-MM-DD"),	//종일 일정이므로 시작일, 종료일 같다. (종료일이 +1일 이 나와 시작일 사용)
			"stime" : event.start.format("HH:mm"),
			"etime" : event.end.format("HH:mm"),
			"chkAllDay" : event.allDay?1:0,
			"attUserSn" : uid,
			"attUserNm" : unm,
			"openType" : openType
		},
		dataType: "json",
		success:function(data) {

			//저장된 공개여부에 따라 저장 메세지 설정
			var rtOpenType = data.openType;
			var okMsg = ""
			if (rtOpenType == "A"){
				okMsg = i18next.t("schedule:msg.saveOkPublic")
			}else{
				okMsg = i18next.t("schedule:msg.saveOkPrivate")
			}

			if(data.result == "success"){
				swal({
					title: okMsg,
					showConfirmButton: false,
					type: "success",
					timer: 1000
				});

				/*
				event.id = data.newSn;	//등록된 eventId를 세팅한다.
				event._id = data.newSn;	//등록된 eventId를 세팅한다.
				$('.fullcalendar-external').fullCalendar('updateEvent', event);
				*/

				$('.fullcalendar-external').fullCalendar('removeEvents', event._id);
				$('.fullcalendar-external').fullCalendar('refetchEvents');

			}else{
				swal({
					title: i18next.t(data.code),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
			}
		}
		, error:function(xhr,textStatus){
			swal({
				title: i18next.t("msg.DbError"),
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				type: "error"
			});
		}
	});
}


//일정 변경
function moveEvent(event){


	var sdate = event.start.format("YYYY-MM-DD");
	var edate = event.end.format("YYYY-MM-DD");

	if (event.allDay && sdate < edate){
		edate = fn_addDate(edate, -1);
	}

	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/schedule/scheduleEditDml.do",
		url: "/module/usermodule/schedule/scheduleEditDml",
		data: {
			"SSID" : $("#gssid").val(),
			"dmlType" : "move",
			"sn" : event.id,
			"sdate" : sdate,
			"edate" : edate,
			"stime" : event.start.format("HH:mm"),
			"etime" : event.end.format("HH:mm"),
			"chkAllDay" : event.allDay?1:0
		},
		dataType: "json",
		success:function(data) {

			if(data.result == "success"){
				swal({
					title: i18next.t("msg.editOk"),
					showConfirmButton: false,
					type: "success",
					timer: 1000
				});

				//event.id = data.newSn;	//등록된 eventId를 세팅한다.

			}else{
				swal({
					title: i18next.t(data.code),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
			}
		}
		, error:function(xhr,textStatus){
			swal({
				title: i18next.t("msg.DbError"),
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				type: "error"
			});
		}
	});
}

//주요일정 카운트 표시
function fn_drowScehduleKindCount(){

	var viewName = $('.fullcalendar-external').fullCalendar('getView').name;
	var evtClass = "";

	if(viewName == "listMonth"){
		evtClass = ".fc-list-item"
	}else{
		evtClass = ".fc-event"
	}

	//count 초기화
	$("#mainSechduleTypeContent .fc-event").data("count", "0");

	//이벤트 갯수만큼 반복하며 count 증가
	var allEvent = $(".fc-widget-content "+evtClass);


	/**********************************************/
	/* 월달력에서 주를 걸치는 이벤트의 중복제거 */
	var viewName = $('.fullcalendar-external').fullCalendar('getView').name;
	if(viewName == "month"){
		var dupes = {};
		var singles = [];

		$.each(allEvent, function(i, el){
			if (!dupes[$(this).data("id")]) {
				dupes[$(this).data("id")] = true;
				singles.push($(this));
			}
		});
		allEvent = $(singles);
	}
	/* //월달력에서 주를 걸치는 이벤트의 중복제거 */
	/***********************************************/

	allEvent.each(function(){
		var eObj = $("#mainSechduleTypeContent .fc-event[data-kindcd = '" + $(this).data("kindcd") + "']")

		var preCnt = parseInt(eObj.data("count"));
		eObj.data("count", (preCnt+1));

	});


	//최종 집계된 카운트를 표시
	$("#mainSechduleTypeContent .fc-event").each(function(){
		var kindCnt = $(this).data("count")

		if(parseInt(kindCnt) > 0){
			$(this).find(".kindCnt").html( "(" + kindCnt + ")")
		}else{
			$(this).find(".kindCnt").html( "")
		}
	});



	/*
	$("#mainSechduleTypeContent .fc-event").each(function(){
		var kindCnt = $(this).data("count")
	});
	*/

	//검색창의 일정종류 selectbox text 변경(갯수표시);
	$("#srchKindCd").find("option").each(function(){
		var val = $(this).val();

		var eventCnt = $("#mainSechduleTypeContent .fc-event[data-kindcd='"+$(this).val()+"'] .kindCnt").html();
		var title = $("#mainSechduleTypeContent .fc-event[data-kindcd='"+$(this).val()+"']").data("title");
		var selectText = title;
		if(eventCnt > ""){
			selectText += " " + eventCnt;
		}

		$(this).text(selectText);
	});
	$("#srchKindCd").multiselect('rebuild');
	$(".styled, .multiselect-container input").uniform({ radioClass: 'choice'});
	$.uniform.update();

}



/*---------------------------------------------------------------------*/
/***************************** FullCalendar ****************************/
/*---------------------------------------------------------------------*/
// 주요일정 초기화
function initExternalEvents(){
    $('#external-events .fc-event').each(function() {

        // Different colors for events
        $(this).css({'backgroundColor': $(this).data('color'), 'borderColor': $(this).data('color')});

        // Store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $(this).data('title'),
            color: $(this).data('color'),
            kindCd: $(this).data('kindcd'),
            icon: $(this).data('icon'),
            stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

        // Make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true, // will cause the event to go back to its
            revertDuration: 0, // original position after the drag
			start: function (e, ui) {
				//console.log("start");
				$("#mainSechduleTypeContent").css("overflow", "visible");
			},
			stop: function (e, ui) {
				//console.log("end")
				$("#mainSechduleTypeContent").css("overflow", "hidden");
			}
        });

		// 주요일정 클릭시 검색 처리
		$(this).on("click", function(){

			//활성
			if(! $(this).hasClass("on")){
				$(this).addClass("on");
				$("#srchKindCd option[value='"+$(this).data('kindcd')+"']").prop("selected", true);		//검색창 > 일정종류 체크

			//비활성
			}else{
				$(this).removeClass("on");
				$("#srchKindCd option[value='"+$(this).data('kindcd')+"']").prop("selected", false);	//검색창 > 일정종류 체크
			}

			//달력에 일정종류 show/hide 적용
			eventVisible_eventType();

			$("#srchKindCd").multiselect('refresh');
			$.uniform.update();


			var _kindCd = $("#mainSechduleTypeContent .on").map(function(){
				return $(this).data("kindcd");
			}).get().join(',');

			//input 에 값 할당
			$("#frmScheduleSearch input[name='kindCd']").val(_kindCd)

			//일정 재로딩
			//$('.fullcalendar-external').fullCalendar('refetchEvents');

		})
    });
}


//달력에 일정종류 show/hide 적용
function eventVisible_eventType(){

	var onCnt = $("#mainSechduleTypeContent .on").length;	//필터링 on 되어있는 갯수

	//fc-list-item

	var viewName = $('.fullcalendar-external').fullCalendar('getView').name;
	var evtClass = "";

	if(viewName == "listMonth"){
		evtClass = ".fc-list-item"
	}else{
		evtClass = ".fc-event"
	}

	if(onCnt == 0){
		$(".fc-widget-content "+evtClass).show();
	}else{
		// 전체 숨기기
		$(".fc-widget-content "+evtClass).hide();

		//반복하며 ON 되어있는 항목 보이기
		$("#mainSechduleTypeContent .fc-event").each(function(){
			var kindCd	= $(this).data("kindcd");
			var isOn	= $(this).hasClass("on");

			if(isOn){
				$(".fc-widget-content "+evtClass+".kind_"+kindCd+"").show();
			}else{
				$(".fc-widget-content "+evtClass+".kind_"+kindCd+"").hide();
			}
		});
	}

	//일정목록인 경우 이벤트가 없는 날짜 숨김처리
	if(viewName == "listMonth"){
		$(".fc-list-heading").each(function(){
			var visibleLen = $(this).nextUntil(".fc-list-heading").filter(":visible").length

			if(visibleLen == 0){
				$(this).hide();
			}else{
				$(this).show();
			}
		});


		//데이터가 없으면 nodata 처리
		if($(".fc-list-heading").length > 0){
			var listVisibleLen = $(".fc-widget-content "+evtClass).filter(":visible").length;
			if(listVisibleLen == 0){
				var noEventsMessage = $('.fullcalendar-external').fullCalendar('getView').opt("noEventsMessage");
				$("#ListView").append('<div class="fc-list-empty-wrap2"><div class="fc-list-empty-wrap1"><div class="fc-list-empty">'+noEventsMessage+'</div></div></div>');
			}else{
				$("#ListView .fc-list-empty-wrap2").hide();
			}
		}
	}
}


// 메인페이지 주요일정 로딩
function loadMainSechduleType(){
	//#mainSechduleTypeContent
	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/schedule/json/getScheduleKind.do",
		url: "/module/usermodule/schedule/getScheduleKind",
		data: "",
		dataType: "json",
		success:function(data) {
			if(data.length == 0){
				$("#mainSechduleTypeContent").html('<span data-i18n="schedule:msg.noScheduleKind"></span>');
				$("#mainSechduleTypeContent").localize();
			}else{
				var htmlStr = ""
				for(var i=0; i < data.length; i++){
					var kindCd	= data[i].kindCd;
					var kindNm	= data[i].kindNm;
					var color	= data[i].color;
					var iconUrl	= data[i].iconUrl;

					htmlStr += "<div class='fc-event ui-draggable ui-draggable-handle' data-color='"+color+"' data-kindcd='"+kindCd+"' data-title='"+kindNm+"' data-icon='"+iconUrl+"' data-count='0'>"
					if(iconUrl != ""){
						htmlStr += "	<img src='"+iconUrl+"'>"
					}
					htmlStr += "	"+kindNm+" <span class='kindCnt'></span>"
					htmlStr += "</div>"
				}
				$("#mainSechduleTypeContent").html(htmlStr);
				initExternalEvents();


				/* ################################################## */
				/* 검색용 selectbox 초기화 */
				$("#srchKindCd").find("option").remove();
				for(var i=0; i < data.length; i++){
					$("#srchKindCd").append("<option value='"+data[i].kindCd+"'>"+data[i].kindNm+"</option>");
				}

				$('#srchKindCd').multiselect('destroy')
				$('#srchKindCd').multiselect({
					nonSelectedText: i18next.t("schedule:label.search.all"),
					selectAllText: i18next.t("multiselect.selectAllText"),
					allSelectedText: i18next.t("multiselect.allSelectedText"),
					nSelectedText: i18next.t("multiselect.nSelectedText"),
					numberDisplayed: 8,
					includeSelectAllOption: true,
					onChange: function(element, checked) {
						$.uniform.update();
					},
					onSelectAll: function(element, checked) {
						$.uniform.update();
					}
				});
				$(".styled, .multiselect-container input").uniform({ radioClass: 'choice'});
				/* //검색용 selectbox 초기화 */
				/* ################################################## */


			}

		},
		error:function(xhr,textStatus){
		}
	});
}
/*---------------------------------------------------------------------*/
/***************************** // FullCalendar *************************/
/*---------------------------------------------------------------------*/


/* 넓이에 따른 UI 컨트롤 */
var edit_eDateTime_moved = false;
function uiFixed_schedule(){
	//alert("aaaa")
	return;

	//일정 등록/수정
	var isEditOpen = ($("#modal_scheduleEdit").data('bs.modal') || {}).isShown;
	if(isEditOpen == true){

		//화면 작아지면
		if(cWidth <= 566){
			if(!edit_eDateTime_moved){
				/*----- 종료일시 부분 (종료일,시간 새로운 row로 이동) -----*/
				$("#edit_eDateTime_newCol").append($("#edit_eDateTime_wave_obj"))
				$("#edit_eDateTime_newCol").append($("#edit_eDateTime_obj"))

				//sdatetime, edatetime 커럼크기 11로 변경
				$("#edit_sDateTime_obj, #edit_eDateTime_obj").removeClass("col-md-5").removeClass("col-xs-5")
				$("#edit_sDateTime_obj, #edit_eDateTime_obj").addClass("col-md-11").addClass("col-xs-11")

				$("#edit_eDateTime_newCol").addClass("pt10");	//새로운 row에 상단10px 여백
				/*----- //종료일시 부분 -----*/


				/*----- 일정종류 추가 버튼 부분 -----*/
				$("#kindCdBtn_newCol").append($("#kindCdBtnObj"))
				$("#kindCdBtnObj").removeClass("col-md-5").removeClass("col-xs-5")
				$("#kindCdBtnObj").addClass("col-md-12").addClass("col-xs-12").addClass("control-label").addClass("pl0").addClass("pb0")
				/*----- //일정종류 추가 버튼 부분 -----*/

				edit_eDateTime_moved = true;
			}

		//화면 커지면
		}else{
			if(edit_eDateTime_moved){
				/*----- 종료일시 부분 (원래대로 시작일 옆으로 붙여서 이동) -----*/
				$("#edit_eDateTime_orgCol").append($("#edit_eDateTime_wave_obj"))
				$("#edit_eDateTime_orgCol").append($("#edit_eDateTime_obj"))

				//sdatetime, edatetime 커럼크기 5로 변경
				$("#edit_sDateTime_obj, #edit_eDateTime_obj").removeClass("col-md-11").removeClass("col-xs-11")
				$("#edit_sDateTime_obj, #edit_eDateTime_obj").addClass("col-md-5").addClass("col-xs-5")

				$("#edit_eDateTime_newCol").removeClass("pt10");	//새로운 row에 여백 제거
				/*----- //종료일시 부분 -----*/


				/*----- 일정종류 추가 버튼 부분 -----*/
				$("#kindCdBtn_orgCol").append($("#kindCdBtnObj"))
				$("#kindCdBtnObj").addClass("col-md-5").addClass("col-xs-5")
				$("#kindCdBtnObj").removeClass("col-md-12").removeClass("col-xs-12").removeClass("control-label").removeClass("pl0").removeClass("pb0")
				/*----- //일정종류 추가 버튼 부분 -----*/

				edit_eDateTime_moved = false;
			}
		}

	}

}



/* 오늘날짜 가져오기 */
function getTimeStamp() {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2);

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
/* // 오늘날짜 가져오기 */


/* 날짜계산 */
function fn_addDate(yyyymmdd, days){

	var theDate = new Date(yyyymmdd);
	theDate.setDate(theDate.getDate() + days);

    var s =
        leadingZeros(theDate.getFullYear(), 4) + '-' +
        leadingZeros(theDate.getMonth() + 1, 2) + '-' +
        leadingZeros(theDate.getDate(), 2);

	return s;
}