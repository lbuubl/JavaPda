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

function makeDataTable_t2(){
	var t2_Id = "#docReqSendList";

    // Table setup
    // ------------------------------

	// Setting datatable defaults
    $.extend( $.fn.dataTable.defaults, {
        autoWidth: false,
		dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
			emptyTable: '<span data-i18n="datatable.option.emptyTable"></span>',
            search: '<span data-i18n="docMgr:datatable.option.filter"></span> _INPUT_',
            lengthMenu: '<span data-i18n="datatable.option.show"></span> _MENU_',
			paginate: { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="datatable.option.next"></button>'}
        },
        drawCallback: function () {
			$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');

			/*
			if(!$(t2_Id).parent().hasClass("table-responsive")){
				$(t2_Id).wrap("<div class='table-responsive'></div>");
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
		var customMinus = 160;
		var customLen = parseInt(($(".page-container").height()-customMinus)/41)-1
		lengthMenu = [customLen,30,50,100]
	}

	t2 = $(t2_Id).DataTable({
        "processing" : true
        ,"serverSide" : true
        ,"ajax": {
            //"url": "/Module/UserModule/DocMgr/json/getReqSendTable_json.do",
            "url": "/module/usermodule/docmgr/json/getReqSendTable",
			"data" : function (d) {
				d.apprStat = $("#sch_appState1").val()
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
                //"width" : "50px",
                "targets": [0],
                "orderable": false,
                "className" : "dt-center notMove "
            },{
                //1.SeqNo
                //"width" : "0px",
                "targets": [1],
                "visible": false
            },{
                //2.문서번호
                "targets": [2],
				//"width": "160px",
				"orderable": true,
                "className" : "dt-center"
            },{
                //3.제목
                "targets": [3],
                "orderable": true,
                "className" : "FixColnum"
            },{
                //4.작성일
                "targets": [4],
                "orderable": true,
                //"width": "100px",
                "className" : "dt-center"
            },{
                //5.요청일
                "targets": [5],
                "orderable": true,
               //"width": "100px",
                "className" : "dt-center"
            },{
                //6.승인상태
                "targets": [6],
                "orderderable": true,
               // "width": "120px",
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

			t1.column(3, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
				cell.innerHTML = "<span>"+cell.innerHTML+"</span>" ;
			});

			//page load시 previeus, next 버튼 등 한국어 처리
			$('.dataTables_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();

			//결재승인 대기 건수
			var waitCnt = t2.ajax.json().waitCnt;
			$("#reqSend_waitCnt").html(waitCnt);

			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {
			$("#docReqSendList_filter").append($('#tableFilter_appState_1').detach().show());
			$("#sch_appState1").on("change", function(){
				t2.ajax.reload(null, true);
			});
			//목록수 조정 하단이동 추가
			listSize=$("#docReqSendList_info");
			$("#docReqSendList_length").insertBefore(listSize);
		}
		,"buttons":[
		]
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
	$(t2_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]docMgr:datatable.option.placeHolder");

	//row 클릭시 실행
	$(t2_Id+' tbody').on( 'click', 'tr', function () {
		if(!$(this).hasClass("dataTables_empty")){
			var sn = t2.row($(this)).data()[1];
			fn_openDocReqResult(sn)
		}
	});

    // External table additions (필수)
    // ------------------------------

    // Enable Select select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });


	/*
	//권한에 따른 글쓰기 버튼 숨기기
	if(aa!="yes"){
		$("#datatable_task_wrapper > div.datatable-header > div.dt-buttons > a").css("display","none");
	}
	*/

}