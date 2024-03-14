import React from 'react';
import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
// import { getRelativePosition } from 'chart.js/helpers';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, defaults } from "chart.js/auto"
import { getParts } from '../../api/PartsApi';
import { getUsers } from '../../api/UserApi';
import { getOrders } from '../../api/OrdersApi';
import { getCategories } from '../../api/CategoriesApi';
import { getSuppliers } from '../../api/SuppliersApi'



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

export default function Reports() {
  const { parts, categories, userManagements, suppliers, orders } = useLoaderData();

  
  function findCurrentInventory(part){
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
  const sortedParts = parts.sort((a, b) => findCurrentInventory(b) - findCurrentInventory(a));

  // นำเฉพาะ 5 อันดับแรก
  const top5Parts = sortedParts.slice(0, 5);

  const sortedPartsless = parts.sort((a, b) => findCurrentInventory(a) - findCurrentInventory(b));

  // นำเฉพาะ 5 อันดับแรก
  const less5Parts = sortedPartsless.slice(0, 5);


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

      <div className='Report-page px-5'>
      <h2 className="mb-3">Report</h2>
        {/* กราฟ */}
        <div className="rounded border border-2 mb-4 p-4">
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
        </div >
        <div className="d-flex">
        {/* โดนัท */}
        <div className='rounded border border-2 mb-4 p-4 me-5 w-50'>
          <Doughnut
            data={{
              labels: top5Parts.map((part) => part.name),
              datasets: [
                {
                  label: 'Count',
                  data: top5Parts.map((part) => findCurrentInventory(part)),
                  backgroundColor: [
                    "rgba(221, 160, 221, 0.8)",  // Pastel Purple
                    "rgba(144, 238, 144, 0.8)",  // Pastel Green
                    "rgba(255, 218, 185, 0.8)",  // Pastel Peach
                    "rgba(255, 192, 203, 0.8)",  // Pastel Pink
                    "rgba(150, 251, 152, 0.8)",   // Pastel Mint Green                 
                    "rgba(123, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                  ],
                  cutoutPercentage: 60,
                  radius: '80%',
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Most popular items (quantity)",
                },
              },
            }}
          />
        </div>



        {/* เส้น1 */}
        <div className='rounded border border-2 mb-4 p-4 w-50 d-flex align-items-center'>
          <Bar
            data={{
              labels: usersTotalOrders.map(userOrder => `${userOrder.userFirstname} ${userOrder.userLastname}`),
              datasets: [
                {
                  label: 'Total orders',
                  data: usersTotalOrders.map(userOrder => userOrder.totalOrders),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                  ],
                  barThickness: 100, // Adjust the thickness of the bars
                  maxBarThickness: 80, // Set the maximum thickness of the bars
                  categoryPercentage: 0.8, // Adjust the width of each category
                  barPercentage: 0.9, // Adjust the width of each bar in a category
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Summary total order by user",
                },
              },
            }}
          />
        </div>
        </div>


        {/* เส้น1 */}
        <div className='rounded border border-2 mb-4 p-4 '>
          <Bar
            data={{
              labels: orders.map((order) => order.part.name),
              datasets: [
                {
                  label: 'Total orders',
                  data: orders.map((order) => {
                    return (order.part.price * order.quantity)
                  }),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                  ],
                  borderRadius: 0.6,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Total orders of each part",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
