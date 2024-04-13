<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
  <c:if test="${mobileYn}"> <!-- if와 동일 -->
    <script src="/resources/static/js/cordova.js"></script>
    <script src="/resources/static/js/cordova_plugins.js"></script>
  </c:if> <!-- else 종료 -->

    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6" id="contentTitle">
            <h1>재고확인 </h1>
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
    
    
    <!-- form start -->
    <form class="form-horizontal" id="form" name="form">
      <div class="card">
        <div class="card card-info">
            <div class="card-header">
                <h5 class="m-0">재고실사 창고 </h5>
            </div>
            <div class="card-body">
              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">공장</label>
                </div>
                <div class="col-sm-08">
                  <input type="input" class="form-control" id="barcode" name="barcode" placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">창고</label>
                </div>
                <div class="col-sm-08">
                  <!-- <input type="input" class="form-control" id="cust_cd" name="cust_cd"  placeholder=""> -->
                  <input type="input" class="form-control" id="cust_nm" name="cust_nm"  placeholder="">
                </div>
                <div class="col-sm-01">
                    <!-- <button type="button" class="btn btn-default" onclick="fnFacModalPopup()" data-toggle="modal" data-target="#modal-wh">창고검색</button> -->
                     <button type="button" class="btn btn-default" id="modalWhShow" data-toggle="modal" >창고검색</button>
                </div>
              </div>

            </div>
         </div>
      </div>

      <div class="card">
        <div class="card card-info">
            <div class="card-body">
              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">바코드</label>
                </div>
                <div class="col-sm-08">
                  <input type="input" class="form-control" id="barcode" name="barcode" placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">품목명</label>
                </div>
                <div class="col-sm-08">
                  <input type="input" class="form-control" id="itmNm" name="itmNm"  placeholder="">
                </div>
              </div>


              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">규격</label>
                </div>
                <div class="col-sm-01">
                    <input type="input" class="form-control" id="spac" name="spac" placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">수량</label>
                </div>
                <div class="col-sm-01">
                    <input type="input" class="form-control" id="qty" name="qty" placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-02">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">수정수량</label>
                </div>
                <div class="col-sm-01">
                    <input type="input" class="form-control" id="qty" name="qty" placeholder="">
                </div>

                <div class="col-sm-01">
                    <!-- <button type="button" class="btn btn-default" onclick="fnFacModalPopup()" data-toggle="modal" data-target="#modal-wh">창고검색</button> -->
                     <button type="button" class="btn btn-default" id="modalWhShow" data-toggle="modal" >수정</button>
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
              <button type="button" class="btn btn-info" id="sign"  onclick="fnSign()" >삭제</button>
              <button type="button" class="btn btn-info" id="sign"  onclick="fnSave()" >저장</button>
              <button type="button" class="btn btn-default float-right" onclick="fnCancel()" >출하</button>
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
    //바코스 스켄 설정
    function fnBarcodeScanner(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                      "Result: " + result.text + "\n" +
                      "Format: " + result.format + "\n" +
                      "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera : false, // iOS and Android
                showFlipCameraButton : true, // iOS and Android
                showTorchButton : true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt : "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats : "QR_CODE,PDF_417,CODE_128", // default: all but PDF_417 and RSS_EXPANDED
                orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations : true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
         );
      }

    $(function () {

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
                { title: "요청일",  name: "req_dt", type: "text", width: 150, height: 30 },
                { title: "진행", name: "wok_sec", type: "text", width: 100, height: 30 },
                {title: "거래처명",   name: "cust_nm", type: "text", width: 200 , height: 30},
                {title: "운송",   name: "tran_bc", type: "text", width: 200 , height: 30},
                {title: "요청번호",   name: "req_no", type: "text", width: 200 , height: 30},
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
                        url : "${pageContext.request.contextPath}/cms/os/usp_zt_40_out_itm_sch_re1",
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
             }
          })
        const ldsc = [
           { emp_no: "222222", kor_nm: '25',emp_cus_cd:'testsets'}
           ,{ emp_no: "111111111", kor_nm: '25',emp_cus_cd:'testsets'}
           ]

        console.log('ldsc====', ldsc)
        $("#jsGrid1").jsGrid("loadData", {data : ldsc})
        /*
        $("#jsGrid1").jsGrid("insertItem", ldsc[0]).done(function() {
            console.log("insertion completed");
        });
        */
        console.log('ldsc====', ldsc)
      });

    //창고 조회
    function fnSign(){


        var ddt = $("#frDt").find("input").val();


        console.log('========', $('#frDt'))
        alert(ddt  )
        $("#jsGrid1").jsGrid("loadData");
    }

    function fnFacModalPopup(){
        $("#jsGrid_fac").jsGrid({
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
                { title: "사번",  name: "emp_no", type: "text", width: 150, height: 30 },
                { title: "테스트1", name: "kor_nm", type: "text", width: 100, height: 30 },
                {title: "테스트2",   name: "emp_cus_cd", type: "text", width: 200 , height: 30},
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
                loadData: function(filter) {
                    var d = $.Deferred();
                    $.ajax({
                        url : "${pageContext.request.contextPath}/cms/common/usp_zt_00_login_pda",
                        type : "POST",
                        processData: false,
                        contentType : "application/json; charset=utf-8",
                        dataType: "json",
                        data :JSON.stringify({ id : "lbuubl"}),
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
             }
          })
    }

    function fnCancel(){
        fnBarcodeScanner()
    }
    </script>