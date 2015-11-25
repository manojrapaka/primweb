Ext.define('My.view.ihalepanel.IhaleGrid', {
    extend : 'Ext.grid.Panel',
    border : false,
    selModel : {
        selType : 'checkboxmodel'
    },
    initComponent : function() {

        this.columns = [
//         {
//        	header : 'ID',
//        	dataIndex : 'id',
//        	type : 'float',
//        	width : 20
//        },
        {
            header : 'Sıra No',
            dataIndex : 'siraNo',
            type: 'string',
            width : 50
        }, {
            header : 'Cinsi',
            dataIndex : 'cins',
            flex : 1, 
            editor: { allowBlank: false }
        }, {
            header : 'Miktarı',
            dataIndex : 'miktar',
            width : 70
        }, {
            header : 'Birimi',
            dataIndex : 'birim',
            width : 50
        } ];

        this.callParent(arguments);

    }
});