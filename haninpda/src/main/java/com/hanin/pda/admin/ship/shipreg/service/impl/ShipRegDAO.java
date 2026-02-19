package com.hanin.pda.admin.ship.shipreg.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.hanin.pda.common.dao.AbstractDAO;

@Repository
public class ShipRegDAO extends AbstractDAO {

    /*출하관리 바코드 조회 */
    public List<Map<String, Object>> getLotMasterInfoCheck(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ShipRegDAO.getLotMasterInfoCheck", serachMap);
    }

    /*출하관리 등록*/
    public int setShipSaveMoveNo(Map<String, Object> saveMap) {
        return (Integer) insert("ShipRegDAO.setShipSaveMoveNo", saveMap);
    }

    /*출하관리 등록*/
    public int setShipSaveMoveNoConfim(Map<String, Object> saveMap) {
        return (Integer) insert("ShipRegDAO.setShipSaveMoveNoConfim", saveMap);
    }

    /*출하관리 이동 (중복체크) */
    public List<Map<String, Object>> getCheck005Inable(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ShipRegDAO.getCheck005Inable", serachMap);
    }

    /*출하관리 거래처 바코드 조회 */
    public List<Map<String, Object>> getWhCust(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("ShipRegDAO.getWhCust", serachMap);
    }


}
