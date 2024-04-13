package com.keyvany.keyvany.admin.ship.shipreg.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.keyvany.keyvany.common.dao.AbstractDAO;

@Repository
public class ShipRegDAO extends AbstractDAO {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ShipRegDAO.selectWheelList", serachMap);
    }

    public List<Map<String, Object>> usp_zt_40_out_itm_sch_re1(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ShipRegDAO.usp_zt_40_out_itm_sch_re1", serachMap);
    }
}
