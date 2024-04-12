<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="paging">
    <c:if test="${pagination.curRange ne 1}">
        <a href="${pageContext.request.contextPath}${url}?page=1">
            <img src="${pageContext.request.contextPath}/resources/static/img/common/btn_pprev.gif" alt="처음페이지"/>
        </a>
    </c:if>
    <c:if test="${pagination.curPage ne 1}">
        <a href="${pageContext.request.contextPath}${url}?page=${pagination.prevPage}" class="pim">
            <img src="${pageContext.request.contextPath}/resources/static/img/common/btn_prev.gif" alt="이전페이지"/>
        </a>
    </c:if>
    <c:forEach var="num" begin="${pagination.startPage}" end="${pagination.endPage}">
        <a href="${pageContext.request.contextPath}${url}?page=${num}" class="<c:if test="${num eq pagination.curPage}">this</c:if>">${num}</a>
    </c:forEach>
    <c:if test="${pagination.curPage ne pagination.pageCnt && pagination.pageCnt > 0}">
        <a href="${pageContext.request.contextPath}${url}?page=${pagination.nextPage}"class="pim2">
            <img src="${pageContext.request.contextPath}/resources/static/img/common/btn_next.gif" alt="다음페이지"/>
        </a>
    </c:if>
    <c:if test="${pagination.curRange ne pagination.rangeCnt && pagination.rangeCnt > 0}">
        <a href="${pageContext.request.contextPath}${url}?page=${pagination.pageCnt}">
            <img src="${pageContext.request.contextPath}/resources/static/img/common/btn_nnext.gif" alt="마지막페이지"/>
        </a>
    </c:if>
</div>