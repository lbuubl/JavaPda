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

function makeDataTable_t1(){
	var t1_Id = "#datatable_weekReport";
    // Table setup
    // ------------------------------

	// Setting datatable defaults
    $.extend( $.fn.dataTable.defaults, {
        autoWidth: false,
		dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
			emptyTable: '<span data-i18n="datatable.option.emptyTable"></span>',
            search: '<span data-i18n="weekReport:datatable.option.filter"></span> _INPUT_',
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


	t1 = $(t1_Id).DataTable({
        "processing" : true
        ,"serverSide" : true
        ,"ajax": {
            //"url": "/Module/UserModule/WeekReport/json/getDataTable_weekReport.do",
            "url": "/module/usermodule/weekreport/json/getDataTableWeekReport",
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
				//0.보고일
				"targets": [0],
				"orderable": true,
				"className": "notMove",
				//"width": "100px",
				"className" : "dt-center"
			},{
				//1.SeqNo
				"width" : "0px",
				"targets": [1],
				"visible": false,
				"searchable": false
			},{
				//2.계획
				"targets": [2],
                "orderable": true,
				//"width": "100px",
				"className" : "dt-center"
			},{
				//3.실시
				"targets": [3],
				"orderable": true,
				//"width": "100px",
				"className" : "dt-center"
			},{
				//4.대비
				"targets": [4],
				"orderable": true,
				//"width": "100px",
				"className" : "dt-center"
			},{
				//5.금주업무내용
				"targets": [5],
				"orderable": false,
				//"width": "200px"

				"className" : "FixColnum"
			},{
				//6.차주업무내용
				"targets": [6],
				"orderable": false,
				//"width": "200px"
				"className" : "FixColnum"
			},{
				//7.비고
				"targets": [7],
				"orderable": false,
				"className" : "FixColnum"
				//"width": "200px"
			},{
				//8.첨부
				"targets": [8],
				"orderable": false,
				//"width": "100px",
				"className" : "dt-center"
			},{
				//9.제출
				"targets": [9],
				"orderable": true,
				//"width": "100px",
				"className" : "dt-center"
			},{
				//마지막 컬럼 정렬 안되는 문제로 빈 컬럼 추가
				"targets": [10],
				"visible": false
			}
		]
		,keys: true
		,"order": [ 0, "desc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {

			t1.column(6, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {

				cell.innerHTML = "<span>"+ cell.innerHTML+"</span>";
			});

			t1.column(5, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {

				cell.innerHTML = "<span>"+ cell.innerHTML+"</span>";
			});
			//page load시 previeus, next 버튼 등 한국어 처리
			$('.dataTables_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();


			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {

		}
		,"buttons":[
			{	"text": '<i class="icon-plus3 position-left" ></i><span data-i18n="btn.insert">등록</span>',
				"className": 'btn btn-success btn-xs btn_reportWrite'
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
	$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]weekReport:datatable.option.filter");

	//row 클릭시 실행
	$(t1_Id+' tbody').on( 'click', 'tr', function () {
		if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
			var sn = t1.row( $(this)).data()[1];
			fn_loadReportDetail(sn);
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
		$("#datatable_weekReport_wrapper > div.datatable-header > div.dt-buttons > a").css("display","none");
	}

}