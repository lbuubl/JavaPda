package com.keyvany.keyvany.common.domain;

import java.util.List;

import org.apache.ibatis.type.Alias;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.ToString;

@Component("user")
@Scope(value="session")
@SuppressWarnings("serial")
@ToString
@Data
@Alias("user")
public class User implements UserDetails {

    private static final long serialVersionUID = 1L;
    private String username;
    private String password;
    private String userId;
    private String uniqueId;

    private String empCusCd;
    private String coCd;
    private String empNo;
    private String pass;
    private String logSec;
    private String korNm;
    private String whCdOut;
    private String id;
    private String facCd;


    private List<Role> authorities;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    private boolean enabled = true;
}
