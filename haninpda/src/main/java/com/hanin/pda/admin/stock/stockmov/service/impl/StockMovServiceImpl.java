package com.hanin.pda.admin.stock.stockmov.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hanin.pda.admin.stock.stockmov.service.StockMovService;
import com.hanin.pda.common.domain.User;


@Service
@Transactional
public class StockMovServiceImpl implements StockMovService {

    @Autowired
    StockMovDAO dao;

    /*재고이동,재고확인  바코드 조회*/
    @Override
    public List<Map<String, Object>> getLotMasterInfoStockInCheck(Map<String, Object> serachMap) throws Exception {
        return dao.getLotMasterInfoStockInCheck(serachMap);
    }

    /*재고이동 저장*/
    @Override
    public void setSaveMoveNo( HashMap<String, Object>  saveMap) throws Exception {
    	try {
    		List<Map<String, Object>>saveList =  (List<Map<String, Object>>) saveMap.get("data");
        	User user = (User) saveMap.get("user");
        	for (Map<String, Object> hashMap : saveList) {
        		hashMap.put("uniqueId", user.getUniqueId());
        		int it  = dao.setSaveMoveNo(hashMap);
            	System.out.println("===================="+it);
    		}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("setSaveMoveNo======"+e.getMessage());
			e.getStackTrace();
		}

    }
}
