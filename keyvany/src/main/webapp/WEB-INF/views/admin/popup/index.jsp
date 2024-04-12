<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
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
            <div class="content_wrap" id="wrapDiv">
                <!-- <h3>WHEEL</h3> -->
                <form name="searchForm" method="get" action="${pageContext.request.contextPath}/cms/manage/popup" onsubmit="return fn_search(this);">
                    <div class="write">
                        <table>
                            <colgroup>
                                <col width="15%"/>
                                <col width="*"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="col">검색</th>
                                    <td>
                                        <select class="w15" id="searchType" name="searchType">
                                            <option <c:if test="${searchType eq 'all'}">selected</c:if> value="all">전체</option>
                                            <option <c:if test="${searchType eq 'title'}">selected</c:if> value="title">제목</option>
                                        </select>
                                        <input type="text" id="searchKeyword" name="searchKeyword" class="w40" value="${searchKeyword}"/>
                                        <button type="submit" class="btn btn-modify2">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
                <div class="list">
                    <table>
                        <colgroup>
                            <col width="10%"/>
                            <col width="30%"/>
                            <col width="30%"/>
                            <col width="20%"/>
                            <col width="10%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">제목</th>
                                <th scope="col">기간</th>
                                <th scope="col">등록일</th>
                                <th scope="col">사용여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:choose>
                                <c:when test="${! empty popInfo}">
                                    <c:forEach items="${popInfo}" var="popInfo" varStatus="stat">
                                        <tr>
                                            <td class="gary">
                                                <fmt:parseNumber var = "num" integerOnly = "true" type = "number" value = "${popInfo.rownum}"/>
                                                ${num}
                                            </td>
                                            <td class="title"><a href="${pageContext.request.contextPath}/cms/manage/popupCreate/${popInfo.pop_id}">${popInfo.title}</a></td>
                                            <td class="gary">${popInfo.start_dttm} ~ ${popInfo.end_dttm}</td>
                                            <td class="gary">${popInfo.updt_dttm}</td>
                                                <c:choose>
                                                    <c:when test="${popInfo.use_yn eq 'Y'}">
                                                        <td class="gary" style="color:green">
                                                        사용중
                                                    </td>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <td class="gary" style="color:red">
                                                        삭제
                                                        </td>
                                                    </c:otherwise>
                                                </c:choose>
                                        </tr>
                                    </c:forEach>
                                </c:when>
                                <c:otherwise>
                                    <tr>
                                        <td colspan="5">내역이 없습니다.</td>
                                    </tr>
                                </c:otherwise>
                            </c:choose>
                        </tbody>
                    </table>
                    <c:if test="${! empty popInfo}">
                    <jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/common/pagination.jsp"></jsp:include>
                </c:if>
                <div class="btn_r">
                    <button type="submit" class="btn btn-write" onclick="location.href='${pageContext.request.contextPath}/cms/manage/popupCreate'">등록</button>
                </div>
                <div class="content_bottom">
                </div>
            </div>
        </div>
    </div>
    <script>
        var fn_search = function(f){
            if(!f.searchKeyword.value){
                alert("검색어를 입력해 주세요.");
                f.searchKeyword.focus();
                return false;
            }
            
        }
    </script>