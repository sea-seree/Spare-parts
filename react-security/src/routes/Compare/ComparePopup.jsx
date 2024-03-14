import React from "react";
import "../../style/Popup.css"
import { Form, NavLink, useLoaderData, useSubmit } from "react-router-dom";
import { getPartById, getParts } from "../../api/PartsApi";
import { CSVLink } from "react-csv";
import { saveAs } from 'file-saver';

export async function loader({ params }) {

    const partsId = params.PartsId.split('p')
    let partsIdExport = [];
    let num = 1;
    partsId.map(async (str) => {
        
        const index = partsId.indexOf(str);
        partsId[index] = await getPartById(parseInt(str));
        partsIdExport.push({
            index: num++,
            part: partsId[index].name,
            category: partsId[index].category.name,
            supplier: partsId[index].supplier.name,
            price: partsId[index].price,
        })
    })

    return { partsId, partsIdExport };
}

export default function ComparePopup() {
    const { partsId, partsIdExport } = useLoaderData()

    return (
        <div className='popup'>
            
            <div className='popup-inner'>
                {
                    <div className="container-fluid-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="fontBorderBottom">Comparison Result</div>
                                <Form method="post" action="/Parts/Add" >
                                    <hr className='text-secondary' />
                                    <div className="ComparesPopup">
                                    <div className="content">
                                        <div className="container-topic text-color">
                                            {partsId[0].category.name}
                                        </div>
                                        <div className="container-card-popup">
                                        {
                                            partsId.map((part) => {
                                                return (
                                                    <div key={`popup${part.name}`}
                                                        className="card">
                                                        <img key={`imgpopup${part.name}`} src={`${part.photo}`} className="card-photo-top-pop shadow-none" />
                                                        <div className="card-body">
                                                            <p className="fs-5 fw-bold">{`${part.name}`}</p>
                                                            <p className="fs-6 fw-normal text-black-50">{`${part.supplier.name}`}</p>
                                                            <p className="fs-6 fw-bold text-black-75">{`฿ ${part.price}`}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ComparesPopup exportTo'>
                                        <div className="d-flex justify-content-center">
                                            <CSVLink to ="../" className="btn-exportTo CSV my-1" data={partsIdExport != undefined ? partsIdExport : [{}]}>
                                                CSV
                                            </CSVLink>
                                            <NavLink className="btn-exportTo JSON my-1" to ="../" onClick={(e) => {
                                                let file = new Blob([(partsIdExport != undefined ? JSON.stringify(partsIdExport) : [{}])], { type: 'application/json' });
                                                saveAs(file, 'SPI_export.json');
                                            }}>
                                                JSON
                                            </NavLink>
                                        </div>
                                        <NavLink to="../" className="d-flex justify-content-center text-decoration-none my-2" >
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
