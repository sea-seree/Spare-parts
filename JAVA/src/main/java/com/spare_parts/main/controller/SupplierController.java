package com.spare_parts.main.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spare_parts.main.model.Supplier;
import com.spare_parts.main.service.SupplierService;

 
@RestController
@Validated
@CrossOrigin("http://localhost:3000")
public class SupplierController {
//	Logger logger = LoggerFactory.getLogger(SupplierController.class);
	
	@Autowired
	SupplierService service;
 
	@GetMapping("/suppliers")
	List<Supplier> findAll(){
		return service.findAll();
	}
	
	@GetMapping("/suppliers/search/{name}")
	List<Supplier> searchByName(@PathVariable String name){
		return service.searchByName(name);
	}
	
	@GetMapping("/suppliers/{id}")
	Supplier findOne(@PathVariable int id){
		return service.findOne(id);
	}
	@PutMapping("/suppliers/{id}")
	Supplier updateSupplier(@RequestBody Supplier supplier,@PathVariable int id) { 
	    return service.updateSupplier(supplier,id);
	}
	@PostMapping("/suppliers")
	public Supplier newSupplier(@RequestBody Supplier supplier) {
		return service.newSupplier(supplier);
	}
	@DeleteMapping("/suppliers/{id}")
	public ResponseEntity<String> updateSupplier(@PathVariable int id) { 
	    service.deleteSupplier(id);
	    return new ResponseEntity<>("User (ID: "+ id +") is deleted successsfully", HttpStatus.OK);
	}


}