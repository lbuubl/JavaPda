package com.keyvany.keyvany.admin.stock.stockmov.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.keyvany.keyvany.admin.stock.stockmov.service.StockMovService;
import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.RequestUtil;
import com.keyvany.keyvany.common.util.RestResponse;

@Controller
@RequestMapping("/cms/stock")
public class StockMovController {

	RestResponse<Object> restResponse = new RestResponse<>();

	@Autowired
    private StockMovService svc;

	@Autowired
	private RequestUtil reqUtil;

    /*재고이동 화면 */
    @MenuAnnotation("stockmov 리스트 조회")
    @GetMapping("/stockmov.htm")
    public String stockmov(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));
        return "admin/stock/stockMovList";
    }
}
