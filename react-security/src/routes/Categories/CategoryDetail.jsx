import React from 'react';
import { Form, NavLink, Outlet, useLoaderData, useMatches, useSubmit } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/Categories/CategoriesDetail.css';
import { getCategoryById } from '../../api/CategoriesApi';
import { getParts, getPartsBySearch } from '../../api/PartsApi';
import Categories from './Categories';
import { getOrders } from '../../api/OrdersApi';

export async function loader({ request, params }) {

    const category = await getCategoryById(params.CategoryId);
    const parts = await getParts();
    const orders = await getOrders();
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const partsBySearch = await getPartsBySearch(q);


    return { parts, category, orders, partsBySearch, q };
}

export default function CategoryDetail({depth}) {

    const { parts, category, orders, partsBySearch, q } = useLoaderData();
    const submit = useSubmit();
    const x = useMatches();
    const { pathname } = x[x.length - 1];
    const hideDivBefore = ((pathname.split("/")))
    const hideDivBeforeCheckTopic = hideDivBefore[hideDivBefore.length-2];
    const hideDivBeforeCheckDepth = (((pathname.split("/")).length - 4 ) /2)  

    function createCategoryDetailData() {

        let myParts = [];

        if (q == undefined) {
            myParts = parts;
        } else if (q != '') {
            myParts = partsBySearch;
        } else { myParts = parts }

        if (myParts == '' || myParts == undefined) {
            return null;
        } else {
            const result = myParts.map((part) => {
                if (part.category.id == category.id) {
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
                    return (
                        <div>
                            <NavLink to={`PartDetail/${part.id}`} className="card" style={{ margin: '0.5rem' }} key="">
                                <img src={`${part.photo}`} className="card-img-top" alt="spare parts" />
                                <div className="card-body">
                                    <p className="fs-5 fw-bold">{`${part.name}`}</p>
                                    <p className="fs-6 fw-normal text-black-50">{`${part.supplier.name}`}</p>
                                    <p className="fs-6 fw-bold text-black-75">{`${currentInventory} units`}</p>
                                </div>
                            </NavLink>
                        </div>
                    )
                }
            })
            return result;
        }

    }

    return (
        <div className={hideDivBeforeCheckTopic == "CategoryDetail" && hideDivBeforeCheckDepth == depth ? "col-10 d-flex justify-content-start" : ""}>
            <div className="CategoriesDetail" hidden={hideDivBeforeCheckTopic == "CategoryDetail" && hideDivBeforeCheckDepth == depth ? null : "hidden"}>
                <div className='breadcrumb'>
                    <NavLink to="Categories"><h5 style={{ color: '#a4a4a4' }}>Categories</h5></NavLink>
                    <i className="bi bi-chevron-right"></i>
                    <h5 style={{ color: '#000000', marginLeft: '0.2rem' }}>{category.name}</h5>
                </div>
                <div className="container-searchbar">
                    <h3>{category.name}</h3>
                    <Form className="d-flex">
                        <i className="bi bi-search" ></i>
                        <input type="search"
                            placeholder="Search"
                            name='q'
                            className="search-input"
                            onChange={(event) => {
                                submit(event.target.form)
                            }}
                        />
                    </Form>
                </div>

                <div className="container-card"
                    style={
                        {
                            margin: '1rem',
                            flexWrap: 'wrap',
                            flexDirection: 'row'
                        }
                    }>
                    {
                        createCategoryDetailData()
                    }
                </div>
            </div>
            <Outlet />
        </div>
    )
}
