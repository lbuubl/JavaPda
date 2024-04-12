package com.keyvany.keyvany.admin.main.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.keyvany.keyvany.admin.main.service.AdminMainService;
import com.keyvany.keyvany.common.dao.AdminFileServiceDAO;
import com.keyvany.keyvany.common.helper.helper;

@Service("adminMainService")
public class AdminMainServiceImpl implements AdminMainService {

    @Resource(name = "adminMainServiceDAO")
    private AdminMainServiceDAO adminMainServiceDAO;

    @Resource(name = "adminFileServiceDAO")
    private AdminFileServiceDAO adminFileServiceDAO;

    /*메인 리스트 조회*/
    @Override
    public List<Map<String,Object>> selectMainList() throws Exception {
        return adminMainServiceDAO.selectMainList();
    }


    /*메인 동영상 조회*/
    @Override
    public List<Map<String,Object>> selectVideoList() throws Exception {
        return adminMainServiceDAO.selectVideoList();
    }


    @Override
    public void saveMainList(Map<String, Object> saveMap, List<Map<String, Object>> mainImgInfo) throws Exception {
        int newMainImgId = 0;
        int fileId = 0;

        String gb = (String) saveMap.get("gb");
        String[] mainId = (String[]) saveMap.get("mainId");
        String[] mainNm = (String[]) saveMap.get("mainNm");
        String[] mainDsc = (String[]) saveMap.get("mainDsc");
        String[] connUrl = (String[]) saveMap.get("connUrl");
        String[] mainImgId = (String[]) saveMap.get("mainImgId");
        String[] mainImgGb = (String[]) saveMap.get("mainImgGb");

        //등록이라면
        if("I".equals(gb)) {
            for(int i=0; i<mainId.length; i++) {
                saveMap.put("mainId", mainId[i]);
                saveMap.put("mainNm", mainNm[i]);
                saveMap.put("connUrl", connUrl[i]);
                saveMap.put("mainDsc", mainDsc[i]);
                saveMap.put("mainImgId", mainImgId[i]);

                saveMap.put("orgFileNm", mainImgInfo.get(i).get("orgFileNm").toString());
                saveMap.put("reFileNm", mainImgInfo.get(i).get("reFileNm").toString());
                saveMap.put("filePath", mainImgInfo.get(i).get("filePath").toString());
                saveMap.put("fileType", mainImgInfo.get(i).get("fileType").toString());
                saveMap.put("fileSize", mainImgInfo.get(i).get("fileSize").toString());

                //파일테이블에 저장
                adminFileServiceDAO.insertFile(saveMap);
                newMainImgId = (int) saveMap.get("fileId");
                saveMap.put("mainImgId", newMainImgId);

                //메인테이블 저장
                adminMainServiceDAO.insertMain(saveMap);
            }
        }
        //수정이라면
        else if("U".equals(gb)) {
            List<String> mainIdList = new ArrayList<String>();
            List<String> mainNmList = new ArrayList<String>();
            List<String> mainDscList = new ArrayList<String>();
            List<String> connUrlList = new ArrayList<String>();
            List<String> mainImgIdList = new ArrayList<String>();
            List<String> mainImgGbList = new ArrayList<String>();

            List<String> mainIdList2 = new ArrayList<String>();
            List<String> mainNmList2 = new ArrayList<String>();
            List<String> mainDscList2 = new ArrayList<String>();
            List<String> connUrlList2 = new ArrayList<String>();
            List<String> mainImgIdList2 = new ArrayList<String>();

            for(int i=0; i<mainId.length; i++) {
                //내용과 비주얼 이미지까지 변경되었다면
                if(!"".equals(mainImgGb[i]) && mainImgGb[i] != null) {
                    mainIdList.add(mainId[i]);
                    mainNmList.add(mainNm[i]);
                    mainDscList.add(mainDsc[i]);
                    connUrlList.add(connUrl[i]);
                    mainImgIdList.add(mainImgId[i]);
                    mainImgGbList.add(mainImgGb[i]);
                }
                //비주얼 이미지는 변경되지 않고 내용만 변경되었다면
                else {
                    mainIdList2.add(mainId[i]);
                    mainNmList2.add(mainNm[i]);
                    mainDscList2.add(mainDsc[i]);
                    connUrlList2.add(connUrl[i]);
                    mainImgIdList2.add(mainImgId[i]);
                }
            }

            if(mainIdList != null) {
                for(int i=0; i<mainIdList.size(); i++) {
                    saveMap.put("mainId", mainIdList.get(i));
                    saveMap.put("mainNm", mainNmList.get(i));
                    saveMap.put("connUrl", connUrlList.get(i));
                    saveMap.put("mainDsc", mainDscList.get(i));
                    saveMap.put("mainImgId", mainImgIdList.get(i));

                    saveMap.put("orgFileNm", mainImgInfo.get(i).get("orgFileNm").toString());
                    saveMap.put("reFileNm", mainImgInfo.get(i).get("reFileNm").toString());
                    saveMap.put("filePath", mainImgInfo.get(i).get("filePath").toString());
                    saveMap.put("fileType", mainImgInfo.get(i).get("fileType").toString());
                    saveMap.put("fileSize", mainImgInfo.get(i).get("fileSize").toString());

                    if("I".equals(mainImgGbList.get(i))) {
                        //새로운 fileId 얻어오기
                        fileId = adminFileServiceDAO.selectNewFileId();
                        saveMap.put("mainImgId", fileId);

                        //파일테이블에 저장
                        adminFileServiceDAO.insertFile(saveMap);
                        newMainImgId = (int) saveMap.get("fileId");

                        //메인테이블 저장
                        adminMainServiceDAO.insertMain(saveMap);
                    }
                    else if("U".equals(mainImgGbList.get(i))) {
                        saveMap.put("fileId", mainImgIdList.get(i));
                        saveMap.put("fileSn", "1");

                        //파일테이블에 수정
                        adminFileServiceDAO.updateFile(saveMap);

                        //메인테이블에 수정
                        adminMainServiceDAO.updateMain(saveMap);
                    }
                }
            }

            if(mainIdList2 != null) {
                for(int i=0; i<mainIdList2.size(); i++) {
                    saveMap.put("mainId", mainIdList2.get(i));
                    saveMap.put("mainNm", mainNmList2.get(i));
                    saveMap.put("connUrl", connUrlList2.get(i));
                    saveMap.put("mainDsc", mainDscList2.get(i));
                    saveMap.put("mainImgId", mainImgIdList2.get(i));

                    //메인테이블 수정
                    adminMainServiceDAO.updateMain(saveMap);
                }
            }
        }
    }

    /*메인 동영상 등록, 수정*/
    @Override
    public int saveVideoSrc(Map<String, Object> saveMap) throws Exception {
        int result = 0;

        try {
            //신규로 저장되는 메인 동영상이라면
            if("".equals(saveMap.get("mainId").toString())) {
                result = adminMainServiceDAO.insertVideo(saveMap);
            }
            else {
                result = adminMainServiceDAO.updateVideo(saveMap);
            }

        } catch (Exception e) {
            Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
        }

        return result;
    }

    /*해당하는 이미지 삭제*/
    @Override
    public int updateMainDel(Map<String, Object> saveMap) throws Exception {
        int result = adminMainServiceDAO.updateMainDel(saveMap);

        return result;
    }
}
