package com.keyvany.keyvany.admin.popup.service;

import java.util.List;
import java.util.Map;


public interface AdminPopupService {

    public List<Map<String,Object>> selectPopupList(Map<String, Object> map) throws Exception;

    public List<Map<String,Object>> selectPopup(int pop_id) throws Exception;
    
    public void insertPopup(Map<String, Object> map) throws Exception;

    public void updatePopup(Map<String, Object> map) throws Exception;

    public void deletePopup(int pop_id) throws Exception;
}
