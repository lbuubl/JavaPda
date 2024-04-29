package com.keyvany.keyvany.admin.stock.stockmov.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keyvany.keyvany.admin.stock.stockmov.service.StockMovService;


@Service
@Transactional
public class StockMovServiceImpl implements StockMovService {

    @Autowired
    StockMovDAO dao;

    /*재고이동,재고확인  바코드 조회*/
    @Override
    public List<Map<String, Object>> getLotMasterInfoStockInCheck(Map<String, Object> serachMap) throws Exception {
        return dao.getLotMasterInfoStockInCheck(serachMap);
    }
}
