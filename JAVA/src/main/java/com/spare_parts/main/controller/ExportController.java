package com.spare_parts.main.controller;

import java.util.ArrayList;
import java.util.Arrays;
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

import com.spare_parts.main.model.Category;
import com.spare_parts.main.model.Order;
import com.spare_parts.main.model.Part;
import com.spare_parts.main.model.Supplier;
import com.spare_parts.main.service.CategoryService;
import com.spare_parts.main.service.OrderService;
import com.spare_parts.main.service.PartService;
import com.spare_parts.main.service.SupplierService;
 
@RestController
@Validated
@CrossOrigin("http://localhost:3000")
public class ExportController {
//	Logger logger = LoggerFactory.getLogger(PartController.class);
	
	@Autowired
	PartService partService;
	@Autowired
	SupplierService supplierService;
	@Autowired
	OrderService orderService;
	@Autowired
	CategoryService categoryService;
	

	@GetMapping("/parts/export")
	public ResponseEntity<Object> partsExport(){
		ArrayList<Object> list = new ArrayList<>();
		
		List<Part> parts = partService.findAll();
		for (Part part : parts) {
			list.add(part.toMap());
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/parts/export/all/{categoryId}")
	public List<Part> partsByCategoryExport(@PathVariable int categoryId){
		Category category = categoryService.findOne(categoryId);
		return partService.findAllByCategory(category);
	}
	
	@GetMapping("/parts/export/{supplierId}/all")
	public List<Part> partsBySupplierExport(@PathVariable int supplierId){
		Supplier supplier = supplierService.findOne(supplierId);
		return partService.findAllBySupplier(supplier);
	}
	
	@GetMapping("/parts/export/{supplierId}/{categoryId}")
	public List<Part> partsBySupplierExport(@PathVariable int supplierId,@PathVariable int categoryId){
		Supplier supplier = supplierService.findOne(supplierId);
		Category category = categoryService.findOne(categoryId);
		return partService.findAllBySupplierAndCategory(supplier,category);
	}
	
	@GetMapping("/suppliers/export")
	public ResponseEntity<Object> suppliersExport(){
		ArrayList<Object> list = new ArrayList<>();
		
		List<Supplier> suppliers = supplierService.findAll();
		for (Supplier supplier : suppliers) {
			list.add(supplier.toMap());
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/suppliers/export/all")
	public ResponseEntity<Object> suppliersAllExport(){
		ArrayList<Object> list = new ArrayList<>();
		List<Object[]> supplierByCategories = partService.distinctSupplierAndCategory();
		
		for (Object[] supplier : supplierByCategories) {
			Map<String, Object> map = new HashMap<>();
			map.put("suppiler", supplier[1]);
			map.put("category", supplier[3]);
			list.add(map);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/suppliers/export/{categoryId}")
	public ResponseEntity<Object> suppliersExport(@PathVariable int categoryId){
		ArrayList<Object> list = new ArrayList<>();
		List<Object[]> supplierByCategories = partService.distinctSupplierAndCategory();
		
		for (Object[] supplier : supplierByCategories) {
			if((int)supplier[2] == categoryId) {
			Map<String, Object> map = new HashMap<>();
			map.put("suppiler", supplier[1]);
			map.put("category", supplier[3]);
			list.add(map);
			}
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/categories/export")
	public ResponseEntity<Object> categoriesExport(){
		ArrayList<Object> list = new ArrayList<>();
		
		List<Category> categories = categoryService.findAll();
		for (Category category : categories) {
			list.add(category.toMap());
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/categories/export/all")
	public ResponseEntity<Object> categoriesAllExport(){
		ArrayList<Object> list = new ArrayList<>();
		List<Object[]> categoryBySuppliers = partService.distinctSupplierAndCategory();
		
		for (Object[] category : categoryBySuppliers) {
			Map<String, Object> map = new HashMap<>();
			map.put("category", category[3]);
			map.put("suppiler", category[1]);
			list.add(map);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/categories/export/{supplierId}")
	public ResponseEntity<Object> categoriesExport(@PathVariable int supplierId){
		ArrayList<Object> list = new ArrayList<>();
		List<Object[]> categoryBySuppliers = partService.distinctSupplierAndCategory();
		
		for (Object[] category : categoryBySuppliers) {
			if((int)category[0] == supplierId) {
			Map<String, Object> map = new HashMap<>();
			map.put("category", category[3]);
			map.put("suppiler", category[1]);
			list.add(map);
			}
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/orders/export")
	public ResponseEntity<Object> ordersExport(){
		ArrayList<Object> list = new ArrayList<>();
		
		List<Order> orders = orderService.findAll();
		for (Order order : orders) {
			list.add(order.toMap());
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/orders/export/all/{dateTo}")
	public List<Order> ordersbyStartToPointExport(@PathVariable int dateTo){
		return orderService.findAllByIdLessThanEqual(dateTo);
	}
	
	@GetMapping("/orders/export/{dateFrom}/all")
	public List<Order> ordersbyPointToEndExport(@PathVariable int dateFrom){
		return orderService.findAllByIdGreaterThanEqual(dateFrom);
	}
	
	@GetMapping("/orders/export/{dateFrom}/{dateTo}")
	public List<Order> ordersbyPointToPointExport(@PathVariable int dateFrom,@PathVariable int dateTo){
		return orderService.findAllByIdGreaterThanEqualAndIdLessThanEqual(dateFrom,dateTo);
	}
	
	
}