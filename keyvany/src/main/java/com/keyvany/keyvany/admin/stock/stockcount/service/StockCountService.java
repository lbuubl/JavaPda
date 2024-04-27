package com.keyvany.keyvany.admin.stock.stockcount.service;

import java.util.Map;

public interface StockCountService {

    /*재고실사 저장*/
    public void setSaveSilsaNo(Map<String, Object> serachMap) throws Exception;
}
