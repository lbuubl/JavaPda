<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

      <div class="modal fade" id="modal-fac">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">공장검색</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="card-body">
	              <div class="form-group row">
	                <div class="col-sm-02">
	                  <label for="inputEmail3" class="col-sm-2 col-form-label">공장코드</label>
	                </div>
	                <div class="col-sm-08">
	                  <input type="input" class="form-control" id="shFacCd" name="shFacCd" placeholder="">
	                </div>
	              </div>
              <div class="card-body">
	              <div class="form-group row">
	                <div class="col-sm-02">
	                  <label for="inputEmail3" class="col-sm-2 col-form-label">공장명</label>
	                </div>
	                <div class="col-sm-05">
	                  <input type="input" class="form-control" id="shFacNm" name="shFacNm" placeholder="">
	                </div>
	                <div class="col-sm-01">
	                     <button type="button" class="btn btn-default" id="schPopupWh" onclick="fnSchPopupWh()"  data-toggle="modal" >창고검색</button>
	                </div>
	              </div>
	            </div>
            <!-- Main content -->
            <section class="content" style="height: 500px;">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">창고리스트</h3>
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
            <div class="modal-footer justify-content-between">
              <button type="button" id="modelClose" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
    <script>

    function fnSchPopupWh(){
        $("#jsGrid_fac").jsGrid("loadData");
    }
    function fnInitFacModalPopup(facCdId, facNmId){
        $("#jsGrid_fac").jsGrid({
            width: "100%",
            heading: true,
            inserting: false,
            editing: false,
            sorting: true,
            paging: true,
            selecting: true,
            autoload : true,
            pageSize: 10,
            noDataContent: "조회 데이터가 없습니다.",
            fields: [
                { title: "공장코드",  name: "fac_cd", type: "text", width: 150, height: 70 },
                { title: "공장명", name: "fac_nm", type: "text", width: '80%', height: 100 },
            ] ,
            rowClass: function(item, itemIndex) {
                //행별로 id값을 지정
                return "client-" + itemIndex;
             },
            rowClick: function(args) {
                console.log('rowClick==========', args, args.item)
                //데이터값 설정
                const facCd = args.item.fac_cd
                const facNm = args.item.fac_nm
                $(facCdId).val(facCd)
                $(facNmId).val(facNm)
                //닫기
                $('#modelClose').click();
            }, controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    let params = {
                        facCd : ''// gl_facCd()
                        , facNm:  $('#shFacNm').val()
                    }
                    console.log('fnInitFacModalPopup params=------',params)
                    $.ajax({
                        url : "${pageContext.request.contextPath}/cms/common/getFacInfo",
                        type : "POST",
                        processData: false,
                        contentType : "application/json; charset=utf-8",
                        dataType: "json",
                        data :JSON.stringify(params),
                        success : function(data) {
                            console.log('fnInitFacModalPopup data====', data.data)
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


    </script>