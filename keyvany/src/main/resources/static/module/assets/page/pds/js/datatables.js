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
var dataTables_ajaxUrl;

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
		if(customLen <10){
			customLen = 10;
		}
		lengthMenu = [customLen,30,50,100]
	}


	t1 = $(t1_Id).DataTable({
        "processing" : true
        ,"serverSide" : true
        ,"ajax": {
			//"url" : "/Module/UserModule/pds/json/getDataTable_json.page",
			"url" : "/module/usermodule/pds/json/getDatatable",
			"data" : function (d) {
				d.folderSn = $("#folderSn").val();
				d.ext = $("#sch_folderExt option:selected").map(function(){return $(this).val()}).get().join();	//확장자 조건
				d.searchOption = $("#sch_folderAndOrOption").val();
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
				//"width": "80px",
				"className" : "dt-center"
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
				//열기/저장
				"targets": [8],
				"orderable": false,
				//"width": "80px",
				"className" : "dt-center"
			},{
				//열람권한
				"targets": [9],
				"visible": false
			}
		]
		//keytable set
		,keys: {
			focus: ':eq(0)' //페이지 이동시 첫번째 row로 포커싱(필수)
		}

		,"order": [ 6, "desc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {

			$("#temp_page").val(t1.page() + 1);
			$("#grid_pagesize").val(t1.page.len());


			//파일명에 span 추가
			t1.column(2, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
				cell.innerHTML = "<span>"+cell.innerHTML ;

				cell.innerHTML = cell.innerHTML+"</span>" ;
			});


			//getSmallPhotoList();	// 썸네일 로딩
			drawThumArea("folder", t1.ajax.json().thumData);	// 썸네일 영역 그리기


			//썸네일 이전/다음 으로 온 경우 처음 혹은 마지막 썸네일 클릭 처리
			if (thumPageGubun != ""){
				fn_firstLastThumClick(thumPageGubun, "#pdsSmallPhotoList");	//페이지 이동후 처음 이나 마지막 썸네일을 클릭처리
			}

			//확장자 선택 셀렉트박스 영역에 따른 영역 높이 조절
			extDropdownHeightCalc("#dataList_filter");


			//page load시 previeus, next 버튼 등 한국어 처리
			$('#dataList_wrapper').localize();

			var api = this.api();
			var pageInfo = api.page.info();

			//리턴값 없는경우 좌측하단 데이터 정보 안나옴
			return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
		}
		,"initComplete": function( settings, json ) {
			//최초 로딩시 모바일 UI 적용
			//changeDTUiForMobile();
			listSize=$("#dataList_info");
			$("#dataList_length").insertBefore(listSize);

			$(t1_Id+"_filter").append($('#folder_tab .multi-select'));
			$('#folder_tab .multi-select').show();

			$(t1_Id+"_filter").append($('#folder_tab .search-option-div'));
			$('#folder_tab .search-option-div').show();

		}
		,"buttons":[
			{	text: '<i class="icon-file-upload2 position-left"></i><span data-i18n="pds:datatable.button.upload">업로드</span>',
				className: 'btn btn-success btn-xs UpLoadBtn'
			},
			{	text: '<i class="icon-file-download2 position-left" gubun="'+t1_Id+'"></i><span data-i18n="pds:datatable.button.download">다운로드</span>',
				className: 'btn btn-success btn-xs checkedDownloadBtn'
			},
			{	text: '<i class="icon-trash position-left" gubun="'+t1_Id+'"></i><span data-i18n="pds:datatable.button.deleteFile">파일삭제</span>',
				className: 'btn btn-danger btn-xs checkedFileDelBtn'
			},
			{	text: '<i class="icon-pencil3 position-left" gubun="'+t1_Id+'"></i><span data-i18n="pds:datatable.button.editFileNm">파일명수정</span>',
				className: 'btn btn-primary btn-xs checkedFileModifyBtn'
			},
			{	text: '<i class="icon-enter position-left" gubun="'+t1_Id+'"></i><span data-i18n="pds:button.moveFile">자료이동</span>',
				className: 'btn btn-primary btn-xs checkedFileMoveBtn'
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
	$(t1_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]pds:datatable.option.filter");



	//row 클릭시 실행
	$(t1_Id+' tbody').on( 'click', 'tr', function () {
		onClick(this);
		/*
		try{
			var seqNo	= $(this).find(".chkSeqNo").val();
			var mode	= $(this).find(".chkSeqNo").attr("mode");	//file:파일모드, group:게시모드

			$("#pdsSmallPhotoList").scrollTo($("#tphotos_"+seqNo).parent());	//스크롤 처리

			//focusSmallPhoto($("#tphotos_"+seqNo).parent())		//썸네일 백그라운드 컬러 처리
			focusSmallPhoto($("#tphotos_"+seqNo).closest(".thumWrap"))		//썸네일 백그라운드 컬러 처리

		}catch (e){}

		//row 선택
		$(this).addClass('selected');
		$(this).siblings().removeClass('selected');
		*/
	});

	$(t1_Id+' tbody').on("dblclick", 'tr', function () {
		onDblclick(this);
		/*
		if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
			var mode = $(this).find(".chkSeqNo").attr("mode");
			var sn = $(this).find(".chkSeqNo").val();

			//열람권한 체크
			if(t1.row(this).data()[9] == "Y"){
				if(sn != "undefined" && sn != undefined){
					if(mode == "file"){
						openFileInfo(sn);
					}else{
						openGroupFileInfo(sn);
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

			$("#pdsSmallPhotoList").scrollTo($("#tphotos_"+seqNo).parent());	//스크롤 처리

			//focusSmallPhoto($("#tphotos_"+seqNo).parent())		//썸네일 백그라운드 컬러 처리
			focusSmallPhoto($("#tphotos_"+seqNo).closest(".thumWrap"))		//썸네일 백그라운드 컬러 처리

		}catch (e){}

		//row 선택
		$(obj).addClass('selected');
		$(obj).siblings().removeClass('selected');
	}

	//더블클릭시 처리함수
	function onDblclick(obj){
		if(!$(obj).find("td:eq(0)").hasClass("dataTables_empty")){
			var mode = $(obj).find(".chkSeqNo").attr("mode");
			var sn = $(obj).find(".chkSeqNo").val();

			//열람권한 체크
			if(t1.row(obj).data()[9] == "Y"){
				if(sn != "undefined" && sn != undefined){
					if(mode == "file"){
						openFileInfo(sn);
					}else{
						openGroupFileInfo(sn);
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
	$(t1_Id+' tbody').on("touchstart", "tr", function(e){

		/*
		console.log($(this).hasClass("selected"));
		console.log("---------------")
		*/

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




	//data table key event bind
	 t1.on('key', function (e, datatable, key, cell, originalEvent) {

			if(key=="13"){

				try{
					var seqNo	= $($(cell.node()).parent()).find(".chkSeqNo").val();
					var mode	= $($(cell.node()).parent()).find(".chkSeqNo").attr("mode");	//file:파일모드, group:게시모드

					$("#pdsSmallPhotoList").scrollTo($("#tphotos_"+seqNo).parent());	//스크롤 처리

					//focusSmallPhoto($("#tphotos_"+seqNo).parent())		//썸네일 백그라운드 컬러 처리
					focusSmallPhoto($("#tphotos_"+seqNo).closest(".thumWrap"))		//썸네일 백그라운드 컬러 처리

				}catch (e){}

				//row 선택
				$($(cell.node()).parent()).addClass('selected');
				$($(cell.node()).parent()).siblings().removeClass('selected');
			}
		});


    // External table additions (필수)
    // ------------------------------

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

