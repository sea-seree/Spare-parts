import axios from "axios";
import { getPartById } from "./PartsApi";
import { getUserById } from "./UserApi";
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';

const request = async (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  const response = await fetch(options.url, options);
  const json = await response.json();
  if (!response.ok) {
    return Promise.reject(json);
  }
  return json;
};

export async function getOrders() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const orders = await request({
    url: API_BASE_URL + '/orders',
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });


  return orders;
}

export async function getOrderById(orderId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const orders = await request({
    url: API_BASE_URL + `/orders/${orderId}`,
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });


  return orders;
}

export async function getOrdersBySearch(query) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

    if (query == null || query == ''){
      return [];
    }

    const ordersBySearch = await request({
      url: API_BASE_URL + `/orders/search/${query}`,
      method: 'GET',
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });

    if (!ordersBySearch || ordersBySearch == '' || ordersBySearch == []) ordersBySearch = [];
    return ordersBySearch;
  }

  export async function addOrder(newOrder) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
    const part = await getPartById(newOrder.part);
    const user = await getUserById(newOrder.user);
  
    newOrder.part = part;
    newOrder.user = user;

    const addNewOrder = await request({
      url: API_BASE_URL + `/orders`,
      method: 'POST',
      body: JSON.stringify(newOrder),
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });

    return addNewOrder;
  }

  export async function editOrder(newOrder) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
    const part = await getPartById(newOrder.part);
    const user = await getUserById(newOrder.user);
  
    newOrder.part = part;
    newOrder.user = user;
  
    const editNewOrder = await request({
      url: API_BASE_URL + `/orders/${newOrder.id}`,
      method: 'PUT',
      body: JSON.stringify(newOrder),
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  
    return editNewOrder;
  }

  export async function deleteOrder(OrderId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
    
    const deleteOrder = await request({
      url: API_BASE_URL + `/orders/${OrderId}`,
      method: 'DELETE',
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  
    return deleteOrder;
  }