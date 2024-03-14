package com.spare_parts.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spare_parts.main.exception.SupplierException;
import com.spare_parts.main.model.Supplier;
import com.spare_parts.main.repository.SupplierRepository;

@Service
public class SupplierServiceImpl implements SupplierService {

	@Autowired
	private SupplierRepository supplierRepo;
	
	public List<Supplier> findAll() {
		return supplierRepo.findAll();
	}
	
	public Supplier findOne(int id) {
		return supplierRepo.findById(id)
				.orElseThrow(() -> new SupplierException("This User not found " + id));
	}
	
	public Supplier newSupplier(Supplier newSupplier) {
		Supplier newSupplierName = supplierRepo.findByName(newSupplier.getName());
		if(newSupplierName == null) {
			return supplierRepo.save(newSupplier);
		} else {
			throw new SupplierException("Not found Supplier");
		}
	}
	
	public Supplier updateSupplier(Supplier newSupplier, int id) {
		return supplierRepo.findById(id)
				.map(x -> {
					return supplierRepo.save(newSupplier);
				}).orElseGet(() -> {
					throw new SupplierException("Not found Supplier");
				});
	}
	
	public void deleteSupplier(int id) {
		supplierRepo.deleteById(id);
	}
	
	public long countAll() {
		return supplierRepo.count();
	}

	public List<Supplier> searchByName(String name){
		//SELECT * FROM spare_part_db.suppliers where NAME like "%name%";
		 return supplierRepo.findAllByNameLike('%'+name+'%');
	}
	
	
}