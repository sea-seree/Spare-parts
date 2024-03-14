package com.spare_parts.main.service;

 
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spare_parts.main.exception.PartException;
import com.spare_parts.main.model.Category;
import com.spare_parts.main.model.Part;
import com.spare_parts.main.model.Supplier;
import com.spare_parts.main.repository.PartRepository;
 
@Service

public class PartServiceImpl implements PartService{

	@Autowired
	private PartRepository partRepo;
	
	
	public List<Part> findAll() {
		return partRepo.findAll();
	}

	public Part findOne(int id) {
		return partRepo.findById(id)
				.orElseThrow(() -> new PartException("This Part not found " + id));
	}
	
	public List<Object[]> distinctSupplierAndCategory(){
		return partRepo.findDistinctSupplierAndCategory();
	}
	
	public List<Part> findAllByCategory(Category category){
		return partRepo.findAllByCategory(category);
	}
	
	public List<Part> findAllBySupplier(Supplier supplier){
		return partRepo.findAllBySupplier(supplier);
	}
	
	public List<Part> findAllBySupplierAndCategory(Supplier supplier,Category category){
		return partRepo.findAllBySupplierAndCategory(supplier,category);
	}
	
	
	public List<Part> searchByName(String name) {
//		SELECT * FROM Parts WHERE name Like "%name%";
		return partRepo.findAllByNameLike('%'+name+'%');
	}

	public Part newPart(Part newPart) {
		Part newPartSku = partRepo.findBySku(newPart.getSku());
		if (newPartSku == null) {
			return partRepo.save(newPart);
		} else {
			throw new PartException("This Part has already in DB !");
		}
	}

	public Part updatePart(Part newPart, int id) {
		return partRepo.findById(id)
		.map(x->{
			return partRepo.save(newPart);
		}).orElseGet(()->{
			throw new PartException("Not found Part");
		});
	}
 
	public void deletePart(int id) {
		partRepo.deleteById(id);
	}

	public long countAll() {
		return partRepo.count();
	}

}

