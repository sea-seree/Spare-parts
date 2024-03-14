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

import com.spare_parts.main.model.Part;
import com.spare_parts.main.service.PartService;
 
@RestController
@Validated
@CrossOrigin("http://localhost:3000")
public class PartController {
//	Logger logger = LoggerFactory.getLogger(PartController.class);
	
	@Autowired
	PartService service;
 
	@GetMapping("/parts")
	List<Part> findAll(){
		return service.findAll();
	}
	@GetMapping("/parts/{id}")
	Part findOne(@PathVariable int id){
		return service.findOne(id);
	}
	@GetMapping("/parts/search/{name}")
	List<Part> searchByName(@PathVariable String name){
		return service.searchByName(name);
	}
	
	@PutMapping("/parts/{id}")
	Part updatePart(@RequestBody Part Part,@PathVariable int id) { 
	    return service.updatePart(Part,id);
	}
	@PostMapping("/parts")
	public Part newPart(@RequestBody Part Part) {
		return service.newPart(Part);
	}
	@DeleteMapping("/parts/{id}")
	public ResponseEntity<String> updatePart(@PathVariable int id) { 
	    service.deletePart(id);
	    return new ResponseEntity<>("Part (ID: "+ id +") is deleted successsfully", HttpStatus.OK);
	}


}