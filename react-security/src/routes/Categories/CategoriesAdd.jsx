import React from 'react';
import '../../style/Popup.css';
import { Form, NavLink, redirect, useSubmit } from 'react-router-dom';
import { addCategory } from '../../api/CategoriesApi';

export async function action({ request }) {

    console.log(request);

    const rawDataNewCategory = await request.formData()

    const newCategory = {
        name: rawDataNewCategory.get("name"),
    }

    await addCategory(newCategory)
    // console.log("newCategory success");
    return redirect('../')
}

export default function CategoriesAdd() {

    return (
        <div className='popup'>
            <div className='popup-inner'>
                {
                    <div className="container-fluid-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="fontBorderBottom">New Category</div>

                                <Form className="col-md-10" method="post" action="/Categories/Add" >

                                    <div className='label-input box-1'>
                                    <label className='label-box'>Category Name</label>
                                    <p className='input-required text-warning'>Required</p>
                                    </div>
                                    <input type='text' id='name' name='name' className='input-text' style={{padding: '0.5rem 1rem'}}/>

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







