import React, { useState } from 'react';
import '../../style/Popup.css'
import { Form, NavLink, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { RiImageEditLine } from 'react-icons/ri';
import { editPart, getPartById } from '../../api/PartsApi';
import { getSuppliers } from '../../api/SuppliersApi';
import { getCategories } from '../../api/CategoriesApi';
import axios from 'axios';
import { addPhotoToCloud } from '../../api/CloudApi';

export async function action({ request, params }) {
    const rawDataNewPart = await request.formData()
    const part = await getPartById(params.PartId);

    const blankPhoto = "http://res.cloudinary.com/dif2wztfi/image/upload/v1705632920/o1cjz3kuiwoi6rwvcog3.png"
    let url = '';

    if (document.getElementById("photo").files.length != 0
        && document.getElementById("filePhoto").value != null) {
        const photo = document.getElementById("photo").files;
        console.log(photo);
        url = await addPhotoToCloud(photo);
        
    } else if (document.getElementById("deletePhoto").value == 'deletePhoto'){ 
        url = blankPhoto 
    } else {
        url = part.photo
    }

    const newPart = {
        id: params.PartId,
        category: rawDataNewPart.get("category"),
        supplier: rawDataNewPart.get("supplier"),
        name: rawDataNewPart.get("name"),
        sku: rawDataNewPart.get("sku"),
        description: rawDataNewPart.get("description"),
        price: rawDataNewPart.get("price"),
        photo: url,
    }
    await editPart(newPart);

    return redirect('../');
}

export async function loader({ request, params }) {
    const part = await getPartById(params.PartId);
    const categoies = await getCategories();
    const suppliers = await getSuppliers();
    
    return { part, categoies, suppliers };
}

export default function PartDetailEdit() {
    const { part, categoies, suppliers } = useLoaderData();
    const [photo, setPhoto] = useState(null);
    const [fileBlank, setFileBlank] = useState();
    
    let photoName = photo != null ? photo[0].name : null;

    let newPart = part;
    return (
        <div className='popup'>
            <div className='popup-inner'>
                {
                    <div className="container-fluid-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="fontBorderBottom">Edit Part</div>

                                <Form className="col-md-10" method="post" action={`/Parts/PartDetail/${part.id}/Edit`} >

                                    <hr className='text-secondary' />

                                    <div className='label-input'>
                                        <label htmlFor='category'>Category</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <select id="category" name="category" defaultValue={newPart.category.id}>
                                        {
                                            categoies.map(categoy => {
                                                return (
                                                    <option key={categoy.name} value={categoy.id}>{categoy.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <div className='label-input box-1'>
                                        <label htmlFor='supplier'>Supplier</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <select id="supplier" name="supplier" defaultValue={newPart.supplier.id}>
                                        {
                                            suppliers.map(supplier => {
                                                return (
                                                    <option key={supplier.name} value={supplier.id}>{supplier.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <div className='label-input box-1'>
                                        <label htmlFor='name'>Name</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type='text' id='name' name='name' defaultValue={newPart.name} />

                                    <div className='label-input box-2'>
                                        <label htmlFor='sku'>SKU</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type='text' id='sku' name='sku' defaultValue={newPart.sku} />

                                    <div className='label-input box-3'>
                                        <label htmlFor='description'>Description</label>
                                    </div>
                                    <textarea rows="5" id="description" name="description" defaultValue={newPart.description} />

                                    <div className='label-input box-4'>
                                        <label htmlFor='price'>Price</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type="number" id="price" name="price" defaultValue={newPart.price} />


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
                                                />
                                                <div
                                                    className="dropdown-menu dropdown-menu-start p-0"
                                                    aria-labelledby="triggerId"
                                                >
                                                    <div className="justify-content-start">
                                                        <input id='deletePhoto' name='deletePhoto' defaultValue='' hidden/>
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
                                        { photoName != null 
                                        ? ( <div className='cancel-photo pe-2'>
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
                                        onClick={(e) => { if(fileBlank==null){setFileBlank(e.target.files)} }}
                                        onChangeCapture={(e) => {
                                            setPhoto(e.target.files);}}
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
                }
            </div>
        </div>
    )
}
