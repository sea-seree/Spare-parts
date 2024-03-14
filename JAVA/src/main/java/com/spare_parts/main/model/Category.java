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
@Table(name = "categories")
public class Category {

	// `CATEGORY_ID` int(5) not null
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "CATEGORY_ID", length = 5, nullable = false)
	private int id;

	//`NAME` varchar(25) not null
	@Column(name = "NAME", length = 25, nullable = false, unique =  true)
	private String name;


	public Map<String, Object> toMap(){
		Map<String, Object> map = new HashMap<>();
		map.put("id", this.getId());
		map.put("name", this.getName());
		
		return map;
		
	}
}
