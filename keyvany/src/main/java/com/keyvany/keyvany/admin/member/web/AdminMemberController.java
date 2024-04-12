package com.keyvany.keyvany.admin.member.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;

import com.keyvany.keyvany.admin.member.service.AdminMemberService;
import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.helper.helper;
import com.keyvany.keyvany.common.pagination.Pagination;
import com.keyvany.keyvany.common.util.AES256Cipher;
import com.keyvany.keyvany.common.util.SessionUtils;
import com.keyvany.keyvany.common.util.StringUtil;

@Controller
public class AdminMemberController {

    @Resource(name="adminMemberService")
    private AdminMemberService adminMemberService;

    @GetMapping("test")
    public String test() {

        return "login/login";
    }

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

    @PostMapping("/cms/logout")
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
        return "admin/login";
    }



    @GetMapping("/cms/main/index")
    public String adminMain(HttpServletRequest request,User user, Model model ,@RequestParam  HashMap<String, Object> param)  {
        String error = StringUtil.normalizeNull(request.getParameter("error"));
        model.addAttribute("error", error);
        model.addAttribute("params", param);
        return "admin/main/index";
    }


    @GetMapping("/cms/manage/member")
    public String adminManage(HttpServletRequest request,User user, Model model ,@RequestParam  HashMap<String, Object> param) throws Exception  {
        Map<String, Object> map = new HashMap<String, Object>();
        List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
        String searchType = ""; //검색조건
        String searchKeyword = ""; //검색키워드
        String url = "/cms/manage/member"; //페이지 번호 클릭 시 이 URL로 넘겨줌
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

        map.put("searchType", searchType);
        map.put("searchKeyword", searchKeyword);
        map.put("page", page);
        map.put("limit", limit);

        List<Map<String, Object>> memberInfo =adminMemberService.selectAdminMemberList(map);
        //리스트가 존재한다면
        if(memberInfo.size() > 0) {
            totalCnt = Integer.parseInt(memberInfo.get(0).get("total_cnt").toString());
        }
        //이메일 복호화
        AES256Cipher aes256  = new AES256Cipher();
        for(Map<String, Object> target : memberInfo){

            //복호화
            String decTarget  = StringUtil.normalizeNull(target.get("email"));
            if(!decTarget.equals("")) {

                try {
                    target.put("deCodeEmail", aes256.aesDecode(decTarget));
                } catch (Exception e) {
                    // TODO: handle exception
                    target.put("deCodeEmail", decTarget);
                }
            }
            retList.add(target);
        }

        Pagination pagination = new Pagination(limit, rangeSize, page, totalCnt); //페이징

        model.addAttribute("gnbMenu", "member");
        model.addAttribute("url", url);
        //model.addAttribute("memberInfo", memberInfo);
        model.addAttribute("memberInfo", retList);
        model.addAttribute("searchType", map.get("searchType"));
        model.addAttribute("pagination", pagination);
        model.addAttribute("searchKeyword",map.get("searchKeyword"));
        return "admin/member/index";
    }

    @GetMapping("/cms/manage/memberCreate")
    public String memberCreate(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        List<Map<String,Object>> empty = new ArrayList<>();
        model.addAttribute("gnbMenu", "member");
        model.addAttribute("memberInfo", empty);
        model.addAttribute("logInfO", empty);
        model.addAttribute("codeInfo", adminMemberService.selectCmmCodeList());
        return "admin/member/create";
    }
    @GetMapping("/cms/manage/memberCreate/{unique_id}")
    public String memberUpdate(@PathVariable(required = false) String unique_id,HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();

        String url = "/cms/manage/memberCreate/"+unique_id; //페이지 번호 클릭 시 이 URL로 넘겨줌
        int page = 1; //페이지 번호
        int limit = 10; //리스트에 보여줄 개수
        int rangeSize = 10; //페이지 번호 블럭
        int totalCnt = 0; //리스트 전체 개수

        if(request.getParameter("page") != null) {
            page = Integer.parseInt(request.getParameter("page").toString());
        }
        map.put("page", page);
        map.put("limit", limit);
        map.put("unique_id",Integer.parseInt(unique_id));
        List<Map<String, Object>> logInfo = adminMemberService.selectMemberLog(map);

        if(logInfo.size() > 0) {
            totalCnt = Integer.parseInt(logInfo.get(0).get("total_cnt").toString());
        }

        Pagination pagination = new Pagination(limit, rangeSize, page, totalCnt); //페이징

        model.addAttribute("gnbMenu", "member");
        model.addAttribute("url", url);
        model.addAttribute("pagination", pagination);
        model.addAttribute("memberInfo", adminMemberService.selectMember(Integer.parseInt(unique_id)));
        model.addAttribute("logInfo", logInfo);
        model.addAttribute("codeInfo", adminMemberService.selectCmmCodeList());
        return "admin/member/create";
    }

    @PostMapping("/cms/manage/memberStore")
    public String saveVisual(@RequestParam Map<String,Object> map, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        String forward="";
        User user = SessionUtils.getSessionInfo(request);

        if(!helper.isEmpty((String) map.get("password"))){
            BCryptPasswordEncoder  encoder = new BCryptPasswordEncoder();
            String password = encoder.encode((String)map.get("password"));
            map.remove("password");
            map.put("password", password);
            System.out.println(map.get("password"));
        }
        map.put("crtr_id",user.getUserId());

        //이메일 암호화
        AES256Cipher aes256Cipher = new AES256Cipher();
        String email = aes256Cipher.aesEncode((String) map.get("email"));
        map.put("email",email);

        if(helper.isEmpty((String)map.get("unique_id"))){
            adminMemberService.insertAdminMember(map);
            forward = "redirect:/cms/manage/member";
        } else {
            adminMemberService.updateAdminMember(map);
            forward = "redirect:/cms/manage/memberCreate/"+map.get("unique_id");
        }
        return forward;
    }

    @PostMapping("/cms/manage/memberDelete")
    public String deleteMember(@RequestParam Map<String,Object> map, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        adminMemberService.deleteAdminMembmer(map);
        return "redirect:/cms/manage/member";
    }

    @PostMapping(path="/cms/manage/overlapCheck", consumes = "application/json", produces = "application/json")
    @ResponseBody
    public String overlapCheck(@RequestBody Map<String, Object> map, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        boolean flag = false;
        String msg ="";
        if(map.get("type").equals("email")){
            flag = ((int) adminMemberService.checkUsedEmail(map) == 1 ? false : true);
            msg = "이메일";
        } else{
            flag = ((int) adminMemberService.checkUsedMberId(map) == 1 ? false : true);
            msg = "아이디";
        }
        map.put("msg", msg);
        map.put("status",flag);
        return JSONObject.toJSONString(map);
    }



}
