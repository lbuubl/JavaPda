<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>KEYVANY LOGIN</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.7, minimum-scale=0.7, maximum-scale=1.4, user-scalable=yes">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <link rel="stylesheet" media="all" href="../resources/static/css/shake.css">
    <script src="../resources/static/js/jquery-1.11.3.min.js"></script>
    <script src="../resources/static/js/jquery.placeholder.enhanced-1.5.js"></script>
    <script src="../resources/static/js/jquery.bxslider.min.js"></script>
    <script src="../resources/static/js/common.js"></script>
    <!--[if lt IE 9]>
        <link rel="stylesheet" media="all" href="css/ie.css">
        <script src="js/html5.js"></script>
        <script src="js/respond.js"></script>
    <![endif]-->
  </head>
   <body class="whbg">
    <section class="content">
      <tiles:insertAttribute name="header"/> <!--  /WEB-INF/views/common/layout/header.jsp -->
      <tiles:insertAttribute name="body"/> <!-- body -->

      <tiles:insertAttribute name="footer"/> <!-- /WEB-INF/views/common/layout/footer.jsp -->
    </section>
  </body>
</html>