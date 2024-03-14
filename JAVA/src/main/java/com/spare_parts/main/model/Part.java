package com.spare_parts.main.model;

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
@Table(name = "Parts")
public class Part {

	// `PART_ID` int(5) not null
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "PART_ID", nullable = false)
	private int id;

	// `CATEGORY_ID` int(5) not null
	@ManyToOne(optional = false)
	@JoinColumn(name = "CATEGORY_ID", nullable = false)
	private Category category;

	// `SUPPLIER_ID` int(5) not null
	@ManyToOne(optional = false)
	@JoinColumn(name = "SUPPLIER_ID", nullable = false)
	private Supplier supplier;

	// `NAME` varchar(25) not null
	@Column(name = "NAME", length = 25, nullable = false ,unique =  true)
	private String name;

	// `SKU` varchar(25) not null
	@Column(name = "SKU", length = 25, nullable = false ,unique =  true)
	private String sku;

	// `PRICE` decimal(8,2) not null
	@Column(name = "PRICE",nullable = false, columnDefinition="Decimal(8,2)")
	private double price;

	// `PHOTO` varchar(500)
	@Column(name = "PHOTO", length = 500) 
	private String photo;
	
	// `DESCRIPTION` varchar(500)
	@Column(name = "DESCRIPTION", length = 500)
	private String description;
	

	public Map<String, Object> toMap(){
		Map<String, Object> map = new HashMap<>();
		map.put("id", this.getId());
		if(this.getCategory() != null) {
			map.put("category", this.getCategory().getName());
		} else {
			map.put("category", null);
		}
		if(this.getSupplier() != null) {
			map.put("supplier", this.getSupplier().getName());
		} else {
			map.put("supplier", null);
		}
		map.put("name", this.getName());
		map.put("sku", this.getSku());
		map.put("price",this.getPrice());
		
		return map;
		
	}
}
