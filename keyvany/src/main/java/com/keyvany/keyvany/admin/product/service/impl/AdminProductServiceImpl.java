package com.keyvany.keyvany.admin.product.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.keyvany.keyvany.admin.product.service.AdminProductService;
import com.keyvany.keyvany.common.dao.AdminFileServiceDAO;

@Service("adminProductService")
public class AdminProductServiceImpl implements AdminProductService {

    @Autowired
    AdminProductServiceDAO adminProductServiceDAO;

    @Autowired
    AdminFileServiceDAO adminFileServiceDAO;

    /*wheel 리스트 조회*/
    @Override
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception {
        return adminProductServiceDAO.selectWheelList(serachMap);
    }

    /*wheel 아이디에 해당하는 wheel 리스트 조회*/
    @Override
    public List<Map<String, Object>> selectWheelListById(String ctlgId) throws Exception {
        return adminProductServiceDAO.selectWheelListById(ctlgId);
    }

    /*wheel 리스트 저장*/
    @Override
    public void saveWheelList(Map<String, Object> saveMap, List<Map<String, Object>> wheelImgInfo) throws Exception {
        String gb = (String) saveMap.get("gb");  //등록, 수정 구분
        int wheelImgId = 0; //제품이미지 아이디
        int fileId = 0;

        //등록이라면
        if("I".equals(gb)) {
            //제품 업로드 저장
            if(wheelImgInfo.size() > 0) {
                for(int i=0; i<wheelImgInfo.size(); i++) {
                    saveMap.put("orgFileNm", wheelImgInfo.get(i).get("orgFileNm").toString());
                    saveMap.put("reFileNm", wheelImgInfo.get(i).get("reFileNm").toString());
                    saveMap.put("filePath", wheelImgInfo.get(i).get("filePath").toString());
                    saveMap.put("fileType", wheelImgInfo.get(i).get("fileType").toString());
                    saveMap.put("fileSize", wheelImgInfo.get(i).get("fileSize").toString());

                    //파일테이블에 저장
                    adminFileServiceDAO.insertFile(saveMap);
                    wheelImgId = (int) saveMap.get("fileId");
                    saveMap.put("wheelImgId", wheelImgId);
                }
            }

            //wheel 상세정보 저장
            adminProductServiceDAO.insertWheel(saveMap);
        }
        //수정이라면
        else if("U".equals(gb)) {
            //제품 업로드 저장
            if(wheelImgInfo.size() > 0) {
                //등록되어있는 제품이미지 삭제
                if(! "".equals(saveMap.get("wheelImgId"))) {
                    fileId = Integer.parseInt(saveMap.get("wheelImgId").toString());
                    adminFileServiceDAO.deleteFile(fileId);
                }

                for(int i=0; i<wheelImgInfo.size(); i++) {
                    saveMap.put("orgFileNm", wheelImgInfo.get(i).get("orgFileNm").toString());
                    saveMap.put("reFileNm", wheelImgInfo.get(i).get("reFileNm").toString());
                    saveMap.put("filePath", wheelImgInfo.get(i).get("filePath").toString());
                    saveMap.put("fileType", wheelImgInfo.get(i).get("fileType").toString());
                    saveMap.put("fileSize", wheelImgInfo.get(i).get("fileSize").toString());

                    //파일테이블에 저장
                    adminFileServiceDAO.insertFile(saveMap);
                    wheelImgId = (int) saveMap.get("fileId");
                    saveMap.put("wheelImgId", wheelImgId);
                }
            }

            //wheel 상세정보 수정
            adminProductServiceDAO.updateWheel(saveMap);
        }
        //삭제
        else if("D".equals(gb)) {
            adminProductServiceDAO.updateWheelDel(saveMap);
        }
    }

    /*배기 리스트 조회*/
    @Override
    public List<Map<String, Object>> selectExhstList(Map<String, Object> serachMap) throws Exception {
        return adminProductServiceDAO.selectExhstList(serachMap);
    }

    /*배기 리스트 저장*/
    @Override
    public void saveExhstList(Map<String, Object> saveMap, List<Map<String, Object>> exhstImgInfo) throws Exception {
        String gb = (String) saveMap.get("gb"); //등록, 수정 구분
        int exhstImgId = 0; //배기이미지 아이디
        int fileId = 0;

        //등록이라면
        if("I".equals(gb)) {
            //배기이미지 저장
            if(exhstImgInfo.size() > 0) {
                for(int i=0; i<exhstImgInfo.size(); i++) {
                    saveMap.put("orgFileNm", exhstImgInfo.get(i).get("orgFileNm").toString());
                    saveMap.put("reFileNm", exhstImgInfo.get(i).get("reFileNm").toString());
                    saveMap.put("filePath", exhstImgInfo.get(i).get("filePath").toString());
                    saveMap.put("fileType", exhstImgInfo.get(i).get("fileType").toString());
                    saveMap.put("fileSize", exhstImgInfo.get(i).get("fileSize").toString());

                    //파일테이블에 저장
                    adminFileServiceDAO.insertFile(saveMap);
                    exhstImgId = (int) saveMap.get("fileId");
                    saveMap.put("exhstImgId", exhstImgId);
                }
            }

            //우선순위 하나씩 업데이트
            adminProductServiceDAO.updateExhstDispPriAll();

            //배기 상세정보 저장
            adminProductServiceDAO.insertExhst(saveMap);

        }
        //순서 수정이라면
        else if("OU".equals(gb)) {
            String[] exhstIdArrayList = (String[]) saveMap.get("exhstIdArrayList");
            String[] dispPriArrayList = (String[]) saveMap.get("dispPriArrayList");

            for (int i = 0; i < exhstIdArrayList.length; i++) {
                saveMap.put("dispPri", dispPriArrayList[i]);
                saveMap.put("exhstId", exhstIdArrayList[i]);
                adminProductServiceDAO.updateExhstDispPri(saveMap);
            }
        }
        //이미지 수정이라면
        else if("U".equals(gb)) {
            //배기이미지 저장
            if(exhstImgInfo.size() > 0) {
                //등록되어있는 배기이미지 삭제
                if(! "".equals(saveMap.get("exhstImgId"))) {
                    fileId = Integer.parseInt(saveMap.get("exhstImgId").toString());
                    adminFileServiceDAO.deleteFile(fileId);
                }

                for(int i=0; i<exhstImgInfo.size(); i++) {
                    saveMap.put("orgFileNm", exhstImgInfo.get(i).get("orgFileNm").toString());
                    saveMap.put("reFileNm", exhstImgInfo.get(i).get("reFileNm").toString());
                    saveMap.put("filePath", exhstImgInfo.get(i).get("filePath").toString());
                    saveMap.put("fileType", exhstImgInfo.get(i).get("fileType").toString());
                    saveMap.put("fileSize", exhstImgInfo.get(i).get("fileSize").toString());

                    //파일테이블에 저장
                    adminFileServiceDAO.insertFile(saveMap);
                    exhstImgId = (int) saveMap.get("fileId");
                    saveMap.put("exhstImgId", exhstImgId);
                }
            }

            saveMap.put("exhstId", saveMap.get("updateExhstId")); //수정할 아이디로 다시 넣어주기
            //배기 상세정보 수정
            adminProductServiceDAO.updateExhst(saveMap);
        }
        //삭제
        else if("D".equals(gb)) {
            saveMap.put("exhstId", saveMap.get("updateExhstId")); //삭제할 아이디로 다시 넣어주기
            adminProductServiceDAO.updateExhstdel(saveMap);
        }
    }

    /*카본파이버 리스트 조회*/
    @Override
    public List<Map<String, Object>> selectCrbnList(Map<String, Object> serachMap) throws Exception {
        return adminProductServiceDAO.selectCrbnList(serachMap);
    }

    /*카본파이버 리스트 저장*/
    @Override
    public void saveCrbnList(Map<String, Object> saveMap, List<Map<String, Object>> crbnImgInfo) throws Exception {
        String gb = (String) saveMap.get("gb"); //등록, 수정 구분
        int crbnImgId = 0; //카본파이버이미지 아이디
        int fileId = 0;

        //등록이라면
        if("I".equals(gb)) {
            //카본파이버이미지 저장
            if(crbnImgInfo.size() > 0) {
                for(int i=0; i<crbnImgInfo.size(); i++) {
                    saveMap.put("orgFileNm", crbnImgInfo.get(i).get("orgFileNm").toString());
                    saveMap.put("reFileNm", crbnImgInfo.get(i).get("reFileNm").toString());
                    saveMap.put("filePath", crbnImgInfo.get(i).get("filePath").toString());
                    saveMap.put("fileType", crbnImgInfo.get(i).get("fileType").toString());
                    saveMap.put("fileSize", crbnImgInfo.get(i).get("fileSize").toString());

                    //파일테이블에 저장
                    adminFileServiceDAO.insertFile(saveMap);
                    crbnImgId = (int) saveMap.get("fileId");
                    saveMap.put("crbnImgId", crbnImgId);
                }
            }

            //우선순위 하나씩 업데이트
            adminProductServiceDAO.updateCrbnDispPriAll();

            //카본파이버 상세정보 저장
            adminProductServiceDAO.insertCrbn(saveMap);
        }
        //순서 수정이라면
        else if("OU".equals(gb)) {
            String[] crbnIdArrayList = (String[]) saveMap.get("crbnIdArrayList");
            String[] dispPriArrayList = (String[]) saveMap.get("dispPriArrayList");

            for (int i = 0; i < crbnIdArrayList.length; i++) {
                saveMap.put("dispPri", dispPriArrayList[i]);
                saveMap.put("crbnId", crbnIdArrayList[i]);
                adminProductServiceDAO.updateCrbnDispPri(saveMap);
            }
        }
        //이미지 수정이라면
        else if("U".equals(gb)) {
            //카본파이버이미지 저장
            if(crbnImgInfo.size() > 0) {
                //등록되어있는 카본파이버이미지 삭제
                if(! "".equals(saveMap.get("crbnImgId"))) {
                    fileId = Integer.parseInt(saveMap.get("crbnImgId").toString());
                    adminFileServiceDAO.deleteFile(fileId);
                }

                for(int i=0; i<crbnImgInfo.size(); i++) {
                    saveMap.put("orgFileNm", crbnImgInfo.get(i).get("orgFileNm").toString());
                    saveMap.put("reFileNm", crbnImgInfo.get(i).get("reFileNm").toString());
                    saveMap.put("filePath", crbnImgInfo.get(i).get("filePath").toString());
                    saveMap.put("fileType", crbnImgInfo.get(i).get("fileType").toString());
                    saveMap.put("fileSize", crbnImgInfo.get(i).get("fileSize").toString());

                    //파일테이블에 저장
                    adminFileServiceDAO.insertFile(saveMap);
                    crbnImgId = (int) saveMap.get("fileId");
                    saveMap.put("crbnImgId", crbnImgId);
                }
            }

            saveMap.put("crbnId", saveMap.get("updateCrbnId")); //수정할 아이디로 다시 넣어주기
            //카폰파이버 상세정보 수정
            adminProductServiceDAO.updateCrbn(saveMap);
        }
        //삭제
        else if("D".equals(gb)) {
            saveMap.put("crbnId", saveMap.get("updateCrbnId")); //삭제할 아이디로 다시 넣어주기
            adminProductServiceDAO.updateCrbndel(saveMap);
        }
    }
}
