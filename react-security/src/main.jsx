import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './style/components.css'

import SidebarMenu from './routes/SidebarMenu';
import ErrorPage from './error-page';

import Index, {
  loader as indexLoader,
} from './routes';

import Parts, {
  loader as partLoader,
} from './routes/Parts/Parts';
import PartDetail, {
  loader as partDetailLoader
} from './routes/Parts/PartDetail';

import PartAdd, {
  action as partAddAction,
  loader as partAddLoader
} from './routes/Parts/PartAdd';
import PartDetailEdit, {
  action as partDetailEditAction,
  loader as partDetailEditLoader
} from './routes/Parts/PartDetailEdit';
import PartDetailDelete, {
  action as partDetailDeleteAction,
  loader as partDetailDeleteLoader
} from './routes/Parts/PartDetailDelete';

import Export, {
  action as exportAction,
  loader as exportLoader
} from './routes/Export/Export';

import Categories from './routes/Categories/Categories';
import { loader as CategoryLoader } from './routes/Categories/Categories';
import CategoryAdd, {
  action as categoryAddAction
} from './routes/Categories/CategoriesAdd';
import CategoryEdit, {
  action as categoryEditAction,
  loader as categoryEditLoader
} from './routes/Categories/CategoriesEdit';
import CategoryDelete, {
  action as categoryDeleteAction,
  loader as categoryDeleteLoader
} from './routes/Categories/CategoriesDelete';
import CategoryDetail, {
  loader as categoryDetailLoader
} from '../src/routes/Categories/CategoryDetail';

import Suppliers, {
  loader as supplierLoader,
} from './routes/Suppliers/Suppliers';
import SupplierAdd, {
  action as supplierAddAction
} from './routes/Suppliers/SupplierAdd'
import SupplierDetailEdit, {
  action as supplierDetailEditAction,
  loader as supplierDetailEditLoader
} from './routes/Suppliers/SupplierEdit'
import SupplierDetailDelete, {
  action as supplierDetailDeleteAction,
  loader as supplierDetailDeleteLoader
} from './routes/Suppliers/SupplierDelete'
import SupplierDetail, {
  loader as supplierDetailLoader
} from './routes/Suppliers/SupplierDetail'

import Orders, {
  loader as orderLoader
} from './routes/Orders/Orders';
import OrderAdd, {
  action as orderAddAction,
  loader as orderAddLoader
} from './routes/Orders/OrderAdd';
import OrderEditPopup, {
  action as orderEditPopupAction,
  loader as orderEditPopupLoader
} from './routes/Orders/OrderEdit';
import OrderDeletePopup, {
  action as orderDeleteAction,
  loader as orderDeleteLoader
} from './routes/Orders/OrderDelete';

import OrderDetail, {
  loader as orderDetailLoader
} from './routes/Orders/OrderDetail';

import Comparison, {
  loader as comparisonLoader
} from './routes/Compare/Compares';
import ComparePopup, {
  loader as comparePopupLoader
} from './routes/Compare/ComparePopup';

import UserManagements, {
  loader as userManagementsLoader
} from '../src/routes/UserManagement/UserManagement';
import UserAdd, {
  action as userAddAction,
  loader as userAddLoader
} from './routes/UserManagement/UserManagementAdd';

import Reports from './routes/Report/Reports';
import { loader as reportsLoader } from '../src/routes/Report/Reports';
import UserManagementDelete, {
  action as userDeleteAction,
  loader as userDeleteLoader
} from './routes/UserManagement/UserManagementDelete';
import UserManagementEdit, {
  action as userEditAction,
  loader as userEditLoader
} from './routes/UserManagement/UserManagementEdit';

import Users, {
  loader as usersLoader
} from './routes/Users/Users';

import ProfileInfo, {
  loader as profileLoader,
} from './routes/Profile/ProfileInfo';

import ProfileEdit, {
  action as profileEditlAction,
  loader as profileEditlLoader
} from './routes/Profile/ProfileEdit';



function nestedRoutes(routeNow, elementNow, depth) {

  if ((routeNow == 'PartDetail') && depth < 20) {
    return (
      <Route key="PartDetail" path="/PartDetail/:PartId/*" element={elementNow} loader={partDetailLoader}>
        <Route key="PartDetailEdit" path="Edit" element={<PartDetailEdit />} action={partDetailEditAction} loader={partDetailEditLoader} />
        <Route key="PartDetailDelete" path="Delete" element={<PartDetailDelete />} action={partDetailDeleteAction} loader={partDetailDeleteLoader} />
        <Route key="SupplierDetail" path="SupplierDetail/:SupplierId/*" element={<SupplierDetail />} loader={supplierDetailLoader}>
          <Route key="SupplierEdit" path="Edit" element={<SupplierDetailEdit />} action={supplierDetailEditAction} loader={supplierDetailEditLoader} />
          <Route key="SupplierDelete" path="Delete" element={<SupplierDetailDelete />} action={supplierDetailDeleteAction} loader={supplierDetailDeleteLoader} />
          {depth < 20 && nestedRoutes('SupplierDetail', <SupplierDetail depth={depth}/>, depth + 1)}
        </Route>
        <Route key="OrderDetail" path="OrderDetail/:OrderId/*" element={<OrderDetail />} loader={orderDetailLoader} >
        {depth < 20 && nestedRoutes('OrderDetail', <OrderDetail depth={depth}/>, depth + 1)}
        </Route>
      </Route>
    )
  }

  if ((routeNow == 'SupplierDetail') && depth < 20) {
    return (
      <Route key="SupplierDetail" path="/SupplierDetail/:SupplierId/*" element={elementNow} loader={supplierDetailLoader}>
        <Route key="SupplierEdit" path="Edit" element={<SupplierDetailEdit />} action={supplierDetailEditAction} loader={supplierDetailEditLoader} />
        <Route key="SupplierDelete" path="Delete" element={<SupplierDetailDelete />} action={supplierDetailDeleteAction} loader={supplierDetailDeleteLoader} />
        <Route key="PartDetail" path="PartDetail/:PartId/*" element={<PartDetail />} loader={partDetailLoader}>
          <Route key="PartDetailEdit" path="Edit" element={<PartDetailEdit />} action={partDetailEditAction} loader={partDetailEditLoader} />
          <Route key="PartDetailDelete" path="Delete" element={<PartDetailDelete />} action={partDetailDeleteAction} loader={partDetailDeleteLoader} />
          {depth < 20 && nestedRoutes('PartDetail', <PartDetail depth={depth}/>, depth + 1)}
        </Route>
        <Route key="OrderDetail" path="OrderDetail/:OrderId/*" element={<OrderDetail />} loader={orderDetailLoader} >
          {depth < 20 && nestedRoutes('OrderDetail', <OrderDetail depth={depth}/>, depth + 1)}
        </Route>
      </Route>
    )
  }

  if ((routeNow == 'OrderDetail') && depth < 20) {
    return (
      <Route key="OrderDetail" path="/OrderDetail/:OrderId/*" element={elementNow} loader={orderDetailLoader} >
        <Route key="PartDetail" path="PartDetail/:PartId/*" element={<PartDetail />} loader={partDetailLoader}>
          <Route key="PartDetailEdit" path="Edit" element={<PartDetailEdit />} action={partDetailEditAction} loader={partDetailEditLoader} />
          <Route key="PartDetailDelete" path="Delete" element={<PartDetailDelete />} action={partDetailDeleteAction} loader={partDetailDeleteLoader} />
          {depth < 20 && nestedRoutes('PartDetail', <PartDetail depth={depth}/>, depth + 1)}
        </Route>
        <Route key="SupplierDetail" path="SupplierDetail/:SupplierId/*" element={<SupplierDetail />} loader={supplierDetailLoader}>
          <Route key="SupplierEdit" path="Edit" element={<SupplierDetailEdit />} action={supplierDetailEditAction} loader={supplierDetailEditLoader} />
          <Route key="SupplierDelete" path="Delete" element={<SupplierDetailDelete />} action={supplierDetailDeleteAction} loader={supplierDetailDeleteLoader} />
          {depth < 20 && nestedRoutes('SupplierDetail', <SupplierDetail depth={depth}/>, depth + 1)}
        </Route>
      </Route>
    )
  }
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route key="SidebarMenu" path="/" element={<SidebarMenu />} errorElement={<ErrorPage />}>
      <Route key="index" index element={<Index />} loader={indexLoader} />

      <Route key="Parts" path="Parts/*" element={<Parts />} loader={partLoader} >
        <Route key="PartAdd" path="Add" element={<PartAdd />} action={partAddAction} loader={partAddLoader} />
      </Route>
      <Route key="PartDetail" path="Parts/PartDetail/:PartId/*" element={<PartDetail />} loader={partDetailLoader}>
        <Route key="PartDetailEdit" path="Edit" element={<PartDetailEdit />} action={partDetailEditAction} loader={partDetailEditLoader} />
        <Route key="PartDetailDelete" path="Delete" element={<PartDetailDelete />} action={partDetailDeleteAction} loader={partDetailDeleteLoader} />
        {nestedRoutes('PartDetail', 1)}
      </Route>
      

      <Route key="Categories" path="Categories/*" element={<Categories />} loader={CategoryLoader}>
        <Route key="CategoriesAdd" path="Add" element={<CategoryAdd />} action={categoryAddAction} />
        <Route key="CategoriesEdit" path=":CategoryId/Edit" element={<CategoryEdit />} action={categoryEditAction} loader={categoryEditLoader} />
        <Route key="CategoriesDelete" path=":CategoryId/Delete" element={<CategoryDelete />} action={categoryDeleteAction} loader={categoryDeleteLoader} />
      </Route>
      <Route key="CategoryDetail" path="Categories/CategoryDetail/:CategoryId" element={<CategoryDetail />} loader={categoryDetailLoader} />

      <Route key="Suppliers" path="Suppliers/*" element={<Suppliers />} loader={supplierLoader} >
        <Route key="SupplierAdd" path="Add" element={<SupplierAdd />} action={supplierAddAction} />
      </Route>
      <Route key="SupplierDetail" path="/Suppliers/SupplierDetail/:SupplierId" element={<SupplierDetail />} loader={supplierDetailLoader}>
        <Route key="SupplierEdit" path="Edit" element={<SupplierDetailEdit />} action={supplierDetailEditAction} loader={supplierDetailEditLoader} />
        <Route key="SupplierDelete" path="Delete" element={<SupplierDetailDelete />} action={supplierDetailDeleteAction} loader={supplierDetailDeleteLoader} />
      </Route>

      <Route key="Orders" path="Orders/*" element={<Orders />} loader={orderLoader} >
        <Route key="OrderAdd" path="Add" element={<OrderAdd />} action={orderAddAction} loader={orderAddLoader} />
        <Route key="OrderEdit" path=":OrderId/Edit" element={<OrderEditPopup />} action={orderEditPopupAction} loader={orderEditPopupLoader} />
        <Route key="OrderDelete" path=":OrderId/Delete" element={<OrderDeletePopup />} action={orderDeleteAction} loader={orderDeleteLoader} />
      </Route>
      <Route key="OrderDetail" path="Orders/OrderDetail/:OrderId" element={<OrderDetail />} loader={orderDetailLoader} />

      <Route key="Comparison" path="Comparison/*" element={<Comparison />} loader={comparisonLoader}>
        <Route key="Compare" path="Compare/:PartsId" element={<ComparePopup />} loader={comparePopupLoader} />
      </Route>

      <Route key="Report" path="Reports/" element={<Reports />} loader={reportsLoader} />

      <Route key="Export" path="Export/" element={<Export />} loader={exportLoader} action={exportAction} />

      <Route key="Users" path="Users/" element={<Users />} loader={usersLoader} />

      <Route key="UserManagement" path="UserManagement/*" element={<UserManagements />} loader={userManagementsLoader}>
        <Route key="UserAdd" path="Add" element={<UserAdd />} loader={userAddLoader} action={userAddAction} />
        <Route key="UserManagementEdit" path=":userId/Edit" element={<UserManagementEdit />} loader={userEditLoader} action={userEditAction} />
        <Route key="UserManagementDelete" path=":userId/Delete" element={<UserManagementDelete />} loader={userDeleteLoader} action={userDeleteAction} />
      </Route>

      <Route key="ProfileInfo" path="ProfileInfo/*" element={<ProfileInfo />} loader={profileLoader} >
        <Route key="ProfileEdit" path=":userId/Edit" element={<ProfileEdit />} loader={profileEditlLoader} action={profileEditlAction} />
      </Route>
    </Route>
  )
);

function MyMain() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default MyMain;

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//     {/* <App /> */}
//   </React.StrictMode>
// );
