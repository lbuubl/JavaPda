<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<!-- 핸드바  -->
<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>

    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6" id="contentTitle">
            <h1>재고확인</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right" id="bodyOl">
              <li class="breadcrumb-item"><a href="#" >Home </a></li>
              <li class="breadcrumb-item " id="level1">재고관리</li>
              <li class="breadcrumb-item active" id="level2">재고확인</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

      <div class="card">
    <!-- form start -->
    <form class="form-horizontal" id="form" name="form">

        <div class="card card-info">
           <div class="card-header">
               <h5 class="m-0">재고확인 정보</h5>
           </div>
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
                  <label for="inputEmail3" class="col-sm-2 col-form-label">공장</label>
                </div>
                <div class="col-sm-08">
                  <input type="input" class="form-control" id="facNm" name="facNm" readOnly='readOnly'   placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">창고</label>
                </div>
                <div class="col-sm-08">
                  <input type="input" class="form-control" id="whNm" name="whNm" readOnly='readOnly'   placeholder="">
                </div>
              </div>

              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">품목</label>
                </div>
                <div class="col-sm-08">
                  <input type="hidden" class="form-control" id="itm_id" name="itm_id" readOnly='readOnly'   placeholder="">
                  <input type="input" class="form-control"  id="itm_nm" name="itm_nm" readOnly='readOnly'   placeholder="">
                </div>
              </div>

              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">규격</label>
                </div>
                <div class="col-sm-08">
                    <input type="input" class="form-control" id="spec" name="spec" readOnly='readOnly'  placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">수량</label>
                </div>
                <div class="col-sm-01">
                    <input type="input" class="form-control" id="qty" name="qty" readOnly='readOnly' placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-6">
                  <!-- textarea -->
                  <div class="form-group">
                    <label>바코드 내용</label>
                    <textarea class="form-control" name="memo" id="memo" rows="3" style="width: 100%;"  disabled></textarea>
                  </div>
                  <!-- //textarea -->
                </div>
              </div>
            </div>
        </div>
      </div>
    </form>
  </div>
<script type="text/javascript">
  $(function () {

	  //바코드 조회
		$('#barcodeSearch').on('click', function(){
	  	fnBarcodeSearch()
	  });
  });

  //바코드 조회
  function fnBarcodeSearch(){
    let params = {
       barcode: $('#barcode').val()
    }
	  gf_barcodeSearch('/cms/stock/getLotMasterInfoStockInCheck', params, function(result){

		  const getData = result.data;
		  console.log('result----',getData)

			if(getData.length > 0 ){
	      let qtyStr_tmp = getData[0]["pda_qty"]
	      let qtyStr= parseInt(qtyStr_tmp)
	      if(qtyStr === 0){
	      	gf_alert('바코드값이 없습니다')
	      	return false;
	      }
	      $('#facNm').val(getData[0]["fac_nm"])
	      $('#whNm').val(getData[0]["wh_nm"])
      	$('#itm_id').val(getData[0]["itm_id"])
      	$('#itm_nm').val(getData[0]["itm_nm"])
      	$('#qty').val(qtyStr_tmp)
      	$('#spec').val(getData[0]["spec"])
      	$('#memo').val("바코드:"+ $('#barcode').val())
      }else{
        $('#memo').val("바코드:"+ $('#barcode').val() +' | 해당 바코드정보가 없습니다.')

        $('#facNm').val('')
        $('#whNm').val('')
        $('#itm_id').val('')
        $('#itm_nm').val('')
        $('#qty').val('')
        $('#spec').val('')
      	return false;
      }

		})
	}
</script>

