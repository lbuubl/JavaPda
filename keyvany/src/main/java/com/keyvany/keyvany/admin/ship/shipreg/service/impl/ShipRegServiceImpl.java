package com.keyvany.keyvany.admin.ship.shipreg.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keyvany.keyvany.admin.ship.shipreg.service.ShipRegService;
import com.keyvany.keyvany.common.domain.User;
import com.keyvany.keyvany.common.helper.helper;
import com.keyvany.keyvany.common.util.SessionUtils;

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
    	User user = (User) saveMap.get("user");

    	try {
        	List<Map<String, Object>>saveList =  (List<Map<String, Object>>) saveMap.get("data");
        	for (Map<String, Object> hashMap : saveList) {
        		//등록한 사원 순번설정
        		hashMap.put("uniqueId", user.getUniqueId());
        		int iint = dao.setShipSaveMoveNo(hashMap);
        		System.out.println("======"+iint);
    		}

        	Map<String, Object> resultMap =new HashMap<String, Object>();

    		//출고 등록한 사원 순번설정

        	String paramWhCd = helper.nullConvert(saveMap.get("whCd"));
        	String paramDtp = helper.nullConvert(saveMap.get("dtp"));

        	if(paramWhCd.equals("")) {
        		throw new Exception("창고를 입력해주세요");
        	}

        	resultMap.put("dtp", paramDtp );
        	resultMap.put("whCd", paramWhCd );
        	resultMap.put("uniqueId", user.getUniqueId());
    		dao.setShipSaveMoveNoConfim(resultMap);
		} catch (Exception e) {
			// TODO: handle exception
			e.getStackTrace();
		}

    }
    /*출하관리 거래처  바코드 조회*/
    @Override
    public List<Map<String, Object>> getWhCust(Map<String, Object> serachMap) throws Exception {
        return dao.getWhCust(serachMap);
    }
}
