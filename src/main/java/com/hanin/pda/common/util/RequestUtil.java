
package com.hanin.pda.common.util;

/*==================================================*
 * [Utility 모듈]
 * RequestUtil
 * Created: pmchoe, 2004.11.03
 * Modified: mornya, 2007.04.05
 *==================================================*/

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@NoArgsConstructor
public final class RequestUtil
{

	private  final String[] KNOWN_MOBILE_USER_AGENT_KEYWORDS = new String[] { "blackberry", "webos", "ipod", "lge vx", "midp", "maemo", "mmp", "mobile", "netfront", "hiptop", "nintendo DS",
	        "novarra", "openweb", "opera mobi", "opera mini", "palm", "psp", "phone", "smartphone", "symbian", "up.browser", "up.link", "wap", "windows ce" };

	private  final String[] KNOWN_TABLET_USER_AGENT_KEYWORDS = new String[] { "ipad", "playbook", "hp-tablet", "kindle" };


	private  final String[] KNOWN_IOS_USER_AGENT_KEYWORDS = new String[] { "ipad", "ipod", "iphone" };



    public  String getCookie ( HttpServletRequest request, String sName )
    {
    	Cookie[] cookies = request.getCookies();

    	if ( cookies != null )
    	{
    		for (int i=0; i < cookies.length; i++)
    		{
    			String name = cookies[i].getName();

    			if( name != null && name.equals(sName) )
    			{
    				return cookies[i].getValue();
    			}
    		}
    	}
    	return "";
    }


    public  String getHeader(HttpServletRequest request, String hName) {
    	String headerString = "";

    	hName = hName.toLowerCase();

    	headerString = request.getHeader(hName);

    	return headerString;
    }


    public  boolean isMobile(String userAgent) {
		boolean result = false;

		for (String device : KNOWN_MOBILE_USER_AGENT_KEYWORDS) {
			if (userAgent.indexOf(device) >= 0) {
				result = true;
			}
		}

		for (String device : KNOWN_TABLET_USER_AGENT_KEYWORDS) {
			if (userAgent.indexOf(device) >= 0) {
				result = true;
			}
		}

		return result;
	}

    public  String getBrowserName(String userAgent) {

		String browser = "";
		/*
    	if(userAgent.indexOf("trident") != -1) {    		browserName = returnMidName(userAgent, "trident");
    	} else if(userAgent.indexOf("edge") != -1) {    	browserName = returnLastName(userAgent, "edge");
    	} else if(userAgent.indexOf("opera") != -1) {    	browserName = returnMidName(userAgent, "opera");
    	} else if(userAgent.indexOf("opr") != -1) {    		browserName = returnLastName(userAgent, "opr");
    	} else if(userAgent.indexOf("chrome") != -1) {    	browserName = returnMidName(userAgent, "chrome");
    	} else if(userAgent.indexOf("safari") != -1) {    	browserName = returnLastName(userAgent, "safari");
    	} else if(userAgent.indexOf("firefox") != -1) {    	browserName = returnLastName(userAgent, "firefox");
    	} else {								    		browserName = "Etc";
    	}
		*/
		if (userAgent.contains("msie")) {
			String substring = userAgent.substring(userAgent.indexOf("msie")).split(";")[0];
			browser = substring.split(" ")[0].replace("msie", "ie") + "-" + substring.split(" ")[1];
		} else if (userAgent.contains("safari") && userAgent.contains("version")) {
			browser = (userAgent.substring(userAgent.indexOf("safari")).split(" ")[0]).split("/")[0] + "-" + (userAgent.substring(userAgent.indexOf("version")).split(" ")[0]).split("/")[1];
		} else if (userAgent.contains("opr") || userAgent.contains("opera")) {
			if (userAgent.contains("opera"))
				browser = (userAgent.substring(userAgent.indexOf("opera")).split(" ")[0]).split("/")[0] + "-" + (userAgent.substring(userAgent.indexOf("version")).split(" ")[0]).split("/")[1];
			else if (userAgent.contains("opr"))
				browser = ((userAgent.substring(userAgent.indexOf("opr")).split(" ")[0]).replace("/", "-")).replace("opr", "opera");
		} else if (userAgent.contains("chrome")) {
			browser = (userAgent.substring(userAgent.indexOf("chrome")).split(" ")[0]).replace("/", "-");
		} else if ((userAgent.indexOf("mozilla/7.0") > -1) || (userAgent.indexOf("netscape6") != -1) || (userAgent.indexOf("mozilla/4.7") != -1) || (userAgent.indexOf("mozilla/4.78") != -1)
		        || (userAgent.indexOf("mozilla/4.08") != -1) || (userAgent.indexOf("mozilla/3") != -1)) {
			browser = "netscape-?";
		} else if (userAgent.contains("firefox")) {
			browser = (userAgent.substring(userAgent.indexOf("firefox")).split(" ")[0]).replace("/", "-");
		} else if (userAgent.contains("rv")) {
			browser = "ie-" + userAgent.substring(userAgent.indexOf("rv") + 3, userAgent.indexOf(")"));
		} else {
			browser = "unKnown";
		}

		return browser.toLowerCase();
	}


    public  boolean checkIos(String userAgent) {

		for (String device : KNOWN_IOS_USER_AGENT_KEYWORDS) {
			if (userAgent.indexOf(device) >= 0) {
				return   true;
			}
		}

		return false;

    }


    public  String getIpAddress(HttpServletRequest request) {
		String ip = request.getHeader("X-FORWARDED-FOR");
		if (ip == null) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

    public  String getOsName(String userAgent) {
		String osName = "";
		/*
    	if(userAgent.indexOf("windows") != -1) {
    		int st = userAgent.indexOf("windows");
    		int et = userAgent.indexOf(")");
    		osName = userAgent.substring(st, et-st);
    	} else if(userAgent.indexOf("macintosh") != -1) {
    		int st = userAgent.indexOf("macintosh");
    		int et = userAgent.indexOf(")");
    		osName = userAgent.substring(st, et-st);
    	} else if(userAgent.indexOf("linux") != -1) {
    		int st = userAgent.indexOf("linux");
    		int et = userAgent.indexOf(")");
    		osName = userAgent.substring(st, et-st);
    	} else {
    		osName = "Etc";
    	}
    	*/
		if (userAgent.indexOf("windows") >= 0) {
			osName = userAgent.substring(userAgent.indexOf("windows")).split(";")[0];
		} else if (userAgent.indexOf("mac") >= 0) {
			osName = userAgent.substring(userAgent.indexOf("mac"), userAgent.indexOf(")"));
		} else if (userAgent.indexOf("x11") >= 0) {
			osName = "unix";
		} else if (userAgent.indexOf("unix") >= 0) {
			osName = "unix";
		} else if (userAgent.indexOf("android") >= 0) {
			osName = userAgent.substring(userAgent.indexOf("android")).split(";")[0];
		} else if (userAgent.indexOf("iphone") >= 0) {
			osName = userAgent.substring(userAgent.indexOf("iphone"), userAgent.indexOf(")"));
		} else if (userAgent.indexOf("ipad") >= 0) {
			osName = userAgent.substring(userAgent.indexOf("ipad"), userAgent.indexOf(")"));
		} else {
			osName = "Etc";
		}

		return osName;
	}

}

