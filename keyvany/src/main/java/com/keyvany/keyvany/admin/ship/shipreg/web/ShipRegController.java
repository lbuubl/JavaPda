package com.keyvany.keyvany.admin.ship.shipreg.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.keyvany.keyvany.admin.ship.shipreg.service.ShipRegService;
import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.Message;
import com.keyvany.keyvany.common.util.RequestUtil;
import com.keyvany.keyvany.common.util.RestResponse;
import com.keyvany.keyvany.common.util.SessionUtils;

@Controller
@RequestMapping("/cms/ship")
public class ShipRegController {

	RestResponse<Object> restResponse = new RestResponse<>();

	@Autowired
    private ShipRegService svc;

	@Autowired
	private RequestUtil reqUtil;

    /*출하관리 화면 view*/
    @MenuAnnotation("출하관리 화면 view")
    @GetMapping("/shipreg.htm")
    public String wheelList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
		User user = SessionUtils.getSessionInfo(request);
        model.addAttribute("user", user);
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));
        return "admin/ship/shipRegList";
    }



    /*출하관리 바코드 조회*/
    @MenuAnnotation("출하관리 바코드 조회")
    @PostMapping("/get-lot-master-info-check")
    public  ResponseEntity<RestResponse>  getLotMasterInfoCheck(HttpServletRequest request,  @RequestBody  HashMap<String, Object> param)  {
    	User user = SessionUtils.getSessionInfo(request);
    	//공통 작업설정
    	if(user==null) {
	    	// NOT FOUND 응답을 restResponse에 저장한다.
	        restResponse = RestResponse.builder()
	                .code(HttpStatus.UNAUTHORIZED.value())
	                .httpStatus(HttpStatus.UNAUTHORIZED)
	                .message("세션이 끊겼습니다. 다시 로그인해주세요!")
	                .build();
    	}

        List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		try {
			retList = svc.getLotMasterInfoCheck(param);
			restResponse = RestResponse.builder()
                   .code(HttpStatus.OK.value())
                   .httpStatus(HttpStatus.OK)
                   .message(Message.READ_STUDENTS.label())
                   .data(retList)
                   .build();

		} catch (Exception e) {
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

    /*출하관리 바코드 조회*/
    @MenuAnnotation("출하관리 저장")
    @PostMapping("/setShipSaveMoveNo")
    public  ResponseEntity<RestResponse>  setShipSaveMoveNo(HttpServletRequest request ,   @RequestBody   HashMap<String, Object> params)  {
    	User user = SessionUtils.getSessionInfo(request);
      	//공통 작업설정
    	if(user==null) {
	    	// NOT FOUND 응답을 restResponse에 저장한다.
	        restResponse = RestResponse.builder()
	                .code(HttpStatus.UNAUTHORIZED.value())
	                .httpStatus(HttpStatus.UNAUTHORIZED)
	                .message("세션이 끊겼습니다. 다시 로그인해주세요!")
	                .build();
    	}
        List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		try {
			params.put("user", user);
			svc.setShipSaveMoveNo(params);
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

    /*출하관리 거래처 정보  바코드 조회*/
    @MenuAnnotation("출하관리 거래처 정보  바코드 조회")
    @PostMapping("/getwhcust")
    public  ResponseEntity<RestResponse>  getWhCust(HttpServletRequest request,  @RequestBody  HashMap<String, Object> param)  {
    	User user = SessionUtils.getSessionInfo(request);
      	//공통 작업설정
    	if(user==null) {
	    	// NOT FOUND 응답을 restResponse에 저장한다.
	        restResponse = RestResponse.builder()
	                .code(HttpStatus.UNAUTHORIZED.value())
	                .httpStatus(HttpStatus.UNAUTHORIZED)
	                .message("세션이 끊겼습니다. 다시 로그인해주세요!")
	                .build();
    	}
        List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		try {
			retList = svc.getWhCust(param);
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
