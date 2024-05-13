package com.keyvany.keyvany.admin.stock.stockmov.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.keyvany.keyvany.common.dao.AbstractDAO;

@Repository
public class StockMovDAO extends AbstractDAO {
	/*재고이동,재고확인  바코드 조회*/
    public List<Map<String, Object>> getLotMasterInfoStockInCheck(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("StockMovDAO.getLotMasterInfoStockInCheck", serachMap);
    }

    /*재고이동 저장*/
    public int setSaveMoveNo(Map<String, Object> saveMap) {
        return (Integer) insert("StockMovDAO.setSaveMoveNo", saveMap);
    }
}
