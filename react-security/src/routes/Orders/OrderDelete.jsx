import React from "react";
import { Form, NavLink, redirect, useLoaderData, useSubmit } from "react-router-dom";
import { RiImageEditLine } from "react-icons/ri";
import { deleteOrder, getOrderById } from "../../api/OrdersApi";

export async function action({ params }) {

  await deleteOrder(params.OrderId);
  return redirect('/Orders');
}

export async function loader({ params }) {
  const order = await getOrderById(params.OrderId);
  return { order }
}

export default function OrderDelete() {

  const {order} = useLoaderData();

  return (
    <div className="popup">
      <div className="popup-inner">
        {
          <div className="container-fluid-1">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <Form
                  className="col-md-10"
                  method="delete"
                  action={`/Orders/${order.id}/Delete`}
                >
                  <div
                    className="fontBorderBottom"
                    style={{ color: "rgb(249, 148, 23)", textAlign: "center" }}
                  >
                    Delete this Order
                  </div>

                  <div
                    className="label-input"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <p className="required-input">{`Do you want to delete this Order: ${order.name}`}</p>
                  </div>

                  <div className="btnForSubmit">
                    <button type="submit">OK</button>

                    <NavLink to="../">
                      <button type="cancel" style={{ margin: "0 0 0 5rem" }}>
                        Cancel
                      </button>
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
