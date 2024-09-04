package com.keyvany.keyvany.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.util.SessionUtils;


public class UserInfoInterceptorAdapter implements HandlerInterceptor {

  private static final Logger logger = LoggerFactory.getLogger(UserInfoInterceptorAdapter.class);


  private static final String AJAX_HEADER_NAME = "X-Requested-With";
  private static final String AJAX_HEADER_VALUE = "XMLHttpRequest";
  private static final String REDIRECT_URL = "/cms/logout"; // 세션 만료시 리다이렉트 할 URL

  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
	  User user = SessionUtils.getSessionInfo(request);
      if (user == null) {    /* 로그인 되어 있는 경우 */
  		response.sendRedirect(request.getContextPath()+"/cms/logout");
          return false;
      }
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

  public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
      Object object, Exception arg3) throws Exception {
    logger.debug("=============afterCompletion======================================");
    logger.debug("Interceptor > afterCompletion");

    // System.out.println("==================================여기서 메뉴가져오기 ================");
  }
}
