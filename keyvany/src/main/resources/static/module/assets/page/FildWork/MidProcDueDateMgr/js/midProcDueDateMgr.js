
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
}

$(function(){

	i18next.loadNamespaces(["common"], function(err, t){
		//jquery 사용위해 선언
		jqueryI18next.init(i18next, $);

		$('.body').localize();				//다국어 반영

		//벨리데이션 다국어 처리
		validatorI18n();

	});
	fn_load_midProcList();	//목록 로딩

	valid_frmAlarm();	//알림 validation

	//중간공정관리 버튼
	$("#btn_midProcMgr").on("click", function(){
		$("#content_form").show();
		$("#content_list").hide();

		$.ajax({
			type :'post'
			, url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcMgr"
			, data : {}
			, dataType:"html"
			, success:function( data ){
				$("#content_form").html(data);
			 }
		});
	});

	//중간공정관리일 등록
	$("#btn_write_midProc").on("click", function(){
		fn_load_modal_midProcEdit("");
	});

	//엑셀다운로드
	$("#excelDown").on("click", function(){
		fn_excel_workEvalTbody();
	});

	//목록 > 중간공정관리항목 클릭
	/*
	$("#content_list").on("click", "#table_midProcList .link_proc", function(){
		var sn = $(this).closest("tr").attr("sn");
		fn_load_modal_midProcEdit(sn);
	});
	*/

	//목록 > 중간공정row 클릭
	/*
	$("#content_list").on("click", "#table_midProcList > tbody > tr", function(event){
		//console.log(event.originalEvent.path)
		//console.log($(event.originalEvent.path[0]).hasClass("tooltipstered"))
		$("#table_midProcList tr").removeClass("selected");

		//준수전망 버튼 제외
		if (! $(event.originalEvent.path[0]).hasClass("tooltipstered") && ! $(event.originalEvent.path[1]).hasClass("tooltipstered")){
			var sn = $(this).attr("sn");
			fn_load_modal_midProcEdit(sn);
			$(this).addClass("selected");
			$(this).find("tr").addClass("selected");
		}
	});
	*/

	//목록 > 중간공정row 클릭
	$("#content_list").on("click", "#table_midProcList > tbody > tr > td:not(.td-viewNotice)", function(event){

		//console.log(event)

		$("#table_midProcList tr").removeClass("selected");
		var oTr = $(this).closest("tr");
		var sn = oTr.attr("sn");
		fn_load_modal_midProcEdit(sn);
		oTr.addClass("selected");
		oTr.find("tr").addClass("selected");
	});


	//목록 > 관련작업 row 클릭
	$("#content_list").on("click", ".list_relatedWorkTable > tbody> tr", function(event){
		$("#table_midProcList tr").removeClass("selected");

		event.stopPropagation();
		var sn = $(this).attr("sn");
		fn_load_modal_relatedWorkEdit(sn);

		$(this).closest("table").find("tr[sn='"+sn+"']").addClass("selected");
	});

	//설정버튼
	$("#btn_midProcConfig").on("click", function(){

		$.ajax({
			type: "POST",
			url: "/module/usermodule/fieldwork/midprocduedatemgr/modalConfig",
			data:{},
			dataType: "html",
			success:function(data) {
				$("#modal_midProcConfig").html(data);
				$("#modal_midProcConfig").localize();
				$("#modal_midProcConfig").modal("show");
			}
		});
	});


	/*
	$("#content_list").on("click", "#table_midProcList .btn_viewNotice", function(event){
		event.stopPropagation();
	});
	*/


	/* ####################################################################### */
	/* --------------------------------- 설정 -------------------------------- */
	/* ----------------------------------------------------------------------- */
	//분류체계 추가
	$("#modal_midProcConfig").on("click", ".btn_folderSelect", function(){
		var strFolderSn = $("#modal_midProcConfig input[name='docFolderSn']").map(function() {
			return $(this).val();
		}).get().join();

		$.ajax({
			type: "POST",
			url: "/module/usermodule/pds/modalFolderSelect",
			data:{
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

	//분류체계 저장
	$("#modal_midProcConfig").on("click", ".btn_saveFolderPath", function(){
		var strFolderSn = $("#modal_midProcConfig input[name='docFolderSn']").map(function() {
			return $(this).val();
		}).get().join();

		$.ajax({
			type :'post'
			, url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcMgrDML"
			, data : {
				"ssid" : $("#gssid").val(),
				"dmlType" : "folderPath",
				"docFolderSn" : strFolderSn,
				"TypeFolderAutoMake" : $("#modal_midProcConfig input[name='TypeFolderAutoMake']").is(":checked") ? 1:0,
				"ItemFolderAutoMake": $("#modal_midProcConfig input[name='ItemFolderAutoMake']").is(":checked") ? 1:0
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

					fn_load_mgr_docClass();		//문서분류 로딩

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

	//TR삭제 버튼
	$("#modal_midProcConfig").on("click", ".btn_delRow", function(){
		$(this).closest("tr").remove();
	});
	/* ----------------------------------------------------------------------- */
	/* -------------------------------- //설정 ------------------------------- */
	/* ####################################################################### */


	/* ####################################################################### */
	/* ----------------------------- 중간공정관리 ---------------------------- */
	/* ----------------------------------------------------------------------- */
	//분류체계 추가
	$("#content_form").on("click", "#frm_midProcMgr .btn_folderSelect", function(){
		var strFolderSn = $("#frm_midProcMgr input[name='docFolderSn']").map(function() {
			return $(this).val();
		}).get().join();

		$.ajax({
			type: "POST",
			url: "/module/usermodule/pdf/modalFolderSelect",
			data:{
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

	//분류체계 저장
	$("#content_form").on("click", "#frm_midProcMgr .btn_saveFolderPath", function(){
		var strFolderSn = $("#frm_midProcMgr input[name='docFolderSn']").map(function() {
			return $(this).val();
		}).get().join();

		$.ajax({
			type :'post'
			, url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcMgrDML"
			, data : {
				"ssid" : $("#gssid").val(),
				"dmlType" : "folderPath",
				"docFolderSn" : strFolderSn,
				"TypeFolderAutoMake" : $("#frm_midProcMgr input[name='TypeFolderAutoMake']").is(":checked") ? 1:0,
				"ItemFolderAutoMake": $("#frm_midProcMgr input[name='ItemFolderAutoMake']").is(":checked") ? 1:0
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

					fn_load_mgr_docClass();		//문서분류 로딩

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

	//TR삭제 버튼
	$("#content_form").on("click", ".btn_delRow", function(){
		$(this).closest("tr").remove();
	});

	//중간공정관리일 추가
	$("#content_form").on("click", "#btn_Add_MidProc", function(){
		fn_load_modal_midProcEdit("");
	});

	//중간공정 등록 모달 오픈시 이벤트
	/*
	$("#modal_midProclEdit").on('shown.bs.modal', function (e) {
		//준수전망의 높이를 문서분류 테이블 높이와 맞춘다.
		$("#frmMidProcEdit textarea[name='notice']").innerHeight( $("#frmMidProcEdit .docClassList").height() );
	});
	*/

	//관련작업 등록 모달 오픈시 이벤트
	/*
	$("#modal_relatedWorkEdit").on('shown.bs.modal', function (e) {
		//기타사항 높이를 문서분류 테이블 높이와 맞춘다.
		$("#frmRelatedWorkEdit textarea[name='etc']").innerHeight( $("#frmRelatedWorkEdit .docClassList").height() );
	});
	*/
	modal_relatedWorkEdit

	//업무협업인원 추가버튼
	$("#modal_midProclEdit").on("click", ".btn_addRelation", function(){
		obsModalMode = "addRelation";
		var arrObs = $("#modal_midProclEdit input[name='relationUserCode']").val().split(",")
		fn_openUserSelect(arrObs);
	});

	//열람권한 추가버튼
	$("#modal_midProclEdit").on("click", ".btn_addAuth", function(){
		obsModalMode = "addAuth";
		var arrObs = $("#modal_midProclEdit input[name='authUserObsCode']").val().split(",")
		fn_openObsSelect(arrObs);
	});

	//분류체계 추가
	$("#modal_midProclEdit").on("click", ".btn_addItemClass", function(){

		var strFolderSn = $("#modal_midProclEdit input[name='docFolderSn']").map(function() {
			return $(this).val();
		}).get().join();

		$.ajax({
			type: "POST",
			url: "/module/usermodule/pds/modalFolderSelect",
			data:{
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


	//중간공정관리일 저장
	/*
	$("#modal_midProclEdit").on("click", "#btn_save_process", function(){
		if($("#frmMidProcEdit").valid()){

			var data = $("#frmMidProcEdit").serialize();
			data += "&ssid="+$("#gssid").val();

			var msg = "";
			if ($("#frmMidProcEdit input[name='dmlType']").val() == "midProc_add"){
				msg = i18next.t("msg.saveOk");
				console.log(1)
				console.log(msg)
			}else{
				msg = i18next.t("msg.editOk");
				console.log(2)
				console.log(msg)
			}

			$.ajax({
				type :'post'
				, url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcMgrDML"
				, data : data
				, dataType:"json"
				, success:function( data ){
					if(data.result == "success"){
						swal({
							title: msg,
							showConfirmButton: false,
							type: "success",
							timer: 1000
						});

						//$("#modal_midProclEdit").modal("hide");
						//fn_load_mgr_midProc();	//중간공정관리일 로딩

						fn_load_midProcTbody(1);				//목록다시로딩
						fn_load_modal_midProcEdit(data.rtSn)	//중간공정관리일 수정모드


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
	*/

	//중간공정관리일 클릭
	$("#content_form").on("click", "#table_mgr_midProc tbody td", function(){
		var oTd = $(this);
		var oTr = $(oTd).closest("tr");
		if (! oTr.hasClass("no-data")){
			var sn = oTr.attr("sn");

			$(oTr).addClass("selected");
			$(oTr).siblings().removeClass("selected");

			//관련작업 로딩
			fn_load_mgr_relatedWork(sn);

			if (oTd.hasClass("link")){
				fn_load_modal_midProcEdit(sn);
			}
		}
	});


	//관련작업 추가
	$("#modal_midProclEdit").on("click", "#btn_Add_relatedWork", function(){
		fn_load_modal_relatedWorkEdit("");
	});

	//업무협업인원 추가버튼
	$("#modal_relatedWorkEdit").on("click", ".btn_addRelation", function(){
		obsModalMode = "addRelation";
		var arrObs = $("#modal_relatedWorkEdit input[name='relationUserCode']").val().split(",")
		fn_openUserSelect(arrObs);
	});

	//열람권한 추가버튼
	$("#modal_relatedWorkEdit").on("click", ".btn_addAuth", function(){
		obsModalMode = "addAuth";
		var arrObs = $("#modal_relatedWorkEdit input[name='authUserObsCode']").val().split(",")
		fn_openObsSelect(arrObs);
	});

	//분류체계 추가
	$("#modal_relatedWorkEdit").on("click", ".btn_addItemClass", function(){

		var strFolderSn = $("#modal_relatedWorkEdit input[name='docFolderSn']").map(function() {
			return $(this).val();
		}).get().join();

		$.ajax({
			type: "POST",
			url: "/module/usermodule/pds/modalFolderSelect",
			data:{
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

	//관련작업 저장
	/*
	$("#modal_relatedWorkEdit").on("click", "#btn_save_relatedWork", function(){
		if($("#frmRelatedWorkEdit").valid()){

			var data = $("#frmRelatedWorkEdit").serialize();
			data += "&ssid="+$("#gssid").val();

			var msg = "";
			if ($("#frmRelatedWorkEdit input[name='dmlType']").val() == "relatedWork_add"){
				msg = i18next.t("msg.saveOk");
				console.log(1)
				console.log(msg)
			}else{
				msg = i18next.t("msg.editOk");
				console.log(2)
				console.log(msg)
			}

			$.ajax({
				type :'post'
				, url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcMgrDML"
				, data : data
				, dataType:"json"
				, success:function( data ){
					if(data.result == "success"){
						swal({
							title: msg,
							showConfirmButton: false,
							type: "success",
							timer: 1000
						});

						$("#modal_relatedWorkEdit").modal("hide");

						var pSn = $("#btn_Add_relatedWork").attr("pSn");
						fn_load_mgr_relatedWork(pSn);	//관련작업 로딩

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
	*/

	//관련작업목록 클릭
	$("#modal_midProclEdit").on("click", ".table_relatedlWork tbody tr:not(.no-data)", function(){
		var sn = $(this).attr("sn");
		fn_load_modal_relatedWorkEdit(sn);

		$(".table_relatedlWork tbody tr").removeClass("selected");

		var oTr = $(".table_relatedlWork tbody tr[sn='"+sn+"']");
		oTr.addClass("selected");

	});

	//관련작업 삭제버튼(등록/수정 모달)
	$("#modal_relatedWorkEdit").on("click", ".btn_del_relatedWork", function(){
		var sn = $("#frmRelatedWorkEdit input[name='sn']").val();
		fn_del_relatedWork(sn);	//관련작업 삭제처리
	})

	//관련작업 삭제버튼(목록)
	$("#modal_midProclEdit").on("click", ".table_relatedlWork .btn_del_relatedWork", function(e){
		e.stopPropagation();
		var sn = $(this).closest("tr").attr("sn");
		fn_del_relatedWork(sn);	//관련작업 삭제처리
	});


	//중간공정관리 삭제
	//$("#content_form").on("click", ".btn_del_midProc", function(){
	$("#modal_midProclEdit").on("click", ".btn_del_midProc", function(){
		var sn = $("#frmMidProcEdit input[name='sn']").val();

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

				$.ajax({
					type: "POST",
					url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcMgrDML",
					data: {
						"dmlType" : "midProc_del",
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

							$.unblockUI();
							$("#modal_midProclEdit").modal("hide");

							//중간공정관리일 목록재로딩
							fn_load_mgr_midProc();
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
	/* ----------------------------- 중간공정관리 ---------------------------- */
	/* ####################################################################### */

	/* ####################################################################### */
	/* ------------------------------ 알람 관련 ------------------------------ */
	/* ----------------------------------------------------------------------- */

	/*
	i18 로딩후로 시점 변경
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

	//알림 저장
	$("#btn_alarmSave").on("click", function(){
		if($("#alarm_date").valid() && $("#alarm_contents").valid()){
			var yyyymmddhhmi = ($("#alarm_date").val()).replace(/-/gi, ".") + " " + $("#alarm_hh").val() + ":" + $("#alarm_mi").val()
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

			fn_alarmAdd_return(html);
			$("#modal_alarm").modal("hide");
		}
	});

	//알림 삭제
	$("#modal_midProclEdit, #modal_relatedWorkEdit").on("click", ".btn_deleteAlarm", function(){
		$(this).closest("li").remove();
	});

	//알림 수정
	$("#modal_midProclEdit, #modal_relatedWorkEdit").on("click", ".btn_editAlarm", function(){
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
		$("#modal_alarm").modal("show");

	});

	//알림추가
	$("#modal_midProclEdit, #modal_relatedWorkEdit").on("click", ".btn_addAlarm", function(){
		$("#frmAlarm input[name='cmd']").val("add");
		$("#frmAlarm input[name='idx']").val("");

		var defaultDate = "";
		var title = "";
		if ($("#modal_midProclEdit").is(":visible")){
			//중간공정관리
			defaultDate = $("#modal_midProclEdit input[name='EndDueDt']").val();
			title = $("#modal_midProclEdit input[name='Title']").val();
		}else{
			//관련작업관리
			defaultDate = $("#modal_relatedWorkEdit input[name='EndPlanDt']").val();
			title = $("#modal_relatedWorkEdit input[name='Title']").val();
		}

		var defaultContents = title + "의 완료예정일 입니다.";

		$("#alarm_date").val(defaultDate);
		$("#alarm_hh").val("09");
		$("#alarm_mi").val("00");
		$("#alarm_contents").val(defaultContents);

		$('#frmAlarm input:checkbox[name=msgType]').prop("checked", true);	//알림방법 디폴트 전체선택

		validator_frmAlarm.resetForm();
		$("#modal_alarm").localize();
		$("#modal_alarm").modal("show");

	});
	/* ####################################################################### */
	/* ----------------------------- //알람 관련 ----------------------------- */
	/* ----------------------------------------------------------------------- */

	//문서분류 삭제버튼 처리
	$("#modal_midProclEdit, #modal_relatedWorkEdit").on("click", ".btn_delDocClass", function(){
		$(this).closest("tr").remove();
	});

});



/* ####################################################################### */
/* ------------------------------ 목록 관련 ------------------------------ */
/* ----------------------------------------------------------------------- */
//목록로딩
function fn_load_midProcList(){
	$("#content_form").hide();
	$("#content_list").show();

	$.ajax({
		type :'post'
		, url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcList"
		, data : {}
		, dataType:"html"
		, success:function( data ){
			$("#content_list").html(data);
		 }
	});
}

//목록 로딩
function fn_load_midProcTbody(pageNo){
	$("#content_list").show();
	$("#content_form").hide();

	if (pageNo == 1){
		$("#table_midProcList tbody").html("");
	}

	var data = $("#frmMidProcList").serialize();
	data += "&pnum="+pageNo;
	//console.log(data)
	$.ajax({
		type :'post'
		, async : false
		, url: "/module/usermodule/fieldwork/midprocduedatemgr/getMidProcList"
		, data : data
		, dataType:"html"
		, success:function( data ){
			$("#table_midProcList > tbody").append(data);
			fn_tooltip_ProcessNotice();	//준수전망 툴팁초기화
		 }
	});

	curPageNum = pageNo;
}

//다음페이지 로딩
function fn_load_midProc_NextPage(){
	fn_load_midProcTbody(curPageNum+1);
}
/* ####################################################################### */
/* ----------------------------- //목록 관련 ----------------------------- */
/* ----------------------------------------------------------------------- */


/* ####################################################################### */
/* ----------------------- 중간공정관리일등록 관련 ----------------------- */
/* ----------------------------------------------------------------------- */
//문서분류 로딩
function fn_load_mgr_docClass(){
	$.ajax({
		type :'post'
		, url: "/module/usermodule/fieldwork/midprocduedatemgr/mgrDocClass"
		, data : {}
		, dataType:"html"
		, success:function( data ){
			$("#panel_docClass").html(data);
		 }
	});
}

//중간공정관리목록
function fn_load_mgr_midProc(){
	$.ajax({
		type :'post'
		, url: "/module/usermodule/fieldwork/midprocduedatemgr/mgrMidProc"
		, data : {}
		, dataType:"html"
		, success:function( data ){
			$("#panel_midProc").html(data);
		 }
	});
}

//관련작업목록
function fn_load_mgr_relatedWork(pSn){
	/*
	$.ajax({
		type :'post'
		, url: "/Module/UserModule/FildWork/MidProcDueDateMgr/mgr_relatedWork.page"
		, data : {
			"pSn" : pSn
		}
		, dataType:"html"
		, success:function( data ){
			$("#panel_relatedWork").html(data);
		 }
	});
	*/
}


//관련작업목록
function fn_load_relatedWorkList(pSn){
	var oSelected = $(".table_relatedlWork tr.selected:eq(0)");	//기존선택되어 있던 row 정보

	$.ajax({
		type :'post'
		, url: "/module/usermodule/fieldwork/midprocduedatemgr/getRelatedWorkList"
		, data : {
			"pSn" : pSn
		}
		, dataType:"html"
		, success:function( data ){
			$(".table_relatedlWork tbody").html(data);

			//기존 선택되어있던 row 선택
			if(oSelected.length > 0){
				$(".table_relatedlWork tbody tr").removeClass("selected");
				var oTr = $(".table_relatedlWork tbody tr[sn='"+oSelected.attr("sn")+"']");
				oTr.addClass("selected");
			}
		 }
	});
}

//선택 분류체계 리턴
function fn_modal_folderSelect_return(jArr){

	var oTbody = $("#frm_midProcMgr .table_folderPath tbody");

	oTbody.html("");

	var html = "";
	for(var i=0; i<jArr.length; i++){
		var id = jArr[i].id;
		var path = jArr[i].path;

		html += "<tr>"
		html += "	<td>"
		html += "		<input type='hidden' name='docFolderSn' value='"+id+"'>"
		html += "		"+path
		html += "	</td>"
		html += "	<td class='dt-center'>"
		html += "		<button class='btn btn-danger btn-xs btn_delDocClass' type='button'><span data-i18n='btn.delete'>삭제</span></button>"
		html += "	</td>"
		html += "</tr>"
	}

	oTbody.append(html);
}

//중간공정관리일 등록/수정
function fn_load_modal_midProcEdit(sn){
	$.ajax({
		type: "POST",
		url: "/module/usermodule/fieldwork/midprocduedatemgr/modalMidProcEdit",
		data:{
			"sn" : sn
		},
		dataType: "html",
		success:function(data) {
			$("#modal_midProclEdit").html(data);
			$("#modal_midProclEdit").localize();
			$("#modal_midProclEdit").modal("show");
		}
	});
}

//중간공정관리일 등록처리
function fn_save_modal_midProcEdit(){
	var data = $("#frmMidProcEdit").serialize();
	data += "&ssid="+$("#gssid").val();

	var strFolderSn2 = $("#frmMidProcEdit input[name='docFolderSn']").map(function() {
		return $(this).val();
	}).get().join();

	data = data + "&docFolderSn2=" + strFolderSn2;

	var msg = "";
	if ($("#frmMidProcEdit input[name='dmlType']").val() == "midProc_add"){
		msg = i18next.t("msg.saveOk");
		//console.log(1)
		//console.log(msg)
	}else{
		msg = i18next.t("msg.editOk");
		//console.log(2)
		//console.log(msg)
	}

	$.ajax({
		type :'post'
		, url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcMgrDML"
		, data : data
		, dataType:"json"
		, success:function( data ){
			if(data.result == "success"){
				swal({
					title: msg,
					showConfirmButton: false,
					type: "success",
					timer: 1000
				});
				$.unblockUI();
				//$("#modal_midProclEdit").modal("hide");
				//fn_load_mgr_midProc();	//중간공정관리일 로딩

				fn_load_midProcTbody(1);				//목록다시로딩
				fn_load_modal_midProcEdit(data.rtSn)	//중간공정관리일 수정모드


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

//관련작업 등록/수정
function fn_load_modal_relatedWorkEdit(sn){
	var pSn = $("#btn_Add_relatedWork").attr("pSn")
	$.ajax({
		type: "POST",
		url: "/module/usermodule/fieldwork/midprocduedatemgr/modalRelatedWorkEdit",
		data:{
			"pSn" : pSn,
			"sn" : sn
		},
		dataType: "html",
		success:function(data) {
			$("#modal_relatedWorkEdit").html(data);
			$("#modal_relatedWorkEdit").localize();
			$("#modal_relatedWorkEdit").modal("show");
		}
	});
}

//관련작업 등록처리
function fn_save_modal_relatedWorkEdit(){
	var data = $("#frmRelatedWorkEdit").serialize();
	data += "&ssid="+$("#gssid").val();

	var strFolderSn2 = $("#frmRelatedWorkEdit input[name='docFolderSn']").map(function() {
		return $(this).val();
	}).get().join();

	data = data + "&docFolderSn2=" + strFolderSn2;

	var msg = "";
	if ($("#frmRelatedWorkEdit input[name='dmlType']").val() == "relatedWork_add"){
		msg = i18next.t("msg.saveOk");
	}else{
		msg = i18next.t("msg.editOk");
	}

	$.ajax({
		type :'post'
		, url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcMgrDML"
		, data : data
		, dataType:"json"
		, success:function( data ){
			if(data.result == "success"){
				swal({
					title: msg,
					showConfirmButton: false,
					type: "success",
					timer: 1000
				});

				$.unblockUI();
				$("#modal_relatedWorkEdit").modal("hide");

				var pSn = $("#btn_Add_relatedWork").attr("pSn");
				fn_load_relatedWorkList(pSn)	//관련작업목록 재로딩
				fn_load_midProcTbody(1);		//목록다시로딩

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

//관련작업 삭제처리
function fn_del_relatedWork(sn){
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

			$.ajax({
				type: "POST",
				url: "/module/usermodule/fieldwork/midprocduedatemgr/midProcMgrDML",
				data: {
					"dmlType" : "relatedWork_del",
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

						//목록에서 해당row 삭제
						$(".table_relatedlWork tr[sn='"+sn+"']").remove();


						//목록재로딩
						fn_load_midProcTbody(1);		//목록다시로딩

						$("#modal_relatedWorkEdit").modal("hide");
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

}
/* ####################################################################### */
/* ----------------------- 중간공정관리일등록 관련 ----------------------- */
/* ----------------------------------------------------------------------- */

//업무협업인원 선택
function fn_openUserSelect(arrObs){
	$.ajax({
		type: "POST",
		url: "/module/usermodule/pds/modalObsSelect",
		data:{
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

//열람권한 선택
function fn_openObsSelect(arrObs){
	$.ajax({
		type: "POST",
		url: "/module/usermodule/pds/modalObsSelect",
		data:{
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

//준수전망 툴팁초기화
function fn_tooltip_ProcessNotice(){
	var selector = "#table_midProcList .btn_viewNotice";
	$(selector).tooltipster({
		contentAsHTML: true,
		position: 'left',
		theme: 'tooltipster-light',
		delay: 0,
		animation: "grow",
		trigger : "click",
		content: 'Loading...',
		functionBefore: function(instance, helper) {
			var $origin = $(helper.origin);
			var sn = $origin.attr("sn");

			if ($origin.data('t-loaded') !== true) {
				$.ajax({
					type: "POST",
					url: "/module/usermodule/fieldwork/midprocduedatemgr/getProcessNotice",
					data:{
						"sn" : sn
					},
					async: false,
					dataType: "json",
					success:function(data) {
						instance.content(data.contents);
						$origin.data('t-loaded', true);
					}
				});

				/*
				instance.content("<div>"+$(selector).attr("orgNm")+"</div>");
				$origin.data('t-loaded', true);
				*/
			}

		},
		functionPosition: function(instance, helper, position){
			if ($("#zoombox").val()>"0.5")
			{
				position.coord.top = position.coord.top * $("#zoombox").val()
				position.coord.left = position.coord.left * $("#zoombox").val()
			}
			return position;
		}
	});
}

//엑셀다운로드
function fn_excel_workEvalTbody(){

	var data = $("#frmMidProcList").serialize();
	data += "&pnum=1";
	$("#frmMidProcList").attr("target","excelDownloadFrame");
	$("#frmMidProcList").attr("action","/module/usermodule/fieldwork/midprocduedatemgr/getMidProcListExcel").submit();
//	$("#excelDownloadFrame")[0].location="/Module/UserModule/FildWork/WorkEval/getWorkEvalListExcel.page?"+data;
}
