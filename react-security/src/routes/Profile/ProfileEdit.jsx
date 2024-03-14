import React, { useState } from 'react';
import { Form, NavLink, Outlet, redirect, useLoaderData} from 'react-router-dom';
import {  getUserById, editProfile } from '../../api/UserApi';
import { addPhotoToCloud } from '../../api/CloudApi';

export async function action({ request, params }) {
    const rawDataNewUser = await request.formData()
    const user = await getUserById(params.userId);


    let url = '';
    const blankPhoto = "http://res.cloudinary.com/dif2wztfi/image/upload/v1705632920/o1cjz3kuiwoi6rwvcog3.png"

    if (document.getElementById("photo").files.length != 0
        && document.getElementById("filePhoto").value != null) {
        const photo = document.getElementById("photo").files;
        url = await addPhotoToCloud(photo);

    } else if (document.getElementById("deletePhoto").value == 'deletePhoto') {
        url = blankPhoto
    } else {
        url = user.photo
    }

    const newUser = {
        id: params.userId,
        firstname: rawDataNewUser.get("firstname"),
        lastname: rawDataNewUser.get("lastname"),
        email: rawDataNewUser.get("email"),
        phone: rawDataNewUser.get("phone"),
        role: rawDataNewUser.get("role"),
        photo: url,
    }
    
    await editProfile(newUser);
    return redirect('../');

}

export async function loader({ params }) {
    const user = await getUserById(params.userId);
    return { user };
}

export default function ProfileEdit() {
    const { user } = useLoaderData();
    const [photo, setPhoto] = useState(null);
    let photoName = photo != null ? photo[0].name : null;
    const [fileBlank, setFileBlank] = useState();


    return (
        <div className='popup'>
            <div className='popup-inner profile'>
                
                    <div className="container-fluid-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="fontBorderBottom">Edit User</div>

                                <Form className="col-md-10" method="post" action={`/ProfileInfo/${user.id}/Edit`}>
                                    <hr className='text-secondary' />

                                    <div className='label-input'>
                                        <label htmlFor='role'>Role</label>
                                        <p className="required-input">Required</p>
                                    </div>

                                    <select id="role" name="role" disabled defaultValue={user.role}>
                                        <option value="1">Admin</option>
                                        <option value="2">Supervisor</option>
                                        <option value="3">User</option>
                                    </select>

                                    <div className='label-input box-1'>
                                       
                                        <label htmlFor='firstname'>Firstname</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type='text' id='firstname' name='firstname' defaultValue={user.firstname} />

                                    <div className='label-input box-2'>
                                        <label htmlFor='lastname'>Lastname</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type='text' id='lastname' name='lastname' defaultValue={user.lastname} />

                                    <div className='label-input box-3'>
                                        <label htmlFor='email'>Email</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type='text' id='email' name='email' defaultValue={user.email} />

                                    <div className='label-input box-4'>
                                        <label htmlFor='phonenumber'>Phone Number</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type="number" id="phone" name="phone" defaultValue={user.phone} />

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

                                    <input name="photo" id="photo" type="file" accept="photo/*"
                                        onClick={(e) => { if (fileBlank == null) { setFileBlank(e.target.files) } }}
                                        onChangeCapture={(e) => {
                                            setPhoto(e.target.files);
                                        }}
                                    />


                                    <input id="filePhoto" name="filePhoto" className='upload-photo-bg' defaultValue={photoName} disabled />

                                    <div className='btnForSubmit'>
                                        <button type="Submit">Submit</button>
                                        <NavLink to="../">
                                            <button type="Cancel">cancel</button>
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