package com.spare_parts.main.model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "suppliers")
public class Supplier {

	// `SUPPLIER_ID` int(5) not null
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "SUPPLIER_ID", length = 5, nullable = false)
	private int id;

	// `NAME` varchar(25) not null
	@Column(name = "NAME", length = 25, nullable = false, unique =  true)
	private String name;

	// `LOGO` varchar(500)
	@Column(name = "PHOTO", length = 500)
	private String photo;

	// `WEBSITE` varchar(100) 
	@Column(name = "WEBSITE", length = 100)
	private String website;

	// `DESCRIPTION` varchar(500)
	@Column(name = "DESCRIPTION", length = 500)
	private String description;

	// `CONTACT` varchar(25) not null
	@Column(name = "CONTACT", length = 25, nullable = false)
	private String contact;

	// `PHONE` varchar(10) not null
	@Column(name = "PHONE", length = 10, nullable = false) 
	private String phone;

	public Map<String, Object> toMap(){
		Map<String, Object> map = new HashMap<>();
		map.put("id", this.getId());
		map.put("name", this.getName());
		map.put("website", this.getWebsite());
		map.put("contact", this.getContact());
		map.put("phone", this.getPhone());
		
		return map;
		
	}
}
