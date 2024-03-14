import React, { useEffect, useState } from 'react';
import "../../style/Export/Export.css"
import { getCategories } from '../../api/CategoriesApi';
import { getPartById, getParts } from '../../api/PartsApi';
import { getOrders } from '../../api/OrdersApi';
import { getSuppliers } from '../../api/SuppliersApi';
import { Form, NavLink, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { getCategoriesAllExport, getCategoriesExport, getCategoryBySuppliersExport, getOrdersExport, getOrdersbyPointToEndExport, getOrdersbyPointToPointExport, getOrdersbyStartToPointExport, getPartByIdExport, getPartsByCategoryExport, getPartsBySupplierAndCategoryExport, getPartsBySupplierExport, getPartsExport, getSupplierByCategoriesExport, getSuppliersAllExport, getSuppliersExport } from '../../api/ExportApi';
import { saveAs } from 'file-saver'

export async function action({ request, params }) {
    const rawDataForm = await request.formData()

    const rawData = {
        section: rawDataForm.get("section"),
        checkbox: rawDataForm.get("checkbox"),
        supplier: rawDataForm.get("supplier"),
        category: rawDataForm.get("category"),
        part: rawDataForm.get("part"),
        dateFrom: rawDataForm.get("dateFrom"),
        dateTo: rawDataForm.get("dateTo"),
    }
    console.log(rawData.dateFrom, rawData.dateTo);
    let exportData = {};
    if (['Parts', 'Categories', 'Suppliers', 'Orders'].includes(rawData.section)) {
        if (rawData.checkbox == "on") {
            if (['Parts'].includes(rawData.section)) {
                exportData = await getPartsExport();
            }
            if (['Categories'].includes(rawData.section)) {
                exportData = await getCategoriesExport();
            }
            if (['Suppliers'].includes(rawData.section)) {
                exportData = await getSuppliersExport();
            }
            if (['Orders'].includes(rawData.section)) {
                exportData = await getOrdersExport();
            }
        }
        else {
            if (['Parts'].includes(rawData.section) && rawData.part == 'All') {
                if ((rawData.supplier != 'All') && (rawData.category != 'All')) {
                    exportData = await getPartsBySupplierAndCategoryExport(rawData.supplier, rawData.category);
                } else if ((rawData.supplier == 'All') && (rawData.category != 'All')) {
                    exportData = await getPartsByCategoryExport(rawData.category);
                } else if ((rawData.supplier != 'All') && (rawData.category == 'All')) {
                    exportData = await getPartsBySupplierExport(rawData.supplier);
                } else {
                    exportData = await getPartsExport();
                }
            } else if (['Parts'].includes(rawData.section) && rawData.part != 'All') {
                exportData = await getPartByIdExport(rawData.part);
            }
            if (['Categories'].includes(rawData.section) && rawData.supplier == 'All') {
                exportData = await getCategoriesAllExport();
            } else if (['Categories'].includes(rawData.section) && rawData.supplier != 'All') {
                exportData = await getCategoryBySuppliersExport(rawData.supplier);
            }
            if (['Suppliers'].includes(rawData.section) && rawData.category == 'All') {
                exportData = await getSuppliersAllExport();
            } else if (['Suppliers'].includes(rawData.section) && rawData.category != 'All') {
                exportData = await getSupplierByCategoriesExport(rawData.category);
            }
            if (['Orders'].includes(rawData.section) 
            && (rawData.dateFrom == 'Date From' && rawData.dateTo == 'Date To')) {
                exportData = await getOrdersExport();
            } else if (['Orders'].includes(rawData.section)
            && (rawData.dateFrom == 'Date From' && rawData.dateTo != 'Date To')) {
                exportData = await getOrdersbyStartToPointExport(rawData.dateTo);
            } else if (['Orders'].includes(rawData.section)
            && (rawData.dateFrom != 'Date From' && rawData.dateTo == 'Date To')) {
                exportData = await getOrdersbyPointToEndExport(rawData.dateFrom);
            } else if (['Orders'].includes(rawData.section)
            && (rawData.dateFrom != 'Date From' && rawData.dateTo != 'Date To')) {
                exportData = await getOrdersbyPointToPointExport(rawData.dateFrom,rawData.dateTo);
            }

        }
    }

    console.log(exportData);
    redirect('/Export')

    return { exportData };

}

export async function loader({ request, params }) {
    const parts = await getParts();
    const categories = await getCategories();
    const suppliers = await getSuppliers();
    const orders = await getOrders();

    return { parts, categories, suppliers, orders };
}

export default function Export() {
    const { parts, categories, suppliers, orders } = useLoaderData();
    const { exportData } = useActionData() || [{}];
    const [checked, setChecked] = useState('checked');
    const [filter, setFilter] = useState([true, true, true, true]);
    const [sectionHasSelect, setSectionHasSelect] = useState(false);

    return (
        <div className='col-10'>
            <div className='Export'>
                <div className='Explore'>
                    <h3 className="topic">Export Data</h3>
                    <div className="content">
                        <Form id="formExport" method="post" action={`/Export`}
                            onChange={(e) => {
                                if (document.getElementById("section").value == 'Choose Section') {
                                    setFilter([true, true, true, true]);
                                    setSectionHasSelect(false);
                                }
                                else if (['Parts', 'Categories', 'Suppliers', 'Orders'].includes(document.getElementById("section").value)) {
                                    if (document.getElementById("checkbox").checked == true) {
                                        setFilter([true, true, true, true]);
                                        setSectionHasSelect(true);
                                        document.getElementById("supplier").value = 'All'
                                        document.getElementById("category").value = 'All'
                                        document.getElementById("part").value = 'All'
                                        document.getElementById("dateFrom").value = 'Date From'
                                        document.getElementById("dateTo").value = 'Date To'
                                    }
                                    else if (document.getElementById("checkbox").checked == false) {
                                        if (['Parts'].includes(document.getElementById("section").value)) {
                                            setFilter([false, false, false, true]);
                                            setSectionHasSelect(true)
                                            if (document.getElementById("part").value != 'All') {
                                                setFilter([true, true, false, true]);
                                                setSectionHasSelect(true)
                                            }
                                            document.getElementById("dateFrom").value = 'Date From'
                                            document.getElementById("dateTo").value = 'Date To'
                                        }
                                        if (['Suppliers'].includes(document.getElementById("section").value)) {
                                            setFilter([true, false, true, true]);
                                            setSectionHasSelect(true)
                                            document.getElementById("supplier").value = 'All'
                                            document.getElementById("part").value = 'All'
                                            document.getElementById("dateFrom").value = 'Date From'
                                            document.getElementById("dateTo").value = 'Date To'
                                        }
                                        if (['Categories'].includes(document.getElementById("section").value)) {
                                            setFilter([false, true, true, true]);
                                            setSectionHasSelect(true)
                                            document.getElementById("category").value = 'All'
                                            document.getElementById("part").value = 'All'
                                            document.getElementById("dateFrom").value = 'Date From'
                                            document.getElementById("dateTo").value = 'Date To'
                                        }

                                        if (['Orders'].includes(document.getElementById("section").value)) {
                                            setFilter([true, true, true, false]);
                                            setSectionHasSelect(true)

                                            if (document.getElementById("dateFrom").value == 'Date From') {
                                                for (let i = 1; i <= orders.length; i++) {
                                                    let selectdateToElement = document.getElementById("dateTo")
                                                    let optiondateTo = selectdateToElement.options[i];
                                                    optiondateTo.style.display = '';
                                                }
                                            } else if (document.getElementById("dateFrom").value != 'Date From'){
                                                for (let i = 1; i <= document.getElementById("dateFrom").value; i++) {
                                                    let selectElement = document.getElementById("dateTo")
                                                    let optionToToggle = selectElement.options[i];
                                                    optionToToggle.style.display = 'none';
                                                }
                                            }
                                            if (document.getElementById("dateTo").value == 'Date To') {
                                                for (let i = 1; i <= orders.length; i++) {
                                                    let selectdateToElement = document.getElementById("dateFrom")
                                                    let optiondateTo = selectdateToElement.options[i];
                                                    optiondateTo.style.display = '';
                                                }
                                            } else if (document.getElementById("dateTo").value != 'Date To'){
                                                for (let i = document.getElementById("dateTo").value; i <= orders.length; i++) {
                                                    let selectElement = document.getElementById("dateFrom")
                                                    let optionToToggle = selectElement.options[i];
                                                    optionToToggle.style.display = 'none';
                                                }
                                            }

                                            if (document.getElementById("dateFrom").value != 'Date From' 
                                                && document.getElementById("dateTo").value != 'Date To'){

                                                for (let i = 1; i < document.getElementById("dateTo").value; i++) {
                                                    let selectElement = document.getElementById("dateFrom")
                                                    let optionToToggle = selectElement.options[i];
                                                    optionToToggle.style.display = '';
                                                }
                                                for (let i = document.getElementById("dateFrom").value+1; i <= orders.length; i++) {
                                                    let selectElement = document.getElementById("dateTo")
                                                    let optionToToggle = selectElement.options[i];
                                                    optionToToggle.style.display = '';
                                                }
                                            }



                                        }
                                    }
                                };


                            }}>
                            <div className="content-body">
                                <div className='label-input mb-3'>
                                    <label>Section</label>
                                    <select className="selection ps-2" id="section" name="section">
                                        <option index="true" value='Choose Section'>Choose Section</option>
                                        <option value='Parts'>Parts</option>
                                        <option value='Categories'>Categories</option>
                                        <option value='Suppliers'>Suppliers</option>
                                        <option value='Orders'>Orders</option>
                                    </select>
                                </div>

                                <div className='label-input mb-3'>
                                    <label>Filter </label>
                                    <label className='selection'>
                                        <input id="checkbox" name="checkbox" className='form-check-input me-2' type="checkbox"
                                            defaultChecked={checked}
                                            onChange={(e) => {
                                                setChecked(checked == 'checked' ? null : 'checked');
                                            }} />
                                        All
                                    </label>
                                </div>

                                <div className='label-input-filter mb-3'>
                                    <label className='mb-2'>Supplier</label>
                                    <select className="selection-filter ps-2" id="supplier" name="supplier" disabled={filter[0]}>
                                        <option index="true" >All</option>
                                        {
                                            suppliers.map((supplier) => {
                                                return (
                                                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className='label-input-filter mb-3'>
                                    <label className='mb-2'>Category</label>
                                    <select className="selection-filter ps-2" id="category" name="category" defaultValue="All" disabled={filter[1]}>
                                        <option index="true">All</option>
                                        {
                                            categories.map((category) => {
                                                return (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className='label-input-filter mb-3'>
                                    <label className='mb-2'>Part</label>
                                    <select className="selection-filter ps-2" id="part" name="part" disabled={filter[2]}
                                        onChange={async (e) => {
                                            if (document.getElementById("part").value != 'All') {
                                                const part = await getPartById(document.getElementById("part").value);
                                                document.getElementById("category").value = part.category.id;
                                                document.getElementById("supplier").value = part.supplier.id;
                                            }
                                        }}>
                                        <option index="true" >All</option>
                                        {
                                            parts.map((part) => {
                                                return (
                                                    <option key={part.id} value={part.id}>{part.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className='label-input-filter mb-3'>
                                    <label className='mb-2'>Date</label>
                                    <select className="selection-filter ps-2 mb-2" id="dateFrom" name="dateFrom" disabled={filter[3]}>
                                        <option index="true" >Date From</option>
                                        {
                                            orders.map((order) => {
                                                return (
                                                    <option key={`dateFrom ${order.id}`} value={order.id}>{order.datetime} </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <select className="selection-filter ps-2" id="dateTo" name="dateTo" disabled={filter[3]}
                                    >
                                        <option index="true" >Date To</option>
                                        {
                                            orders.map((order) => {
                                                return (
                                                    <option key={`dateTo ${order.id}`} value={order.id}>{order.datetime}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='btn-export'>
                                <button type="Submit" disabled={!sectionHasSelect} >Explore Data</button>
                            </div>
                        </Form>

                    </div>

                </div>

                {(exportData != undefined) && (exportData != '') ?
                    <div className='Export-data'>
                        <div className='content'>
                            <div className='content-body'>
                                <div className='exportTo'>
                                    <CSVLink className="btn-exportTo CSV" data={exportData != undefined ? exportData : [{}]}>
                                        CSV
                                    </CSVLink>
                                    <button className="btn-exportTo JSON" onClick={(e)=>{
                                        let file = new Blob([(exportData != undefined ? JSON.stringify(exportData) : [{}])], {type: 'application/json'});
                                        saveAs(file, 'SPI_export.json')
                                    }}>
                                        JSON
                                    </button>
                                </div>
                                <div className="table-responsive">
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                {
                                                    Object.keys(exportData[0]).map((key) => {
                                                        return (<th key={key} scope="key">{key}</th>)
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                exportData.map((data) => {
                                                    let index = 0;
                                                    return (
                                                        <tr key={data.index} className="active-row">
                                                            {Object.values(data).map((supData) => {
                                                                return (
                                                                    <td key={`${index++}${supData}`} scope="row">{supData}</td>
                                                                )
                                                            })}
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}

            </div>
        </div>
    );
}