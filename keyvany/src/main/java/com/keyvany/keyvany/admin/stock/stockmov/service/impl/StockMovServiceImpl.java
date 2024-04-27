package com.keyvany.keyvany.admin.stock.stockmov.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keyvany.keyvany.admin.stock.stockmov.service.StockMovService;


@Service
@Transactional
public class StockMovServiceImpl implements StockMovService {

    @Autowired
    StockMovDAO dao;
}
