import React, { useState, useEffect } from "react";
import { Outlet, Link, useLoaderData, Form, useSubmit, useNavigation, NavLink, Route, Routes, useFormAction } from 'react-router-dom';
import { getParts, getPartsBySearch } from "../../api/PartsApi";
import { getCategories } from "../../api/CategoriesApi";
import '../../style/Parts/Parts.css'
import { getOrders } from "../../api/OrdersApi";
import { userContext } from '../../util/userContext';

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const orders = await getOrders();

  const parts = await getParts();
  const categories = await getCategories();

  const partsBySearch = await getPartsBySearch(q);
  return { parts, categories, orders, partsBySearch, q };
}

export default function Parts() {
  const { parts, categories, orders, partsBySearch, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [filter, setFilter] = useState([]);

  function setValueToElement(id) {
    let e = document.getElementById(id);
    e.value = `${filter.toString().replaceAll(',', '')}`;
  }

  async function setFilterOnChange(categoryName) {
    if (await filter.indexOf(categoryName) != -1) {
      await filter.splice(filter.indexOf(categoryName), 1)
      // await setFilter([...filter]);
      await setFilter((prevState) => ([...prevState]));
    }
    else {
      await setFilter([
        ...filter,
        categoryName,]);
      await categories.map((category) => {
        setValueToElement(category.name)
      })
    }
  }

  function createFilterList() {
    return categories.map((category) => {
      return <label key={category.name} id={category.name} className="list-group-item fs-5">
        <input
          aria-label="filter contacts"
          type="checkbox"
          onChange={async (event) => {
            await setFilterOnChange(category.name)
          }}
        />
        {` ${category.name}`}
      </label>
    })
  }

  function findCurrentInventory(part){
    let currentInventory = 0;
    orders.map((order) => {
      if (order.part.id == part.id) {
        if (order.type == 'output' || order.type == 'usage') {
          currentInventory += (- order.quantity);
        } else if (order.type == 'input') {
          currentInventory += order.quantity;
        }
      }
    })
    return currentInventory;
  }

  function createPartData() {
    let categoriesFilterList = [];
    let myParts = [];

    if (q == undefined) { //if searching
      myParts = parts
    } else if (q != '') {
      myParts = partsBySearch
    } else { myParts = parts }

    if (filter == '') {
      if (myParts == '' || myParts == undefined) {
        return null;
      } else {
      myParts.map((part)=>{
          categories.map((category) => {
              if(part.category.name == category.name && !categoriesFilterList.includes(category.name) )
              categoriesFilterList.push(category.name)
          })
      })}
  } else { categoriesFilterList = filter; }

  categoriesFilterList.sort((a, b) => { return a - b });

    if (myParts == '' || myParts == undefined) {
      return null;
    }
    else {
      return categoriesFilterList.map((categoryName) => {
        return (
          // <div className="section">
          <div className="content">
            <div key={categoryName} className="container-topic">
              {categoryName}
            </div>
            <div className="container-card">
              {
                myParts.map((part) => {
                  let currentInventory = findCurrentInventory(part);
                  if (part.category.name == categoryName)
                    return (
                      <div key={`${part.name}${categoryName}`} className="card">
                        <NavLink to={`PartDetail/${part.id}`} >
                          <img key={`${part.name}`} src={`${part.photo}`} className="card-photo-top" alt="spare parts" />
                        </NavLink>
                        <div className="card-body">
                          <p className="fs-5 fw-bold">{`${part.name}`}</p>
                          <p className="fs-6 fw-normal text-black-50">{`${part.supplier.name}`}</p>
                          <p className="fs-6 fw-bold text-black-75">{`${currentInventory} units`}</p>
                        </div>
                      </div>
                    )
                })
              }
            </div>
          </div>
          // </div>
        )
      })
    }

  }

  return (
    <userContext.Consumer>
          {({ user })=>{ 
            return(
    <div className="col-10 px-5">
      <div className="parts mt-5">

        <div className="container-searchbar ">
          <h3>Parts</h3>
          <div className="d-flex">
            <Form className="search-box">
              <i className="bi bi-search" ></i>
              <input
                type="search"
                name="q"
                placeholder="Search"
                className="search-input "
                onChange={(event) => {
                  submit(event.target.form);
                }} />
            </Form>

            <div className="btn-group" id="Filter">
              <button
                className="btn btn-secondary dropdown-toggle me-3"
                type="button"
                id="triggerId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Filter
              </button>
              <div
                className="dropdown-menu dropdown-menu-start p-0"
                aria-labelledby="triggerId"
              >
                <div className="list-group">
                  {createFilterList()}
                </div>
              </div>

            </div>

            <NavLink to="Add" hidden={user.roles[0] == "ROLE_MT" ?"hidden":null}>
              <button type="add" className="add-btn">+ Add</button>
            </NavLink>
          </div>
        </div>
        <div key="createPartDat">
          {createPartData()}
        </div>

      </div>
      <Outlet />
    </div>
    )}}
    </userContext.Consumer>
  );
}