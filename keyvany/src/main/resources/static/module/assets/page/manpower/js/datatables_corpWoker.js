/* ------------------------------------------------------------------------------
*
*  # Datatables data sources
*
*  Specific JS code additions for datatable_data_sources.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */
var t1;


var t1_Id = "#dataList_corpWoker";

// Table setup
// ------------------------------

// Setting datatable defaults
$.extend( $.fn.dataTable.defaults, {
	autoWidth: false,
	dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
	language: {
		emptyTable: '<span data-i18n="datatable.option.emptyTable"></span>',
		search: '<span data-i18n="manpower:datatable.option.filter"></span> _INPUT_',
		lengthMenu: '<span data-i18n="datatable.option.show"></span> _MENU_',
		paginate: { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="datatable.option.next"></button>'}
	},
	drawCallback: function () {
		$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');

		/*
		if(!$(t1_Id).parent().hasClass("table-responsive")){
			$(t1_Id).wrap("<div class='table-responsive'></div>");
		}
		*/
	},
	preDrawCallback: function() {
		$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
	}
});


var lengthMenu;

// show list 설정
if(isMobile){
	lengthMenu = [10,30,50,100]
}else{
	var customMinus = 200;
	var customLen = parseInt(($(".page-container").height()-customMinus)/41)-1
	lengthMenu = [customLen,30,50,100]
}


t1 = $(t1_Id).DataTable({
	"processing" : true
	,"serverSide" : true
	,"ajax": {
		//"url": "/Module/UserModule/Manpower/json/getDataTable_corpWorker.do",
		"url": "/module/usermodule/manpower/getDataTableCorpWorker",
		"data" : function (d) {
		},
		"type": "POST"
	}
	,"lengthMenu": [lengthMenu, lengthMenu]
	,"pagingType": "simple"
	,"responsive": {
		details: {
			type: 'column',
			target: -1
		}
	}
	,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정  (No, SeqNo, 프로젝트명, 시작일, 종료일, 등록일, 등록자)
		{
			//0.번호
			"targets": [0],
			"width" : "50px",
			"orderable": false,
			"className" : "dt-center notMove "
		},{
			//1.SeqNo
			"width" : "0px",
			"targets": [1],
			"visible": false,
		},{
			//2.업체명
			"targets": [2],
			"visible": true,
			"className" : ""
		},{
			//3.이름
			"targets": [3],
			"width": "120px",
			"orderable": true,
			"className" : "dt-center"
		},{
			//4.등급
			"targets": [4],
			"width": "120px",
			"orderable": true,
			"className" : "dt-center"
		},{
			//5.분야
			"targets": [5],
		    "width": "130px",
			"orderable": true,
			"className" : "dt-center"
		},{
			//6.연락처
			"targets": [6],
			"width": "120px",
			"orderable": false,
			"className" : ""
		},{
			//마지막 컬럼 정렬 안되는 문제로 빈 컬럼 추가
			"targets": [7],
			"visible": false
		}
	]
	//,keys: true
	,keys: {
		focus: ':eq(0)' //페이지 이동시 첫번째 row로 포커싱(필수)
	}

	,"order": [ 2, "desc" ] //기본 정렬 역순 출력(필수)
	,"infoCallback": function( settings, start, end, max, total, pre ) {

		t1.column(5, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
				cell.innerHTML = "<span>"+cell.innerHTML+"</span>" ;
			});

		//page load시 previeus, next 버튼 등 한국어 처리
		$('.dataTables_wrapper').localize();

		var api = this.api();
		var pageInfo = api.page.info();


		//리턴값 없는경우 좌측하단 데이터 정보 안나옴
		return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
	}
	,"initComplete": function( settings, json ) {


		//목록수 조정 하단이동 추가
		listSize=$("#dataList_corpWoker_info");
		$("#dataList_corpWoker_length").insertBefore(listSize);

	}
	,"buttons":[
		{	"text": '<i class="icon-plus2 position-left" ></i><span data-i18n="btn.insert">등록</span>',
			"className": 'btn btn-success btn-xs btn_addCorpWoker'
		}
	]
});

//자동검색 수동으로 변경
$(t1_Id+"_filter input").unbind();
$(t1_Id+"_filter input").keyup(function(e){

	if(e.keyCode==13){
		t1.search( this.value ).draw();
		this.blur();
	}
});

// 데이터테이블 필터옵션 다국어 처리
$(t1_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]manpower:datatable.option.placeHolder");

//row 클릭시 실행
$(t1_Id+' tbody').on( 'click', 'td', function () {

	if(!$(this).hasClass("dataTables_empty")){

		var sn = t1.row($(this)).data()[1];
		fn_openCorpWorkerWrite(sn);

		//row 선택
		$(this).closest("tr").addClass('selected');
		$(this).closest("tr").siblings().removeClass('selected');

	}
});



// External table additions (필수)
// ------------------------------

// Enable Select2 select for the length option
$('.dataTables_length select').select2({
	minimumResultsForSearch: Infinity,
	width: 'auto'
});



//권한에 따른 글쓰기 버튼 숨기기
if(aa!="yes"){
	//$("#datatable_task_wrapper > div.datatable-header > div.dt-buttons > a").css("display","none");
	$("#modal_corpWokerList .btn_addCorpWoker").hide();
}

