import React, { useState } from 'react';
import { NavLink, Outlet, Route, Routes , useLoaderData } from 'react-router-dom';
import '../../style/Profile/Profile.css'
import { getUserById } from '../../api/UserApi';



export async function loader({params}) {
  // console.log(params.userId);
  const user = await getUserById(params.userId);
  console.log(user);
  return {user};

}

export default function ProfileInfo() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const {user}  = useLoaderData();

  return (

    <div className="col-10 px-5 profile">
      <div className="rounded border-5 p-4">
        <div className="d-flex flex-wrap rounded-5 border border-2 mt-4" style={{ backgroundColor: 'rgb(236, 236, 236)' }}>
          <div className='flex-wrap d-flex w-75' >
            <img src={user.photo}
              alt="user image"
              className='profileInfoImg border border-4 border border-white' />
            <div className='d-flex flex-column justify-content-md-center ps-3'>
              <h3 className="roleText pt-2 mb-3 fw-bold" alt="role name">
              { (user.role === 1) ? "Admin" : ((user.role === 2) ? "Supervisor" : "Technical Maintainence" )}</h3>
              <p className="card-text fs-4 fw-bold mb-2" alt="name">{`${user.firstname} ${user.lastname}`}</p>
              <p className="card-text fs-5 fw-normal text-black-50 mt-2" alt="email">{`${user.email}`}</p>
            </div>
          </div>
          <div className="div-right-center d-flex align-items-center ps-5 pe-3">
            <NavLink to={`${user.id}/Edit`} className="align-items-center" >
              <button onClick={() => setButtonPopup(true)} className="edit-btn align center py-2 px-5 fs-5">
                <i>Edit</i>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}
