package com.keyvany.keyvany.admin.os.osprocin.web;

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

import com.keyvany.keyvany.admin.os.osprocin.service.OsProcInService;
import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.Message;
import com.keyvany.keyvany.common.util.RequestUtil;
import com.keyvany.keyvany.common.util.RestResponse;
import com.keyvany.keyvany.common.util.SessionUtils;

@Controller
@RequestMapping("/cms/os")
public class OsProcInController {

	RestResponse<Object> restResponse = new RestResponse<>();

	@Autowired
    private OsProcInService svc;

	@Autowired
	private RequestUtil reqUtil;

    /*외주가공입고 화면 view*/
    @MenuAnnotation("외주가공입고 화면 view")
    @GetMapping("/osprocin.htm")
    public String osprocin(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
		User user = SessionUtils.getSessionInfo(request);
        model.addAttribute("user", user);
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));
        return "admin/os/osProcinList";
    }


    /*외주가공입고  바코드 조회*/
    @MenuAnnotation("외주가공입고  바코드 조회")
    @PostMapping("/getLotMasterInfoCheck")
    public  ResponseEntity<RestResponse>  getLotMasterInfoCheck(HttpServletRequest request,User user
    		,  @RequestBody  HashMap<String, Object> param)  {
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
