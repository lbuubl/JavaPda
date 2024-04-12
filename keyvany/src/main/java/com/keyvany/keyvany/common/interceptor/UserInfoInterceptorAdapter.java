package com.keyvany.keyvany.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;



public class UserInfoInterceptorAdapter   {

	private static final Logger logger = LoggerFactory.getLogger(UserInfoInterceptorAdapter.class);


    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {


	   return true;
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception arg3) throws Exception {
    	logger.debug("=============afterCompletion======================================");
    	logger.debug("Interceptor > afterCompletion" );

    	// System.out.println("==================================여기서 메뉴가져오기 ================");
    }
}
