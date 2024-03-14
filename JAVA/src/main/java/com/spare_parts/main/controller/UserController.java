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

import com.spare_parts.main.model.Part;
import com.spare_parts.main.model.UserData;
import com.spare_parts.main.service.UserService;
 
@RestController
@Validated
@CrossOrigin("http://localhost:3000")
public class UserController {
//	Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService service;
 
	@GetMapping("/users")
	List<UserData> findAll(){
		return service.findAll();
	}
	@GetMapping("/users/{id}")
	UserData findOne(@PathVariable int id){
		return service.findOne(id);
	}
	
	@GetMapping("/users/search/{name}")
	List<UserData> searchByName(@PathVariable String name){
		return service.searchByName(name);
	}
		
		
	@PutMapping("/users/{id}")
	UserData updateUser(@RequestBody UserData user,@PathVariable int id) { 
	    return service.updateUser(user,id);
	     
	}
	@PostMapping("/users")
	public UserData newUser(@RequestBody UserData user) {
		return service.newUser(user);
	}
	@DeleteMapping("/users/{id}")
	public ResponseEntity<String> updateUser(@PathVariable int id) { 
	    service.deleteUser(id);
	    return new ResponseEntity<>("User (ID: "+ id +") is deleted successsfully", HttpStatus.OK);
	}


}