package com.keyvany.keyvany.admin.os.osmgmt.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keyvany.keyvany.admin.os.osmgmt.service.OsMgmtService;
import com.keyvany.keyvany.common.pagination.Pagination;
import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.RequestUtil;

@RestController
@RequestMapping(value = "/cms/os")
public class OsMgmtController {

	@Autowired
    private OsMgmtService svc;

	//모바일 구분
	@Autowired
	private RequestUtil reqUtil;

    /*wheel 리스트 조회*/
    @MenuAnnotation("~ 리스트 조회")
    @GetMapping("/osmgmt.htm")
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
        Pagination pagination = new Pagination(limit, rangeSize, page, totalCnt); //페이징

        model.addAttribute("gnbMenu", "wheel");
        model.addAttribute("url", url);
        model.addAttribute("searchType", searchType);
        model.addAttribute("searchKeyword", searchKeyword);
        model.addAttribute("pagination", pagination);
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));
        return "admin/os/osMgmtList";
    }
}
