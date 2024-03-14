package com.spare_parts.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spare_parts.main.model.Order;
import com.spare_parts.main.model.Part;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	public Order findByPart(Part part);
	
	public List<Order> findAllByPart(Part part);
	
	public List<Order> findAllByIdGreaterThanEqual(int greaterId);

	public List<Order> findAllByIdLessThanEqual(int lessId);
	
	public List<Order> findAllByIdGreaterThanEqualAndIdLessThanEqual(int greaterId,int lessId);
}
