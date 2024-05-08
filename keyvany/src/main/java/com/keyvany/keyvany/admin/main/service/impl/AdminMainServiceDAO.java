package com.keyvany.keyvany.admin.main.service.impl;

import com.keyvany.keyvany.common.dao.AbstractDAO;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public class AdminMainServiceDAO extends AbstractDAO {

    /*메인 차트 조회*/
    public List<Map<String, Object>> getMainChart(Map<String, Object> params) throws Exception {
        return (List<Map<String,Object>>) selectList("MainDAO.getMainChart", params);
    }
}
