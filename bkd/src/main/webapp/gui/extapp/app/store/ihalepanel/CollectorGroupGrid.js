Ext.define('My.store.ihalepanel.CollectorGroupGrid', {
    extend : 'Ext.data.Store',
    storeId: 'collectorGroupGridStore',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});