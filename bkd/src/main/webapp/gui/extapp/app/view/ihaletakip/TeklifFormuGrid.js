Ext.define('My.view.ihaletakip.TeklifFormuGrid', {
    extend : 'Ext.grid.Panel',
    border : false,
    forceFit: true,
    initComponent : function() {

        this.columns = [{
            header : 'Firma',
            dataIndex : 'pharmaWhouseName',
            type: 'string',
            flex : 1
        }, {
            header : 'Durum',
            dataIndex : 'tenderStatusName',
            width : 70
        }, {
            header : 'Son İşlem Tarihi',
            dataIndex : 'statusDate',
            width : 120
        }];

        this.btnTeklifFiyatlariGridPdf = Ext.create('Ext.Button', {
        	text : 'Pdf',
		    name: 'btnIhaleGridTeklifPdf',
		    iconCls : 'iconPdf',
        	tooltip : 'Pdf Dökümanı',
		    handler : function(){
		    	me.downloadDocument("../../report/pdf");
		    }
		});
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            height : 30,
            items: ['->', this.btnTeklifFiyatlariGridPdf, {
                xtype: 'exportbutton',
                format : 'excel',
                text : 'Excel',
            	iconCls : 'iconXml',
            	tooltip : 'Excel Dökümanı',
                component: this
              }]
        }];
        
        this.callParent(arguments);

    }
});