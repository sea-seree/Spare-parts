package com.spare_parts.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spare_parts.main.exception.UserException;
import com.spare_parts.main.model.Category;
import com.spare_parts.main.repository.CategoryRepository;

@Service

public class CategoryServiceImpl implements CategoryService{
	
	@Autowired
	
	private CategoryRepository categoryRepo;
	public List<Category> findAll(){
		return categoryRepo.findAll();
	}
	
	public Category findOne(int id) {
		return categoryRepo.findById(id)
				.orElseThrow(() -> new UserException("This User not found " + id));
	}
	
	public List<Category> searchByName(String name){
		//SELECT * FROM spare_part_db.suppliers where NAME like "%name%";
		return categoryRepo.findAllByNameLike('%' + name + '%');
	}
	
	public Category newCategory(Category newCategory) {
		Category e1 = categoryRepo.findByName(newCategory.getName());
		if (e1 == null) {
			return categoryRepo.save(newCategory);
		} else {
			throw new UserException("This User has already in DB !");
		}
	}
	
	public Category updateCategory(Category newCategory, int id) {
		return categoryRepo.findById(id)
		.map(x->{
			return categoryRepo.save(newCategory);
		}).orElseGet(()->{
			throw new UserException("Not found User");
		});
	}
	
	public void deleteCategory(int id) {
		categoryRepo.deleteById(id);
	}

	public long countAll() {
		return categoryRepo.count();
	}

}
