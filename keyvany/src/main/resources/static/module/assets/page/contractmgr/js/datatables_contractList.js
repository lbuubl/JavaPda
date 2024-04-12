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
var t1_Id = "#datatable_contractList";

function makeDataTable_t1(){

    // Table setup
    // ------------------------------

	// Setting datatable defaults
    $.extend( $.fn.dataTable.defaults, {
        "autoWidth": false,
		dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
		//dom: '<"datatable-header"fBl><"datatable-footer"ip>',
        language: {
			emptyTable: '<span data-i18n="datatable.option.emptyTable"></span>',
            search: '<span data-i18n="contractMgr:datatable.option.contractNm"></span> _INPUT_',
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
		var customMinus = 300;
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]
	}


	t1 = $(t1_Id).DataTable({
         "processing" : true
        ,"serverSide" : true
        ,"ajax": {
			//"url": "/Module/UserModule/ContractMgr/json/getDataTable_contractList.do",
			"url": "/module/usermodule/contractmgr/getDataTableContractList",
			"data" : function (d) {
				d.contractState = $("#sch_contractState").val();
				d.contractSDate	= $("#sch_contractSDate").val();
				d.contractEDate	= $("#sch_contractEDate").val();
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
        ,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정
			 {
                className: 'control',
                orderable: false,
                targets: -1
            },{
				//0.번호
				"targets": [0],
				"orderable": false,
				"width": "50px",
				"className" : "dt-center notMove "
			},{
				//1.일련번호
				"targets": [1],
				"visible": false,
				"width": "0px"
			},{
				//2.계약명
				"targets": [2],
				"orderable": true,
				"className" : "dt-center FixColnum"
			},{
				//3.상태
				"targets": [3],
				"width": "80px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//4.계약시작
				"targets": [4],
				"width": "110px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//5.계약종료
				"targets": [5],
				"width": "110px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//6.계약일
				"targets": [6],
				"width": "100px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//7.계약금액
				"targets": [7],
				"width": "130px",
				"orderable": true,
				"className" : "dt-right"
			},{
				//8.선급금액
				"targets": [8],
				"width": "110px",
				"orderable": true,
				"className" : "dt-right"
			},{
				//9.총 기성신청금
				"targets": [9],
				"width": "140px",
				"orderable": true,
				"className" : "dt-right"
			},{
				//10.총 입금액
				"targets": [10],
				"width": "110px",
				"orderable": true,
				"className" : "dt-right"
			},{
				//11.기성율
				"targets": [11],
				"width": "90px",
				"orderable": true,
				"className" : "dt-right"
			},{
				//12.남은금액
				"targets": [12],
				"width": "110px",
				"orderable": true,
				"className" : "dt-right"
			},{
				//13.메모
				"targets": [13],
				"width": "50px",
				"orderable": false,
				"className" : "dt-center"
			},{
				//14.빈컬럼
				"targets": [14],
				"visible": false,
				"width": "0px"
			}
		]
		,keys: true
		,"order": [ 6, "desc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {

			//Sum Row 배경지정
			var fristRow = $(t1_Id).find("tbody tr:eq(0)");
			if(! fristRow.hasClass("dataTables_empty")){
				fristRow.addClass("tr-sum")
			}

			//page load시 previeus, next 버튼 등 한국어 처리
			$(t1_Id+'_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();

			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {
			//페이징 사이즈 이동
			listSize=$(t1_Id+"_info");
			$(t1_Id+"_length").insertBefore(listSize);

			//계약상태 조건
			$(t1_Id+"_filter").append($('#tableFilter_contractState').detach().show());
			$("#sch_contractState").on("change", function(){
				t1.ajax.reload(null, true);
			});

			//계약기간 조건
			$(t1_Id+"_filter").append($('#tableFilter_contractDate').detach().show());

		}
		,"buttons":[
			{	text: '<i class="icon-plus22 position-left" gubun="'+t1_Id+'"></i><span data-i18n="contractMgr:btn.addContrace">계약등록</span>',
				className: 'btn btn-success btn-xs btn_addContract'
			}		]
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
	$(t1_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]contractMgr:datatable.option.contractNm");


	//row 클릭시 실행
	/*
	$(t1_Id+' tbody').on( 'click', 'tr', function () {
		//row 선택
		$(this).addClass('selected');
		$(this).siblings().removeClass('selected');
	});
	*/

	//row 더블클릭
	//$(t1_Id+' tbody').on( 'dblclick', 'tr', function () {
	$(t1_Id+' tbody').on( 'click', 'tr', function () {
		//row 선택
		$(this).addClass('selected');
		$(this).siblings().removeClass('selected');

		if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
			var sn = t1.row( $(this)).data()[1];
			if(sn != ""){
				//console.log(sn)
				fn_viewContract(sn)
			}
		}

	});



    // External table additions (필수)
    // ------------------------------

    // Add placeholder to the datatable filter option
    //$('.dataTables_filter input[type=search]').attr('placeholder','Type to filter...');

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });

	/*
	if(AK != "A" && AK != "M"){
		$(".checkedFileDelBtn").remove();
	}
	*/

}