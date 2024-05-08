package com.keyvany.keyvany.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;

import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.util.SessionUtils;


public class UserInfoInterceptorAdapter {

  private static final Logger logger = LoggerFactory.getLogger(UserInfoInterceptorAdapter.class);


  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
	  User user = SessionUtils.getSessionInfo(request);
      if (user == null) {    /* 로그인 되어 있는 경우 */
          response.sendRedirect("/cms/logout");
      }

    return true;
  }

  public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
      Object object, Exception arg3) throws Exception {
    logger.debug("=============afterCompletion======================================");
    logger.debug("Interceptor > afterCompletion");

    // System.out.println("==================================여기서 메뉴가져오기 ================");
  }
}
