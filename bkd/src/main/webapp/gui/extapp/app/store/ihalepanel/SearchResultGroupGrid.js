Ext.define('My.store.ihalepanel.SearchResultGroupGrid', {
    extend : 'Ext.data.Store',
    storeId: 'searchResultGroupGridStore',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});