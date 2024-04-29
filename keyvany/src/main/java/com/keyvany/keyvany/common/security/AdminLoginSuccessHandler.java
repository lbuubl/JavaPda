package com.keyvany.keyvany.common.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.service.CommonService;
import com.keyvany.keyvany.common.util.SessionUtils;
import com.keyvany.keyvany.common.util.StringUtil;

public class AdminLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	private static final Logger logger = LoggerFactory.getLogger(AdminLoginSuccessHandler.class);

    @Autowired
    CommonService commonService;

	private RequestCache requestCache = new HttpSessionRequestCache();

	public void setRequestCache(RequestCache requestCache) {

		this.requestCache = requestCache;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)			throws IOException, ServletException
	{
		SavedRequest savedRequest = requestCache.getRequest(request, response);
		if (savedRequest == null) {

            Map<String, Object> parmasLogMap = new HashMap<String, Object>();

            User user = new User();
            user = SessionUtils.getSessionInfo(request);


             //ip값 가져오기
             String ip = StringUtil.getClientIP(request);

             parmasLogMap.put("srvcNm", "로그인");           //로그 실행 명칭
             parmasLogMap.put("inqireInfo", "com.keyvany.keyvany.common.security.onAuthenticationSuccess");     //로그 싱행 실행 클래스
             parmasLogMap.put("uniqueId", user.getUniqueId());       //등록자 순번
             parmasLogMap.put("rqesterIp", ip);      //로그 ip
            try {
                //int logInt = commonService.insertAdminlog(parmasLogMap);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

			response.sendRedirect("/cms/manage/main"); // 로그인 하기 전의 페이지가 없었다면 이주소로 이동
		} else {
			super.onAuthenticationSuccess(request, response, authentication); // 로그인 하기 전의 접속한 주소로 다시 돌아갑니다.
		}
	}
}