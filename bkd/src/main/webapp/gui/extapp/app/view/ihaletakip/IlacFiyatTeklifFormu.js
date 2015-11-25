Ext.define('My.view.ihaletakip.IlacFiyatTeklifFormu', {
	extend : 'My.view.collection.FormPanel',
	border : false,
	padding : 5,
	initComponent : function(){
		
		var me = this;
		
		var labelWidthSize = 120;
		var fieldWidth = '100%';
		
		
		this.teklifFirmaStore = Ext.create('Ext.data.Store', {
		    fields: ['id', 'name'],
	        autoLoad : true,
		    proxy: {
		    	url : '../../ihale/getAllPharmaWarehouseByAuthenticatedUser.ajax',
		        type: 'ajax',
		        reader: {
		            type: 'json',
		            rootProperty: 'data'
		        }
		    }
//		    data : [
//                {"id":"1", "name":"Abdi İbrahim İlaç Sanayi ve Ticaret A.Ş."},
//                {"id":"2", "name":"Abfen Farma San. Ve Tic. Ltd. Şti."},
//		        {"id":"3", "name":"Bayer Türk Kimya San. Tic. Ltd. Şti."},
//                {"id":"4", "name":"Nemesis İlaç Gıda San.Tic.Ltd.Şti."},
//                {"id":"5", "name":"Novitas İlaç San. Tic. Ltd. Şti."}
//		    ]
		});
		this.cmbTeklifFirma = Ext.create('Ext.form.ComboBox', {
			name: 'cmbTeklifFirma',
	        fieldLabel: 'Firma',
	        labelWidth : labelWidthSize,
	        width : fieldWidth,
	        store : me.teklifFirmaStore,
	        queryMode: 'local',
	        displayField: 'name',
	        valueField: 'id',
	        allowBlank : false
		});
		
		
		this.btnSave = Ext.create('Ext.Button', {
		    // text: 'ARA',
		    iconCls : 'iconTick16',
		    text : 'Kaydet',
		    name: 'btnSave',
		    handler : function(){
		    	me.saveTeklifFormu();
		    }
		});
		
		this.btnCancel = Ext.create('Ext.Button', {
		    // text: 'ARA',
		    iconCls : 'iconCancel16',
		    name: 'btnCancel',
		    text : 'İptal',
		    handler : function(){
		    	me.firmaIlacTeklifWindow.close();
		    }
		});
		

		this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->', this.btnCancel, this.btnSave]
        }];
		
		// this.addDocked(this.ihalePanelDockedItems);
		
		this.items = [
		              this.cmbTeklifFirma
	              ];
		
        this.callParent(arguments);
	},
	saveTeklifFormu : function(){

		var ilacFiyatTeklifFormu = this;
		var ihaleTakipPanel = this.ihaleTakipPanel;
		
		var jsonData = {};
		var jsonArr = [];

		jsonArr = [];
		var ihaleIcerigiSelectedData = ihaleTakipPanel.ihaleIcerigiGrid.getSelectionModel().getSelection();
		if (ihaleTakipPanel.ihaleIcerigiGrid.getSelectionModel().hasSelection()) {
			for(var i=0; i<ihaleIcerigiSelectedData.length; i++){
			   var row = ihaleIcerigiSelectedData[i];
			   jsonArr.push(row.data);
			}
		}
		var firmData = ilacFiyatTeklifFormu.getForm().getValues();
		// var contractId = ihaleTakipPanel.westPanelContractGrid.getSelection()[0].data.id;
		
		
		jsonData = {
				contractId : ihaleTakipPanel.selectedContract,
				selectedFirmId : firmData.cmbTeklifFirma,
				ilacList : jsonArr
		};
		
		Ext.Ajax.request({
			   url: '../../ihale/saveTeklifFormu.ajax',
			   params : { data : Ext.encode(jsonData) },
			   success: function(response, opts) {
				   Ext.Msg.alert('Kayıt İşlemi Sonucu', 'Kayıt başarıyla yapıldı.');
				   ilacFiyatTeklifFormu.firmaIlacTeklifWindow.close();
				   ihaleTakipPanel.loadTeklifFormuGrid();
			   },
			   failure: function(response, opts) {
				   Ext.Msg.alert('Kayıt İşlemi Sonucu', 'Kayıt başarıyla yapılamadı.');
			      console.log('server-side failure with status code ' + response.status);
			   }
			});
	}
});