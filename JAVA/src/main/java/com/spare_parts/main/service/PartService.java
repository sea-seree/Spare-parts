package com.spare_parts.main.service;
 
import java.util.List;

import com.spare_parts.main.model.Category;
import com.spare_parts.main.model.Part;
import com.spare_parts.main.model.Supplier;
 
public interface PartService {
 
	public List<Part> findAll();
 
	public Part findOne(int id);
	
	public List<Part> searchByName(String name);
	
	public List<Object[]> distinctSupplierAndCategory();
	
	public List<Part> findAllByCategory(Category category);
	
	public List<Part> findAllBySupplier(Supplier supplier);
	
	public List<Part> findAllBySupplierAndCategory(Supplier supplier,Category category);
	
	public Part updatePart(Part part, int id);
 
	public Part newPart(Part part);
 
	public void deletePart(int id);

}
