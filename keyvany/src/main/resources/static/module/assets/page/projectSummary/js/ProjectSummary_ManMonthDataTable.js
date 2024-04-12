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
var t2; 

var t2_Id = "#manMonthList";

var $selRow2 = null;

function makeDataTable2(){
	
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
	var lengthMenu ;
	if(isMobile){
		lengthMenu = [10,30,50,100]
	}else{
		var customMinus = 540
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]
	}	
	// Table setup
			var colIdx = 0 ; 
			var txt = "";
			t2 = $(t2_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					"url" :"/Module/UserModule/ProjectSummary/ManMonthList.do"
					,"type" : "post"
					,"data" : function(d){
						d.selectGonggu = $("#selectGonggu").val();
					}
				}
				,"pagingType": "simple" 
				,"lengthMenu": [lengthMenu, lengthMenu]

				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정  

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{	
						//No
						"targets": [0],
						"orderable": false,
						"className" : "dt-center" 
					},{ 
						//구분
						"targets": [1], 
						"className" : "dt-center"
					},{ 
						//분야
						"targets": [2],  
						"className" : "dt-center"
					},{ 
						//이름
						"targets": [3],  
						"className" : "dt-center"
					},{ 
						//투입계획기간
						"targets": [4],  
						"className" : "dt-center"
					} ,{ 
						//실투입기간
						"targets": [5], 
						"visible": false,
						"className" : "dt-center"
					} 
				]
				 
				, "order": [ 0, "desc" ] //기본 정렬 역순 출력(필수)  
				
				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {
				
					//INDEX 역순 출력(필수)
					t2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) { 
						//console.log(total,i,start+1);
						//cell.innerHTML = total-i-start+1; 
						cell.innerHTML = total-i; 
					});
					
					var txt =""
					t2.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) { 
						//console.log(total,i,start+1);
						//cell.innerHTML = total-i-start+1; 
						
						if(cell.innerHTML.toLowerCase() == "true"){
							txt = "<span data-i18n='projectSummary:label.stay'></span>"
						}else{
							txt = "<span data-i18n='projectSummary:label.transient'></span>"
						}
						
						cell.innerHTML = txt; 
					});
					
					
					
					var api = this.api();
					var pageInfo = api.page.info();
					
					//page load시 previeus, next 버튼 등 한국어 처리
					$(t2_Id+'_wrapper').localize(); 
					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				} 
				
				
			});
		 
 
			$(t2_Id+' tbody').on("click" , 'tr td', function () {
				//첫번째 컬럼(Seq)이 아닌경우에만 view load 
				if(!$(this).hasClass("notMove")){   
					
					 
						//row 선택 효과 적용
						try{
							$(this).parent().addClass('selected');
							$(this).parent().siblings().removeClass('selected');
						}catch(e){}
						
				}
				
			}); 


			
 
 }
 

 