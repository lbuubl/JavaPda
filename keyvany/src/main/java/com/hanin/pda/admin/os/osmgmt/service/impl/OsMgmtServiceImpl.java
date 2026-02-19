package com.hanin.pda.admin.os.osmgmt.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hanin.pda.admin.os.osmgmt.service.OsMgmtService;

//@Service("osMgmtService")
@Service
@Transactional
public class OsMgmtServiceImpl implements OsMgmtService {

    @Autowired
    OsMgmtDAO dao;

    /*wheel 리스트 조회*/
    @Override
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception {
        return dao.selectWheelList(serachMap);
    }
}
