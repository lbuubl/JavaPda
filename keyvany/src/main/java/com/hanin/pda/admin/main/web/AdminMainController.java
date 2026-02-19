package com.hanin.pda.admin.main.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hanin.pda.admin.main.service.AdminMainService;
import com.hanin.pda.common.domain.User;
import com.hanin.pda.common.util.MenuAnnotation;
import com.hanin.pda.common.util.Message;
import com.hanin.pda.common.util.RestResponse;
import com.hanin.pda.common.util.SessionUtils;

@Controller
@RequestMapping(value = "/pda/manage")
public class AdminMainController {

  @Autowired
  private AdminMainService svc;

  @GetMapping({"/pda"})
  public String index(HttpServletRequest request, HttpServletResponse response, Model model)
      throws Exception {
    return "admin/index";
  }

  /*메인관리 조회*/
  @MenuAnnotation("메인관리 조회")
  @GetMapping("/main")
  public String manage1(HttpServletRequest request, HttpServletResponse response, Model model)
      throws Exception {
    User user = SessionUtils.getSessionInfo(request);
    model.addAttribute("user", user);
    return "admin/main/index";
  }


  /*원소재 바코드 조회*/
  @MenuAnnotation("메인 차트  조회")
  @PostMapping("/getmainchart")
  public  ResponseEntity<RestResponse>  getMainChart(HttpServletRequest request
		  , @RequestBody HashMap<String, Object> param)  {
	  RestResponse<Object> restResponse = new RestResponse<>();


	  HttpSession session = request.getSession();
	  User user = SessionUtils.getSessionInfo(request);
      List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		try {
			param.put("facCd", user.getFacCd());
			param.put("whCd", user.getWhCd());
			retList = svc.getMainChart(param);
			restResponse = RestResponse.builder()
                 .code(HttpStatus.OK.value())
                 .httpStatus(HttpStatus.OK)
                 .message(Message.READ_STUDENTS.label())
                 .data(retList)
                 .build();

		} catch (Exception e) {
			// TODO Auto-generated catch block

	    	// NOT FOUND 응답을 restResponse에 저장한다.
	        restResponse = RestResponse.builder()
	                .code(HttpStatus.NOT_FOUND.value())
	                .httpStatus(HttpStatus.NOT_FOUND)
	                .message(e.getMessage())
	                .build();
		} //공지사항 리스트 조회

			// 응답 결과로 restResponse를 전달한다.
		return new ResponseEntity<>(restResponse, restResponse.getHttpStatus());
  }

}
