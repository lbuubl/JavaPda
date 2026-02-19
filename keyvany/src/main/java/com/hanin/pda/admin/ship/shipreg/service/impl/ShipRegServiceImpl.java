package com.hanin.pda.admin.ship.shipreg.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hanin.pda.admin.ship.shipreg.service.ShipRegService;
import com.hanin.pda.common.domain.User;
import com.hanin.pda.common.helper.helper;
import com.hanin.pda.common.util.SessionUtils;

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

        	//바코드 로직체크
        	for (Map<String, Object> hashChkMap : saveList) {
        		List<Map<String, Object>> tempList = dao.getCheck005Inable(hashChkMap);
        		if(tempList.size() !=0) {
            		throw new Exception("이미 저장된 DATA입니다. 다시 확인해주세요");
        		}
        	}

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

    /*출하관리 이동 (중복체크)*/
    @Override
    public List<Map<String, Object>> getCheck005Inable(Map<String, Object> serachMap) throws Exception {
        return dao.getCheck005Inable(serachMap);
    }

    /*출하관리 거래처  바코드 조회*/
    @Override
    public List<Map<String, Object>> getWhCust(Map<String, Object> serachMap) throws Exception {
        return dao.getWhCust(serachMap);
    }
}
