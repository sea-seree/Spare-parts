import React, { useState } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown";
import { userContext } from '../../util/userContext';

//import API====================>
import { getOrders, getOrdersBySearch } from "../../api/OrdersApi";

//import CSS====================>
import "../../style/Orders/Orders.css";
import "../../style/SidebarMenu.css";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const orders = await getOrders();

  const ordersBySearch = await getOrdersBySearch(q);
  return { orders, ordersBySearch, q };
}

export default function Orders() {
  const { orders, ordersBySearch, q } = useLoaderData();
  // console.log(useLoaderData);
  //   || {};
  // if (!orders) {
  //   // กรณีที่ orders เป็น undefined หรือ null
  //   return <div>Loading...</div>;
  // }
  const submit = useSubmit();

  const dateTimeOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  function createOrderData() {
    let ordersTypeList = ["input", "output", "usage"];
    let myOrders = [];

    if (q == undefined) {
      myOrders = orders;
    } else if (q != "") {
      myOrders = ordersBySearch;
    } else {
      myOrders = orders;
    }

    if (myOrders == [] || myOrders == "" || myOrders == undefined) {
      return null;
    } else {
      return ordersTypeList.map((orderType) => {
        return (
          <div className="content">
            <h5 key={orderType} className=" mx-2 my-3 text-capitalize">
              {orderType}
            </h5>
            <div className="content-body">
              {myOrders.map((order) => {
                if (order.type == orderType)
                  return (
                    <NavLink to={`OrderDetail/${order.id}`}>
                      <div
                        className="   boxType
                                      d-flex 
                                      flex-wrap
                                      justify-content-between
                                      align-items-center
                                      px-3 py-2 mt-2
                                      border rounded-3"
                      >
                        <div className="d-flex align-items-center w-25">
                          <img
                            key={`${order.type}`}
                            src={`${order.part.photo}`}
                            className="card-photo-list me-3 "
                            alt="spare parts"
                          />

                          <p className="m-0 fw-bold text-black ">
                            {order.part.name}
                          </p>
                        </div>
                        <div className="align-items-center w-25 ">
                          <p className="m-0  text-black-50 ">
                            {new Date(order.datetime).toLocaleString(
                              "en-GB",
                              dateTimeOptions
                            )}
                          </p>
                        </div>
                        <div className="align-items-center w-25 ">
                          <p className="m-0 text-black-50 ">
                            {order.part.supplier.name}
                          </p>
                        </div>
                        <div className="align-items-center ">
                          <p className="m-0 text-black-50 ">{`${order.quantity} units`}</p>
                        </div>
                        <userContext.Consumer>
                          {({ user }) => {
                            return (

                              <button hidden={user.roles[0] == "ROLE_MT" ? "hidden" : null}
                                className="btn dropdown-toggle align-items-center me-3 "
                                type="button"
                                id={`dropdownMenuButton${order.id}`}
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></button>
                            )
                          }}
                        </userContext.Consumer>

                        <div
                          className="dropdown-menu"
                          aria-labelledby={`dropdownMenuButton${order.id}`}
                        >
                          <NavLink
                            to={`${order.id}/Edit`}
                            className="dropdown-item edit"
                          >
                            Edit
                          </NavLink>
                          <NavLink
                            to={`${order.id}/Delete`}
                            className="dropdown-item delete"
                          >
                            Delete
                          </NavLink>
                        </div>
                      </div>
                    </NavLink>
                  );
              })}
            </div>
          </div>
        );
      });
    }
  }

  return (
    <userContext.Consumer>
          {({ user })=>{ 
            return(
    <div className="col-10 flex-wrap mt-4">
      <div className="Order">
        {/* <div hidden>  */}

        {/*=================ส่วนบน=======================  */}
        <div className="container-searchbar col px-5">
          <h3 className="flex-grow-1 mt-2 mb-0">Orders</h3>

          <div className="d-flex ">
            <Form className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="search"
                name="q"
                placeholder="Search"
                className="search-input "
                onChange={(event) => {
                  console.log(event.target.form);
                  submit(event.target.form);
                }}
              />
            </Form>
            <NavLink to="Add" hidden={user.roles[0] == "ROLE_MT" ?"hidden":null}>
              <button type="add" className="add-btn">
                + Add
              </button>
            </NavLink>
          </div>
        </div>

        {/*=========ส่วนตารางเนื้อหา=======  */}
        <div className="ordersTable flex-wrap pt-q px-5">
          <div key="createOrderData" className="table-responsive">
            {createOrderData()}
          </div>
        </div>

        {/* </div>  */}
      </div>
      <Outlet />
    </div>
    )}}
    </userContext.Consumer>
  );
}
