Ext.define('My.view.ihaletakip.IhaleDetayForm', {
	extend : 'My.view.collection.FormPanel',
	border : false,
	bodyStyle : { 
		'padding' : '5px', 
		'background-color': '#DFE8F6'
	},
	initComponent : function(){
		
		var me = this;
		
		var labelWidthSize = 120;
		var fieldWidth = '100%';
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
		this.ihaleSahibiAdi = Ext.create('Ext.form.TextField', {
			name: 'ihaleSahibininAdi',
	        fieldLabel: 'Ihale Sahibi',
	        labelWidth : labelWidthSize,
	        width : fieldWidth,
	        allowBlank : false
		});
		
		this.countries = Ext.create('Ext.data.Store', {
		    fields: ['id', 'name'],
		    data : [
		        {"id":"TR", "name":"T.C."},
                {"id":"GR", "name":"Germany"},
                {"id":"EN", "name":"English"}
		    ]
		});
		this.uyruk = Ext.create('Ext.form.ComboBox', {
			name: 'uyruk',
	        fieldLabel: 'Uyruk',
	        labelWidth : labelWidthSize,
	        width : fieldWidth,
	        store : this.countries,
	        queryMode: 'local',
	        displayField: 'name',
	        valueField: 'id',
	        allowBlank : false
		});
		this.vergiKimlikNo = Ext.create('Ext.form.TextField', {
			name: 'vergiKimlikNo',
	        fieldLabel: 'Vergi Kimlik No',
	        labelWidth : labelWidthSize,
	        width : fieldWidth,
	        allowBlank : false
		});
		this.tebligatAdresi = Ext.create('Ext.form.TextArea', {
			name: 'tebligatAdresi',
	        fieldLabel: 'Tebligat Adresi',
	        labelWidth : labelWidthSize,
	        width : fieldWidth,
	        allowBlank : false
		});
		this.telefon = Ext.create('Ext.form.TextField', {
			name: 'telefon',
	        fieldLabel: 'Telefon',
	        vtype: 'phone',
	        labelWidth : labelWidthSize,
	        width : fieldWidth,
	        allowBlank : false
		});
		this.fax = Ext.create('Ext.form.TextField', {
			name: 'fax',
	        fieldLabel: 'Fax',
	        vtype: 'phone',
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
		
		this.btnClear = Ext.create('Ext.Button', {
		    iconCls : 'iconClearForm16',
		    name: 'btnClear',
		    text : 'Temizle',
		    handler : function(){
		    	me.getForm().reset();
		    }
		});
		

		this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->', this.btnClear, this.btnSave]
        }];
		
		// this.addDocked(this.ihalePanelDockedItems);
		
		this.items = [
		              this.ihaleKayitNo, 
		              this.ihaleAdi, 
		              this.ihaleSahibiAdi, 
		              this.uyruk, 
		              this.vergiKimlikNo, 
		              this.tebligatAdresi, 
		              this.telefon, 
		              this.fax
		              ];
		

        this.callParent(arguments);
	},
	saveContract : function(){
		var me = this;
		
		var ihaleForm = this;
		var ihalePanel = this.ihalePanel;
		
		var jsonData = {};
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
				   Ext.Msg.alert('Kayıt İşlemi Sonucu', 'Kayıt başarıyla yapıldı.');
				   me.cont.close();
			   },
			   failure: function(response, opts) {
				   Ext.Msg.alert('Kayıt İşlemi Sonucu', 'Kayıt başarıyla yapılamadı.');
			      console.log('server-side failure with status code ' + response.status);
			   }
			});
	}
});