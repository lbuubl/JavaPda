package com.keyvany.keyvany.admin.stock.stockcheck.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.keyvany.keyvany.common.dao.AbstractDAO;

@Repository
public class StockCheckDAO extends AbstractDAO {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("StockCheckDAO.selectWheelList", serachMap);
    }

}
