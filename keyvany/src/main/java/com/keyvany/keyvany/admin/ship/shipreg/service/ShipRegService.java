package com.keyvany.keyvany.admin.ship.shipreg.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface ShipRegService {

    /*원소재 바코드 조회*/
    public List<Map<String, Object>> getLotMasterInfoInCheck(Map<String, Object> serachMap) throws Exception;

    /*원소재 바코드 등록*/
    public void setShipSaveMoveNo( HashMap<String, Object> saveList) throws Exception;

}
