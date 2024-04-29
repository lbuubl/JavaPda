package com.keyvany.keyvany.admin.stock.stockmov.service;

import java.util.List;
import java.util.Map;

public interface StockMovService {

    /*재고이동,재고확인  바코드 조회*/
    public List<Map<String, Object>> getLotMasterInfoStockInCheck(Map<String, Object> serachMap) throws Exception;
}
