package com.keyvany.keyvany.admin.main.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.keyvany.keyvany.admin.main.service.AdminMainService;
import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.helper.helper;
import com.keyvany.keyvany.common.util.FileUtil;
import com.keyvany.keyvany.common.util.MenuAnnotation;
import com.keyvany.keyvany.common.util.SessionUtils;


@Controller
public class AdminMainController {

    @Resource(name = "adminMainService")
    private AdminMainService adminMainService;

    @Autowired
    private FileUtil fileUtil;

    @GetMapping({"/cms"})
    public String index(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "admin/index";
    }

    /*메인관리 조회*/
    @MenuAnnotation("메인관리 조회")
    @GetMapping("/cms/common/select")
    public String manage(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        List<Map<String, Object>> mainList = adminMainService.selectMainList(); //메인 리스트 조회
        List<Map<String, Object>> videoList = adminMainService.selectVideoList(); //메인 동영상 조회

        model.addAttribute("gnbMenu", "main");
        model.addAttribute("mainList", mainList);
        model.addAttribute("mainImgCnt", mainList.size() + 1);
        model.addAttribute("videoList", videoList);

        return "admin/main/manage";
    }



    /*메인관리 조회*/
    @MenuAnnotation("메인관리 조회")
    @GetMapping("/cms/manage/main")
    public String manage1(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        List<Map<String, Object>> mainList = adminMainService.selectMainList(); //메인 리스트 조회
        List<Map<String, Object>> videoList = adminMainService.selectVideoList(); //메인 동영상 조회

        model.addAttribute("gnbMenu", "main");
        model.addAttribute("mainList", mainList);
        model.addAttribute("mainImgCnt", mainList.size() + 1);
        model.addAttribute("videoList", videoList);

        return "admin/main/manage";
    }

    /*메인 리스트 저장*/
    @ResponseBody
    @MenuAnnotation("메인 리스트 저장")
    @PostMapping("/cms/manage/saveMain")
    public String saveMain(MultipartHttpServletRequest request, @RequestParam("mainImgFile") MultipartFile[] mainImgFile) throws Exception {
        Map<String, Object> saveMap = new HashMap<String, Object>();
        String msg = "";

        User user = SessionUtils.getSessionInfo(request);
        String[] mainId = request.getParameterValues("mainId"); //메인 아이디
        String[] mainNm = request.getParameterValues("mainNm"); //메인 명
        String[] mainDsc = request.getParameterValues("mainDsc"); //메인설명
        String[] connUrl = request.getParameterValues("connUrl"); //연결 url
        String[] mainImgId = request.getParameterValues("mainImgId"); //수정할 메인 이미지아이디
        String[] mainImgGb = request.getParameterValues("mainImgGb"); //메인 이미지 등록, 수정 구분
        String gb = request.getParameter("gb"); //등록, 수정 구분
        String crtrId = user.getUserId(); //(TODO : admin으로 변경)

        List<Map<String, Object>> mainImgInfo = fileUtil.insertFilesInfo(mainImgFile); //메인 이미지 정보 가져오기

        saveMap.put("mainId", mainId);
        saveMap.put("mainNm", mainNm);
        saveMap.put("mainDsc", mainDsc);
        saveMap.put("connUrl", connUrl);
        saveMap.put("mainImgId", mainImgId);
        saveMap.put("mainImgGb", mainImgGb);
        saveMap.put("gb", gb);
        saveMap.put("crtrId", crtrId);

        try {
            adminMainService.saveMainList(saveMap, mainImgInfo);
            msg = "success"; //결과 메시지
        } catch (Exception e) {
            msg = "fail";
            Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
        }

        return msg;
    }

    /*메인 동영상 저장*/
    @ResponseBody
    @MenuAnnotation("메인 동영상 저장")
    @PostMapping("/cms/manage/saveVideoSrc")
    public String saveVideoSrc(HttpServletRequest request) throws Exception {
        Map<String, Object> saveMap = new HashMap<String, Object>();
        String msg ="";
        User user = SessionUtils.getSessionInfo(request);

        String videoMainId = request.getParameter("videoMainId"); //메인 아이디
        String videoSrc = request.getParameter("videoSrc"); //메인 동영상
        String crtrId = user.getUserId(); //(TODO : admin으로 변경)

        saveMap.put("mainId", videoMainId);
        saveMap.put("videoSrc", videoSrc);
        saveMap.put("crtrId", crtrId);

        try {
            int result = adminMainService.saveVideoSrc(saveMap);

            if(result > 0) {
                msg = "success"; //결과 메시지
            }
        } catch (Exception e) {
            msg = "fail";
            Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
        }

        return msg;
    }

    /*해당하는 이미지 삭제*/
    @ResponseBody
    @MenuAnnotation("해당하는 이미지 삭제")
    @PostMapping("/cms/manage/delImgFile")
    public String delImgFile(HttpServletRequest request) throws Exception {
        Map<String, Object> saveMap = new HashMap<String, Object>();
        String msg = "";
        User user = SessionUtils.getSessionInfo(request);

        String mainId = request.getParameter("deleteMainId"); //메인 아이디
        String crtrId = user.getUserId(); //(TODO : admin으로 변경)

        saveMap.put("mainId", mainId);
        saveMap.put("crtrId", crtrId);

        try {
            int result = adminMainService.updateMainDel(saveMap);

            if(result > 0) {
                msg = "success"; //결과 메시지
            }
        } catch (Exception e) {
            msg = "fail";
            Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
        }

        return msg;
    }
}
