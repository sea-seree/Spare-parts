import React, { useState } from "react";
import "../../style/Popup.css";
import {
  Form,
  NavLink,
  redirect,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { userContext } from '../../util/userContext';

import { addOrder, getOrders, getOrdersBySearch } from "../../api/OrdersApi";
import { getParts } from "../../api/PartsApi";
import { getUsers } from "../../api/UserApi";

import { addPhotoToCloud } from "../../api/CloudApi";

export async function action({ request }) {
  const rawDataNewOrder = await request.formData();

  const newOrder = {
    type: rawDataNewOrder.get("type"),
    datetime: rawDataNewOrder.get("datetime"),
    part: rawDataNewOrder.get("part"),
    quantity: rawDataNewOrder.get("quantity"),
    description: rawDataNewOrder.get("description"),
    user: rawDataNewOrder.get("user"),
  };

  await addOrder(newOrder);


    const result = addOrder(newOrder);
    console.log(result);


  return redirect("../");
}

export async function loader({ request }) {
  const orders = await getOrders();
  const parts = await getParts();
  const users = await getUsers();

  return { orders, parts, users };
}

export default function OrderAdd() {
  const { orders, parts, users } = useLoaderData() 
  // || {};
  // if (!orders) {
  //   // กรณีที่ orders เป็น undefined หรือ null
  //   return <div>Loading...</div>;
  // }
  // const uniqueType = Array.from(new Set(orders.map((order) => order.type)));
  const uniqueRoles = Array.from(new Set(users.map((user) => user.role)));


  return (
    <div className="popup">
      <div className="popup-inner">
        {
          <div className="container-fluid-1">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="fontBorderBottom">Add Order</div>
                <Form className="col-md-10" method="post" action="/Orders/Add">
                  <hr className="text-secondary" />
                  <div className="label-input">
                    <label htmlFor="type">Type</label>
                    <p className="required-input">Required</p>
                  </div>
                  {/* type */}
                  <select id="type" name="type">
                  <option value="" selected>
                      Select type
                    </option>
                    {/* {uniqueType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))} */}

                    <option value="input">Input</option>
                    <option value="output">Output</option>
                    <option value="usage">Usage</option>
                  </select>
                  {/* Date */}
                  <div className="label-input box-1">
                    <label htmlFor="datetime">Date</label>
                    <p className="required-input">Required</p>
                  </div>
                  <input type="datetime-local" id="datetime" name="datetime" />
                  {/* Name */}
                  <div className="label-input box-2">
                    <label htmlFor="part">Name</label>
                    <p className="required-input">Required</p>
                  </div>
                  <select name="part" id="part">
                    <option selected>Choose Item</option>

                    {parts.map((part) => {
                      return (
                        <option key={`${part.name}${part.id} `} value={part.id}>
                          {part.name}
                        </option>
                      );
                    })}
                  </select>

                  {/* Quantity */}
                  <div className="label-input box-3">
                    <label htmlFor="quantity">Quantity</label>
                    <p className="required-input">Required</p>
                  </div>
                  <input type="number" id="quantity" name="quantity" />

                  {/* Description */}
                  <div className="label-input box-4">
                    <label htmlFor="description">Description</label>
                  </div>
                  <textarea rows="3" id="description" name="description" />
                  
                  {/* User */}
                  <userContext.Consumer>
                    {({ user }) => {
                      return (
                      <div>
                        <input id="userDisplay" name="userDisplay" defaultValue={user.email} hidden />
                        <input id="user" name="user" defaultValue={user.id} hidden></input>
                      </div>
                      )
                    }}
                  </userContext.Consumer>
                  
                   {/* {
                    users.map(user => {
                      console.log(user);
                      return (
                        <option key={`${user.role}${user.id}`} value={user.id}>{user.role}</option>
                      )
                    })
                   } */}

      

                  {/* Submit */}
                  <div className="btnForSubmit">
                    <button type="Submit">Submit</button>
                    <NavLink to="../">
                      <button type="Cancel">Cancel</button>
                    </NavLink>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
