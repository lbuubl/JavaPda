<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<script type="text/javascript">
   var listTotalCnt = "${totalCnt}";
    var crbnIdArray = []; //배기아이디
    var dispPriArray = []; //전시순서
    var fileVal = "";
    var fileNm = "";

    //파일명 넣어주기
    function fn_crbnImgFileChange() {
        fileVal = $("#crbnImgFile").val().split("\\");
        fileNm = fileVal[fileVal.length-1];
        fileType = $("#crbnImgFile").val().slice($("#crbnImgFile").val().indexOf(".") + 1).toLowerCase();

        if(fileType != "gif" && fileType != "jpg" && fileType != "png" && fileType != "GIF" && fileType != "JPG" && fileType != "PNG") {
            alert("jpg , png , gif 파일만 업로드 할 수 있습니다.");
            $("#crbnImgFile").val("");
            $("#crbnImgNm").val("");
            return;
        }

        var file = $("#crbnImgFile").prop("files")[0];
        var crbnImgPreSrc = window.URL.createObjectURL(file); //업로드하기 전 파일 내용가져와서 url 만들어주기

        $("#crbnImgPreSrc").val(crbnImgPreSrc);
        $("#crbnImgNm").val(fileNm);
    }

    //이미지 미리보기
    function fn_crbnImgPreview() {
        var crbnImgNm = $("#crbnImgNm").val();
        var crbnImgPreSrc = $("#crbnImgPreSrc").val(); //업로드하기 전 만들어준 url

        if(crbnImgNm == "") {
            alert("이미지를 등록해주세요.");
            return;
        }

        //화면 중앙으로 위치하도록
        var popupX = (document.body.offsetWidth / 2) - (500 / 2);
        var popupY= (window.screen.height / 2) - (500 / 2);

        var open = window.open("", "_blank", "status=no, height=500, width=500, left=" + popupX + ", top=" + popupY + "scrollbars=auto");
        open.document.write("<html><body><img src='" + crbnImgPreSrc + "'></body></html>");
    }

    //위로 올리기
    function moveUp(obj, num){
        var curTr = $(obj).parent().parent();

        //첫번째 tr이면 리턴
        if(num == 1) {
            return;
        }

       var preDispPri = Number($("#dispPri" + Number(num - 1)).val());

        $("#dispPri" + num).val(preDispPri);
        $("#dispPri" + Number(num -1)).val(Number(preDispPri + 1));

        dispPriArray.push($("#dispPri" + num).val());
        dispPriArray.push($("#dispPri" + Number(num - 1)).val());

        crbnIdArray.push($("#crbnId" + num).val());
        crbnIdArray.push($("#crbnId" + Number(num - 1)).val());

        curTr.prev().before(curTr); //순서 바꾸기

        //순서저장하기
        fn_save("OU");
    }

    //아래로 내리기
    function moveDown(obj, num){
        var tr = $(obj).parent().parent();

        //마지막 tr이면 리턴
        if(num == listTotalCnt) {
            return;
        }

        var preDispPri = Number($("#dispPri" + Number(num + 1)).val());
        $("#dispPri" + num).val(preDispPri);
        $("#dispPri" + Number(num + 1)).val(Number(preDispPri - 1));

        dispPriArray.push($("#dispPri" + num).val());
        dispPriArray.push($("#dispPri" + Number(num + 1)).val());

        crbnIdArray.push($("#crbnId" + num).val());
        crbnIdArray.push($("#crbnId" + Number(num + 1)).val());

        tr.next().after(tr); //순서 바꾸기

        //순서저장하기
        fn_save("OU");
    }

    //저장하기
    function fn_save(gb, index) {
        var str = "";
        var form = $("#writeForm");
        form.append("<input type='hidden' name='gb' value='" + gb +"'>");
        form.append("<input type='hidden' name='crbnIdArray' value='" + crbnIdArray +"'>");
        form.append("<input type='hidden' name='dispPriArray' value='" + dispPriArray +"'>");
        form.append("<input type='hidden' name='updateCrbnId' value='" + $("#crbnId" + index).val() +"'>");
        form.append("<input type='hidden' name='updateCrbnImgId' value='" + $("#crbnImgId" + index).val() +"'>");
        var formData = new FormData($('#writeForm')[0]);

        if(gb == "I") {
            str = "저장";

            if($("#crbnImgNm").val() == "") {
                alert("파일을 선택해주세요.");
                return;
            }
        }
        //우선순위 수정
        else if(gb == "OU") {
            str = "수정";
        }
        //이미지 수정
        else if(gb == "U") {
            str = "수정";

            if($("#crbnImgNm").val() == "") {
                alert("파일을 선택해주세요.");
                return;
            }
        }
        else if(gb == "D") {
            str = "삭제";
        }

        if(gb != "OU") {
            if(confirm("정말 " + str + "하시겠습니까?")) {
                $.ajax({
                    url : "${pageContext.request.contextPath}/pda/product/crbnSave",
                    type : "POST",
                    enctype: "multipart/form-data",
                    data : formData,
                    processData: false,
                    contentType: false,
                    success : function(data) {
                        if(data == "success") {
                            alert(str + "되었습니다.");

                            //새로고침
                            location.reload();
                       }
                        else {
                            alert(str + "중 문제가 발생했습니다. 다시 " + str + "해주세요.");
                        }
                    },
                    error : function() {
                        alert("처리중 오류가 발생했습니다.");
                    }
                });
            }
            else {
                return;
            }
        }
        else {
            $.ajax({
                url : "${pageContext.request.contextPath}/pda/product/crbnSave",
                type : "POST",
                enctype: "multipart/form-data",
                data : formData,
                processData: false,
                contentType: false,
                success : function(data) {
                    if(data == "success") {
                        //새로고침
                        location.reload();
                   }
                    else {
                        alert(str + "중 문제가 발생했습니다. 다시 " + str + "해주세요.");
                    }
                },
                error : function() {
                    alert("처리중 오류가 발생했습니다.");
                }
            });
        }
    }
</script>
    <div id="viewport">
        <!-- 컨텐츠 -->
        <div id="contents">
            <div class="contitle">
                <div class="wrap">
                    <a href="#" title="메뉴 보기" id="btn_gnb_menu" class="btn_menu"><i class="fa fa-bars" aria-hidden="true"></i></a>
                    <!-- <h2>CARBON FIBRE</h2> -->
                    <form name="logoutForm" method="post" action="${pageContext.request.contextPath}/pda/logout">
                        <button type="submit" class="btn btn-logout">로그아웃</button>
                    </form>
                </div>
            </div>
            <form id="writeForm" name="writeForm" method="post" enctype="multipart/form-data">
            <div class="content_wrap">
                <!-- <h3>CARBON FIBRE</h3> -->
                    <div class="write">
                        <table id="crbnTb">
                            <colgroup>
                                <col width="15%"/>
                                <col width="*"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="col">검색</th>
                                    <td>
                                        <input type="hidden" id="crbnImgPreSrc" value=""/>
                                        <input type="text" id="crbnImgNm" class="crbnImgNm" class="w01" value="${crbnList[0].crbnImgNm}"/>
                                        <input type="file" id="crbnImgFile" name="crbnImgFile" multiple="multiple" onchange="fn_crbnImgFileChange();"/>
                                        <button type="button" class="btn btn-list" onclick="fn_crbnImgPreview();">미리보기</button>
                                        <button type="button" class="btn btn-write" onclick="fn_save('I', '');">등록</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="list">
                        <table>
                            <colgroup>
                                <col width="5%"/>
                                <col width="*"/>
                                <col width="15%"/>
                                <col width="15%"/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col">번호</th>
                                    <th scope="col">이미지</th>
                                    <th scope="col">우선순위</th>
                                    <th scope="col">수정/삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:choose>
                                    <c:when test="${! empty crbnList}">
                                        <c:forEach items="${crbnList}" var="crbnList" varStatus="stat">
                                            <tr id="crbnTr">
                                                <td class="gary">
                                                    <fmt:parseNumber var = "num" integerOnly = "true" type = "number" value = "${crbnList.rownum}"/>
                                                    ${num}
                                                </td>
                                                <td>
                                                    <input type="hidden" id="crbnImgId${stat.index + 1}" name="crbnImgId" value="${crbnList.crbnImgId}"/>
                                                    <img alt="" src="${pageContext.request.contextPath}/resources/static/upload${crbnList.crbnImgPath}" max-width="100%" height="100">
                                                </td>
                                                <td>
                                                    <input type="hidden" id="crbnId${stat.index + 1}" name="crbnId" value="${crbnList.crbnId}"/>
                                                    <input type="hidden" id="dispPri${stat.index + 1}" name="dispPri" value="${crbnList.dispPri}"/>
                                                    <button type="button" onclick="moveUp(this, ${stat.index + 1}); return false;">▲</button>
                                                    <button type="button" onclick="moveDown(this, ${stat.index + 1}); return false;">▼</button>
                                                </td>
                                                <td>
                                                    <button type="button" class="btn btn-modify" onclick="fn_save('U', '${stat.index + 1}');">수정</button>
                                                    <button type="button" class="btn btn-delete" onclick="fn_save('D', '${stat.index + 1}');">삭제</button>
                                                </td>
                                            </tr>
                                        </c:forEach>
                                    </c:when>
                                    <c:otherwise>
                                        <tr>
                                            <td colspan="4">내역이 없습니다.</td>
                                        </tr>
                                    </c:otherwise>
                                </c:choose>
                            </tbody>
                        </table>
                    </div>

                <c:if test="${! empty crbnList}">
                    <jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/common/pagination.jsp"></jsp:include>
                </c:if>
                <div class="content_bottom">
                </div>
            </div>
            </form>
        </div>
    </div>