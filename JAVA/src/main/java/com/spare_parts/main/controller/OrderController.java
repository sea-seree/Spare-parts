package com.spare_parts.main.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.spare_parts.main.model.Order;
import com.spare_parts.main.model.Part;
import com.spare_parts.main.service.OrderService;
import com.spare_parts.main.service.PartService;
 
@RestController
@Validated
@CrossOrigin("http://localhost:3000")
public class OrderController {
//	Logger logger = LoggerFactory.getLogger(OrderController.class);
	
	@Autowired
	OrderService orderService;
	
	@Autowired
	PartService partService;
 
	@GetMapping("/orders")
	List<Order> findAll(){
		return orderService.findAll();
	}
	
	@GetMapping("/orders/{id}")
	Order findOne(@PathVariable int id){
		return orderService.findOne(id);
	}
	
	@GetMapping("/orders/search/{name}")
	ResponseEntity<Object> searchByPartName(@PathVariable String name){
		ArrayList<Object> list = new ArrayList<>();
		List<Part> parts = partService.searchByName(name);
		
		for (Part part : parts) {
			List<Order> orders = orderService.findAllByPart(part);
			for (Order order : orders) {
				list.add(order);
			}
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@PutMapping("/orders/{id}")
	Order updateOrder(@RequestBody Order Order,@PathVariable int id) { 
	    return orderService.updateOrder(Order,id);
	}
	@PostMapping("/orders")
	public Order newOrder(@RequestBody Order Order) {
		return orderService.newOrder(Order);
	}
	@DeleteMapping("/orders/{id}")
	public ResponseEntity<String> updateOrder(@PathVariable int id) { 
	    orderService.deleteOrder(id);
	    return new ResponseEntity<>("Order (ID: "+ id +") is deleted successsfully", HttpStatus.OK);
	}


}