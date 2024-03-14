package com.spare_parts.main.controller;

import java.util.ArrayList;
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

import com.spare_parts.main.model.Category;
import com.spare_parts.main.model.Supplier;
import com.spare_parts.main.service.CategoryService;
 
@RestController
@Validated
@CrossOrigin("http://localhost:3000")
public class CategoryController {
//	Logger logger = LoggerFactory.getLogger(CategoryController.class);
	
	@Autowired
	CategoryService service;
 
	@GetMapping("/categories")
	List<Category> findAll(){
		return service.findAll();
	}
	
	@GetMapping("/categories/{id}")
	Category findOne(@PathVariable int id){
		return service.findOne(id);
	}
	
	@GetMapping("/categories/search/{name}")
	List<Category> searchByName(@PathVariable String name){
		return service.searchByName(name);
	}
	
	@PutMapping("/categories/{id}")
	Category updateUser(@RequestBody Category Category,@PathVariable int id) { 
	    return service.updateCategory(Category,id);
	}
	
	@PostMapping("/categories")
	public Category newCategory(@RequestBody Category Category) {
		return service.newCategory(Category);
	}
	
	@DeleteMapping("/categories/{id}")
	public ResponseEntity<String> updateCategory(@PathVariable int id) { 
	    service.deleteCategory(id);
	    return new ResponseEntity<>("User (ID: "+ id +") is deleted successsfully", HttpStatus.OK);
	}


}