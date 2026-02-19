package com.hanin.pda.admin.popup.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.hanin.pda.admin.popup.service.AdminPopupService;

import org.springframework.stereotype.Service;

@Service("adminPopupService")
public class AdminPopupServiceImpl implements AdminPopupService {

    @Resource(name = "adminPopupServiceDAO")
    private AdminPopupServiceDAO adminPopupServiceDAO;

    

    @Override
    public List<Map<String, Object>> selectPopupList(Map<String, Object> map) throws Exception {
        return adminPopupServiceDAO.selectPopupList(map);
    }

    @Override
    public List<Map<String, Object>> selectPopup(int pop_id) throws Exception {
        return adminPopupServiceDAO.selectPopup(pop_id);
    }

    @Override
    public void insertPopup(Map<String, Object> map) throws Exception {
        adminPopupServiceDAO.insertPopup(map);
    }

    @Override
    public void updatePopup(Map<String, Object> map) throws Exception {
        adminPopupServiceDAO.updatePopup(map);
    }
    
    @Override
    public void deletePopup(int pop_id) throws Exception{
        adminPopupServiceDAO.deletePopup(pop_id);
    }
}
