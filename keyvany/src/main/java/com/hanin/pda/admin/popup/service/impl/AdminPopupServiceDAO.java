package com.hanin.pda.admin.popup.service.impl;

import java.util.List;
import java.util.Map;

import com.hanin.pda.common.dao.AbstractDAO;

import org.springframework.stereotype.Repository;


// PopupDAO
@Repository
public class AdminPopupServiceDAO extends AbstractDAO {
 
    public List<Map<String, Object>> selectPopupList(Map<String,Object> map) throws Exception{
        return (List<Map<String,Object>>) selectList("PopupDAO.selectPopupList",map);
    }

    public List<Map<String, Object>> selectPopup(int pop_id) throws Exception{
        return (List<Map<String,Object>>) selectList("PopupDAO.selectPopup",pop_id);
    }

    public void insertPopup(Map<String,Object> map) throws Exception{
        insert("PopupDAO.insertPopup",map);
    }

    public void updatePopup(Map<String,Object> map) throws Exception{
        update("PopupDAO.updatePopup",map);
    }

    public void deletePopup(int pop_id) throws Exception{
        update("PopupDAO.deletePopup",pop_id);
    }
}
