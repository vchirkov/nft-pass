module.exports = {
    labels: {
        App: 'Applications',
        authWelcome: 'Welcome'
    },
    resources: {
        App: {
            actions: {
                new: 'Add new Application',
                edit: 'Edit',
                show: 'Show',
                delete: 'Delete',
                bulkDelete: 'Delete all',
                list: 'Applications List',
            },
            properties: {
                token: 'API Key',
                network: 'Blockchain Network',
                nfts: 'NFT Contract Addresses'
            },
            buttons: {
                save: 'Save',
                addNewItem: 'Add New Item',
                filter: 'Filter',
                applyChanges: 'Apply changes',
                resetFilter: 'Reset',
                confirmRemovalMany: 'Confirm the removal of {{count}} record',
                confirmRemovalMany_plural: 'Confirm the removal of {{count}} records',
                logout: 'Log out',
                login: 'Log in',
                register: 'Register',
                navigateLogin: 'Back to Login',
                seeTheDocumentation: 'See: <1>the documentation</1>',
                createFirstRecord: 'Create First Application',
            },
        }
    },
    messages: {
        authWelcome: 'NFTPass - the best authentication and verification Service based on NFT ownership',
    }
}
