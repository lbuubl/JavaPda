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
            <h1>외주가공출고 </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right" id="bodyOl">
              <li class="breadcrumb-item"><a href="#" >Home </a></li>
              <li class="breadcrumb-item " id="level1">외주관리</li>
              <li class="breadcrumb-item active" id="level2">외주가공출고</li>
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
                <h5 class="m-0">현재창고</h5>
            </div>
            <div class="card-body">
              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">공장</label>
                </div>
                <div class="col-sm-08">
                  <select class="form-control select2bs4" id="nFacCd" onchange="fnFacCdChange()" >
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">창고</label>
                </div>
                <div class="col-sm-08">
                  <input type="hidden" class="form-control" id="nWhCd" name="nWhCd"  placeholder="">
                  <input type="input" class="form-control" id="nWhNm" name="nWhNm" readOnly='readOnly'   placeholder="">
                </div>
                <div class="col-sm-01">
                     <button type="button" class="btn btn-default" id="modalWhShow"  >창고검색</button>
                </div>

              </div>
            </div>
         </div>

        <div class="card card-info">
            <div class="card-header">
                <h5 class="m-0">이동창고</h5>
            </div>
            <div class="card-body">
              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">공장</label>
                </div>
                <div class="col-sm-08">
	                  <select class="form-control select2bs4" id="mFacCd" >
	                  </select>
                  </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">창고</label>
                </div>
                <div class="col-sm-08">
                  <input type="hidden" class="form-control" id="mWhCd" name="mWhCd"  placeholder="">
                  <input type="input" class="form-control" id="mWhNm" name="mWhNm" readOnly='readOnly'   placeholder="">
                </div>
	              <div class="col-sm-01">
	                   <button type="button" class="btn btn-default" id="modalAfterWhShow" data-toggle="modal" >창고검색</button>
	              </div>
              </div>

            </div>
         </div>

        <div class="card card-info">
            <div class="card-header">
                <h5 class="m-0">품목</h5>
            </div>
            <div class="card-body">

              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">바코드</label>
                </div>
                <div class="col-sm-08">
                  <input type="input"  class="form-control" id="barcode" name="barcode" placeholder="">
                </div>
                <div class="col-sm-08 <c:if test="${mobileYn ne 'false'}">hide</c:if>">
                  <button type="button" class="btn btn-default" id="barcodeSearch" >바코드검색</button>
                </div>
              </div>

              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">품목</label>
                </div>
                <div class="col-sm-08">
                  <input type="hidden" class="form-control" id="itm_id" name="itm_id"  placeholder="">
                  <input type="input" class="form-control"  id="itm_nm" name="itm_nm" readOnly='readOnly'   placeholder="">
                </div>
              </div>

              <div class="form-group row">
              	<div class="col-sm-02">
                	<label for="inputEmail3" class="col-sm-2 col-form-label">규격</label>
                </div>
                <div class="col-sm-08">
                    <input type="input" class="form-control" id="spec" name="spec" readOnly='readOnly'   placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">수량</label>
                </div>
                <div class="col-sm-01">
                    <input type="input" class="form-control" id="qty" name="qty" readOnly='readOnly'   placeholder="">
                </div>
              </div>

                <div class="form-group row">
                  <div class="col-sm-02">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">일자</label>
                  </div>
                  <div class="col-sm-05">
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

          <!-- /.card-header -->
        <div class="card-body">
          <div id="jsGrid1"></div>
        </div>
          <!-- /.card-body -->
        </div>
      </div>
    </form>
    <%@ include file="/WEB-INF/views/admin/popup/popupWhCd.jsp"%>
  </div>
<script type="text/javascript">
  $(function () {

    //(공통) 바코드 이벤트 핸들러
    $('#barcode').focus(function(event){
      console.log('barcode keydown----',event)
      gl_fnBarcodeScanner(function(status, result){
        //바코드 상태값
        if(status===0){
          if(result.text!=''){
            $('#barcode').val(result.text);
            fnBarcodeSearch()
          }
        }else{
          gf_alert('바코드를 다시 스캔해주세요.')
        }
      })
    });

		$('#barcodeSearch').on('click', function(){
	  	fnBarcodeSearch()
	  });

	  // 창고 모달 버튼에 이벤트를 건다.
	  $('#modalWhShow').on('click', function(){
	    $('#modal-wh').modal('show');
	    //초기화
	    $('#shWhCd').val('')
	    $('#shFacCd').val( $('#nFacCd').val())
	    fnInitOntherWhModalPopup('#nWhCd', '#nWhNm')
	  });

	  // 창고모달 버튼에 이벤트를 건다.
	  $('#modalAfterWhShow').on('click', function(){
	    $('#modal-wh').modal('show');
	    //초기화
	    $('#shWhCd').val('')
	    $('#shFacCd').val( $('#mFacCd').val())
	    fnInitOntherWhModalPopup('#mWhCd', '#mWhNm')
	  });

	  //Date picker
	  $('#frDt').datetimepicker({
	     format: 'YYYY-MM-DD'
	     ,  defaultDate:new Date()
	  });

	 	// 공장 json 정보
	 	gf_facAjax('', function(a, facData){
		  const source = $("#fac-template").html();
		  //핸들바 템플릿 컴파일
		  const template = Handlebars.compile(source);
		  //핸들바 템플릿에 데이터를 바인딩해서 HTML 생성
		  const html1 = template({'bodyHtml':facData});
		  //현재 공장 생성된 HTML을 DOM에 주입
		  $('#nFacCd').html(html1)
		  //이동 공장  생성된 HTML을 DOM에 주입
		  $('#mFacCd').html(html1)

       //공장 변경못하게 readonly
       $('#mFacCd').prop("disabled", true)
       //기본 외주입고 설정
       $('#mFacCd').val('2000')
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
	          var getData = args.item;
	          var keys = Object.keys(getData);
	          var text = [];
	          $.each(keys, function(idx, value) {
	          });
	      }
	    })
  });

  //바코드 조회
  function fnBarcodeSearch(){
    let params = {
       barcode: $('#barcode').val()
    }
	  gf_barcodeSearch('/cms/os/getLotMasterInfoCheck', params, function(result){
		  const getData = result.data;
			if(getData.length > 0 ){
        //1) 같은 바코드가 있는지 확인
        if (gf_gridBarcodeChk('jsGrid1', getData[0]["barcode"])) {




          //TODO 체크 해야될상황
          if(mWhCd==='A400' && mWhCd==='B400'){
            const bePdaNo  = getData[0]["be_pda_no"];
            if(bePdaNo!=""){
              if (!gf_confirm("이전로트 (" + bePdaNo + ") 포함"+$('#barcode').val()+ "개의 로트가 있습니다. 작업하시겠습니까?")){
                return false;
              }
            }
          }

		      let qtyStr_tmp = getData[0]["pda_qty"]
		      let qtyStr= parseInt(qtyStr_tmp)
		      if(qtyStr === 0){
		      	gf_alert('바코드값이 없습니다')
		        gf_barcodeClean()
		      	return false;
		      }
	      	$('#itm_id').val(getData[0]["itm_id"])
	      	$('#itm_nm').val(getData[0]["itm_nm"])
	      	$('#qty').val(qtyStr_tmp)
	      	$('#spec').val(getData[0]["spec"])
	      	fnGridInsert(getData[0])
        } else {
          gf_alert('바코드 정보가 있습니다.')
          gf_barcodeClean()
        }
      }else{
      	gf_alert('바코드값이 없습니다')
      	gf_barcodeClean()
      	return false;
      }

		})
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
      gf_barcodeClean()
  }

  //그리드 전체 삭제
  function fnAllDelete(){
      if (gf_confirm("전체 삭제 하시겠습니까??")){
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
	        		, mov_bc: 'LE300210'
	        		, ent_bc: 'LE920370'
	        		, src_ty: 'PD100300'
	            , remark : 'Android_PDA_외주가공출고'
	          }
	        jsonSavaArray.push(params)
				})

    	$.ajax({
            url : "${pageContext.request.contextPath}/cms/stock/setsavemoveno",
            type : "POST",
            processData: false,
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            data :JSON.stringify({'data' :jsonSavaArray} ),
            success : function(data) {
                console.log('data====', data.data)
                gf_alert('저장이완료되었습니다.')
                location.href = "/cms/os/osprocship.htm?item=os&page=osprocship";
            },
            error : function() {
                alert("처리중 오류가 발생했습니다.");
            }
        });
    }
	}

  /**
   * 창고변경 이벤트
   */
  function fnFacCdChange() {
    fnInit()
    $("#jsGrid1").jsGrid("option", "data", []);
  }

  /**
   * 초기설정
   */
  function fnInit(){
    $('#nWhCd').val('')
    $('#nWhNm').val('')
    $('#barcode').val('')
    $('#itm_id').val('')
    $('#itm_nm').val('')
    $('#spec').val('')
    $('#qty').val('')
  }


  /**
   * 추가 초기설정
   */
  function fnAddInit(){
    $('#barcode').val('')
    $('#itm_id').val('')
    $('#itm_nm').val('')
    $('#spec').val('')
    $('#qty').val('')
  }
</script>
<!--  공장 핸들바  -->
<script id="fac-template" type="text/x-handlebars-template">
{{#each bodyHtml}}
	<option value={{fac_cd}}>{{fac_nm}}</option>
{{/each}}
</script>
