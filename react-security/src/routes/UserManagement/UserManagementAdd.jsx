import React, { useState } from 'react';
import '../../style/Popup.css'
import "../../style/UserManagement/UserManagement.css";
import { Form, NavLink, Outlet, redirect, useLoaderData } from 'react-router-dom';
import { addUser, getUsers } from '../../api/UserApi';
import { addPhotoToCloud } from '../../api/CloudApi';
import { signup } from '../../util/APIUtils';

export async function action({ request }) {
    const rawDataNewUser = await request.formData()

    let url = '';
    const photo = document.getElementById("photo").files
    const blankPhoto = "http://res.cloudinary.com/dif2wztfi/image/upload/v1705632920/o1cjz3kuiwoi6rwvcog3.png"

    if (document.getElementById("photo").files.length != 0
        && document.getElementById("filePhoto").value != null) {
        url = await addPhotoToCloud(photo);
    } else { url = blankPhoto }

    const roleFormData = rawDataNewUser.get("role")
    let role = 3;
    if (roleFormData == 'ADMIN'){
        role = 1;
    } else if (roleFormData == 'SP'){
        role = 2;
    } else if (roleFormData == 'MT'){
        role = 3;
    }

    const newUserData = {
        firstname: rawDataNewUser.get("firstname"),
        lastname: rawDataNewUser.get("lastname"),
        email: rawDataNewUser.get("email"),
        phone: rawDataNewUser.get("phone"),
        role: role,
        photo: url,
    }

    const lastUser = await addUser(newUserData);

    console.log(lastUser);

    const newUser = {
        username: lastUser.firstname,
        email: lastUser.email,
        password: rawDataNewUser.get("password"),
        role: [rawDataNewUser.get("role")],
        userData: lastUser,
        
    }

    await signup(newUser);
    console.log("newUser add to DB Success!");
    return redirect('../');
}

export async function loader({ request }) {

    const users = await getUsers();
    return { users };
}


export default function UserAdd() {
    const { users } = useLoaderData();
    const [photo, setPhoto] = useState(null);
    let photoName = photo != null ? photo[0].name : null;
    const [fileBlank, setFileBlank] = useState();

    return (
        <div className='popup'>
            <div className='popup-inner'>
                {
                    <div className="container-fluid-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="fontBorderBottom">Add User</div>

                                <Form className="col-md-10" method="post" action="/userManagement/Add" >
                                    <hr className='text-secondary' />

                                    <div className='label-input'>
                                        <label htmlFor='role'>Role</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <select id="role" name="role">
                                        <option value={`ADMIN`}>Admin</option>
                                        <option value={`SP`}>Supervisor</option>
                                        <option value={`MT`}>Technician Maintenance</option>
                                    </select>

                                    <div className='label-input box-1'>
                                        <label htmlFor='firstname'>Firstname</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type='text' id='firstname' name='firstname' />

                                    <div className='label-input box-2'>
                                        <label htmlFor='lastname'>Lastname</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type='text' id='lastname' name='lastname' />

                                    <div className='label-input box-3'>
                                        <label htmlFor='email'>Email</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type='text' id='email' name='email' />

                                    <div className='label-input box-4'>
                                        <label htmlFor='password'>Password</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type="password" id="password" name="password" />

                                    <div className='label-input box-4'>
                                        <label htmlFor='phonenumber'>Phone Number</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type="number" id="phone" name="phone" maxLength="10" />

                                    <div className='label-input box-4'>
                                        <div>
                                            <label htmlFor='Photo'>Photo</label>
                                            <div className="btn-group" id="DeletePhoto">
                                                <button
                                                    className="btn dropdown-toggle text-white border-0"
                                                    type="button"
                                                    id="triggerId"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >

                                                </button>
                                                <div
                                                    className="dropdown-menu dropdown-menu-start p-0"
                                                    aria-labelledby="triggerId"
                                                >
                                                    <div className="justify-content-start">
                                                        <input id='deletePhoto' name='deletePhoto' defaultValue='' hidden />
                                                        <button type='delete'
                                                            onClick={(e) => {
                                                                setPhoto();
                                                                document.getElementById("deletePhoto").value = 'deletePhoto';
                                                                document.getElementById("photo").files = fileBlank;
                                                            }}>delete photo</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <p className='ignore'>Required</p>
                                    </div>


                                    <label htmlFor='photo' >
                                        <div className='upload-photo'>
                                            <i className=" bi bi-image"></i>
                                        </div>
                                    </label>

                                    <input name="photo" id="photo" type="file" accept="photo/*"
                                        onClick={(e) => { if (fileBlank == null) { setFileBlank(e.target.files) } }}
                                        onChangeCapture={(e) => {
                                            setPhoto(e.target.files);
                                        }}
                                    />

                                    <label htmlFor='filePhoto' >
                                        {photoName != null
                                            ? (<div className='cancel-photo pe-2'>
                                                <i className="bi bi-x-lg"
                                                    onClick={(e) => {
                                                        setPhoto();
                                                        if (document.getElementById("photo").files.length != 0) {
                                                            document.getElementById("photo").files = fileBlank;
                                                        }
                                                    }}
                                                />
                                            </div>
                                            ) : null
                                        }

                                    </label>

                                    <input id="filePhoto" name="filePhoto" className='upload-photo-bg' defaultValue={photoName} disabled />


                                    <div className='btnForSubmit'>
                                        <button type="Submit">Submit</button>

                                        <NavLink to="../">
                                            <button type="cancel">Cancel</button>
                                        </NavLink>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}