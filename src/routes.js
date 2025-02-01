export const Routes = {
  // Pages
  Landing: { path: "/" },
  Dashboard: { path: "/dashboard" },

  Login: { path: "/login" },

  Clients: { path: "/dashboard/clients" },

  Catalog: { path: "/dashboard/catalog" },

  PriceList: { path: "/dashboard/pricelist" },

  Orders: { path: "/dashboard/orders" },
  EditOrder: { path: "/dashboard/orders/edit/:order_id" },

  Credentials: { path: "/dashboard/settings/credentials" },
  Profile: { path: "/dashboard/settings/profile" },
  Records: { path: "/dashboard/settings/records" }
};
