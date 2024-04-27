package com.keyvany.keyvany.admin.os.osprocship.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keyvany.keyvany.admin.os.osprocship.service.OsProcShipService;

@Service
@Transactional
public class OsProcShipServiceImpl implements OsProcShipService {

    @Autowired
    OsProcShipDAO dao;

}
