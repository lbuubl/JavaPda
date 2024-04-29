package com.keyvany.keyvany.admin.ship.shipreg.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface ShipRegService {

    /*출하관리 바코드 조회*/
    public List<Map<String, Object>> getLotMasterInfoCheck(Map<String, Object> serachMap) throws Exception;

    /*출하관리 바코드 등록*/
    public void setShipSaveMoveNo( HashMap<String, Object> saveList) throws Exception;

    /*출하관리 바코드 조회*/
    public List<Map<String, Object>> getWhCust(Map<String, Object> serachMap) throws Exception;
}
