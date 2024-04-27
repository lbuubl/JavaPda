package com.keyvany.keyvany.admin.stock.stockcheck.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.keyvany.keyvany.admin.stock.stockcheck.service.StockCheckService;
import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.RequestUtil;

@Controller
@RequestMapping("/cms/stock")
public class StockCheckController {

	@Autowired
    private StockCheckService svc;

	@Autowired
	private RequestUtil reqUtil;

    /*wheel 리스트 조회*/
    @MenuAnnotation("wheel 리스트 조회")
    @GetMapping("/stockcheck.htm")
    public String wheelList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));
        return "admin/stock/stockCheckList";
    }
}
