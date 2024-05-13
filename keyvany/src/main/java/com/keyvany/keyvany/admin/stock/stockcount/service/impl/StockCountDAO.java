package com.keyvany.keyvany.admin.stock.stockcount.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.keyvany.keyvany.common.dao.AbstractDAO;

@Repository
public class StockCountDAO extends AbstractDAO {

	/*재고실사 바코드 조회*/
    public List<Map<String, Object>> getCheck900Data(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("StockCountDAO.getCheck900Data", serachMap);
    }

    /*재고실사 저장*/
    public int setSaveSilsaNo(Map<String, Object> serachMap) throws Exception {
        return (int) insert("StockCountDAO.setSaveSilsaNo", serachMap);
    }


}
