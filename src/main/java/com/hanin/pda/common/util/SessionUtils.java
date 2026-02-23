package com.hanin.pda.common.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.hanin.pda.common.domain.User;

public class SessionUtils {
	private static final Logger logger = LoggerFactory.getLogger(SessionUtils.class);

	public static String SESSION_KEY = "Keyvany";

	/**
	 * 잠시주석 삭제
	 * @return
	 */
	public static User getSessionInfoEOnSign() {
        try
        {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            //User user = getSessionObj(); (User)auth.getPrincipal();
            User user = (User)getSessionObj();
            return user;
        }catch(Exception e) {
            logger.debug(e.getMessage());
            return null;
        }
    }


    /**
     * [ Common ] RequestContextHolder 를 통하여 HttpServletRequest 를 return
     * @return HttpServletRequest
     */
    public static HttpServletRequest getHttpServletRequest() {
        
        ServletRequestAttributes srlrequest =  null;
        HttpServletRequest request = null;
        
        if(((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()) !=null) {
            srlrequest = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
            if(srlrequest !=null) {
                request = srlrequest.getRequest();
            }
        }
        
            
        return request; 
    }


    /**
     * [ Common ] Get Session
     * @param request
     * @return HttpSession
     */
    public static HttpSession getSession() {
        return getSession(getHttpServletRequest());
    }

    public static HttpSession getSession(HttpServletRequest request) {
        return request.getSession(false);
    }

    /**
     * [ Common ] Get Session UserInfo
     * @param request
     * @return UserInfo
     */
    public static User getSessionInfo() {
        return getSessionInfo(getHttpServletRequest());
    }

    public static User getSessionInfo(HttpServletRequest request) {
        if (getSession(request) == null) {
            return null;
        }
        return (User) getSessionObj(request);
    }

    /**
     * [ Common ] Get Session Information
     * @param request
     * @return Object
     */
    public static Object getSessionObj() {
        HttpServletRequest request = getHttpServletRequest();

        return getSessionInfo(request);
    }

    public static Object getSessionObj(HttpServletRequest request) {
        Object obj =  null;

        HttpSession session = getSession(request);

        if (session != null) {
            obj = session.getAttribute(SESSION_KEY);
        }

        return obj;
    }

    /**
     * [ Common ] Session Information Remove
     * @param request
     */
    public static void removeSession() {
        removeSession(getSession());
    }

    public static void removeSession(HttpServletRequest request) {
        removeSession(getSession(request));
    }

    public static void removeSession(HttpSession session) {
        if(session != null) {
            session.removeAttribute(SESSION_KEY);
            session.invalidate();
        }

        logger.info("===>>>>> Remove Session Success !!");
    }
}

