import React, { useState } from 'react';
import { Form, NavLink, Routes, Route, useLoaderData, useSubmit, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/Categories/Categories.css';
import { getCategories, getCategoriesBySearch } from '../../api/CategoriesApi';
import { getParts } from '../../api/PartsApi';
import { userContext } from '../../util/userContext';

export async function loader({ request }) {

    const url = new URL(request.url);
    // console.log(request);
    const categories = await getCategories();
    const q = url.searchParams.get('q');
    // console.log(q);

    const categoriesBySearch = await getCategoriesBySearch(q);
    // console.log(categoriesBySearch);

    const parts = await getParts();
    // console.log(parts);

    return { parts, categories, categoriesBySearch, q };
}


export default function Categories() {

    // const [buttonPopup, setButtonPopup] = useState(false);

    const { parts, categories, categoriesBySearch, q } = useLoaderData();
    const submit = useSubmit();

    function createCategoryData() {

        let myCategory = [];

        if (q == undefined) {
            myCategory = categories;
        } else if (q != '') {
            myCategory = categoriesBySearch;
        } else { myCategory = categories }


        if (myCategory == '' || myCategory == undefined) {
            return null;
        } else {
            const result = myCategory.map((category) => {

                let check = false;

                return (

                    <div className="card" style={{ margin: '1rem' }} key="">
                        <userContext.Consumer>
                            {({ user }) => {
                                return (
                                    <div className="" hidden={user.roles[0] == "ROLE_MT" ? "hidden" : null}>
                                        <NavLink className="dropdown-toggle dot-menu" role="button" data-bs-toggle="dropdown" aria-expanded="false"></NavLink>

                                        <div className="dropdown-menu" >
                                            <NavLink to={`${category.id}/Edit`} className="dropdown-item edit" >Edit</NavLink>
                                            <NavLink to={`${category.id}/Delete`} className="dropdown-item delete" >Delete</NavLink>
                                        </div>
                                    </div>
                                )
                            }}
                        </userContext.Consumer>

                        <NavLink to={`CategoryDetail/${category.id}`}>
                            {
                                parts.map((part) => {
                                    if (category.id == part.category.id && check == false) {
                                        check = true;
                                        return (
                                            <img key={`${category.id}${part.id}`} src={`${part.photo}`} className="card-img-top" alt="spare parts" />
                                        )
                                    }
                                })
                            }
                        </NavLink>


                        <div className="card-body">
                            <div key={`${category.id}`} className="fs-4 card-text"> {`${category.name}`} </div>
                        </div>
                    </div>

                );
            })

            return result;
        }
    }



    return (
        <userContext.Consumer>
            {({ user }) => {
                return (
                    <div className="col-10">
                        <div className='Categories'>
                            <div className="container-searchbar">
                                <h3>Categories</h3>
                                <Form className="search-box">
                                    <i className="bi bi-search" ></i>
                                    <input type='search'
                                        className="search-input py-1"
                                        placeholder="Search"
                                        name='q'
                                        onChange={(event) => {
                                            submit(event.target.form)
                                        }}
                                    />
                                    <NavLink to="/Categories/Add" hidden={user.roles[0] == "ROLE_MT" ? "hidden" : null}>
                                        <button className="add-btn">+ Add</button>
                                    </NavLink>
                                </Form>
                            </div>

                            <div className="container-card-cate">
                                {
                                    createCategoryData()
                                }
                            </div>
                        </div>
                        <Outlet />

                    </div>
                )
            }}
        </userContext.Consumer>

    )
}