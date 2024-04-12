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

var manTb_Id = "#obsDataList";

var manTb_chk = true;

makeManList();

function makeManList(){

	var firstFlag = true;

	//var callCmd = "/Module/UserModule/pds/json/getManList.do"
	var callCmd = "/module/usermodule/pds/getManList"

	var prop = "";
	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,
			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			//"dom": '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
			dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
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
				"url" :callCmd
				,"type" : "post"
				,"data" : function (d) {
					d.obsCode = $("#tempObjCode").val();
					d.returnUserId = returnUserId;	//사용자일련번호로 return 받을지 여부
					d.GongGuCode = obsSelect_gSn;	//공구일련번호
				}
			}
			,"pagingType": "simple"
			,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

				//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
				{	//NO
					"width" : "80px",
					"targets": [0],
					"orderable": false,
					"className" : "dt-center"
				}, {	//Idx
					"width" : "0px",
					"targets": [1],
					"visible": false,
					"searchable": false

				}, {	//체크박스
					"targets": [2],
					"width" : "50px",
					"searchable": false,
					"sortable": false,
					"className" : "dt-center notMove"
				}, {	//소속
					"targets": [3],
					"className" : "dt-center"

				} , {	//이름
					"targets": [4],
					"className" : "dt-center",
					"width" : "120px"
				}  , {	//분야
					"targets": [5],
					"className" : "dt-center"
				}
			]

			, "order": [ 4, "asc" ] //기본 정렬 역순 출력(필수)

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
					prop = prop + " data-obsNm='"+manTb.column(3).nodes()[i].innerHTML+"'"
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
			//그리드 로드 후 한번만 실행
			, "initComplete": function(settings, json) {

			}
			,"buttons":[
				{	text: '<i class="position-left icon-checkbox-unchecked"></i><span data-i18n="AuthMng:label.selectAll">전체선택</span>',
					className: 'btn btn-success btn-xs selectAllMan'
				}
			]
			, "drawCallback":function (settings){
				//OBS 트리높이 조정
				//setTimeout(initObsTreeHeight, 100);

				if(firstFlag){
					setTimeout(initObsTreeHeight, 500);
					firstFlag = false;
				}else{
					initObsTreeHeight();
				}
			}

			//높이설정
			//,"scrollY":        "400px"
			//,"deferRender":    true
			//,"scroller":       true
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

		// 그리드 상단 페이징 버튼 처리
		$('.dataTables_length select').select2({
			minimumResultsForSearch: Infinity,
			containerCssClass: 'select-xs',
			width: 'auto'
		});

		// ------------------------------------------------------------------------------------------

 }


