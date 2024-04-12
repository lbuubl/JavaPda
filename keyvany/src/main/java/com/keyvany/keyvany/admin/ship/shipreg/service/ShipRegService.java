package com.keyvany.keyvany.admin.ship.shipreg.service;

import java.util.List;
import java.util.Map;

public interface ShipRegService {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception;
}
