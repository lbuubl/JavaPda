package com.hanin.pda.common.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.hanin.pda.common.dao.AbstractDAO;

@Repository
public class CommonServiceDAO extends AbstractDAO{
    
    // 메뉴릿트
    public List<Map<String, Object>> selectMenuList(Map<String,Object> serachMap) throws Exception{
        return selectList("CommonDAO.selectMenuList",serachMap);
    };

    // 로그 저장
    public void insertAdminlog(Map<String,Object> map) throws Exception{
         insert("CommonDAO.insertAdminlog",map);
    };

}
