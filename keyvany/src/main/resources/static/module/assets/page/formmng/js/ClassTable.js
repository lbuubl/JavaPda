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
* 분류체계 리스트 컨트롤 소스
* ---------------------------------------------------------------------------- */
var t3;
var t3_Id = "#ClassList";

var $selRow = null;
var datalength =null;

function makeClassTable(){

	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
				"autoWidth": false,
				// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
				// https://datatables.net/reference/option/dom 참고
				"dom": '<"datatable-header"><"datatable-scroll"t>',
				"language": {
					//데이터 없는 경우
					"emptyTable": '<span data-i18n="common:datatable.option.emptyTable"></span>'
				}
		});

	// Table setup
			var colIdx = 0 ;
	//No ,item_infoSeq, sort_nm, PdsFolder_SeqNo
			var txt = "";
			t3 = $(t3_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/Module/sysModule/FormMng/ClassList.Do"
					"url" :"/module/sysmodule/formmng/classList"
					,"type" : "post"
					,"data" : function (d) {
						d.form_num =$("#form_num").val();
						d.tempKey = $("#class_temp_key").val();
					 }
				}
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						"width" : "80px",
						"targets": [colIdx++],
						"orderable": false,
						"className" : "dt-center"
					}, { // Idx
						//"width" : "0px",
						"targets": [colIdx++],
						"visible": false,
						"orderable": false,
						"searchable": false
					}, { //Class_Nm
						"targets": [colIdx++],
						"orderable": false
					}, { //Del
						"targets": [colIdx++],
						"width" : "80px",
						"orderable": false,
						"className" : "dt-center"
					}
				]

				//로드 완료 이벤트 -
				,"initComplete": function(settings, json) {
					//			total=json.data.length;

				}

			});

			$(t3_Id).on( 'draw.dt', function () {
					total=$("#ClassList tbody tr").length;
					//No 표기
					t3.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = total-i;
					});

					//삭제버튼
					t3.column(3, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = "<button type='button' class='btn btn-success btn-xs btn-class-del' data-seqidx='"+t3.column(1).nodes()[i].innerHTML+"'><span data-i18n='common:btn.delete'></span></button>";
					});

					$(t3_Id+'_wrapper').localize();
			} );

			$(t3_Id+' tbody').on("click" , 'tr td', function () {
				/*
				//첫번째 컬럼(Seq)이 아닌경우에만 view load
				if(!$(this).hasClass("notMove")){
						$selRow = ( t3.row( $(this).parent()) );
						console.log($selRow.data()[1]); //item_seqno
						$("#class_seqNo").val( $selRow.data()[1] );

				}
				*/
			});



 }
