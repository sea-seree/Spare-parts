package com.spare_parts.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spare_parts.main.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
	Supplier findByName(String name);
	//SELECT * FROM spare_part_db.suppliers where NAME like name
	public List<Supplier> findAllByNameLike(String name);
}