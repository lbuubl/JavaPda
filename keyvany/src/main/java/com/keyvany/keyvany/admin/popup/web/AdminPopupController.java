package com.keyvany.keyvany.admin.popup.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.keyvany.keyvany.admin.popup.service.AdminPopupService;
import com.keyvany.keyvany.common.helper.helper;
import com.keyvany.keyvany.common.pagination.Pagination;
import com.keyvany.keyvany.common.util.FileUtil;
import com.keyvany.keyvany.common.util.StringUtil;

@Controller
public class AdminPopupController {

    @Autowired
    private FileUtil fileUtil;

    @Resource(name="adminPopupService")
    private AdminPopupService adminPopupService;

    @GetMapping("/cms/manage/popup")
    public String index(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        String searchType = ""; //검색조건
        String searchKeyword = ""; //검색키워드
        String url = "/cms/manage/popup"; //페이지 번호 클릭 시 이 URL로 넘겨줌
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

        List<Map<String, Object>> popInfo =adminPopupService.selectPopupList(map);
        //리스트가 존재한다면
        if(popInfo.size() > 0) {
            totalCnt = Integer.parseInt(popInfo.get(0).get("total_cnt").toString());
        }

        Pagination pagination = new Pagination(limit, rangeSize, page, totalCnt); //페이징

        model.addAttribute("gnbMenu", "popup");
        model.addAttribute("url", url);
        model.addAttribute("popInfo", popInfo);
        model.addAttribute("searchType", map.get("searchType"));
        model.addAttribute("pagination", pagination);
        model.addAttribute("searchKeyword",map.get("searchKeyword"));
        return "admin/popup/index";
    }

    @GetMapping("/cms/manage/popupCreate")
    public String popupCreate(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        ArrayList empty = new ArrayList<>();
        model.addAttribute("gnbMenu", "popup");
        model.addAttribute("popInfo", empty);
        return "admin/popup/create";
    }

    @GetMapping("/cms/manage/popupCreate/{pop_id}")
    public String popupShow(@PathVariable(required = false) int pop_id,HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        model.addAttribute("gnbMenu", "popup");
        model.addAttribute("popInfo", adminPopupService.selectPopup(pop_id));
        return "admin/popup/create";
    }

    @PostMapping("/cms/manage/popupStore")
    public String popupStore(@RequestParam Map<String, Object> map ,HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        String forward = "";
        map.put("crtr_id","admin");
        if(helper.isEmpty((String)map.get("pop_id"))){
            System.out.println("팦업자 등록");
                adminPopupService.insertPopup(map);
                forward = "redirect:/cms/manage/popup";
            } else {
            System.out.println("팝업 수정");
                adminPopupService.updatePopup(map);
                forward = "redirect:/cms/manage/popupCreate/"+(String) map.get("pop_id");
            }
        return forward;
    }

    @PostMapping("/cms/manage/popupDelete/{pop_id}")
    public String popupDelete(@PathVariable(required = false) int pop_id,HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        adminPopupService.deletePopup(pop_id);
        return "redirect:/cms/manage/popup";
    }

    @PostMapping("/cms/manage/popImageUpload")
    @ResponseBody
    public Map<String, Object> popImageUpload(@RequestParam("file") MultipartFile multipartFile , HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> retMap = new HashMap<String, Object>();

        List<Map<String, Object>> FileImge = fileUtil.insertFileEditorInfo(multipartFile); //제품이미지 정보 가져오기

        try {
            System.out.println(FileImge.get(0).get("filePath")+""+FileImge.get(0).get("reFileNm")+'.'+FileImge.get(0).get("fileType"));

            String reFileNm = StringUtil.normalizeNull( FileImge.get(0).get("reFileNm"));//+'.'+FileImge.get(0).get("fileType"));
            String fileType = StringUtil.normalizeNull(FileImge.get(0).get("fileType"));
            //retMap.put("url", reFileNm+"."+fileType);

            //retMap.put("url", "/summernoteImage/"+FileImge.get(0).get("filePath")+""+FileImge.get(0).get("reFileNm")+'.'+FileImge.get(0).get("fileType"));
            retMap.put("url", "/resources/static/upload/summernoteImage/"+reFileNm+'.'+fileType);


        } catch (Exception e) {
            //저장된 파일 삭제
            retMap.put("responseCode", "error");
            retMap.put("msg", e.getMessage());
            e.printStackTrace();

        }

        return retMap;
    }

}
