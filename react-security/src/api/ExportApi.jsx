import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';

const request = async (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  const response = await fetch(options.url, options);
  const json = await response.json();
  if (!response.ok) {
    return Promise.reject(json);
  }
  return json;
};

export async function getPartsExport() {
    let index = 1;
    const partsExport = await request({
        url: API_BASE_URL + '/parts/export',
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = partsExport.map((part) => {
        return {
            "index": index++,
            "sku": part.sku,
            "name": part.name,
            "category": part.category,
            "supplier": part.supplier,
            "price": part.price,
        }
    })
    return dataExport;
}

export async function getPartsByCategoryExport(categoryId) {
    let index = 1;
    const PartsByCategoryExport = await request({
        url: API_BASE_URL + `/parts/export/all/${categoryId}`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = PartsByCategoryExport.map((part) => {
        return {
            "index": index++,
            "sku": part.sku,
            "name": part.name,
            "category": part.category.name,
            "supplier": part.supplier.name,
            "price": part.price,
        }
    })
    return dataExport;
}

export async function getPartsBySupplierExport(supplierId) {
    let index = 1;
    const PartsBySupplierExport = await request({
        url: API_BASE_URL + `/parts/export/${supplierId}/all`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = PartsBySupplierExport.map((part) => {
        return {
            "index": index++,
            "sku": part.sku,
            "name": part.name,
            "category": part.category.name,
            "supplier": part.supplier.name,
            "price": part.price,
        }
    })
    return dataExport;
}

export async function getPartsBySupplierAndCategoryExport(supplierId,categoryId) {
    let index = 1;
    const PartsBySupplierAndCategoryExport = await request({
        url: API_BASE_URL + `/parts/export/${supplierId}/${categoryId}`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = PartsBySupplierAndCategoryExport.map((part) => {
        return {
            "index": index++,
            "sku": part.sku,
            "name": part.name,
            "category": part.category.name,
            "supplier": part.supplier.name,
            "price": part.price,
        }
    })
    return dataExport;
}

export async function getPartByIdExport(partId) {
    let index = 1;
    const part = await request({
        url: API_BASE_URL + `/parts/${partId}`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = [{
        "index": index++,
        "sku": part.sku,
        "name": part.name,
        "category": part.category.name,
        "supplier": part.supplier.name,
        "price": part.price,
    }]
    return dataExport;
}

export async function getSuppliersExport() {
    let index = 1;
    const suppliersExport = await request({
        url: API_BASE_URL + `/suppliers/export`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = suppliersExport.map((supplier) => {
        return {
            "index": index++,
            "name": supplier.name,
            "website": supplier.website,
            "contact": supplier.contact,
            "phone": supplier.phone,
        }
    })
    return dataExport;
}

export async function getSuppliersAllExport() {
    let index = 1;
    const suppliersAllExport = await request({
        url: API_BASE_URL + `/suppliers/export/all`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });

    suppliersAllExport.sort(function (a, b) {
        return b.suppiler.localeCompare(a.suppiler);
    });

    const dataExport = suppliersAllExport.data.map((data) => {
        return {
            "index": index++,
            "suppiler": data.suppiler,
            "category": data.category,
        }
    })
    
    return dataExport;
}

export async function getSupplierByCategoriesExport(categoryId) {
    let index = 1;
    const supplierByCategoriesExport = await request({
        url: API_BASE_URL + `/suppliers/export/${categoryId}`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = supplierByCategoriesExport.map((data) => {
        return {
            "index": index++,
            "suppiler": data.suppiler,
            "category": data.category,
        }
    })

    
    return dataExport;
}

export async function getCategoriesExport() {
    let index = 1;
    const categoriesExport = await request({
        url: API_BASE_URL + `/categories/export`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = categoriesExport.map((category) => {
        return {
            "index": index++,
            "name": category.name,
        }
    })
    return dataExport;
}

export async function getCategoriesAllExport() {
    let index = 1;
    const categoriesAllExport = await request({
        url: API_BASE_URL + `/categories/export/all`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = categoriesAllExport.map((data) => {
        return {
            "index": index++,
            "category": data.category,
            "suppiler": data.suppiler,
        }
    })
    return dataExport;
}

export async function getCategoryBySuppliersExport(supplierId) {
    let index = 1;
    const categorybySuppliersExport = await request({
        url: API_BASE_URL + `/categories/export/${supplierId}`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = categorybySuppliersExport.map((data) => {
        return {
            "index": index++,
            "category": data.category,
            "suppiler": data.suppiler,
        }
    })
    return dataExport;
}

export async function getOrdersExport() {
    let index = 1;
    const ordersExport = await request({
        url: API_BASE_URL + `/orders/export`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = ordersExport.map((order) => {
        return {
            "index": index++,
            "datetime": order.datetime,
            "part": order.part,
            "type": order.type,
            "quantity": order.quantity,
            "user": order.user,
            "description": order.description,

        }
    })
    return dataExport;
}

export async function getOrdersbyStartToPointExport(dateTo) {
    let index = 1;
    const ordersbyStartToPointExport = await request({
        url: API_BASE_URL + `/export/all/${dateTo}`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = ordersbyStartToPointExport.map((order) => {
        return {
            "index": index++,
            "datetime": order.datetime,
            "part": order.part.name,
            "type": order.type,
            "quantity": order.quantity,
            "user": order.user.email,
            "description": order.description,
        }
    })
    return dataExport;
}

export async function getOrdersbyPointToEndExport(dateFrom) {
    let index = 1;
    const ordersbyPointToEndExport = await request({
        url: API_BASE_URL + `/orders/export/${dateFrom}/all`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = ordersbyPointToEndExport.map((order) => {
        return {
            "index": index++,
            "datetime": order.datetime,
            "part": order.part.name,
            "type": order.type,
            "quantity": order.quantity,
            "user": order.user.email,
            "description": order.description,
        }
    })
    return dataExport;
}

export async function getOrdersbyPointToPointExport(dateFrom, dateTo) {
    let index = 1;
    const ordersbyPointToPointExport = await request({
        url: API_BASE_URL + `orders/export/${dateFrom}/${dateTo}`,
        method: 'GET',
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    const dataExport = ordersbyPointToPointExport.map((order) => {
        return {
            "index": index++,
            "datetime": order.datetime,
            "part": order.part.name,
            "type": order.type,
            "quantity": order.quantity,
            "user": order.user.email,
            "description": order.description,
        }
    })
    return dataExport;
}