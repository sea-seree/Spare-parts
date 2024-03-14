import axios from "axios";
import { getCategoryById } from "./CategoriesApi";
import { getSupplierById } from "./SuppliersApi";
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

export async function getParts() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const parts = await request({
    url: API_BASE_URL + '/parts',
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return parts;
}

export async function getPartById(partId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const part = await request({
    url: API_BASE_URL + `/parts/${partId}`,
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return part;
}

export async function getPartsBySearch(query) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  if (query == null || query == ''){
    return [];
  }

  const partsBySearch = await request({
    url: API_BASE_URL + `/parts/search/${query}`,
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  if (!partsBySearch || partsBySearch == '') partsBySearch = [];
  return partsBySearch;
}


export async function addPart(newPart) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }
  const category = await getCategoryById(newPart.category);
  const supplier = await getSupplierById(newPart.supplier);

  newPart.category = category;
  newPart.supplier = supplier;

  const addNewPart = await request({
    url: API_BASE_URL + `/parts`,
    method: 'POST',
    body: JSON.stringify(newPart),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return addNewPart;
}

export async function editPart(newPart) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }
  const category = await getCategoryById(newPart.category);
  const supplier = await getSupplierById(newPart.supplier);

  newPart.category = category;
  newPart.supplier = supplier;

  const editNewPart = await request({
    url: API_BASE_URL + `/parts/${newPart.id}`,
    method: 'PUT',
    body: JSON.stringify(newPart),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return editNewPart;
}

export async function deletePart(PartId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }
  
  const deletePart = await request({
    url: API_BASE_URL + `/parts/${PartId}`,
    method: 'DELETE',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return deletePart;
}
