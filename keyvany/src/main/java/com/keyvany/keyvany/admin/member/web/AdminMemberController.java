package com.keyvany.keyvany.admin.member.web;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.HtmlUtils;

import com.keyvany.keyvany.admin.member.service.AdminMemberService;
import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.util.SessionUtils;
import com.keyvany.keyvany.common.util.StringUtil;

@Controller
public class AdminMemberController {

    @Resource(name="adminMemberService")
    private AdminMemberService adminMemberService;

    @GetMapping("/cms/login")
    public String login(HttpServletRequest request,User user, Model model ,@RequestParam  HashMap<String, Object> param)  {
     // 세션을 가져온다. (가져올 세션이 없다면 생성한다.)
        HttpSession httpSession = request.getSession(true);

        //xss 방지 설정
        String error = HtmlUtils.htmlEscape( StringUtil.normalizeNull(request.getParameter("error")));
        if(error.equals("true")) {
            String  failMessage = StringUtil.normalizeNull(httpSession.getAttribute("failMessage"));
            model.addAttribute("failMessage", failMessage);
        }

        SessionUtils.removeSession(request);
        model.addAttribute("error", error);
        model.addAttribute("params", param);
        return "admin/login";
    }

    @GetMapping("/cms/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response, Model model )  {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        //==========================================================
        // Session Invalidate !!
        //==========================================================
        SessionUtils.removeSession(request);
        new SecurityContextLogoutHandler().logout(request, response, auth);
        //==========================================================
        // Logout 성공시 Redirect URL !!
        //==========================================================
        model.addAttribute("status", "logout");
        return "redirect:/cms/login";
    }



    @GetMapping("/cms/main/index")
    public String adminMain(HttpServletRequest request,User user, Model model ,@RequestParam  HashMap<String, Object> param)  {
        String error = StringUtil.normalizeNull(request.getParameter("error"));
        model.addAttribute("error", error);
        model.addAttribute("params", param);
        return "admin/main/index";
    }
}
