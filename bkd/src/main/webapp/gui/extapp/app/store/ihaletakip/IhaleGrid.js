Ext.define('My.store.ihaletakip.IhaleGrid', {
    extend : 'Ext.data.Store',
    proxy: {
    	url: '../../ihale/getContractList.ajax',
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});