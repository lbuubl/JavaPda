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
            <h1>원소재입고</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right" id="bodyOl">
              <li class="breadcrumb-item"><a href="#" >Home </a></li>
              <li class="breadcrumb-item active" id="level1">원소재입고</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

      <div class="card">
        <!-- Horizontal Form -->
        <div class="card card-info">
            <div class="card-header">
                <h5 class="m-0">원소재입고 정보</h5>
            </div>
          <!-- form start -->
          <form class="form-horizontal" id="form" name="form">
            <div class="card-body">

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">바코드</label>
                </div>
                <div class="col-sm-08">
                  <input type="input"  class="form-control" id="barcode" name="barcode" placeholder="" >
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
                  <input type="input" class="form-control"  id="itm_nm" name="itm_nm" readOnly='readOnly'  placeholder="">
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
                <div class="col-sm-08">
                    <input type="input" class="form-control" id="qty" name="qty" readOnly='readOnly'  placeholder="">
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
              <h3 class="card-title">원소재 상세 리스트</h3>
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
        }
      })
  });

    //바코드 조회 검색
    function fnBarcodeSearch(){
        let params = {
           barcode: $('#barcode').val()
        }

      $.ajax({
            url : "${pageContext.request.contextPath}/cms/rcv/getLotMasterInfoInCheck",
            type : "POST",
            processData: false,
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            data :JSON.stringify(params),
            success : function(data) {
                console.log('data====', data.data)
                let getData = data.data;
                if(getData.length > 0 ){

                  //1) 같은 바코드가 있는지 확인
                  if (gf_gridBarcodeChk('jsGrid1', getData[0]["barcode"])) {
                	  let pdaWhDb  ="";
                	  if(getData[0]["pda_wh"]!=undefined){
                		  pdaWhDb  =  getData[0]["pda_wh"];
                    }
                     const glWhCd  = $('#glWhCd').val()
                     //2) 같은 창고면 add 안되게 설정
                     if(pdaWhDb===glWhCd){
                       gf_alert('이미 이동하려는 창고에 있습니다')
                       $('#barcode').val('')
                       $('#itm_nm').focus()
                       return false;
                     }

                     if(pdaWhDb!=''){
                         gf_alert('해당창고에 바코드정보가 없습니다.')
                         $('#barcode').val('')
                         $('#itm_nm').focus()
                         return false;
                       }

                  	let qtyStr_tmp = getData[0]["pda_qty"]
                      alert(qtyStr_tmp)
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
                  }else {
                    gf_alert('바코드 정보가 있습니다.')
                    gf_barcodeClean()
                  }
                }else{
                  gf_alert('바코드값이 없습니다')
                  gf_barcodeClean()
                  return false;
                }

            },
            error : function() {
                alert("처리중 오류가 발생했습니다.");
                gf_barcodeClean()
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
        gf_barcodeClean()
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
              , t_facCd : gl_facCd()//  로그인 한사람의 공장 코드
              , out_qty :  0
              , mov_qty :  0
              , c_facCd:''//기존공백
              , c_whCd:''//기존공백
              , mov_bc: 'LE100100'
              , ent_bc: 'LE920800'
              , src_ty: 'PD100110'
              , remark : 'Android_PDA_원소재입고'
            }
          jsonSavaArray.push(params)
        })

        $.ajax({
              url : "${pageContext.request.contextPath}/cms/rcv/setRcvRawSaveMoveNo",
              type : "POST",
              processData: false,
              contentType : "application/json; charset=utf-8",
              dataType: "json",
              data :JSON.stringify({'data' :jsonSavaArray} ),
              success : function(data) {
                  console.log('data====', data.data)
                  gf_alert('저장이완료되었습니다.')
                  location.href = "/cms/rcv/rcvrawmtis.htm?page=rcvrawmtis";
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