import React from 'react';
import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
// import { getRelativePosition } from 'chart.js/helpers';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, defaults } from "chart.js/auto"
import { getParts } from '../api/PartsApi';
import { getUsers } from '../api/UserApi';
import { getOrders } from '../api/OrdersApi';
import { getCategories } from '../api/CategoriesApi';
import { getSuppliers } from '../api/SuppliersApi'
import '../style/Index/Index.css'

defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";


export async function loader({ request }) {

  const parts = await getParts();
  const categories = await getCategories();
  const userManagements = await getUsers();
  const suppliers = await getSuppliers();
  const orders = await getOrders();

  return { parts, categories, userManagements, suppliers, orders };
}

export default function Index() {
  const { parts, categories, userManagements, suppliers, orders } = useLoaderData();


  function findCurrentInventory(part) {
    let currentInventory = 0;
    orders.map((order) => {
      if (order.part.id == part.id) {
        if (order.type == 'output' || order.type == 'usage') {
          currentInventory += (- order.quantity);
        } else if (order.type == 'input') {
          currentInventory += order.quantity;
        }
      }
    })
    return currentInventory;
  }


  // เรียงลำดับ parts ตาม currentInventory จากมากไปน้อย
  const sortedParts = parts.sort((a, b) => findCurrentInventory(a) - findCurrentInventory(b));

  // นำเฉพาะ 5 อันดับแรก
  const less5Parts = sortedParts.slice(0, 5);


  const mappedData = orders.reduce((result, order) => {
    const orderDate = new Date(order.datetime).toLocaleDateString();
    if (!result[orderDate]) {
      result[orderDate] = { date: orderDate, count: 1 };
    } else {
      result[orderDate].count += 1;
    }
    return result;
  }, {});


  const usersTotalOrders = orders.reduce((acc, order) => {
    const userFirstname = order.user.firstname;
    const userLastname = order.user.lastname;
    const existingUser = acc.find(user => user.userFirstname === userFirstname
      && user.userLastname === userLastname);

    if (existingUser) {
      existingUser.totalOrders += order.part.price * order.quantity;
    } else {
      acc.push({
        userFirstname,
        userLastname,
        totalOrders: order.part.price * order.quantity,
      });
    }

    return acc;
  }, []);

  return (
    // ทั้งหมด
    <div className='col-10 mt-4 '>

      <div className='Index px-5'>
        {/* <h2 className="mb-3">Overview</h2> */}
        <div className='content'>


          {/* Low */}
          <div className="container upper-section mb-3">
            <div className='parts'>
              <h3 className="parts-topic d-flex justify-content-start">Items low on stock</h3>
              {less5Parts.map((part) => {
                let currentInventory = findCurrentInventory(part);
                return (
                  <div className="parts-body">
                    <NavLink to={`Parts/PartDetail/${part.id}`} className="text-decoration-none">
                      <li className="lower-list">
                        <div className="div-left">
                          <div>
                            <img src={part.photo} className="photo-parts" />
                          </div>
                          <div className="desc-parts">
                            <p className="fs-5 fw-bold">{`${part.name}`}</p>
                            <p className="fs-6 fw-normal text-black-50">{`${part.supplier.name}`}</p>
                            <p className="fs-6 fw-bold text-black-75">{`${currentInventory} units`}</p>
                          </div>
                        </div>
                        <div className="div-right">
                          <div className="icon-arrow">
                            <i className="bi bi-chevron-right"></i>
                          </div>
                        </div>
                      </li>
                    </NavLink>
                  </div>
                )
              })}
            </div>
          </div>
          {/* กราฟ */}
          <div className='rounded border border-2 mb-4 p-4 w-100'>
            <Line
              data={{
                labels: Object.values(mappedData).map((item) => item.date),
                datasets: [
                  {
                    label: 'Count',
                    data: Object.values(mappedData).map((item) => item.count),
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                      "rgba(250, 192, 19, 0.8)",
                    ],
                    borderRadius: 5,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Order per day",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
