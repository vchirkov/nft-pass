module.exports = {
    properties: {
        password: {
            type: 'string',
            isVisible: {
                list: false, edit: true, filter: false, show: false,
            },
        },
    },
    actions: {
        list:{
            isAccessible: false
        },
        search:{
            isAccessible: false
        },
        show: {
            isAccessible: false
        },
        new: {
            isAccessible: false
        },
        delete: {
            isAccessible: false
        },
        edit: {
            isAccessible: false
        },
        bulkDelete:{
            isAccessible: false
        }
    }
}
