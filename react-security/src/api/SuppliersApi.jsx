import axios from "axios";
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

export async function getSuppliers() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const suppliers = await request({
    url: API_BASE_URL + '/suppliers',
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return suppliers;
}

export async function getSupplierById(supplierId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const supplier = await request({
    url: API_BASE_URL + `/suppliers/${supplierId}`,
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return supplier;
}

export async function getSuppliersBySearch(query) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }
  if (query == null || query == '') {
    return [];
  }

  const suppliersBySearch = await request({
    url: API_BASE_URL + `/suppliers/search/${query}`,
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  if (!suppliersBySearch || suppliersBySearch == '') suppliersBySearch = [];
  
  return suppliersBySearch;
}

export async function addSupplier(newSupplier) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const addNewSupplier = await request({
    url: API_BASE_URL + `/suppliers`,
    method: 'POST',
    body: JSON.stringify(newSupplier),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return addNewSupplier;
}

export async function editSupplier(newSupplier) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const editNewSupplier = await request({
    url: API_BASE_URL + `/suppliers/${newSupplier.id}`,
    method: 'PUT',
    body: JSON.stringify(newSupplier),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return editNewSupplier;
}

export async function deleteSupplier(SupplierId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const deleteSupplier = await request({
    url: API_BASE_URL + `/suppliers/${SupplierId}`,
    method: 'DELETE',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return deleteSupplier;
}