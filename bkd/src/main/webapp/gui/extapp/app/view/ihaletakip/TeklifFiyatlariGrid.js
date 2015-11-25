Ext.define('My.view.ihaletakip.TeklifFiyatlariGrid', {
    extend : 'Ext.grid.Panel',
    border : false,
    initComponent : function() {

    	var me = this;
    	
    	function change(val){
        	val = Ext.util.Format.currency(val,' TL',2,true);
            return val;
        }
    	
    	this.rowEditingFiyat = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
    	this.plugins = [this.rowEditingFiyat];
        
        this.ihaleIcerigiModel = Ext.create('My.model.ihalepanel.CollectorGroupGrid');
        this.store = Ext.create('My.store.ihalepanel.CollectorGroupGrid', {
        	model : this.ihaleIcerigiModel,
        	groupField: 'siraNo'
        });
    	
    	this.columns = [
		             // { text: 'ID', dataIndex: 'id', width: 50, type: 'number'},
		             { text: 'Sıra No', dataIndex: 'siraNo', width: 50, type: 'float'},
		             { text: 'Barkod', dataIndex: 'barkod', width: 100, type: 'string' },
		             { text: 'Firma Adı', dataIndex: 'firmaAdi', width: 100, type: 'string' },
		             { text: 'İlaç Adı', dataIndex: 'ilacAdi', flex : 1, type: 'string' },
		             { text: 'ATC Kodu', dataIndex: 'atcKodu', width: 80, type: 'string' },
		             { text: 'Miktar', dataIndex: 'miktar', width: 80, type: 'float' },
		             { text: 'Fiyat', dataIndex: 'fiyat', width: 70, type: 'float',
		          	   renderer : function(value){
		          		   if(typeof value != "undefined" && value != null && value != ""){
		              		   return Ext.util.Format.currency(value,' TL',2,true);
		          		   } else {
		              		   return Ext.util.Format.currency(0,' TL',2,true);
		          		   }
		          	   }
		             },
		             { text: 'Yeni Fiyat', dataIndex: 'yeniFiyat', width: 70, type: 'string',
		          	   defaultValue : "",
		          	   renderer : function(value){
		          		   if(typeof value != "undefined" && value != null && value != ""){
		              		   return Ext.util.Format.currency(value,' TL',2,true);
		          		   } else {
		              		   return Ext.util.Format.currency("",' TL',2,true);
		          		   }
		          	   },
		          	   editor: { allowBlank: true }
		             },
		             { 
		          	   text: 'Tutar TL', 
		          	   dataIndex: 'tutar', 
		          	   width: 170, 
		          	   type: 'float', 
		          	   renderer: change,
		          	   summaryType: 'sum',
		                 summaryRenderer: function(value, summaryData, dataIndex) {
		              	   if(value > 0){
		              		   value = Ext.util.Format.currency(value,' TL',2,true);
		              	   }
		              	   return Ext.String.format('Toplam {0}', value, value !== 0 ? 's' : '');
		                     },
		                 }
		             ];
		  
		  this.teklifFiyatlariGroupingFeature = Ext.create('Ext.grid.feature.Grouping', {
				groupHeaderTpl: '<span class="searchResHeader">Sira No:</span> {name} '
					+'<span class="searchResHeader">Cinsi:</span> {[values.rows[0].data.cins]} '
					+'<span class="searchResHeader">Toplam:</span> ({rows.length} adet)',
				groupByText : 'siraNo',
			  // startCollapsed: true,
				disabled : true
		  });
		  
		  this.features = [this.teklifFiyatlariGroupingFeature, {
              ftype: 'summary',
              dock : 'bottom'
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
	        
	        this.btnTeklifFiyatlariGridGroup = Ext.create('Ext.Button', {
			    iconCls : 'iconCategoryGrouping',
			    name: 'btnIhaleGridGroup',
			    tooltip : 'Gurupla',
			    handler : function(btn){
			    	if(me.teklifFiyatlariGroupingFeature.disabled){
			    		me.teklifFiyatlariGroupingFeature.enable();
			    		btn.setTooltip('Gurubu Kaldır');
			    	} else {
			    		me.teklifFiyatlariGroupingFeature.disable();
			    		btn.setTooltip('Gurupla');
			    	}
			    	me.getView().refresh();
			    }
			});
	        this.dockedItems = [{
	            xtype: 'toolbar',
	            dock: 'top',
	            height : 30,
	            items: [this.btnTeklifFiyatlariGridGroup, '->', this.btnTeklifFiyatlariGridPdf, {
	                xtype: 'exportbutton',
	                format : 'excel',
	                text : 'Excel',
	            	iconCls : 'iconXml',
	            	tooltip : 'Excel Dökümanı',
	                component: this
	              }]
	        }];
	        
	        this.viewConfig = {
        		copy: true,
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'secondGridDDGroup',
                    dropGroup: 'thirdGridDDGroup'
                }
        	}

        this.callParent(arguments);

    }
});