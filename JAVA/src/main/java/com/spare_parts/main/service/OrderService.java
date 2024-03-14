package com.spare_parts.main.service;
 
import java.util.List;
 
import com.spare_parts.main.model.Order;
import com.spare_parts.main.model.Part;
 
public interface OrderService {
 
	public List<Order> findAll();
 
	public Order findOne(int id);
	
	public List<Order> findAllByPart(Part part);
	
	public List<Order> findAllByIdGreaterThanEqual(int greaterId);

	public List<Order> findAllByIdLessThanEqual(int lessId);

	public List<Order> findAllByIdGreaterThanEqualAndIdLessThanEqual(int greaterId, int lessId);

	public Order updateOrder(Order order, int id);
	
	public Order newOrder(Order order);

	public void deleteOrder(int id);

}
