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

var t1_Id = "#dataList";

var $selRow1 = null;
var t1_flag = true;
var placesArr;

function makeDataTable(){



	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,

			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": ' <"datatable-header"fB><"datatable-scroll"t><"datatable-footer"ip>',
			"language": {
				//데이터 없는 경우
				"emptyTable": '<span data-i18n="common:datatable.option.emptyTable"></span>',
				//keyworkd 라벨 설정
				"search": ' _INPUT_'
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


	var customSize = 0;
	if(isMobile){
		lengthMenu = [10,30,50,100]
		customSize = 300;
	}else{
		var customMinus =260
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100];
		customSize =  parseInt($(".page-container").height()-customMinus);

	}

	$(".datatable-scroll").css({
		"max-height" : customSize
	});

	var idx = 0 ;

	// Table setup


		t1 = $(t1_Id).on( 'init.dt', function () {
				//처음 로딩시 첫번째 로우 선택하도록
				 try{
					$selRow1 = t1.row( $(t1_Id+' tbody tr')[0]);
					if($selRow1.data()[4] != ""){
				 		var xyArr = $selRow1.data()[4].replace("(","").replace(")","").split(",");
						map.setCenter(new daum.maps.LatLng(xyArr[0], xyArr[1]));
						map.setLevel(3, {anchor: new daum.maps.LatLng(xyArr[0], xyArr[1])});
						$(".addrDiv").html($selRow1.data()[3]);

						//console.log($selRow1.data()[3]);
					}else{
						//좌표 값 없는경우.. 경고
						showSwal(i18next.t("projectMaps:msg.setting"),"info");
					}


				 }catch(e){}
			}).DataTable({
			 "processing" : true
			,"serverSide" : true
			,"ajax" : {
				//"url" :"/data.do?callcmd=CODE_MNG_MList"
				//"url" :"/Module/userModule/ProjectMaps/List.do"
				"url" :"/module/usermodule/projectmaps/list"
				,"type" : "post"
				, "data" : function(d){
					d.searchStat=$(".searchStat").val();
				}
			}
			//,"lengthMenu": [lengthMenu, lengthMenu]
			,"pagingType": "simple"
			,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

				{
					"width" : "70px",
					"targets": [idx++],
					"orderable": false ,
					"searchable": false ,
					"className" : "dt-center "

				}, {
					"targets": [idx++],
					"width" : "0px",
					"orderable": false ,
					"searchable": false ,
					"visible" : false
				} , {
					"targets": [idx++],
					"render" : $.fn.dataTable.render.ellipsis( 20 ),
					"className" : "dt-center dt-header-center dt-body-left"
				}  , {
					"targets": [idx++],
					"render" : $.fn.dataTable.render.ellipsis( 30 ),
					"className" : "dt-center dt-header-center dt-body-left"
				}  ,{

					"targets": [idx++],
					"orderable": false ,
					"searchable": false ,
					"visible" : false
				}

			]

			, "order": [ 1, "desc" ] //기본 정렬 역순 출력(필수)
			,"buttons":[
				{
					"text": '초기화',
					"className": 'btn btn-primary btn-xs map-reset'
				}
			]
			//데이터 로드 완료 후 실행할 이벤트(필수)
			, "infoCallback": function( settings, start, end, max, total, pre ) {

				placesArr = [];
				//INDEX 역순 출력(필수)
				t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					//console.log(total,i,start+1);
					cell.innerHTML = total-i-start+1;
				});



				t1.column(4, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					//console.log(total,i,start+1);

					if(cell.innerHTML != ""){
						cell.innerHTML = cell.innerHTML.replace("(","").replace(")","");

						cellArr = cell.innerHTML.split(",");

						var obj = new Object();
						obj.latitude =  cellArr[0];
						obj.longitude =  cellArr[1];
						obj.idx =  i;

						placesArr.push(obj);
					}

				});


				$(placesArr).each(function(i,item){
					item.title=t1.column(2).data()[item.idx];
				})

				if(placesArr.length > 0 ){
					displayPlaces(placesArr);
				}

				//latitude , longitude ,title
				var api = this.api();
				var pageInfo = api.page.info();

				//page load시 previeus, next 버튼 등 한국어 처리
				$(t1_Id+'_wrapper').localize();


				//리턴값 없는경우 좌측하단 데이터 정보 안나옴
				return 'Page '+ 1 +' of '+ 1
			}

		});



			$(".searchStat").on("change",function(e){
				t1.ajax.reload();
			})

			$(t1_Id+' tbody').on("click" , 'tr td', function () {
				if(!$(this).hasClass("notMove")){
						//게시글 load

						//blockUI load
						//BlockShow();

						$selRow1 = t1.row( $(this).parent());

						try{
							$("#mstSeq").val($selRow1.data()[1]);
							if($selRow1.data()[4] != ""){
								var xyArr = $selRow1.data()[4].replace("(","").replace(")","").split(",");
								map.setCenter(new daum.maps.LatLng(xyArr[0], xyArr[1]));
								map.setLevel(6, {anchor: new daum.maps.LatLng(xyArr[0], xyArr[1])});
								$(".addrDiv").innerHtml("Address : " + $selRow1.data()[3] );
							}else{
								//좌표 값 없는경우.. 경고
								showSwal(i18next.t("projectMaps:msg.setting"),"info");
							}
							var $item = $(this).parent().find("input");
							$item.prop("checked",!$item.prop("checked"));

							//row 선택 효과 적용
							$(this).parent().addClass('selected');
							$(this).parent().siblings().removeClass('selected');

							var hData = {
								"data" : {
									"mSeqIdx" : $("#mSeqIdx").val()
								}
							}
							//SetHistory(hData, "mLoad");
						}catch(e){}

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

			//overflow 지정
			$(".datatable-scroll").css({
				"max-height" : customSize
			});


 }
