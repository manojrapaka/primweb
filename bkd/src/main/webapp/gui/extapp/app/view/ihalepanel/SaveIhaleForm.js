Ext.define('My.view.ihalepanel.SaveIhaleForm', {
	extend : 'My.view.collection.FormPanel',
	border : false,
	padding : 5,
	initComponent : function(){
		
		var me = this;
		var labelWidthSize = 120;
		var fieldWidth = '100%';
		
		this.ihaleId = Ext.create('Ext.form.TextField', {
			name: 'ihaleId',
	        fieldLabel: 'ihale id',
	        labelWidth : labelWidthSize,
	        width : fieldWidth,
	        allowBlank : false,
	        hidden : true
		});
		
		this.ihaleKayitNo = Ext.create('Ext.form.TextField', {
			name: 'ihaleKayitNo',
	        fieldLabel: 'İhale Kayıt Numarası',
	        labelWidth : labelWidthSize,
	        width : fieldWidth,
	        allowBlank : false
		});
		this.ihaleAdi = Ext.create('Ext.form.TextField', {
			name: 'ihaleAdi',
	        fieldLabel: 'İhale Adı',
	        labelWidth : labelWidthSize,
	        width : fieldWidth,
	        allowBlank : false
		});
		
		this.btnSave = Ext.create('Ext.Button', {
		    // text: 'ARA',
		    iconCls : 'iconTick16',
		    text : 'Kaydet',
		    name: 'btnSave',
		    handler : function(){
		    	me.saveContract();
		    }
		});
		
		this.btnCancel = Ext.create('Ext.Button', {
		    // text: 'ARA',
		    iconCls : 'iconCancel16',
		    name: 'btnCancel',
		    text : 'İptal',
		    handler : function(){
		    	me.cont.hide();
		    }
		});
		

		this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->', this.btnCancel, this.btnSave]
        }];
		
		// this.addDocked(this.ihalePanelDockedItems);
		
		this.items = [
		              this.ihaleId,
		              this.ihaleKayitNo, 
		              this.ihaleAdi
		              ];
		

        this.callParent(arguments);
	},
	saveContract : function(){
		var me = this;
		
		var ihaleForm = this;
		var ihalePanel = this.ihalePanel;
		
		var jsonData = {};
		var jsonArr = [];
		var contractDetail = [];
		var contractSollution = [];

		var detailData = ihalePanel.ihaleGrid.getStore().getRange();
		if (detailData!=null) {
			for(var i=0; i<detailData.length; i++){
			   var row = detailData[i];
			   contractDetail.push(row.data);
			}
		}
		
		jsonData = {};
		jsonArr = [];
		var solutionData = ihalePanel.collectorGroupedGrid.getStore().getRange();
		if (solutionData!=null) {
			for(var i=0; i<solutionData.length; i++){
			   var row = solutionData[i];
			   contractSollution.push(row.data);
			}
		}
		
		var contractData = ihaleForm.getForm().getValues();
		
		
		
		jsonData = {
				contract : contractData,
				detail : contractDetail,
				sollution : contractSollution
		};
		
		Ext.Ajax.request({
			   url: '../../ihale/saveIhale.ajax',
			   params : { data : Ext.encode(jsonData) },
			   success: function(response, opts) {
				   
				   var result = Ext.decode(response.responseText.trim());
				   if(result.success){
					   Ext.Msg.alert('Kayıt İşlemi Sonucu', 'Kayıt başarıyla yapıldı.');
					   
					   ihalePanel.ihaleGrid.getStore().loadData(result.detail);
					   ihalePanel.collectorGroupedGrid.getStore().loadData(result.sollution);
					   ihaleForm.getForm().setValues(result.contract);
				   }
				   else
					   Ext.Msg.alert('Kayıt İşlemi Sonucu', result.exception);
				   me.cont.hide();
			   },
			   failure: function(response, opts) {
				   Ext.Msg.alert('Kayıt İşlemi Sonucu', 'Kayıt başarıyla yapılamadı.');
			      console.log('server-side failure with status code ' + response.status);
			   }
			});
	}
});