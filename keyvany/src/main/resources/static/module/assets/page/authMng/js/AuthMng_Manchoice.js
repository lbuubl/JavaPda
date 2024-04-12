/* ------------------------------------------------------------------------------
*
*  # Datatables data sources
*
*  Specific JS code additions for datatable_data_sources.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
*  사용시 index.page의 css 참고하기
* ---------------------------------------------------------------------------- */
var manTb;

var manTb_Id = "#manList";

var manTb_chk = true;

function makeManList(){

	var firstFlag = true;

	 /*
	var callCmd = "";
	if(typeof(prjYn)=="undefined"){
		callCmd = "/Data.do?callcmd=AuthMng_ManList"
	}else{
		callCmd = "/Data.do?callcmd=AuthMng_ManList_Company"
	}

	 */
	//var callCmd = "/Module/SysModule/AuthMng/ManList.do"
	var callCmd = "/module/sysmodule/authmng/manList"
	//callCmd = "/Data.do?callcmd=AuthMng_ManList_Company";
	var prop = "";
	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,
			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
			"language": {
				//데이터 없는 경우
				"emptyTable": '<span data-i18n="common:datatable.option.emptyTable"></span>',
				//keyworkd 라벨 설정
				"search": '<span class="grid-span" data-i18n="common:datatable.option.filter"></span> _INPUT_'
				//
				,"lengthMenu": '<span data-i18n="common:datatable.option.show"></span> _MENU_'
				//페이징 처리 옵션
				,"paginate": { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="common:datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="common:datatable.option.next"></button>'}
			},
			"drawCallback": function () {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');

				//OBS 트리높이 조정
				if(firstFlag){
					try{setTimeout(initObsTreeHeight, 500);}catch(e){}
					firstFlag = false;
				}else{
					try{initObsTreeHeight();}catch(e){}
				}
			},
			"preDrawCallback": function() {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
			}


		});
	// ------------------------------------------------------------

	// Table setup

		manTb = $(manTb_Id).DataTable({

			 "processing" : true
			,"serverSide" : true
			,"ajax" : {
				"url" :callCmd,
				"data" : function (d) {
					d.Hidden_User_Yn = Hidden_User_Yn;
					d.obsCode = $("#tempObjCode1").val();
				},
				"type" : "post"
			}
			,"pagingType": "simple"
			,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

				//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
				{
					"width" : "80px",
					"targets": [0],
					"orderable": false,
					"className" : "dt-center"
				}, { // Idx
					"width" : "0px",
					"targets": [1],
					"visible": false,
					"searchable": false

				}, {
					"targets": [2],
					"width" : "50px",
					"searchable": false,
					"sortable": false,
					"className" : "dt-center notMove"
				}, {
					"targets": [3],
					"className" : "dt-center"

				} , {
					"targets": [4],
					"className" : "dt-center",
					"width" : "120px"
				}  , {
					"targets": [5],
					"className" : "dt-center"
				}
			]

			, "order": [ 3, "asc" ] //기본 정렬 역순 출력(필수)

			//데이터 로드 완료 후 실행할 이벤트(필수)
			, "infoCallback": function( settings, start, end, max, total, pre ) {
				//INDEX 역순 출력(필수)
				manTb.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					//console.log(total,i,start+1);
					cell.innerHTML = total-i-start+1;
				});

				//체크박스 생성
				manTb.column(2, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					//console.log(total,i,start+1);
					prop = ""
					prop = prop + " data-manSeq='"+manTb.column(1).nodes()[i].innerHTML+"'"
					prop = prop + " value='"+manTb.column(1).nodes()[i].innerHTML+"'"
					prop = prop + " data-userNm='"+manTb.column(4).nodes()[i].innerHTML+"'"
					prop = prop + " data-part='"+manTb.column(5).nodes()[i].innerHTML+"'"
					cell.innerHTML = "<input type='checkbox' name='manbox' class='cbox' "+ prop +"'>";
				});


				var api = this.api();
				var pageInfo = api.page.info();

				//page load시 previeus, next 버튼 등 한국어 처리
				$(manTb_Id+'_wrapper').localize();



				//배열에 값 있는지 체크
				fn_boxInit();


				//리턴값 없는경우 좌측하단 데이터 정보 안나옴
				return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
			}

			/*
			,"buttons":[
				{	"text": '<i class="icon-checkbox-unchecked position-left"></i> <span data-i18n="AuthMng:label.selectAll">전체선택</span>',
					"className": 'btn btn-success btn-xs selectAllMan'
				}
			]
			*/

			//그리드 로드 후 한번만 실행
			, "initComplete": function(settings, json) {

				listSize=$("#manList_info");
				$("#manList_length").insertBefore(listSize);


				//$(manTb_Id+"_filter").append($('#selectAllMan'));
				$("#manList_wrapper .datatable-header").append($('#selectAllMan'));
				$('#selectAllMan').show();

			}
		});



		$(manTb_Id+' tbody').on("click" , 'tr td', function () {
			if(!$(this).hasClass("notMove")){
				//row 클릭시 체크박스 클릭 이벤트
				var $item = $(this).parent().find("input");
				$item.prop("checked",!$item.prop("checked"));
				setManChecked($item);

			}
		});

		$(manTb_Id+' tbody').on("click" , '.cbox', function () {
			setManChecked(this);
		});

		//자동검색 수동으로 변경
		$(manTb_Id+"_filter input").unbind();
		$(manTb_Id+"_filter input").keyup(function(e){
			if(e.keyCode==13){
				//console.log(this.value );
				manTb.search( this.value ).draw();
				$(this).blur();
			}
		});


		// 하단 부분 필수 적용
		// ------------------------------------------------------------------------------------------

		// 데이터테이블 필터옵션 다국어 처리
		$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]common:datatable.option.filter");

		/*
		// 그리드 상단 페이징 버튼 처리
		$('.dataTables_length select').select2({
			minimumResultsForSearch: Infinity,
			containerCssClass: 'select-xs',
			width: 'auto'
		});
		*/

	/*
    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });
	*/

		// ------------------------------------------------------------------------------------------

 }


