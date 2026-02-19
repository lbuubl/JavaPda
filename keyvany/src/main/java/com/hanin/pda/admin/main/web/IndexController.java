package com.hanin.pda.admin.main.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index() {
        // 루트 접속 시 다시 로그인 페이지로 이동하도록 설정
        return "redirect:/pda/login";
    }
}
