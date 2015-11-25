Ext.define('My.store.ihalepanel.IhaleGrid', {
    extend : 'Ext.data.Store',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});