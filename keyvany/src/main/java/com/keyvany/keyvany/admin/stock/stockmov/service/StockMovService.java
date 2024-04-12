package com.keyvany.keyvany.admin.stock.stockmov.service;

import java.util.List;
import java.util.Map;

public interface StockMovService {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception;
}
