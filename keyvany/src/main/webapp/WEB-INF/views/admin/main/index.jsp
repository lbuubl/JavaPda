<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<script type="text/javascript">

</script>
    <div id="viewport">
        <!-- 컨텐츠 -->
        <div id="contents">
            <div class="contitle">
                <div class="wrap">
                    <a href="#" title="메뉴 보기" id="btn_gnb_menu" class="btn_menu"><i class="fa fa-bars" aria-hidden="true"></i></a>
                    <!-- <h2>PROJECT</h2> -->
                    <form name="logoutForm" method="post" action="${pageContext.request.contextPath}/cms/logout">
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
                                    <td>
                                        <label for="">메인카피</label>
                                        <input type="text" id="main_copy" name="main_copy"  class="w01" />
                                        <label for="">설명</label>
                                        <input type="text" id="description" name="description" class="w01" />

                                        <input type="file">
                                        <button class="btn">추가</button>
                                        <button class="btn">삭제</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                                        <input type="text" id="youtube_url" name="titleBTxt" class="w01" value="" maxlength="300"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn">추가</button>
                </div>

            </form>
            <div class="content_bottom">
            </div>
            </div>
        </div>
    </div>