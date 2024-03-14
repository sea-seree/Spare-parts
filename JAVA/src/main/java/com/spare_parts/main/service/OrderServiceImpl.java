package com.spare_parts.main.service;

 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
 
import com.spare_parts.main.exception.OrderException;
import com.spare_parts.main.model.Category;
import com.spare_parts.main.model.Order;
import com.spare_parts.main.model.Part;
import com.spare_parts.main.repository.OrderRepository;
 
@Service

public class OrderServiceImpl implements OrderService{

	@Autowired

	private OrderRepository orderRepo;
	public List<Order> findAll() {
		return orderRepo.findAll();
	}
	
	public List<Order> findAllByPart(Part part){
		return orderRepo.findAllByPart(part);
	}
	
	public List<Order> findAllByIdGreaterThanEqual(int greaterId){
		return orderRepo.findAllByIdGreaterThanEqual(greaterId);
	}

	public List<Order> findAllByIdLessThanEqual(int lessId){
		return orderRepo.findAllByIdLessThanEqual(lessId);
	}
	
	public List<Order> findAllByIdGreaterThanEqualAndIdLessThanEqual(int greaterId, int lessId){
		return orderRepo.findAllByIdGreaterThanEqualAndIdLessThanEqual(greaterId, lessId);
	}

	
	public Order findOne(int id) {
		return orderRepo.findById(id)
				.orElseThrow(() -> new OrderException("This Order is not found " + id));
	}

	public Order newOrder(Order newOrder) {
			return orderRepo.save(newOrder);
	}
	
	
	public Order updateOrder(Order newOrder, int id) {
		return orderRepo.findById(id)
		.map(x->{
			return orderRepo.save(newOrder);
		}).orElseGet(()->{
			throw new OrderException("Not found Order");
		});
	}
 
	public void deleteOrder(int id) {
		orderRepo.deleteById(id);
	}

	public long countAll() {
		return orderRepo.count();
	}

}

