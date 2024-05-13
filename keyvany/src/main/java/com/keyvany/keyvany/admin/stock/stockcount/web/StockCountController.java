package com.keyvany.keyvany.admin.stock.stockcount.web;

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

import com.keyvany.keyvany.admin.stock.stockcount.service.StockCountService;
import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.Message;
import com.keyvany.keyvany.common.util.RequestUtil;
import com.keyvany.keyvany.common.util.RestResponse;
import com.keyvany.keyvany.common.util.SessionUtils;

@Controller
@RequestMapping("/cms/stock")
public class StockCountController {

	RestResponse<Object> restResponse = new RestResponse<>();

	@Autowired
    private StockCountService svc;

	@Autowired
	private RequestUtil reqUtil;

    /*재고실사 리스트 조회*/
    @MenuAnnotation("stockcount 리스트 조회")
    @GetMapping("/stockcount.htm")
    public String wheelList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
		User user = SessionUtils.getSessionInfo(request);
        model.addAttribute("user", user);
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));
        return "admin/stock/stockCountList";
    }

    /*재고실사 바코드 조회*/
    @MenuAnnotation("재고실사  바코드 조회")
    @PostMapping("/getcheck900data")
    public  ResponseEntity<RestResponse>  getCheck900Data(HttpServletRequest request,User user
    		,  @RequestBody  HashMap<String, Object> param)  {
        List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		try {
			retList = svc.getCheck900Data(param);
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


    /*재고실사 저장 */
    @MenuAnnotation("재고실사 저장 ")
    @PostMapping("/setsavesilsano")
    public  ResponseEntity<RestResponse>  setSaveSilsaNo(HttpServletRequest request ,   @RequestBody   HashMap<String, Object> params)  {
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
			svc.setSaveSilsaNo(params);
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
