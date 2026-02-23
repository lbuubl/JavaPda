<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <title>HANIL</title>
    <!--<meta name="viewport" content="width=device-width, initial-scale=1.0">-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="stylesheet" href="/resources/static/css/shake.css" />
	<link rel="stylesheet" href="/resources/static/css/ie.css" />

    <script type="text/javascript" src="/resources/static/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript"  src="/resources/static/js/jquery.placeholder.enhanced-1.5.js"></script>
    <script type="text/javascript"  src="/resources/static/js/jquery.bxslider.min.js"></script>
    <script type="text/javascript"  src="/resources/static/js/jquery.validate.min.js"></script>
    <script type="text/javascript"  src="/resources/static/js/common.js"></script>

  </head>
   <body>
    <section class="content">
    <!-- header -->
      <%-- <tiles:insertAttribute name="header"/> --%>
      <tiles:insertAttribute name="body"/> <!-- body -->
      <tiles:insertAttribute name="footer"/> <!-- /WEB-INF/views/common/layout/footer.jsp -->
    </section>
  </body>
</html>