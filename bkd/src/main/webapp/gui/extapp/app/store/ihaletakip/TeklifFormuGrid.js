Ext.define('My.store.ihaletakip.TeklifFormuGrid', {
    extend : 'Ext.data.Store',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});