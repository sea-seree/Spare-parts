import React, { useState } from "react";
import { Form, NavLink, Outlet, Route, Routes, useLoaderData, useSubmit } from "react-router-dom";
import "../../style/SidebarMenu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/Suppliers/Suppliers.css"
import { getSuppliers, getSuppliersBySearch } from "../../api/SuppliersApi";
import { userContext } from '../../util/userContext';

export async function loader({ request }) {
  const suppliers = await getSuppliers();
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const suppliersBySearch = await getSuppliersBySearch(q);
  // console.log(q);
  return { suppliers, suppliersBySearch, q };
}

export default function Suppliers() {
  const { suppliers, suppliersBySearch, q } = useLoaderData();
  const submit = useSubmit();

  function createSupplierData() {
    let mySupplier = [];

    if (q == undefined) {
      mySupplier = suppliers;
    } else if (q != '') {
      mySupplier = suppliersBySearch;
    } else { mySupplier = suppliers }

    if (mySupplier == '' || mySupplier == undefined) {
      return null;
    } else {
      const result = mySupplier.map((supplier) => {
        return (

          <NavLink className="text-decoration-none" to={`SupplierDetail/${supplier.id}`} key={supplier.id} >
            <div className="card supplier-card">
              <img key={supplier.id} src={`${supplier.photo}`} className="card-img-top img-card" alt="spare parts" />
              <div className="card-body" >
                <div className="supplier-name-card" alt="spare parts">{`${supplier.name}`}</div>
              </div>
            </div>
          </NavLink>

        );
      })

      return result;
    }
  }

  return (
<userContext.Consumer>
          {({ user })=>{ 
            return(
    <div className="container-fluid supplier-container-main col-10 mt-4 flex-wrap">
      <div className="supplier">
        <div className="px-5">

          <div className="container d-flex mt-4 mb-4">
            <h3>Supplier</h3>
            <Form className="search-box ms-auto p-2 bd-highlight">
              <i className="bi bi-search" ></i>
              <input
                type="search"
                name="q"
                placeholder="Search"
                className="search-input "
                onChange={(event) => {
                  submit(event.target.form);
                }} />
              <NavLink to="Add" hidden={user.roles[0] == "ROLE_MT" ?"hidden":null}>
                <button type="add" className="add-btn supplier-add" >+ Add</button>
              </NavLink>
            </Form>

          </div>

          <div className="supplier-block-card">

            {
              createSupplierData()
            }

          </div>
          
        </div>
        <Outlet />
      </div>
    </div>
    )}}
    </userContext.Consumer>
  );
}
