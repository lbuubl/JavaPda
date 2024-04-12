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
var t2_Id = "#latestDataList";

function makeDataTable_t2(){

    // Table setup
    // ------------------------------

	// Setting datatable defaults
    $.extend( $.fn.dataTable.defaults, {
        "autoWidth": false,
		dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
		//dom: '<"datatable-header"fBl><"datatable-footer"ip>',
        language: {
			emptyTable: '<span data-i18n="datatable.option.emptyTable"></span>',
            search: '<span data-i18n="pds:datatable.option.filter"></span> _INPUT_',
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
		if(PDS_useThumnail){
			var customMinus = 450;
		}
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]
	}


	t2 = $(t2_Id).DataTable({
         "processing" : true
        ,"serverSide" : true
        ,"ajax": {
			//"url": "/Module/UserModule/pds/json/getDataTable_latest_json.page",
			"url": "/module/usermodule/pds/json/getDataTableLatest",
            "type": "POST",
			"data": function(d){
				d.ext = $("#sch_allExt option:selected").map(function(){return $(this).val()}).get().join();	//확장자 조건
				d.searchOption = $("#sch_allAndOrOption").val();
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
        ,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정
			 {
                className: 'control',
                orderable: false,
                targets: -1
            },{
				//번호
				"targets": [0],
				"orderable": false,
				"className": "notMove",
				//"width": "60px",
				"className" : "dt-center"
			},{
				//체크박스
				"targets": [1],
				"orderable": false,
				//"width": "20px",
				"className" : "dt-center"
			},{
				//파일명
				"targets": [2],
				"className" : "FixColnum",
				"orderable": true
			},{
				//유형
				"targets": [3],
				"orderable": true,
				//"width": "80px"
			},{
				//크기
				"targets": [4],
				"orderable": true,
				//"width": "100px",
				"className" : "dt-center"
			},{
				//작성자
				"targets": [5],
				"orderable": true,
				//"width": "90px",
				"className" : "dt-center"
			},{
				//작성일
				"targets": [6],
				"orderable": true,
				//"width": "100px",
				"className" : "dt-center"
			},{
				//Rev
				"targets": [7],
				"orderable": true,
				//"width": "70px",
				"className" : "dt-center"
			},{
				//위치
				"targets": [8],
				"orderable": false,
				//"width": "50px",
				"className" : "dt-center"
			},{
				//열기/저장
				"targets": [9],
				"orderable": false,
				//"width": "80px",
				"className" : "dt-center"
			},{
				//열람권한
				"targets": [10],
				"visible": false
			}
		]
		,keys: true
		,"order": [ 6, "desc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {
			$("#temp_page2").val(t2.page() + 1);
			$("#grid_pagesize2").val(t2.page.len());


			//파일명에 span 추가
			t2.column(2, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
				cell.innerHTML = "<span>"+cell.innerHTML ;

				cell.innerHTML = cell.innerHTML+"</span>" ;
			});
			drawThumArea("latest", t2.ajax.json().thumData);	// 썸네일 영역 그리기

			//썸네일 이전/다음 으로 온 경우 처음 혹은 마지막 썸네일 클릭 처리
			if (thumPageGubun != ""){
				fn_firstLastThumClick(thumPageGubun, "#latest_pdsSmallPhotoList");	//페이지 이동후 처음 이나 마지막 썸네일을 클릭처리
			}

			//확장자 선택 셀렉트박스 영역에 따른 영역 높이 조절
			extDropdownHeightCalc("#latestDataList_wrapper");

			//page load시 previeus, next 버튼 등 한국어 처리
			$('#latestDataList_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();

			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {
			//최초 로딩시 모바일 UI 적용
			//changeDTUiForMobile();
			listSize=$("#latestDataList_info");
			$("#latestDataList_length").insertBefore(listSize);


			$(t2_Id+"_filter").append($('#latest_tab .multi-select'));

			$(t2_Id+"_filter").append($('#latest_tab .search-option-div'));
			$('#latest_tab .search-option-div').show();

		}
		,"buttons":[
			{	text: '<i class="icon-file-download2 position-left" gubun="'+t2_Id+'"></i><span data-i18n="pds:datatable.button.download">다운로드</span>',
				className: 'btn btn-success btn-xs checkedDownloadBtn'
			},
			{	text: '<i class="icon-trash position-left" gubun="'+t2_Id+'"></i><span data-i18n="pds:datatable.button.deleteFile">파일삭제</span>',
				className: 'btn btn-danger btn-xs checkedFileDelBtn'
			},
			{	text: '<i class="icon-pencil3 position-left" gubun="'+t2_Id+'"></i><span data-i18n="pds:datatable.button.editFileNm">파일명수정</span>',
				className: 'btn btn-primary btn-xs checkedFileModifyBtn'
			},
			{	text: '<i class="icon-enter position-left" gubun="'+t2_Id+'"></i><span data-i18n="pds:button.moveFile">자료이동</span>',
				className: 'btn btn-primary btn-xs checkedFileMoveBtn'
			}
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
	$(t2_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]pds:datatable.option.filter");


	//row 클릭시 실행
	$(t2_Id+' tbody').on( 'click', 'tr', function () {
		onClick(this);
		/*
		try{
			var seqNo	= $(this).find(".chkSeqNo").val();
			var mode	= $(this).find(".chkSeqNo").attr("mode");	//file:파일모드, group:게시모드

			$("#latest_pdsSmallPhotoList").scrollTo($("#latest_photos_"+seqNo).parent());	//스크롤 처리
			//focusSmallPhoto($("#latest_photos_"+seqNo).parent())		//썸네일 백그라운드 컬러 처리
			focusSmallPhoto($("#latest_photos_"+seqNo).closest(".thumWrap"))		//썸네일 백그라운드 컬러 처리
		}catch (e){}

		//row 선택
		$(this).addClass('selected');
		$(this).siblings().removeClass('selected');
		*/
	});

	//row 더블클릭
	$(t2_Id+' tbody').on( 'dblclick', 'tr', function () {
		onDblclick(this);
		/*
		if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
			var mode = $(this).find(".chkSeqNo").attr("mode");
			var seqNo = $(this).find(".chkSeqNo").val();

			//열람권한 체크
			if(t2.row(this).data()[10] == "Y"){
				if(seqNo != "undefined" && seqNo != undefined){
					if(mode == "file"){
						openFileInfo(seqNo);
					}else{
						openGroupFileInfo(seqNo);
					}
				}
			}else{
				swal({
					title: i18next.t("pds:msg.noViewAuth"),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
			}
		}
		*/
	});


	//클릭시 처리함수
	function onClick(obj){
		try{
			var seqNo	= $(obj).find(".chkSeqNo").val();
			var mode	= $(obj).find(".chkSeqNo").attr("mode");	//file:파일모드, group:게시모드

			$("#latest_pdsSmallPhotoList").scrollTo($("#latest_photos_"+seqNo).parent());	//스크롤 처리
			//focusSmallPhoto($("#latest_photos_"+seqNo).parent())		//썸네일 백그라운드 컬러 처리
			focusSmallPhoto($("#latest_photos_"+seqNo).closest(".thumWrap"))		//썸네일 백그라운드 컬러 처리
		}catch (e){}

		//row 선택
		$(obj).addClass('selected');
		$(obj).siblings().removeClass('selected');
	}

	//더블클릭시 처리함수
	function onDblclick(obj){
		if(!$(obj).find("td:eq(0)").hasClass("dataTables_empty")){
			var mode = $(obj).find(".chkSeqNo").attr("mode");
			var seqNo = $(obj).find(".chkSeqNo").val();

			//열람권한 체크
			if(t2.row(obj).data()[10] == "Y"){
				if(seqNo != "undefined" && seqNo != undefined){
					if(mode == "file"){
						openFileInfo(seqNo);
					}else{
						openGroupFileInfo(seqNo);
					}
				}
			}else{
				swal({
					title: i18next.t("pds:msg.noViewAuth"),
					confirmButtonColor: "#f44336",
					closeOnConfirm: true,
					type: "error"
				});
			}
		}
	}

	var tapped=false
	$(t2_Id+' tbody').on("touchstart", "tr", function(e){
		//if tap is not set, set up single tap
		if(!tapped || ! $(this).hasClass("selected")){
			onClick(this)
		  tapped=setTimeout(function(){
			  tapped=null
			  //insert things you want to do when single tapped
		  },300);   //wait 300ms then run single click code

	  //tapped within 300ms of last tap. double tap
		} else {
		  clearTimeout(tapped); //stop single tap callback
		  tapped=null
		  //insert things you want to do when double tapped

		  onDblclick(this)
		}
		//e.preventDefault()
	});


	$(t2_Id).on( 'init.dt', function () {
		setLatestCountOfTab();	//최근 등록자료 COUNT 갱신
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

	if(AK != "A" && AK != "M"){
		$(".checkedFileDelBtn").remove();
		$(".checkedFileModifyBtn").remove();
	}

	if( ! (pdsMoveYn=="true" && (AK == MoveAuthType || AK == "A")) ){
		$(".checkedFileMoveBtn").hide();
		$(".li_checkedFileMoveBtn").hide();
	}

}

//최근 등록자료 COUNT 갱신
function setLatestCountOfTab(){

	/*
	var table = $(t2_Id).DataTable();
	var info = table.page.info();
	var recordsTotal = info.recordsTotal;
	$("#latest_count").html( "(<font color=red> "+recordsTotal+" </font> )");
	*/

	var allCnt		= t2.ajax.json().allCnt;
	var latestCnt	= t2.ajax.json().latestCnt;

	if (allCnt == undefined ) allCnt = 0;
	if (latestCnt == undefined) latestCnt = 0;

	if (allCnt != "0"){
		$("#latest_count").html( "(<font color=red> "+latestCnt+" </font> / "+allCnt+")");
	}else{
		$("#latest_count").html("");
	}
}