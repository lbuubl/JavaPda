<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<script type="text/javascript">
    var iNum = "${mainImgCnt}"; //아이디 겹치지 않게하기위해서
    var imgGb = ""; //이미지 등록, 수정 구분

    //메인이미지 파일명 넣어주기
    function fn_mainImgFileChange(index) {
        fileVal = $("#mainImgFile" + index).val().split("\\");
        fileNm = fileVal[fileVal.length-1];
        fileType = $("#mainImgFile" + index).val().slice($("#mainImgFile" + index).val().indexOf(".") + 1).toLowerCase();

        if(fileType != "gif" && fileType != "jpg" && fileType != "png" && fileType != "GIF" && fileType != "JPG" && fileType != "PNG") {
            alert("jpg , png , gif 파일만 업로드 할 수 있습니다.");
            $("#mainImgFile" + index).val("");
            $("#mainImgNm" + index).val("");
            return;
        }

        var file = $("#mainImgFile" + index).prop("files")[0];
        var mainImgPreSrc = window.URL.createObjectURL(file); //업로드하기 전 파일 내용가져와서 url 만들어주기

        //이미지 등록, 수정구분
        if($("#mainImgId" + index).val() != "") {
            imgGb = "U";
        }
        else {
            imgGb = "I";
        }

        $("#mainImgGb" + index).val(imgGb);
        $("#mainImgPreSrc" + index).val(mainImgPreSrc);
        $("#mainImgNm" + index).val(fileNm);
    }

    //메인이미지 미리보기
    function fn_mainImgPreview(index) {
        var mainImgNm = $("#mainImgNm" + index).val();
        var mainImgPreSrc = $("#mainImgPreSrc" + index).val(); //업로드하기 전 만들어준 url
        var imgSrc = "";

        if(mainImgNm == "") {
            alert("이미지를 등록해주세요.");
            return;
        }

        if(mainImgPreSrc != "") {
            imgSrc = mainImgPreSrc;
        }
        else {
            //기존에 저장한 이미지가 있다면
            if($("#mainImgId" + index).val() != "") {
                imgSrc = $("#mainImgPath" + index).val();
            }
        }

        //화면 중앙으로 위치하도록
        var popupX = (document.body.offsetWidth / 2) - (500 / 2);
        var popupY= (window.screen.height / 2) - (500 / 2);

        var open = window.open("", "_blank", "status=no, height=500, width=500, left=" + popupX + ", top=" + popupY + "scrollbars=auto");
        open.document.write("<html><body><img src='" + imgSrc + "'></body></html>");
    }

    //메인이미지 추가버튼 클릭 시
    function fn_mainImgAddBtnClick() {
        var temp = "";
        iNum = Number(iNum) + 1;

        temp += "<div class='div-content' id='main_visual_area'>";
        temp += "<label for='main_copy'>메인카피</label>";
        temp += "<input type='hidden' id='mainId" + iNum + "' name='mainId'/>";
        temp += "<textarea id='mainNm" + iNum + "' name='mainNm' rows='2' style='width:355px; margin: 0px 25px 0px 27px;'></textarea>";
        temp += "<label for='description'>설명</label>";
        temp += "<textarea id='mainDsc' name='mainDsc' rows='2' style='width:355px;'></textarea>";

        temp += "<div class='wrap' style='margin: 10px 0px;'>";
        temp += "<label for='description'>연결 URL</label>";
        temp += "<input type='text' id='connUrl' name='connUrl' class='w01' style='margin-left: 23px;'/>";
        temp += "</div>";

        temp += "<div class='wrap'>";
        temp += "<label for='main_file'>비주얼 이미지</label>";
        temp += "<input type='hidden' id='mainImgId" + iNum + "' name='mainImgId'/>";
        temp += "<input type='hidden' id='mainImgPreSrc" + iNum + "' value=''/>";
        temp += "<input type='hidden' id='mainImgGb" + iNum + "' name='mainImgGb'/>";
        temp += "<input type='hidden' id='mainImgPath" + iNum + "' value=''/>";
        temp += "<input type='text' id='mainImgNm" + iNum + "' name='mainImgNm' class='w01' value='' readonly='readonly'/>";
        temp += "<input type='file' id='mainImgFile" + iNum + "'name='mainImgFile' multiple='multiple' style='margin-left: 3px;' onchange='fn_mainImgFileChange(\"" + iNum + "\");'>";
        temp += "<button type='button' class='btn btn-list2' onclick='fn_mainImgAddBtnClick();'>추가</button>";
        temp += "<button type='button' class='btn btn-list2' onclick='fn_mainImgDelBtnClick(this);'>삭제</button>";
        temp += "<button type='button' class='btn btn-list2' onclick='fn_mainImgPreview(\"" + iNum + "\");'>미리보기</button>";
        temp += "</div>";
        temp += "</div>";

        $("#mainAppend").append(temp);
    }

    //메인이미지 삭제버튼 클릭 시
    function fn_mainImgDelBtnClick(obj, index) {
        var inputMainImgNmCnt = $("input[name=mainImgNm]").length;

        var mainId = $("#mainId" + index).val();
        var mainImgId = $("#mainImgId" + index).val();

        var form = $("#visualForm");
        form.append("<input type='hidden' name='mainId' value='" + mainId +"'>");
        form.append("<input type='hidden' name='fileId' value='" + mainImgId +"'>");
        var formData = new FormData($("#visualForm")[0]);

        if(mainId != null) {
            if (confirm("정말  삭제하시겠습니까?")) {
                $.ajax({
                    url : "${pageContext.request.contextPath}/pda/manage/delImgFile",
                    type : "POST",
                    enctype: "multipart/form-data",
                    data : formData,
                    processData: false,
                    contentType: false,
                    success : function(data) {
                        if(data == "success") {
                            alert("삭제되었습니다.");

                            //새로고침
                            location.reload();
                        }
                        else {
                            alert("삭제중 문제가 발생했습니다. 다시 삭제해주세요");
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
            $(obj).parent().parent().remove();
        }

        //삭제버튼 1개 있을경우 삭제 후 다시 만들어주기 
        if(inputMainImgNmCnt < 2) {
            fn_mainAddBtnClick();
        }
    }

    //메인 리스트 저장
    function fn_saveMain(gb) {
        var mainNmCnt = "0";
        var mainimgCnt = "0";
        var form = $("#visualForm");
        form.append("<input type='hidden' name='gb' value='" + gb +"'>");
        var formData = new FormData($("#visualForm")[0]);

        //메인명이 없다면
        $("input[name=mainNm]").each(function() {
            if($(this).val() == "") {
                mainNmCnt++;
            }
        });

        //이미지가 없다면
        $("input[name=mainImgNm]").each(function() {
            if($(this).val() == "") {
                mainimgCnt++;
            }
        });

        if(mainimgCnt > 0) {
            alert("비주얼 이미지를 선택해주세요.");
            return;
        }

        if (confirm("정말 저장하시겠습니까?")) {
            $.ajax({
                url : "${pageContext.request.contextPath}/pda/manage/saveMain",
                type : "POST",
                enctype: "multipart/form-data",
                data : formData,
                processData: false,
                contentType: false,
                success : function(data) {
                    if(data == "success") {
                        alert("저장되었습니다.");
                        location.reload();
                    }
                    else {
                        alert("저장 중 문제가 발생했습니다. 다시 저장해주세요.");
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

    //메인동영상 저장
    function fn_saveVideoSrc() {
        var videoMainId = $("#videoMainId").val();
        var videoSrc = $("#videoSrc").val();

        var form = $("#youtubeForm");
        form.append("<input type='hidden' name='videoMainId' value='" + videoMainId +"'>");
        form.append("<input type='hidden' name='videoSrc' value='" + videoSrc +"'>");
        var formData = new FormData($('#youtubeForm')[0]);

        if(videoSrc == "") {
            alert("메인동영상 주소를 작성해주세요.");
            return;
        }

        if (confirm("정말 저장하시겠습니까?")) {
            $.ajax({
                url : "${pageContext.request.contextPath}/pda/manage/saveVideoSrc",
                type : "POST",
                enctype: "multipart/form-data",
                data : formData,
                processData: false,
                contentType: false,
                success : function(data) {
                    if(data == "success") {
                        alert("저장되었습니다.");
                        location.reload();
                    }
                    else {
                        alert("저장 중 문제가 발생했습니다. 다시 저장해주세요.");
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
                    <!-- <h2>메인관리</h2> -->
                    <form name="logoutForm" method="post" action="${pageContext.request.contextPath}/pda/logout">
                        <button type="submit" class="btn btn-logout">로그아웃</button>
                    </form>
                </div>
            </div>
            <div class="content_wrap">

            <form id="visualForm" name="visualForm" method="post" enctype="multipart/form-data">
                <div class="write">
                    <h3>메인관리</h3>
                        <table>
                            <colgroup>
                                <col width="15%" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="col">메인비주얼</th>
                                    <td class="th2">
                                        <c:choose>
                                            <c:when test="${mainList[0].mainId != null}">
                                                <c:forEach items="${mainList}" var="mainList" varStatus="stat">
                                                    <div class="div-content" id="main_visual_area">
                                                        <label for="main_copy">메인카피</label>
                                                        <input type="hidden" id="mainId${stat.index + 1}" name="mainId" value="${mainList.mainId}"/>
                                                        <textarea id="mainNm" name="mainNm" rows="2" style="width:355px; margin: 0px 25px 0px 27px;">${mainList.mainNm}</textarea>
                                                        <label for="description">설명</label>
                                                        <textarea id="mainDsc" name="mainDsc" rows="2" style="width:355px;">${mainList.mainDsc}</textarea>

                                                        <div class="wrap" style="margin: 10px 0px;">
                                                            <label for="description">연결 URL</label>
                                                            <input type="text" id="connUrl" name="connUrl" class="w01" value="${mainList.connUrl}" style="margin-left: 23px;"/>
                                                        </div>

                                                        <div class="wrap">
                                                            <label for="main_file">비주얼 이미지<br>
															1920 x 960</label>
                                                            <input type="hidden" id="mainImgId${stat.index + 1}" name="mainImgId" value="${mainList.mainImgId}"/>
                                                            <input type="hidden" id="mainImgPreSrc${stat.index + 1}" value=""/>
                                                            <input type="hidden" id="mainImgGb${stat.index + 1}" name="mainImgGb" value=""/>
                                                            <input type="hidden" id="mainImgPath${stat.index + 1}" value="${pageContext.request.contextPath}/resources/static/upload${mainList.mainImgPath}"/>
                                                            <input type="text" id="mainImgNm${stat.index + 1}" name="mainImgNm" class="w01" value="${mainList.mainImgNm}" readonly="readonly"/>
                                                            <input type="file" id="mainImgFile${stat.index + 1}" name="mainImgFile" multiple="multiple" onchange="fn_mainImgFileChange('${stat.index + 1}');">
                                                            <button type="button" class="btn btn-list2" onclick="fn_mainImgAddBtnClick();">추가</button>
                                                            <button type="button" class="btn btn-list2" onclick="fn_mainImgDelBtnClick(this, '${stat.index + 1}');">삭제</button>
                                                            <button type="button" class="btn btn-list2" onclick="fn_mainImgPreview('${stat.index + 1}');">미리보기</button>
                                                        </div>
                                                    </div>
                                                </c:forEach>
                                                <div id="mainAppend"></div>
                                            </c:when>
                                            <c:otherwise>
                                                <div class="div-content" id="main_visual_area">
                                                    <label for="mainNm">메인카피</label>
                                                    <input type="hidden" id="mainId1" name="mainId"/>
                                                    <textarea id="mainNm" name="mainNm" rows="2" style="width:355px; margin: 0px 25px 0px 27px;"></textarea>
                                                    <label for="mainDsc">설명</label>
                                                    <textarea id="mainDsc" name="mainDsc" rows="2" style="width:355px;"></textarea>

                                                    <div class="wrap" style="margin: 10px 0px;">
                                                        <label for="connUrl">연결 URL</label>
                                                        <input type="text" id="connUrl" name="connUrl" class="w01" style="margin-left: 23px;"/>
                                                    </div>

                                                    <div class="wrap">
                                                        <label for="main_file">비주얼 이미지</label>
                                                        <input type="hidden" id="mainImgId1" name="mainImgId"/>
                                                        <input type="text" id="mainImgNm1" name="mainImgNm" class="w01" readonly="readonly"/>
                                                        <input type="hidden" id="mainImgPreSrc1" value=""/>
                                                        <input type="hidden" id="mainImgGb1" name="mainImgGb"/>
                                                        <input type="file" id="mainImgFile1" name="mainImgFile" multiple="multiple" onchange="fn_mainImgFileChange('1');">
                                                        <button type="button" class="btn btn-list2" onclick="fn_mainImgAddBtnClick();">추가</button>
                                                        <button type="button" class="btn btn-list2" onclick="fn_mainImgDelBtnClick(this)">삭제</button>
                                                        <button type="button" class="btn btn-list2" onclick="fn_mainImgPreview('1');">미리보기</button>
                                                    </div>
                                                </div>
                                                <div id="mainAppend"></div>
                                            </c:otherwise>
                                        </c:choose>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="btn_c">
                            <c:choose>
                                <c:when test="${mainList[0].mainId == null}">
                                    <button type="button" class="btn btn-write" onclick="fn_saveMain('I');">저장</button>
                                </c:when>
                                <c:otherwise>
                                    <button type="button" class="btn btn-write" onclick="fn_saveMain('U');">저장</button>
                                </c:otherwise>
                            </c:choose>
                        </div>
                </div>
            </form>

            <form id="youtubeForm" name="youtubeForm" method="post" enctype="multipart/form-data">
                <div class="write" style="margin-top: 30px;">
                    <table id="dtlT">
                        <colgroup>
                            <col width="15%" />
                            <col width="*" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="col">메인동영상</th>
                                <td>
                                    <label for="videoSrc">유튜브 소스</label>
                                    <input type="hidden" id="videoMainId" name="videoMainId" value="${videoList[0].mainId}">
                                    <input type="text" id="videoSrc" name="videoSrc" class="w01" value="${videoList[0].videoSrc}" maxlength="300"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btn_c">
                        <button type="button" class="btn btn-write" onclick="fn_saveVideoSrc();">저장</button>
                    </div>
                </div>
            </form>
            <div class="content_bottom">
            </div>
            </div>
        </div>
    </div>