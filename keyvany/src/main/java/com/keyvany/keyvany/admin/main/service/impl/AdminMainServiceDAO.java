package com.keyvany.keyvany.admin.main.service.impl;

import com.keyvany.keyvany.common.dao.AbstractDAO;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public class AdminMainServiceDAO extends AbstractDAO {

    /*메인 리스트 조회*/
    public List<Map<String, Object>> selectMainList() throws Exception {
        return (List<Map<String,Object>>) selectList("MainDAO.selectMainList", null);
    }
    /*메인 동영상 정보 조회*/
    public List<Map<String, Object>> selectVideoList() throws Exception {
        return (List<Map<String,Object>>) selectList("MainDAO.selectVideoList", null);
    }

    /*메인 리스트 등록*/
    public int insertMain(Map<String, Object> saveMap) {
        return (Integer) insert("MainDAO.insertMain", saveMap);
    }

    /*메인 리스트 수정*/
    public int updateMain(Map<String, Object> saveMap) {
        return (Integer) update("MainDAO.updateMain", saveMap);
    }

    /*메인 동영상 등록*/
    public int insertVideo(Map<String, Object> saveMap) {
        return (Integer) insert("MainDAO.insertVideo", saveMap);
    }

    /*메인 동영상 수정*/
    public int updateVideo(Map<String, Object> saveMap) {
        return (Integer) update("MainDAO.updateVideo", saveMap);
    }

    /*메인 정보 삭제*/
    public int updateMainDel(Map<String, Object> saveMap) {
        return (Integer) update("MainDAO.updateMainDel", saveMap);
    }
}
