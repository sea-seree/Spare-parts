import React from "react";
import { NavLink, Outlet, useLoaderData, useMatches } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown";

//import API====================>
import { getOrderById } from "../../api/OrdersApi";

//import CSS====================>
import "../../style/Orders/Orders.css";
import "../../style/SidebarMenu.css";

export async function loader({ request, params }) {
  const order = await getOrderById(params.OrderId);
  return { order };
}

const dateTimeOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

export default function OrderDetail({depth}) {
  const { order } = useLoaderData();
  const x = useMatches();
  const { pathname } = x[x.length - 1];
  const hideDivBefore = ((pathname.split("/")))
  const hideDivBeforeCheckTopic = hideDivBefore[hideDivBefore.length-2];
  const hideDivBeforeCheckDepth = (((pathname.split("/")).length - 4 ) /2)

  return (
    <div className={hideDivBeforeCheckTopic == "OrderDetail" && hideDivBeforeCheckDepth == depth ? "col-10 d-flex justify-content-start" : ""}>
      <div className="OrderDetail" hidden={hideDivBeforeCheckTopic == "OrderDetail" && hideDivBeforeCheckDepth == depth ? null : "hidden"}>
        {/* ======== ส่วนที่หนึ่ง============ */}
        <div class="row">
          <div className=" d-flex flex-nowrap ">
            <img
              src={order.part.photo}
              className="orderDetailPartImg m-0"
              alt="orderDetailPartImg.png"
            />
            <div className="d-flex flex-column justify-content-md-between ps-5">
              <p className="fontColorY m-0 fs-3 fw-bold text-uppercase ">
                {" "}
                {order.type}{" "}
              </p>
              <p className="fs-1 m-0 fw-bold"> {order.part.name} </p>
              <p className="fs-4 m-0 text-secondary ">{order.part.supplier.name}</p>
              <div className="pb-3 mt-5">
                <NavLink
                  className="link-btn fs-6 py-3 ps-4 pe-4 text-decoration-none "
                  to={`PartDetail/${order.part.id}`}
                >
                  <i className="bi bi-eye-fill"></i> View Part
                </NavLink>
              </div>
            </div>
          </div>
                {/* ========ส่วนที่สอง============ */}
          <div className="d-flex flex-nowrap justify-content-between mt-4">
            <div className="p-4 border border-2 my-3 rounded ">
              <p className="big-text mb-0 ">Quantity</p>
              <div>
                <p className="big-number mb-0">{order.quantity} units</p>
              </div>
            </div>
            <div className="p-4 border border-2 my-3 rounded ">
              <p className="big-text">Price</p>
              <div>
                <p className="big-number mb-0">฿{order.part.price}</p>
              </div>
            </div>
            <div className="p-4 border border-2 my-3 rounded ">
              <p className="big-text">Total</p>
              <div>
                <p className="big-number mb-0">
                  ฿{order.quantity * order.part.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr />
        {/* ======== ส่วนที่สาม ============ */}
        <div className="suppliersData d-flex flex-nowrap justify-content-between  border border-2 rounded p-4 mt-4 ">
          <div className=" d-flex flex-nowrap justify-content-md-between  ">
            <img
              src={order.part.supplier.photo}
              className="orderDetailSuppImg mt-1"
              alt="orderDetailSuppImg"
            />
            <div className="px-3 ">
              <h3 className=" fontColorY fs-5 fw-bold ">SUPPLIER</h3>
              <p className="fs-2 mb-4 fw-bolder">{order.part.supplier.name}</p>
              <NavLink
                className="link-btn p-3 fs-6 text-decoration-none"
                to={`SupplierDetail/${order.part.supplier.id}`}
              >
                <i className="bi bi-buildings-fill"></i> View Details
              </NavLink>
            </div>
          </div>

          <div className="px-3 justify-content-md-between text-secondary">
            <h3 className="fs-5 mb-3">Date Time</h3>
            <h3 className="fs-5 mb-3">Type</h3>
            <h3 className="fs-5 mb-3">Product SKU</h3>
            <h3 className="fs-5 mb-3">Registered By</h3>
          </div>

          <div className="px-3 text-end text-secondary">
            <h3 className="fw-normal fs-5 mb-3">
              {" "}
              {new Date(order.datetime).toLocaleString(
                "en-GB",
                dateTimeOptions
              )}{" "}
            </h3>
            <h3 className="fw-normal fs-5 mb-3 text-uppercase">{order.type}</h3>
            <h3 className="fw-normal fs-5 mb-3">{order.part.sku}</h3>
            <h3 className="fw-normal fs-5 mb-3">{order.user.email}</h3>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
