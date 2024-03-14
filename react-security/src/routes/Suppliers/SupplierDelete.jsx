import React from 'react';
import '../../style/Popup.css'
import { Form, NavLink, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { RiImageEditLine } from 'react-icons/ri';
import { deleteSupplier, getSupplierById } from '../../api/SuppliersApi';

export async function action({ params }) {
await deleteSupplier(params.SupplierId);
    return redirect('/Suppliers');
}

export async function loader({ params }) {
const supplier = await getSupplierById(params.SupplierId);
    return { supplier };
}

export default function SupplierDelete() {
    const { supplier } = useLoaderData();

    return (
        <div className='popup'>
            <div className='popup-inner'>
                {
                    <div className="container-fluid-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className='fontBorderBottom mt-4'>Delete this Supplier</div>
                                <Form className="col-md-10" method='delete' action={`/Suppliers/SupplierDetail/${supplier.id}/Delete`}>
                                    <hr className='text-secondary'/>
                                    <div className='label-input d-flex justify-content-center'>
                                        <p className='required-input'>{`Do you want to delete this Supplier: ${supplier.name}`}</p>
                                    </div>
                                    
                                    <div className="btnForSubmit">
                                        <button type="submit">Delete</button>
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
    );
}