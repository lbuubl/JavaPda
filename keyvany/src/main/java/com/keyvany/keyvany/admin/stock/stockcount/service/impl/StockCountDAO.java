package com.keyvany.keyvany.admin.stock.stockcount.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.keyvany.keyvany.common.dao.AbstractDAO;

@Repository
public class StockCountDAO extends AbstractDAO {

    /*재고실사 저장*/
    public int setSaveSilsaNo(Map<String, Object> serachMap) throws Exception {
        return (int) insert("StockCountDAO.setSaveSilsaNo", serachMap);
    }


}
