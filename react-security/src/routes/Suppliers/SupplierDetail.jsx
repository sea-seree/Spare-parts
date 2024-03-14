import React, { useState } from "react";
import { Form, NavLink, Outlet, Route, Routes, useLoaderData, useMatches, useSubmit } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/Suppliers/SupplierDetail.css";
import EditPopup from "./SupplierEdit"
import DeletePopup from "./SupplierDelete"
import { getSupplierById } from "../../api/SuppliersApi";
import { useParams } from 'react-router-dom';
import { colors } from "@mui/material";
import { getPartById, getParts, getPartsBySearch } from "../../api/PartsApi";
import { getOrders } from "../../api/OrdersApi";
import { getCategories } from "../../api/CategoriesApi";
import { userContext } from '../../util/userContext';


export async function loader({ request, params }) {
    const supplier = await getSupplierById(params.SupplierId);
    const parts = await getParts();
    const orders = await getOrders();

    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const categories = await getCategories();
    const partsBySearch = await getPartsBySearch(q);

    let countParts = 0;
    await parts.map((part) => {
        if (part.supplier.id == supplier.id) {
            countParts += 1;
        }
    });

    let countOrders = 0;
    let lastOrder = '';
    await orders.map((order) => {
        if (order.part.supplier.id == supplier.id) {
            countOrders += 1;
            lastOrder = order.datetime;
        }
    });

    return { categories, supplier, parts, partsBySearch, orders, countParts, countOrders, lastOrder, q };
}

export default function SupplierDetail({ depth }) {
    const { categories, supplier, parts, partsBySearch, orders, countParts, countOrders, lastOrder, q } = useLoaderData();
    const submit = useSubmit();
    const [filter, setFilter] = useState([]);
    const x = useMatches();
    const { pathname } = x[x.length - 1];
    const hideDivBefore = ((pathname.split("/")))
    const hideDivBeforeCheckTopic = hideDivBefore[hideDivBefore.length - 2];
    const hideDivBeforeCheckDepth = (((pathname.split("/")).length - 4) / 2)
    const dateTimeOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };

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
                myParts.map((part) => {
                    if (part.supplier.name == supplier.name) {
                        categories.map((category) => {
                            if (part.category.name == category.name && !categoriesFilterList.includes(category.name))
                                categoriesFilterList.push(category.name)
                        })
                    }
                })
            }
        } else { categoriesFilterList = filter; }

        categoriesFilterList.sort((a, b) => { return a - b });

        if (myParts == '' || myParts == undefined) {
            return null;
        }
        else {
            return categoriesFilterList.map((categoryName) => {
                return (
                    <div className="content">
                        <div key={categoryName} className="container-topic">
                            {categoryName}
                        </div>
                        <div className="container-card">
                            {
                                myParts.map((part) => {
                                    if (part.category.name == categoryName && part.supplier.id == supplier.id)
                                        return (
                                            <div key={`${part.name}${categoryName}`} className="card">
                                                <NavLink to={`PartDetail/${part.id}`} >
                                                    <img key={`${part.name}`} src={`${part.photo}`} className="card-photo-top" alt="spare parts" />
                                                </NavLink>
                                                <div className="card-body">
                                                    <p className="fs-5 fw-bold">{`${part.name}`}</p>
                                                    <p className="fs-6 fw-normal text-black-50">{`${part.supplier.name}`}</p>
                                                </div>
                                            </div>
                                        )
                                })
                            }
                        </div>
                    </div>

                )
            })
        }

    }

    return (
        <userContext.Consumer>
            {({ user }) => {
                return (
                    <div className={depth > 0 ? "" : "col-10 d-flex justify-content-start"}>

                        <div className="SupplierDetail" hidden={hideDivBeforeCheckTopic == "SupplierDetail" && hideDivBeforeCheckDepth == depth ? null : "hidden"}>
                            {/* ============ส่วนดีเทล============ */}
                            <div className="flex-wrap d-flex border align-items-center">
                                <img key={supplier.id} className="supplierDetail-img mt-0 me-4 ms-4" src={`${supplier.photo}`}
                                    alt="spare parts" />

                                <div className="col-md-10 supplierDetail-desc">
                                    <div className="card-body">
                                        <h5 className="card-title" alt="spare parts">{`${supplier.name}`}</h5>
                                        <p className="card-text mt-2" alt="spare parts">{`${supplier.description}`}</p>

                                    </div>
                                </div>
                                <div className="">
                                    <button hidden={user.roles[0] == "ROLE_MT" ? "hidden" : null}
                                        className="dropdown-toggle dropdown-toggle:hover dropdown-toggle:active border-0 "
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    />
                                    <ul className="dropdown-menu text-decoration-none">
                                        <div>
                                            <NavLink className="text-decoration-none" to="Edit">
                                                <li>
                                                    <div className="dropdown-item edit" >
                                                        <i>Edit</i>
                                                    </div>
                                                </li>
                                            </NavLink>
                                        </div>
                                        <div>
                                            {" "}
                                            <NavLink className="text-decoration-none" to="Delete">
                                                <li>
                                                    <div className="dropdown-item edit">
                                                        <i>Delete</i>
                                                    </div>
                                                </li>
                                            </NavLink>
                                        </div>
                                    </ul>
                                </div>
                            </div>

                            {/* ============ส่วนติดต่อ Supplier============ */}
                            <div className="d-flex justify-content-around my-4 mx-5">

                                <div className="card-body">
                                    <h5 className="card-title">Website</h5>
                                    <p className="card-text">{`${supplier.website}`}</p>
                                </div>


                                <div className="card-body">
                                    <h5 className="card-title">Contact</h5>
                                    <p className="card-text">{`${supplier.contact}`}</p>
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title">Phone Number</h5>
                                    <p className="card-text">{`${supplier.phone}`}</p>
                                </div>

                            </div>

                            {/* ============ส่วน Card ของจำนวน Part Order และ Last Order============ */}
                            <div className="d-flex justify-content-between">
                                <div className="card  w-25 rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Parts</h5>
                                        <h3 className="card-text"><center>{countParts}</center></h3>
                                    </div>
                                </div>
                                <div className="card  w-25 rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Orders</h5>
                                        <h3 className="card-text"><center>{countOrders}</center></h3>
                                    </div>
                                </div>
                                <div className="card  w-25 rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Last Order</h5>
                                        <h3 className="card-text"><center>{new Date(lastOrder).toLocaleString(
                                            "en-GB",
                                            dateTimeOptions
                                        )}</center></h3>
                                    </div>
                                </div>
                            </div>

                            {/* ============ส่วนของPart============ */}
                            <div className="my-5 pb-4 rounded-3 border rounded-4">
                                <div className="parts">
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

                                        </div>
                                    </div>
                                    <div key="createPartDat">
                                        {createPartData()}
                                    </div>
                                </div>
                            </div>

                            {/* ============ส่วนของOrder============ */}
                            <div className="my-5 pb-4 rounded-3 flex-wrap border rounded-4 col-12">
                                <div className="container d-flex mt-4">
                                    <h3 className="Part-topic d-flex mb-4">Orders</h3>
                                </div>
                                <div className="d-flex flex-wrap justify-content-center mb-4">
                                    <h4 className="card-title col-3"><center>Date</center></h4>
                                    <h4 className="card-title col-3"><center>Type</center></h4>
                                    <h4 className="card-title col-3"><center>Detail</center></h4>
                                    <h4 className="card-title col-3"><center>Description</center></h4>
                                </div >
                                <div className="order-list">
                                    {
                                        orders.map((order) => {
                                            if (order.part.supplier.id == supplier.id)
                                                return (

                                                    <NavLink to={`OrderDetail/${order.id}`} style={{ textDecoration: "none", color: "black" }}>
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
                                        })
                                    }
                                </div>

                            </div>
                        </div>


                        <Outlet />

                    </div>
                )
            }}
        </userContext.Consumer>
    );
}