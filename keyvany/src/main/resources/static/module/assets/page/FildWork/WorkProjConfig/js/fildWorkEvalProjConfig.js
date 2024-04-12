

$(function(){
	i18next.loadNamespaces(["fildWorkEvalProjConfig"], function(err, t){
		//jquery 사용위해 선언
		jqueryI18next.init(i18next, $);

		$('.body').localize();				//다국어 반영

		//벨리데이션 다국어 처리
		//validatorI18n();

		//프로젝트 시작일/종료일 조건 변경시 데이타테이블 리로드
		$("#sch_SDate, #sch_EDate").on("change", function(){
			t1.ajax.reload(null, true);
		});
	});

	//진행상태 변경
	$("#searchStat").on("change", function(){
		t1.ajax.reload(false);
	});

	//평가유형 선택
	$("#panel_p2").on("click", "#table_evalType tbody tr:not(.no-data)", function(){

		var eventCnt = parseInt($(this).attr("eventCnt"));
		if (eventCnt > 0 && !$(this).hasClass("selected")){
			swal({
				title: i18next.t("해당 프로젝트에 이미 등록된 평가정보가 있어 변경할 수 없습니다."),
				type: "warning",
				showCancelButton: false,
				confirmButtonColor: "#EF5350",
				confirmButtonText: i18next.t("btn.ok"),
				cancelButtonText: i18next.t("btn.cancel"),
				closeOnConfirm: false,
				closeOnCancel: true
			}, function(){
				swal.close();
			});
			return;
		}

		$(this).addClass("selected");
		$(this).siblings().removeClass("selected");

		var FSSeqNo = $(this).attr("sn");	//업무분류타입(평가유형) 일련번호
		var gSn = $("#panel_p2 input[name='gongGuCode']").val();

		//프로젝트별 평가유형에 따른 이벤트,액션 별 반복/필수 목록
		$.ajax({
			type :'post'
			//, url: "/Module/UserModule/FildWork/WorkProjConfig/getEventActionConfig_Repeat_Essential.page"
			, url: "/module/usermodule/fieldwork/workprojconfig/geteventactionconfigrepeatessential"
			, data : {
				"gSn" : gSn,
				"FSSeqNo" : FSSeqNo
			}
			, dataType:"html"
			, success:function( data ){
				$("#table_eventActionConfig tbody").html(data);
			 }
		});

	});

	//분류체계 선택모달
	$("#panel_p2").on("click", "#btn_folderSelect", function(){
		/*
		$.ajax({
			type :'post'
			, url: "/Module/UserModule/FildWork/WorkProjConfig/modal_folderSelect.page"
			, data : {
				"fildGongGuCode" : $("#panel_p2 input[name='gongGuCode']").val(),
				"pathCheckFlag" : "Y"
			}
			, dataType:"html"
			, success:function( data ){
				$("#modal_folderSelect").html(data).localize();
				$("#modal_folderSelect").modal("show");
			 }
		});
		*/

		var strFolderSn = $("#table_folderPath input[name='folderSn']").map(function() {
			return $(this).val();
		}).get().join();

		$.ajax({
			type :'post'
			//, url: "/Module/UserModule/PDS/modal_folderSelect.page"
			, url: "/module/usermodule/pds/modalFolderSelect"
			, data : {
				"GongGuCode" : $("#panel_p2 input[name='gongGuCode']").val(),
				"folderSn" : strFolderSn,	//기존Sn
				"pathCheckFlag" : "Y"
			}
			, dataType:"html"
			, success:function( data ){
				$("#modal_folderSelect").html(data).localize();
				$("#modal_folderSelect").modal("show");
			 }
		});

	});

	//삭제버튼 클릭시 row 삭제
	$("#panel_p2").on("click", ".btn_delRow", function(){
		$(this).closest("tr").remove();
	});

	//저장버튼
	$("#panel_p2").on("click", "#btn_saveConfig", function(){

		//평가유형 선택체크
		var evalTypeSn = $("#table_evalType tbody .selected").attr("sn");

		if (evalTypeSn == undefined){
			//alert("평가유형을 선택하세요")
			swal({
				title: i18next.t("fildWorkEvalProjConfig:msg.insertEvalType"),
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				type: "error"
			});
			return;
		}

		//이벤트,액션 별 반복/필수 여부
		/*
		$("#table_eventActionConfig input[name='RepeatDoc']").each(function(){
			var rtVal = ""
			if ($(this).attr("type") == "checkbox"){
				rtVal = $(this).is(":checked") ? $(this).val() : 0
			}else{
				rtVal = ""
			}
			console.log(rtVal)
		});
		*/

		//------------------------------- 이벤트,액션 반복/필수 여부 -------------------------------
		//이벤트/액션 구분
		var eventActionType = $.map($("#table_eventActionConfig input[name='eventActionType']"), function(n, i){
			return n.value;
		}).join(',');

		//이벤트/액션 환경설정 일련번호
		var targetSeqno = $.map($("#table_eventActionConfig input[name='targetSeqno']"), function(n, i){
			return n.value;
		}).join(',');

		//정기 사용여부
		var repeatDoc = $.map($("#table_eventActionConfig input[name='repeatDoc']"), function(n, i){
			var rtVal = ""
			if ($(n).attr("type") == "checkbox"){
				rtVal = $(n).is(":checked") ? $(n).val() : 0;
			}else{
				rtVal = "";
			}
			return rtVal;
		}).join(',');

		//필수 사용여부
		var isEssential = $.map($("#table_eventActionConfig input[name='isEssential']"), function(n, i){
			var rtVal = ""
			if ($(n).attr("type") == "checkbox"){
				rtVal = $(n).is(":checked") ? $(n).val() : 0;
			}else{
				rtVal = "";
			}
			return rtVal;
		}).join(',');
		//------------------------------- //이벤트,액션 반복/필수 여부 -------------------------------

		var dmlType = "";
		var alertStr = "";

		if ($("#panel_p2 input[name='FWPSeqno']").val() == ""){
			dmlType = "add";
			alertStr = i18next.t("msg.saveOk");
		}else{
			dmlType = "modify";
			alertStr = i18next.t("msg.editOk");
		}

		//분류체계 일련번호
		var data1 = [];
		var folderSeqno = $("#table_folderPath input[name='folderSn']").each(function(){
			data1.push($(this).val());
		});
		folderSeqno = data1.join(',');

		//분류체계 본사여부
		var data2 = [];
		var	companyYn = $("#table_folderPath input[name='companyYn']").each(function(){
			data2.push($(this).val());
		});
		companyYn = data2.join(',');

		$.ajax({
			type :'post'
			//, url: "/Module/UserModule/FildWork/WorkProjConfig/evalProConfigEditDml.do"
			, url: "/module/usermodule/fieldwork/workprojconfig/evalproconfigeditdml"
			, data : {
				"SSID" : $("#gssid").val(),
				"dmlType": dmlType,
				"FWPSeqno" : $("#panel_p2 input[name='FWPSeqno']").val(),
				"selectGonguCode" : $("#panel_p2 input[name='gongGuCode']").val(),				/* 선택한 공구일련번호 */
				"evalTypeSeqNo" : evalTypeSn,													/* 평가유형 일련번호 */
				"typeFolderAutoMake" : $("#typeFolderAutoMake").is(":checked")==true ? 1:0,		/* 평가분류별 자동생성여부 */
				"itemFolderAutoMake" : $("#itemFolderAutoMake").is(":checked")==true ? 1:0,		/* 항목별 자동생성여부 */
				"actionFolderAutoMake" : $("#actionFolderAutoMake").is(":checked")==true ? 1:0,	/* 액션별 자동생성 */
				"titleFolderAutoMake" : $("#titleFolderAutoMake").is(":checked")==true ? 1:0,	/* 제목으로 자동생성 */
				"folderSeqno" : folderSeqno,													/* 분류체계 일련번호 */
				"companyYn" : companyYn,														/* 본사분류체계 여부 */

				"eventActionType" : eventActionType,											//이벤트/액션 구분
				"targetSeqno" : targetSeqno,													//이벤트/액션 환경설정 일련번호
				"repeatDoc" : repeatDoc,														//정기 사용여부
				"isEssential" : isEssential														//필수 사용여부

			}
			, dataType:"json"
			, success:function( data ){
				if(data.result == "success"){
					swal({
						title: alertStr,
						showConfirmButton: false,
						type: "success",
						timer: 1000
					});

					//프로젝트 현장평가 기준 상세 재로딩
					fn_loadEvalProConfigEdit($("#panel_p2 input[name='gongGuCode']").val());

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

});

//다국어 로딩 완료시 호출
function fn_i18nextLoaded(){
	$("#sch_SDate, #sch_EDate").daterangepicker({
		autoUpdateInput: false,
		singleDatePicker: true,
		locale: datepicker_locale
	});

	$("#sch_SDate, #sch_EDate").on('apply.daterangepicker', function (ev, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD'));
		t1.ajax.reload(null, true);
	});
}


//프로젝트 현장평가 기준 상세
function fn_loadEvalProConfigEdit(sn){
	$.ajax({
		type :'post'
		//, url: "/Module/UserModule/FildWork/WorkProjConfig/evalProConfigEdit.page"
		, url: "/module/usermodule/fieldwork/workprojconfig/evalproconfigEdit"
		, data : {
			"gSn": sn
		}
		, dataType:"html"
		, success:function( data ){
			$("#panel_p2").html(data).localize();
			$("#table_evalType .selected").click();
		 }
	});
}

//기본 최상위 분류 선택완료
function fn_modal_folderSelect_return(retVal){
	var html = ""

	for (var i=0; i < retVal.length; i++){
		var id			= retVal[i].id;
		var companyYn	= retVal[i].companyYn;
		var path		= retVal[i].path;

		var companyYnVal = companyYn==1 ? "본사":"현장";

		//하나의 문서정보(T_ITEM_INFO)를 다른현장의 문서분류체계로 조회가 불가하여 추후에 해당 기능개발후 수정, 2018-09-21, 김영식
		//일단 해당현장의 분류체계만 선택하도록 개발
		companyYn = 0;

		html+="<tr>"
		//html+="    <td class='dt-center'>"+companyYnVal+"</td>"
		html+="    <td>"+path+"</td>"
		html+="    <td class='dt-center no-padding'>"
        html+="        <input type='hidden' name='companyYn' value='"+companyYn+"'>    "
        html+="        <input type='hidden' name='folderSn' value='"+id+"'>    "
		html+="        <button class='btn btn-danger btn-xs btn_delRow' type='button'><span data-i18n='btn.delete'>삭제</span></button>"
		html+="    </td>"
		html+="</tr>"
	}

	$("#table_folderPath tbody").html(html);
}

