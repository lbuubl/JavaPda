package com.hanin.pda.common.util;

/**
 * @Class Name : Message.java
 * @Description : 공통유틸리티성  기본유틸들 모음
 * @  수정일         수정자                   수정내용
 * @ -------    --------    ---------------------------
 * @author 공통서비스  이병운
 * @since 2018.06.08
 * @version 1.0
 * @see
 */
public enum Message {
	// 성공메세지
	STATUS_SUCESS("S"),
	// 성공 메세지
	STATUS_SUCESS_MESSAGE("정상 처리되었습니다."),
	// 오류메세지
	STATUS_ERROR("E"),
	// 기본 에러 상세 코드
	STATUS_ERROR_DEFAULT_DETAIL_CODE("E9999"),
	// 오류메세지
	STATUS_ERROR_MESSAGE("처리 도중 오류가 발생 되었습니다."),
	// 경고메세지
	STATUS_WARNING_MESSAGE("처리 도중 경고가 발생 되었습니다."),
    READ_STUDENTS("정상 적으로 조회가  처리되었습니다"),
    NOT_FOUND_STUDENTS("처리 도중 오류가 발생 되었습니다.");
    private final String label;

    Message(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}