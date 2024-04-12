
var fildGSn = "";	 //현장 공구일련번호
var obsModalMode = "";	//OBS선택모달 모드 : 여러필드에서 OBS선택 모달 사용하므로 구분

var curPageNum = 1;

function fn_i18nextLoaded(){
	//알림등록관련
	$("#alarm_date").daterangepicker({
		autoUpdateInput: false,
		singleDatePicker: true,
		locale: datepicker_locale,
		showDropdowns: true
	});

	$("#alarm_date").on('apply.daterangepicker', function (ev, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD'));
		$(this).valid();
	});

	fn_load_workEvalList();	//목록 로딩
}

$(function(){

	i18next.loadNamespaces(["common"], function(err, t){
		//jquery 사용위해 선언
		jqueryI18next.init(i18next, $);

		$('.body').localize();				//다국어 반영

		//벨리데이션 다국어 처리
		validatorI18n();
	});

	/*
	//알림등록관련
	$("#alarm_date").daterangepicker({
		autoUpdateInput: false,
		singleDatePicker: true,
		locale: datepicker_locale,
		showDropdowns: true
	});

	$("#alarm_date").on('apply.daterangepicker', function (ev, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD'));
		$(this).valid();
	});
	*/

	valid_frmAlarm();	//알림 validation


	/* ####################################################################### */
	/* ------------------------------ LIST 관련 ------------------------------ */
	/* ----------------------------------------------------------------------- */
	//프로젝트명 변경
	$("#content_list").on("change", "#sch_gSn", function(){

		if ($(this).val() == ""){
			$(".th-project").show();
		}else{
			$(".th-project").hide();
		}
		//$( "#header" ).clone().appendTo( "#dataList_header" );

		fn_changed_gonggu($(this).val());
		fn_load_workEvalTbody(1, true);	//검색
	});

	//점검분류 변경
	$("#content_list").on("change", "#sch_FTSeqno", function(){
		fn_changed_fieldworkType($(this).val());
		fn_load_workEvalTbody(1, true);	//검색
	});

	//점검항목 변경
	$("#content_list").on("change", "#sch_FECSeqno", function(){
		fn_changed_fieldworkEvent($(this).val());
		fn_load_workEvalTbody(1, true);	//검색
	});

	//진행상태
	$("#content_list").on("change", "#sch_State", function(){
		fn_load_workEvalTbody(1, true);	//검색
	});


	//검색어, 검색시작일, 검색종료일
	$("#content_list").on("keydown", "input[name='sch_keyword'], input[name='sch_SDate'], input[name='sch_EDate']", function(e){
		if (e.keyCode == 13){
			fn_load_workEvalTbody(1, true);	//검색
		}
	});


	//검색버튼
	$("#content_list").on("click", "#btn_search", function(){
		fn_load_workEvalTbody(1, true);	//목록 다시로딩
	});


	//점검항목등록 버튼
	$("#btn_workEvalAdd").on("click", function(){

		if(company_Yn == "Y"){
			if($("#sch_gSn").val() == ""){
				alert("프로젝트를 선택하세요");
				$("#sch_gSn").focus();
				return false;
			}else{
				fildGSn = $("#sch_gSn").val();
			}
		}else{
			fildGSn = gongGuCode;	//현재 공구일련번호
		}

		fn_load_workEventEdit(""); //점검항목 등록 로딩
	});

	//엑셀다운로드 버튼 클릭

	$("#excelDown").on("click", function(){
		//console.log("클릭");
		fn_excel_workEvalTbody();
	});


	//점검항목 제목 클릭
	/*
	$("#content_list").on("click", "#table_workEvalList .eventTitle", function(){
		var sn = $(this).closest("tr").attr("sn");
		var gSn = $(this).closest("tr").attr("gSn");

		if (gSn != ""){
			fildGSn = gSn;
		}
		fn_load_workEventDetail(sn);
	});
	*/

	//점검항목 클릭
	$("#content_list").on("click", "#table_workEvalList > tbody > tr", function(event){
		var sn = $(this).attr("sn");
		var gSn = $(this).attr("gSn");

		$("#table_workEvalList tr").removeClass("selected");

		/*
		$(this).addClass("selected");
		$(this).find("tr").addClass("selected");
		*/

		if (gSn != ""){
			fildGSn = gSn;
		}
		fn_load_workEventDetail(sn);
	});

	//스크롤시 페이징 처리
	/*
	document.addEventListener('scroll', function (event) {
		console.log("scroll~~~~~~~~~~~")
		console.log(event)
		if (event.target.id === 'resizeDiv') { // or any other filtering condition

			if ($("#resizeDiv").scrollTop() >= $("#table_workEvalList").height() - $("#resizeDiv").height()-10) {
				fn_load_workEval_NextPage();	//다음페이지 호출
			}
		}
	}, true);
	*/

	//평가 버튼
	$("#content_list").on("click", ".btn_evaluation", function(event){
		event.stopPropagation();

		var Gonggu_Seqno = $(this).closest("tr").attr("gSn");
		var FESeqno = $(this).closest("tr").attr("sn");
		var EvalType = $(this).attr("evalType");

		var isEnd = $(this).closest("tr").attr("isEnd");

		//해당평가의 완료여부 체크
		if(isEnd == "0"){
			swal({
				title: "업무가 완료처리 되지 않았습니다. <br>먼저 업무를 처리해 주세요.",
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				html:true,
				type: "warning"
			});
			return false;
		}

		if (ak != "A"){
			swal({
				title: "관리자만 평가 가능합니다.",
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				html:true,
				type: "warning"
			});
			return false;
		}

		$.ajax({
			type: "POST",
			//url: "/Module/UserModule/FildWork/WorkEval/modal_evaluation.page",
			url: "/module/usermodule/fieldwork/workeval/modalevaluation",
			data:{
				"gSn" :Gonggu_Seqno,		//공구일련번호
				"FESeqno" :FESeqno,			//현장업무점검항목 일련번호
				"EvalType": EvalType		//평가구분(1:자가평가,2:관리자평가,3:발주처평가)
			},
			dataType: "html",
			success:function(data) {
				$("#modal_evaluation").html(data);
				$("#modal_evaluation").localize();
				$("#modal_evaluation").modal("show");
			}
		});
	});


	//평가기준 버튼
	$("#btn_workTypeFile").on("click", function(){

		var typeSn = "";
		var oType = null;

		//목록
		if($("#content_list").is(":visible")){

			oType = $("#sch_FTSeqno");
			//typeSn = $("#sch_FTSeqno").val();

		}else if($("#content_form").is(":visible")){
			if ($("#frmWorkEventEdit").length > 0){
				oType = $("#frmWorkEventEdit select[name='FTSeqno']");

			}else if($("#frmWorkEventDetail").length > 0){
				oType = $("#frmWorkEventDetail input[name='FTSeqno']");
			}
		}

		if (oType != null && oType != undefined){
			typeSn = oType.val();
		}

		if (typeSn == "" || typeSn == undefined){
			swal({
				title: "업무분류를 선택해주세요",
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				type: "warning"
			});
			//oType.focus();
			return false;
		}else{

			$.ajax({
				type: "POST",
				//url: "/Module/UserModule/FildWork/WorkEval/modal_workTypeFileList.page",
				url: "/module/usermodule/fieldwork/workeval/modalworktypefilelist",
				data:{
					"typeSn" :typeSn	//점검분류 일련번호
				},
				dataType: "html",
				success:function(data) {
					$("#modal_workTypeFileList").html(data);
					$("#modal_workTypeFileList").localize();
					$("#modal_workTypeFileList").modal("show");
				}
			});


		}
	});

	/* ----------------------------------------------------------------------- */
	/* ----------------------------- //LIST 관련 ----------------------------- */
	/* ####################################################################### */



	/* ####################################################################### */
	/* ----------------------- 점검항목 등록/수정 관련 ----------------------- */
	/* ----------------------------------------------------------------------- */
	$("#content_form").on("change", "#frmWorkEventEdit select[name='FTSeqno']", function(){
		var FTSeqno = $(this).val();

		//1.점검항목 재로딩
		$("#frmWorkEventEdit select[name='FECSeqno'] option:not(:eq(0))").remove();	//점검항목 초기화
		if(FTSeqno > ""){
			$.ajax({
				type :'post'
				//, url: "/Module/UserModule/FildWork/WorkEval/getFieldworkEventConfig.do"
				, url: "/module/usermodule/fieldwork/workeval/getfieldworkeventconfig"
				, data : {
					"FTSeqno" : FTSeqno
				}
				, dataType:"json"
				, success:function( json ){
					for(var i=0; i < json.data.length; i++){
						var val		= json.data[i][0];
						var text	= json.data[i][1];
						var dueday	= json.data[i][2];

						var option = $("<option value='"+val+"' dueday='"+dueday+"'>"+text+"</option>");
						$("#frmWorkEventEdit select[name='FECSeqno']").append(option);
					}

				 }
			});
		}
	});

	//점검항목 선택시
	$("#content_form").on("change", "#frmWorkEventEdit select[name='FECSeqno']", function(){

		//처리기한 가져오기
		var dueday = $(this).find("option:selected").attr("dueday");
		if (dueday == undefined){
			dueday = ""
		}

		if (dueday != "" && dueday != "0"){
			dueday = parseInt(dueday) - 1;
		}

		//$("#frmWorkEventEdit input[name='dueday']").val(dueday);	//처리기한

		var startDt = moment().format("YYYY-MM-DD");
		var endDueDt = moment(startDt).add(dueday, "days").format("YYYY-MM-DD");

		//console.log("startDt : " + startDt)

		$("#frmWorkEventEdit input[name='startDt']").val(startDt);
		$("#frmWorkEventEdit input[name='endDueDt']").val(endDueDt);

		fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산

		/*
		var startDt = $("#frmWorkEventEdit input[name='startDt']").val();	//발생일자
		var endDueDt = $("#frmWorkEventEdit input[name='endDueDt']").val();	//처리기한일
		*/
	});

	//열람권한 추가버튼
	$("#content_form").on("click", "#frmWorkEventEdit .btn_addAuth", function(){
		obsModalMode = "addAuth";
		var arrObs = $("#frmWorkEventEdit input[name='authUserObsCode']").val().split(",");
		fn_openObsSelect(arrObs);
	});

	//업무협업인원 추가버튼
	$("#content_form").on("click", "#frmWorkEventEdit .btn_addRelation", function(){
		obsModalMode = "addRelation";
		var arrObs = $("#frmWorkEventEdit input[name='relationUserCode']").val().split(",")
		fn_openUserSelect(arrObs);
	});

	//분류체계 추가
	$("#content_form").on("click", "#frmWorkEventEdit .btn_addItemClass", function(){

		var strFolderSn = $("#frmWorkEventEdit input[name='docFolderSn']").map(function() {
			return $(this).val();
		}).get().join();

		$.ajax({
			type: "POST",
			//url: "/Module/UserModule/PDS/modal_folderSelect.page",
			url: "/module/usermodule/pds/modalFolderSelect",
			data:{
				"GongGuCode" : fildGSn,
				"folderSn" : strFolderSn	//기존Sn
			},
			dataType: "html",
			success:function(data) {
				$("#modal_folderSelect").html(data);
				$("#modal_folderSelect").localize();
				$("#modal_folderSelect").modal("show");
			}
		});
	});

	//문서분류 삭제버튼
	$("#content_form").on("click", ".btn_delDocClass", function(){
		var oTable = $(this).closest("table");
		$(this).closest("tr").remove();
	});

	//목록버튼
	$("#content_form").on("click", ".btn_list" , function(){
		fn_load_workEvalTbody(1, true);	//tbody 부분만 재로딩
		fn_resize_list();
	});

	//삭제버튼
	$("#content_form").on("click", "#frmWorkEventDetail .btn_delete" , function(){
		swal({
			title: i18next.t("msg.delYn"),
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#EF5350",
			confirmButtonText: i18next.t("btn.ok"),
			cancelButtonText: i18next.t("btn.cancel"),
			closeOnConfirm: false,
			closeOnCancel: true
		},function(isConfirm){
			if(isConfirm){

				var sn = $("#frmWorkEventDetail input[name='sn']").val();
				$("#frmWorkEventDetail input[name='dmlType']").val("del");


				$.ajax({
					type: "POST",
					//url: "/Module/UserModule/FildWork/WorkEval/workEventEditDml.do",
					  url: "/module/usermodule/fieldwork/workeval/workeventeditdml",
					data: {
						"dmlType" : "del",
						"sn" : sn,
						"ssid" : $("#gssid").val()
					},
					dataType: "json",
					success:function(data) {

						if(data.result == "success"){
							swal({
								title: i18next.t("msg.delOk"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

							//목록재로딩
							fn_load_workEvalTbody(1, true);
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
		});

	});

	//수정버튼
	$("#content_form").on("click", ".btn_modify" , function(){
		var sn = $("#frmWorkEventDetail input[name='sn']").val();
		fn_load_workEventEdit(sn);
	});

	//취소버튼
	$("#content_form").on("click", "#frmWorkEventEdit .btn_cancel" , function(){
		var sn = $("#frmWorkEventEdit input[name='sn']").val();
		if (sn == ""){
			$("#content_list").show();
			$("#li_excelDown").show();
			$("#content_form").hide();
		}else{
			fn_load_workEventDetail(sn);
		}
		$("#btn_workEvalAdd").show();   //업무등록버튼 보임
	});
	/* ----------------------------------------------------------------------- */
	/* ---------------------- //점검항목 등록/수정 관련 ---------------------- */
	/* ####################################################################### */


	/* ####################################################################### */
	/* ---------------------------- 후속조치작업 ----------------------------- */
	/* ----------------------------------------------------------------------- */
	//추가버튼
	$("#content_form").on("click", ".btn_addWorkActon", function(){
		var actionConfigSn = $("#div_workActionList select[name='select_actionConfig'] option:selected").map(function(){
			return $(this).val();
		}).get().join();

		var FESeqno = $("#frmWorkEventDetail input[name='sn']").val();

		$.ajax({
			type :'post'
			//, url: "/Module/UserModule/FildWork/WorkEval/workActionDml.do"
			, url: "/module/usermodule/fieldwork/workeval/workactiondml"
			, data : {
				"FESeqno" : FESeqno,
				"FACSeqno" : actionConfigSn,	//'후속액션 환경설정 일련번호
				"GongGuCode" : $("#frmWorkEventDetail input[name='GongGuCode']").val(),
				"ssid" : $("#gssid").val(),
				"dmlType" : "add"
			}
			, dataType:"json"
			, success:function( data ){
				if(data.result == "success"){
					swal({
						title: i18next.t("msg.saveOk"),
						showConfirmButton: false,
						type: "success",
						timer: 1000
					});

					$("#div_workActionList select[name='select_actionConfig'] option:selected").remove();	//추가한 옵션 삭제

					fn_load_workActionListBody(FESeqno)	//후속조치작업 목록 Tbody 로딩

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
	});

	//후속조치작업 목록 선택
	$(".content").on("click", ".link_fieldAction", function(){
		var sn = $(this).attr("sn");
		fn_load_modal_workActionEdit(sn);	//후속조치작업 등록/수정 모달 로딩
	});

	//후속작업 클릭
	$("#content_list").on("click", ".list_actionInfoTable > tbody> tr", function(event){
		$("#table_workEvalList tr").removeClass("selected");

		event.stopPropagation();
		var sn = $(this).attr("sn");
		fn_load_modal_workActionEdit(sn);	//후속조치작업 등록/수정 모달 로딩

		$(this).closest("table").find("tr[sn='"+sn+"']").addClass("selected");
	});


	//열람권한 추가버튼
	$("#modal_workEventEdit").on("click", ".btn_addAuth", function(){
		obsModalMode = "addAuth";
		var arrObs = $("#frmWorkActionEdit input[name='authUserObsCode']").val().split(",");
		fn_openObsSelect(arrObs);
	});

	//업무협업인원 추가버튼
	$("#modal_workEventEdit").on("click", ".btn_addRelation", function(){
		obsModalMode = "addRelation";
		var arrObs = $("#frmWorkActionEdit input[name='relationUserCode']").val().split(",")
		fn_openUserSelect(arrObs);
	});

	//분류체계 추가
	$("#modal_workEventEdit").on("click", ".btn_addItemClass", function(){

		var strFolderSn = $("#modal_workEventEdit input[name='docFolderSn']").map(function() {
			return $(this).val();
		}).get().join();

		$.ajax({
			type: "POST",
			//url: "/Module/UserModule/PDS/modal_folderSelect.page",
			url: "/module/usermodule/pds/modalFolderSelect",
			data:{
				"GongGuCode" : fildGSn,
				"folderSn" : strFolderSn	//기존Sn
			},
			dataType: "html",
			success:function(data) {
				$("#modal_folderSelect").html(data);
				$("#modal_folderSelect").localize();
				$("#modal_folderSelect").modal("show");
			}
		});
	});


	//문서분류 삭제버튼
	$("#modal_workEventEdit").on("click", ".btn_delDocClass", function(){
		var oTable = $(this).closest("table");
		$(this).closest("tr").remove();
	});

	//후속조치작업 목록 정렬
	$("#content_form").on("change", "#table_workActonList input[name='sort']", function(){
		var srot = $(this).val();
		var sn = $(this).attr("sn");

		$.ajax({
			type: "POST",
			//url: "/Module/UserModule/FildWork/WorkEval/workActionDml.do",
			url: "/module/usermodule/fieldwork/workeval/workactiondml",
			data:{
				"sort" : srot,
				"sn" : sn,
				"dmlType" : "sort",
				"ssid" : $("#gssid").val(),
			},
			dataType: "json",
			success:function(data) {
				if(data.result == "success"){
					//후속조치작업 목록 Tbody 로딩
					var FESeqno = $("#frmWorkEventDetail input[name='sn']").val();
					fn_load_workActionListBody(FESeqno);
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
	});

	//후속조치작업 삭제버튼
	$("#content_form").on("click", "#table_workActonList .btn_delete", function(){
		var sn = $(this).attr("sn");

		swal({
			title: i18next.t("msg.delYn"),
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#EF5350",
			confirmButtonText: i18next.t("btn.ok"),
			cancelButtonText: i18next.t("btn.cancel"),
			closeOnConfirm: true,
			closeOnCancel: true
		},function(isConfirm){
			if(isConfirm){

				$.ajax({
					type: "POST",
					//url: "/Module/UserModule/FildWork/WorkEval/workActionDml.do",
					url: "/module/usermodule/fieldwork/workeval/workactiondml",
					data: {
						"dmlType" : "del",
						"sn" : sn,
						"ssid" : $("#gssid").val()
					},
					dataType: "json",
					success:function(data) {

						if(data.result == "success"){
							swal({
								title: i18next.t("msg.delOk"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});


							//후속조치작업 목록 로딩
							fn_load_workActionList($("#frmWorkEventDetail input[name='sn']").val());

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
		});

	});
	/* ----------------------------------------------------------------------- */
	/* --------------------------- //후속조치작업 ---------------------------- */
	/* ####################################################################### */


	/* ####################################################################### */
	/* ------------------------------ 알람 관련 ------------------------------ */
	/* ----------------------------------------------------------------------- */
	//알림 저장
	$("#btn_alarmSave").on("click", function(){

		//알림일이 처리기한일 이후인지 체크

	    //"알람일이 처리기한일 이후입니다. 그래도 등록하시겠습니까?"

		var limitDt = "";
		if ($("#modal_workEventEdit").is(":visible")){
			//후속작업
			limitDt = $("#frmWorkActionEdit input[name='endPlanDt']").val();
		}else{
			//점검항목
			limitDt = $("#frmWorkEventEdit input[name='endDueDt']").val();
		}


		if($("#alarm_date").valid() && $("#alarm_contents").valid()){
			var yyyymmddhhmi = ($("#alarm_date").val()).replace(/-/gi, ".") + " " + $("#alarm_hh").val() + ":" + $("#alarm_mi").val();

			var msgType = $.map($('#frmAlarm :checkbox[name=msgType]:checked'), function(n, i){
				  return n.value;
			}).join(',');

			var html = "";
			html += "<li>"
			html += "	"+yyyymmddhhmi
			html += "	<i class='icon-cross2 btn-defalut btn_deleteAlarm cursor-pointer'></i>"
			html += "	<i class='icon-pencil3 btn-defalut btn_editAlarm cursor-pointer'></i>"
			html += "	<input type='hidden' name='alarm_date' value='" + $("#alarm_date").val() + "'>"
			html += "	<input type='hidden' name='alarm_hh' value='" + $("#alarm_hh").val() + "'>"
			html += "	<input type='hidden' name='alarm_mi' value='" + $("#alarm_mi").val() + "'>"
			html += "	<input type='hidden' name='alarm_contents' value='" + $("#alarm_contents").val() + "'>"
			html += "	<input type='hidden' name='alarm_msgType' value='"+msgType+"'> "
			html += "</li>"

			//알림일시가 처리기한일 보다 크면 confirm 으로 물어본다.
			if (limitDt < $("#alarm_date").val()){
				swal({
					title: "알람일이 처리기한일 이후입니다. <br>그래도 등록하시겠습니까?",
					type: "warning",
					html:true,
					showCancelButton: true,
					confirmButtonColor: "#EF5350",
					confirmButtonText: i18next.t("btn.ok"),
					cancelButtonText: i18next.t("btn.cancel"),
					closeOnConfirm: true,
					closeOnCancel: true,
					html:true
				},function(isConfirm){
					if(isConfirm){
						fn_alarmAdd_return(html);
						$("#modal_alarm").modal("hide");
					}
				});


			}else{
				fn_alarmAdd_return(html);
				$("#modal_alarm").modal("hide");
			}
		}
	});

	//알림 삭제
	$(".content, #modal_workEventEdit").on("click", ".btn_deleteAlarm", function(){
		$(this).closest("li").remove();
	});

	//알림 수정
	$(".content, #modal_workEventEdit").on("click", ".btn_editAlarm", function(){
		var oLi = $(this).closest("li");

		$("#frmAlarm input[name='cmd']").val("edit");
		$("#frmAlarm input[name='idx']").val(oLi.index());

		$("#alarm_date").val($(oLi).find("input[name='alarm_date']").val());
		$("#alarm_hh").val($(oLi).find("input[name='alarm_hh']").val());
		$("#alarm_mi").val($(oLi).find("input[name='alarm_mi']").val());
		$("#alarm_contents").val($(oLi).find("input[name='alarm_contents']").val());

		var msgType =  $(oLi).find("input[name='alarm_msgType']").val();
		$.each($('#frmAlarm :checkbox[name=msgType]'), function(n, i){
			if( msgType.indexOf($(this).val()) >= 0 ){
				$(this).prop("checked", true);
			}else{
				$(this).prop("checked", false);
			}
		})

		$("#modal_alarm").localize();
		$("#modal_alarm").modal("show")

	});

	//알림추가
	$(".content, #modal_workEventEdit").on("click", ".btn_addAlarm", function(){
		$("#frmAlarm input[name='cmd']").val("add");
		$("#frmAlarm input[name='idx']").val("");

		var defaultDate = "";
		if ($("#modal_workEventEdit").is(":visible")){
			//후속작업
			defaultDate = $("#frmWorkActionEdit input[name='endPlanDt']").val();
			title = $("#frmWorkActionEdit input[name='title']").val();
		}else{
			//점검항목
			defaultDate = $("#frmWorkEventEdit input[name='endDueDt']").val();
			title = $("#frmWorkEventEdit input[name='title']").val();
		}

		var defaultContents = title + "의 완료예정일 입니다. 잊지 마시고 처리하시기 바랍니다.";

		$("#alarm_date").val(defaultDate);
		$("#alarm_hh").val("09");
		$("#alarm_mi").val("00");
		$("#alarm_contents").val(defaultContents);

		$('#frmAlarm input:checkbox[name=msgType]').prop("checked", true);	//알림방법 디폴트 전체선택

		validator_frmAlarm.resetForm();

		$("#modal_alarm").modal("show");
	});
	/* ####################################################################### */
	/* ----------------------------- //알람 관련 ----------------------------- */
	/* ----------------------------------------------------------------------- */


	/* ####################################################################### */
	/* ------------------------------ 평가 관련 ------------------------------ */
	/* ----------------------------------------------------------------------- */
	//이벤트상세 > 평가내용 수정버튼
	$("#content_form").on("click", ".btn_evaluation_edit", function(){
		var objBtn = $(this);

		$.ajax({
			type: "POST",
			//url: "/Module/UserModule/FildWork/WorkEval/modal_evaluationDml.do",
			url: "/module/usermodule/fieldwork/workeval/modalevaluationdml",
			data: {
				"dmlType" : "modify_contents",
				"ssid" : $("#gssid").val(),
				"sn" : $(objBtn).attr("sn"),
				"evalComment" : $(objBtn).closest(".form-group").find("textarea[name='evalComment']").val()
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
	})
	/* ####################################################################### */
	/* ----------------------------- //평가 관련 ----------------------------- */
	/* ----------------------------------------------------------------------- */
});




/*#############################################################################################################*/
/* ----------------------------------------------- LIST 관련 ------------------------------------------------- */
/*-------------------------------------------------------------------------------------------------------------*/
//목록 로딩
function fn_load_workEvalList(){
	$("#content_form").hide();
	$("#content_list").show();
	$("#li_excelDown").show();

	$.ajax({
		type :'post'
		//, async : false
		//, url: "/Module/UserModule/FildWork/WorkEval/workEvalList.page"
		, url: "/module/usermodule/fieldwork/workeval/workevallist"
		, data : {}
		, dataType:"html"
		, success:function( data ){
			$("#content_list").html(data);

			if (main_Seqno != ""){
				//상세로 이동
				fn_load_workEventDetail(main_Seqno);
			}
		 }
	});
}

//목록 로딩
function fn_load_workEvalTbody(pageNo, showListYn){

	//상세검색 인경우만 체크
	if ($("#searchDetailSwitch").is(":checked")){
		//날자시작일 종료일 유효성 체크
		var sDate = $("#frmEvalList input[name='sch_SDate']").val();
		var eDate = $("#frmEvalList input[name='sch_EDate']").val();

		if (sDate != "" && eDate != "" &&  moment(sDate).diff(moment(eDate), "days") > 0){
			swal({
				title: "종료일은 시작일 보다 크거나 같아야 합니다.",
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				html:true,
				type: "warning"
			}, function(){
				//$("#frmEvalList input[name='sch_EDate']").val(sDate);
				setTimeout(function(){
					$("#frmEvalList input[name='sch_EDate']").focus()
				}, 200);
			});
			return false;
		}
	}


	if (showListYn){
		$("#content_list").show();
		$("#li_excelDown").show();
		$("#content_form").hide();
	}

	if (pageNo == 1){
		$("#table_workEvalList tbody").html("");
		$("#resizeDiv").scrollTop(0);
	}



	var data = $("#frmEvalList").serialize();
	data += "&pnum="+pageNo
	data += "&searchDetailSwitch=" + $("#searchDetailSwitch").is(":checked")

	$.ajax({
		type :'post'
		, async : false
		//, url: "/Module/UserModule/FildWork/WorkEval/getWorkEvalList.do"
		, url: "/module/usermodule/fieldwork/workeval/getworkevallist"
		, data : data
		, dataType:"html"
		, success:function( data ){
			$("#table_workEvalList > tbody").append(data);

			//담당자명 툴팁
			fn_tooltip_RelationUser();

		 }
	});

	curPageNum = pageNo;
}

//엑셀다운로드
function fn_excel_workEvalTbody(){

	var data = $("#frmEvalList").serialize();
	data += "&pnum=1";
	data += "&searchDetailSwitch=" + $("#searchDetailSwitch").is(":checked");
	$("#frmEvalList").attr("target","excelDownloadFrame");
	$("#frmEvalList").attr("action","/module/usermodule/fieldwork/workeval/getworkevallistexcel").submit();
//	$("#frmEvalList").attr("action","/Module/UserModule/FildWork/WorkEval/getWorkEvalListExcel.page").submit();
//	$("#excelDownloadFrame")[0].location="/Module/UserModule/FildWork/WorkEval/getWorkEvalListExcel.page?"+data;
}

//다음페이지 로딩
function fn_load_workEval_NextPage(){
	fn_load_workEvalTbody(curPageNum+1, true);
}

//공구명 변경시
function fn_changed_gonggu(gSn){

	//1.점검분류 재로딩
	$("#sch_FTSeqno option:not(:eq(0))").remove();	//점검분류 초기화
	if(gSn > ""){
		$.ajax({
			type :'post'
			//, url: "/Module/UserModule/FildWork/WorkEval/getFieldworkType.do"
			, url: "/module/usermodule/fieldwork/workeval/getfieldworktype"
			, data : {
				"gSn" : gSn
			}
			, dataType:"json"
			, success:function( json ){
				//console.log(json);
				for(var i=0; i < json.data.length; i++){
					//console.log("1번째 컬럼 : " + json.data[i][0]);
					//console.log("2번째 컬럼 : " + json.data[i][1]);
					var option = $("<option value='"+json.data[i][0]+"'>"+json.data[i][1]+"</option>");
					$('#sch_FTSeqno').append(option);
				}

			 }
		});
	}

	//2.점검항목 초기화
	$("#sch_FECSeqno option:not(:eq(0))").remove();

	//3.후속작업 초기화
	$("#sch_FACSeqno option:not(:eq(0))").remove();
}

//점검분류 변경시
function fn_changed_fieldworkType(FTSeqno){

	//1.점검항목 재로딩
	$("#sch_FECSeqno option:not(:eq(0))").remove();	//점검항목 초기화
	if(FTSeqno > ""){
		$.ajax({
			type :'post'
			//, url: "/Module/UserModule/FildWork/WorkEval/getFieldworkEventConfig.do"
			, url: "/module/usermodule/fieldwork/workeval/getfieldworkeventconfig"
			, data : {
				"FTSeqno" : FTSeqno
			}
			, dataType:"json"
			, success:function( json ){
				for(var i=0; i < json.data.length; i++){
					var option = $("<option value='"+json.data[i][0]+"'>"+json.data[i][1]+"</option>");
					$('#sch_FECSeqno').append(option);
				}

			 }
		});
	}

	//2.후속작업 초기화
	$("#sch_FACSeqno option:not(:eq(0))").remove();
}

//점검항목 변경시
function fn_changed_fieldworkEvent(FECSeqno){

	//1.후속작업 재로딩
	$("#sch_FACSeqno option:not(:eq(0))").remove();	//후속작업 초기화
	if(FECSeqno > ""){
		$.ajax({
			type :'post'
			//, url: "/Module/UserModule/FildWork/WorkEval/getFieldworkActionConfig.do"
			, url: "/module/usermodule/fieldwork/workeval/getfieldworkactionconfig"
			, data : {
				"FECSeqno" : FECSeqno
			}
			, dataType:"json"
			, success:function( json ){
				for(var i=0; i < json.data.length; i++){
					var option = $("<option value='"+json.data[i][0]+"'>"+json.data[i][1]+"</option>");
					$('#sch_FACSeqno').append(option);
				}

			 }
		});
	}
}
/*-------------------------------------------------------------------------------------------------------------*/
/* ----------------------------------------------- //LIST 관련 ----------------------------------------------- */
/*#############################################################################################################*/


/*#############################################################################################################*/
/* -------------------------------------- 점검항목 등록/수정/상세 관련 --------------------------------------- */
/*-------------------------------------------------------------------------------------------------------------*/
//점검항목 등록/수정
function fn_load_workEventEdit(sn){

	$("#content_list").hide();		//목록 숨김
	$("#li_excelDown").hide();		//엑셀다운 숨김
	$("#btn_workEvalAdd").hide();   //업무등록버튼 숨김

	$("#content_form").show();

	//등록인 경우 업무분류, 엄무항목 선택값을 넘겨준다.
	var FTSeqno = "";
	var FECSeqno = "";
	if (sn == ""){
		FTSeqno = $("#frmEvalList select[name='sch_FTSeqno']").val();
		FECSeqno = $("#frmEvalList select[name='sch_FECSeqno']").val();
	}

	$.ajax({
		type :'post'
		//, async : false
		//, url: "/Module/UserModule/FildWork/WorkEval/workEventEdit.page"
		, url: "/module/usermodule/fieldwork/workeval/workeventedit"
		, data : {
			"gSn" : fildGSn,
			"sn" : sn,
			"FTSeqno" : FTSeqno,
			"FECSeqno" : FECSeqno
		}
		, dataType:"html"
		, success:function( data ){
			$("#content_form").html(data).localize();

			//init daterangepicker
			$("#frmWorkEventEdit input[name='startDt'], #frmWorkEventEdit input[name='endDueDt'], #frmWorkEventEdit input[name='endDt']").daterangepicker({
				autoUpdateInput: false,
				singleDatePicker: true,
				locale: datepicker_locale,
				showDropdowns: true
			});

			/*$("#frmWorkEventEdit input[name='startDt'], #frmWorkEventEdit input[name='endDueDt'], #frmWorkEventEdit input[name='endDt']").formatter({
				pattern: '{{9999}}-{{99}}-{{99}}'
			});*/


			$("#frmWorkEventEdit input[name='startDt'], #frmWorkEventEdit input[name='endDueDt'], #frmWorkEventEdit input[name='endDt']").focus( function(){
				oldDateRemember = $(this).val();
				//console.log("focus_oldDateRemember="+oldDateRemember);
			}).change(function(){
				var myThis = $(this);
				var oldVal = myThis.val();
				if (!isDate2(myThis.val()) && myThis.val() !="")
				{
					swal({
						title: "날자형식이 아닙니다.<br>확인하고 다시 입력해 주세요.",
						confirmButtonColor: "#f44336",
						closeOnConfirm: true,
						html:true,
						type: "warning"
					}, function(){
						setTimeout(function(){
							//console.log("change_oldDateRemember="+oldDateRemember);
							myThis.val(oldDateRemember);
							$("#frmWorkEventEdit input[name='startDt'], #frmWorkEventEdit input[name='endDueDt'], #frmWorkEventEdit input[name='endDt']").trigger( "blur");
							oldDateRemember=myThis.val();
							//console.log("blur_oldDateRemember="+oldDateRemember);
							myThis.focus();
						}, 200)
					});
				}
			});


			$("#frmWorkEventEdit input[name='startDt'], #frmWorkEventEdit input[name='endDueDt'], #frmWorkEventEdit input[name='endDt']").on('apply.daterangepicker', function (ev, picker) {
				/*
				$(this).val(picker.startDate.format('YYYY-MM-DD'));
				*/
				var evItem = ev.delegateTarget.name;
				var evDate = picker.startDate.format('YYYY-MM-DD');
				var oldDate = ev.delegateTarget.value;
				var trDate = "";
				var trDate2 = "";
				var today = getTodayDate();
				myThis = $(this);

				if (evItem == "endDt")
				{
					/*
					myThis.val(picker.startDate.format('YYYY-MM-DD'));
					myThis.valid();
					*/
					trDate = $("#frmWorkEventEdit input[name='startDt']").val();
					trDate2 = $("#frmWorkEventEdit input[name='endDueDt']").val();
					if ((trDate2 == "" || trDate2 == undefined || trDate2 == null) || (evDate <= trDate2))
					{
						//console.log("trDate2="+trDate2+",evDate="+evDate);
						if (trDate == "" || trDate == undefined || trDate == null)
						{
							myThis.val(evDate);
							myThis.valid();
							fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
							fn_event_calcDate_workDay();	//실처리일 자동계산
						}
						else
						{
							if (evDate < trDate)
							{
								swal({
									title: "처리기한일은 발생일보다 작을 수 없습니다.<br>확인하고 다시 입력해 주세요.",
									confirmButtonColor: "#f44336",
									closeOnConfirm: true,
									html:true,
									type: "warning"
								}, function(){
									setTimeout(function(){
										if (oldDate == "" || oldDate == undefined || oldDate == null)
										{
											//console.log("oldDate="+oldDate);
											if (today < trDate )
											{
												myThis.val(trDate);
												myThis.valid();
												$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setStartDate(trDate);
												$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setEndDate(trDate);

												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
												fn_event_calcDate_workDay();	//실처리일 자동계산

											}
											else
											{
												myThis.val(today);
												myThis.valid();
												$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setStartDate(today);
												$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setEndDate(today);
												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
												fn_event_calcDate_workDay();	//실처리일 자동계산
											}
										}
										else
										{
											myThis.val(oldDate);
											myThis.valid();
												$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setStartDate(oldDate);
												$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setEndDate(oldDate);
													fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
													fn_event_calcDate_workDay();	//실처리일 자동계산
										}
										$("#frmWorkEventEdit input[name='endDt']").focus();
									}, 200);
								});
							}
							else
							{
								myThis.val(evDate);
								myThis.valid();
								fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
								fn_event_calcDate_workDay();	//실처리일 자동계산
							}
						}
					}
					else
					{
						//console.log("trDate2="+trDate2);

						swal({
							title: "처리완료일이 처리기한일 이후의 날짜 입니다.\n이대로 입력을 진행 하시겠습니까?.",
							type: "warning",
							showCancelButton: true,
							confirmButtonColor: "#EF5350",
							confirmButtonText: "확인",
							cancelButtonText: "취소",
							closeOnConfirm: true,
							closeOnCancel: true
						},function(isConfirm){
							if(isConfirm){
								myThis.val(evDate);
								myThis.valid();
								fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
								fn_event_calcDate_workDay();	//실처리일 자동계산
							}
							else
							{
								setTimeout(function(){
									if (oldDate == "" || oldDate == undefined || oldDate == null)
									{
										//console.log("oldDate="+oldDate);
										if (today < trDate2 )
										{
											myThis.val(trDate2);
											myThis.valid();
											$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setStartDate(trDate2);
											$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setEndDate(trDate2);

											fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
											fn_event_calcDate_workDay();	//실처리일 자동계산

										}
										else
										{
											myThis.val(today);
											myThis.valid();
											$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setStartDate(today);
											$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setEndDate(today);
											fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
											fn_event_calcDate_workDay();	//실처리일 자동계산
										}
									}
									else
									{
										myThis.val(oldDate);
										myThis.valid();
											$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setStartDate(oldDate);
											$('#frmWorkEventEdit input[name="endDt"]').data('daterangepicker').setEndDate(oldDate);
												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
												fn_event_calcDate_workDay();	//실처리일 자동계산
									}
									$("#frmWorkEventEdit input[name='endDt']").focus();
								}, 200);

							}

						});
					}
				}
				else
				{
					if (evItem == "startDt")
					{
						var act1 = false;
						trDate = $("#frmWorkEventEdit input[name='endDueDt']").val();
						trDate2 = $("#frmWorkEventEdit input[name='endDt']").val();
						if (trDate == "" || trDate == undefined || trDate == null)
						{
							myThis.val(evDate);
							myThis.valid();
							fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
							fn_event_calcDate_workDay();	//실처리일 자동계산
							act1= true;
						}
						else
						{
							if (evDate > trDate)
							{
								swal({
									title: "발생일은 처리기한일보다 클 수 없습니다.<br>확인하고 다시 입력해 주세요.",
									confirmButtonColor: "#f44336",
									closeOnConfirm: true,
									html:true,
									type: "warning"
								}, function(){
									setTimeout(function(){
										if (oldDate == "" || oldDate == undefined || oldDate == null)
										{
											if (today >trDate )
											{
												myThis.val(trDate);
												myThis.valid();
												$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setStartDate(trDate);
												$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setEndDate(trDate);
												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
												fn_event_calcDate_workDay();	//실처리일 자동계산
											}
											else
											{
												myThis.val(today);
												myThis.valid();
												$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setStartDate(today);
												$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setEndDate(today);
												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
												fn_event_calcDate_workDay();	//실처리일 자동계산
											}
										}
										else
										{
											myThis.val(oldDate);
											myThis.valid();
											$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setStartDate(oldDate);
											$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setEndDate(oldDate);
											fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
											fn_event_calcDate_workDay();	//실처리일 자동계산
										}
										$("#frmWorkEventEdit input[name='startDt']").focus();
									}, 200)
								});
							}
							else
							{
								myThis.val(evDate);
								myThis.valid();
								fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
								fn_event_calcDate_workDay();	//실처리일 자동계산
								act1= true;
							}

						}

						if ((trDate2 == "" || trDate2 == undefined || trDate2 == null) || (!act1))
						{
							myThis.val(evDate);
							myThis.valid();
							fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
							fn_event_calcDate_workDay();	//실처리일 자동계산
						}
						else
						{
							if (evDate > trDate2)
							{
								swal({
									title: "발생일은 처리완료일보다 클 수 없습니다.<br>확인하고 다시 입력해 주세요.",
									confirmButtonColor: "#f44336",
									closeOnConfirm: true,
									html:true,
									type: "warning"
								}, function(){
									setTimeout(function(){
										if (oldDate == "" || oldDate == undefined || oldDate == null)
										{
											if (today >trDate2 )
											{
												myThis.val(trDate2);
												myThis.valid();
												$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setStartDate(trDate2);
												$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setEndDate(trDate2);
												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
												fn_event_calcDate_workDay();	//실처리일 자동계산
											}
											else
											{
												myThis.val(today);
												myThis.valid();
												$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setStartDate(today);
												$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setEndDate(today);
												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
												fn_event_calcDate_workDay();	//실처리일 자동계산
											}
										}
										else
										{
											myThis.val(oldDate);
											myThis.valid();
											$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setStartDate(oldDate);
											$('#frmWorkEventEdit input[name="startDt"]').data('daterangepicker').setEndDate(oldDate);
											fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
											fn_event_calcDate_workDay();	//실처리일 자동계산
										}
										$("#frmWorkEventEdit input[name='startDt']").focus();
									}, 200)
								});
							}
							else
							{
								myThis.val(evDate);
								myThis.valid();
								fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
								fn_event_calcDate_workDay();	//실처리일 자동계산
							}
						}
					}
					else
					{
						trDate = $("#frmWorkEventEdit input[name='startDt']").val();
						if (trDate == "" || trDate == undefined || trDate == null)
						{
							myThis.val(evDate);
							myThis.valid();
							fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
						}
						else
						{
							if (evDate < trDate)
							{
								swal({
									title: "처리기한일은 발생일보다 작을 수 없습니다.<br>확인하고 다시 입력해 주세요.",
									confirmButtonColor: "#f44336",
									closeOnConfirm: true,
									html:true,
									type: "warning"
								}, function(){
									setTimeout(function(){
										if (oldDate == "" || oldDate == undefined || oldDate == null)
										{
											//console.log("oldDate="+oldDate);
											if (today < trDate )
											{
												myThis.val(trDate);
												myThis.valid();
												$('#frmWorkEventEdit input[name="endDueDt"]').data('daterangepicker').setStartDate(trDate);
												$('#frmWorkEventEdit input[name="endDueDt"]').data('daterangepicker').setEndDate(trDate);
												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
											}
											else
											{
												myThis.val(today);
												myThis.valid();
												$('#frmWorkEventEdit input[name="endDueDt"]').data('daterangepicker').setStartDate(today);
												$('#frmWorkEventEdit input[name="endDueDt"]').data('daterangepicker').setEndDate(today);
												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
											}
										}
										else
										{
											myThis.val(oldDate);
											myThis.valid();
												$('#frmWorkEventEdit input[name="endDueDt"]').data('daterangepicker').setStartDate(oldDate);
												$('#frmWorkEventEdit input[name="endDueDt"]').data('daterangepicker').setEndDate(oldDate);
												fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
										}
										$("#frmWorkEventEdit input[name='endDueDt']").focus();
									}, 200)
								});
							}
							else
							{
								myThis.val(evDate);
								myThis.valid();
								fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
							}
						}
					}
				}




			});

			//발생일자 변경시
			$("#frmWorkEventEdit input[name='startDt']").on("change", function(){
				fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
				fn_event_calcDate_workDay();	//실처리일 자동계산
			});

			//처리완료일 변경시
			$("#frmWorkEventEdit input[name='endDt']").on("change", function(){
				fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
				fn_event_calcDate_workDay();	//실처리일 자동계산
			});

			//처리기한 변경시
			$("#frmWorkEventEdit input[name='endDueDt']").on("change", function(){
				fn_event_calcDate_endDueDt();	//처리기한일, 남은기일 자동계산
			});

			valid_frmWorkEventEdit();	//validation init

		 }
	});
}

//점검항목 상세
function fn_load_workEventDetail(sn){
	$("#content_list").hide();		//목록 숨김
	$("#li_excelDown").hide();		//엑셀다운 숨김
	$("#content_form").show();

	$.ajax({
		type :'post'
		//, async : false
		//, url: "/Module/UserModule/FildWork/WorkEval/workEventDetail.page"
		, url: "/module/usermodule/fieldwork/workeval/workeventdetail"
		, data : {
			"sn" : sn
		}
		, dataType:"html"
		, success:function( data ){
			$("#content_form").html(data).localize();

			//후속조치작업 목록 로딩
			fn_load_workActionList(sn);
		 }
	});
}

//처리기한일, 남은기일 자동계산
function fn_event_calcDate_endDueDt(){

	var startDt = $("#frmWorkEventEdit input[name='startDt']").val();	//발생일자
	var endDueDt = $("#frmWorkEventEdit input[name='endDueDt']").val();	//처리기한일
	var endDt = $("#frmWorkEventEdit input[name='endDt']").val();	//처리완료일

	//발생일, 처리기한일이 모두 있는경우 처리기한을 계산
	var dueday = util_getDateDiff(startDt, endDueDt, true);
	$("#frmWorkEventEdit input[name='dueday']").val(dueday);


	//처리기한일이 있고, 처리완료일이 없는경우 남은기일을 계산
	var restDay = util_getDateDiff_fromToday(endDueDt, true);
	if(endDt == "" && restDay != ""){
		$("#frmWorkEventEdit input[name='restDay']").val(restDay);
	}else{
		$("#frmWorkEventEdit input[name='restDay']").val("-");
	}
}

//실처리일 자동계산
function fn_event_calcDate_workDay(){
	var startDt		= $("#frmWorkEventEdit input[name='startDt']").val();	//발생일자
	var endDt 		= $("#frmWorkEventEdit input[name='endDt']").val();		//처리완료일

	var diffDays = util_getDateDiff(startDt, endDt, true);
	$("#frmWorkEventEdit input[name='workDay']").val(diffDays);
}


//점검항목 저장(파일 업로드 후에 호출)
function fn_save_workEvent(){
	var FTNm = $("#frmWorkEventEdit select[name='FTSeqno'] option:selected").text();
	var FECNm = $("#frmWorkEventEdit select[name='FECSeqno'] option:selected").text();

	$("#frmWorkEventEdit input[name='FTNm']").val(FTNm);	//점검분류명
	$("#frmWorkEventEdit input[name='FECNm']").val(FECNm);	//점검항목명

	var data = $("#frmWorkEventEdit").serialize()
	data += "&SSID="+$("#gssid").val();

	var dmlType = $("#frmWorkEventEdit input[name='dmlType']").val();

	var resultStr = "";
	if(dmlType == "modify"){
		resultStr = i18next.t("msg.editOk");
	}else{
		resultStr = i18next.t("msg.saveOk");
	}

	$.ajax({
		type :'post'												// Post로 데이터 전달(get,post방식)
		//, url: "/Module/UserModule/FildWork/WorkEval/workEventEditDml.do"
		, url: "/module/usermodule/fieldwork/workeval/workeventeditdml"
		, data : data
		, dataType:"json"
		, success:function( data ){
			if(data.result == "success"){
				$.unblockUI();

				swal({
					title: resultStr,
					showConfirmButton: false,
					type: "success",
					timer: 1000
				});

				var sn = $("#frmWorkEventEdit input[name='sn']").val()
				if (dmlType == "add"){
					sn = data.rtSn;	//등록후 리턴된 일련번호
				}

				//목록다시불러오기
				fn_load_workEvalTbody(1, false);

				//점검항목 상세페이지로 이동
				fn_load_workEventDetail(sn);

				$("#btn_workEvalAdd").show();   //업무등록버튼 보임
			}else{
				$.unblockUI();

				swal({
					title: i18next.t(data.code),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
				//$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
				$.ajax({url: "/common/tempfiledelete"}); //session id 로 등록된 temp file 삭제
			}
		 }
		 , error:function(xhr,textStatus){
				$.unblockUI();
				swal({
					title: i18next.t("msg.DbError"),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
				//$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
				$.ajax({url: "/common/tempfiledelete"}); //session id 로 등록된 temp file 삭제
		 }
	});
}
/*-------------------------------------------------------------------------------------------------------------*/
/* ------------------------------------- //점검항목 등록/수정/상세 관련 -------------------------------------- */
/*#############################################################################################################*/


/*#############################################################################################################*/
/*------------------------------------------------ 후속조치작업 -----------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
//후속조치작업 목록 로딩
function fn_load_workActionList(FESeqno){
	$.ajax({
		type :'post'
		//, url: "/Module/UserModule/FildWork/WorkEval/workActionList.page"
		, url: "/module/usermodule/fieldwork/workeval/workactionlist"
		, data : {
			"FESeqno" : FESeqno	//현장업무 점검항목 일련번호
		}
		, dataType:"html"
		, success:function( data ){
			$("#div_workActionList").html(data).localize();

			//후속조치작업 목록 Tbody 로딩
			fn_load_workActionListBody(FESeqno);
		 }
	});
}

//후속조치작업 목록 Tbody 로딩
function fn_load_workActionListBody(FESeqno){
	$.ajax({
		type :'post'
		//, url: "/Module/UserModule/FildWork/WorkEval/getWorkActionList.page"
		, url: "/module/usermodule/fieldwork/workeval/getworkactionlist"
			, data : {
			"FESeqno" : FESeqno	//현장업무 점검항목 일련번호
		}
		, dataType:"html"
		, success:function( data ){
			$("#div_workActionList #table_workActonList tbody").html(data).localize();
		 }
	});
}

//후속조치작업 등록/수정 모달 로딩
function fn_load_modal_workActionEdit(sn){
	$.ajax({
		type :'post'
		//, url: "/Module/UserModule/FildWork/WorkEval/workActionEdit.page"
			, url: "/module/usermodule/fieldwork/workeval/workactionedit"
		, data : {
			"sn" : sn	//현장업무 점검항목 일련번호
		}
		, dataType:"html"
		, success:function( data ){
			$("#modal_workEventEdit").html(data).localize();
			$("#modal_workEventEdit").modal("show");
			valid_frmWorkActionEdit();	//valid init

		 }
	});
}

//후속조치작업 저장(파일 업로드 후에 호출)
function fn_save_workAction(){

	var data = $("#frmWorkActionEdit").serialize()
	data += "&SSID="+$("#gssid").val();

	var dmlType = $("#frmWorkActionEdit input[name='dmlType']").val();

	$.ajax({
		type :'post'														// Post로 데이터 전달(get,post방식)
		//, url: "/Module/UserModule/FildWork/WorkEval/workActionDml.do"
		, url: "/module/usermodule/fieldwork/workeval/workactiondml"
		, data : data
		, dataType:"json"
		, success:function( data ){
			$.unblockUI();							//block-ui hide
			if(data.result == "success"){
				swal({
					title: i18next.t("msg.editOk"),
					showConfirmButton: false,
					type: "success",
					timer: 1000
				});
				$("#modal_workEventEdit").modal("hide");

				var FESeqno = $("#frmWorkActionEdit input[name='FESeqno']").val(); //현장업무 점검항목 일련번호

				//점검항목 상세에서 처리시 하단의 후속작업 목록 갱신
				if ($("#content_form").is(":visible")){
					//후속작업 목록 재로딩
					fn_load_workActionListBody(FESeqno);
					//console.log("상세")
				}

				//점검항목 목록에서 해당 항목의 작업항목 목록 테이블 다시 로딩
				$.ajax({
					type: "POST",
					//url: "/Module/UserModule/FildWork/WorkEval/evalList_getWorkActionList.page",
					url: "/module/usermodule/fieldwork/workeval/evallistgetworkactionlist",
					data:{
						"FESeqno" : FESeqno,
						"sch_FACSeqno" : $("#sch_FACSeqno").val()
					},
					dataType: "html",
					success:function(data) {
						var oTd = $("#table_workEvalList > tbody > tr[sn='"+FESeqno+"']").find(".dt_action");
						oTd.html(data);
					}
				});


			}else{
				$.unblockUI();							//block-ui hide
				swal({
					title: i18next.t(data.code),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
				//$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
				$.ajax({url: "/common/tempfiledelete"}); //session id 로 등록된 temp file 삭제
			}
		 }
		 , error:function(xhr,textStatus){
				$.unblockUI();							//block-ui hide
				swal({
					title: i18next.t("msg.DbError"),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
				//$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
				$.ajax({url: "/common/tempfiledelete"}); //session id 로 등록된 temp file 삭제
		 }
	});
}
/*-------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- //후속조치작업 ----------------------------------------------*/
/*#############################################################################################################*/

//평가 등록/수정 처리(파일 업로드 후에 호출)
function fn_save_evaluation(){

	var strEvalDetail = $("#frmEvaluationEdit select[name='evaluation'] option:selected").attr("evalDetail");

	var data = $("#frmEvaluationEdit").serialize();
	data += "&SSID="+$("#gssid").val();
	data += "&evalDetail="+strEvalDetail;

	var dmlType = $("#frmEvaluationEdit input[name='dmlType']").val();

	var msg = "";
	if (dmlType == "add"){
		msg = i18next.t("msg.saveOk");
	}else{
		msg = i18next.t("msg.editOk");
	}

	$.ajax({
		type :'post'														// Post로 데이터 전달(get,post방식)
		//, url: "/Module/UserModule/FildWork/WorkEval/modal_evaluationDml.do"
		,url: "/module/usermodule/fieldwork/workeval/modalevaluationdml"
		, data : data
		, dataType:"json"
		, success:function( data ){
			$.unblockUI();							//block-ui hide
			if(data.result == "success"){
				swal({
					title: msg,
					showConfirmButton: false,
					type: "success",
					timer: 1000
				});
				$("#modal_evaluation").modal("hide");


				var FESeqno		= $("#frmEvaluationEdit input[name='FESeqno']").val();	//점검항목 일련번호
				var evalType	= $("#frmEvaluationEdit input[name='evalType']").val();
				var targetObj	= $("#table_workEvalList tbody tr[sn='"+FESeqno+"']").find(".btn_evaluation[evalType='"+evalType+"']")

				//평가상세를 ( 전후로 분리한다.
				var strEvalDetail_a = strEvalDetail.substring(0, strEvalDetail.indexOf("(")) + "&nbsp;("+userNm+")";
				var strEvalDetail_b = strEvalDetail.substring(strEvalDetail.indexOf("(")+1, strEvalDetail.indexOf(")"))

				//관리자 평가인경우 [] 로 감싸준다.
				if (evalType == "2"){
					strEvalDetail_a = "["+strEvalDetail_a+"]"
				}

				//목록 다시 그리기
				$(targetObj).closest("div").html("<a class='cursor-pointer btn_evaluation' evalType='"+evalType+"' strDtl='"+strEvalDetail_b+"'>"+strEvalDetail_a+"</a>")

			}else{
				$.unblockUI();							//block-ui hide
				swal({
					title: i18next.t(data.code),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
				//$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
				$.ajax({url: "/common/tempfiledelete"}); //session id 로 등록된 temp file 삭제
			}
		 }
		 , error:function(xhr,textStatus){
				$.unblockUI();							//block-ui hide
				swal({
					title: i18next.t("msg.DbError"),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
				//$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
				$.ajax({url: "/common/tempfiledelete"}); //session id 로 등록된 temp file 삭제
		 }
	});
}



//열람권한 선택
function fn_openObsSelect(arrObs){
	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/pds/modal_obsSelect.page",
		url: "/module/usermodule/pds/modalObsSelect",
		data:{
			"GongGuCode" : fildGSn,
			"preObsCode" : arrObs.toString()
		},
		dataType: "html",
		success:function(data) {
			$("#modal_obsSelect").html(data);
			$("#modal_obsSelect").localize();
			$("#modal_obsSelect").modal("show");
		}
	});
}


//업무협업인원 선택
function fn_openUserSelect(arrObs){
	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/pds/modal_obsSelect.page",
		url: "/module/usermodule/pds/modalObsSelect",
		data:{
			"GongGuCode" : fildGSn,
			"preObsCode" : arrObs.toString(),
			"obsUseCheck" : "N",	//OBS 선택기능
			"returnUserId" : "Y"	//사용자 일련번호로 리턴여부
		},
		dataType: "html",
		success:function(data) {
			$("#modal_obsSelect").html(data);
			$("#modal_obsSelect").localize();
			$("#modal_obsSelect").modal("show");
		}
	});
}

