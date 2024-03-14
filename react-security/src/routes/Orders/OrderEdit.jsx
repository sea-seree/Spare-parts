import React from "react";
import "../../style/Popup.css";
import {
  Form,
  NavLink,
  redirect,
  useLoaderData,
  useSubmit,
} from "react-router-dom";

import { editOrder, getOrderById } from "../../api/OrdersApi";
import { getParts } from "../../api/PartsApi";
import { getUsers } from "../../api/UserApi";
import { userContext } from '../../util/userContext';

export async function action({ request, params }) {
  const rawDataNewOrder = await request.formData();

  const newOrder = {
    id: params.OrderId,
    type: rawDataNewOrder.get("type"),
    datetime: rawDataNewOrder.get("datetime"),
    part: rawDataNewOrder.get("part"),
    quantity: rawDataNewOrder.get("quantity"),
    description: rawDataNewOrder.get("description"),
    user: rawDataNewOrder.get("user"),
  };

  await editOrder(newOrder);

  return redirect("../");
}

export async function loader({ params }) {
  console.log(params.OrderId);
  const order = await getOrderById(params.OrderId);
  
  const parts = await getParts();

  return { order, parts };
}

export default function OrderEdit() {
  const { order, parts } = useLoaderData();

  return (
    <div className="popup">
      <div className="popup-inner">
        {
          <div className="container-fluid-1">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="fontBorderBottom">Edit Order</div>
                <Form
                  className="col-md-10"
                  method="post"
                  action={`/Orders/${order.id}/Edit`}
                >
                  <hr className="text-secondary" />
                  <div className="label-input">
                    <label htmlFor="type">Type</label>
                    <p className="required-input">Required</p>
                  </div>
                  {/* type */}
                  <select id="type" name="type" defaultValue={order.type}>
                    <option value="" selected>
                      Select type
                    </option>
                    {/* {uniqueTypes.map((type) => (
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
                  <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    defaultValue={order.datetime}
                  />

                  {/* Part */}
                  <div className="label-input box-2">
                    <label htmlFor="part">Name</label>
                    <p className="required-input">Required</p>
                  </div>
                  <select name="part" id="part" defaultValue={order.part.id}>
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
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    defaultValue={order.quantity}
                  />

                  {/* Description */}
                  <div className="label-input box-4">
                    <label htmlFor="description">Description</label>
                  </div>
                  <textarea
                    rows="3"
                    id="description"
                    name="description"
                    defaultValue={order.description}
                  />

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
