export const navigation = [
    {
        name: 'Home',
        url: '/dashboard',
        icon: 'fa fa-lg fa-home'
    },
    {
        menu: true,
        functions: ['ADMIN','MANAGER'],
        name: 'Manage Users',
        url: '/manage-user',
        icon: 'fa fa-fw fa-table',
        children: [
            {
                title: true,
                functions: ['ADMIN','MANAGER'],
                name: 'USERS'
            },
            {
                name: 'Admin Users',
                functions: ['ADMIN','MANAGER'],
                url: '/manage-user/user/user-list',
                icon: 'fa fa-th-list'
            }
        ]
    },
    {
        menu: true,
        functions: ['ADMIN','MANAGER','USER'],
        name: 'Manage Customer',
        url: '/manage-customer',
        icon: 'fa fa-fw fa-table',
        children: [
            {
                title: true,
                functions: ['ADMIN','MANAGER','USER'],
                name: 'CUSTOMER'
            },
            {
                name: 'Customer',
                functions: ['ADMIN','MANAGER','USER'],
                url: '/manage-customer/customer/customer-list',
                icon: 'fa fa-th-list'
            }
        ]
    },
    {
        menu: true,
        functions: ['ADMIN','MANAGER'],
        name: 'Manage Account',
        url: '/manage-account',
        icon: 'fa fa-fw fa-table',
        children: [
            {
                title: true,
                functions: ['ADMIN','MANAGER'],
                name: 'ACCOUNT'
            },
            {
                name: 'Account Type',
                functions: ['ADMIN'],
                url: '/manage-account/account-type/account-type-list',
                icon: 'fa fa-th-list'
            }
        ]
    },
    // {
    //     menu: true,
    //     name: 'Setup',
    //     url: '/admin',
    //     icon: 'fa fa-th-list',
    //     children: [
    //         {
    //             title: true,
    //             name: 'MASTER DATA'
    //         },
    //         // {
    //         //     divider: true,
    //         // },
    //         {
    //             name: 'Tour Package',
    //             url: '/admin/employee/employee-view',
    //             icon: 'fa fa-th-list'
    //         },
    //         {
    //             name: 'Hotels',
    //             url: '/admin/role-group',
    //             icon: 'fa fa-fw fa-desktop'
    //         },
    //         {
    //             name: 'Vehicles',
    //             url: '/admin/role-group',
    //             icon: 'fa fa-fw fa-desktop'
    //         },
    //         {
    //             name: 'Events',
    //             url: '/admin/role-group',
    //             icon: 'fa fa-fw fa-desktop'
    //         },
    //     ]
    // },
    // {
    //     menu: true,
    //     name: 'Booking',
    //     url: '/admin',
    //     icon: 'fa fa-th-list',
    //     children: [
    //         {
    //             title: true,
    //             name: 'MANAGE'
    //         },
    //         // {
    //         //     divider: true,
    //         // },
    //         {
    //             name: 'Tour',
    //             url: '/admin/employee/employee-view',
    //             icon: 'fa fa-th-list'
    //         },
    //         {
    //             name: 'Hotel',
    //             url: '/admin/role-group',
    //             icon: 'fa fa-fw fa-desktop'
    //         },
    //         {
    //             name: 'Vehicle',
    //             url: '/admin/role-group',
    //             icon: 'fa fa-fw fa-desktop'
    //         },
    //         {
    //             name: 'Tailor Made',
    //             url: '/admin/role-group',
    //             icon: 'fa fa-fw fa-desktop'
    //         },
    //         {
    //             name: 'Payment',
    //             url: '/admin/role-group',
    //             icon: 'fa fa-fw fa-desktop'
    //         },
    //     ]
    // },
    {
        menu: true,
        name: 'Master Data',
        url: '/master-data',
        icon: 'fa fa-shopping-cart',
        children: [
            {
                title: true,
                name: 'MASTER DATA'
            },
            // {
            //     divider: true,
            // },
            {
                name: 'Categories',
                url: '/master-data/category/category-list',
                icon: 'fa fa-fw fa-list-alt'
            },
            {
                name: 'Sub Categories',
                url: '/master-data/sub-category/sub-category-list',
                icon: 'fa fa-fw fa-tag'
            },
            // {
            //     name: 'Destination',
            //     url: '/admin/role-group',
            //     icon: ''
            // },
            // {
            //     name: 'Page Content',
            //     url: '/admin/role-group',
            //     icon: ''
            // },
        ]
    },
    // {
    //     menu: true,
    //     name: 'Chat',
    //     url: '/admin',
    //     icon: 'fa fa-th-list',
    //     children: [
    //         {
    //             title: true,
    //             name: 'CHAT DATA'
    //         },
    //         // {
    //         //     divider: true,
    //         // },
    //         {
    //             name: 'Chat',
    //             url: '/admin/employee/employee-view',
    //             icon: 'fa fa-th-list'
    //         }
    //     ]
    // }
];
