export class StaticConfig {

    public static PAGINATION = {
        'ITEMS_PER_PAGE': 25,
        'MAX_SIZE': 5,
    };

    public static DOMAIN = {
        'HOTEL': {
            ID: 1,
            NAME: 'Hotel',
            COLOR: '#4CAF50'
        },
        'TRANSPORT': {
            ID: 2,
            NAME: 'Transport',
            COLOR: '#FACE07'
        },
        'TOUR': {
            ID: 3,
            NAME: 'Tour',
            COLOR: '#FF0000'
        }
    };

    public static FILTER_OPERATOR = [
        {
            'key': 'LIKE',
            'value': 'like'
        },
        {
            'key': 'EQUAL',
            'value': 'eq'
        },
        {
            'key': 'NOTEQUAL',
            'value': 'ne'
        },
        {
            'key': 'GREATERTHAN',
            'value': 'gt'
        },
        {
            'key': 'GREATERTHANOREQUAL',
            'value': 'gte'
        },
        {
            'key': 'LESSTHAN',
            'value': 'lt'
        },
        {
            'key': 'LESSTHANOREQUAL',
            'value': 'lte'
        }
    ];

    public static STATUS_LIST = {
        'FAILED': {
            ID: -1,
            NAME: 'FAILED',
            COLOR: '#FF0000'
        },
        'ADDED': {
            ID: 0,
            NAME: 'ADDED',
            COLOR: '#273AE4'
        },
        'PENDING': {
            ID: 1,
            NAME: 'PENDING',
            COLOR: '#ff8c1a'
        },
        'PUBLISHED': {
            ID: 2,
            NAME: 'PUBLISHED',
            COLOR: '#4CAF50'
        },
        'REMOVED': {
            ID: 3,
            NAME: 'REMOVED',
            COLOR: '#FACE07'
        },
        'HALTED': {
            ID: 4,
            NAME: 'HALTED',
            COLOR: '#F44336'
        }
    };

    public static DATE_TYPES = {
        'DATE': 'MM/dd/yyyy',
        'DATE_F2': 'yyyyMMdd',
        'TIME': 'hh:mm a',
        'DATE_TIME': 'MM/dd/yyyy hh:mm:ss a',
        'DATE_TIME_WITHOUT_SS': 'MM/dd/yyyy hh:mm a'
    };

    public static STORAGE_KEY = {
        'AUTHENTICATION_PK': 'bank_authentication_pk',
        'AUTHENTICATION_PSW': 'bank_authentication_psw'
    };

    public static ACCESS_TYPE={

        'ADMIN': {
            ID: 1,
            NAME: 'ADMIN',
            COLOR: '#4CAF50'
        },
        'MANAGER': {
            ID: 2,
            NAME: 'MANAGER',
            COLOR: '#273AE4'
        },
        'USER': {
            ID: 3,
            NAME: 'USER',
            COLOR: '#ff8c1a'
        },
        'HOALD': {
            ID: 4,
            NAME: 'HOLD',
            COLOR: '#FF0000'
        }

    }
}
