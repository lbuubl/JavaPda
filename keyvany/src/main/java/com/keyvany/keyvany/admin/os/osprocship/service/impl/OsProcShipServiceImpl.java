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

    /*wheel 리스트 조회*/
    @Override
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception {
        return dao.selectWheelList(serachMap);
    }
}
