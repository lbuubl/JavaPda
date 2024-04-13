package com.keyvany.keyvany.admin.common.service;

import java.util.List;
import java.util.Map;

public interface ComService {

    /*로그인 조회*/
    public List<Map<String, Object>> usp_zt_00_login_pda(Map<String, Object> serachMap) throws Exception;
    /*창고 조회*/
    public List<Map<String, Object>> usp_zt_99_popup_wh_cd(Map<String, Object> serachMap) throws Exception;
}
