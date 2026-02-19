package com.hanin.pda.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

public class ProjectListInterceptorAdapter implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(ProjectListInterceptorAdapter.class);

    private static final String AJAX_HEADER_NAME = "X-Requested-With";
    private static final String AJAX_HEADER_VALUE = "XMLHttpRequest";
    private static final String REDIRECT_URL = "/pda/logout"; // 세션 만료시 리다이렉트 할 URL

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
        throws Exception {
    	HttpSession session = request.getSession(false);
  	  if (session == null || session.getAttribute("user") == null) {
  	      if (isAjaxRequest(request)) {
  	          // Ajax 요청일 경우, "SESSION_EXPIRED" 라는 값을 Response Header에 추가한다.
  	          response.setHeader("SESSION_EXPIRED", "true");
  	          return false;
  	      } else {
  	          // 일반 요청일 경우, 세션이 만료되었다는 페이지로 리다이렉트한다.
  	          response.sendRedirect(request.getContextPath() + REDIRECT_URL);
  	          return false;
  	      }
  	  }
  	  return true;
    }

    // Ajax 요청인지 체크하는 메소드
    private boolean isAjaxRequest(HttpServletRequest request) {
        return AJAX_HEADER_VALUE.equals(request.getHeader(AJAX_HEADER_NAME));
    }

}
