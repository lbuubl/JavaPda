package com.hanin.pda.admin.stock.stockcount.service;

import java.util.List;
import java.util.Map;

public interface StockCountService {

    /*재고실사  바코드 조회*/
    public List<Map<String, Object>> getCheck900Data(Map<String, Object> serachMap) throws Exception;
    /*재고실사 저장*/
    public void setSaveSilsaNo(Map<String, Object> serachMap) throws Exception;

}
