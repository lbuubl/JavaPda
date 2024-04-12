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
var t_1;

function fn_loadYearList(){
	var t1_Id = "#datatable_yearList";
	// Table setup
	// ------------------------------

	// Setting datatable defaults
	$.extend( $.fn.dataTable.defaults, {
		autoWidth: false,
		dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
		language: {
			emptyTable: '<span data-i18n="datatable.option.emptyTable"></span>',
			search: '<span data-i18n="work:datatable.filter"></span> _INPUT_',
			lengthMenu: '<span data-i18n="datatable.option.show"></span> _MENU_',
			paginate: { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="datatable.option.next"></button>'}
		},
		drawCallback: function () {
			$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');

			if(!$(t1_Id).parent().hasClass("table-responsive")){
				$(t1_Id).wrap("<div class='table-responsive'></div>");
			}
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
		var customMinus = 300;
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [projectKindCnt,30,50,100]
	}


	t_1 = $(t1_Id).DataTable({
		"processing" : true
		,"serverSide" : true
		,"ajax": {
			//"url": "/Module/UserModule/SalesPlanMng/json/getDataTable_yearList.do",
			"url": "/module/usermodule/salesplanmng/json/getdatatableYearlist",
			"type": "POST"
		}
		//, stateSave: true //datatable 페이징/검색 cache 사용(history.back 을 위해 사용, Menu 클릭시 localStoge 삭제)

		,"lengthMenu": [lengthMenu, lengthMenu]
		,"pageLength":projectKindCnt
		,"pagingType": "simple"
		,"responsive": {
			details: {
				type: 'column',
				target: -1
			}
		}
		,"searching":false
		,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정  (No, SeqNo, 프로젝트명, 시작일, 종료일, 등록일, 등록자)
			 {
				className: 'control',
				orderable: false,
				targets: -1
			},{
				//0.년도
				"targets": [0],
				"orderable": true,
				"className": "notMove",
				"width": "60px",
				"className" : "dt-center"
			},{
				//1.확정매출
				"targets": [1],
				"orderable": true,
				"className": "notMove",
				"width": "100px",
				"className" : "dt-right"
			},{
				//2.신규매출
				"targets": [2],
				"orderable": true,
				"className": "notMove",
				"width": "100px",
				"className" : "dt-right"
			},{
				//3.매출 합
				"targets": [3],
				"orderable": true,
				"className": "notMove",
				"width": "100px",
				"className" : "dt-right"
			},{
				//4.증감율(%)
				"targets": [4],
				"orderable": true,
				"className": "notMove",
				"width": "100px",
				"className" : "dt-right"
			},{
				//5.실적
				"targets": [5],
				"orderable": true,
				"className": "notMove",
				"width": "100px",
				"className" : "dt-right"
			},{
				//6.달성율
				"targets": [6],
				"orderable": true,
				"className": "notMove",
				"width": "100px",
				"className" : "dt-right"
			},{
				//마지막 컬럼 정렬 안되는 문제로 빈 컬럼 추가
				"targets": [7],
				"visible": false
			}
		]
		,keys: true
		,"order": [ 0, "desc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {

			//page load시 previeus, next 버튼 등 한국어 처리
			$('.dataTables_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();

			//noImage 처리
			$(t1_Id+"_wrapper img").each(function(){
			   $(this).error(function(){
				 $(this).attr('src', '/resources/module/assets/images/placeholder.jpg');
			   });
			})

			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {

			//목록수 조정 하단이동 추가
			listSize=$(t1_Id+"_info");
			$(t1_Id+"_length").insertBefore(listSize);

			$(t1_Id+' tbody tr:eq(0)').click();
			$(t1_Id+' tbody tr:eq(0)').addClass('selected');
		}
		,"buttons":[
		]
	});

	//자동검색 수동으로 변경
	$(t1_Id+"_filter input").unbind();
	$(t1_Id+"_filter input").keyup(function(e){

		if(e.keyCode==13){
			t_1.search( this.value ).draw();
			this.blur();
		}
	});


	// 데이터테이블 필터옵션 다국어 처리
	$(t1_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]work:datatable.filter");


	//row 클릭시 실행
	$(t1_Id+' tbody').on( 'click', 'tr', function () {
		if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
			var yyyy = t_1.row( $(this)).data()[0];
			fn_loadYearDetail(yyyy);
			fn_loadMonthDetail(yyyy);

			var oTr = $(this).closest("tr");
			oTr.siblings().removeClass("selected");
			oTr.addClass("selected");
		}
	});


	// External table additions (필수)
	// ------------------------------

	// Enable Select2 select for the length option
	$('.dataTables_length select').select2({
		minimumResultsForSearch: Infinity,
		width: 'auto'
	});
}


