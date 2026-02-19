package com.hanin.pda.admin.product.web;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hanin.pda.admin.product.service.AdminProductService;
import com.hanin.pda.common.domain.User;
import com.hanin.pda.common.helper.helper;
import com.hanin.pda.common.pagination.Pagination;
import com.hanin.pda.common.util.FileUtil;
import com.hanin.pda.common.util.MenuAnnotation;
import com.hanin.pda.common.util.RequestUtil;
import com.hanin.pda.common.util.SessionUtils;

@Controller
@RequestMapping("/pda/product")
public class AdminProductController {

    @Resource(name="adminProductService")
    private AdminProductService adminProductService;

	@Autowired
	private RequestUtil reqUtil;

    @Autowired
    private FileUtil fileUtil;

    /*wheel 리스트 조회*/
    @MenuAnnotation("wheel 리스트 조회")
    @GetMapping("/wheelList")
    public String wheelList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        Map<String, Object> serachMap = new HashMap<String, Object>();
		String userAgent = request.getHeader("User-Agent").toLowerCase();

        String searchType = ""; //검색조건
        String searchKeyword = ""; //검색키워드
        String url = "/pda/product/wheelList"; //페이지 번호 클릭 시 이 URL로 넘겨줌
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

        serachMap.put("searchType", searchType);
        serachMap.put("searchKeyword", searchKeyword);
        serachMap.put("page", page);
        serachMap.put("limit", limit);

        List<Map<String, Object>> wheelList = new ArrayList<Map<String,Object>>();

       // List<Map<String, Object>> wheelList = adminProductService.selectWheelList(serachMap); //wheel 리스트 조회

        //리스트가 존재한다면
       // if(wheelList.size() > 0) {
       //     totalCnt = Integer.parseInt(wheelList.get(0).get("totalCnt").toString());
      //  }

        Pagination pagination = new Pagination(limit, rangeSize, page, totalCnt); //페이징

        model.addAttribute("gnbMenu", "wheel");
        model.addAttribute("url", url);
        model.addAttribute("searchType", searchType);
        model.addAttribute("searchKeyword", searchKeyword);
        model.addAttribute("pagination", pagination);
        model.addAttribute("mobileYn", reqUtil.isMobile(userAgent));

        //model.addAttribute("wheelList", wheelList);

        return "admin/product/wheelList";
    }

    /*wheel 등록, 수정 페이지*/
    @MenuAnnotation("wheel 등록, 수정 페이지")
    @GetMapping("/wheelWrite")
    public String wheelWrite(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        String wheelId = request.getParameter("wheelId"); //파라미터로 넘어온 wheel 아이디

        List<Map<String, Object>> wheelList = adminProductService.selectWheelListById(wheelId); //수정 시 등록했던 정보 조회

        model.addAttribute("gnbMenu", "wheel");
        model.addAttribute("wheelId", wheelId);
        model.addAttribute("wheelList", wheelList);

        return "admin/product/wheelWrite";
    }

    /*wheel 등록 저장*/
    @ResponseBody
    @MenuAnnotation("wheel 등록 저장")
    @PostMapping("/wheelSave")
    public String wheelSave(HttpServletRequest request, @RequestParam("wheelImgFile") MultipartFile wheelImgFile) throws Exception {
        Map<String, Object> saveMap = new HashMap<String, Object>();
        String msg = "";

        User user = SessionUtils.getSessionInfo(request);
        String wheelId = request.getParameter("wheelId"); //wheel 아이디
        String wheelNm = request.getParameter("wheelNm"); //wheel 명
        String adtDsc = request.getParameter("adtDsc"); //부가설명
        String sizeCntn = request.getParameter("sizeCntn"); //wheel 사이즈 관련 내용
        String degnCntn = request.getParameter("degnCntn"); //wheel 디자인 관련 내용
        String expsYn = request.getParameter("expsYn"); //노출여부
        String gb = request.getParameter("gb"); //등록, 수정 구분
        String wheelImgId = request.getParameter("wheelImgId"); //수정할 제품이미지 아이디
        String crtrId = user.getUserId(); //(TODO : admin으로 변경)

        List<Map<String, Object>> wheelImgInfo = fileUtil.insertFileInfo(wheelImgFile); //제품이미지 정보 가져오기

        saveMap.put("wheelId", wheelId);
        saveMap.put("wheelNm", wheelNm);
        saveMap.put("adtDsc", adtDsc);
        saveMap.put("sizeCntn", sizeCntn);
        saveMap.put("degnCntn", degnCntn);
        saveMap.put("expsYn", expsYn);
        saveMap.put("gb", gb);
        saveMap.put("wheelImgId", wheelImgId);
        saveMap.put("crtrId", crtrId);

        try {
            adminProductService.saveWheelList(saveMap, wheelImgInfo);
            msg = "success"; //결과 메시지
        } catch (Exception e) {
            msg = "fail";
            Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
        }

        return msg;
    }

    /*배기 리스트 조회*/
    @MenuAnnotation("배기 리스트 조회")
    @GetMapping("/exhstList")
    public String exhstList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        Map<String, Object> serachMap = new HashMap<String, Object>();

        String url = "/pda/product/exhstList"; //페이지 번호 클릭 시 이 URL로 넘겨줌
        int page = 1; //페이지 번호
        int limit = 10; //리스트에 보여줄 개수
        int rangeSize = 10; //페이지 번호 블럭
        int totalCnt = 0; //리스트 전체 개수

        if(request.getParameter("page") != null) {
            page = Integer.parseInt(request.getParameter("page").toString());
        }

        serachMap.put("page", page);
        serachMap.put("limit", limit);

        List<Map<String, Object>> exhstList = adminProductService.selectExhstList(serachMap); //배기 리스트 조회

        //리스트가 존재한다면
        if(exhstList.size() > 0) {
            totalCnt = Integer.parseInt(exhstList.get(0).get("totalCnt").toString());
        }

        Pagination pagination = new Pagination(limit, rangeSize, page, totalCnt); //페이징

        model.addAttribute("gnbMenu", "exhst");
        model.addAttribute("url", url);
        model.addAttribute("pagination", pagination);
        model.addAttribute("exhstList", exhstList);
        model.addAttribute("totalCnt", exhstList.size());
        model.addAttribute("page", page);

        return "admin/product/exhstList";
    }

    /*배기 등록 저장*/
    @ResponseBody
    @MenuAnnotation("배기 등록 저장")
    @PostMapping("/exhstSave")
    public String exhstSave(HttpServletRequest request, @RequestParam("exhstImgFile") MultipartFile exhstImgFile) throws Exception {
        Map<String, Object> saveMap = new HashMap<String, Object>();
        String msg = "";

        User user = SessionUtils.getSessionInfo(request);
        String exhstId = request.getParameter("exhstId"); //배기 아이디
        String exhstIdArray = request.getParameter("exhstIdArray"); //우선순위변경 시 배기아이디 저장한 배열
        String dispPriArray = request.getParameter("dispPriArray"); //우선순위변경 시 전시순서 저장한 배열
        String[] exhstIdArrayList = exhstIdArray.split(",");
        String[] dispPriArrayList = dispPriArray.split(",");
        String gb = request.getParameter("gb"); //등록, 수정 구분
        String exhstImgId = request.getParameter("updateExhstImgId"); //수정할 배기이미지 아이디
        String updateExhstId = request.getParameter("updateExhstId"); //수정, 삭제할 배기이미지 아이디
        String crtrId = user.getUserId(); //(TODO : admin으로 변경)

        List<Map<String, Object>> exhstImgInfo = fileUtil.insertFileInfo(exhstImgFile); //배기이미지 정보 가져오기

        saveMap.put("exhstId", exhstId);
        saveMap.put("exhstIdArrayList", exhstIdArrayList);
        saveMap.put("dispPriArrayList", dispPriArrayList);
        saveMap.put("gb", gb);
        saveMap.put("exhstImgId", exhstImgId);
        saveMap.put("updateExhstId", updateExhstId);
        saveMap.put("crtrId", crtrId);

        try {
            adminProductService.saveExhstList(saveMap, exhstImgInfo);
            msg = "success"; //결과 메시지
        } catch (Exception e) {
            msg = "fail";
            Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
        }

        return msg;
    }

    /*카본파이버 리스트 조회*/
    @MenuAnnotation("카본파이버 리스트 조회")
    @GetMapping("/crbnList")
    public String crbnList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        Map<String, Object> serachMap = new HashMap<String, Object>();

        String url = "/pda/product/crbnList"; //페이지 번호 클릭 시 이 URL로 넘겨줌
        int page = 1; //페이지 번호
        int limit = 10; //리스트에 보여줄 개수
        int rangeSize = 10; //페이지 번호 블럭
        int totalCnt = 0; //리스트 전체 개수

        if(request.getParameter("page") != null) {
            page = Integer.parseInt(request.getParameter("page").toString());
        }

        serachMap.put("page", page);
        serachMap.put("limit", limit);

        List<Map<String, Object>> crbnList = adminProductService.selectCrbnList(serachMap); //카본파이버 리스트 조회

        //리스트가 존재한다면
        if(crbnList.size() > 0) {
            totalCnt = Integer.parseInt(crbnList.get(0).get("totalCnt").toString());
        }

        Pagination pagination = new Pagination(limit, rangeSize, page, totalCnt); //페이징

        model.addAttribute("gnbMenu", "crbn");
        model.addAttribute("url", url);
        model.addAttribute("pagination", pagination);
        model.addAttribute("crbnList", crbnList);
        model.addAttribute("totalCnt", crbnList.size());
        model.addAttribute("page", page);

        return "admin/product/crbnList";
    }

    /*카본파이버 등록 저장*/
    @ResponseBody
    @MenuAnnotation("카본파이버 등록 저장")
    @PostMapping("/crbnSave")
    public String crbnSave(HttpServletRequest request, @RequestParam("crbnImgFile") MultipartFile crbnImgFile) throws Exception {
        Map<String, Object> saveMap = new HashMap<String, Object>();
        String msg = "";

        User user = SessionUtils.getSessionInfo(request);

        String crbnId = request.getParameter("crbnId"); //카본파이버 아이디
        String crbnIdArray = request.getParameter("crbnIdArray"); //우선순위변경 시 카본파이버아이디 저장한 배열
        String dispPriArray = request.getParameter("dispPriArray"); //우선순위변경 시 전시순서 저장한 배열
        String[] crbnIdArrayList = crbnIdArray.split(",");
        String[] dispPriArrayList = dispPriArray.split(",");
        String gb = request.getParameter("gb"); //등록, 수정 구분
        String crbnImgId = request.getParameter("updateCrbnImgId"); //수정할 카본파이버이미지 아이디
        String updateCrbnId = request.getParameter("updateCrbnId"); //수정, 삭제할 카본파이버이미지 아이디
        String crtrId = user.getUserId(); //(TODO : admin으로 변경)

        List<Map<String, Object>> crbnImgInfo = fileUtil.insertFileInfo(crbnImgFile); //카본파이버이미지 정보 가져오기

        saveMap.put("crbnId", crbnId);
        saveMap.put("crbnIdArrayList", crbnIdArrayList);
        saveMap.put("dispPriArrayList", dispPriArrayList);
        saveMap.put("gb", gb);
        saveMap.put("crbnImgId", crbnImgId);
        saveMap.put("updateCrbnId", updateCrbnId);
        saveMap.put("crtrId", crtrId);

        try {
            adminProductService.saveCrbnList(saveMap, crbnImgInfo);
            msg = "success"; //결과 메시지
        } catch (Exception e) {
            msg = "fail";
            Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
        }

        return msg;
    }
}
