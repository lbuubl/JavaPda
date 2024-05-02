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
            <h1>재고실사</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right" id="bodyOl">
              <li class="breadcrumb-item"><a href="#" >Home </a></li>
              <li class="breadcrumb-item " id="level1">재고관리</li>
              <li class="breadcrumb-item active" id="level2">재고실사</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

      <div class="card">
    <!-- form start -->
    <form class="form-horizontal" id="form" name="form">
	    <input type="hidden" class="form-control" id="temp_barcode" name="temp_barcode">
			<input type="hidden" class="form-control" id="temp_itm_nm" name="temp_itm_nm">
			<input type="hidden" class="form-control" id="temp_pda_qty" name="temp_pda_qty">
			<input type="hidden" class="form-control" id="temp_spec" name="temp_spec">
			<input type="hidden" class="form-control" id="temp_itm_id" name="temp_itm_id">
			<input type="hidden" class="form-control" id="temp_src_no" name="temp_src_no">
			<input type="hidden" class="form-control" id="temp_src_sq" name="temp_src_sq">
			<input type="hidden" class="form-control" id="temp_lot_no" name="temp_lot_no">

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
                  <input type="input" class="form-control" id="nWhNm" name="nWhNm" readonly="readonly"  placeholder="">
                </div>
                <div class="col-sm-01">
                     <button type="button" class="btn btn-default" id="modalWhShow"  >검색</button>
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
                  <input type="input"  class="form-control" id="barcode" name="barcode" placeholder="" >
                </div>
                <div class="col-sm-08 hide">
                     <button type="button" class="btn btn-default" id="barcodeSearch" >바코드검색</button>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">품목</label>
                </div>
                <div class="col-sm-08">
                  <input type="hidden" class="form-control" id="itm_id" name="itm_id"  placeholder="">
                  <input type="input" class="form-control"  id="itm_nm" name="itm_nm" readonly="readonly"  placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">규격</label>
                </div>
                <div class="col-sm-08">
                    <input type="input" class="form-control" id="spec" name="spec" readonly="readonly" placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">수량</label>
                </div>
                <div class="col-sm-01">
                    <input type="input" class="form-control" id="qty" name="qty" readonly="readonly" placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">변경수량</label>
                </div>
                <div class="col-sm-01">
                    <input type="number" class="form-control" id="chgQty" name="chgQty" style="width: 100%;" placeholder="">
                </div>
                <div class="col-sm-08">
                     <button type="button" class="btn btn-default" id="addGrid" >추가</button>
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

    //바코드 조회
    $('#barcodeSearch').on('click', function(){
      fnBarcodeSearch()
    });

    // 추가 버튼
    $('#addGrid').on('click', function(){
    	fnGridInsert()
    });

    // 창고 모달 버튼에 이벤트를 건다.
    $('#modalWhShow').on('click', function(){
      $('#modal-wh').modal('show');
      //초기화
      $('#shWhCd').val('')
      $('#shFacCd').val( $('#nFacCd').val())
      fnInitOntherWhModalPopup('#nWhCd', '#nWhNm')
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
          { title: "수정수량",  name: "chg_qty", type: "text", width: 90, height: 50 },
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
        }
      })
  });

  //창고 조회
  function fnSign(){
     var ddt = $("#frDt").find("input").val();
     $("#jsGrid1").jsGrid("loadData");
  }

  function fnCancel(){
    fnBarcodeScanner()
  }

  //바코드 조회
  function fnBarcodeSearch(){
    let params = {
       barcode: $('#barcode').val()
    }
    gf_barcodeSearch('/cms/ship/getLotMasterInfoInCheck', params, function(result){
      console.log('fnBarcodeSearch=====', result)
      const getData = result.data;
      if(getData.length > 0 ){


        let qtyStr_tmp = getData[0]["pda_qty"]
        let qtyStr= parseInt(qtyStr_tmp)
        if(qtyStr === 0){
          gf_alert('바코드값이 없습니다')
          return false;
        }

        let resultData = getData[0];

        $('#itm_id').val(resultData["itm_id"])
        $('#itm_nm').val(resultData["itm_nm"])
        $('#qty').val(qtyStr_tmp)
        $('#spec').val(resultData["spec"])


        //기타정보 확인
	      $('#temp_barcode').val(resultData.barcode);
	      $('#temp_itm_nm').val(resultData.itm_nm);
	      $('#temp_pda_qty').val(resultData.pda_qty);
	      $('#temp_spec').val(resultData.spec);
	      $('#temp_itm_id').val(resultData.itm_id);
	      $('#temp_src_no').val(resultData.src_no);
	      $('#temp_src_sq').val(resultData.src_sq);
	      $('#temp_lot_no').val(resultData.lot_no);
      }else{
        gf_alert('바코드값이 없습니다')
        return false;
      }

    })
  }

  /***
      추가버튼 선택시
      그리드 insert 설정
  */
  function fnGridInsert(){
      var insert_item = {};
      //데이터를 추가를 위해서 json object 생성
      insert_item.barcode = $('#temp_barcode').val();
      insert_item.itm_nm  = $('#temp_itm_nm').val();
      insert_item.pda_qty = $('#temp_pda_qty').val();
      insert_item.spec  = $('#temp_spec').val();
      insert_item.itm_id  = $('#temp_itm_id').val();
      insert_item.src_no  = $('#temp_src_no').val();
      insert_item.src_sq  = $('#temp_src_sq').val();
      insert_item.lot_no  = $('#temp_lot_no').val();
      insert_item.chg_qty  = $('#chgQty').val();
      $("#jsGrid1").jsGrid("insertItem", insert_item);
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
              , t_facCd : gl_facCd()//  로그인 한사람의 공장 코드
              , out_qty :  0
              , mov_qty :  0
              , c_facCd:''//기존공백
              , c_whCd:''//기존공백
              , mov_bc: 'LE300200'
              , ent_bc: 'LE920810'
              , src_ty: 'PD100300'
              , remark : 'PDA_재고이동'
            }
          jsonSavaArray.push(params)
        })

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

/**
 * 창고변경 이벤트
 */
function fnFacCdChange() {
  $('#nWhCd').val('')
  $('#nWhNm').val('')
}

</script>
<!--  공장 핸들바  -->
<script id="fac-template" type="text/x-handlebars-template">
{{#each bodyHtml}}
  <option value={{fac_cd}}>{{fac_nm}}</option>
{{/each}}
</script>
