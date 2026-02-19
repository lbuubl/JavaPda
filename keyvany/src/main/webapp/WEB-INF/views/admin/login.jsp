<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>

<script type="text/javascript">
<!--
(function($) {
    <%-- init --%>

    $(document).ready(function () {

        var timeout = "${param.timeout}";
        if(timeout == "true"){
            alert("세션이 끊겼습니다");
            location.href = "${pageContext.request.contextPath}/pda/login";
            return false;
        }

        var status = "${status}";
        if(status=="logout"){
            alert("로그아웃되었습니다");
            location.href = "${pageContext.request.contextPath}/pda/login";
            return false
        }

        var error = htmlEntities("${error}");
        if(error =="true"){
            //메시지
            var failMessage = htmlEntities("${failMessage}");
            alert(failMessage);
            location.href = "${pageContext.request.contextPath}/pda/login";
            return false
        }

        $("#loginButton").click(function() {
            $( "#frmPaging" ).submit();
        });

        $("#frmPaging").validate( {
            rules: {
                username: {
                    required: true,
                },
                password: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: "아이디를  입력하여 주십시요.",
                },
                password: {
                    required: "패스워드를 입력하여 주십시요."
                }
            },
            errorPlacement: function(error, element) {
                // do nothing
            },
            invalidHandler: function(form, validator) {
                 var errors = validator.numberOfInvalids();

                 if (errors) {
                     console.log("errors==========",form, validator,validator.errorList[0].element.id)
                     alert(validator.errorList[0].message);
                     $("#"+validator.errorList[0].element.id).focus();
                 }
            },
            submitHandler: function(form) {
                form.submit();
            }
        } );


        $("#username , #password").keydown(function(key) {
            if (key.keyCode == 13) {
                $( "#frmPaging" ).submit();
            }
        });
    });

    })(jQuery);
//-->

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

</script>

<body class="whbg">

<div id="viewport">
   <div class="logintop"></div>

  <div class="login_area">
      <div class="form_area">

            <form id="frmPaging" name="frmPaging"  class="cmxform" action="/pda/loginAction" method="post">
	            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
		          <input type="text" name="username" id="username" maxlength="20" title="아이디" placeholder="아이디" class="input_text id">
		          <input type="password"  type="password" name="password" id="password"  autocomplete="off"  maxlength="20" placeholder="8자리 이상 숫자/영문 조합"  class="input_text pw">
		          <a href="#" id="loginButton" class="btns btn_login">로그인</a>
	      </form>
      </div>
   </div>
</div>
</html>