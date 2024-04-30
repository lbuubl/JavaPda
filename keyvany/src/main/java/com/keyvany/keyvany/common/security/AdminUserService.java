package com.keyvany.keyvany.common.security;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.ServletRequestUtils;

import com.keyvany.keyvany.common.dao.AbstractDAO;
import com.keyvany.keyvany.common.domain.Role;
import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.service.CommonService;
import com.keyvany.keyvany.common.util.SessionUtils;


@Service
public class AdminUserService implements UserDetailsService {
	private static final Logger logger = LoggerFactory.getLogger(AdminUserService.class);

	@Autowired(required = false)
    private HttpServletRequest request;

	@Autowired
	AbstractDAO abstractDAO;

    @Autowired
    CommonService commonService;

	public User loadUserByUsername(final String username) throws BadCredentialsException {

        //==========================================================
        // Session Invalidate !!
        //==========================================================
        SessionUtils.removeSession(request);

	    HttpSession session = request.getSession();
        BCryptPasswordEncoder  encoder = new BCryptPasswordEncoder();


        //화면에 입력한 패스워드 가져오기
        String password    =  ServletRequestUtils.getStringParameter(request, "password","");
        System.out.println("password ==========================================");
 	    System.out.println("password : " + password);
 	    System.out.println("password ==========================================");


		// 회원 정보 dao 에서 데이터를 읽어 옴.
		Map<String, Object> loginMap = new HashMap<String, Object>();
		loginMap.put("username", username);
		loginMap.put("password", password);
		List<Map<String, Object>> userInfo =  abstractDAO.selectList("ComDAO.usp_zt_00_login_pda",loginMap);

		//1. 아이디, 패스워드 체크
		//아이디 체크
		if(userInfo.size() == 0) {
            session.setAttribute("failMessage", "아이디를 다시 확인해주세요");
		    throw new UsernameNotFoundException("아이디를 다시 확인해주세요");
		}


		//2. db에 패스워드가 sha256으로 되어있지않아서  비밀번호 체크 패스
		//db에 있는  패스워드 가져오기
		String userPassword = encoder.encode("1234");
        //String userPassword =(String) userInfo.get(0).get("password");
        //패스워드 비교
        boolean pwdFlag =  encoder.matches(password,userPassword );
		Map<String, Object> inMap = new HashMap<String, Object>();
        //String password ="$2y$12$1xjxuw/m79DNlmjHoJXveu8Xoe/6X182QIsG4xDJ6IE5YJ6sy2R22";
		inMap.put("username"  ,    username);
		inMap.put("password"  ,    password);
        if(!pwdFlag) {
            session.setAttribute("failMessage", "비밀번호를 다시 확인해주세요");
            throw new BadCredentialsException("비밀번호를 다시 확인해주세요");
        }

        //사용자 순번
		String uniqueId =(String) userInfo.get(0).get("reg_id");
		String korNm =(String) userInfo.get(0).get("kor_nm");
	    String empCusCd =(String) userInfo.get(0).get("emp_cus_cd");
	    String coCd =(String) userInfo.get(0).get("co_cd");
	    String empNo =(String) userInfo.get(0).get("emp_no");
	    String pass =(String) userInfo.get(0).get("pass");
	    String logSec =(String) userInfo.get(0).get("log_sec");
	    String whCdOut =(String) userInfo.get(0).get("wh_cd_out");
	    String id =(String) userInfo.get(0).get("id");
	    String facCd =(String) userInfo.get(0).get("fac_cd");
	    String facNm =(String) userInfo.get(0).get("fac_nm");
	    String whCd =(String) userInfo.get(0).get("wh_cd");
	    String whNm =(String) userInfo.get(0).get("wh_nm");

		//사용자VO 설정
        // Session Information Setting !!
		User user = new User();
		user.setUsername(username);
		user.setPassword(userPassword);
		user.setUserId( username);
		user.setUniqueId(uniqueId);
		user.setEmpCusCd(empCusCd);
		user.setCoCd(coCd);
		user.setEmpNo(empNo);
		user.setPass(pass);
		user.setLogSec(logSec);
		user.setKorNm(korNm);
		user.setWhCdOut(whCdOut);
		user.setId(id);
		user.setFacCd(facCd);
		user.setFacNm(facNm);
		user.setWhCd(whCd);
		user.setWhCd(whNm);

		//권한설정
        Role role = new Role();
        role.setName("ADMIN");
        List<Role> roles = new ArrayList<Role>();
        roles.add(role);
        user.setAuthorities(roles);

        //세션 설정
        String sessionKey = SessionUtils.SESSION_KEY;
        session.setAttribute(sessionKey, user);
		return user;
	}
}
