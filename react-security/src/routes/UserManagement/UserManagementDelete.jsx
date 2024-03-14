import React from 'react';
import { Form, NavLink, redirect, useLoaderData , useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import { RiImageEditLine } from 'react-icons/ri';
import axios from 'axios';
import { editUser, getUserById, deleteUser } from '../../api/UserApi';

import "./UserManagement"


export async function action(userId) {
    console.log(userId.params.userId);
    const userDeleteLoaderId = userId.params.userId;
    await deleteUser(userDeleteLoaderId);
    return redirect('/UserManagement');
}

export async function loader(userId) {
    // console.log(userId.params.userId);
    const userDeleteLoaderId = userId.params.userId;
    const user = await getUserById(userDeleteLoaderId)
    console.log(user);
    return {user} ;
    // อธิบายหน่อยทำไม ตรงนี้ถึงเป็น {} โดยปกติมันเป็น user.id 
}

export default function UserDelete() {
    
    const { userId } = useParams();
    console.log(userId);
    const { user } = useLoaderData();

    return (
      <div className='popup'>
          <div className='popup-inner'>
              
                  <div className="container-fluid-1">
                      <div className="row justify-content-center">
                          <div className="col-md-8">
                              <div className="fontBorderBottom">Delete User</div>

                              <Form className="col-md-10" method="delete" action={`/UserManagement/${user.id}/Delete`}>
                                  <hr className='text-secondary' />

                                  <div className='label-input'>
                                        <p className="required-input">{`Do you want to delete this User: ${user.firstname} ${user.lastname}`}</p>
                                    </div>

                                  <div className='btnForSubmit'>
                                      <button type="Submit">Delete</button>

                                      <NavLink to="../">
                                          <button type="Cancel">Cancel</button>
                                      </NavLink>
                                  </div>
                              </Form>
                          </div>
                      </div>
                  </div>
              
          </div>
      </div>
  )
}

