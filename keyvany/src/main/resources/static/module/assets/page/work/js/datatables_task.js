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
var t_task;

function makeDataTable_project(){
	var t1_Id = "#datatable_task";
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
		lengthMenu = [customLen,30,50,100]
	}


	t_task = $(t1_Id).DataTable({
        "processing" : true
        ,"serverSide" : true
        ,"ajax": {
            //"url": "/Module/UserModule/Work/json/getDataTable_task.page",
        	"url": "/module/usermodule/work/json/getdatatabletask",
            "type": "POST"
        }
		, stateSave: true //datatable 페이징/검색 cache 사용(history.back 을 위해 사용, Menu 클릭시 localStoge 삭제)

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
				//3.업무명
				"targets": [3],
				"orderable": true,
				"width": "300px"
			},{
				//4.진척율
				"targets": [4],
				"orderable": true,
				"width": "100px",
				"className" : "dt-center"
			},{
				//5.우선순위
				"targets": [5],
				"orderable": true,
				"width": "120px",
				"className" : "dt-center"
			},{
				//6.시작일
				"targets": [6],
				"orderable": true,
				"width": "100px",
				"className" : "dt-center"
			},{
				//7.처리기한
				"targets": [7],
				"orderable": true,
				"width": "110px",
				"className" : "dt-center"
			},{
				//8.최종수정일
				"targets": [8],
				"orderable": true,
				"width": "120px",
				"className" : "dt-center"
			},{
				//9.진행상태
				"targets": [9],
				"orderable": true,
				"width": "110px",
				"className" : "dt-center"
			},{
				//10.참여인원
				"targets": [10],
				"orderable": false,
				"width": "200px"
			},{
				//마지막 컬럼 정렬 안되는 문제로 빈 컬럼 추가
				"targets": [11],
				"visible": false
			}
		]
		,keys: true
		,"order": [ 8, "desc" ] //기본 정렬 역순 출력(필수)
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
			//최초 로딩시 모바일 UI 적용
			//changeDTUiForMobile();

			/*
			var projSel = ""
			projSel += "<select class='form-control dtableSelectBox'>"
			projSel += "	<option value=''>프로젝트명</option>"
			projSel += "	<option value=''>우리은행 구디점</option>"
			projSel += "	<option value=''>여의도 공원 녹지 조정</option>"
			projSel += "</select>";
			$("#datatable_task_filter").append(projSel);

			var projSel = ""
			projSel += "<select class='form-control dtableSelectBox'>"
			projSel += "	<option value=''>우선순위</option>"
			projSel += "	<option value=''>낮음</option>"
			projSel += "	<option value=''>보통</option>"
			projSel += "</select>";
			$("#datatable_task_filter").append(projSel);
			*/
			//목록수 조정 하단이동 추가
			listSize=$("#datatable_task_info");
			$("#datatable_task_length").insertBefore(listSize);
		}
		,"buttons":[
			{	"text": '<i class="icon-cog3 position-left"></i><span data-i18n="work:btn.projectMgr"></span>',
				"className": 'btn btn-success btn-xs btn_projectMgr'
			},
			{	"text": '<i class="icon-plus3 position-left" ></i><span data-i18n="btn.insert">등록</span>',
				"className": 'btn btn-success btn-xs btn_taskWrite'
			}
		]
    });

	//자동검색 수동으로 변경
	$(t1_Id+"_filter input").unbind();
    $(t1_Id+"_filter input").keyup(function(e){

		if(e.keyCode==13){
			t_task.search( this.value ).draw();
			this.blur();
		}
    });


	// 데이터테이블 필터옵션 다국어 처리
	$(t1_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]work:datatable.filter");


	//row 클릭시 실행
	$(t1_Id+' tbody').on( 'click', 'tr', function () {
		if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
			var sn = t_task.row( $(this)).data()[1];
			loadTaskDetail(sn);
			$("body").scrollTop(0);

			var hData = {
				"data" : {
					"sn" : sn
				}
			}
			SetHistory(hData, "loadTaskDetail");
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
		$("#datatable_task_wrapper > div.datatable-header > div.dt-buttons > a").css("display","none");
	}

}

makeDataTable_project();