package com.keyvany.keyvany.admin.main.service;

import java.util.List;
import java.util.Map;

public interface AdminMainService {

    /*메인 리스트 조회*/
    public List<Map<String,Object>> selectMainList() throws Exception;

    /*메인 동영상 조회*/
    public List<Map<String,Object>> selectVideoList() throws Exception;

    /*메인 리스트 등록, 수정*/
    public void saveMainList(Map<String, Object> saveMap, List<Map<String, Object>> mainImgInfo) throws Exception;

    /*메인 동영상 등록, 수정*/
    public int saveVideoSrc(Map<String, Object> saveMap) throws Exception;

    /*해당하는 이미지 삭제*/
    public int updateMainDel(Map<String, Object> saveMap) throws Exception;
}
