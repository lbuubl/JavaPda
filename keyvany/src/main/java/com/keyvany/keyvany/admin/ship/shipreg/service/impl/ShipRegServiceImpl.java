package com.keyvany.keyvany.admin.ship.shipreg.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keyvany.keyvany.admin.ship.shipreg.service.ShipRegService;

@Service
@Transactional
public class ShipRegServiceImpl implements ShipRegService {

    @Autowired
    ShipRegDAO dao;

    /*출하관리 바코드 조회*/
    @Override
    public List<Map<String, Object>> getLotMasterInfoCheck(Map<String, Object> serachMap) throws Exception {
        return dao.getLotMasterInfoCheck(serachMap);
    }


    /*출하관리 저장*/
    @Override
    public void setShipSaveMoveNo( HashMap<String, Object>  saveMap) throws Exception {
    	List<Map<String, Object>>saveList =  (List<Map<String, Object>>) saveMap.get("data");
    	for (Map<String, Object> hashMap : saveList) {
    		int it  = dao.setShipSaveMoveNo(hashMap);
        	System.out.println("===================="+it);
		}
    }
    /*출하관리 거래처  바코드 조회*/
    @Override
    public List<Map<String, Object>> getWhCust(Map<String, Object> serachMap) throws Exception {
        return dao.getWhCust(serachMap);
    }
}
