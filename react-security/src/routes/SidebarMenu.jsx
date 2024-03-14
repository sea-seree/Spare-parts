import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import '../style/SidebarMenu.css'

import logo from '../assets/piston.png'
import { NavLink, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../util/APIUtils';
import { userContext } from '../util/userContext';

function SidebarMenu(props) {
  return (
        
        <div className="col-2 min-vh-100 d-flex justify-content-between flex-column me-5" 
        style={{backgroundColor: 'rgb(54, 48, 98)'}}>
<userContext.Consumer>
          {({ user })=>{ 
            return(
                <div>
               {/* //===============LOGO==================> */}

            <div>
                <NavLink to={"/Parts"} className='text-decoration-none text-white d-sm-block d-flex align-itemcenter mt-3 mx-3'>
                    <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
                        <li className = "nav-item text-white fs-4 my-1 ">
                            <div className="nav-link text-white fs-5 d-flex align-items-center justify-content-start flex-nowrap" >
                                <img
                                    src={logo}
                                    className="img-fluid"
                                    style= {{
                                        width: '3.125rem', // ปรับขนาดตามต้องการ
                                        height: 'auto',
                                            }}
                                    alt="Logo"
                                />
                                <span className='ms-1 fs-5 d-none d-sm-inline d-flex'>{`Spare Part Inventory`}</span>
                            </div>
                        </li>
                    </ul>
                </NavLink>

                {/* //==============SIDE BAR========================> */}

                <hr className='text-secondary' />
                    <ul className="nav nav-pills flex-column mt-3 mt-sm-0 mx-3">
                        <li className = "nav-item text-white fs-4 my-1">
                            <NavLink to={"Parts"} className="nav-link text-white fs-6 d-flex flex-nowrap" >
                                <i className='bi bi-tools'></i>
                                <span className='ms-3 d-none d-sm-inline'>Parts</span>
                            </NavLink>
                        </li>
                        <li className = "nav-item text-white fs-4 my-1 py-2 py-sm-0">
                            <NavLink to={"Categories"}  className="nav-link text-white fs-6 d-flex flex-nowrap" >
                                <i className=' bi bi-columns-gap'></i>
                                <span className='ms-3 d-none d-sm-inline'>Categories</span>
                            </NavLink>
                        </li>
                        <li className = "nav-item text-white fs-4 my-1 py-2 py-sm-0">
                            <NavLink to={"Suppliers"}  className="nav-link text-white fs-6 d-flex flex-nowrap" >
                                <i className='bi bi-buildings-fill'></i>
                                <span className='ms-3 d-none d-sm-inline'>Suppliers</span>
                            </NavLink>
                        </li>
                        <li className = "nav-item text-white fs-4 my-1 py-2 py-sm-0">
                            <NavLink to={"Orders"} className="nav-link text-white fs-6 d-flex flex-nowrap" >
                                <i className='bi bi-box-seam'></i>
                                <span className='ms-3 d-none d-sm-inline'>Orders</span>
                            </NavLink>
                        </li>
                        <li className = "nav-item text-white fs-4 my-1 py-2 py-sm-0">
                            <NavLink to={"Comparison"} className="nav-link text-white fs-6 d-flex flex-nowrap" >
                                <i className='bi bi-transparency'></i>
                                <span className='ms-3 d-none d-sm-inline'>Comparison</span>
                            </NavLink>
                        </li>
                        <li className = "nav-item text-white fs-4 my-1 py-2 py-sm-0">
                            <NavLink to={"Reports"} className="nav-link text-white fs-6 d-flex flex-nowrap" >
                                <i className='bi bi-bar-chart-fill'></i>
                                <span className='ms-3 d-none d-sm-inline'>Reports</span>
                            </NavLink>
                        </li>
                        <li className = "nav-item text-white fs-4 my-1 py-2 py-sm-0">
                            <NavLink to={"Export"} className="nav-link text-white fs-6 d-flex flex-nowrap" hidden={user.roles[0] == "ROLE_MT" ?"hidden":null}>
                                <i className='bi bi-box-arrow-up'></i>
                                <span className='ms-3 d-none d-sm-inline'>Exports</span>
                            </NavLink>
                        </li>
                        <li className = "nav-item text-white fs-4 my-1 py-2 py-sm-0">
                            <NavLink to={"Users"} className="nav-link text-white fs-6 d-flex flex-nowrap" >
                                <i className='bi bi-people'></i>
                                <span className='ms-3 d-none d-sm-inline'>Users</span>
                            </NavLink>
                        </li>
                        <li className = "nav-item text-white fs-4 my-1 py-2 py-sm-0" hidden={user.roles[0] != "ROLE_ADMIN" ?"hidden":null}>
                            <NavLink to={"UserManagement"} className="nav-link text-white fs-6 d-flex flex-nowrap" >
                                <i className='bi bi-person-gear'></i>
                                <span className='ms-3 d-none d-sm-inline'>User management</span>
                            </NavLink>
                        </li>
                    </ul>
            </div>
            
                <div className=""
                style={{position:"fixed",bottom:"0"}}>
                    <NavLink  
                        to={"/"}
                        className="text-decoration-none text-white dropdown-toggle my-1 px-sm-2 py-sm-3 "
                        type="button"
                        id="triggerId"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className='bi bi-person-circle ms-2'></i> 
                        <span className='fs-6 ms-3 d-none d-sm-inline'>
                            {user.name}
                        </span>
                    </NavLink>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                        <NavLink to={`/ProfileInfo/${user.id}`} className="dropdown-item" >View Profile</NavLink>
                        <NavLink to={"/"} className="dropdown-item logout" onClick={(e)=>{props.onLogout()}}>
                            Logout
                        </NavLink>
                    </div>
                </div>
                </div>
            )}}
            </userContext.Consumer>                        
        </div>

    
  );
}

export default SidebarMenu;

{/* <userContext.Consumer>
          {({ user })=>{ 
            return(

                )}}
                </userContext.Consumer>   */}