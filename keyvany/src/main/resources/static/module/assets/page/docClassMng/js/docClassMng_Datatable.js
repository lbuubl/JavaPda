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
var t1;
var t2;

var t1_Id = "#dataList";
var t1_Property="";

var $selRow1 = null;
var t1_flag = true;

var columnDefaultIdx;
var pLen;

function makeDataTable(){



	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,

			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": ' <"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
			"language": {
				//데이터 없는 경우
				"emptyTable": '<span data-i18n="common:datatable.option.emptyTable"></span>',
				//keyworkd 라벨 설정
				"search": '<span data-i18n="common:datatable.option.filter"></span> _INPUT_'
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



	if(isMobile){
		lengthMenu = [10,30,50,100]
	}else{
		var customMinus = 280
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]

	}


	// Table setup

			t1 = $(t1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/data.do?callcmd=CODE_MNG_MList"
					//"url" :"/Module/userModule/docClassMng/docList.do"
					"url" :"/module/usermodule/docclassmng/docList"
					,"type" : "post"
					, "data" : function(d){
						d.pdsClass_SeqNo = $("#pdsClass_SeqNo").val();
					}
				}
				,"lengthMenu": [lengthMenu, lengthMenu]
				,"pagingType": "simple"
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						//"width" : "50px",
						"targets": [0],
						"orderable": false  ,
						"className" : "dt-center notMove "
					}, {
						//"width" : "70px",
						"targets": [1],
						"orderable": false ,
						"searchable": false ,
						"className" : "dt-center "

					}, {
						"targets": [2],
						"width" : "0px",
						"visible" : false
					}, {
						//"width" : "180px" ,
						"targets": [3],
						"className" : " dt-center"
					}, {
						"targets": [4],
						"className" : "FixColnum dt-head-center"
					}, {
						//dt
					//	"width" : "100px",
						"targets": [5] ,
						"className" : "dt-center"
					}, {
						//nm
						//"width" : "100px",
						"targets": [6]  ,
						"className" : "dt-center"

					} , {
						//file cnt
						//"width" : "50px",
						"targets": [7],
						"className" : "dt-center"
					}

				]

				, "order": [ 5, "desc" ] //기본 정렬 역순 출력(필수)
				,"buttons":[

				]
				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					t1.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = total-i-start+1;
					});


					t1.column(4, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = "<span>"+cell.innerHTML +"</span>";
					});


					var checked = "";
					var val = "";

					//체크박스 생성
					t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						val = t1.column(2).nodes()[i].innerHTML;
						if(sel_Items.indexOf(val) >= 0 ){
							checked="checked";
						}else{
							checked="";
						}
						cell.innerHTML = "<input type='checkbox' name='docClassItemBox' class='docClassItemBox' value='"+val+"' "+checked+">";
					});

					//체크박스 all 초기화
					$("#docClassItemBoxAll").prop("checked",false);

					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$(t1_Id+'_wrapper').localize();


					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}

			});

			if(t1_flag){
				//$("#dataList_wrapper .datatable-header-custom").prepend('<div><input type="checkbox" name="searchAllChk" class=""/>전체카테고리 <input type="radio" name="workDMLType" class=""/>선택카테고리 <input type="radio" name="workDMLType" checked/>선택항목만 <button class="dt-button btn btn-success btn-icon btn-default btn-xs">분류변경</button> <button class="dt-button btn btn-success btn-icon btn-default btn-xs">분류제거</button></div>');
				//<input type="checkbox" id="searchAllChk" name="searchAllChk" class="" ALL="true"/>전체카테고리

				var buttons = "";

				buttons=buttons+'  ';
				buttons=buttons+' <span><input type="radio" name="allYn" class="" value="Y"/> <span data-i18n="docClassMng:label.allCat">카테고리전체</span> ';
				buttons=buttons+' <input type="radio" name="allYn" value="N"/> <span data-i18n="docClassMng:label.selected">선택항목</span></span>';

				//권한에 따른 버튼컨트롤
				if(ak=="yes"){
					buttons=buttons+' <span><button class="dt-button btn btn-success btn-icon btn-default btn-xs btn-pdf-change"><span data-i18n="docClassMng:label.changeCat">분류변경</span></button>';
					buttons=buttons+' <button class="dt-button btn btn-danger btn-icon btn-xs btn-pdf-delete"><span data-i18n="docClassMng:label.delCat">분류제거</span></button>';
					buttons=buttons+' </span> ';
				}
				$("#dataList_wrapper .dt-buttons").prepend(buttons);



				$("INPUT[NAME=allYn][VALUE=N]").prop("checked",true);
				t1_flag = !t1_flag;
			}
			$(t1_Id+' tbody').on("click" , 'tr td', function () {
				if(!$(this).hasClass("notMove")){
						//게시글 load

						//blockUI load
						//BlockShow();
						try{
							//$selRow1 = t1.row( $(this).parent());
							var $item = $(this).parent().find("input");
							$item.prop("checked",!$item.prop("checked"));

							arraySelect($item);

							//row 선택 효과 적용
							$(this).parent().addClass('selected');
							$(this).parent().siblings().removeClass('selected');



							var hData = {
								"data" : {
									"mSeqIdx" : $("#mSeqIdx").val()
								}
							}
						}catch(e){}
						//SetHistory(hData, "mLoad");


				}

			});


			//자동검색 수동으로 변경
			$(t1_Id+"_filter input").unbind();
			$(t1_Id+"_filter input").keyup(function(e){
				if(e.keyCode==13){
					//console.log(this.value );
					t1.search( this.value ).draw();
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
