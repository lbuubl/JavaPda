package com.keyvany.keyvany.admin.stock.stockcount.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keyvany.keyvany.admin.stock.stockcount.service.StockCountService;


@Service
@Transactional
public class StockCountServiceImpl implements StockCountService {

    @Autowired
    StockCountDAO dao;
    @Override
    public void setSaveSilsaNo(Map<String, Object> serachMap) throws Exception {
        int dsInt = dao.setSaveSilsaNo(serachMap);
    }
}



