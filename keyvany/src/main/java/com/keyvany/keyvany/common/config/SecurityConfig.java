package com.keyvany.keyvany.common.config;

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

import com.keyvany.keyvany.common.security.AdminLoginSuccessHandler;
import com.keyvany.keyvany.common.security.AdminLogoutSuccessHandler;
import com.keyvany.keyvany.common.security.AdminUserService;

import lombok.AllArgsConstructor;
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    AdminUserService adminUserService;


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/js/**", "/static/**", "/img/**", "/lib/**","/resources/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        String[] resources = new String[]{
                "/resources/**","/css/**", "/static/**","/icons/**","/images/**","/js/**"
                ,"/login", "/signup", "/user","/test"
                , "/cms/manage/popImageUpload"
        };
        http.authorizeRequests() // 7
                .antMatchers(resources).permitAll() // 누구나 접근 허용
                .antMatchers("/cms").hasRole("ADMIN") // ADMIN만 접근 가능
                .antMatchers("/**").permitAll().and().formLogin().loginPage("/cms/login") // 로그인 페이지 링크
                .loginProcessingUrl("/cms/loginAction").defaultSuccessUrl("/cms/main/index").successHandler(successHandler()) // 로그인 성공 후 리다이렉트 주소
                .failureUrl("/cms/login?error=true").and().logout().logoutUrl("/cms/logoutForm")
                .logoutSuccessUrl("/login").logoutSuccessHandler(logoutSuccessHandler()).and().headers()
                .frameOptions().disable();

        //http.csrf().disable();

        http.csrf().ignoringAntMatchers("/cms/**");
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

    @Bean
    public PasswordEncoder passwordEncoder() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(adminUserService).passwordEncoder(passwordEncoder());
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
