<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript">
    var fileVal = "";
    var fileNm = "";

    //wheel 파일명 넣어주기
    function fn_wheelImgFileChange() {
        fileVal = $("#wheelImgFile").val().split("\\");
        fileNm = fileVal[fileVal.length-1];
        fileType = $("#wheelImgFile").val().slice($("#wheelImgFile").val().indexOf(".") + 1).toLowerCase();

        if(fileType != "gif" && fileType != "jpg" && fileType != "png" && fileType != "GIF" && fileType != "JPG" && fileType != "PNG") {
            alert("jpg , png , gif 파일만 업로드 할 수 있습니다.");
            $("#wheelImgFile").val("");
            $("#wheelImgNm").val("");
            return;
        }

        var file = $("#wheelImgFile").prop("files")[0];
        var wheelImgPreSrc = window.URL.createObjectURL(file); //업로드하기 전 파일 내용가져와서 url 만들어주기

        $("#wheelImgPreSrc").val(wheelImgPreSrc);
        $("#wheelImgNm").val(fileNm);
    }

    //제품이미지 미리보기
    function fn_wheelImgPreview() {
        var wheelImgNm = $("#wheelImgNm").val();
        var wheelImgPreSrc = $("#wheelImgPreSrc").val(); //업로드하기 전 만들어준 url
        var imgSrc = "";

        if(wheelImgNm == "") {
            alert("이미지를 등록해주세요.");
            return;
        }

        if(wheelImgPreSrc != "") {
            imgSrc = wheelImgPreSrc;
        }
        else {
            //기존에 저장한 이미지가 있다면
            if($("#wheelImgId").val() != "") {
                imgSrc = $("#wheelImgPath").val();
            }
        }

        //화면 중앙으로 위치하도록
        var popupX = (document.body.offsetWidth / 2) - (500 / 2);
        var popupY= (window.screen.height / 2) - (500 / 2);

        var open = window.open("", "_blank", "status=no, height=500, width=500, left=" + popupX + ", top=" + popupY + "scrollbars=auto");
        open.document.write("<html><body><img src='" + imgSrc + "'></body></html>");
    }

    //wheel 저장
    function fn_save(gb) {
        var str = "";
        var form = $("#writeForm");
        form.append("<input type='hidden' name='gb' value='" + gb +"'>");
        var formData = new FormData($('#writeForm')[0]);

        if(gb == "I") {
            str = "저장";
        }
        else if(gb == "U") {
            str = "수정";
        }
        else if(gb == "D") {
            str = "삭제";
        }

        if($("#wheelNm").val() == "") {
            alert("제품명을 입력해주세요.");
            return;
        }

        if (confirm("정말 " + str + "하시겠습니까?")) {
            $.ajax({
                url : "${pageContext.request.contextPath}/cms/product/wheelSave",
                type : "POST",
                enctype: "multipart/form-data",
                data : formData,
                processData: false,
                contentType: false,
                success : function(data) {
                    if(data == "success") {
                        alert(str + "되었습니다.");

                        //수정 시
                        if(gb == "U") {
                            location.reload();
                        }
                        //등록, 삭제 시
                        else {
                            location.href = "${pageContext.request.contextPath}/cms/product/wheelList";
                        }
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
</script>
    <div id="viewport">
        <!-- 컨텐츠 -->
        <div id="contents">
            <div class="contitle">
                <div class="wrap">
                    <a href="#" title="메뉴 보기" id="btn_gnb_menu" class="btn_menu"><i class="fa fa-bars" aria-hidden="true"></i></a>
                    <!-- <h2>WHEEL</h2> -->
                    <form name="logoutForm" method="post" action="${pageContext.request.contextPath}/cms/logout">
                        <button type="submit" class="btn btn-logout">로그아웃</button>
                    </form>
                </div>
            </div>
            <div class="content_wrap">

            <!-- <h3>WHEEL</h3> -->
                <form id="writeForm" name="writeForm" method="post" enctype="multipart/form-data">
                    <div class="write">
                        <table>
                            <colgroup>
                                <col width="15%" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="col">제품명</th>
                                    <td>
                                        <input type="hidden" id="wheelId" name="wheelId" value="${wheelList[0].wheelId}"/>
                                        <input type="text" id="wheelNm" name="wheelNm" class="w01" value="${wheelList[0].wheelNm}"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">제품이미지<br>440 x 440</th>
                                    <td>
                                        <input type="hidden" id="wheelImgId" name="wheelImgId" value="${wheelList[0].wheelImgId}"/>
                                        <input type="hidden" id="wheelImgPreSrc" value=""/>
                                        <input type="hidden" id="wheelImgPath" value="${pageContext.request.contextPath}/resources/static/upload${wheelList[0].wheelImgPath}">
                                        <input type="text" id="wheelImgNm" class="w01" value="${wheelList[0].wheelImgNm}" readonly="readonly"/>
                                        <input type="file" id="wheelImgFile" name="wheelImgFile" multiple="multiple" onchange="fn_wheelImgFileChange();"/>
                                        <button type="button" class="btn btn-list2" onclick="fn_wheelImgPreview();">미리보기</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">부가설명</th>
                                    <td>
                                        <input type="text" id="adtDsc" name="adtDsc" class="w01" value="${wheelList[0].adtDsc}" maxlength="300"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">Available size</th>
                                    <td>
                                        <textarea name="sizeCntn" rows="6" style="width:50%;">${wheelList[0].sizeCntn}</textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">Designed for</th>
                                    <td>
                                        <textarea name="degnCntn" rows="6" style="width:50%;">${wheelList[0].degnCntn}</textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">노출여부</th>
                                    <td>
                                        <select name="expsYn" class="sw04" id="expsYn">
                                            <option <c:if test="${wheelList[0].expsYn eq 'Y'}">selected</c:if> value="Y">노출</option>
                                            <option <c:if test="${wheelList[0].expsYn eq 'N'}">selected</c:if> value="N">비노출</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                  </div>

                  <div class="btn_c">
                      <c:choose>
                          <c:when test="${! empty wheelId}">
                              <button type="button" class="btn btn-modify" onclick="fn_save('U');">수정</button>
                              <button type="button" class="btn btn-delete" onclick="fn_save('D');">삭제</button>
                          </c:when>
                          <c:otherwise>
                              <button type="button" class="btn btn-write" onclick="fn_save('I');">등록</button>
                          </c:otherwise>
                      </c:choose>
                      <button type="button" class="btn btn-list" onclick="location.href='${pageContext.request.contextPath}/cms/product/wheelList'">목록</button>
                  </div>
              </form>
              <div class="content_bottom">
              </div>
            </div>
        </div>
    </div>