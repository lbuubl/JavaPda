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
var t_visitHistory;

function makeDataTable_project(){
	var t1_Id = "#datatable_visitHistory";

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
		/*
		var customMinus = 300;
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]
		*/
		lengthMenu = [10,30,50,100]
	}

	//console.log($("#frmVisitHistoryList").serialize());
	var dt_param = $("#frmVisitHistoryList").serialize()
	t_visitHistory = $(t1_Id).DataTable({
         "processing" : true
        ,"serverSide" : true
        ,"ajax": {
        	"url" : "/module/sysmodule/menustats/getDataTableVisitHistory",
            //"url" : "/Module/SysModule/MenuStats/getDataTable_visitHistory.do",
            "type" : "POST",
			"data" : function(d){
				d.type			= $("#frmVisitHistoryList input[name='type']").val();
				d.yyyy			= $("#frmVisitHistoryList input[name='yyyy']").val();
				d.mm			= $("#frmVisitHistoryList input[name='mm']").val();
				d.user			= $("#frmVisitHistoryList input[name='user']").val();
				d.menu			= $("#frmVisitHistoryList input[name='menu']").val();
				d.pc_mobile		= $("#frmVisitHistoryList input[name='pc_mobile']").val();
				d.sDate			= $("#frmVisitHistoryList input[name='sDate']").val();
				d.eDate			= $("#frmVisitHistoryList input[name='eDate']").val();
				d.sch_userNm	= $("#frmVisitHistoryList input[name='sch_userNm']").val();
				d.sch_menuNm	= $("#frmVisitHistoryList input[name='sch_menuNm']").val();
			}
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
                className: 'control',
                orderable: false,
                targets: -1
            },{
				//0.번호
				"targets": [0],
				"orderable": false,
				"className": "notMove",
				"width": "60px",
				"className" : "dt-center"
			},{
				//1.접속일시
				"targets": [1],
                "orderable": true,
				"width": "180px",
				"className" : "dt-center"
			},{
				//2.사용자명
				"targets": [2],
				"orderable": true,
				"width": "150px",
				"className" : "dt-center"
			},{
				//3.메뉴명
				"targets": [3],
				"orderable": true,
				"className" : "dt-center"
			},{
				//3.PC/모바일
				"targets": [4],
				"orderable": true,
				"width": "150px",
				"className" : "dt-center"
			},{
				//마지막 컬럼 정렬 안되는 문제로 빈 컬럼 추가
				"targets": [5],
				"visible": false,
				"width": "0px"
			}
		]
		,keys: true
		,"order": [ 1, "desc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {

			//page load시 previeus, next 버튼 등 한국어 처리
			$('.dataTables_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();

			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {

			//console.log("complite");
		}
		,"buttons":[{
		}]
    });

	//자동검색 수동으로 변경
	$(t1_Id+"_filter input").unbind();
    $(t1_Id+"_filter input").keyup(function(e){

		if(e.keyCode==13){
			t_visitHistory.search( this.value ).draw();
			this.blur();
		}
    });

	//row 클릭시 실행
	/*
	$(t1_Id+' tbody').on( 'click', 'tr', function () {
		var sn = t_visitHistory.row( $(this)).data()[1];
		openProjectEdit(sn); //수정으로 이동
	});
	*/


    // External table additions (필수)
    // ------------------------------

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });


}

makeDataTable_project();