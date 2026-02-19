package com.hanin.pda.common.service;

import java.util.List;
import java.util.Map;

public interface CommonService {
    // 메뉴리스트 
    public List<Map<String, Object>> selectMenuList(Map<String,Object> serachMap) throws Exception;
    
    public boolean setEmailSend(String to, String subject , String content) throws Exception;
    
    //로그 저장 
    public int insertAdminlog(Map<String,Object> map) throws Exception;
}
