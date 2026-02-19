package com.hanin.pda.admin.member.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.hanin.pda.admin.member.service.AdminMemberService;

import org.springframework.stereotype.Service;

@Service("adminMemberService")
public class AdminMemberServiceImpl implements AdminMemberService {

    @Resource(name="adminMemberServiceDAO")
    private AdminMemberServiceDAO adminMemberServiceDAO;

    // 멤버 리스트
    @Override
    public List<Map<String,Object>> selectAdminMemberList(Map<String, Object> map) throws Exception {
        return adminMemberServiceDAO.selectMemberList(map);
    }

    @Override
    public List<Map<String,Object>> selectAdminMemberLog(Map<String, Object> map) throws Exception {
        // TODO Auto-generated method stub
        return null;
    }
    // 멤버 상세 내용
    @Override
    public List<Map<String,Object>> selectMember(int unique_id) throws Exception {
        return adminMemberServiceDAO.selectMember(unique_id);
    }
    // 멤머 사용 상세 로그
    @Override
    public List<Map<String,Object>> selectMemberLog(Map<String, Object> map) throws Exception {
        return adminMemberServiceDAO.selectMemberLog(map);
    }

    // 멤버가 소유한 공통코드
    @Override
    public List<Map<String,Object>> selectCmmCodeList() throws Exception {
        return adminMemberServiceDAO.selectCmmCodeList();
    }
    
    // 멤버 등록
    @Override
    public void insertAdminMember(Map<String, Object> map) throws Exception {
        adminMemberServiceDAO.insertAdminMember(map);
    }

    // 멤버 수정
    @Override
    public void updateAdminMember(Map<String, Object> map) throws Exception {
        adminMemberServiceDAO.updateAdminMember(map);
    }

    
    @Override
    public void deleteAdminMembmer(Map<String, Object> map) throws Exception {
        adminMemberServiceDAO.deleteAdminMembmer(map);
    }
    

     // 이메일 중복체크
     @Override
     public int checkUsedEmail(Map<String, Object> map) throws Exception {
         return adminMemberServiceDAO.checkUsedEmail(map);
     }
 
     @Override
     public int checkUsedMberId(Map<String, Object> map) throws Exception {
         return adminMemberServiceDAO.checkUsedMberId(map);
     }

}
