package com.keyvany.keyvany.admin.main.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.keyvany.keyvany.common.util.MenuAnnotation;


@Controller
public class AdminMainController {

	@GetMapping({"/cms"})
    public String index(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "admin/index";
    }

    /*메인관리 조회*/
    @MenuAnnotation("메인관리 조회")
    @GetMapping("/cms/manage/main")
    public String manage1(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "admin/main/index";
    }
}
