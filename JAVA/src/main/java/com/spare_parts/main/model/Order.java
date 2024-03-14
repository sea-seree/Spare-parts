package com.spare_parts.main.model;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
	// `ORDER_ID` int(5) not null
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "ORDER_ID", length = 5, nullable = false)
	private int id;
	
	// `PART_ID` int(5) not null
	@ManyToOne(optional=false) 
    @JoinColumn(name="PART_ID", nullable=false)
	private Part part;	
	
	// `USER_ID` int(5) not null
	@ManyToOne(optional=false) 
    @JoinColumn(name="USER_ID", nullable=false)
	private UserData user;	
	
	// `DATETIME` date not null
	@Column(name = "DATETIME", nullable = false, columnDefinition = "DATETIME")
	private LocalDateTime datetime;

	// `TYPE` varchar(25) not null
	@Column(name = "TYPE", length = 25, nullable = false)
	private String type;

	// `QUANTITY` int(5) not null
	@Column(name = "QUANTITY", length = 5, nullable = false)
	private int quantity;

	// `DESCRIPTION` varchar(500)
	@Column(name = "DESCRIPTION", length = 500) 
	private String description;
	
	public Map<String, Object> toMap(){
		Map<String, Object> map = new HashMap<>();
		map.put("id", this.getId());
		map.put("datetime", this.getDatetime());
		map.put("type", this.getType());
		map.put("quantity", this.getQuantity());
		map.put("description", this.getDescription());
		
		if (this.getPart() != null) {
			map.put("part",this.getPart().getName());
		} else {
			map.put("part",null);
		}
		
		if (this.getUser() != null) {
			map.put("user",this.getUser().getEmail());
		} else {
			map.put("user",null);
		}
		
		return map;
		
	}
}
