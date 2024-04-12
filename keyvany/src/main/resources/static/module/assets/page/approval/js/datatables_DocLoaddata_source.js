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
var tDocLoad1;

function makeDocLoadDataTable(){
	var tDocLoad1_Id = "#dataDocLoadList";

	// Table setup
			// ------------------------------

			// Setting datatable defaults
			$.extend( $.fn.dataTable.defaults, {
				"autoWidth": false,
				"dom": '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
				"language": {
					"search": '_INPUT_'
					,"lengthMenu": ''
					,"emptyTable": '<span data-i18n="datatable.option.emptyTable">'
					,"paginate": { 'first': 'First', 'last': 'Last', 'previous': '' , 'next': ''}

				},
				"drawCallback": function () {
					$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
				},
				"preDrawCallback": function() {
					$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
				}
			});



			tDocLoad1 = $(tDocLoad1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				//,"bDestroy": true
				,"ajax" : {
					//"url" :"/Module/UserModule/approval/common/DocLoadList.do"
					"url" :"/module/usermodule/approval/common/docLoadList"
					//,"dataType" : "json"
					//"url" :"/Module/UserModule/approval/common/DocLoadList.do"
					,"type" : "post"
					,"data" : function ( d ) {
								d.mc = mc;
								d.ty = $("#ty").val();
								}
				}
				//,"pagingType": "simple"
				,"paging": false
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						"width" : "50px",
						"targets": [0],
						"orderable": false  ,
						"searchable": false
						,"className" : "dt-center"

					}, {
						"width" : "0px",
						"targets": [1],
						"visible": false,
						"orderable": false  ,
						"searchable": false

					} , {
						"targets": [2],
						"orderable": false  ,
						"width" : "200px"
						,"className" : "dt-center"
					}, {
						"targets": [5],
						"orderable": false  ,
						"width" : "80px"
						,"className" : "dt-center"
					},{
						"width" : "0px",
						"orderable": false  ,
						"targets": [4], //
						"visible": false,
						"searchable": false
					},{
						"width" : "0px",
						"orderable": false  ,
						"targets": [3], //
						"visible": false,
						"searchable": false
					},{
						"width" : "0px",
						"orderable": false  ,
						"targets": [6], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [7], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [8], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [9], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [10], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [11], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [12], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [13], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [14], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [15], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [16], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [17], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [18], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [19], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [20], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [21], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [22], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [23], //
						"visible": false,
						"searchable": false
					} ,{
						"width" : "0px",
						"orderable": false  ,
						"targets": [24], //
						"visible": false,
						"searchable": false
					} ,{
						/* 결재그룹 추가, 2018-06-29, 김영식 */
						"width" : "80px",
						"orderable": false  ,
						"targets": [25],
						"searchable": false,
						"className" : "dt-center"
					}
				]
				//keytable set
				,keys: {
					focus: ':eq(0)' //페이지 이동시 첫번째 row로 포커싱(필수)
				}

				, "order": [ 3, "desc" ] //기본 정렬 역순 출력(필수)
				//INDEX 역순 출력(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {
				  $('#dataDocLoadList_wrapper').localize();
					var api = this.api();
					var pageInfo = api.page.info();

					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}
				,"buttons":[]
			});




			if(!isMobile){//데스트탑 만.(김형식 부장 추가)
				event_kind="dblclick click"
			}else{
				event_kind="click"
			}

			$(tDocLoad1_Id+' tbody').on(event_kind , 'tr td', function () {

				//(김형식 부장 추가)
				document.ondblclick = function(evt) {
					if (window.getSelection)
						window.getSelection().removeAllRanges();
					else if (document.selection)
						document.selection.empty();
				}

				//게시글 load
				var seqNo="";

				//responsive로 인해 분기처리
				if($(this).parent().hasClass("child")){
					seqNo = tDocLoad1.row( $(this).parent().prev() ).data()[1];
				}else{
					seqNo = tDocLoad1.row( $(this).parent() ).data()[1];
				}

				//BlockShow();
				$('#dataDocLoadListModal').modal('hide');
				$("#indexList").hide();
				$("#fs").val(seqNo);
				EditorLoad("",seqNo);
				$("#Editor").show();
				$("#attendUsers").tagsinput({
					maxTags: 5
					,tagClass: 'small'
					,confirmKeys: [13, 32]
					,maxChars: 30
					,trimValue: true
				});

				//i18C("editor");
				tinyMCE.DOM.setStyle(tinyMCE.DOM.get("elm1_ifr" ), 'height', '500px');
				//$("#elm1").height("500px");

			});

			//key event bind
			/*
			 tDocLoad1.on('key', function (e, datatable, key, cell, originalEvent) {
					if(key=="13"){
						//게시글 load
						var seqNo = tDocLoad1.row( $(cell.node()).parent() ).data()[1];
						EditorLoad(seqNo);
					}
				});
			*/

			tDocLoad1.on( 'page.dt', function () {
				moveScrollTop($(tDocLoad1_Id).offset().top)
			});


			// External table additions (필수)
			// ------------------------------

			// Add placeholder to the datatable filter option
			$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]approval:datatable.option.filter");

			// Enable Select2 select for the length option
			/*
			$('.dataTables_length select').select2({
				minimumResultsForSearch: Infinity,
				containerCssClass: 'select-xs',
				width: '500px'
			});
			*/

 }
