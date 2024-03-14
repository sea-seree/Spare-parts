package com.spare_parts.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spare_parts.main.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

	public Category findByName(String name);

	public List<Category> findAllByNameLike(String name);
}
