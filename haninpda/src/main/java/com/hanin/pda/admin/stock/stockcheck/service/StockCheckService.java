package com.hanin.pda.admin.stock.stockcheck.service;

import java.util.List;
import java.util.Map;

public interface StockCheckService {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception;
}
