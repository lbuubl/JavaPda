package com.hanin.pda.common.security;

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
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import com.hanin.pda.common.domain.User;
import com.hanin.pda.common.service.CommonService;
import com.hanin.pda.common.util.SessionUtils;
import com.hanin.pda.common.util.StringUtil;

public class AdminLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler implements LogoutSuccessHandler {
 
	private static final Logger logger = LoggerFactory.getLogger(AdminLogoutSuccessHandler.class);

    @Autowired
    CommonService commonService;
    
  @Override
  public void onLogoutSuccess(HttpServletRequest request,HttpServletResponse response, Authentication authentication)
    throws IOException, ServletException {
      Map<String, Object> parmasLogMap = new HashMap<String, Object>();
      User user = new User();
      user = SessionUtils.getSessionInfo(request);
      
       //ip값 가져오기 
       String ip = StringUtil.getClientIP(request);
       
       parmasLogMap.put("srvcNm", "로그아웃");           //로그 실행 명칭
       parmasLogMap.put("inqireInfo", "com.hanin.pda.common.security.AdminLogoutSuccessHandler");     //로그 싱행 실행 클래스
       parmasLogMap.put("uniqueId", user.getUniqueId());       //등록자 순번
       parmasLogMap.put("rqesterIp", ip);      //로그 ip
      try {
          //int logInt = commonService.insertAdminlog(parmasLogMap);
      } catch (Exception e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
      }
      //==========================================================
      // Logout 성공 시 따로 필요한 작업을 하면 됨. (ex:로그등록 등등) 현재 세션은 아직 끊어지지 않음.
      //==========================================================
      SessionUtils.removeSession(request);
      String refererUrl = request.getHeader("Referer");
      super.onLogoutSuccess(request, response, authentication);
  }
}
