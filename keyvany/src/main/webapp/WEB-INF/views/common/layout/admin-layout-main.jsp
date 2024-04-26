<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>kaak</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="/resources/plugins/fontawesome-free/css/all.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="/resources/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="/resources/dist/css/adminlte.min.css">

  <!-- Theme style -->
  <link rel="stylesheet" href="/resources/plugins/jsgrid/jsgrid-theme.min.css">
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="/resources/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/resources/plugins/fontawesome-free/css/all.min.css">
  <!-- SweetAlert2 -->
  <link rel="stylesheet" href="/resources/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css">
  <!-- Toastr -->
  <link rel="stylesheet" href="/resources/plugins/toastr/toastr.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="/resources/dist/css/adminlte.min.css">
  <!--기존정보  -->
  <script type="text/javascript" src="/resources/static/js/jquery-1.11.3.min.js"></script>
  <script type="text/javascript" src="/resources/static/js/jquery.placeholder.enhanced-1.5.js"></script>
  <script type="text/javascript" src="/resources/static/js/jquery.bxslider.min.js"></script>
  <script type="text/javascript" src="/resources/static/js/jquery.validate.min.js"></script>
  <script type="text/javascript" src="/resources/static/js/common.js"></script>
  <script type="text/javascript" src="/resources/static/js/cms.js?v0.1"></script>

<script  type="text/javascript"  src="/resources/plugins/select2/js/select2.full.min.js"></script>
<!-- jQuery -->
<script src="/resources/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="/resources/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- InputMask -->
<script src="/resources/plugins/moment/moment.min.js"></script>
  <!-- Tempusdominus Bootstrap 4 -->
<script  type="text/javascript"  src="/resources/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
  <!--//기존정보  -->
<style type="text/css">
.form-control {
    width: 130%;
}
</style>
</head>

  <body class="hold-transition sidebar-mini">


    <div id="viewport" class="wrapper">
    		<c:if test="${mobileYn}"> <!-- if와 동일 -->
	    <script src="/resources/static/js/cordova.js"></script>
	    <script src="/resources/static/js/cordova_plugins.js"></script>
	  </c:if> <!-- else 종료 -->
	      <tiles:insertAttribute name="gnb"/> <!-- gnb -->
        <tiles:insertAttribute name="aside"/> <!-- aside -->
			  <!-- Content Wrapper. Contains page content -->
			  <div class="content-wrapper">
                <tiles:insertAttribute name="content-header"/> <!-- content-header -->
				    <!-- Main content -->
				    <div class="content">
              <div class="container-fluid">
				        <tiles:insertAttribute name="body"/> <!-- body -->
				      </div>
				    </div>
			  </div>
	      <tiles:insertAttribute name="footer"/>
    </div>
  </body>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="/resources/dist/js/pages/dashboard3.js"></script>
<!-- jsGrid -->
<script src="/resources/plugins/jsgrid/demos/db.js"></script>
<script src="/resources/plugins/jsgrid/jsgrid.min.js"></script>
<!-- AdminLTE App -->
<script src="/resources/dist/js/adminlte.min.js"></script>

</html>