package com.hanin.pda.admin.os.osmgmt.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.hanin.pda.common.dao.AbstractDAO;

@Repository
public class OsMgmtDAO extends AbstractDAO {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("OsMgmtDAO.selectWheelList", serachMap);
    }
}
