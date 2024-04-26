<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<style type="text/css">
.form-control .selected  {
    width: 100%;
}

</style>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6" id="contentTitle">
            <h1>출고등록 </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right" id="bodyOl">
              <li class="breadcrumb-item"><a href="#" >Home </a></li>
              <li class="breadcrumb-item active" id="level1">출고등록</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>


        <!-- Horizontal Form -->
        <div class="card card-info">
            <div class="card-header">
                <h5 class="m-0">거래처정보조회</h5>
            </div>
            <div class="card-body">

              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label" >바코드</label>
                </div>
                <div class="col-sm-08">
                  <input type="input"  class="form-control" id="custBarcode" name="custBarcode" placeholder="">
                </div>
              </div>

              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">거래처</label>
                </div>
                <div class="col-sm-08">
                  <input type="hidden" class="form-control" id="custCd" name="custCd"  placeholder="">
                  <input type="input" class="form-control"  id="custNm" name="custNm"  placeholder="">
                </div>
              </div>
              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">창고</label>
                </div>
                <div class="col-sm-08">
                  <input type="hidden"  class="form-control" id="whCd" name="whCd"   placeholder="">
                  <input type="input" class="form-control"  style="width: 100%;" id="whNm" name="whNm"  placeholder="">
                </div>
                <div class="col-sm-08">
                     <button type="button" class="btn btn-default" id="modalWhShow" data-toggle="modal" >창고검색</button>
                </div>
              </div>

            </div>
          </div>



      <div class="card">
        <!-- Horizontal Form -->
        <div class="card card-info">
            <div class="card-header">
                <h5 class="m-0">출고정보</h5>
            </div>
          <!-- form start -->
          <form class="form-horizontal" id="form" name="form">
            <div class="card-body">

              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">바코드</label>
                </div>
                <div class="col-sm-08">
                  <input type="input"  class="form-control" id="barcode" name="barcode" placeholder="" value="M15062520101001001">
                </div>
                <div class="col-sm-08">
                     <button type="button" class="btn btn-default" id="barcodeSearch" >바코드검색</button>
                </div>
              </div>


              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">품목</label>
                </div>
                <div class="col-sm-08">
                  <input type="hidden" class="form-control" id="itm_id" name="itm_id"  placeholder="">
                  <input type="input" class="form-control"  id="itm_nm" name="itm_nm"  placeholder="">
                </div>
              </div>


              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">규격</label>
                </div>
                <div class="col-sm-08">
                    <input type="input" class="form-control" id="spec" name="spec" placeholder="">
                </div>
              </div>

              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">수량</label>
                </div>
                <div class="col-sm-08">
                    <input type="input" class="form-control" id="qty" name="qty" placeholder="">
                </div>
              </div>

                <div class="form-group row">
                	<div class="col-sm-02">
                  	<label for="inputEmail3" class="col-sm-2 col-form-label">일자</label>
                  </div>
                  <div class="col-sm-08">
                      <div class="input-group date" id="frDt" name ="frDt" data-target-input="nearest">
                        <input type="text" class="form-control datetimepicker-input" data-target="#frDt"/>
                        <div class="input-group-append" data-target="#frDt" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
              <button type="button" class="btn btn-default  " id="rowDel"  onclick="fnAllDelete()" >전체 삭제</button>
              <button type="button" class="btn btn-info float-right " id="sign"  onclick="fnSave()" >저장</button>
            </div>
            <!-- /.card-footer -->
          </form>
        </div>

		    <!-- Main content -->
		    <section class="content">
		      <div class="card">
		        <div class="card-header">
		          <h3 class="card-title">츨고리스트</h3>
		        </div>
		        <!-- /.card-header -->
		        <div class="card-body">
		          <div id="jsGrid1"></div>
		        </div>
		        <!-- /.card-body -->
		      </div>
		      <!-- /.card -->
		    </section>
		    <!-- /.content -->

      <!-- /.card -->
      <%@ include file="/WEB-INF/views/admin/popup/popupWhCd.jsp"%>

      </div>
  <script type="text/javascript">
  $(function () {

	  $('#barcodeSearch').on('click', function(){
  		fnBarcodeSearch()
    });

    // 모달 버튼에 이벤트를 건다.

      $('#modalWhShow').on('click', function(){
        $('#modal-wh').modal('show');

        //초기화
        $('#shWhCd').val('')
        fnInitWhModalPopup()
      });

      //Date picker
      $('#frDt').datetimepicker({
         format: 'YYYY-MM-DD'
         ,  defaultDate:new Date()
      });

      $("#jsGrid1").jsGrid({
          height: "auto",
          width: "100%",
          heading: true,
          inserting: false,
          editing: false,
          sorting: true,
          paging: true,
          selecting: true,
          autoload : true,
          noDataContent: "Not found",
          fields: [
        	  { title: "바코드",  name: "barcode", type: "text", width: 200, height: 50 },
        	  { title: "품명",  name: "itm_nm", type: "text", width: 100, height: 50 },
        	  { title: "수량",  name: "pda_qty", type: "text", width: 70, height: 50 },
        	  { title: "규격",  name: "spec", type: "text", width: 150, height: 50 ,  visible: false },
            { title: "품목id",  name: "itm_id", type: "text", width: 150, height: 50 ,  visible: false },
            { title: "입력유형", name: "src_no", type: "text", width: 100, height: 50 ,  visible: false },
            {title: "입력유형순번",   name: "src_sq", type: "text", width: 200 , height: 50 ,  visible: false},
            {title: "lot번호",   name: "lot_no", type: "text", width: 200 , height: 50 ,  visible: false},
            { type: "control", modeSwitchButton: false, editButton: false },
          ] ,
          rowClass: function(item, itemIndex) {
              //행별로 id값을 지정
              return "client-" + itemIndex;
           },
          rowClick: function(args) {
              console.log('rowClick==========', args)
              var getData = args.item;
              var keys = Object.keys(getData);
              var text = [];
              $.each(keys, function(idx, value) {
                //text.push(value + " : " + getData[value])
                //console.log('text==========', text)
              });
          }, controller: {

              /***
              loadData: function(filter) {
                  var d = $.Deferred();
                  let params = {
                    shFacCd: '1020'
                    , shFrDt: $("#frDt").find("input").val()
                    , shToDt:  "2123-01-01"   //일자
                    , shCustCd: $('#cust_cd').val()
                    , shCustNm: $('#cust_nm').val()
                    , shSuchCd:  '' //$('#such_cd').val()
                    , shSuchTrans: '' //f_such_trans
                    , shEmp: '693'//
                  }
                  $.ajax({
                      url : "${pageContext.request.contextPath}/cms/ship/usp_zt_40_out_itm_sch_re1",
                      type : "POST",
                      processData: false,
                      contentType : "application/json; charset=utf-8",
                      dataType: "json",
                      data :JSON.stringify(params),
                      success : function(data) {
                          console.log('data====', data.data)
                          let getData = data.data;
                            d.resolve(getData);//<-aaData key에 json데이터 설정해서 넘긴 경우
                      },
                      error : function() {
                          alert("처리중 오류가 발생했습니다.");
                      }
                  });

                 return d.promise();
              }
              **/
           }
        })
      const ldsc = [
         { emp_no: "222222", kor_nm: '25',emp_cus_cd:'testsets'}
         ,{ emp_no: "111111111", kor_nm: '25',emp_cus_cd:'testsets'}
         ]
      $("#jsGrid1").jsGrid("loadData", {data : ldsc})
      /*
      $("#jsGrid1").jsGrid("insertItem", ldsc[0]).done(function() {
          console.log("insertion completed");
      });
      */
      console.log('ldsc====', ldsc)
    });

  	//바코드 조회 검색
    function fnBarcodeSearch(){
        let params = {
           barcode: $('#barcode').val()
        }

    	$.ajax({
            url : "${pageContext.request.contextPath}/cms/ship/getLotMasterInfoInCheck",
            type : "POST",
            processData: false,
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            data :JSON.stringify(params),
            success : function(data) {
                console.log('data====', data.data)
                let getData = data.data;
                if(getData.length > 0 ){

                	//$('#jsGrid1').

                    let qtyStr_tmp = getData[0]["pda_qty"]
                    alert(qtyStr_tmp)
                    let qtyStr= parseInt(qtyStr_tmp)
                    if(qtyStr === 0){
                    	gf_alert('바코드값이 없습니다')
                    	return false;
                   }

                		$('#itm_id').val(getData[0]["itm_id"])
                		$('#itm_nm').val(getData[0]["itm_nm"])
                		$('#qty').val(qtyStr_tmp)
                		$('#spec').val(getData[0]["spec"])

                		fnGridInsert(getData[0])

                }else{
                	gf_alert('바코드값이 없습니다')
                	return false;
                }

            },
            error : function() {
                alert("처리중 오류가 발생했습니다.");
            }
        });
    }

  	/***
  		그리드 insert 설정
  	*/
    function fnGridInsert(data){
        var insert_item = {};
        //데이터를 추가를 위해서 json object 생성
        insert_item.barcode = data.barcode;
        insert_item.itm_nm = data.itm_nm;
        insert_item.pda_qty = data.pda_qty;
        insert_item.spec = data.spec;
        insert_item.itm_id = data.itm_id;
        insert_item.src_no = data.src_no;
        insert_item.src_sq = data.src_sq;
        insert_item.lot_no = data.lot_no;
        $("#jsGrid1").jsGrid("insertItem", insert_item);
    }

    //그리드 전체 삭제
    function fnAllDelete(){
        if (gf_confirm("전체 삭제 하시겠습니까??")){
            //$("#jsGrid1").jsGrid("loadData");
            //$("#jsGrid1").children().remove();
            $("#jsGrid1").jsGrid("option", "data", []);
        }
    }

    //데이터 저장
    function fnSave(){
      if (gf_confirm("저장  하시겠습니까??")){
      	var allRowsInGrid = $('#jsGrid1').jsGrid("option", "data");
	    	let jsonSavaArray = []
	    	$.each(allRowsInGrid, function(i, bodyData){
	        console.log('bodyData ======',bodyData )
	        //TODO 로그인 정보
	        let params = {
	        		  dtp: gf_toDay()
	        		, barcode : bodyData.barcode
	            , pal_qty  : bodyData.pda_qty
	            , in_qty :  bodyData.pda_qty
	        	  , lot_no  :  bodyData.lot_no
	        	  , itm_id  :  bodyData.itm_id
							, t_whCd :  gl_whCd()//  로그인 한사람의 창고 코드
							, t_facCd :	gl_facCd()//  로그인 한사람의 공장 코드
	            , out_qty :  0
	            , mov_qty :  0
	        		, c_facCd:''//기존공백
	        		, c_whCd:''//기존공백
	        		, mov_bc: 'LE100100'
	        		, ent_bc: 'LE920800'
	        		, src_ty: 'PD100110'
	          }
	        jsonSavaArray.push(params)
				})


    	console.log('jsonSavaArray ======',jsonSavaArray )

      	$.ajax({
              url : "${pageContext.request.contextPath}/cms/ship/setShipSaveMoveNo",
              type : "POST",
              processData: false,
              contentType : "application/json; charset=utf-8",
              dataType: "json",
              data :JSON.stringify({'data' :jsonSavaArray} ),
              success : function(data) {
                  console.log('data====', data.data)
                  let getData = data.data;
                  if(getData.length > 0 ){
                      let qtyStr_tmp = getData[0]["pda_qty"]
                      let qtyStr= parseInt(qtyStr_tmp)
                      if(qtyStr === 0){
                      	gf_alert('바코드값이 없습니다')
                      	return false;
                     }
                  		$('#itm_id').val(getData[0]["itm_id"])
                  		$('#itm_nm').val(getData[0]["itm_nm"])
                  		$('#qty').val(qtyStr_tmp)
                  		$('#spec').val(getData[0]["spec"])

                  		fnGridInsert(getData[0])

                  }else{
                  	gf_alert('바코드값이 없습니다')
                  	return false;
                  }

              },
              error : function() {
                  alert("처리중 오류가 발생했습니다.");
              }
          });
      }
		}

    //창고 조회
    function fnSign(){
        var ddt = $("#frDt").find("input").val();
        $("#jsGrid1").jsGrid("loadData");
    }
    </script>