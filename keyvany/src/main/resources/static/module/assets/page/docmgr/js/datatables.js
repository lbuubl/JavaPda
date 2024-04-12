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
	var t1_Id = "#dataList";

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
	//url="/Module/UserModule/DocMgr/json/getDataTable_json.do"
	//url="/Module/UserModule/DocMgr/json/getDataTable_json2.do"
	url="/module/usermodule/docmgr/json/getDataTable"

	t1 = $(t1_Id).DataTable({
        "processing" : true
        ,"serverSide" : true
        ,"ajax": {
            "url": url,
			"data" : function (d) {

				d.folderSn = $("#folderSn").val();							//폴더일련번호
				d.tags = $("#tagAccordion .tagLabel.on").map(function(){	//선택한 테그
							return $(this).attr("tagValue");
						 }).get().join();
				d.tagSearchAll = $("#tagSearchAll:checked").val();			//테그 전체에서 검색여부
				d.docKeywordSearchAll = $("#docKeywordSearchAll:checked").val();	//키워드 전체에서 검색여부
			},
            "type": "POST"
        }
		,"lengthMenu": [lengthMenu, lengthMenu]
		,"pagingType": "simple"
		/*
 		,"responsive": {
            details: {
                type: 'column',
                target: -1
            }
		}
		*/
        ,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정  (No, SeqNo, 프로젝트명, 시작일, 종료일, 등록일, 등록자)
			{
                //0.번호
                //"width" : "50px",
                "targets": [0],
                "orderable": false,
                "className" : "dt-center notMove "
            },{
                //1.SeqNo
                "width" : "0px",
                "targets": [1],
                "visible": false,
            },{
                //2.열람
                "targets": [2],
				//"width": "60px",
				"orderable": false,
                "className" : "dt-center"
            },{
                //3.체크박스
                "targets": [3],
                //"width": "50px",
				"orderable": false,
                "className" : "dt-center"
            },{
                //4.문서번호
                "targets": [4],
                "orderable": true,
               // "width": "160px",
                "className" : "dt-center"
            },{
                //5.제목
                "targets": [5],
                "orderable": true,
                "className" : "FixColnum"
            },{
                //6.작성일
                "targets": [6],
                "orderable": true,
               // "width": "100px",
                "className" : "dt-center"
            },{
                //7.작성자
                "targets": [7],
                "orderable": true,
                //"width": "100px",
                "className" : "dt-center"
            },{
                //8.첨부
                "targets": [8],
                "orderable": false,
                //"width": "100px",
                "className" : "dt-center"
			},{
				//마지막 컬럼 정렬 안되는 문제로 빈 컬럼 추가
				"targets": [9],
				"visible": false
            }
		]
		//,keys: true
		,keys: {
			focus: ':eq(0)' //페이지 이동시 첫번째 row로 포커싱(필수)
		}

		,"order": [ 6, "desc" ] //기본 정렬 역순 출력(필수)
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

			//전체에서 검색
			var str = "";
			str += "<div id='div_docKeywordSearchAll'><label class='checkbox-inline'>"
			str += "	<input type='checkbox' class='styled' id='docKeywordSearchAll' value='Y'>"
			str += "	<span data-i18n='docMgr:label.searchInAll'>전체에서 검색</span>"
			str += "</label></div>"

			$("#dataList_wrapper #dataList_filter").append(str);

			$("#docKeywordSearchAll").uniform({
				radioClass: 'choice'
			});

			//목록수 조정 하단이동 추가
			listSize=$("#dataList_info");
			$("#dataList_length").insertBefore(listSize);

		}
		,"buttons":[
			{	"text": '<i class="icon-file-download2 position-left" ></i><span data-i18n="docMgr:datatable.button.docListExcelDown">문서목록 엑셀 받기</span>',
				"className": 'btn btn-success btn-xs btn_listExcelDown'
			},
			{	"text": '<i class="icon-eye-plus position-left" ></i><span data-i18n="docMgr:datatable.button.appView">열람신청</span>',
				"className": 'btn btn-success btn-xs btn_docReq'
			},
			{	"text": '<i class="icon-plus2 position-left" ></i><span data-i18n="btn.insert">등록</span>',
				"className": 'btn btn-success btn-xs btn_docWrite'
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
	$(t1_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]docMgr:datatable.option.placeHolder");

	//row 클릭시 실행
	$(t1_Id+' tbody').on( 'click', 'td', function () {

		if(!$(this).hasClass("dataTables_empty")){
			//체크박스 cell 클릭 제외
			if($(this).index() != 2){
				var sn = t1.row($(this)).data()[1];
				//자물쇠 아이콘
				if(t1.row($(this)).data()[2] == "<i class='icon-lock5'></i>"){
					swal({
						title: i18next.t("docMgr:msg.noViewAuth"),
						confirmButtonColor: "#f44336",
						closeOnConfirm: true,
						type: "error"
					});
				}else{
					fn_openDocDetail(sn);
				}

				//row 선택
				$(this).closest("tr").addClass('selected');
				$(this).closest("tr").siblings().removeClass('selected');
			}
		}
	});


	//data table key event bind
	 t1.on('key', function (e, datatable, key, cell, originalEvent) {

			if(key=="13"){
				//게시글 load
				var sn = t1.row( $(cell.node()).parent() ).data()[1];
				if(t1.row( $(cell.node()).parent() ).data()[2] == ""){
					swal({
						title: i18next.t("docMgr:msg.noViewAuth"),
						confirmButtonColor: "#f44336",
						closeOnConfirm: true,
						type: "error"
					});
				}else{
					fn_openDocDetail(sn);
				}
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
		$("#docListPanel .btn_docWrite").hide();
	}

}