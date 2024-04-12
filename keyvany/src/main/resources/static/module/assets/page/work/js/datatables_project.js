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
var t_project;

function makeDataTable_project(){
	var t1_Id = "#datatable_project";
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


	t_project = $(t1_Id).DataTable({
         "processing" : true
        ,"serverSide" : true
        ,"ajax": {
            //"url": "/Module/UserModule/Work/json/getDataTable_project.page",
        	"url": "/module/usermodule/work/json/getdatatableproject",
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
				//1.SeqNo
				"width" : "0px",
				"targets": [1],
				"visible": false,
				"searchable": false
			},{
				//2.프로젝트명
				"targets": [2],
                "orderable": true
			},{
				//3.시작일
				"targets": [3],
				"orderable": true,
				"width": "100px",
				"className" : "dt-center"
			},{
				//4.종료일
				"targets": [4],
				"orderable": true,
				"width": "100px",
				"className" : "dt-center"
			},{
				//5.등록일
				"targets": [5],
				"orderable": true,
				"width": "100px",
				"className" : "dt-center"
			},{
				//6.등록자
				"targets": [6],
				"orderable": false,
				"width": "90px",
				"className" : "dt-center"
			},{
				//마지막 컬럼 정렬 안되는 문제로 빈 컬럼 추가
				"targets": [7],
				"visible": false
			}
		]
		,keys: true
		,"order": [ 5, "desc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {

			//page load시 previeus, next 버튼 등 한국어 처리
			$('.dataTables_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();

			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {
			//최초 로딩시 모바일 UI 적용
			//changeDTUiForMobile();

			//목록수 조정 하단이동 추가
			listSize=$("#dataList_info");
			$("#dataList_length").insertBefore(listSize);
		}
		,"buttons":[
			{	"text": '<i class="icon-plus3 position-left" ></i><span data-i18n="btn.insert">등록</span>',
				"className": 'btn btn-success btn-xs btn_projectWrite'
			}
		]
    });

	//자동검색 수동으로 변경
	$(t1_Id+"_filter input").unbind();
    $(t1_Id+"_filter input").keyup(function(e){

		if(e.keyCode==13){
			t_project.search( this.value ).draw();
			this.blur();
		}
    });


	// 데이터테이블 필터옵션 다국어 처리
	$(t1_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]work:datatable.filter");


	//row 클릭시 실행
	$(t1_Id+' tbody').on( 'click', 'tr', function () {
		if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
			var sn = t_project.row( $(this)).data()[1];
			openProjectEdit(sn); //수정으로 이동
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
		$("#datatable_project_wrapper > div.datatable-header > div.dt-buttons > a").css("display","none");
	}

}

makeDataTable_project();