package com.cognixia.jump.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cognixia.jump.filter.JwtRequestFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	JwtRequestFilter jwtRequestFilter;
	
	
	// Authentication - who are you?
	@Bean
	protected UserDetailsService userDetailsService() {
		
		return userDetailsService;
	}
	
	// Authorization - what do you want?
	@Bean
	protected SecurityFilterChain filterChain( HttpSecurity http ) throws Exception {
		
		http.csrf().disable()
			.authorizeRequests()
			
			//.antMatchers("/api/**").permitAll() //permits all URI after /api
						
			.antMatchers("/api/user").permitAll() // anyone can access /hello
			
			.antMatchers("/authenticate").permitAll() // allow anyone to create token
			
			.antMatchers("/hello").hasRole("USER") // have to be user role to access /hello
			
			//permits users with role ADMIN to access /hello
			.antMatchers("/hi").hasRole("ADMIN")
			.anyRequest().authenticated()  //any other API in this project has to be authenticated (token or user info to access)
			.and()
			.sessionManagement().sessionCreationPolicy( SessionCreationPolicy.STATELESS ) ; // tell spring security to NOT CREATE sessions
		/*
		 * .logout().invalidateHttpSession(true)
		 * .clearAuthentication(true)
		 * 
		 */
		
		// this request will go through many filters, make sure that the FIRST filter that is checked is
		// the filter for jwts, in order to make sure of that, the filter has to be checked before you check the 
		// username & password (filter)
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
	
	
	// Encoder -> method that will encode/decode all the user passwords
	@Bean
	protected PasswordEncoder encoder() {
		
		return new BCryptPasswordEncoder();
		
	}
//	
	// load the encoder & user details service that are needed for spring security to do authentication
	@Bean
	protected DaoAuthenticationProvider authenticationProvider() {
		
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(encoder()); // new BCryptPasswordEncover()
		
		return authProvider;
	}
	
	// can autowire and access the authentication manager (manages authentication (login) of our project)
	@Bean
	protected AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}
	
}








