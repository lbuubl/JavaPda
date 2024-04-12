package com.keyvany.keyvany.common.util;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

/**
 * @Class Name : StringUtil.java
 * @Description : 공통유틸리티성  기본유틸들 모음  
 * @  수정일         수정자                   수정내용
 * @ -------    --------    ---------------------------
 * @author 공통서비스  이병운
 * @since 2018.06.08
 * @version 1.0
 * @see
 */
public class StringUtil {
    
    /**
     * 해당 문자가 null인지만 검사하여 맞으면 true 아니면 false반환
     * @param str - 검사할 문자열
     * @return 검사 결과 여부
     */
    public static boolean isNull(String str){
        return (str == null) ? true : false;
    }

    /**
     * 해당 객체가 null인지만 검사하여 맞으면 true 아니면 false반환
     * @param obj - 검사할 문자열
     * @return 검사 결과 여부
     */
    public static boolean isNull(Object obj){
        return (obj == null) ? true : false;
    }

    /**
     * 해당 문자가 null이거나 공백이면 true 아니면 false반환
     * @param str - 검사할 문자열
     * @return 검사 결과 여부
     */
    public static boolean isEmptyString(String str){
        return (str == null || "".equals(str)) ? true : false;
    }

    /**
     * 해당 객체가 null 이거나 empty 일경우 true를 반환
     * @param obj
     * @return
     */
    public static boolean isEmpty(Object s){
        if (s == null) {
            return true;
        }
        if ((s instanceof String) && (((String)s).trim().length() == 0)) {
            return true;
        }
        if (s instanceof Map) {
            return ((Map<?, ?>)s).isEmpty();
        }
        if (s instanceof List) {
            return ((List<?>)s).isEmpty();
        }
        if (s instanceof Object[]) {
            return (((Object[])s).length == 0);
        }
        return false;
    }

    /**
     * object null,구분 
     * @param obj
     * @return String
     */
    public static String normalizeNull(Object o)
    {
        return normalizeNull(String.valueOf(o));
    }


    /**
     * String null,구분 
     * @param String
     * @return String
     */
    public static String normalizeNull(String s)
    {
        if(s == null)
            return "";
        if(equals(s, "null"))
            return "";
        if(equals(s, "undefined"))
            return "";
        else
            return s;
    }

    /**
     * param1 에 들어온 값과 param2 비교 
     * @param1 String
     * @param2 String
     * @return boolean
     */
    public static boolean equals(String s, String s1)
    {
        if(s == null && s1 == null)
            return true;
        if(s == null || s1 == null)
            return false;
        else
            return s.equals(s1);
    }

    /**
     * 특수문자 제거  
     */
    public static String getRegex(String str) {
        String match = "[^\uAC00-\uD7A3xfe0-9a-zA-Z\\s]";
        str =str.replaceAll(match, "");
        return str;
    }
    

    /**
     * 핸드폰 포멧 변경    
     * @param String 
     * @return String 
     */ 
    public static String makePhoneNumber(String phoneNumber) {
		String regEx = "(\\d{3})(\\d{3,4})(\\d{4})";
		if(!Pattern.matches(regEx, phoneNumber)) return null;
		return phoneNumber.replaceAll(regEx, "$1-$2-$3");
	}

   /**
    * 이메일 주소 마스킹 처리
    * @param email
    * @return maskedEmailAddress
    */
   public static String getMaskedEmail(String email) {
      /*
      * 요구되는 메일 포맷
      * {userId}@domain.com
      * */
      String regex = "\\b(\\S+)+@(\\S+.\\S+)";
      Matcher matcher = Pattern.compile(regex).matcher(email);
      if (matcher.find()) {
         String id = matcher.group(1); // 마스킹 처리할 부분인 userId
         /*
         * userId의 길이를 기준으로 세글자 초과인 경우 뒤 세자리를 마스킹 처리하고,
         * 세글자인 경우 뒤 두글자만 마스킹,
         * 세글자 미만인 경우 모두 마스킹 처리
         */
         int length = id.length();
         if (length < 5) {
            char[] c = new char[length];
            Arrays.fill(c, '*');
            return email.replace(id, String.valueOf(c));
         } else if (length == 5) {
            return email.replaceAll("\\b(\\S+)[^@][^@]+@(\\S+)", "$1****@$2");
         } else {
            return email.replaceAll("\\b(\\S+)[^@][^@][^@][^@][^@]+@(\\S+)", "$1*****@$2");
         }
      }
      return email;
   }
   

   public static String getClientIP(HttpServletRequest request) {
       String ip = request.getHeader("X-Forwarded-For");
       if (ip == null) {
           ip = request.getHeader("Proxy-Client-IP");
       }
       if (ip == null) {
           ip = request.getHeader("WL-Proxy-Client-IP");
       }
       if (ip == null) {
           ip = request.getHeader("HTTP_CLIENT_IP");
       }
       if (ip == null) {
           ip = request.getHeader("HTTP_X_FORWARDED_FOR");
       }
       if (ip == null) {
           ip = request.getRemoteAddr();
       }

       return ip;
   }
}
 
 