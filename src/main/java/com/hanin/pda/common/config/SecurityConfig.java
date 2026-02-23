package com.hanin.pda.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.web.context.request.RequestContextListener;

import com.hanin.pda.common.security.AdminLoginSuccessHandler;
import com.hanin.pda.common.security.AdminLogoutSuccessHandler;
import com.hanin.pda.common.security.AdminUserService;

import lombok.AllArgsConstructor;
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AdminUserService adminUserService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/js/**", "/static/**", "/img/**", "/lib/**","/resources/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        String[] resources = new String[]{
                "/resources/**","/css/**", "/static/**","/icons/**","/images/**","/js/**"
                ,"/login", "/signup", "/user","/test"
                , "/pda/manage/popImageUpload"
        };
        http.authorizeRequests() // 7
                .antMatchers(resources).permitAll() // 누구나 접근 허용
                .antMatchers("/pda/login", "/pda/loginAction").permitAll() // 로그인 관련 경로는 허용
                .antMatchers("/pda/**").hasAnyRole("ADMIN", "USER") // CMS 하위 경로는 권한 필요
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/pda/login") // 로그인 페이지 링크
                .loginProcessingUrl("/pda/loginAction")
                .defaultSuccessUrl("/pda/manage/main")
                .successHandler(successHandler())
                .failureUrl("/pda/login?error=true")
                .and()
                .logout()
                .logoutUrl("/pda/logoutForm")
                .logoutSuccessUrl("/pda/login")
                .logoutSuccessHandler(logoutSuccessHandler())
                .and()
                .sessionManagement()
                .invalidSessionUrl("/pda/login?timeout=true") // 세션 만료 시 파라미터와 함께 이동
                .and()
                .headers()
                .frameOptions().disable();

        //http.csrf().disable();

        http.csrf().ignoringAntMatchers("/pda/**");
        //헤더 캐시
        http.headers().cacheControl().disable()
                      .frameOptions().sameOrigin();
    }

    @Bean
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }


    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new AdminLogoutSuccessHandler();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return new AdminLoginSuccessHandler();
    }

    @Bean
    public RequestContextListener requestContextListener() {
        return new RequestContextListener();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(adminUserService).passwordEncoder(passwordEncoder);
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
