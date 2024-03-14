import React, { useState } from 'react';
import '../../style/Popup.css'
import { Form, NavLink, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { RiImageEditLine } from 'react-icons/ri';
import { editSupplier, getSupplierById, getSuppliers } from '../../api/SuppliersApi';
import { addPhotoToCloud } from '../../api/CloudApi';

export async function action({ request, params }) {

  const rawDataNewSupplier = await request.formData()
  const supplier = await getSupplierById(params.SupplierId);
  let url = '';
  const blankPhoto = "http://res.cloudinary.com/dif2wztfi/image/upload/v1705632920/o1cjz3kuiwoi6rwvcog3.png"

  if (document.getElementById("photo").files.length != 0
    && document.getElementById("filePhoto").value != null) {
    const photo = document.getElementById("photo").files;
    url = await addPhotoToCloud(photo);
  } else if (document.getElementById("deletePhoto").value == 'deletePhoto') {
    url = blankPhoto
  }
  else { url = supplier.photo }

  const newSupplier = {
    id: params.SupplierId,
    name: rawDataNewSupplier.get("name"),
    website: rawDataNewSupplier.get("website"),
    description: rawDataNewSupplier.get("description"),
    photo: url,
    contact: rawDataNewSupplier.get("contact"),
    phone: rawDataNewSupplier.get("phone"),
  }

  await editSupplier(newSupplier);

  return redirect('../');
}

export async function loader({ request, params }) {
  const supplier = await getSupplierById(params.SupplierId);
  return { supplier };
}

export default function SupplierEdit() {
  const { supplier } = useLoaderData();
  const [photo, setPhoto] = useState(null);
  const [fileBlank, setFileBlank] = useState();
  let photoName = photo != null ? photo[0].name : null;
  let newSupplier = supplier;
  const submit = useSubmit();

  return (
    <div className="popup">
      <div className="popup-inner">
        {
          <div className="container-fluid-1">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h2 className='mt-4 text-white'>Edit Supplier</h2>

                <Form className="col-md-10" method='post' action={`/Suppliers/SupplierDetail/${supplier.id}/Edit`}>
                  <hr className='text-secondary' />
                  <h5 className="mt-3 text-white">COMPANY INFO</h5>

                  <div className="label-input box-1">
                    <label htmlFor="name">Name</label>
                    <p className="required-input">Required</p>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={newSupplier.name}
                  />

                  <div className="label-input box-2">
                    <label htmlFor="website">Website</label>
                    <p className="required-input">Required</p>
                  </div>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    defaultValue={newSupplier.website}
                  />

                  <div className="label-input box-3">
                    <label htmlFor="desc">Description</label>
                    <p className="required-input">Required</p>
                  </div>
                  <input
                    rows="5"
                    id="description"
                    name="description"
                    defaultValue={newSupplier.description}
                  />

                  <div className="label-input box-4">
                    <div>
                      <label htmlFor="photo">Logo</label>

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
                    <p className="ignore">Required</p>
                  </div>

                  <label htmlFor="photo">
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

                  <h5 className="mt-3 text-white">CONTACT INFO</h5>

                  <div className="label-input box-5">
                    <label htmlFor="contact">Contact Name</label>
                    <p className="required-input">Required</p>
                  </div>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    defaultValue={newSupplier.contact}
                  />

                  <div className="label-input box-6">
                    <label htmlFor="phone">Phone number</label>
                    <p className="required-input">Required</p>
                  </div>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{10}"
                    defaultValue={newSupplier.phone}
                  />

                  <div className="d-flex justify-content-around my-4">
                    <button
                      type="submit"

                    >
                      Submit
                    </button>
                    <NavLink to="../">
                      <button
                        type="cancel"

                      >
                        Cancel
                      </button>
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