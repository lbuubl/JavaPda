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
var t2;
var t2_Id = "#datatable_changedList";


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
		var customMinus = 300;
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]
	}


	t2 = $(t2_Id).DataTable({
         "processing" : true
        ,"serverSide" : true
        ,"ajax": {
			//"url": "/Module/UserModule/ContractMgr/json/getDataTable_changedList.do",
			"url": "/module/usermodule/contractmgr/getDataTableChangedList",
			"data" : function (d) {
				d.cSn = $("#contractDetailForm input[name='sn']").val();
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
				//0.차수
				"targets": [0],
				"orderable": true,
				"width": "80px",
				"className" : "dt-center notMove "
			},{
				//1.일련번호
				"targets": [1],
				"visible": false,
				"width": "0px"
			},{
				//2.변경계약일
				"targets": [2],
				"width": "100px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//3.계약시작일
				"targets": [3],
				"width": "110px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//4.계약종료일
				"targets": [4],
				"width": "110px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//5.변경전 계약금액
				"targets": [5],
				"width": "110px",
				"orderable": true,
				"className" : "dt-right"
			},{
				//6.변경후 계약금액
				"targets": [6],
				"width": "110px",
				"orderable": true,
				"className" : "dt-right"
			},{
				//7.증감액
				"targets": [7],
				"width": "11z0px",
				"orderable": true,
				"className" : "dt-right"
			},{
				//8.변경사유
				"targets": [8],
				"orderable": false,
				"className" : "dt-center"
			},{
				//9.빈컬럼
				"targets": [9],
				"visible": false,
				"width": "0px"
			}
		]
		,keys: true
		,"order": [ 0, "desc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {

			//page load시 previeus, next 버튼 등 한국어 처리
			$(t2_Id+'_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();

			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {
			//페이징 사이즈 이동
			listSize=$(t2_Id+"_info");
			$(t2_Id+"_length").insertBefore(listSize);
		}
		,"buttons":[
			{	text: '<i class="icon-plus22 position-left" gubun="'+t2_Id+'"></i><span data-i18n="contractMgr:btn.changeContrace">계약변경</span>',
				className: 'btn btn-success btn-xs btn_changeContract'
			}		]
    });

	//자동검색 수동으로 변경
	$(t2_Id+"_filter input").unbind();
    $(t2_Id+"_filter input").keyup(function(e){

		if(e.keyCode==13){
			t2.search( this.value ).draw();
			this.blur();
		}
    });


	// 데이터테이블 필터옵션 다국어 처리
	$(t2_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]contractMgr:datatable.option.filter");


	//row 클릭시 실행
	/*
	$(t2_Id+' tbody').on( 'click', 'tr', function () {
		//row 선택
		$(this).addClass('selected');
		$(this).siblings().removeClass('selected');
	});
	*/

	//row 더블클릭
	$(t2_Id+' tbody').on( 'click', 'tr', function () {

		//row 선택
		$(this).addClass('selected');
		$(this).siblings().removeClass('selected');

		if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
			var sn = t2.row( $(this)).data()[1];
			if(sn != ""){
				//console.log(sn)
				fn_loadChangedWrite(sn)
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
