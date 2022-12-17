const BASE_URL = 'http://localhost:5000';

export const JEWELS_URL = BASE_URL + '/api/jewels';
export const JEWEL_BY_ID_URL = JEWELS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login'
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_BY_ID_URL = ORDERS_URL + '/';
export const ORDER_BY_USERID_URL = ORDERS_URL + '/byuser/';