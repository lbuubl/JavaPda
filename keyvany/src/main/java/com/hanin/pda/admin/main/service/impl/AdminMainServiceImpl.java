package com.hanin.pda.admin.main.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hanin.pda.admin.main.service.AdminMainService;

@Service
@Transactional
public class AdminMainServiceImpl implements AdminMainService {

  @Autowired
  private AdminMainServiceDAO  dao;

  /*메인 리스트 조회*/
  @Override
  public List<Map<String,Object>> getMainChart(Map<String, Object> params) throws Exception {
    return dao.getMainChart(params);
  }

}
