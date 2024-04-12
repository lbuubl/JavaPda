package com.keyvany.keyvany.common.domain;

import java.util.List;

import org.apache.ibatis.type.Alias;
import org.springframework.security.core.GrantedAuthority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@SuppressWarnings("serial")
@ToString
@Data
@Alias("privilege")
public class Role  implements GrantedAuthority  {
    private static final long serialVersionUID = 1L;
    private String name;
    private List<Privilege> privileges;

    @Override
    public String getAuthority() {
        return this.name;
    }

    public List<Privilege> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(List<Privilege> privileges) {
        this.privileges = privileges;
    }
    
}
