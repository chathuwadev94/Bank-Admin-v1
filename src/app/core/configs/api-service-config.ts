export class ApiServiceConfig {

  public static AUTHENTICATE_SERVICE = {
    NAME: 'Authentication Service',
    KEY: 'WF360_SEV',
    ROUTE_PATH: '/Authentication'
  };

    public static USER_SERVICE = {
        NAME: 'User Authentication Service',
        KEY: 'BANK_A_SEV',
        ROUTE_PATH: '/user'
    };

    public static ACC_TYPE_SERVICE = {
        NAME: 'Accpunt Types Service',
        KEY: 'BANK_A_SEV',
        ROUTE_PATH: '/account-type'
    };

    public static CUSTOMER_SERVICE = {
        NAME: 'Customer Service',
        KEY: 'BANK_A_SEV',
        ROUTE_PATH: '/customer'
    };


    public static COMMUNITY_USER_SERVICE = {
        NAME: 'Community User Authentication Service',
        KEY: 'TRAVEL_A_SEV',
        ROUTE_PATH: '/community_user_service'
    };

    public static CATEGORY_SERVICE = {
        NAME: 'Category Service',
        KEY: 'TRAVEL_A_SEV',
        ROUTE_PATH: '/category_service'
    };

    public static SUB_CATEGORY_SERVICE = {
        NAME: 'Sub Category Service',
        KEY: 'TRAVEL_A_SEV',
        ROUTE_PATH: '/sub_category_service'
    };

    public static IMAGE_SERVICE = {
        NAME: 'Image Service',
        KEY: 'TRAVEL_A_SEV',
        ROUTE_PATH: '/image_service'
    };

}
