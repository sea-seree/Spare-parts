import React from 'react';
import '../../style/Popup.css'
import { Form, NavLink, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { editCategory, getCategories, getCategoryById } from '../../api/CategoriesApi';

export async function action({ request, params }) {


    // console.log(params.CategoryId);

    const rawDataNewCategory = await request.formData()

    const newCategory = {
        id: params.CategoryId,
        name: rawDataNewCategory.get("name"),
    }

    await editCategory(newCategory)
    // console.log("newCategory success");
    return redirect('../')
}

export async function loader( {params} ) {

    const category = await getCategoryById(params.CategoryId);

    return { category };
}

export default function CategoriesEdit() {

    const { category } = useLoaderData();

    // console.log(category);

    return (
        <div className='popup'>
            <div className='popup-inner'>
                {
                    <div className="container-fluid-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">

                                <div className='fontBorderBottom' style={{ color: 'rgb(249, 148, 23)' }}>Edit Category</div>

                                <Form className='col-md-10' method='post' action={`/Categories/${category.id}/Edit`}>
                                    <div className='label-input box-1'>
                                        <label className='label-box'>Category Name</label>
                                        <p className='input-required' style={{ color: 'rgb(249, 148, 23)' }}>Required</p>
                                    </div>

                                    <input type='text' id='name' name='name' className='input-text' style={{padding: '0.5rem 1rem'}} defaultValue={category.name}/>


                                    <div className='btnForSubmit'>

                                        <button type="submit" className='me-5'>Submit</button>

                                        <NavLink to="../">
                                            <button type="cancel" className='ms-5'>cancel</button>
                                        </NavLink>
                                    </div>

                                </Form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}


{/* <div className="col-md-8">
    <div className="fontBorderBottom">New Category</div>

    <Form className="col-md-10" method="post" action="/Categories/Add" >

        <div className='label-input box-1'>
            <label className='label-box'>Category Name</label>
            <p className='input-required text-warning'>Required</p>
        </div>
        <input type='text' id='name' name='name' className='input-text' style={{ padding: '0.5rem 0' }} />

        <div className='btnForSubmit'>
            <button type="Submit">Submit</button>
            <NavLink to="../">
                <button type="Cancel">cancel</button>
            </NavLink>
        </div>
    </Form>
</div> */}
