package com.hanin.pda.admin.stock.stockcount.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hanin.pda.admin.stock.stockcount.service.StockCountService;
import com.hanin.pda.common.domain.User;


@Service
@Transactional
public class StockCountServiceImpl implements StockCountService {

    @Autowired
    StockCountDAO dao;

    /*재고실사  바코드 조회*/
    @Override
    public List<Map<String, Object>> getCheck900Data(Map<String, Object> serachMap) throws Exception {
        return dao.getCheck900Data(serachMap);
    }
    @Override
    public void setSaveSilsaNo(Map<String, Object> saveMap) throws Exception {
    	try {
    		List<Map<String, Object>>saveList =  (List<Map<String, Object>>) saveMap.get("data");
        	User user = (User) saveMap.get("user");
        	for (Map<String, Object> hashMap : saveList) {
        		hashMap.put("uniqueId", user.getUniqueId());
        		int it  = dao.setSaveSilsaNo(hashMap);
    		}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("setSaveMoveNo======"+e.getMessage());
			e.getStackTrace();
		}

    }
}



