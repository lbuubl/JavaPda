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
var t3; 

var t3_Id = "#cmList";

var $selRow3 = null;

function makeDataTable3(){
	
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
		var customMinus = 240
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]
	}	
	// Table setup
			var colIdx = 0 ; 
			var txt = "";
			t3 = $(t3_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					"url" :"/Module/UserModule/ProjectSummary/CMList.do"
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
						//Key
						"targets": [1], 
						"visible": false,	
						"orderable": false,
						"className" : "dt-center"
					},{ 
						//보고일
						"targets": [2],  
						"className" : "dt-center"
					} ,{ 
						//상태
						"targets": [3],  
						"className" : "dt-center"
					} ,{ 
						//단장
						"targets": [4],  
						"className" : "dt-center"
					} 
				]
				 
				, "order": [ 0, "desc" ] //기본 정렬 역순 출력(필수)  
				
				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {
				
					//INDEX 역순 출력(필수)
					t3.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) { 
						//console.log(total,i,start+1);
						//cell.innerHTML = total-i-start+1; 
						cell.innerHTML = total-i; 
					});

					
					var stat = "";
					t3.column(3, {search:'applied', order:'applied'}).nodes().each( function (cell, i) { 
						//console.log(total,i,start+1);
						//cell.innerHTML = total-i-start+1; 
						if(cell.innerHTML == 0) {
							stat = "<span data-ii8n='projectSummary:label.temporary'></span>";
						}else if(cell.innerHTML == 1) {
							stat = "<span data-ii8n='projectSummary:label.progress'></span>";
						}else{
							stat = "<span data-i18n='projectSummary:label.complete'></span>";
						}
						cell.innerHTML = stat; 
					});
					
 
		 
					var api = this.api();
					var pageInfo = api.page.info();
					
					//page load시 previeus, next 버튼 등 한국어 처리
					$(t3_Id+'_wrapper').localize(); 
					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				} 
				
				
			});
		 
 
			$(t3_Id+' tbody').on("click" , 'tr td', function () {
				//첫번째 컬럼(Seq)이 아닌경우에만 view load 
				if(!$(this).hasClass("notMove")){   
					
						try{
						$selRow3 = ( t3.row( $(this).parent()) );
						$("#cmSeq").val($selRow3.data()[1] );
						cmLoad();
						//row 선택 효과 적용
						$(this).parent().addClass('selected');
						$(this).parent().siblings().removeClass('selected');
						}catch(e){}
				}
				
			}); 


 
 }
 

 