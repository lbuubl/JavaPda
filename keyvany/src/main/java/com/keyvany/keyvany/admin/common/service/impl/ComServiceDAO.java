package com.keyvany.keyvany.admin.common.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.keyvany.keyvany.common.dao.AbstractDAO;

@Repository
public class ComServiceDAO extends AbstractDAO {

    /*공지사항 구분코드 조회*/
    public List<Map<String, Object>> usp_zt_00_login_pda(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ComDAO.usp_zt_00_login_pda", serachMap);
    }
    /*공지사항 구분코드 조회*/
    public List<Map<String, Object>> usp_zt_99_popup_wh_cd(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ComDAO.usp_zt_99_popup_wh_cd", serachMap);
    }
}
