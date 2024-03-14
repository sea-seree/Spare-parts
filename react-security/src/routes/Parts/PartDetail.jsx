import React from 'react';
import { Form, NavLink, Outlet, useLoaderData, useMatches } from 'react-router-dom';
import { getPartById } from '../../api/PartsApi';
import { getOrders } from '../../api/OrdersApi';
import '../../style/Parts/PartDetail.css'
import { userContext } from '../../util/userContext';

export async function loader({ request, params }) {
  const part = await getPartById(params.PartId);
  const orders = await getOrders();


  let currentInventory = 0;
  await orders.map((order) => {
    if (order.part.id == part.id) {
      if (order.type == 'output' || order.type == 'usage') {
        currentInventory += (- order.quantity);
      } else if (order.type == 'input') {
        currentInventory += order.quantity;
      }
    }
  })

  return { part, orders, currentInventory };
}

export default function PartDetail({depth}) {
  const { part, orders, currentInventory } = useLoaderData();
  const x = useMatches();
  const { pathname } = x[x.length - 1];
  const hideDivBefore = ((pathname.split("/")))
  const hideDivBeforeCheckTopic = hideDivBefore[hideDivBefore.length-2];
  const hideDivBeforeCheckDepth = (((pathname.split("/")).length - 4 ) /2)  
  const dateTimeOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };


  return (<userContext.Consumer>
    {({ user })=>{ 
      return(

    <div className={depth > 0 ? "" : "col-10 d-flex justify-content-start"}>
      <div className="PartDetail" hidden={hideDivBeforeCheckTopic == "PartDetail" && hideDivBeforeCheckDepth == depth ? null : "hidden"}>

        {/* ======== section-upper ========== */}
        {/* <div className="row"> */}

          <div className="d-flex flex-wrap align-items-center mx-2rem">
            <img src={part.photo} className="img-spare-part my-1 " alt="stainless.png" />
            <div className="col-md-8 ms-5">
              <p className="fs-1 fw-bold">{part.name}</p>
              <p className="fs-5 text-secondary">
                {part.description}
              </p>
            </div>
            {/* <div className='box-btn'> */}
                <div className="" hidden={user.roles[0] == "ROLE_MT" ?"hidden":null}>
                  <NavLink className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"></NavLink>

                  <div className="dropdown-menu">
                    <NavLink to="Edit" className="dropdown-item edit" >Edit</NavLink>
                    <NavLink to="Delete" className="dropdown-item delete" >Delete</NavLink>
                  </div>
                </div>
              {/* </div> */}
          </div>
          
        {/* </div> */}


        {/* ============ section-middle ============== */}
        {/* <div className='container-body-content '> */}
        <div className="d-flex flex-nowrap justify-content-between mt-4">
            <div className="p-4 border border-2 rounded ">
              <p className="text-price up fw-bold fs-5">Price</p>
              <div>
                <p className="text-price bt fw-bold fs-2">฿ {part.price}</p>
              </div>
            </div>
            <div className="p-4 border border-2 rounded ">
              <p className="text-sku up fw-bold fs-5">SKU</p>
              <div>
                <p className="text-sku bt fw-bold fs-2">{part.sku}</p>
              </div>
            </div>
            <div className="p-4 border border-2 rounded ">
              <p className="text-currin up fw-bold fs-5">Current Inventory</p>
              <div>
                <p className="text-currin bt fw-bold fs-2">{currentInventory}</p>
              </div>
            </div>
          </div>
        {/* </div> */}

        {/* section-bottom */}
        <div className='d-flex flex-row justify-content-between  border border-2 rounded mt-4 '>

          {/* <div className="section-bottom"> */}
            <div className='d-flex justify-content-md-between'>
              <img
                src={part.supplier.photo}
                className="supplierImg"
                alt="NexusProcure"
              />

            <div className='left-img-info'>
              <div className="info-img me-5">
                <p className="info-img-desc sup">SUPPLIER</p>
                <p className="info-img-desc name">{part.supplier.name}</p>
                <p className="info-img-desc type">{part.category.name}</p>
              </div>

              <NavLink to={`SupplierDetail/${part.supplier.id}`}
                       className="link-product-btn p-3 ms-4 fs-5 text-decoration-none "
              >
                <i className="bi bi-eye-fill"></i> View all products
              </NavLink>
            </div>

            </div>
          {/* </div> */}

          <div className="right-right">
            <h3 className="info-info">Info</h3>
            <div className='info-info-desc'>
              <div className='info-info-desc-desc'>
                <p className="info-info-left">Type</p>
                <p className="info-info-right">{part.category.name}</p>
              </div>
              <div className='info-info-desc-desc'>
                <p className="info-info-left">Supplier</p>
                <p className="info-info-right">{part.supplier.name}</p>
              </div>
              <div className='info-info-desc-desc'>
                <p className="info-info-left">Supplier Phone Number</p>
                <p className="info-info-right">{part.supplier.phone}</p>
              </div>
            </div>
          </div>

        </div>

        {/* section-lastest bottom */}
      
        <div className="my-5 pb-4 rounded-3 flex-wrap border rounded-4 col-12">
          <div className="container d-flex mt-4">
            <h3 className="Part-topic d-flex mb-4">Records</h3>
          </div>
          <div className="d-flex flex-wrap justify-content-center mb-4">
            <h4 className="card-title col-3"><center>Date</center></h4>
            <h4 className="card-title col-3"><center>Type</center></h4>
            <h4 className="card-title col-3"><center>Quantity</center></h4>
            <h4 className="card-title col-3"><center>Description</center></h4>
          </div >
          {
            orders.map((order) => {
              if (order.part.id == part.id) {
                return (
                  <NavLink to={`OrderDetail/${order.id}`} style={{ textDecoration: "none", color: "black" }} key="">
                    <div className="d-flex flex-wrap justify-content-center border rounded-2 mx-5 py-2 boxType boxType:hover boxType:active mb-2">
                      <h5 className="card-title col-3"><center>{new Date(order.datetime).toLocaleString(
                        "en-GB",
                        dateTimeOptions
                      )}</center></h5>
                      <h5 className="card-title col-3"><center>{order.type}</center></h5>
                      <h5 className="card-title col-3"><center>{`${order.part.name} (x ${order.quantity})`}</center></h5>
                      <h5 className="card-title col-3"><center>{order.description}</center></h5>
                    </div>
                  </NavLink>
                )
              }
          })
          }
          
        </div>
      </div>
      
      <Outlet />
    </div>
    
    )}}
    </userContext.Consumer>
  );
}