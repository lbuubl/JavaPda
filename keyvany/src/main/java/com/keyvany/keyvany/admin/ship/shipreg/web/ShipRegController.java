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
import org.springframework.web.bind.annotation.RestController;

import com.keyvany.keyvany.admin.ship.shipreg.service.ShipRegService;
import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.pagination.Pagination;
import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.Message;
import com.keyvany.keyvany.common.util.RequestUtil;
import com.keyvany.keyvany.common.util.RestResponse;

@Controller
@RequestMapping("/cms/ship")
public class ShipRegController {

	RestResponse<Object> restResponse = new RestResponse<>();

	@Autowired
    private ShipRegService svc;

	@Autowired
	private RequestUtil reqUtil;

    /*wheel 리스트 조회*/
    @MenuAnnotation("wheel 리스트 조회")
    @GetMapping("/shipreg.htm")
    public String wheelList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        Map<String, Object> serachMap = new HashMap<String, Object>();
		String userAgent = request.getHeader("User-Agent").toLowerCase();

        String searchType = ""; //검색조건
        String searchKeyword = ""; //검색키워드
        String url = "/cms/product/wheelList"; //페이지 번호 클릭 시 이 URL로 넘겨줌
        int page = 1; //페이지 번호
        int limit = 10; //리스트에 보여줄 개수
        int rangeSize = 10; //페이지 번호 블럭
        int totalCnt = 0; //리스트 전체 개수

        if(request.getParameter("searchType") != null) {
            searchType = request.getParameter("searchType").toString();
        }

        if(request.getParameter("searchKeyword") != null) {
            searchKeyword = request.getParameter("searchKeyword").toString();
        }

        if(request.getParameter("page") != null) {
            page = Integer.parseInt(request.getParameter("page").toString());
        }

        serachMap.put("searchType", searchType);
        serachMap.put("searchKeyword", searchKeyword);
        serachMap.put("page", page);
        serachMap.put("limit", limit);

        List<Map<String, Object>> wheelList = new ArrayList<Map<String,Object>>();

       // List<Map<String, Object>> wheelList = adminProductService.selectWheelList(serachMap); //wheel 리스트 조회

        //리스트가 존재한다면
       // if(wheelList.size() > 0) {
       //     totalCnt = Integer.parseInt(wheelList.get(0).get("totalCnt").toString());
      //  }

        Pagination pagination = new Pagination(limit, rangeSize, page, totalCnt); //페이징

        model.addAttribute("gnbMenu", "wheel");
        model.addAttribute("url", url);
        model.addAttribute("searchType", searchType);
        model.addAttribute("searchKeyword", searchKeyword);
        model.addAttribute("pagination", pagination);
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));

        //model.addAttribute("wheelList", wheelList);

        return "admin/ship/shipRegList";
    }

    /*원소재 바코드 조회*/
    @MenuAnnotation("원소재 바코드 조회")
    @PostMapping("/getLotMasterInfoInCheck")
    public  ResponseEntity<RestResponse>  getLotMasterInfoInCheck(HttpServletRequest request,User user
    		,  @RequestBody  HashMap<String, Object> param)  {
        List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		try {
			retList = svc.getLotMasterInfoInCheck(param);
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



    /*원소재 바코드 조회*/
    @MenuAnnotation("원소재 저장")
    @PostMapping("/setShipSaveMoveNo")
    public  ResponseEntity<RestResponse>  setShipSaveMoveNo(HttpServletRequest request,User user
    		,  @RequestBody   HashMap<String, Object> params)  {
        List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		try {
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




}
