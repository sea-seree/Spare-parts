import { NavLink, Outlet, Link, useLoaderData, Form, useSubmit, useNavigation, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { getUsers, getUsersBySearch } from '../../api/UserApi';
import React from 'react';



export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const userManagements = await getUsers();

  const usersBySearch = await getUsersBySearch(q);
  // const f = url.searchParams.get("f");
  // const userManagementsBySearchFilter = await getUserManagementsBySearchFilter(q);
  return { userManagements, usersBySearch, q ,  };
}

export default function UserManagement() {
  const { userManagements, usersBySearch, q } = useLoaderData();
  const submit = useSubmit();

  function createUserManagementData() {

    let myUsers = [];
    let userManagementsList = [];

    
    if (q == undefined) { //if searching
      myUsers = userManagements
    } else if (q != '') {
      myUsers = usersBySearch
    } else { myUsers = userManagements }

    // console.log(myUsers);
    if (myUsers == '' || myUsers == undefined) {
      return null;
    } else {
    myUsers.map((userManagement) => {
      if(!userManagementsList.includes(userManagement.role) )
      userManagementsList.push(userManagement.role)
    })
    }

    userManagementsList.sort((a, b) => { return a - b });

    if (myUsers == '' || myUsers == undefined) {
      return null;
    }
    else {
      return userManagementsList.map((userManagementRole) => {
        return (
          <div className="container-column px-5">
           <h3>{ (userManagementRole === 1) ? "Admin" : ((userManagementRole === 2) ? "Supervisor" : "Technical Maintenance" )} 
           </h3>
            <div className='content d-flex justify-content-start'>
              {myUsers.map((userManagement, index) => {
                if (userManagement.role == userManagementRole) {
                  return (
                    <div className="card" key={index}>
                      <div className="dot-menu">
                        <button className="btn dropdown-toggle align-items-center me-3 "
                          type="button" 
                          role="button" 
                          data-bs-toggle="dropdown" 
                          aria-expanded="false">
                  
                        </button>

                        <div className="dropdown-menu">
                          <NavLink to={`${userManagement.id}/Edit`} className="dropdown-item edit-mm">Edit</NavLink>
                          <NavLink to={`${userManagement.id}/Delete`} className="dropdown-item delete-mm" >Delete</NavLink>
                        </div>
                      </div>
                      <div className='border-none'>
                        <img src={`${userManagement.photo}`} className="card-img-top mx-4 " alt="user photo" />
                      </div>
                      <div className="card-body">
                        <div className="card-text fs-4 fw-bold mb-2">{`${userManagement.firstname} ${userManagement.lastname}`}</div>
                        <div className="card-text fs-5 fw-normal text-black-50">{`${userManagement.phone}`}</div>
                        <div className="card-text fs-5 fw-normal text-black-50">{`${userManagement.email}`}</div>
                      </div>
                    </div>
                  );
                }
              })
              }

            </div>
          </div>
        )
      })
    }

  }


  return (
    <div className="col-10 mt-4">
      <div className="usermanagement">
        <div className="container-searchbar px-5">
          <h2>UserManagement</h2>
          <Form>
            <i className="bi bi-search" ></i>
            {/* <input type="text" name="search" placeholder="Search" className="search-input"/> */}
            <input
              type='search'
              className="search-input"
              placeholder="Search"
              name='q'
              onChange={(event) => {
                submit(event.target.form)
              }}
            />
            <NavLink to="Add">
              <button className="add-btn add-usermm">+ Add</button>
            </NavLink>
          </Form>
        </div>


        <div>
          { createUserManagementData()}
        </div>
        {/* <div>
          ================= Admin =================
          <div className="container-column px-5">
            <h3>Admin</h3>
            <div className='content d-flex justify-content-between'>
              {userManagements.map((userManagement, index) => {
                if (userManagement.role === 1) {
                  return (
                    <div className="card" key={index}>
                      <div className="dropdown dot-menu">
                        <button className="btn dropdown-toggle align-items-center me-3 "
                          type="button" 
                          role="button" 
                          data-bs-toggle="dropdown" 
                          aria-expanded="false">
                  
                        </button>

                        <div className="dropdown-menu">
                          <NavLink to={`${userManagement.id}/Edit`} className="dropdown-item edit-mm">Edit</NavLink>
                          <NavLink to={`${userManagement.id}/Delete`} className="dropdown-item delete-mm" >Delete</NavLink>
                        </div>
                      </div>
                      <div className='border-none'>
                        <img src={`${userManagement.photo}`} className="card-img-top mx-4 " alt="user photo" />
                      </div>
                      <div className="card-body">
                        <div className="card-text fs-4 fw-bold mb-2">{`${userManagement.firstname} ${userManagement.lastname}`}</div>
                        <div className="card-text fs-5 fw-normal text-black-50">{`${userManagement.email}`}</div>
                      </div>
                    </div>
                  );
                }
              })
              }

            </div>
          </div>
          ================= Supervisor =================
          <div className="container-column px-5">
            <h3>Supervisor</h3>

            <div className='content d-flex justify-content-between'>
              {userManagements.map((userManagement, index) => {
                if (userManagement.role === 2) {
                  return (
                    <div className="card" key={index}>
                      <div className="dropdown dot-menu">
                        <button className="btn dropdown-toggle align-items-center me-3 "
                          type="button" 
                          role="button" 
                          data-bs-toggle="dropdown" 
                          aria-expanded="false">
                  
                        </button>

                        <div className="dropdown-menu">
                          <NavLink to={`${userManagement.id}/Edit`} className="dropdown-item edit-mm">Edit</NavLink>
                          <NavLink to={`${userManagement.id}/Delete`} className="dropdown-item delete-mm" >Delete</NavLink>
                        </div>
                      </div>

                      <div className='border-none'>
                        <img src={`${userManagement.photo}`} className="card-img-top mx-4 " alt="user photo" />
                      </div>

                      <div className="card-body">
                        <div className="card-text fs-4 fw-bold mb-2">{`${userManagement.firstname} ${userManagement.lastname}`}</div>
                        <div className="card-text fs-5 fw-normal text-black-50">{`${userManagement.email}`}</div>
                      </div>
                    </div>
                  );
                }
              })
              }

            </div>
          </div>
          ================= Technical Maintenance =================
          <div className="container-column px-5">
            <h3>Technical Maintenance</h3>

            <div className='content'>
              {userManagements.map((userManagement, index) => {
                if (userManagement.role === 3) {
                  return (
                    <div className="card" key={index}>
                    <div className="dropdown dot-menu">
                        <button className="btn dropdown-toggle align-items-center me-3 "
                          type="button" 
                          role="button" 
                          data-bs-toggle="dropdown" 
                          aria-expanded="false">
                      </button>

                        <div className="dropdown-menu">
                          <NavLink to={`${userManagement.id}/Edit`} className="dropdown-item edit-mm">Edit</NavLink>
                          <NavLink to={`${userManagement.id}/Delete`} className="dropdown-item delete-mm" >Delete</NavLink>
                        </div>
                      </div>

                      <div className='border-none'>
                        <img src={`${userManagement.photo}`} className="card-img-top mx-4 " alt="user photo" />
                      </div>

                      <div className="card-body">
                        <div className="card-text fs-4 fw-bold mb-2">{`${userManagement.firstname} ${userManagement.lastname}`}</div>
                        <div className="card-text fs-5 fw-normal text-black-50">{`${userManagement.email}`}</div>
                      </div>

                    </div>
                  );
                }
              })
              }

            </div>
          </div>

        </div> */}

      </div>
      <Outlet />
    </div>
  )
}