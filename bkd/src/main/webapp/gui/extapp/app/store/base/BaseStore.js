Ext.define('My.store.base.BaseStore', {
    extend : 'Ext.data.Store',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});