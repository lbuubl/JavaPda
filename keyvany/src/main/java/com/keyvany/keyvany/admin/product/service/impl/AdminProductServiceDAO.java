package com.keyvany.keyvany.admin.product.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.keyvany.keyvany.common.dao.AbstractDAO;

@Repository
public class AdminProductServiceDAO extends AbstractDAO {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ProductDAO.selectWheelList", serachMap);
    }

    /*wheel 아이디에 해당하는 wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelListById(String ctlgId) throws Exception {
        return (List<Map<String,Object>>) selectList("ProductDAO.selectWheelListById", ctlgId);
    }
    

    /*wheel 등록*/
    public int insertWheel(Map<String, Object> saveMap) {
        return (Integer) insert("ProductDAO.insertWheel", saveMap);
    }

    /*wheel 수정*/
    public int updateWheel(Map<String, Object> saveMap) {
        return (Integer) update("ProductDAO.updateWheel", saveMap);
    }

    /*wheel 삭제*/
    public int updateWheelDel(Map<String, Object> saveMap) {
        return (Integer) update("ProductDAO.updateWheelDel", saveMap);
    }

    /*배기 리스트 조회*/
    public List<Map<String, Object>> selectExhstList(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ProductDAO.selectExhstList", serachMap);
    }

    /*배기 등록*/
    public int insertExhst(Map<String, Object> saveMap) {
        return (Integer) insert("ProductDAO.insertExhst", saveMap);
    }

    /*배기 우선순위 수정*/
    public int updateExhstDispPri(Map<String, Object> saveMap) {
        return (Integer) update("ProductDAO.updateExhstDispPri", saveMap);
    }

    /*배기 수정*/
    public int updateExhst(Map<String, Object> saveMap) {
        return (Integer) update("ProductDAO.updateExhst", saveMap);
    }

    /*배기 삭제*/
    public int updateExhstdel(Map<String, Object> saveMap) {
        return (Integer) update("ProductDAO.updateExhstdel", saveMap);
    }

    /*배기 우선순위 하나씩  업데이트*/
    public int updateExhstDispPriAll() {
        return (Integer) update("ProductDAO.updateExhstDispPriAll", null);
    }

    /*카본파이버 리스트 조회*/
    public List<Map<String, Object>> selectCrbnList(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ProductDAO.selectCrbnList", serachMap);
    }

    /*카본파이버 등록*/
    public int insertCrbn(Map<String, Object> saveMap) {
        return (Integer) insert("ProductDAO.insertCrbn", saveMap);
    }

    /*카본파이버 우선순위 수정*/
    public int updateCrbnDispPri(Map<String, Object> saveMap) {
        return (Integer) update("ProductDAO.updateCrbnDispPri", saveMap);
    }

    /*카본파이버 수정*/
    public int updateCrbn(Map<String, Object> saveMap) {
        return (Integer) update("ProductDAO.updateCrbn", saveMap);
    }

    /*카본파이버 삭제*/
    public int updateCrbndel(Map<String, Object> saveMap) {
        return (Integer) update("ProductDAO.updateCrbndel", saveMap);
    }

    /*카본파이버 우선순위 하나씩  업데이트*/
    public int updateCrbnDispPriAll() {
        return (Integer) update("ProductDAO.updateCrbnDispPriAll", null);
    }
}
