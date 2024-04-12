package com.keyvany.keyvany.admin.product.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface AdminProductService {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception;

    /*wheel 아이디에 해당하는 wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelListById(String ctlgId) throws Exception;

    /*wheel 리스트 저장*/
    public void saveWheelList(Map<String, Object> saveMap, List<Map<String, Object>> wheelImgInfo) throws Exception;

    /*배기 리스트 조회*/
    public List<Map<String, Object>> selectExhstList(Map<String, Object> serachMap) throws Exception;

    /*배기 리스트 저장*/
    public void saveExhstList(Map<String, Object> saveMap, List<Map<String, Object>> exhstImgInfo) throws Exception;

    /*카본파이버 리스트 조회*/
    public List<Map<String, Object>> selectCrbnList(Map<String, Object> serachMap) throws Exception;

    /*카본파이버 리스트 저장*/
    public void saveCrbnList(Map<String, Object> saveMap, List<Map<String, Object>> crbnImgInfo) throws Exception;
}
