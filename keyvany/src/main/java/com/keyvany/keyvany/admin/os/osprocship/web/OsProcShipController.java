package com.keyvany.keyvany.admin.os.osprocship.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.RequestUtil;

@Controller
@RequestMapping("/cms/os")
public class OsProcShipController {

	//@Autowired
    //private OsProcShipService svc;

	@Autowired
	private RequestUtil reqUtil;


    /*wheel 리스트 조회*/
    @MenuAnnotation("~ 리스트 조회")
    @GetMapping("/osprocship.htm")
    public String osprocshiposprocshiposprocship(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));
        return "admin/os/osProcshipList";
    }
}
