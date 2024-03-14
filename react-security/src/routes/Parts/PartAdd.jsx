import React, { useState } from 'react';
import '../../style/Popup.css'
import { Form, NavLink, redirect, useLoaderData } from 'react-router-dom';
import { RiImageEditLine } from 'react-icons/ri';
import { addPart, getParts } from '../../api/PartsApi';
import { getCategories } from '../../api/CategoriesApi';
import { getSuppliers } from '../../api/SuppliersApi';
import axios from 'axios';
import { addPhotoToCloud } from '../../api/CloudApi';

export async function action({ request }) {
    const rawDataNewPart = await request.formData()

    let url = '';
    const photo = document.getElementById("photo").files
    const blankPhoto = "http://res.cloudinary.com/dif2wztfi/image/upload/v1705632920/o1cjz3kuiwoi6rwvcog3.png"

    if (document.getElementById("photo").files.length != 0
        && document.getElementById("filePhoto").value != null) {
        url = await addPhotoToCloud(photo);
    } else { url = blankPhoto }

    const newPart = {
        category: rawDataNewPart.get("category"),
        supplier: rawDataNewPart.get("supplier"),
        name: rawDataNewPart.get("name"),
        sku: rawDataNewPart.get("sku"),
        description: rawDataNewPart.get("description"),
        price: rawDataNewPart.get("price"),
        photo: url,
    }

    await addPart(newPart);

    return redirect('../');
}

export async function loader({ request }) {

    const parts = await getParts();
    const categoies = await getCategories();
    const suppliers = await getSuppliers();

    return { parts, categoies, suppliers };
}

export default function PartAdd() {
    const { parts, categoies, suppliers } = useLoaderData();
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
                                <div className="fontBorderBottom">Add Part</div>
                                <Form className="col-md-10" method="post" action="/Parts/Add" >
                                    <hr className='text-secondary' />

                                    <div className='label-input'>
                                        <label htmlFor='category'>Category</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <select id="category" name="category">
                                        {
                                            categoies.map(categoy => {
                                                return (
                                                    <option key={`${categoy.name}${categoy.id}`} value={categoy.id}>{categoy.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <div className='label-input box-1'>
                                        <label htmlFor='supplier'>Supplier</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <select id="supplier" name="supplier">
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
                                    <input type='text' id='name' name='name' />

                                    <div className='label-input box-2'>
                                        <label htmlFor='sku'>SKU</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type='text' pattern='[A-Z]{2}-[0-9]{3}' placeholder='XX-001' id='sku' name='sku' />

                                    <div className='label-input box-3'>
                                        <label htmlFor='description'>Description</label>
                                    </div>
                                    <textarea rows="5" id="description" name="description" />

                                    <div className='label-input box-4'>
                                        <label htmlFor='price'>Price</label>
                                        <p className="required-input">Required</p>
                                    </div>
                                    <input type="number" id="price" name="price" />

                                    <div className='label-input box-4'>
                                        <label htmlFor='Photo'>Photo</label>
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
