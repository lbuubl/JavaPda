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
var t3;
var t3_Id = "#datatable_gongguList";


    // Table setup
    // ------------------------------

	// Setting datatable defaults
    $.extend( $.fn.dataTable.defaults, {
        "autoWidth": false,
		dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
		//dom: '<"datatable-header"fBl><"datatable-footer"ip>',
        language: {
			emptyTable: '<span data-i18n="datatable.option.emptyTable"></span>',
            search: '<span data-i18n="contractMgr:datatable.option.filter"></span> _INPUT_',
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
		var customMinus = 500;
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]
		*/
		lengthMenu = [10,30,50,100]
	}


	t3 = $(t3_Id).DataTable({
         "processing" : true
        ,"serverSide" : true
        ,"ajax": {
			//"url": "/Module/UserModule/ContractMgr/json/getDataTable_gongguList.do",
			"url": "/module/usermodule/contractmgr/getDataTableGongguList",
			"data" : function (d) {
				d.gungguStat = $("#sch_gongguState").val();
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
				"width": "60px",
				"orderable": false,
				"className" : "dt-center notMove "
			},{
				//1.일련번호
				"targets": [1],
				"visible": false,
				"width": "0px"
			},{
				//1.프로젝트명
				"targets": [2],
				"orderable": true,
				"className" : "dt-center"
			},{
				//2.상태
				"targets": [3],
				"width": "100px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//3.선택
				"targets": [4],
				"width": "80px",
				"orderable": false,
				"className" : "dt-center"
			},{
				//4.빈컬럼
				"targets": [5],
				"visible": false,
				"width": "0px"
			}
		]
		,keys: true
		,"order": [ 1, "desc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {

			//page load시 previeus, next 버튼 등 한국어 처리
			$(t3_Id+'_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();

			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {
			//최초 로딩시 모바일 UI 적용
			//changeDTUiForMobile();
			listSize=$(t3_Id+"_info");
			$(t3_Id+"_length").insertBefore(listSize);

			//계약상태 조건
			$(t3_Id+"_filter").append($('#tableFilter_gongguState').detach().show());
			$("#sch_gongguState").on("change", function(){
				t3.ajax.reload(null, true);
			});

		}
		,"buttons":[
		]
    });

	//자동검색 수동으로 변경
	$(t3_Id+"_filter input").unbind();
    $(t3_Id+"_filter input").keyup(function(e){

		if(e.keyCode==13){
			t3.search( this.value ).draw();
			this.blur();
		}
    });


	// 데이터테이블 필터옵션 다국어 처리
	$(t3_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]contractMgr:datatable.option.filter");


	//row 클릭시 실행
	/*
	$(t3_Id+' tbody').on( 'click', 'tr', function () {
		//row 선택
		$(this).addClass('selected');
		$(this).siblings().removeClass('selected');
	});
	*/

	//row 더블클릭
	/*
	$(t3_Id+' tbody').on( 'dblclick', 'tr', function () {
		if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
			var sn = t3.row( $(this)).data()[1];
			if(sn != ""){
				//console.log(sn)
				fn_loadChangedWrite(sn)
			}
		}
	});
	*/


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
