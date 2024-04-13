<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>


  <c:if test="${mobileYn}"> <!-- if와 동일 -->
    <script src="/resources/static/js/cordova.js"></script>
    <script src="/resources/static/js/cordova_plugins.js"></script>
  </c:if> <!-- else 종료 -->
      <div class="card">
        <!-- Horizontal Form -->
        <div class="card card-info">
          <!-- form start -->
          <form class="form-horizontal" id="form" name="form">
            <div class="card-body">
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">이름</label>
                <div class="col-sm-10">
                  <input type="input" class="form-control" id="id" id="id" value="lbuubl" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">사용</label>
                <div class="col-sm-10">
                  <input type="input" class="form-control" id="inputPassword3" placeholder="">
                </div>
              </div>

                <div class="form-group row">
                  <label>Date:</label>
                    <div class="input-group date" id="reservationdate" data-target-input="nearest">
                        <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate"/>
                        <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
              <button type="button" class="btn btn-info" id="sign"  onclick="fnSign()" >jsGrid load</button>
              <button type="button" class="btn btn-info" id="sign"  onclick="fnSign()" >모발팝업</button>
              <button type="button" class="btn btn-default float-right" onclick="fnCancel()" >바코드스캔</button>
              <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default">Modal</button>
              <button type="button" class="btn btn-default" onclick="fnFacModalPopup()" data-toggle="modal" data-target="#modal-fac">Modal Fac</button>

            </div>
            <!-- /.card-footer -->
          </form>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div id="jsGrid1"></div>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

      <div class="modal fade" id="modal-default">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Default Modal</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>One fine body&hellip;</p>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <div class="modal fade" id="modal-fac">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Default Modal</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

			        <div class="card-body">
	              <div class="form-group row">
	                <label for="inputEmail3" class="col-sm-2 col-form-label">이름</label>
	                <div class="col-sm-10">
	                  <input type="input" class="form-control" id="id_2" value="lbuubl" placeholder="">
	                </div>
	              </div>
	              <div class="form-group row">
	                <label for="inputPassword3" class="col-sm-2 col-form-label">사용</label>
	                <div class="col-sm-10">
	                  <input type="input" class="form-control" id="inputPassword3_1" placeholder="">
	                </div>
	              </div>

	                <div class="form-group row">
	                  <label>Date:</label>
	                    <div class="input-group date" id="reservationdate_1" data-target-input="nearest">
	                        <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate"/>
	                        <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
	                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
	                        </div>
	                    </div>
	                </div>

							    <!-- Main content -->
							    <section class="content">
							      <div class="card">
							        <div class="card-header">
							          <h3 class="card-title">jsGrid</h3>
							        </div>
							        <!-- /.card-header -->
							        <div class="card-body">
							          <div id="jsGrid_fac"></div>
							        </div>
							        <!-- /.card-body -->
							      </div>
							      <!-- /.card -->
							    </section>
							    <!-- /.content -->
			        </div>

            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
    <script>


    //바코스 스켄 설정
    function fnBarcodeScanner(){

        alert(1)
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
        //Date picker
        $('#reservationdate').datetimepicker({
        	 format: 'YYYY-MM-DD'
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

    function fnSign(){
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