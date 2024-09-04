package com.keyvany.keyvany.common.helper;

import java.io.BufferedReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import com.keyvany.keyvany.common.util.StringUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class helper {
    /**************************************************************
     * @Class Name : helper.java
     * @Description : 문자열 데이터 처리 관련 유틸리티
     * @author YDE
     * @since 2020.07.30
     * @version 1.0
     * @see
     *
     *      <pre>
     * << 개정이력(Modification Information) >>
     *
     *   수정일                 수정자           수정내용
     *  -------      --------    ---------------------------
     *   2020.07.30   여동언             최초 생성
     *
     *      </pre>
     **************************************************************/

    /** 빈 문자열 <code>""</code>. **/
    public static final String EMPTY = "";
    public static final String jwt_key = "$2a$10$7qt1M0uZafsARBdLzV4G7e.DPXV1jxFGKxs51p6lw/xanlcgD2s/2";
    /**
     * <p>
     * Padding을 할 수 있는 최대 수치
     * </p>
     **/
    // private static final int PAD_LIMIT = 8192;

    /**
     * <p>
     * An array of <code>String</code>s used for padding.
     * </p>
     * <p>
     * Used for efficient space padding. The length of each String expands as
     * needed.
     * </p>
     */
    /*
     * private static final String[] PADDING = new String[Character.MAX_VALUE];
     * 
     * static { // space padding is most common, start with 64 chars PADDING[32] =
     * "                                                                "; }
     */

    /**
     * 문자열이 지정한 길이를 초과했을때 지정한길이에다가 해당 문자열을 붙여주는 메서드.
     * 
     * @param source  원본 문자열 배열
     * @param output  더할문자열
     * @param slength 지정길이
     * @return 지정길이로 잘라서 더할분자열 합친 문자열
     */
    public static String cutString(String source, String output, int slength) {

        String returnVal = null;

        if (source != null) {

            if (source.length() > slength) {
                returnVal = source.substring(0, slength) + output;
            } else {
                returnVal = source;
            }
        }

        return returnVal;
    }
    /**
     * 문자열이 지정한 길이를 초과했을때 해당 문자열을 삭제하는 메서드
     * 
     * @param source  원본 문자열 배열
     * @param slength 지정길이
     * @return 지정길이로 잘라서 더할분자열 합친 문자열
     */
    public static String cutString(String source, int slength) {

        String result = null;

        if (source != null) {
            if (source.length() > slength) {
                result = source.substring(0, slength);
            } else {
                result = source;
            }
        }

        return result;
    }

    /**
     * <p>
     * String이 비었거나("") 혹은 null 인지 검증한다.
     * </p>
     *
     * <pre>
     *  StringUtil.isEmpty(null)      = true
     *  StringUtil.isEmpty("")        = true
     *  StringUtil.isEmpty(" ")       = false
     *  StringUtil.isEmpty("bob")     = false
     *  StringUtil.isEmpty("  bob  ") = false
     * </pre>
     *
     * @param str - 체크 대상 스트링오브젝트이며 null을 허용함
     * @return <code>true</code> - 입력받은 String 이 빈 문자열 또는 null인 경우
     */
    public static boolean isEmpty(String str) {
        return str == null || str.length() == 0;
    }

    public static String remove(String str, char remove) {
        if (isEmpty(str) || str.indexOf(remove) == -1) {
            return str;
        }
        char[] chars = str.toCharArray();
        int pos = 0;

        for (int i = 0; i < chars.length; i++) {

            if (chars[i] != remove) {
                chars[pos++] = chars[i];
            }
        }
        return new String(chars, 0, pos);
    }





    

    /**
     * <p>
     * 문자열 내부의 콤마 character(,)를 모두 제거한다.
     * </p>
     *
     * <pre>
     * StringUtil.removeCommaChar(null)       = null
     * StringUtil.removeCommaChar("")         = ""
     * StringUtil.removeCommaChar("asdfg,qweqe") = "asdfgqweqe"
     * </pre>
     *
     * @param str 입력받는 기준 문자열
     * @return " , "가 제거된 입력문자열 입력문자열이 null인 경우 출력문자열은 null
     */
    public static String removeCommaChar(String str) {
        return remove(str, ',');
    }

    /**
     * <p>
     * 문자열 내부의 마이너스 character(-)를 모두 제거한다.
     * </p>
     *
     * <pre>
     * StringUtil.removeMinusChar(null)       = null
     * StringUtil.removeMinusChar("")         = ""
     * StringUtil.removeMinusChar("a-sdfg-qweqe") = "asdfgqweqe"
     * </pre>
     *
     * @param str 입력받는 기준 문자열
     * @return " - "가 제거된 입력문자열 입력문자열이 null인 경우 출력문자열은 null
     */
    public static String removeMinusChar(String str) {
        return remove(str, '-');
    }

    /**
     * 원본 문자열의 포함된 특정 문자열을 새로운 문자열로 변환하는 메서드
     * 
     * @param source  원본 문자열
     * @param subject 원본 문자열에 포함된 특정 문자열
     * @param object  변환할 문자열
     * @return sb.toString() 새로운 문자열로 변환된 문자열
     */
    public static String replace(String source, String subject, String object) {

        StringBuffer rtnStr = new StringBuffer();
        String preStr = "";
        String nextStr = source;
        String srcStr = source;

        while (srcStr.indexOf(subject) >= 0) {

            preStr = srcStr.substring(0, srcStr.indexOf(subject));
            nextStr = srcStr.substring(srcStr.indexOf(subject) + subject.length(), srcStr.length());
            srcStr = nextStr;

            rtnStr.append(preStr).append(object);
        }

        rtnStr.append(nextStr);

        return rtnStr.toString();
    }

    /**
     * 원본 문자열의 포함된 특정 문자열 첫번째 한개만 새로운 문자열로 변환하는 메서드
     * 
     * @param source  원본 문자열
     * @param subject 원본 문자열에 포함된 특정 문자열
     * @param object  변환할 문자열
     * @return sb.toString() 새로운 문자열로 변환된 문자열 / source 특정문자열이 없는 경우 원본 문자열
     */
    public static String replaceOnce(String source, String subject, String object) {

        StringBuffer rtnStr = new StringBuffer();
        String preStr = "";
        String nextStr = source;

        if (source.indexOf(subject) >= 0) {

            preStr = source.substring(0, source.indexOf(subject));
            nextStr = source.substring(source.indexOf(subject) + subject.length(), source.length());
            rtnStr.append(preStr).append(object).append(nextStr);

            return rtnStr.toString();

        } else {
            return source;
        }
    }

    /**
     * <code>subject</code>에 포함된 각각의 문자를 object로 변환한다.
     *
     * @param source  원본 문자열
     * @param subject 원본 문자열에 포함된 특정 문자열
     * @param object  변환할 문자열
     * @return sb.toString() 새로운 문자열로 변환된 문자열
     */
    public static String replaceChar(String source, String subject, String object) {

        StringBuffer rtnStr = new StringBuffer();
        String preStr = "";
        String nextStr = source;
        String srcStr = source;

        char chA;

        for (int i = 0; i < subject.length(); i++) {

            chA = subject.charAt(i);

            if (srcStr.indexOf(chA) >= 0) {
                preStr = srcStr.substring(0, srcStr.indexOf(chA));
                nextStr = srcStr.substring(srcStr.indexOf(chA) + 1, srcStr.length());
                srcStr = rtnStr.append(preStr).append(object).append(nextStr).toString();
            }
        }

        return srcStr;
    }

    /**
     * <p>
     * <code>str</code> 중 <code>searchStr</code>의 시작(index) 위치를 반환.
     * </p>
     *
     * <p>
     * 입력값 중 <code>null</code>이 있을 경우 <code>-1</code>을 반환.
     * </p>
     *
     * <pre>
     * StringUtil.indexOf(null, *)          = -1
     * StringUtil.indexOf(*, null)          = -1
     * StringUtil.indexOf("", "")           = 0
     * StringUtil.indexOf("aabaabaa", "a")  = 0
     * StringUtil.indexOf("aabaabaa", "b")  = 2
     * StringUtil.indexOf("aabaabaa", "ab") = 1
     * StringUtil.indexOf("aabaabaa", "")   = 0
     * </pre>
     *
     * @param str       검색 문자열
     * @param searchStr 검색 대상문자열
     * @return 검색 문자열 중 검색 대상문자열이 있는 시작 위치 검색대상 문자열이 없거나 null인 경우 -1
     */
    public static int indexOf(String str, String searchStr) {

        if (str == null || searchStr == null) {
            return -1;
        }

        return str.indexOf(searchStr);
    }

    /**
     * <p>
     * 오라클의 decode 함수와 동일한 기능을 가진 메서드이다. <code>sourStr</code>과
     * <code>compareStr</code>의 값이 같으면 <code>returStr</code>을 반환하며, 다르면
     * <code>defaultStr</code>을 반환한다.
     * </p>
     *
     * <pre>
     * StringUtil.decode(null, null, "foo", "bar")= "foo"
     * StringUtil.decode("", null, "foo", "bar") = "bar"
     * StringUtil.decode(null, "", "foo", "bar") = "bar"
     * StringUtil.decode("하이", "하이", null, "bar") = null
     * StringUtil.decode("하이", "하이  ", "foo", null) = null
     * StringUtil.decode("하이", "하이", "foo", "bar") = "foo"
     * StringUtil.decode("하이", "하이  ", "foo", "bar") = "bar"
     * </pre>
     *
     * @param sourceStr  비교할 문자열
     * @param compareStr 비교 대상 문자열
     * @param returnStr  sourceStr와 compareStr의 값이 같을 때 반환할 문자열
     * @param defaultStr sourceStr와 compareStr의 값이 다를 때 반환할 문자열
     * @return sourceStr과 compareStr의 값이 동일(equal)할 때 returnStr을 반환하며, <br/>
     *         다르면 defaultStr을 반환한다.
     */
    public static String decode(String sourceStr, String compareStr, String returnStr, String defaultStr) {

        if (sourceStr == null && compareStr == null) {
            return returnStr;
        }
        if (sourceStr == null && compareStr != null) {
            return defaultStr;
        }
        

        if (sourceStr != null && compareStr != null) {
            if (sourceStr.trim().equals(compareStr)) {
                return returnStr;
            }
        }
        
        

        return defaultStr;
    }

    /**
     * <p>
     * 오라클의 decode 함수와 동일한 기능을 가진 메서드이다. <code>sourStr</code>과
     * <code>compareStr</code>의 값이 같으면 <code>returStr</code>을 반환하며, 다르면
     * <code>sourceStr</code>을 반환한다.
     * </p>
     *
     * <pre>
     * StringUtil.decode(null, null, "foo") = "foo"
     * StringUtil.decode("", null, "foo") = ""
     * StringUtil.decode(null, "", "foo") = null
     * StringUtil.decode("하이", "하이", "foo") = "foo"
     * StringUtil.decode("하이", "하이 ", "foo") = "하이"
     * StringUtil.decode("하이", "바이", "foo") = "하이"
     * </pre>
     *
     * @param sourceStr  비교할 문자열
     * @param compareStr 비교 대상 문자열
     * @param returnStr  sourceStr와 compareStr의 값이 같을 때 반환할 문자열
     * @return sourceStr과 compareStr의 값이 동일(equal)할 때 returnStr을 반환하며, <br/>
     *         다르면 sourceStr을 반환한다.
     */
    public static String decode(String sourceStr, String compareStr, String returnStr) {
        return decode(sourceStr, compareStr, returnStr, sourceStr);
    }

    /**
     * 객체가 null인지 확인하고 null인 경우 "" 로 바꾸는 메서드
     * 
     * @param object 원본 객체
     * @return resultVal 문자열
     */
    public static String isNullToString(Object object) {

        String string = "";

        if (object != null) {
            string = object.toString().trim();
        }

        return string;
    }

    /**
     * <pre>
     * 인자로 받은 String이 null일 경우 &quot;&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;&quot;로 바꾼 String 값.
     * </pre>
     */
    public static String nullConvert(Object src) {

        // if (src != null && src.getClass().getName().equals("java.math.BigDecimal")) {
        if (src != null && src instanceof java.math.BigDecimal) {
            return ((BigDecimal) src).toString();
        }

        if (src == null || src.equals("null")) {
            return "";
        } else {
            return ((String) src).trim();
        }
    }

    /**
     * <pre>
     * 인자로 받은 String이 null일 경우 &quot;&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;&quot;로 바꾼 String 값.
     * </pre>
     */
    public static String nullConvert(String src) {

        if (src == null || src.equals("null") || "".equals(src) || " ".equals(src)) {
            return "";
        } else {
            return src.trim();
        }
    }

    /**
     * <pre>
     * 인자로 받은 String이 null일 경우 &quot;0&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;0&quot;로 바꾼 String 값.
     * </pre>
     */
    public static int zeroConvert(Object src) {

        if (src == null || src.equals("null")) {
            return 0;
        } else {
            return Integer.parseInt(((String) src).trim());
        }
    }

    /**
     * <pre>
     * 인자로 받은 String이 null일 경우 &quot;&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;&quot;로 바꾼 String 값.
     * </pre>
     */
    public static int zeroConvert(String src) {

        if (src == null || src.equals("null") || "".equals(src) || " ".equals(src)) {
            return 0;
        } else {
            return Integer.parseInt(src.trim());
        }
    }

    /**
     * <p>
     * 문자열에서 {@link Character#isWhitespace(char)}에 정의된 모든 공백문자를 제거한다.
     * </p>
     *
     * <pre>
     * StringUtil.removeWhitespace(null)         = null
     * StringUtil.removeWhitespace("")           = ""
     * StringUtil.removeWhitespace("abc")        = "abc"
     * StringUtil.removeWhitespace("   ab  c  ") = "abc"
     * </pre>
     *
     * @param str 공백문자가 제거도어야 할 문자열
     * @return the 공백문자가 제거된 문자열, null이 입력되면 <code>null</code>이 리턴
     */
    public static String removeWhitespace(String str) {

        if (isEmpty(str)) {
            return str;
        }

        int sz = str.length();
        char[] chs = new char[sz];
        int count = 0;

        for (int i = 0; i < sz; i++) {

            if (!Character.isWhitespace(str.charAt(i))) {
                chs[count++] = str.charAt(i);
            }
        }

        if (count == sz) {
            return str;
        }

        return new String(chs, 0, count);
    }

    /**
     * Html 코드가 들어간 문서를 표시할때 태그에 손상없이 보이기 위한 메서드
     *
     * @param strString
     * @return HTML 태그를 치환한 문자열
     */
    public static String checkHtmlView(String strString) {

        String strNew = "";

        try {

            StringBuffer strTxt = new StringBuffer("");

            char chrBuff;
            int len = strString.length();

            for (int i = 0; i < len; i++) {
                chrBuff = (char) strString.charAt(i);

                switch (chrBuff) {
                case '<':
                    strTxt.append("&lt;");
                    break;
                case '>':
                    strTxt.append("&gt;");
                    break;
                case '"':
                    strTxt.append("&quot;");
                    break;
                case 10:
                    strTxt.append("<br>");
                    break;
                case ' ':
                    strTxt.append("&nbsp;");
                    break;
                // case '&' :
                // strTxt.append("&amp;");
                // break;
                default:
                    strTxt.append(chrBuff);
                }
            }

            strNew = strTxt.toString();

        } catch (Exception ex) {
            return null;
        }

        return strNew;
    }

    /**
     * 문자열을 지정한 분리자에 의해 배열로 리턴하는 메서드.
     * 
     * @param source    원본 문자열
     * @param separator 분리자
     * @return result 분리자로 나뉘어진 문자열 배열
     */
    public static String[] split(String source, String separator) throws NullPointerException {
        String[] returnVal = null;
        int cnt = 1;

        int index = source.indexOf(separator);
        int index0 = 0;

        while (index >= 0) {
            cnt++;
            index = source.indexOf(separator, index + 1);
        }

        returnVal = new String[cnt];
        cnt = 0;
        index = source.indexOf(separator);

        while (index >= 0) {
            returnVal[cnt] = source.substring(index0, index);
            index0 = index + 1;
            index = source.indexOf(separator, index + 1);
            cnt++;
        }

        returnVal[cnt] = source.substring(index0);

        return returnVal;
    }

    /**
     * <p>
     * {@link String#toLowerCase()}를 이용하여 소문자로 변환한다.
     * </p>
     *
     * <pre>
     * StringUtil.lowerCase(null)  = null
     * StringUtil.lowerCase("")    = ""
     * StringUtil.lowerCase("aBc") = "abc"
     * </pre>
     *
     * @param str 소문자로 변환되어야 할 문자열
     * @return 소문자로 변환된 문자열, null이 입력되면 <code>null</code> 리턴
     */
    public static String lowerCase(String str) {

        if (str == null) {
            return null;
        }

        return str.toLowerCase();
    }

    /**
     * <p>
     * {@link String#toUpperCase()}를 이용하여 대문자로 변환한다.
     * </p>
     *
     * <pre>
     * StringUtil.upperCase(null)  = null
     * StringUtil.upperCase("")    = ""
     * StringUtil.upperCase("aBc") = "ABC"
     * </pre>
     *
     * @param str 대문자로 변환되어야 할 문자열
     * @return 대문자로 변환된 문자열, null이 입력되면 <code>null</code> 리턴
     */
    public static String upperCase(String str) {

        if (str == null) {
            return null;
        }

        return str.toUpperCase();
    }

    /**
     * <p>
     * 입력된 String의 앞쪽에서 두번째 인자로 전달된 문자(stripChars)를 모두 제거한다.
     * </p>
     *
     * <pre>
     * StringUtil.stripStart(null, *)          = null
     * StringUtil.stripStart("", *)            = ""
     * StringUtil.stripStart("abc", "")        = "abc"
     * StringUtil.stripStart("abc", null)      = "abc"
     * StringUtil.stripStart("  abc", null)    = "abc"
     * StringUtil.stripStart("abc  ", null)    = "abc  "
     * StringUtil.stripStart(" abc ", null)    = "abc "
     * StringUtil.stripStart("yxabc  ", "xyz") = "abc  "
     * </pre>
     *
     * @param str        지정된 문자가 제거되어야 할 문자열
     * @param stripChars 제거대상 문자열
     * @return 지정된 문자가 제거된 문자열, null이 입력되면 <code>null</code> 리턴
     */
    public static String stripStart(String str, String stripChars) {

        int strLen;

        if (str == null || (strLen = str.length()) == 0) {
            return str;
        }

        int start = 0;

        if (stripChars == null) {

            while ((start != strLen) && Character.isWhitespace(str.charAt(start))) {
                start++;
            }

        } else if (stripChars.length() == 0) {
            return str;
        } else {

            while ((start != strLen) && (stripChars.indexOf(str.charAt(start)) != -1)) {
                start++;
            }
        }

        return str.substring(start);
    }

    /**
     * <p>
     * 입력된 String의 뒤쪽에서 두번째 인자로 전달된 문자(stripChars)를 모두 제거한다.
     * </p>
     *
     * <pre>
     * StringUtil.stripEnd(null, *)          = null
     * StringUtil.stripEnd("", *)            = ""
     * StringUtil.stripEnd("abc", "")        = "abc"
     * StringUtil.stripEnd("abc", null)      = "abc"
     * StringUtil.stripEnd("  abc", null)    = "  abc"
     * StringUtil.stripEnd("abc  ", null)    = "abc"
     * StringUtil.stripEnd(" abc ", null)    = " abc"
     * StringUtil.stripEnd("  abcyx", "xyz") = "  abc"
     * </pre>
     *
     * @param str        지정된 문자가 제거되어야 할 문자열
     * @param stripChars 제거대상 문자열
     * @return 지정된 문자가 제거된 문자열, null이 입력되면 <code>null</code> 리턴
     */
    public static String stripEnd(String str, String stripChars) {

        int end;

        if (str == null || (end = str.length()) == 0) {
            return str;
        }

        if (stripChars == null) {

            while ((end != 0) && Character.isWhitespace(str.charAt(end - 1))) {
                end--;
            }

        } else if (stripChars.length() == 0) {
            return str;
        } else {

            while ((end != 0) && (stripChars.indexOf(str.charAt(end - 1)) != -1)) {
                end--;
            }

        }

        return str.substring(0, end);
    }

    /**
     * <p>
     * 입력된 String의 앞, 뒤에서 두번째 인자로 전달된 문자(stripChars)를 모두 제거한다.
     * </p>
     *
     * <pre>
     * StringUtil.strip(null, *)          = null
     * StringUtil.strip("", *)            = ""
     * StringUtil.strip("abc", null)      = "abc"
     * StringUtil.strip("  abc", null)    = "abc"
     * StringUtil.strip("abc  ", null)    = "abc"
     * StringUtil.strip(" abc ", null)    = "abc"
     * StringUtil.strip("  abcyx", "xyz") = "  abc"
     * </pre>
     *
     * @param str        지정된 문자가 제거되어야 할 문자열
     * @param stripChars 제거대상 문자열
     * @return 지정된 문자가 제거된 문자열, null이 입력되면 <code>null</code> 리턴
     */
    public static String strip(String str, String stripChars) {

        if (isEmpty(str)) {
            return str;
        }

        String srcStr = str;
        srcStr = stripStart(srcStr, stripChars);

        return stripEnd(srcStr, stripChars);
    }

    /**
     * 문자열을 지정한 분리자에 의해 지정된 길이의 배열로 리턴하는 메서드.
     * 
     * @param source      원본 문자열
     * @param separator   분리자
     * @param arraylength 배열 길이
     * @return 분리자로 나뉘어진 문자열 배열
     */
    public static String[] split(String source, String separator, int arraylength) throws NullPointerException {

        String[] returnVal = new String[arraylength];

        int cnt = 0;
        int index0 = 0;
        int index = source.indexOf(separator);
        while (index >= 0 && cnt < (arraylength - 1)) {
            returnVal[cnt] = source.substring(index0, index);
            index0 = index + 1;
            index = source.indexOf(separator, index + 1);
            cnt++;
        }

        returnVal[cnt] = source.substring(index0);
        if (cnt < (arraylength - 1)) {
            for (int i = cnt + 1; i < arraylength; i++) {
                returnVal[i] = "";
            }
        }

        return returnVal;
    }

    /**
     * 문자열 A에서 Z사이의 랜덤 문자열을 구하는 기능을 제공 시작문자열과 종료문자열 사이의 랜덤 문자열을 구하는 기능
     *
     * @param startChr - 첫 문자
     * @param endChr   - 마지막문자
     * @return 랜덤문자
     * @exception MyException
     * @see
     */
    public static String getRandomStr(char startChr, char endChr) {

        int randomInt;
        String randomStr = null;

        /** 시작문자 및 종료문자를 아스키숫자로 변환한다. **/
        int startInt = Integer.valueOf(startChr);
        int endInt = Integer.valueOf(endChr);

        /** 시작문자열이 종료문자열보가 클경우 **/
        if (startInt > endInt) {
            throw new IllegalArgumentException("Start String: " + startChr + " End String: " + endChr);
        }

        try {
            SecureRandom rnd = new SecureRandom(); // 랜덤 객체 생성

            do {
                randomInt = rnd.nextInt(endInt + 1); // 시작문자 및 종료문자 중에서 랜덤 숫자를 발생시킨다.
            } while (randomInt < startInt); // 입력받은 문자 'A'(65)보다 작으면 다시 랜덤 숫자 발생.

            randomStr = (char) randomInt + ""; // 랜덤 숫자를 문자로 변환 후 스트링으로 다시 변환

        } catch (Exception e) {
            Logger.getLogger(helper.class).debug(e);// e.printStackTrace();
        }

        return randomStr;
    }

    /**
     * 문자열을 다양한 문자셋(EUC-KR[KSC5601],UTF-8..)을 사용하여 인코딩하는 기능 역으로 디코딩하여 원래의 문자열을 복원하는
     * 기능을 제공함 String temp = new String(문자열.getBytes("바꾸기전 인코딩"),"바꿀 인코딩"); String
     * temp = new String(문자열.getBytes("8859_1"),"KSC5601"); => UTF-8 에서 EUC-KR
     *
     * @param srcString    - 문자열
     * @param srcCharsetNm - 원래 CharsetNm
     * @param charsetNm    - CharsetNm
     * @return 인(디)코딩 문자열
     * @exception MyException
     * @see
     */
    public static String getEncdDcd(String srcString, String srcCharsetNm, String cnvrCharsetNm) {

        String rtnStr = null;

        if (srcString == null) {
            return null;
        }

        try {
            rtnStr = new String(srcString.getBytes(srcCharsetNm), cnvrCharsetNm);
        } catch (UnsupportedEncodingException e) {
            rtnStr = null;
        }

        return rtnStr;
    }

    /**
     * 특수문자를 웹 브라우저에서 정상적으로 보이기 위해 특수문자를 처리('<' -> & lT)하는 기능이다
     * 
     * @param srcString - '<'
     * @return 변환문자열('<' -> "&lt"
     * @exception MyException
     * @see
     */
    public static String getSpclStrCnvr(String srcString) {

        String rtnStr = null;

        try {

            StringBuffer strTxt = new StringBuffer("");

            char chrBuff;
            int len = srcString.length();

            for (int i = 0; i < len; i++) {
                chrBuff = (char) srcString.charAt(i);

                switch (chrBuff) {
                case '<':
                    strTxt.append("&lt;");
                    break;
                case '>':
                    strTxt.append("&gt;");
                    break;
                case '&':
                    strTxt.append("&amp;");
                    break;
                default:
                    strTxt.append(chrBuff);
                }
            }

            rtnStr = strTxt.toString();

        } catch (Exception e) {
            Logger.getLogger(helper.class).debug(e);// e.printStackTrace();
        }

        return rtnStr;
    }

    /**
     * 응용어플리케이션에서 고유값을 사용하기 위해 시스템에서17자리의TIMESTAMP값을 구하는 기능
     *
     * @param
     * @return Timestamp 값
     * @exception MyException
     * @see
     */
    public static String getTimeStamp() {

        String rtnStr = null;
        String pattern = "yyyyMMddhhmmssSSS"; // 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))

        try {

            SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
            Timestamp ts = new Timestamp(System.currentTimeMillis());

            rtnStr = sdfCurrent.format(ts.getTime());
        } catch (Exception e) {
            Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
        }

        return rtnStr;
    }

    /**
     * html의 특수문자를 표현하기 위해
     *
     * @param srcString
     * @return String
     * @exception Exception
     * @see
     */
    public static String getHtmlStrCnvr(String srcString) {

        String tmpString = srcString;

        try {
            tmpString = tmpString.replaceAll("&lt;", "<");
            tmpString = tmpString.replaceAll("&gt;", ">");
            tmpString = tmpString.replaceAll("&amp;", "&");
            tmpString = tmpString.replaceAll("&nbsp;", " ");
            tmpString = tmpString.replaceAll("&apos;", "\'");
            tmpString = tmpString.replaceAll("&quot;", "\"");
            tmpString = tmpString.replaceAll("&#92;", "\\");
            tmpString = tmpString.replaceAll("script", "s c r i p t");

        } catch (Exception ex) {
            Logger.getLogger(helper.class).debug(ex);// ex.printStackTrace();
        }

        return tmpString;
    }

    /**
     * <p>
     * 날짜 형식의 문자열 내부에 마이너스 character(-)를 추가한다.
     * </p>
     *
     * <pre>
     * StringUtil.addMinusChar("20100901") = "2010-09-01"
     * </pre>
     *
     * @param date 입력받는 문자열
     * @return " - "가 추가된 입력문자열
     */
    public static String addMinusChar(String date) {
        if (date.length() == 8)
            return date.substring(0, 4).concat("-").concat(date.substring(4, 6)).concat("-")
                    .concat(date.substring(6, 8));
        else
            return "";
    }

    /**
     * JSON 데이터 변환
     * 
     * @param request
     * @return
     */
    public static HashMap<String, String> readJSONStringFromRequestBody(HttpServletRequest req) {

        HashMap<String, String> hm = new HashMap<String, String>();

        StringBuffer sbReq = new StringBuffer();
        String line = "";

        try {

            BufferedReader reader = req.getReader();

            System.out.println(" line :  " + reader.toString());

            while ((line = reader.readLine()) != null) {
                sbReq.append(line);
            }

            String[] aryReq = sbReq.toString().split("&");

            System.out.println(" sbReq :  " + sbReq.toString());

            for (String strParam : aryReq) {

                String[] ary = isNullToString(strParam).split("=");

                System.out.println(ary[0] + " : " + URLDecoder.decode(ary[1], "UTF-8"));

                hm.put(isNullToString(ary[0]), getEncode(nullConvert(URLDecoder.decode(ary[1], "UTF-8"))));
            }
        } catch (Exception e) {
            Logger.getLogger(helper.class).debug(e); // ex.printStackTrace();
        }

        return hm;
    }

    /**
     * mask문자를 제거하고 숫자만 남긴다.
     *
     * @param data mask 제거 할 문자 @return @exception
     */
    public static String exceptMask(String data) {

        String lsReturn = "";
        String lsTemp = data.trim();

        char lcChar;

        for (int i = 0; i < lsTemp.length(); i++) {

            lcChar = lsTemp.charAt(i);
            if (Character.isDigit(lcChar)) {
                lsReturn += lcChar;
            }
        }

        return lsReturn;
    }

    /**
     * 숫자인지 검사
     *
     * @param sVal
     * @return
     */
    public static boolean isNumber(String sVal) {

        String num = "0123456789";

        for (int i = 0; i < sVal.length(); i++) {
            if (-1 == num.indexOf(sVal.substring(i, i + 1))) {
                return false;
            }
        }

        return true;
    }

    /**
     * 숫자인지 검사-
     *
     *
     * @param sVal
     * @return
     */
    public static boolean isNumberStr(String sVal) {

        String num = "0123456789-";

        for (int i = 0; i < sVal.length(); i++) {
            if (-1 == num.indexOf(sVal.substring(i, i + 1))) {
                return false;
            }
        }

        return true;
    }

    /**
     * 필수값에 대한 검사
     * 
     * @param arg
     * @return
     */
    public static boolean getBol(String arg) {

        boolean bol = false;

        try {
            arg = nullConvert(arg);
            bol = (arg.equals("") == true) ? true : false;
        } catch (Exception e) {
            Logger.getLogger(helper.class).debug(e); // ex.printStackTrace();
        }

        return bol;
    }

    /**
     * 기본 태그 제거
     *
     * @param str
     * @return
     */
    public static String getEncode(String str) {

        StringBuffer sb = new StringBuffer();
        int iLenth = 0;

        try {
            if (str != null) {
            
                str = getReplace(str, "script", "s c r i p t");
                iLenth = str.length();

                for (int i = 0; i < iLenth; i++) {

                    String sTmp = "";

                    switch (str.charAt(i)) {

                    case '<':
                        sTmp = "&lt;";
                        break;

                    case '>':
                        sTmp = "&gt;";
                        break;

                    case '"':
                        sTmp = "&quot";
                        break;

                    case '\'':
                        sTmp = "&#39;";
                        break;

                    case '%':
                        sTmp = "&#37;";
                        break;
                    case ';':
                        sTmp = "&#59;";
                        break;

                    case '(':
                        sTmp = "&#40;";
                        break;

                    case ')':
                        sTmp = "&#41;";
                        break;

                    case '&':
                        sTmp = "&amp;";
                        break;

                    case '+':
                        sTmp = "&#43;";
                        break;

                    case '|':
                        sTmp = "&#124;";
                        break;

                    case '$':
                        sTmp = "&#36;";
                        break;

                    case '＠':
                        sTmp = "&#64;";
                        break;

                    case '\\':
                        sTmp = "&#92;";
                        break;

                    case '/':

                        if (i != 0) {

                            String tmp = String.valueOf(str.charAt(i - 1));

                            if (sTmp.equals("/") == true && tmp.equals(".") == true) {
                                sTmp = "&#47;";
                            } else {
                                sTmp = String.valueOf(str.charAt(i));
                            }
                        } else {
                            sTmp = String.valueOf(str.charAt(i));
                        }

                        break;

                    case '=':

                        if (i != 0) {
                            String prTmp = String.valueOf(str.charAt(i - 1));
                            String nxTmp = String.valueOf(str.charAt(i + 1));
                            String tmp = prTmp + sTmp + nxTmp;

                            if (tmp.equals("1=1") == true) {
                                sTmp = "";
                            } else {
                                sTmp = String.valueOf(str.charAt(i));
                            }
                        } else {
                            sTmp = String.valueOf(str.charAt(i));
                        }
                        break;
                    default:
                        sTmp = String.valueOf(str.charAt(i));
                        break;
                    }
                    sb.append(sTmp);
                }
            }

        } catch (Exception e) {
            Logger.getLogger(helper.class).debug(e); // ex.printStackTrace();
        }

        return (sb.toString());
    }

    /**
     * html의 특수문자를 표현하기 위해
     *
     * @param srcString
     * @return String
     * @exception Exception
     * @see
     */
    public static String getDecode(String srcString) {

        String tmpString = srcString;

        try {
            tmpString = tmpString.replaceAll("&lt;", "<");
            tmpString = tmpString.replaceAll("&gt;", ">");
            tmpString = tmpString.replaceAll("&quot", "'");
            tmpString = tmpString.replaceAll("&#39;", "\'");
            tmpString = tmpString.replaceAll("&#37;", "%");
            tmpString = tmpString.replaceAll("&#59;", ";");
            tmpString = tmpString.replaceAll("&#40;", "(");
            tmpString = tmpString.replaceAll("&#41;", ")");
            tmpString = tmpString.replaceAll("&amp;", "&");
            tmpString = tmpString.replaceAll("&#43;", "+");
            tmpString = tmpString.replaceAll("&#92;", "\\");

        } catch (Exception ex) {

            Logger.getLogger(helper.class).debug(ex);// ex.printStackTrace();
        }

        return tmpString;

    }

    /**
     * 문자 변환
     * 
     * @param regex
     * @param str
     * @param repl
     */
    public static String getReplace(String regex, String str, String repl) {

        if (regex != null) {
            regex = regex.replaceAll(str, repl);
        }

        return regex;
    }

    /**
     * 문자결합
     * 
     * @param str
     * @param comb
     * @return
     */
    public static String strCombination(String str, String comb) {

        StringBuffer sb = new StringBuffer();

        str = nullConvert(str); // 결합문자
        comb = nullConvert(comb); // 결합구분자

        /** 결합문자가 빈값이 아닌경우 **/
        if (str.equals("") == false) {
            sb.append(str).append(comb);
        } else {
            sb.append("");
        }

        return sb.toString();
    }

    /**
     * 문자결합
     * 
     * @param str   구분자로 만들어진 문자
     * @param gubun split 하기위한 구분자
     * @param i     배열에서 갖고올 순서
     * @return
     */
    public static String strSplit(String str, String gubun, int i) {

        String[] arg;
        String strRtn = "";

        str = nullConvert(str);

        /** 넘겨받은 문자가 빈값이 아닌경우 **/
        if (str.equals("") == false) {

            arg = str.split(gubun); // 넘겨받은 파라미터로 배열생성

            if (arg.length > 0) {
                strRtn = arg[i];
            } // 배열이 0보다 큰경우
        }

        return strRtn;
    }

    /**
     * 세자리마다 콤마
     * 
     * @param arg
     * @return
     */
    public static String numComma(int arg) {

        DecimalFormat df = new DecimalFormat("#,##0");

        return String.valueOf(df.format(arg));
    }

    /**
     * 세자리마다 콤마
     * 
     * @param arg
     * @return
     */
    public static String numComma(String arg) {

        DecimalFormat df = new DecimalFormat("#,##0");
        BigDecimal big_arg = new BigDecimal("0");

        big_arg = new BigDecimal(helper.nullConvert(arg));

        return String.valueOf(df.format(big_arg));
    }

    /**
     * bigdecimal을 이용한 계산
     * 
     * @param type 더하기,빼기, 곱셈, 나눗셈
     * @param num  나눗셈일 경우 자릿수 2이며 3자리에서 반올림혹은 반내림
     * @param arg  문자열 숫자
     * @param arg2 문자열 숫자2 나눗셈일 경우 나누기할 수
     * @return
     */
    public static String bigDecimalLogic(String type, int num, String arg, String arg2) {

        String strRtn = "";

        BigDecimal bdcl1 = new BigDecimal(0);
        BigDecimal bdcl2 = new BigDecimal(0);

        BigDecimal p_add = new BigDecimal(0);

        if (arg != null && !arg.equals("")) {
            bdcl1 = new BigDecimal(helper.nullConvert(arg));
        }

        if (arg2 != null && !arg2.equals("")) {
            bdcl2 = new BigDecimal(helper.nullConvert(arg2));
        }

        if (type.equals("add") == true) {
            p_add = bdcl1.add(bdcl2);
        } // 더하기
        else if (type.equals("subtract") == true) {
            p_add = bdcl1.subtract(bdcl2);
        } // 빼기
        else if (type.equals("multiply") == true) {
            p_add = bdcl1.multiply(bdcl2);
        } // 곱하기
        else if (type.equals("divide") == true) {
            p_add = bdcl1.divide(bdcl2, num, BigDecimal.ROUND_UP);
        } // 나누기 - 소수점 num번째 자리에서 반올림.
        else if (type.equals("divideDown") == true) {
            p_add = bdcl1.divide(bdcl2, num, BigDecimal.ROUND_DOWN);
        } // 나누기 - 소수점 num번째 자리에서 반내림.

        strRtn = helper.nullConvert(p_add.toString());

        return strRtn;
    }

    /**
     * 파일용량
     * 
     * @param fileSize
     * @return
     * @throws Exception
     */
    public static String getFileSize(BigDecimal fileSize) throws Exception {

        String rtnFileSize = "";
        String strFileSize = String.valueOf(fileSize);
        Long lDefaultSize = (long) 1024;
        Long lFileSize = Long.parseLong(strFileSize);

        if (lFileSize > (lDefaultSize * 1024)) {
            rtnFileSize = helper.bigDecimalLogic("divide", 1, String.valueOf(lFileSize),
                    String.valueOf(lDefaultSize * 1024)) + "MB";
        } else if (lFileSize > lDefaultSize) {
            rtnFileSize = helper.bigDecimalLogic("divide", 1, String.valueOf(lFileSize), String.valueOf(1024)) + "KB";
        } else {
            rtnFileSize = String.valueOf(lFileSize) + "Byte";
        }

        return rtnFileSize;
    }

    /**
     * 첨부파일 확장자 검사
     * 
     * @param argType
     * @param arg
     * @return
     */
    public static boolean fileTypeChk(String argType, String arg) {

        boolean bol = false;

        String allowPattern = ".+\\.(" + argType + ")$";

        Pattern p = Pattern.compile(allowPattern);
        Matcher m = p.matcher(arg);

        bol = m.matches();

        return bol;
    }

    /**
     * 문자열에서 숫자만 추출
     * 
     * @param str
     * @return
     */
    public static String onlyNum(String str) {

        if (str == null)
            return "";

        StringBuffer sb = new StringBuffer();

        for (int i = 0; i < str.length(); i++) {

            if (Character.isDigit(str.charAt(i))) {
                sb.append(str.charAt(i));
            }
        }

        return sb.toString();
    }

    /*
     * 대소문자를 상관하지 않고 str 문자열에 포함된 keyword 를 찾아서 원래의 문자에 붉은색 폰트태그를 삽입한 문자열 반환 Method
     * markKeyword.
     * 
     * @param str
     * 
     * @param keyword
     * 
     * @return String
     */
    public static String markKeyword(String str, String keyword) {
        keyword = replace(replace(replace(keyword, "[", "\\["), ")", "\\)"), "(", "\\(");

        Pattern p = Pattern.compile(keyword, Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(str);
        int start = 0;
        int lastEnd = 0;

        StringBuffer sbuf = new StringBuffer();

        while (m.find()) {
            start = m.start();
            sbuf.append(str.substring(lastEnd, start)).append("<strong>" + m.group() + "</strong>");
            lastEnd = m.end();
        }

        return sbuf.append(str.substring(lastEnd)).toString();
    }

    /**
     * 객체가 Null 인지 확인한다.
     * 
     * @param object
     * @return Null인경우 true / Null이 아닌경우 false
     */
    public static boolean isNull(Object object) {
        return ((object == null));
    }

    /**
     * 문자 패턴 비교
     * 
     * @param arg
     * @param chars
     * @return
     */
    public static boolean containsCharsOnly(String arg, String chars) {

        int inx = 0;

        for (; inx < arg.length(); inx++) {

            if (chars.indexOf(arg.charAt(inx)) == -1) {
                return false;
            }
        }

        return true;
    }

    /**
     * 이메일 체크
     * 
     * @param email
     * @return
     */
    public static boolean isEmail(String email) {

        if (email == null) {
            return false;
        }

        boolean b = Pattern.matches("[\\w\\~\\-\\.]+@[\\w\\~\\-]+(\\.[\\w\\~\\-]+)+", email.trim());

        return b;
    }

    /**
     * 연락처 +, -, 숫자 여부
     * 
     * @param arg
     * @return
     */
    public static boolean isChrNumber(String arg) {
        String chars = "+-0123456789";
        return containsCharsOnly(arg, chars);
    }

    /**
     * 소수점 8자리 만들기
     * 
     * @param arg
     * @return
     */
    public static String zeroFormater(String arg) {

        String rtn = arg; // rtn += ".";

        int i = 0;

        int dfltCphr = 8;
        int zeroCphr = 0;
        int area = arg.indexOf('.');

        if (area == -1) {
            rtn += ".";
            zeroCphr = dfltCphr;

        } else {

            zeroCphr = (arg.substring(area + 1, arg.length())).length();
            zeroCphr = dfltCphr - zeroCphr;
        }

        if (zeroCphr > 0) {

            for (; i < zeroCphr; i++) {
                rtn += "0";
            }
        }

        return rtn;
    }

    /**
     * (length - str.length) 만큼 앞에 0을 추가한다.
     * 
     * @param str
     * @param length
     * @return
     */
    public static String addZero(String str, int length) {

        String temp = "";

        for (int i = str.length(); i < length; i++) {
            temp += "0";
            temp += str;
        }

        return temp;
    }

    /**
     * 문자열을
     * 
     * @param api_json_rtn
     * @return
     * @throws ParseException
     */
    public static JSONObject jsonObjCnvr(String api_json_rtn) throws ParseException {

        JSONObject jsonObj = null;
        JSONParser parser = new JSONParser();

        Object obj = null;

        /** 파라미터 값 존재시 JSON 형변환 */
        if (api_json_rtn != null && !api_json_rtn.equals("")) {

            obj = parser.parse(api_json_rtn);
            jsonObj = (JSONObject) obj;
        }

        return jsonObj;
    }

    /**
     * 기기 UUID 추출
     * 
     * @param req
     * @return
     * @throws ParseException
     */
    public static String getSbscrb_mhrls_uuid(HttpServletRequest req) throws ParseException {

        String sbscrb_mhrls_uuid = ""; // 파라미터 기기UUID
        String sess_sbscrb_mhrls_uuid = ""; // 세션 기기UUID

        sbscrb_mhrls_uuid = StringUtil.normalizeNull(req.getParameter("sbscrb_mhrls_uuid"));

        /** 파라미터 UUID가 없는 경우 세션 값 확인 */
        if (sbscrb_mhrls_uuid==null || "".equals(sbscrb_mhrls_uuid)) {
            sbscrb_mhrls_uuid = String.valueOf(req.getSession().getAttribute("sbscrb_mhrls_uuid"));
        } else {

            sess_sbscrb_mhrls_uuid = String.valueOf(req.getSession().getAttribute("sbscrb_mhrls_uuid"));

            if (sess_sbscrb_mhrls_uuid == null || "".equals(sess_sbscrb_mhrls_uuid)) {
                req.getSession().setAttribute("sbscrb_mhrls_uuid", sbscrb_mhrls_uuid); /* UUID 관련 세션을 생성 */
            }
        }

        return sbscrb_mhrls_uuid;
    }

    /**
     * 국가코드
     * 
     * @param arg
     * @return
     * @throws ParseException
     */
    public static String getLangCuntCd(String arg) throws ParseException {

        String rtn = "";

        if (arg.matches("ko")) {
            rtn = "KOR";
        } else if (arg.matches("en")) {
            rtn = "ENG";
        } else if (arg.matches("ja")) {
            rtn = "JPN";
        } else if (arg.matches("zh")) {
            rtn = "CHN";
        } else {
            rtn = "KOR";
        }

        return rtn;
    }

    /**
     * 국가코드
     * 
     * @param arg
     * @return
     * @throws ParseException
     */
    public static Object getCuntCdLang(String arg) throws ParseException {

        Object locale = null;

        if (arg.matches("KOR")) {
            locale = Locale.KOREAN;
        } else if (arg.matches("ENG")) {
            locale = Locale.ENGLISH;
        } else if (arg.matches("JPN")) {
            locale = Locale.JAPANESE;
        } else {
            locale = Locale.CHINESE;
        }

        return locale;
    }

    /**
     * 언어 쿠키 세션 생성
     * 
     * @param req
     * @param locale
     */
    public static void setLangSession(HttpServletRequest req, Object locale) {

        HttpSession session = null;

        session = req.getSession();
        session.setAttribute(SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME, locale);
    };

    /**
     * 정규식 계좌 인증 번호 ex) (010-11**-**11)
     * 
     * @param str
     * @return
     */
    public static String getMaskedAcnutNo(String str) {

        int leng = str.length();
        String returnStr = "";

        if (isNullToString(str).equals("")) {
            returnStr = str;
        } else {
            for (int ii = 0; ii <= leng; ii++) {
                if (ii == 0) {
                    returnStr += str.substring(0, 1);
                } else if (ii == leng) {
                    returnStr += str.substring(ii - 1, ii);
                } else {
                    returnStr += "*";
                }
            }
        }
        return returnStr;
    };

    /**
     * 정규식 이용 핸드폰 번호 포맷 변경 ex) (010-11**-**11)
     * 
     * @param str
     * @return
     */
    public static String getMaskedPhone(String str) {

        Pattern pattern = Pattern.compile("^(\\d{3})-?(\\d{1,2})\\d{2}-?\\d{2}(\\d{2})$");
        // 입력받은 str이 null이거나 공백일경우 빈 문자("") 반환.
        if (str == null || "".equals(str))
            return "";
        Matcher matcher = pattern.matcher(str);
        if (matcher.find())
            return matcher.replaceAll("$1-$2**-**$3"); // 치환
        else
            return "****";
    };

    /**
     * 이메일 정규식 마스킹 ex) input : 123456@gmail.com output : 123********@gmail.com
     * 
     * @param email
     * @return
     */
    public static String getMaskedEmail(String email) {
        return email.replaceAll("(?<=.).(?=[^@]*?@)|(?:(?<=@.)|(?!^)\\G(?=[^@]*$)).(?=.*\\.)", "*");
    };

    /**
     * object null 체크
     *
     * @param str
     * @return
     */
    @SuppressWarnings("rawtypes")
    public static Boolean emptyObject(Object obj) {

        boolean returnBol = false;
        if (obj instanceof String) {

            if (obj != null || !"".equals(obj.toString().trim())) {
                returnBol = true;
            }
        } else if (obj instanceof List) {
            // return obj == null || ((List) obj).isEmpty();
            if (obj != null || !((List) obj).isEmpty()) {
                returnBol = true;
            }

        } else if (obj instanceof Map) {
            // return obj == null || ((Map) obj).isEmpty();
            if (obj != null || !((Map) obj).isEmpty()) {
                returnBol = true;
            }
        } else if (obj instanceof Object[]) {
            if (obj != null || Array.getLength(obj) != 0) {
                returnBol = true;
            }
        }
        return returnBol;
    }

    /**
     * 운영 , 개발 주소 구문
     *
     * @param req
     * @return 코드값
     */
    public static String realDevlAddrGbn(HttpServletRequest req, String propertiesNm) {

        boolean returnBol = false;
        String domain = "";
        String rdGbn = "";
        StringBuffer url = new StringBuffer();
        int splitCnt = 0;
        try {
            url.append(req.getRequestURL());
            domain = url.toString();

            // 주소에 www 가 있음
            if (domain.indexOf("korcx.com") > 0) {
                returnBol = true;
            }
        } catch (Exception e) {
            returnBol = false;
        }

        /** 프러퍼티 값 가지고와서 개발인지 운영인지 구분 */
        if (!helper.nullConvert(propertiesNm).equals("")) {
            splitCnt = helper.nullConvert(propertiesNm).split(",").length;

            if (splitCnt > 1) {
                if (returnBol) {
                    rdGbn = helper.nullConvert(propertiesNm).split(",")[0]; // korcx.com 가 있으면 운영서버
                } else {
                    rdGbn = helper.nullConvert(propertiesNm).split(",")[1]; // korcx.com 가 없으면 개발
                }
            } else {
                rdGbn = propertiesNm;
            }

        }
        return rdGbn;
    }

    /**
     * 문자 비교 0 : 문자값 동일 1 : arg가 arg1 보다 큰 경우 -1 : arg가 agr1 보다 작은 경우
     * 
     * @param arg
     * @param arg1
     * @return
     */
    public static int getStrComparis(String arg, String arg1) {

        int rtn = 1;

        if ((arg != null && !arg.equals("")) && (arg1 != null && !arg1.equals(""))) {
            rtn = arg.compareTo(arg1);
        }

        return rtn;
    }

    public static boolean useList(String[] arr, String targetValue) {

        return Arrays.asList(arr).contains(targetValue);

    }

    public static boolean useLoop(String[] arr, String targetValue) {

        for (String s : arr) {

            if (s.equals(targetValue))

                return true;

        }

        return false;

    }

    public static boolean useSet(String[] arr, String targetValue) {

        Set<String> set = new HashSet<String>(Arrays.asList(arr));

        return set.contains(targetValue);

    }

    public static boolean useArraysBinarySearch(String[] arr, String targetValue) {

        int a = Arrays.binarySearch(arr, targetValue);

        if (a > 0)

            return true;

        else

            return false;

    }

    /**
     * token 생성
     * 
     * @param token
     * @return
     */

    @SuppressWarnings("deprecation")
    public static String generateToken(Map<String, Object> data) {

        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        Map<String, Object> payload = new HashMap<>();
        Date exDate = new Date(System.currentTimeMillis() + 18000000);

        payload.put("exp", exDate);
        payload.put("data", data.toString());

        String token = Jwts.builder().setHeader(headers).setClaims(payload).setExpiration(exDate)
                .signWith(SignatureAlgorithm.HS256, jwt_key.getBytes()).compact();

        return token;

    }

    @SuppressWarnings({ "deprecation", "unused" })
    public static Map<String, Object> getTokenFormJwtString(String token) throws InterruptedException {

        Map<String, Object> returnMap = new HashMap<>();

        Claims claims = Jwts.parser().setSigningKey(jwt_key.getBytes()).parseClaimsJws(token).getBody();
        Date expiration = claims.get("exp", Date.class);

        return returnMap;

    }
    
    public static List<Map<String, Object>>  list_string_tag_convertor(List<Map<String, Object>> converArray, boolean singeTagYn, String[] target, String delimiter, String useTag) {
        List<Map<String, Object>> returnData = new ArrayList<>();
        
        
            
            for (Map<String, Object> map : converArray) {
                for(int i=0; i<target.length; i++) {
                String targetString = (String) map.get(target[i]);
                if(!isEmpty(targetString)) {
                    String[] targetStringArr = targetString.split(delimiter);
                    String returntTarget="";
                    
                    
                    for(int j=0; j<targetStringArr.length; j++) {
                        if(singeTagYn) {
                            returntTarget +=(targetStringArr[j]+"<"+useTag+">");
                        } else {
                            returntTarget +=("<"+useTag+">"+targetStringArr[j]+"</"+useTag+">");
                        }
                        
                    }
                    map.put(target[i],returntTarget);
                }
            }
                returnData.add(map);
        }
        return returnData;
        
    }
}
