Ext.define('My.view.ihaletakip.IhaleGrid', {
    extend : 'Ext.grid.Panel',
    border : false,
    store : 'ihaleTakipContractStore',
    forceFit : true,
    initComponent : function() {

        this.columns = [ {
            header : 'İhale Adı',
            dataIndex : 'name',
            type: 'string',
            flex : 1
        }, {
            header : 'Oluşturulma Tarihi',
            dataIndex : 'recordDate',
            width : 120
        }];

        this.callParent(arguments);

    }
});