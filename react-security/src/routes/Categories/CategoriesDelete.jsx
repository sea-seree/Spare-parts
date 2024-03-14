import React from 'react';
import '../../style/Popup.css';
import { Form, NavLink, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { deleteCategory, getCategoryById } from '../../api/CategoriesApi';

export async function action({ params }) {

    await deleteCategory(params.CategoryId);
    return redirect('/Categories');
}

export async function loader({ params }) {
    const category = await getCategoryById(params.CategoryId);
    return { category }
}

export default function CategoriesDelete() {

    const { category } = useLoaderData();

    return(
        <div className='popup'>
            <div className='popup-inner'>
                {
                    <div className="container-fluid-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">

                                <Form className='col-md-10' method='delete' action={`/Categories/${category.id}/Delete`}>
                                    <div className='fontBorderBottom' style={{ color: 'rgb(249, 148, 23)', textAlign: 'center' }} >Delete this Category</div>

                                    <div className='label-input' style={{display: 'flex', justifyContent:'center', marginTop: '1rem'}}>
                                        <p className="required-input">{`Do you want to delete this Category: ${category.name}`}</p>
                                    </div>

                                    <div className='btnForSubmit'>

                                        <button type="submit">OK</button>

                                        <NavLink to="../">
                                            <button type="cancel" style={{margin: '0 0 0 5rem'}} >Cancel</button>
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

