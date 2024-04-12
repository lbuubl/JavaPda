/* ------------------------------------------------------------------------------
*
 전자결재 공통 자바스크립트
*
* ---------------------------------------------------------------------------- */
var tUserLoad1 = null;
var tuserList_setAppViewAuth = null;
var tAppTypeLoad1 = null;
var tuserList_setReceiveGrp = null;
var selectBoxDiv = null;

//결재선 관련 SEQ값 저장 배열 선언
var userListArray = new Array();
var userSeqListArray = new Array();

//결재선 관련 배열선언
var userListTextArray = new Array();
var userListValueArray = new Array();
var userListTitleArray = new Array();

//결재선관련 목록배열
var selectedApprovalBoxValue = new Array();
var selectedApprovalBoxText = new Array();
var selectedApprovalBoxTitle = new Array();

//결재선관련 히든목록 배열
var hiddenApprovalBoxValue = new Array();
var hiddenApprovalBoxText = new Array();
var hiddenApprovalBoxTitle = new Array();

//결재선관련 Object배열
var objArray = new Array();

//열람권한 관련 SEQ값 저장 배열 선언
var userListArray2 = new Array();
var userSeqListArray2 = new Array();

//열람권한 관련 배열 선언
var userListTextArray2 = new Array();
var userListValueArray2 = new Array();
var userListTitleArray2 = new Array();

//열람권한 관련 목록배열
var addAuthValue = new Array();
var addAuthText = new Array();
var addAuthTitle = new Array();

//열람권한관련 히든 배열
var hiddenAuthViewBoxValue = new Array();
var hiddenAuthViewBoxText = new Array();
var hiddenAuthViewBoxTitle = new Array();

//열람권한관련 Object배열
var objArray2 = new Array();

//수신관련 SEQ값 저장 배열 선언
var receiveListArray = new Array();
var receiveSeqListArray = new Array();

//수신관련 배열 선언
var receiveValueArray = new Array();
var receiveTextArray = new Array();
var receiveTitleArray = new Array();

//수신관련 목록배열
var receiveValue = new Array();
var receiveText = new Array();
var receiveTitle = new Array();

//수신관련 히든 배열
var hiddenReceiveValue = new Array();
var hiddenReceiveText = new Array();
var hiddenReceiveGrp = new Array();

//수신관련 Object배열
var receiveObjArray = new Array();
var receiveGetObjArray = new Array();

var grpSort=1;
var lastAppIndex=0;
var viewAuthFormData = new FormData();

var nodeItem=null;
var cbm=null;
var mainContents=null;
var editerOnload=false;
var editorID=null;

//미지정 사용자 일련번호
const noneAppUser = "30";

$(document).ready(function(){

	var buttonFormData = new FormData();
	if (main_Seqno=="")
	{
		$("#indexList").show();
		$("#Editor").hide();
	}
	else
	{
		$("#indexList").hide();
		$("#Editor").show();
	}

	$(".file-styled").uniform({
	  fileButtonClass: 'action btn btn-default'
	});


	//추가
	$(document).on("click",".btn-write",function(e){

        //console.log('btn-write  click :  #ty : '+$("#ty").val()+'  /  #configForm : '+ $("#configForm").val());

		seqIdx = "";
		//$("#indexList").hide();
		//$("#Editor").show();
		//$("#elm1").height(500);
		if ($("#ty").val()=="menuApproval")
		{
			$("#indexList").hide();
			$("#fs").val($("#configForm").val());
			//console.log("fs="+$("#fs").val());
			//console.log("#configForm="+$("#configForm").val());
			EditorLoad("",$("#configForm").val());
			$("#Editor").show();
			$("#attendUsers").tagsinput({
				maxTags: 500
				,tagClass: 'small'
				,confirmKeys: [13, 32]
				,maxChars: 3000
				,trimValue: true
			});

			//i18C("editor");
			tinyMCE.DOM.setStyle(tinyMCE.DOM.get("elm1_ifr" ), 'height', '500px');

		}
		else{
			$('#dataDocLoadListModal').modal('show');
		}
		moveScrollTop(0);

		//title 동적 처리
		//$("#workspace-title").attr("data-i18n","approval:panel.write");

		//$(this).localize();
	});

	//수정
	$(document).on("click","#modify",function(e){


	});

	//삭제
	$(document).on("click","#delete",function(e){

	});



	//의견 추가
	$(document).on("click","#comment_add",function(e){

	});

	//의견 삭제
	$(document).on("click",".btn-commentDel",function(e){

	});



	//취소
	$(document).on("click","#cancel",function(e){
		$("#docReasonTxt").val("");
		$("#modal_docReason").modal("show");

	});


	//사유버튼 저장시
	$(document).on("click","#docReasonSave",function(e){

		if($("#docReasonTxt").val().trim() != "" ){
			$("#modal_docReason").modal("hide");
			$("#hiddenUpdateReason").val($("#docReasonTxt").val());
			//console.log('docReasonSave  docReasonTxt : ' + $("#docReasonTxt").val() );
			//console.log('docReasonSave  hiddenUpdateReason : ' + $("#hiddenUpdateReason").val() );
			approvalButtonEvent($(this).data("id"));
		}else{
			showSwal(i18next.t("approval:msg.insertReason"),"warning");
		}


	});



	//문서상세정보 모달 호출
	$(document).on("click",".btn_docInfo",function(e){
		$.ajax({
			//url : "/module/UserModule/approval/common/Modal-docInfo.page"
			url : "/module/usermodule/approval/common/modalDocInfo"
			,type : "post"
			,data:{ "sq": $("#sq").val(),"fq": $("#fs").val()}//ffData,  //fq 미사용...
			,async:false
			,success : function(result){
				$("#docInfoDiv").html(result);
			}
		})
	})


	i18next.loadNamespaces(["approval"], function(err, t){
		jqueryI18next.init(i18next, $);		//jquery 사용위해 선언
		makeDataTable();
		makeDocLoadDataTable();
		$('.content').localize();				//다국어 반영
		$(".heading-elements").appendTo("#dataList_length");
	});


	i18C("editor");
	fn_i18nextLoaded();

	/*  */

	//데이터테이블 말줄임..
	$("#resizeDiv").on("mresize",function(){
		mresize("#resizeDiv","#dataList");

	});

	//데이터테이블 말줄임 속성 조정
	$('#dataList .title_resizer').on("click",function (e) {
		e.stopPropagation();
		if ($(this).closest("table").css("table-layout")=="fixed")
		{
			$(this).closest("table").css("table-layout","auto");

		}else{
			$(this).closest("table").css("table-layout","fixed");

		}
		mresize("#resizeDiv","#dataList");
	});

//라인그룹 체인지 이벤트
	//$("#pAppLineBox").change(function(){console.log("duddddddddddddddd")});
	//$("#btnApprovalLine_div").on("change","#pAppLineBox",function(e){
	$(document).on("change","#pAppLineBox",function(e){
		//console.log("이벤트");
		if($(this).val()!=""){
			$.ajax({
				//url : "/module/UserModule/approval/common/Modal-AppLine-UserLineList.do"
				url : "/module/usermodule/approval/common/modalAppLineUserLineList"
				,type : "post"
				,data : {
					"lineSeq" : $(this).val()
				}
				,success : function(data){
					//var jData = JSON.parse(data);
					fn_changeAppLine(data);
					//	li = li + "<option class='   load-line' title='"+jData.data[i].title+"' value='"+jData.data[i].value+"' data-oldvalue='"+jData.data[i].value+"'>"+jData.data[i].text+"</option>"
				}
			});
		}
	});

});

$(document).on('focusin', function(e) {
  if ($(e.target).closest(".mce-window").length) {
	e.stopImmediatePropagation();
  }
});


//datatable resize function
function mresize(_item,_id){
	//titleShowYn("#dataList td");
	var FixWidth;
	FixTable=$(_item).find("table:eq(0)");
	FixWidth=$(_item).width()-FixTable.data("fixwidth");
	if(FixWidth < 100 ){
		//FixWidth = 100;
		FixWidth = 200;
	}
	//padding + border 뺴줌
	FixWidth = FixWidth-52;
	//FixWidth = FixWidth-100;

	FixTable.find( "th.FixColnum" ).width(FixWidth);

	if ($(_id+" .title_resizer").closest("table").css("table-layout")=="fixed")
	{
		try{
			$(_id+"_wrapper .datatable-header")[0].style.removeProperty('width');
			$(_id+"_wrapper .datatable-scroll")[0].style.removeProperty('width');
			$(_id+"_wrapper .datatable-footer")[0].style.removeProperty('width');
		}catch(e){}

	}else{
		if($(_item).width()>$(_id+"_wrapper table").width()){

			$(_id+"_wrapper .datatable-header")[0].style.removeProperty('width');
			$(_id+"_wrapper .datatable-scroll")[0].style.removeProperty('width');
			$(_id+"_wrapper .datatable-footer")[0].style.removeProperty('width');
		}else{
			//padding만큼 빼기
			$(_id+"_wrapper .datatable-header").width($(_id+"_wrapper table").width()-20);
			$(_id+"_wrapper .datatable-scroll").width($(_id+"_wrapper table").width());
			$(_id+"_wrapper .datatable-footer").width($(_id+"_wrapper table").width()-20);
		}
	}

}

//사유 모달창 호출
function showReasonModal(id){
	$("#docReasonSave").data("id",id);
	$("#docReasonTxt").val("");
	$("#hiddenUpdateReason").val("");
	$("#modal_docReason").modal("show");

}

function getButtons(){
	var ffData = new FormData();
   ffData.append("sq",$("#sq").val());
   ffData.append("fs",$("#fs").val());
//console.log({ "sq": $("#sq").val(),"fq": $("#fs").val()});

	$.ajax({
		//url:"/module/usermodule/approval/common/getButtons.do",
		url:"/module/usermodule/approval/common/getButtons",
		//contentType:false,
		type:"POST",
		//dataType:"html",
		data:{ "sq": $("#sq").val(),"fq": $("#fs").val()},//ffData,
		//cache:false,
		async:false,
		//processData:false,
		success:function(data){
			//console.log('getButtons : '+data);

			$("#editorButtons").html(data);
			if ($("#sq").val().trim() !='' && $("#sq").val().trim() != '30' && $("#sq").val().trim() != '0')	{
				$("#editorInfoButtons").html('<button type="button" id="btn_docInfo" class="btn btn-info btn-xs btn_docInfo"><i class="icon-info3 position-left"></i> <span data-i18n="approval:button.docEtcInfo">문서정보</span></button>');
			}
			else{
				$("#editorInfoButtons").html('');
			}
			return;
		},
		error:function(data){
			alert("err//"+data);
		}
	});
	i18C("editor");
	fn_i18nextLoaded();

}

//결재선 클래스 생성 펑션
function fn_appLineClassMake(_arr){
	var html="";
	var valArr = _arr.split("_");
	switch(valArr[4]){
		case "1" :
			html = html + "A";
			break;
		case "2" :
			html = html + "R";
			break;
		case "3" :
			html = html + "C";
			break;
		case "4" :
			html = html + "V";
			break;
	}
	// EX) A_1_1  A_2_2
	//신규 결재자의 경우
	if(valArr[1] == "0"){
		html = html +"_"+valArr[0]+"_"+valArr[1]+"_"+valArr[2];
	}else{
		html = html +"_"+valArr[0]+"_"+valArr[1];
	}
	return html;
}

//결재라인 설정
function editerAppLineSet(newLineArr){
	//var appLineTb = "<table id='M_01'><tr><td>HI!~~~</td></tr></talbe>";
	//$(tinyMCE.activeEditor.contentAreaContainer).append(appLineTb);
	//tinyMCE.dom.DomQuery.append(appLineTb);

	//[0]=결재그룹, [1]=결재기본순서(1~N:기본 , 0:추가), [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람),
	//[5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료)

	//console.log("newLineArr", newLineArr)

	const maxTdSize = 8; // 최대 Td갯수 8개
	const tdHeight = 50;

	var trLen = 0; //tr 길이
	var tdLen = 0; //td 길이

	var html = "";
	var editBody = tinyMCE.activeEditor.getBody();

	//해당 그룹번호로 Div 생성이 되어있는지 확인
	var AppGrpBox = $(editBody).find(".appBox_"+$("#hiddenApprovalGrp").val()) ;	//김형식 추가
	var editGrp = $(editBody).find(".appBox_"+$("#hiddenApprovalGrp").val()) ;
	var valArr = [];
	//console.log("AppGrpBox="+AppGrpBox+"//editGrp="+editGrp);

	if(editGrp.length > 0){ // 기존양식내 지정된 결재가 있음

			var oldTmpArr = $("#hiddenApprovalOldValue").val().split("||");
			var oldAppArr = [];
			var clsNm = "";
			var clsOldNm = "";

			$(oldTmpArr).each(function(i,item){
				//신규추가 결재선이며 결재된 것 있으면
				if(item.split("_")[1]=="0" && (item.split("_")[8] =="2" || item.split("_")[8] =="3" || item.split("_")[8] =="4" )){
					//oldAppArr.push(item);
					clsNm = fn_appLineClassMake(item);
					//console.log($(editBody).find("."+clsNm));
					oldJson = {
						"html" : $($(editBody).find("."+clsNm)).html()
						,"value" : $($(editBody).find("."+clsNm)).data("value")
					}
					oldAppArr.push(oldJson);
					//console.log(oldAppArr);
				}

			})

			//기존 DIV 삭제
			//$(editGrp).remove();
			//$(editGrp).html="";
			$(editGrp).find('table').remove();

			//newLineArr 와 oldAppArr 와 비교하여 class 같으면 old정보 바인딩

			//fn_appLineClassMake(newLineArr[j])
			trLen= parseInt(newLineArr.length/maxTdSize);
			tdLen = newLineArr.length%maxTdSize;


			//return false;
			//8칸씩 테이블 생성
			for ( var i=0 ; i<trLen ; i++ ){

				html = html + "<br>"
				html = html + "<table class='mce-item-table'>";

				html = html + "<tr >";
				//직급 처리
				for ( var j=0 ; j<maxTdSize ; j++ ){

					valArr = newLineArr[j].split("_");
					//console.log("newLineArr[j]", newLineArr[j])
					//console.log("valArr[4]="+valArr[4].toString());
					switch (valArr[4].toString())
					{
						case "2":
							html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appCL")+")</td>";
							break;
						case "3":
							html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appAL")+")</td>";
							break;
						case "4":
							html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appVL")+")</td>";
							break;
						default :
							html = html + "<td class='edit-appLine-header'>"+valArr[9]+"</td>";
							break;
					}
				}
				html = html + "</tr>";

				html = html + "<tr>";
				for ( var j=0 ; j<maxTdSize ; j++ ){
					clsNm = fn_appLineClassMake(newLineArr[j]);
					if(oldAppArr.length>0 && fn_appLineClassMake(oldAppArr[0].value) == clsNm ){
						html = html + "<td class='"+clsNm+" edit-appLine-body' data-value='"+newLineArr[j]+"'>"+oldAppArr[0].html+"</td>";
						oldAppArr.shift();
					}else{
						html = html + "<td class='"+clsNm+" edit-appLine-body' data-value='"+newLineArr[j]+"'></td>";
					}

				}
				for ( var j=0 ; j<maxTdSize ; j++ ){
					newLineArr.shift();
				}
				html = html + "</tr>";
				html = html + "</table>";
			}

			//나머지 칸 테이블 생성
			if(tdLen > 0 ){
				html = html + "<p></p>"
				html = html + "<table class='mce-item-table'>";
				html = html + "<tr>";
				for ( var i=0 ; i<tdLen ; i++ ){

					//console.log("나머지 newLineArr[j]", newLineArr[j])
					valArr = newLineArr[i].split("_");
					//직급 처리
					//html = html + "<td  class='edit-appLine-header' >"+valArr[9]+"</td>";
					//console.log("newLineArr[i]", newLineArr[i])
					//console.log("valArr[4]="+valArr[4].toString());
					switch (valArr[4].toString())
					{
						case "2":
							html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appCL")+")</td>";
							break;
						case "3":
							html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appAL")+")</td>";
							break;
						case "4":
							html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appVL")+")</td>";
							break;
						default :
							html = html + "<td class='edit-appLine-header'>"+valArr[9]+"</td>";
							break;
					}


				}
				html = html + "</tr>";
				html = html + "<tr>";
				for ( var i=0 ; i<tdLen ; i++ ){
					clsNm = fn_appLineClassMake(newLineArr[i]);
					if(oldAppArr.length>0 && fn_appLineClassMake(oldAppArr[0].value) == clsNm ){
						html = html + "<td class='"+clsNm+" edit-appLine-body' data-value='"+newLineArr[i]+"'>"+oldAppArr[0].html+"</td>";
						oldAppArr.shift();
					}else{
						html = html + "<td class='"+clsNm+" edit-appLine-body' data-value='"+newLineArr[i]+"'></td>";
					}
				}
				html = html + "</tr>";
				html = html + "</table>";
			}

			html = "<table class='mng-table' style='width: 640px;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td align='right'>"+html+"</td></tr></table>";
			//console.log(html);
			//console.log(editGrp);

			//$(editBody).append(html);
			//console.log("//기존생성")
			$(AppGrpBox).append(html); //김형식 추가(결재방위치에 지정)

	}else{
		//신규생성
		//console.log("//신규생성")
		trLen= parseInt(newLineArr.length/maxTdSize);
		tdLen = newLineArr.length%maxTdSize;

		//8칸씩 테이블 생성
		for ( var i=0 ; i<trLen ; i++ ){
			html = html + "<br>"
			html = html + "<table class='mce-item-table'>";
			html = html + "<tr >";

			//직급 처리
			for ( var j=0 ; j<maxTdSize ; j++ ){
				valArr = newLineArr[j].split("_");
				//html = html + "<td class='edit-appLine-header'>"+valArr[9]+"</td>";
				//console.log("newLineArr[j]", newLineArr[j]);
				//console.log("valArr[4]="+valArr[4].toString());
				switch (valArr[4].toString())
				{
					case "2":
						html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appCL")+")</td>";
						break;
					case "3":
						html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appAL")+")</td>";
						break;
					case "4":
						html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appVL")+")</td>";
						break;
					default :
						html = html + "<td class='edit-appLine-header'>"+valArr[9]+"</td>";
						break;
				}
			}
			html = html + "</tr>";
			html = html + "<tr>";
			for ( var j=0 ; j<maxTdSize ; j++ ){
				html = html + "<td class='"+fn_appLineClassMake(newLineArr[j])+" edit-appLine-body' data-value='"+newLineArr[j]+"'></td>";
			}
			for ( var j=0 ; j<maxTdSize ; j++ ){
				newLineArr.shift();
			}
			html = html + "</tr>";
			html = html + "</table>";

		}

		//나머지 칸 테이블 생성
		if(tdLen > 0 ){
			html = html + "<br>"
			html = html + "<table class='mce-item-table'>";
			html = html + "<tr>";
			for ( var i=0 ; i<tdLen ; i++ ){
				valArr = newLineArr[i].split("_");
				//직급 처리
				//html = html + "<td  class='edit-appLine-header' >"+valArr[9]+"</td>";
				//console.log("newLineArr[i]", newLineArr[i]);
				//console.log("valArr[4]="+valArr[4].toString());
				switch (valArr[4].toString())
				{
					case "2":
						html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appCL")+")</td>";
						break;
					case "3":
						html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appAL")+")</td>";
						break;
					case "4":
						html = html + "<td class='edit-appLine-header'>"+valArr[9]+"("+i18next.t("approval:setting.label.appVL")+")</td>";
						break;
					default :
						html = html + "<td class='edit-appLine-header'>"+valArr[9]+"</td>";
						break;
				}
			}
			html = html + "</tr>";
			html = html + "<tr>";
			for ( var i=0 ; i<tdLen ; i++ ){
				html = html + "<td class='"+fn_appLineClassMake(newLineArr[i])+" edit-appLine-body' data-value='"+newLineArr[i]+"'></td>";
			}
			html = html + "</tr>";
			html = html + "</table>";
		}

		if ($(editBody).find(".pagebreak").length>0 )
		{
		html = "<div class='appBox_"+$("#hiddenApprovalGrp").val() + "'><table class='mng-table' style='width: 640px;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td align='right'>"+html+"</td></tr></table></div>";
		}else{
		//html = "<div class='pagebreak'>@</div><div class='appBox_"+$("#hiddenApprovalGrp").val() + "'><table class='mng-table' style='width: 640px;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td align='right'>"+html+"</td></tr></table></div>";
		html = "<div class='appBox_"+$("#hiddenApprovalGrp").val() + "'><table class='mng-table' style='width: 640px;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td align='right'>"+html+"</td></tr></table></div>";
		}
		//console.log(html);
		//console.log($(editBody));
		//$(editBody).append(html);

		$(editBody).append(html); //김형식 추가
	}


}

function arrayPushPop(objArray,value) //배열에 중복값이 있는지 비교하여 삽입 또는 삭제
{
	 if (chkArrayValue(objArray,value)) //배열에 중복값이 있는지 체크
	 {
		arrayRemoveValue(objArray,value)	//중복값이 있을때 삭제
	 }
	 else
	{
		objArray.push(value);	//중복값이 없을때 삽입
	}
}

function arrayRemoveValue(arr, value) {	//배열에서 특정값 제거
  var i;
  if (arr.indexOf) { // IE9+,  다른 모든 브라우져
    while((i = arr.indexOf(value)) !== -1) { //해당 값이 arr에 있는 동안 루프
      arr.splice(i, 1);
    }
  }
}


function chkArrayValue(objArray,value) //배열에 특정 값이 있는지
{
	 if (objArray.indexOf(value) ==-1)
	 {
		return false;
	 }
	 else
	{
		return true;
	}
}


function chkMsg(msgTitle,msgContent,txtSort){ //obj1=셀렉트박스, obj2=배열
	var strReturn=false;

	if (confirm(txtSort + i18next.t("approval:msg."+msgContent)))
	{
			//확인버튼을 눌렀을때 처리할 내용
			strReturn=true;
	}

	/*
	swal({
			title: i18next.t("approval:msg."+msgTitle), //확인창 타이틀
			text: i18next.t(txtSort + "approval:msg."+msgContent), //확인내용
			type: "info",
				showCancelButton: true,
				confirmButtonClass: 'btn-primary',
				confirmButtonText: i18next.t("approval:button.confirm"),
				cancelButtonText: i18next.t("approval:button.cancel"),
				closeOnConfirm: true,
				closeOnCancel: true
	},function(isConfirm){
		if (isConfirm)
		{
			//확인버튼을 눌렀을때 처리할 내용
			strReturn=true;
		}
	});
	*/
	return strReturn;
}


function chkMsgUser(obj,idx,grp,sortDefault,sortChange,userID,appType,signType,defaultSignType,appTypeDetail,txtSort,userName,_title,_contents)
{

	if (confirm(txtSort + i18next.t("approval:msg."+_contents)))
	{
			//확인버튼을 눌렀을때 처리할 내용
			obj.options[idx].value=grp + "_" + sortDefault + "_" + sortChange + "_" + userID + "_" + appType + "_" + signType + "_" + defaultSignType + "_" + appTypeDetail + "_" + userName;
			obj.options[idx].text=txtSort +": " + userName;
			userListTextArray.shift();
			userListValueArray.shift();

	}

	/*
	swal({
			title: i18next.t("approval:msg."+_title), //확인창 타이틀
			text: i18next.t(txtSort + "approval:msg."+_contents), //확인내용
			type: "warning",
				showCancelButton: true,
				confirmButtonClass: 'btn-primary',
				confirmButtonText: i18next.t("approval:button.confirm"),
				cancelButtonText: i18next.t("approval:button.cancel"),
				closeOnConfirm: true,
				closeOnCancel: true
	},function(isConfirm){
		if (isConfirm)
		{
			//확인버튼을 눌렀을때 처리할 내용
			obj.options[idx].value=grp + "_" + sortDefault + "_" + sortChange + "_" + userID + "_" + appType + "_" + signType + "_" + defaultSignType + "_" + appTypeDetail + "_" + userName;
			obj.options[idx].text=txtSort +": " + userName;
			userListTextArray.shift();
			userListValueArray.shift();
		}
	});
	*/

}

//문서작성창 로드
function EditorReLoad(seqno,seqIdx,result){
	EditorLoad(seqno,seqIdx);
	//$("#btn_docInfo").click();
	if(result=="success"){
		showSwal(i18next.t("approval:msg.cancelSuccess"),result);
	}
}

function EditorLoadMain(seqno,seqIdx){
	editorLoad();
//console.log("_EditorLoadMain_seqno="+seqno+",seqIdx="+seqIdx);
	EditorLoad(seqno,seqIdx);
	main_Seqno="";
}

function EditorLoad(seqno,seqIdx){
	// console.log("EditorLoad   seqno="+seqno+",seqIdx="+seqIdx);
		try{
			tinyMCE.activeEditor.remove();
		}
		catch(e){
		}

		//에디터 탑부분 호출
		$("#sq").val(seqno);	//결재 일련번호
		$("#fs").val(seqIdx);	//양식 일련번호
		$("#hidden_Sq").val(seqno);
		$("#hidden_Fs").val(seqIdx);

		$(".doc_select_container").remove();
		$("#userItemHiddenField").html('');
		getButtons();


		editorLoad2();//tinyMCE활성화
		//console.log( "sq="+ $("#sq").val() +",fq="+ $("#fs").val());
		var rq=$.ajax({//기본양식 또는 결재 편집하는 문서 바운딩
			method: "POST",
			//url: "/module/usermodule/approval/common/getFormStream.do",
			url: "/module/usermodule/approval/common/getFormStream",
			data:{ "sq": $("#sq").val(),"fq": $("#fs").val()}
		});
		rq.done(function( msg ) {//문서양식을 로딩하는데 성공하면

			//console.log('getFormStream   : '+msg);
			try
			{
				tinyMCE.activeEditor.setContent(msg);//에디터에 양식 바인딩
				$.post(
						//"/module/UserModule/approval/common/getAppFieldSet.do"
						"/module/usermodule/approval/common/getAppFieldSet"
						,{ sq: $("#sq").val(), fq: $("#fs").val() }
						,function(data) {
							//console.log('getAppFieldSet   : '+data);
							if (data=="1" && ($("#sq").val()=="" ||  $("#sq").val()=="0"))
							{
								tinymce.dom.DomQuery(tinymce.activeEditor.dom.select('.a')).html('');
							}
						}
			   );  // post end
			}
			catch (e)
			{
				alert(msg);
				//console.log("문서로드 실패");
			}
		});

		//console.log("/module/usermodule/approval/common/editorTop.....");
		$.post (
				//"/module/usermodule/approval/common/EditorTop.page"
				"/module/usermodule/approval/common/editorTop"
				,{ sq: $("#sq").val(), fs: $("#fs").val() }
				,function(data) {

				$("#editorTop").html(data);

				//파일업로도
				fn_loadFileDiv(seqno);

				//파일목록 로딩
				fn_loadFileList(seqno);

				//의견부분 로딩
				fn_loadOpinionDiv(seqno);

				//문서분류 로딩
				fn_loadDocClassDiv(seqno, seqIdx)

				$.ajax({
					//url:"/Module/UserModule/approval/common/getUserItemLists.do", // 기본양식 히든필드 로드
					url:"/module/usermodule/approval/common/getUserItemLists", // 기본양식 히든필드 로드
					type:"POST",
					//async: false,
					dataType:"text",
					data:{ "sq": $("#sq").val(),"fq": $("#fs").val()},
					success:function(data){

						//console.log('getUserItemLists : '+data);
						$("#hiddenScript").html(data);

						LoadUserItem();//양식 로드시 사용자지정 아이템 바인딩
						//CheckUserItem()  ->  서브밋시 사용자지정 아이템 체크

						//console.log($("#editor_submitForm INPUT"));
						//console.log($("#editor_submitForm Button"));

						//밸리데이션 적용
						validationInit();

						//$("#hiddenScript").localize();

						return;
					},
					error:function(data){
						alert("err//"+data.message);
					}
				});  //UserItem 세팅
				//console.log('getUserItemLists end. ');


				//alert( "sq :"+ $("#sq").val() +"  /  fq : "+ $("#fs").val()  );
				$.ajax({
					//url:"/module/UserModule/approval/common/loadAppUserList.do", // 기본 결재선 로드
					url:"/module/usermodule/approval/common/loadAppUserList", // 기본 결재선 로드
					type:"POST",
					dataType:"text",
					data:{ "sq": $("#sq").val(),"fq": $("#fs").val()},
					success:function(data){
						//console.log('loadAppUserList : '+data);
						var appInfo = data.split("|@|");
						var appCount = appInfo[0].split(",");
						var grpSort = appCount[5];  //그룹정보
						var appType = appCount[6];//현재 결재그룹의 결재방식(0:고정, 1:자유)
						var appSortChange = appCount[7];//수정가능한 결재라인 App_Grp_In_Sort_Change
						/*
						console.log("========appSortChange============");
						console.log(appCount);
						console.log(appSortChange);
						*/
						var appLines = appInfo[1].split("||");
						var appTexts = appInfo[2].split("||");
						var appTitles = appInfo[3].split("||");

						var appLCnt=0;
						var appCCnt=0;
						var appACnt=0;
						var appVCnt=0;
						var html="";

						var appTextArray = new Array();
						var appTitleArray = new Array();
						//var appTitleArray = new Array();
			//[0]=결재그룹, [1]=결재기본순서, [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람), [5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재)
			//75_1_1_1_0||79_1_0_2_1||80_1_0_3_1||81_3_0_4_1||79_3_0_5_1||82_1_2_6_0


						for (iii=0 ;iii<appLines.length ;iii++ )
						{
							var ty = appLines[iii].split("_");
							var sortCnt = "";
							//switch (ty[4].toString())
							//console.log("i="+iii+ "//////////////appLines.length ="+appLines.length);

							switch (ty[4])
							{
							case "1":
								appLCnt++;
								sortCnt = ("0"+appLCnt).toString().right(2);
								sortCnt = i18next.t("approval:setting.label.appL")+" "+sortCnt+":";
								break;
							case "2":
								appCCnt++;
								sortCnt = ("0"+appCCnt).toString().right(2);
								sortCnt = i18next.t("approval:setting.label.appCL")+" "+sortCnt+":";
								break;
							case "3":
								appACnt++;
								sortCnt = ("0"+appACnt).toString().right(2);
								sortCnt = i18next.t("approval:setting.label.appAL")+" "+sortCnt+":";
								break;
							case "4":
								appVCnt++;
								sortCnt = ("0"+appVCnt).toString().right(2);
								sortCnt = i18next.t("approval:setting.label.appVL")+" "+sortCnt+":";
								break;
							}

							//console.log("appTexts[i]="+appTexts[i]);
							// [ Encoding(30) = 0 ]
							//if (ty[3].toString().trim()=="30")
							//console.log(ty[3])
							//if (ty[3]=="30")
							if (ty[3]=="0")  //  "0"을 암호화 하면 30임....   usercode 가 0 이면 보이지 않음
							{
								//console.log("30이네")
								appTextArray[iii]=sortCnt + " " + i18next.t("approval:setting.label.blank");
								appTitleArray[iii]=i18next.t("approval:setting.label.blank");

							}
							else
							{
								//console.log("appTexts[i]="+appTexts[iii]);
								//console.log("appTexts["+iii+"]="+appTexts[iii]);
								//console.log("iii="+iii +",="+ appTexts[iii]+"="+ appTexts[iii].inStr(":") );

								if (appTexts[iii].indexOf(":") >= 0)
								{
									appTextArray[iii]=sortCnt + appTexts[iii].split(":")[1];
									appTitleArray[iii]=appTitles[iii];
									html = html + "<span class='wysiwyg-color-red'>"+sortCnt+"</span>"+appTexts[iii].split(":")[1]+"&nbsp;&nbsp;>&nbsp;&nbsp; ";
								}

							}
						}

						$("#hiddenApprovalValue").val(appInfo[1]);
						$("#hiddenApprovalOldValue").val(appInfo[1]);
						$("#hiddenApprovalText").val(appTextArray.join("||"));
						$("#hiddenApprovalTitle").val(appTitleArray.join("||"));

						$("#hiddenApprovalGrp").val(grpSort);
						//console.log("appType="+appType);
						$("#hiddenAppType").val(appType);
						$("#hiddenAppSortChange").val(appSortChange);

						if (html != "")
						{
							html = html.substr(0,html.lastIndexOf("&nbsp;&nbsp;>&nbsp;&nbsp;") );
							$("#attendUsers").html(html);
						}


						//alert(data);
						return;
					},
					error:function(data){
						alert("err//"+data.message);
					}
				});  //기본 지정 결재선

				$.ajax({
					//url:"/module/usermodule/approval/common/getViewAuthList.do", // 기본열람권한 설정
					url:"/module/usermodule/approval/common/getViewAuthList", // 기본열람권한 설정
					type:"POST",
					dataType:"text",
					data:{ "sq": $("#sq").val(),"fq": $("#fs").val()},
					success:function(data){
						//console.log('getViewAuthList : '+data);
						var appInfo = data.split("|@|");

						$("#hiddenAuthViewValue").val(appInfo[0]);
						$("#hiddenAuthViewText").val(appInfo[1]);
						$("#hiddenAuthViewTitle").val(appInfo[2]);

						return;
					},
					error:function(data){
						alert("err//"+data.message);
					}
				});  //기본 열람권한 설정
				//32363939_32303334_권순문 상무_M2699_부산사직 1-4지구 주택 재건축정비사업>설계사>모바일부문111>권순문 상무
				//0:obsseq 1:userID 2:userNm   3:obsCode   4:Fullpath
				$.ajax({
					//url:"/module/UserModule/approval/common/getReceiveList.do", // 기본수신자 설정
					url:"/module/usermodule/approval/common/getReceiveList", // 기본수신자 설정
					type:"POST",
					dataType:"text",
					data:{ "sq": $("#sq").val(),"fq": $("#fs").val()},
					success:function(data){
						//console.log(" getReceiveList: " + data);
						var appInfo = data.split("|@|");
						$("#hiddenReceiveValue").val(appInfo[0]);
						$("#hiddenReceiveText").val(appInfo[1]);
						$("#hiddenReceiveTitle").val(appInfo[2]);
						$("#hiddenReceiveGroup").val(appInfo[3]);
						/*
						if (appInfo[3].split("||")[2].toString()=="0")
						{
							$("#hiddenReceiveValue").val("30_"+i18next.t("approval:workspace.label.All")+"_M30_M_"+appInfo[3].split("||")[5].toString());
						}
						 */
						//console.log("#hiddenReceiveValue="+$("#hiddenReceiveValue").val());
						//console.log("#hiddenReceiveText="+$("#hiddenReceiveText").val());
						//console.log("#hiddenReceiveTitle="+$("#hiddenReceiveTitle").val());
						//console.log("#hiddenReceiveGroup="+$("#hiddenReceiveGroup").val());
						return;
					},
					error:function(data){
						alert("err//"+data.message);
					}
				});  //기본 수신자 설정
				return;
		} ) // post end
		.done(function() {
			$("#editorTop").localize();
		})
		.fail(function() {
			//console.log("error");
		})
		.always(function() {
			$('#Editor_date').daterangepicker({
				//autoUpdateInput: false,
				singleDatePicker: true
				,locale: datepicker_locale
				,showDropdowns: true
			},
			function(start, end, label) {
				var sdate = start.format('YYYY-MM-DD')
				$("#Editor_date").val(sdate);
				try
				{
					//console.log("ConvertChangeDate("+sdate+")");
					ConvertChangeDate(sdate);
				}
				catch (e)
				{
				}
			});

			$("#tags").tagsinput({
				tagClass: 'small'
				,confirmKeys: [13, 32]
				,maxChars: 3000
				,trimValue: true
				//,itemValue: "id"
				//,itemText: "text"
			});
			//$("#tags").tagsinput("add",str_tag2);
			//fn_drawTagsCount();

			/*
			$("#tags").on('itemAdded', function(event) {
				//console.log('item added : '+event.item);
				console.log($("#tags").val())
			});
			*/
			//$("#tagDiv input").unbind();
			$("#tagDiv input").focus( function(event) {
				tagMode = "U";
				//console.log("tagMode="+tagMode);
			});
			$("#tags").on('itemAdded', function(event) {
				//console.log(event);
				fn_TagsInsert(event.item);
				fn_drawTagsCount();
			});
			$("#tags").on('itemRemoved', function(event) {
				//console.log(event);
				fn_TagsDelete(event.item);
				fn_drawTagsCount();
			});


			// GetFormTopDataLoad.do 작업없음..  리턴 값은 ""
			/*
			var rq=$.ajax ( {
				method: "POST",
				//url: "/Module/UserModule/approval/common/GetFormTopDataLoad.do",
				url: "/module/usermodule/approval/common/getFormTopDataLoad",
				data:{ "sq": $("#sq").val(),"fq": $("#fs").val()}
				} ) ;  // var rq=$.ajax

			//alert("1");\
			rq.done(function( msg ) {
				//console.log(msg);
			}) ; // rq.done
			*/
		})  ;

		//에디터 탑부분 호출 끝

		/*
		//업로드 부분 로딩하면서 내부에서 plUploaderInit() 호출하도록 처리함, 2017-04-14, 김영식
		plUploaderInit();
		*/
}

function fn_TagsInsert(item){
	var arr = new Array();
	//console.log(tagMode);
	if (tagMode=="U")
	{
		arr = uStrTag.split(",");
		arr.push(item);
		uStrTag = arr.join(",");
	}
	else
	{
		arr = fStrTag.split(",");
		arr.push(item);
		fStrTag = arr.join(",");
	}
	//console.log(uStrTag);
	//console.log(fStrTag);
}

function fn_TagsDelete(item){
	var arr = new Array();
	arr = uStrTag.split(",");
	var	arr2 = chkArrFilter(arr,item);
	arr = fStrTag.split(",");
	var	arr3 = chkArrFilter(arr,item);
	uStrTag = arr2.join(",");
	fStrTag = arr3.join(",");
	//console.log(uStrTag);
	//console.log(fStrTag);
}

function chkArrFilter(tArr,a){
	//var tArr = document.all.v.value.split(",");
	//var a = "가나다";
	var newArray = tArr.filter(function (item, index, array) {
		if (item==a)
		{
			return false;
		}
		else
		{
			return true;
		}
		//return !!~item.search(/[ab]+/);
	});
	return newArray;
}

//Tags 추가, 삭제시 카운트 갱신
function fn_drawTagsCount(){
	var tagCnt = 0
	if($("#tags").val() != ""){
		tagCnt = $("#tags").val().split(",").length
	}

	$("#tagsCount").text(tagCnt)
}

function createOption(appLine,appText,op){
	var lineArr = appLine.split("_");//[0]=결재그룹, [1]=결재기본순서, [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람), [5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재)
	var textArr = appText.split(":");//textArr[0]:결재구분, textArr[1]:결재자 이름
	var val, txt;
	var returnString;
	var strApptype="";
	switch (lineArr[4].toString())
	{
		case "1":
			strApptype = i18next.t("approval:setting.label.appL");
			break;
		case "2":
			strApptype = i18next.t("approval:setting.label.appCL");
			break;
		case "3":
			strApptype = i18next.t("approval:setting.label.appAL");
			break;
		case "4":
			strApptype = i18next.t("approval:setting.label.appVL");
			break;
		default :
			strApptype = i18next.t("approval:setting.label.appL");
	}
	if (lineArr[3].toString()=="0")
	{
		val = appLine + "_" + i18next.t("approval:setting.label.blank");
		txt = strApptype + " " + textArr[0] + ": "+ i18next.t("approval:setting.label.blank");
	}
	else
	{
		val = appLine + "_" + textArr[1];
		txt = strApptype + " " + textArr[0] + ": " + textArr[1];
	}

	if (op=="text")
	{
		returnString=txt;
	}
	else
	{
		returnString=val;
	}
	return returnString;
}

//스크롤 이동
function moveScrollTop(top){
	$('html,body').animate({scrollTop: top},500);

}

function onChangeLangEvent(){
		var ed;
		try{
			ed = tinyMCE.activeEditor;
			mainContents=$(tinymce.activeEditor.getBody()).html();
		}
		catch(e){
			//alert(1);
		}
		try
		{
			tinyMCE.activeEditor.remove();

		}
		catch (e)
		{
		}
		plUploaderInit();
		editorLoad2();
}

function onChangeLangEvent2(){
	var ed;
	try{
		ed = tinyMCE.activeEditor;
		mainContents=ed.getContent();

		tinyMCE.activeEditor.remove();
	}
	catch(e){
	}
	plUploaderInit();
	editorLoad();
}

function editorLoad(){

	var strLng=i18next.language;//"ko";
	if (strLng != undefined)
	{
		var lng=strLng.substr(0, 2);//"ko";
		editorLoads('elm1',lng,500,0);
		//editerOnload=true;
		$("#i18next_language").val(lng);
	}else{
		var lng="ko";
		editorLoads('elm1',lng,500,0);
		//editerOnload=true;
		$("#i18next_language").val(lng);
	}

}

function editorLoad2(){

	var strLng=i18next.language;//"ko";
	if (strLng != undefined)
	{
		var lng=strLng.substr(0, 2);//"ko";
		editorLoads('elm1',lng,500,0);
		if (!editerOnload)
		{
			try{
				mainContents=$(tinymce.activeEditor.getBody()).html();
				//editerOnload=true;
			}
			catch (e){}
		}

		try
		{
			tinyMCE.activeEditor.setContent(mainContents);
		}
		catch (e)
		{
			//alert("1-1");
		}
		//console.log(mainContents);
		$("#i18next_language").val(lng);
	}else{
		var lng="ko";
		editorLoads('elm1',lng,500,0);
		if (!editerOnload)
		{
			try{
				mainContents=$(tinymce.activeEditor.getBody()).html();
				//editerOnload=true;
			}
			catch (e){}
		}

		try
		{
			tinyMCE.activeEditor.setContent(mainContents);
		}
		catch (e)
		{
			//alert("1-1");
		}
		//editerOnload=true;
		$("#i18next_language").val(lng);
	}

}

function i18C(obj){
	i18next.loadNamespaces([obj], function(err, t){
		jqueryI18next.init(i18next, $);		//jquery 사용위해 선언
		$('.content').localize();				//다국어 반영
	});
}

//구분자
const GUBUN = "ZS";
function chkMultiItem(_target){
 //console.log(_target.className.split(GUBUN)[1]);
 //console.log(_target.className.split(GUBUN)[1].left(1));
	//구분자 R인지 C인지 확인
	switch (_target.className.split(GUBUN)[1].left(1).toUpperCase())
	{
	case "C":
		checkBoxCheck(_target);
		break;
	case "R":
		radioCheck(_target);
		break;
	default :
		break;

	}
}

function chkTextItem(_target, x, y){
	var strItem = tinymce.dom.DomQuery(_target).closest("TD");
	var menuBarH=$("#mceu_64").height();
	var toolBarH=$("#mceu_71").height();

	if (strItem[0].id.split("-")[1]!="0")
	{

		selectBoxDiv=strItem[0].id;

		$("#div_"+selectBoxDiv).css({"left" : x , "top" : y});
		$("#div_"+selectBoxDiv).show();
		$("#select_"+selectBoxDiv).focus();

		if (isMobile)
		{
			opt_len=$("#select_"+selectBoxDiv).children('option').length;
			$("#select_"+selectBoxDiv).css("height", "auto");
			$("#select_"+selectBoxDiv).attr("size",opt_len);
		}else{
			$("#select_"+selectBoxDiv).css("height", 33);
		}
	}
}

function LoadUserSelectItem(objID){
	var selectIndex=null;
	//var obj = tinymce.activeEditor.dom.select('#MCEInSelect_'+objID);
	var objTD = tinymce.dom.DomQuery(tinymce.activeEditor.dom.select("#" + objID));//.html(this.value);
	objTD.html("<select id='MCEInSelect_"+objID+"' name='MCEInSelect_"+objID+"'>"+$("#select_"+objID).html()+"</select>");
	//console.log($(obj).find("OPTION[Seleced]"));
	//console.log($(obj).find("OPTION[Seleced]").val());
}

function CloseUserSelectItem(objID){
	var selectIndex=null;
	var obj = tinymce.activeEditor.dom.select('#MCEInSelect_'+objID);
	var objTD = tinymce.dom.DomQuery(tinymce.activeEditor.dom.select("#" + objID));//.html(this.value);
	objTD.html($(obj).find("OPTION[Seleced]").val());
	//chkFormsTags();
	//console.log($(obj).find("OPTION[Seleced]"));
	//console.log($(obj).find("OPTION[Seleced]").val());

}


function checkBoxCheck(_target){

	var hiddenFiled="hidden_"+_target.id.split(GUBUN)[0]+"_ItemVal";


	//Text 클릭한 경우
	if(_target.id.split(GUBUN)[1].left(1)=="T"){
		//TD 셀렉트
		//_target = tinyMCE.activeEditor.dom.getPrev(_target, "TD");
		_target = tinymce.activeEditor.dom.select('#'+_target.className.split(' ')[0])[0];

	}

	//Text값에 따라 토글 처리
	if ( _target.innerText == "□"){
		_target.innerText = "■";
	}
	else{
		_target.innerText = "□";
	}

	var itemVal = "";
	//비슷한 체크박스들을 조회하여 밸류값 조회
	$(tinymce.activeEditor.dom.select("TD[ID*="+_target.id.split(GUBUN)[0]+GUBUN+"C]")).each(function(i,item){
		if(item.innerText == "■"){
			itemVal = itemVal + item.title + "|@|";
		}
	});

	//마지막 구분자 짤라줌
	itemVal = itemVal.substr(0,itemVal.lastIndexOf("|@|"));
	$("#"+hiddenFiled).val(itemVal);


}

function radioCheck(_target)
{
	var hiddenFiled="hidden_"+_target.id.split(GUBUN)[0]+"_ItemVal";

	//Text 클릭한 경우
	if(_target.id.split(GUBUN)[1].left(1)=="T"){
		//버튼 TD 셀렉트
		_target = tinymce.activeEditor.dom.select('#'+_target.className.split(' ')[0])[0];
	}

	//기존 선택된 RADIO는 모두 체크해제
	$(tinymce.activeEditor.dom.select("TD[ID*="+_target.id.split(GUBUN)[0]+GUBUN+"R]")).each(function(i,item){
		item.innerText = "○";
	});

	//내가 선택한 라디오만 체크
	_target.innerText = "●";

	var itemVal = "";
	//비슷한 체크박스들을 조회하여 밸류값 조회
	$(tinymce.activeEditor.dom.select("TD[ID*="+_target.id.split(GUBUN)[0]+GUBUN+"R]")).each(function(i,item){
		if(item.innerText == "●"){

			itemVal = itemVal + item.title;
			return false;
		}
	});
	$("#"+hiddenFiled).val(itemVal);
}

//결재선 선택--모달창이 아닌 문서작성창에서 선택했을경우
function fn_changeAppLine(jData){
	var valArr = []; //결재선 value
	var txtArr = []; //결재선 text
	var titleArr = []; //결재선 title
	var oldArr = []; //기존 결재선 정보 저장하는 배열
	var itemArr = []; // value split

	var newLineArr = []; //신규결재선 배열
	var mappingLineArr = [];//결재자 지정된 결재선 배열

	var idx=1; //결재정렬순서 처리

	//[0]=결재그룹, [1]=결재기본순서(1~N:기본 , 0:추가), [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람),
	//[5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료)
	//	li = li + "<option class='   load-line' title='"+jData.data[i].title+"' value='"+jData.data[i].value+"' data-oldvalue='"+jData.data[i].value+"'>"+jData.data[i].text+"</option>"

	//console.log("=======================jData======================");
	//console.log(jData);
	//console.log("=======================jData======================");

	for (i=0; i<jData.data.length ; i++ ){

		//결재선 추가시 신규 추가된 결재선은 별도 처리
		itemArr = jData.data[i].value.split("_");
		//console.log(itemArr);
		//결재순서 재배치
		itemArr[2] = idx;
		if(itemArr[1] == "0" && itemArr[3] == "0" ){
			return true;
		}else{
			idx++;
		}
		//console.log(itemArr);
		//console.log(itemArr[1] == "0" , itemArr[3] != "30" , itemArr[6] != "0"  );
		//console.log(itemArr);
		//신규결재선은 결재방 생성을 위해 별도 배열처리 ( 기본싸인타입이 0번[없음]인것 )
		if(itemArr[1] == "0" && itemArr[3] != noneAppUser && itemArr[6] != "0" ){
			newLineArr.push(itemArr.join("_"));
			//console.log("push");
		}

		//인원정보가 있으면
		if(itemArr[3] != noneAppUser){
			mappingLineArr.push(itemArr.join("_")+"||"+jData.data[i].text);
		}

		oldArr.push(jData.data[i].value);
		valArr.push(itemArr.join("_"));
		txtArr.push(jData.data[i].text);
		titleArr.push(jData.data[i].title);
	}

	//결재선 정보 입력
	$("#hiddenApprovalValue").val(valArr.join("||"));
	$("#hiddenApprovalOldValue").val(oldArr.join("||"));
	$("#hiddenApprovalText").val(txtArr.join("||"));
	$("#hiddenApprovalTitle").val(titleArr.join("||"));
	//console.log("===#hiddenApprovalValue===")
	//console.log($("#hiddenApprovalValue").val());
	//console.log($("#hiddenApprovalOldValue").val());
	//console.log("newLineArr.length ="+newLineArr.length +"//newLineArr[0][6]="+newLineArr);
	//신규결재선이 있는경우 && 기본 싸인타입 0(없음)이 아닌경우
	if(newLineArr.length > 0 && newLineArr[0][6] != "0" ){
		editerAppLineSet(newLineArr);
	}

	//<span id="attendUsers" data-i18n="approval:workspace.label.approvalLineDefault" class="vCenter ">결재선을 지정하여 주세요.</span>
	//맵핑된 인원이 있는경우

	//문서 작성화면 결재선 다국어 처리
	if( mappingLineArr.length>0 ){
		//$("#attendUsers").html()
		var html = "";
		mapArr = "";
		var title = "";
		var num = "";
		var numIdx = 0;
		var optVal = null ;
		$(mappingLineArr).each(function(i,item){
			mapArr  = item.split("||");

			numIdx = mapArr[1].indexOf(":");
			num = mapArr[1].substr(numIdx-3,numIdx-1);
			title = mapArr[1].split(":")[1];

			switch( mapArr[0].split("_")[4]){
				case "1" :
				html = html + "<span class='wysiwyg-color-red' data-i18n='approval:setting.label.appL'></span>";
			 	break;

				case "2" :
				html = html + "<span class='wysiwyg-color-red' data-i18n='approval:setting.label.appCL'></span>";
				break;

				case "3" :
				html = html + "<span class='wysiwyg-color-red' data-i18n='approval:setting.label.appAL'></span>";
				break;

				case "4" :
				html = html + "<span class='wysiwyg-color-red' data-i18n='approval:setting.label.appVL'></span>";
				break;

			}

			html = html + ""+num+title+"&nbsp;&nbsp;>&nbsp;&nbsp; ";
		});
		//console.log(html);
		html = html.substr(0,html.lastIndexOf("&nbsp;&nbsp;>&nbsp;&nbsp;") );
		$("#attendUsers").html(html);
	}else{
		$("#attendUsers").html("<span data-i18n='approval:workspace.label.approvalLineDefault'></span>");
	}

	$("#attendUsers").localize();
}

