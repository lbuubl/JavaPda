package com.keyvany.keyvany.admin.os.osprocin.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.keyvany.keyvany.admin.os.osprocin.service.OsProcInService;
import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.RequestUtil;

@Controller
@RequestMapping("/cms/os")
public class OsProcInController {

	@Autowired
    private OsProcInService svc;

	@Autowired
	private RequestUtil reqUtil;

    /*wheel 리스트 조회*/
    @MenuAnnotation("~ 리스트 조회")
    @GetMapping("/osprocin.htm")
    public String osprocin(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));
        return "admin/os/osProcinList";
    }
}
