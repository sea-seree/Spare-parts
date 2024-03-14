import React from 'react';
import Parts, {
  loader as partLoader,
} from '../../routes/Parts/Parts';
import PartDetail, {
  loader as partDetailLoader
} from '../../routes/Parts/PartDetail';

import PartAdd, {
  action as partAddAction,
  loader as partAddLoader
} from '../../routes/Parts/PartAdd';
import PartDetailEdit, {
  action as partDetailEditAction,
  loader as partDetailEditLoader
} from '../../routes/Parts/PartDetailEdit';
import PartDetailDelete, {
  action as partDetailDeleteAction,
  loader as partDetailDeleteLoader
} from '../../routes/Parts/PartDetailDelete';

import Export, {
  action as exportAction,
  loader as exportLoader
} from '../../routes/Export/Export';

import Categories from '../../routes/Categories/Categories';
import { loader as CategoryLoader } from '../../routes/Categories/Categories';
import CategoryAdd, {
  action as categoryAddAction
} from '../../routes/Categories/CategoriesAdd';
import CategoryEdit, {
  action as categoryEditAction,
  loader as categoryEditLoader
} from '../../routes/Categories/CategoriesEdit';
import CategoryDelete, {
  action as categoryDeleteAction,
  loader as categoryDeleteLoader
} from '../../routes/Categories/CategoriesDelete';
import CategoryDetail, {
  loader as categoryDetailLoader
} from '../../routes/Categories/CategoryDetail';

import Suppliers, {
  loader as supplierLoader,
} from '../../routes/Suppliers/Suppliers';
import SupplierAdd, {
  action as supplierAddAction
} from '../../routes/Suppliers/SupplierAdd'
import SupplierDetailEdit, {
  action as supplierDetailEditAction,
  loader as supplierDetailEditLoader
} from '../../routes/Suppliers/SupplierEdit'
import SupplierDetailDelete, {
  action as supplierDetailDeleteAction,
  loader as supplierDetailDeleteLoader
} from '../../routes/Suppliers/SupplierDelete'
import SupplierDetail, {
  loader as supplierDetailLoader
} from '../../routes/Suppliers/SupplierDetail'

import Orders, {
  loader as orderLoader
} from '../../routes/Orders/Orders';
import OrderAdd, {
  action as orderAddAction,
  loader as orderAddLoader
} from '../../routes/Orders/OrderAdd';
import OrderEditPopup, {
  action as orderEditPopupAction,
  loader as orderEditPopupLoader
} from '../../routes/Orders/OrderEdit';
import OrderDeletePopup, {
  action as orderDeleteAction,
  loader as orderDeleteLoader
} from '../../routes/Orders/OrderDelete';

import OrderDetail, {
  loader as orderDetailLoader
} from '../../routes/Orders/OrderDetail';

import Comparison, {
  loader as comparisonLoader
} from '../../routes/Compare/Compares';
import ComparePopup, {
  loader as comparePopupLoader
} from '../../routes/Compare/ComparePopup';

import UserManagements, {
  loader as userManagementsLoader
} from '../../routes/UserManagement/UserManagement';
import UserAdd, {
  action as userAddAction,
  loader as userAddLoader
} from '../../routes/UserManagement/UserManagementAdd';

import Reports from '../../routes/Report/Reports';
import { loader as reportsLoader } from '../../routes/Report/Reports';
import UserManagementDelete, {
  action as userDeleteAction,
  loader as userDeleteLoader
} from '../../routes/UserManagement/UserManagementDelete';
import UserManagementEdit, {
  action as userEditAction,
  loader as userEditLoader
} from '../../routes/UserManagement/UserManagementEdit';

import Users, {
  loader as usersLoader
} from '../../routes/Users/Users';

import ProfileInfo, {
  loader as profileLoader,
} from '../../routes/Profile/ProfileInfo';

import ProfileEdit, {
  action as profileEditlAction,
  loader as profileEditlLoader
} from '../../routes/Profile/ProfileEdit';

function nestedRoutePart(depth,maxDepth) {
  if(depth<maxDepth){
    return {
      path: "PartDetail/:PartId/*", element: <PartDetail depth={depth}/>, loader: partDetailLoader,
      children: [
        { path: "Edit", Component: PartDetailEdit, action: partDetailEditAction, loader: partDetailEditLoader },
        { path: "Delete", Component: PartDetailDelete, action: partDetailDeleteAction, loader: partDetailDeleteLoader },
        ...[nestedRouteSupplier(depth+1,maxDepth)],
        ...[nestedRouteOrder(depth+1,maxDepth)],
      ]
    }
  } else {
    return {
      path: "PartDetail/:PartId/*", element: <PartDetail depth={depth}/>, loader: partDetailLoader,
      children: [
        { path: "Edit", Component: PartDetailEdit, action: partDetailEditAction, loader: partDetailEditLoader },
        { path: "Delete", Component: PartDetailDelete, action: partDetailDeleteAction, loader: partDetailDeleteLoader },
      ]
    }
  }
}
function nestedRouteSupplier(depth,maxDepth) {
  if(depth<maxDepth){
    return {
      path: "SupplierDetail/:SupplierId/*", element: <SupplierDetail depth={depth}/>, loader: supplierDetailLoader,
      children: [
        { path: "Edit", Component: SupplierDetailEdit, action: supplierDetailEditAction, loader: supplierDetailEditLoader },
        { path: "Delete", Component: SupplierDetailDelete, action: supplierDetailDeleteAction, loader: supplierDetailDeleteLoader },
        ...[nestedRoutePart(depth+1,maxDepth)],
        ...[nestedRouteOrder(depth+1,maxDepth)],
      ],
    }
  } else {
    return {
      path: "SupplierDetail/:SupplierId/*", Component: SupplierDetail, loader: supplierDetailLoader,
      children: [
        { path: "Edit", Component: SupplierDetailEdit, action: supplierDetailEditAction, loader: supplierDetailEditLoader },
        { path: "Delete", Component: SupplierDetailDelete, action: supplierDetailDeleteAction, loader: supplierDetailDeleteLoader },
      ],
    }
  }
}
function nestedRouteOrder(depth,maxDepth) {
  if(depth<maxDepth){
    return {
      path: "OrderDetail/:OrderId/*", element: <OrderDetail depth={depth}/>, loader: orderDetailLoader,
      children: [
        ...[nestedRouteSupplier(depth+1,maxDepth)],
        ...[nestedRoutePart(depth+1,maxDepth)],
      ],
    }
  } else {
    return {
      path: "OrderDetail/:OrderId/*", Component: OrderDetail, loader: orderDetailLoader,
    }
  }
}

function nestedRoutes(maxDepth) {
  let result = '';
  result = [
      nestedRoutePart(1,maxDepth),
      nestedRouteSupplier(1,maxDepth),
      nestedRouteOrder(1,maxDepth)
    ]
  return result;
};


export const routeList = [
  { index: true, Component: Parts, loader: partLoader },
  {
    path: "Parts/*", Component: Parts, loader: partLoader,
    children: [
      { path: "Add", Component: PartAdd, action: partAddAction, loader: partAddLoader }
    ]
  },
  {
    path: "Parts/PartDetail/:PartId/*", element: <PartDetail depth={0}/>, loader: partDetailLoader,
    children: [
      { path: "Edit", Component: PartDetailEdit, action: partDetailEditAction, loader: partDetailEditLoader },
      { path: "Delete", Component: PartDetailDelete, action: partDetailDeleteAction, loader: partDetailDeleteLoader },
      ...nestedRoutes(8),

    ]
  },


  {
    path: "Categories/*", Component: Categories, loader: CategoryLoader,
    children: [
      { path: "Add", Component: CategoryAdd, action: categoryAddAction },
      { path: ":CategoryId/Edit", Component: CategoryEdit, action: categoryEditAction, loader: categoryEditLoader },
      { path: ":CategoryId/Delete", Component: CategoryDelete, action: categoryDeleteAction, loader: categoryDeleteLoader },
    ]
  },

  {
    path: "Categories/CategoryDetail/:CategoryId", element: <CategoryDetail depth={0}/>, loader: categoryDetailLoader,
    children: [
      ...nestedRoutes(8),
    ]
  },

  {
    path: "Suppliers/*", Component: Suppliers, loader: supplierLoader,
    children: [
      { path: "Add", Component: SupplierAdd, action: supplierAddAction }
    ]
  },

  {
    path: "Suppliers/SupplierDetail/:SupplierId/*", element: <SupplierDetail depth={0}/>, loader: supplierDetailLoader,
    children: [
      { path: "Edit", Component: SupplierDetailEdit, action: supplierDetailEditAction, loader: supplierDetailEditLoader },
      { path: "Delete", Component: SupplierDetailDelete, action: supplierDetailDeleteAction, loader: supplierDetailDeleteLoader },
      ...nestedRoutes(8),
    ]
  },


  {
    path: "Orders/*", Component: Orders, loader: orderLoader,
    children: [
      { path: "Add", Component: OrderAdd, action: orderAddAction, loader: orderAddLoader },
      { path: ":OrderId/Edit", Component: OrderEditPopup, action: orderEditPopupAction, loader: orderEditPopupLoader },
      { path: ":OrderId/Delete", Component: OrderDeletePopup, action: orderDeleteAction, loader: orderDeleteLoader },
    ]
  },

  {
    path: "Orders/OrderDetail/:OrderId/*", element: <OrderDetail depth={0}/> , loader: orderDetailLoader,
    children: [
      ...nestedRoutes(8),
    ]
  },


  {
    path: "Comparison/*", Component: Comparison, loader: comparisonLoader,
    children: [
      { path: "Compare/:PartsId", Component: ComparePopup, loader: comparePopupLoader },
    ]
  },

  {
    path: "Reports/", Component: Reports, loader: reportsLoader,
  },

  {
    path: "Export/", Component: Export, action: exportAction, loader: exportLoader,
  },


  {
    path: "Users/", Component: Users, loader: usersLoader,
  },

  {
    path: "UserManagement/*", Component: UserManagements, loader: userManagementsLoader,
    children: [
      { path: "Add", Component: UserAdd, action: userAddAction, loader: userAddLoader },
      { path: ":userId/Edit", Component: UserManagementEdit, action: userEditAction, loader: userEditLoader },
      { path: ":userId/Delete", Component: UserManagementDelete, action: userDeleteAction, loader: userDeleteLoader },
    ]
  },

  {
    path: "ProfileInfo/:userId", Component: ProfileInfo, loader: profileLoader,
    children: [
      { path: ":userId/Edit", Component: ProfileEdit, action: profileEditlAction, loader: profileEditlLoader },
    ]
  },
];

