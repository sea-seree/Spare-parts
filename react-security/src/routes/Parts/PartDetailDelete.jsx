import React from 'react';
import '../../style/Popup.css'
import { Form, NavLink, redirect, useLoaderData } from 'react-router-dom';
import { editPart, getPartById, deletePart } from '../../api/PartsApi';

export async function action({ params }) {
    await deletePart(params.PartId);
    return redirect('/Parts');
}

export async function loader({ params }) {
    const part = await getPartById(params.PartId);
    return { part };
}

export default function PartDetailDelete() {
    const { part } = useLoaderData();
    return (
        <div className='popup'>
            <div className='popup-inner'>
                {
                    <div className="container-fluid-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="fontBorderBottom">Delete Part</div>
                                <Form className="col-md-10" method="delete" action={`/Parts/PartDetail/${part.id}/Delete`} >
                                    <hr className='text-secondary' />

                                    <div className='label-input d-flex justify-content-center'>
                                        <p className="required-input">{`Do you want to delete this Part: ${part.name}`}</p>
                                    </div>

                                    <div className='btnForSubmit'>
                                        <button type="Submit">Delete</button>
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
