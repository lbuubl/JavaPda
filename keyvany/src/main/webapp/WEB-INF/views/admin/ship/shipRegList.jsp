<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
      <div class="card">
        <!-- Horizontal Form -->
        <div class="card card-info">
          <!-- form start -->
          <form class="form-horizontal">
            <div class="card-body">
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">이름</label>
                <div class="col-sm-10">
                  <input type="input" class="form-control" id="inputEmail3" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">사용</label>
                <div class="col-sm-10">
                  <input type="input" class="form-control" id="inputPassword3" placeholder="">
                </div>
              </div>
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
              <button type="submit" class="btn btn-info">Sign in</button>
              <button type="submit" class="btn btn-default float-right">Cancel</button>
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

    <script>
    $(function () {
        $("#jsGrid1").jsGrid({
            height: "auto",
            width: "100%",
            sorting: true,
            paging: true,
          //  data: db.clients,
            fields: [
                { name: "Name", type: "text", width: 150 },
                { name: "Age", type: "number", width: 50 },
                { name: "Address", type: "text", width: 200 },
            ]
        });

        $("#jsGrid1").jsGrid("loadData");
        $("#jsGrid1").jsGrid("insertItem", { Name: "111111111", Age: 25,Address:'testsets'}).done(function() {
            console.log("insertion completed");
        });


        $.ajax({
            url : "${pageContext.request.contextPath}/cms/common/usp_zt_00_login_pda",
            type : "POST",
            enctype: "multipart/form-data",
            processData: false,
            contentType : "application/x-www-form-urlencoded; charset=utf-8",
            data : {
                id : 'lbuubl'
            },
            success : function(data) {
                console.log('data====', data)
            },
            error : function() {
                alert("처리중 오류가 발생했습니다.");
            }
        });

      });
    </script>