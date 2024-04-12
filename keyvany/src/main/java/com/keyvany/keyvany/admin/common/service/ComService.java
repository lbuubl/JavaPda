package com.keyvany.keyvany.admin.common.service;

import java.util.List;
import java.util.Map;

public interface ComService {

    /*공지사항 리스트 조회*/
    public List<Map<String, Object>> usp_zt_00_login_pda(Map<String, Object> serachMap) throws Exception;
}
