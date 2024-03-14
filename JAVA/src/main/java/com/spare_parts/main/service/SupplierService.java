package com.spare_parts.main.service;

import java.util.List;

import com.spare_parts.main.model.Supplier;

public interface SupplierService {
	
	public List<Supplier> findAll();
	
	public Supplier findOne(int id);
	
	public Supplier updateSupplier(Supplier supplier, int id);
	
	public Supplier newSupplier(Supplier supplier);
	
	public void deleteSupplier(int id);
	
	public List<Supplier> searchByName(String name);
}