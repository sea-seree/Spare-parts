package com.spare_parts.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spare_parts.main.model.Category;
import com.spare_parts.main.model.Part;
import com.spare_parts.main.model.Supplier;

public interface PartRepository extends JpaRepository<Part, Integer> {
	

	public Part findBySku(String sku);
	
//	SELECT * FROM Parts WHERE name Like "name";
	public List<Part> findAllByNameLike(String name);
	
	public List<Part> findAllByCategory(Category category);
	
	public List<Part> findAllBySupplier(Supplier supplier);
	
	public List<Part> findAllBySupplierAndCategory(Supplier supplier,Category category);

	@Query("SELECT DISTINCT s.id, s.name, c.id, c.name FROM Part p " +
	           "JOIN p.supplier s " +
	           "JOIN p.category c")
	public List<Object[]> findDistinctSupplierAndCategory();

}
