package com.keyvany.keyvany.admin.os.osprocin.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keyvany.keyvany.admin.os.osprocin.service.OsProcInService;

@Service
@Transactional
public class OsProcInServiceImpl implements OsProcInService {

    @Autowired
    OsProcInDAO dao;
    /*외주가공입고 바코드 조회*/
    @Override
    public List<Map<String, Object>> getLotMasterInfoCheck(Map<String, Object> serachMap) throws Exception {
        return dao.getLotMasterInfoCheck(serachMap);
    }
}
