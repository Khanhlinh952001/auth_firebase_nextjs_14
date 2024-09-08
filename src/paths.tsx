export const paths = {
    home: '/',
    auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
    pages: {
    home:'/pages/home',
      overview: '/dashboard',
      account: '/dashboard/account',
      customers: '/dashboard/customers',
      integrations: '/dashboard/integrations',
      settings: '/dashboard/settings/account',
      products: '/dashboard/products',
      productList: '/dashboard/products/list',
      createProduct: '/dashboard/products/create',
      addProduct :'/dashboard/products/add',
      orders: '/dashboard/orders',
      orderList: '/dashboard/orders/list',
      orderCreate: '/dashboard/orders/create',
      orderDetails: '/dashboard/orders/details',
    },
    errors: { notFound: '/errors/not-found' },
  } as const;
  