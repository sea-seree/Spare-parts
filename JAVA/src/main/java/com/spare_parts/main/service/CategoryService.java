package com.spare_parts.main.service;

import java.util.List;

import com.spare_parts.main.model.Category;

public interface CategoryService {

	public List<Category> findAll();
	
	public Category findOne(int id);
	 
	public Category updateCategory(Category Category, int id);
	
	public List<Category> searchByName(String name);
 
	public Category newCategory(Category Category);
 
	public void deleteCategory(int id);
}
