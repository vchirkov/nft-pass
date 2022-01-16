const {ForbiddenError} = require('adminjs');
const {v4: uuidv4} = require('uuid');

const canAccessExistingRecord = ({currentAdmin, record}) => currentAdmin._id === record.params.owner;
const isLoggedIn = context => !!context.currentAdmin;

module.exports = {
    navigation: {
        icon: 'Apps'
    },
    properties: {
        token: {
            isVisible: {
                show: true,
                list: true,
                edit: false,
                filter: true,
            },
        },
        _id: {
            isVisible: false
        },
        owner: {
            isVisible: false
        }
    },
    actions: {
        new: {
            isAccessible: isLoggedIn,
            before: async (request, context) => {
                if (!context.currentAdmin) throw new ForbiddenError();
                request.payload.token = uuidv4();
                request.payload = {
                    ...request.payload,
                    token: uuidv4(),
                    owner: context.currentAdmin._id
                }

                return request;
            },
        },
        list: {
            isAccessible: isLoggedIn,
            before: async (request, context) => {
                request.query = {
                    ...request.query,
                    'filters.owner': context.currentAdmin._id
                };
                return request;
            }
        },
        search: {
            isAccessible: false,
        },
        edit: {
            isAccessible: canAccessExistingRecord,
        },
        show: {
            isAccessible: canAccessExistingRecord,
        },
        delete: {
            isAccessible: canAccessExistingRecord,
        },
        bulkDelete: {
            isAccessible: canAccessExistingRecord
        }
    }
}
