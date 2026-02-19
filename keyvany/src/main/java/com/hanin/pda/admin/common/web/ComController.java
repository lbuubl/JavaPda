package com.hanin.pda.admin.common.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hanin.pda.admin.common.service.ComService;
import com.hanin.pda.admin.main.service.AdminMainService;
import com.hanin.pda.common.domain.User;
import com.hanin.pda.common.util.MenuAnnotation;
import com.hanin.pda.common.util.Message;
import com.hanin.pda.common.util.RestResponse;
import com.hanin.pda.common.util.SessionUtils;

@RestController
@RequestMapping("/pda/common")
public class ComController {

  @Autowired
  private ComService service;

  @Autowired
  private AdminMainService mainSvc;


  RestResponse<Object> restResponse = new RestResponse<>();


  /*공지사항 리스트 조회*/
  @MenuAnnotation("로그인 조회")
  @PostMapping("/usp_zt_00_login_pda")
  public ResponseEntity<RestResponse> usp_zt_00_login_pda(HttpServletRequest request, User user
      , @RequestBody HashMap<String, Object> param) {
    List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
    try {
      retList = service.usp_zt_00_login_pda(param);
      restResponse = RestResponse.builder()
          .code(HttpStatus.OK.value())
          .httpStatus(HttpStatus.OK)
          .message(Message.READ_STUDENTS.label())
          .data(retList)
          .build();

    } catch (Exception e) {
      // TODO Auto-generated catch block

      // NOT FOUND 응답을 restResponse에 저장한다.
      restResponse = RestResponse.builder()
          .code(HttpStatus.NOT_FOUND.value())
          .httpStatus(HttpStatus.NOT_FOUND)
          .message(e.getMessage())
          .build();
    } //공지사항 리스트 조회

    // 응답 결과로 restResponse를 전달한다.
    return new ResponseEntity<>(restResponse, restResponse.getHttpStatus());
  }


  /*공지사항 리스트 조회*/
  @MenuAnnotation("창고조회")
  @PostMapping("/getwhinfo")
  public ResponseEntity<RestResponse> getWhInfo(HttpServletRequest request, User user
      , @RequestBody HashMap<String, Object> param) {
    List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
    try {
      retList = service.getWhInfo(param);
      restResponse = RestResponse.builder()
          .code(HttpStatus.OK.value())
          .httpStatus(HttpStatus.OK)
          .message(Message.READ_STUDENTS.label())
          .data(retList)
          .build();

    } catch (Exception e) {
      // TODO Auto-generated catch block

      // NOT FOUND 응답을 restResponse에 저장한다.
      restResponse = RestResponse.builder()
          .code(HttpStatus.NOT_FOUND.value())
          .httpStatus(HttpStatus.NOT_FOUND)
          .message(e.getMessage())
          .build();
    } //공지사항 리스트 조회

    // 응답 결과로 restResponse를 전달한다.
    return new ResponseEntity<>(restResponse, restResponse.getHttpStatus());
  }


  /*(공통) 거래처 리스트 조회*/
  @MenuAnnotation("거래처조회")
  @PostMapping("/getSelectCusInfo")
  public ResponseEntity<RestResponse> getSelectCusInfo(HttpServletRequest request, User user
      , @RequestBody HashMap<String, Object> param) {
    List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
    try {
      retList = service.getSelectCusInfo(param);
      restResponse = RestResponse.builder()
          .code(HttpStatus.OK.value())
          .httpStatus(HttpStatus.OK)
          .message(Message.READ_STUDENTS.label())
          .data(retList)
          .build();

    } catch (Exception e) {
      // TODO Auto-generated catch block

      // NOT FOUND 응답을 restResponse에 저장한다.
      restResponse = RestResponse.builder()
          .code(HttpStatus.NOT_FOUND.value())
          .httpStatus(HttpStatus.NOT_FOUND)
          .message(e.getMessage())
          .build();
    } //공지사항 리스트 조회

    // 응답 결과로 restResponse를 전달한다.
    return new ResponseEntity<>(restResponse, restResponse.getHttpStatus());
  }


  /*(공통) 공장 리스트 조회*/
  @MenuAnnotation("공장조회")
  @PostMapping("/getFacInfo")
  public ResponseEntity<RestResponse> getFacInfo(HttpServletRequest request, User user
      , @RequestBody HashMap<String, Object> param) {
    List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
    try {
      retList = service.getFacInfo(param);
      restResponse = RestResponse.builder()
          .code(HttpStatus.OK.value())
          .httpStatus(HttpStatus.OK)
          .message(Message.READ_STUDENTS.label())
          .data(retList)
          .build();

    } catch (Exception e) {
      // TODO Auto-generated catch block

      // NOT FOUND 응답을 restResponse에 저장한다.
      restResponse = RestResponse.builder()
          .code(HttpStatus.NOT_FOUND.value())
          .httpStatus(HttpStatus.NOT_FOUND)
          .message(e.getMessage())
          .build();
    } //공지사항 리스트 조회

    // 응답 결과로 restResponse를 전달한다.
    return new ResponseEntity<>(restResponse, restResponse.getHttpStatus());
  }
}