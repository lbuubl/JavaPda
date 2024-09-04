package com.keyvany.keyvany.common.dao;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class AdminFileServiceDAO extends AbstractDAO {

    /*새로운 파일아이디 찾기*/
    public int selectNewFileId() {
        return (Integer) selectOne("FileDAO.selectNewFileId", null);
    }

    /*파일 등록*/
    public int insertFile(Map<String, Object> saveMap) {
        return (Integer) insert("FileDAO.insertFile", saveMap);
    }

    /*파일 등록(파라미터로 넘겨 받은 파일아이디가 있을경우)*/
    public int insertFileByParam(Map<String, Object> saveMap) {
        return (Integer) insert("FileDAO.insertFileByParam", saveMap);
    }

    /*파일 수정*/
    public int updateFile(Map<String, Object> saveMap) {
        return (Integer) update("FileDAO.updateFile", saveMap);
    }

    /*파일 삭제*/
    public int deleteFile(int fileId) {
        return (Integer) delete("FileDAO.deleteFile", fileId);
    }

    /*파일 삭제*/
    public int deleteFileParmMap(Map<String, Object> saveMap) {
        return (Integer) delete("FileDAO.deleteFileParmMap", saveMap);
    }
}
