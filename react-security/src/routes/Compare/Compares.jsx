import React, { useState } from "react";
import { Form, NavLink, Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { getParts, getPartsBySearch } from "../../api/PartsApi";
import { getCategories } from "../../api/CategoriesApi";
import '../../style/Compares/Compares.css'

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
  
    const parts = await getParts();
    const categories = await getCategories();
  
    const partsBySearch = await getPartsBySearch(q);
    return { parts, categories, partsBySearch, q };
  }

export default function Comparison() {
    const { parts, categories, partsBySearch, q } = useLoaderData();
    const submit = useSubmit();
    const [filter, setFilter] = useState([]);
    const [selectPart, setSelectPart] = useState([]);
    const [selectCategory, setSelectCategory] = useState('');
    let checkForOneLoop = false;
    
    function setValueToElement(id) {
      let e = document.getElementById(id);
      e.value = `${filter.toString().replaceAll(',', '')}`;
    }
  
    async function setFilterOnChange(categoryName) {
      if (await filter.indexOf(categoryName) != -1) {
        await filter.splice(filter.indexOf(categoryName), 1)
        // await setFilter([...filter]);
        await setFilter((prevState) => ([...prevState]));
      }
      else {
        await setFilter([
          ...filter,
          categoryName,]);
        await categories.map((category) => {
          setValueToElement(category.name)
        })
      }
    }
  
    function createFilterList() {
      return categories.map((category) => {
        return <label key={category.name} id={category.name} className="list-group-item fs-5">
          <input
            aria-label="filter contacts"
            type="checkbox"
            onChange={async (event) => {
              await setFilterOnChange(category.name)
            }}
          />
          {` ${category.name}`}
        </label>
      })
    }

    function createPartData() {
        let categoriesFilterList = [];
        if (filter == '') {
            categories.map((category) => {
                categoriesFilterList.push(category.name)
            })
        } else { categoriesFilterList = filter; }
    
        categoriesFilterList.sort((a, b) => { return a - b });
        let myParts = [];
    
        if (q == undefined) { //if searching
            myParts = parts
        } else if (q != '') {
            myParts = partsBySearch
        } else { myParts = parts }
    
        if (myParts == '' || myParts == undefined) {
            return null;
        }
        else {
            return categoriesFilterList.map((categoryName) => {
                if (checkForOneLoop == true) {
                    return
                } else {
                    if (selectCategory != '' && checkForOneLoop == false) {
                        categoryName = selectCategory;
                        checkForOneLoop = true
                    }
                    return (
                        <div key={categoryName} className="content">
                            <div key={categoryName+categoryName} className="container-topic">
                                {categoryName}
                            </div>
                            <div className="container-card">
                                {
                                    myParts.map((part) => {
                                        if (part.category.name == categoryName)
                                            return (
                                                    <div key={`${part.name}${categoryName}`} 
                                                    className={`card ${selectPart.includes(part.id)?'cardSelected':''}`}
                                                        onClick={async (e) => {
                                                            if (selectPart.length < 5 && !selectPart.includes(part.id)) {
                                                                setSelectPart([...selectPart, part.id]);
                                                                setSelectCategory(part.category.name);
                                                            }
                                                            
                                                        }}>
                                                        <img key={`${part.name}`} src={`${part.photo}`} className="card-photo-top" />
                                                        <div className="card-body">
                                                            <p>{`${part.name}`}</p>
                                                            <p>{`${part.supplier.name}`}</p>
                                                        </div>
                                                    </div>
                                            )
                                    })
                                }

                            </div>
                        </div>
                    )
                }
            })
        }

    }

    return (
        <div className="col-10">
            <div className="Compares">

                <div className="container-searchbar">
                    <h3>Parts Comparison</h3>
                    <div className="d-flex">
                        <Form className="search-box">
                            <i className="bi bi-search" ></i>
                            <input
                                type="search"
                                name="q"
                                placeholder="Search"
                                className="search-input"
                                onChange={(event) => {
                                    console.log(event.target.form);
                                    submit(event.target.form);
                                }} />
                        </Form>

                        <div className="btn-group" id="Filter">
                            <button
                                className="btn btn-secondary dropdown-toggle me-3"
                                type="button"
                                id="triggerId"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Filter
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-start p-0"
                                aria-labelledby="triggerId"
                            >
                                <div className="list-group">
                                    {createFilterList()}
                                </div>
                            </div>

                        </div>
                        <button className="btn-reset" disabled={selectCategory==''?'disabled':null}
                        onClick={(e)=>{
                            setSelectCategory('');
                            setSelectPart([]);
                        }}>
                            Reset
                        </button>

                        <Form>
                            <input name="selectPart" defaultValue={selectPart} hidden/>
                        <NavLink to={`Compare/${(selectPart.toString().replaceAll(',','p'))}`}>
                            <button type="Submit" className="btn-compare" 
                            disabled={selectPart.length>=2?null:'disabled'}>Compare</button>
                        </NavLink>
                        </Form>
                        
                        
                    </div>
                </div>
                <div key="createPartDat">
                    {createPartData()}
                </div>

            </div>
            <Outlet />
        </div>

    );
}