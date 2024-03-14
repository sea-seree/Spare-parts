package com.spare_parts.main.model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.demo.auth.model.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usersData")
public class UserData {

	// `USER_ID` int(5) not null
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "USER_ID", length = 5, nullable = false)
	private int id;

	// `FIRST_NAME` varchar(25) not null
	@Column(name = "FIRST_NAME", length = 25, nullable = false)
	private String firstname;

	// `LAST_NAME` varchar(25) not null
	@Column(name = "LAST_NAME", length = 25, nullable = false)
	private String lastname;

	// `EMAIL` varchar(25) not null
	@Column(name = "EMAIL", length = 25, nullable = false, unique =  true)
	private String email;
	
	// `PHONE` varchar(10) not null
	@Column(name = "PHONE", length = 10, nullable = false)
	private String phone;
	
	// `PHONE` varchar(10) not null
	@Column(name = "ROLE", length = 2, nullable = false)
	private int role;

	// `PHOTO` varchar(500)
	@Column(name = "PHOTO", length = 500) 
	private String photo;

	public Map<String, Object> toMap(){
		Map<String, Object> map = new HashMap<>();
		map.put("id", this.getId());
		map.put("firstname", this.getFirstname());
		map.put("lastname", this.getLastname());
		map.put("email", this.getEmail());
		map.put("phone", this.getPhone());
		map.put("photo", this.getPhoto());
		
		return map;
		
	}
}
