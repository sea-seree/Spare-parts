import React, { useState } from "react";
import "../../style/Popup.css"
import { Form, NavLink, redirect, useSubmit } from "react-router-dom";
import { RiImageEditLine } from "react-icons/ri";
import { addPhotoToCloud } from "../../api/CloudApi";
import { addSupplier, getSuppliers } from "../../api/SuppliersApi";

export async function action({ request }) {

  const rawDataNewSupplier = await request.formData()

  let url = '';
  const photo = document.getElementById("photo").files
  const blankPhoto = "http://res.cloudinary.com/dif2wztfi/image/upload/v1705632920/o1cjz3kuiwoi6rwvcog3.png"

  if (document.getElementById("photo").files.length != 0
    && document.getElementById("filePhoto").value != null) {
    url = await addPhotoToCloud(photo);
  } else { url = blankPhoto }

  const newSupplier = {
    name: rawDataNewSupplier.get("name"),
    website: rawDataNewSupplier.get("website"),
    description: rawDataNewSupplier.get("description"),
    photo: url,
    contact: rawDataNewSupplier.get("contact"),
    phone: rawDataNewSupplier.get("phone"),
  }

  await addSupplier(newSupplier);

  return redirect('../');

}

export async function loader({ request }) {
  const suppliers = await getSuppliers();
  return { suppliers };
}

export default function SupplierAdd() {
  const [photo, setPhoto] = useState(null);
  let photoName = photo != null ? photo[0].name : null;
  const [fileBlank, setFileBlank] = useState();
  const submit = useSubmit();

  return (
    <div className="popup">
      <div className="popup-inner">
        {
          <div className="container-fluid-1">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h2 className='mt-4 text-white'>New Supplier</h2>
                <Form className="col-md-10" method="post" action="/Suppliers/Add">
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
                    placeholder="Macro"
                  />

                  <div className="label-input box-2">
                    <label htmlFor="website">Website</label>
                    <p className="required-input">Required</p>
                  </div>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    placeholder="google.com"
                  />

                  <div className="label-input box-3">
                    <label htmlFor="description">Description</label>
                    <p className="required-input">Required</p>
                  </div>
                  <textarea
                    rows="5"
                    id="description"
                    name="description"
                    placeholder="Your Description"
                  />

                  <div className="label-input box-4">
                    <label htmlFor="photo">Logo</label>
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

                  <hr className='text-secondary'/>
                  <h5 className="mt-3 text-white">CONTACT INFO</h5>

                  <div className="label-input box-5">
                    <label htmlFor="contact">Contact Name</label>
                    <p className="required-input">Required</p>
                  </div>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="John Doe"
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
                    placeholder="0123456789"
                  />

                  <div className='btnForSubmit'>
                    <button type="Submit">Submit</button>
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
  )

}
