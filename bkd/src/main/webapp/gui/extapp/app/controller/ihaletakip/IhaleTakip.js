Ext.define('My.controller.ihaletakip.IhaleTakip', {
	extend : 'Ext.app.ViewController',
    requires : [
                'My.view.ihaletakip.MainPanel',
                'My.view.ihaletakip.IhaleGrid',
                'My.view.ihaletakip.IhaleDetayForm',
                'My.view.collection.HboxPanel',
                'My.view.collection.VboxPanel',
                'My.view.ihaletakip.TeklifFormuGrid',
                'My.view.ihaletakip.TeklifFiyatlariGrid',
                'My.model.ihaletakip.IhaleGrid',
                'My.store.ihaletakip.IhaleGrid',
                'My.view.ihaletakip.IlacFiyatTeklifFormu',
                'My.model.ihaletakip.TeklifFormuGrid',
                'My.store.ihaletakip.TeklifFormuGrid'
            	],
	initConfig : function() {
		
		
		
		this.data = [{"baseEfiId":2909,"barkod":"8699505762838","firmaAdi":"ROCHE","ilacAdi":"ALTUZAN ROCHE 400MG/16ML KONS.INF.COZ.ICEREN 1 FLAKON","atcKodu":"bevacizumab","fiyat":"2523","siraNo":1,"cins":"Bevasizumab 400 Mg Flk","birim":"Adet","miktar":"400","tutar":1009200,"id":"My.model.ihalepanel.SearchResultGroupGrid-14"},
		             {"baseEfiId":2866,"barkod":"8699790760595","firmaAdi":"SCHERING PLOUGH","ilacAdi":"CAELYX 20 MG 1 FLAKON","atcKodu":"doxorubicin","fiyat":"759","siraNo":3,"cins":"Lipozomal Doksurubisin 20 Mg Flk","birim":"Adet","miktar":"150","tutar":113850,"id":"My.model.ihalepanel.SearchResultGroupGrid-18"},
		             {"baseEfiId":288,"barkod":"8699688772259","ilacAdi":"VISIPAQUE 320 MG 100 ML 1 FLAKON","atcKodu":"iodixanol","fiyat":"86","siraNo":117,"cins":"Iyod\u0131ksanol 320 Mg\u0131/Ml 100 Ml Enj Solusyon","birim":"Adet","miktar":"150","tutar":12900,"firmaAdi":"OPAKIM","id":"My.model.ihalepanel.SearchResultGroupGrid-450"},
		             {"baseEfiId":11422,"barkod":"8699524790515","firmaAdi":"DEVA","ilacAdi":"ADRIBLASTINA 50 MG 1 FLAKON","atcKodu":"doxorubicin","fiyat":"41","siraNo":33,"cins":"Doksorubisin 50 Mg Flk","birim":"Adet","miktar":"1375","tutar":56375,"id":"My.model.ihalepanel.SearchResultGroupGrid-155"},
		             {"baseEfiId":6216,"barkod":"8699508750511","firmaAdi":"I.E ULAGAY","ilacAdi":"HEMOPENE 100 MG 5 ML 10 AMPUL","atcKodu":"pentoxifylline","fiyat":"5","siraNo":66,"cins":"Pentoksifilin 100 Mg/5 Ml Amp","birim":"Adet","miktar":"1700","tutar":8500,"id":"My.model.ihalepanel.SearchResultGroupGrid-257"},
		             {"baseEfiId":8306,"barkod":"8699769650049","firmaAdi":"DEM","ilacAdi":"ISOFLUDEM 100 ML SISE","atcKodu":"isoflurane","fiyat":"0","siraNo":74,"cins":"Isoflurane 100 Ml Sol","birim":"Adet","miktar":"160","tutar":0,"id":"My.model.ihalepanel.SearchResultGroupGrid-292"},
		             {"baseEfiId":498,"barkod":"8699514014683","firmaAdi":"ABDI IBRAHIM","ilacAdi":"DEBRIDAT FORT 200 MG 20 TABLET","atcKodu":"trimebutine","fiyat":"9","siraNo":85,"cins":"Trimebutin Maleat 200 Mg Tb","birim":"Adet","miktar":"600","tutar":5400,"id":"My.model.ihalepanel.SearchResultGroupGrid-329"},
		             {"baseEfiId":3147,"barkod":"8699548761485","firmaAdi":"ABBOTT","ilacAdi":"CHIROCAINE 75 MG/10 ML INF. ICIN KONS. COZELTI ICEREN 10ML X 10 AMPUL","atcKodu":"LEVOBUPIVACAINE","fiyat":"70","siraNo":96,"cins":"Levobupivakain Hc\u0131 7,5 Mg/Ml Ampul","birim":"Adet","miktar":"50","tutar":3500,"id":"My.model.ihalepanel.SearchResultGroupGrid-398"},
		             {"baseEfiId":1831,"barkod":"8699593755408","firmaAdi":"JOHNSON","ilacAdi":"RAPIFEN 0,5 MG 10 ML 5 AMPUL","atcKodu":"alfentanil","fiyat":"0","siraNo":99,"cins":"Alfentan\u0131l Hc\u0131 0,5 Mg/Ml 10 Ml Ampul","birim":"Adet","miktar":"500","tutar":0,"id":"My.model.ihalepanel.SearchResultGroupGrid-407"}
		            ];
		
		

		this.setViewComponents();
		this.setListeners();
		this.setHandlers();
		this.callParent(arguments);
        
	},
    setViewComponents : function(){
        
    	var me = this;
   
    	this.refreshGrids = function (){
			me.ihaleGrid.getView().refresh();
			me.ihaleIcerigiGrid.getView().refresh();
			me.teklifFiyatlariGrid .getView().refresh();
			me.teklifFormuGrid.getView().refresh();
		};
    	/* Main Panel */
        this.mainPanel = Ext.create('My.view.ihaletakip.MainPanel');
        this.mainPanel.addListener('afterrender', function(panel, opts){
        	me.westPanelContractGrid.getStore().load();
        });
        /* Main Panel */
        
        
        /* west panel */

        
            
        this.westPanel = Ext.create('My.view.collection.Panel', {
        	title : 'İhale Listesi',
        	region : 'west',
        	border : true,
        	collapsible : true,
        	width : 300,
        	minWidth : 300,
        	maxWidth : 500,
        	layout : 'fit'
        });
        
        // this.westBorderPanel = Ext.create('My.view.collection.BorderPanel');
        
        
        this.ihaleTakipContractModel = Ext.create('My.model.ihaletakip.IhaleGrid');
        this.ihaleTakipContractStore = Ext.create('My.store.ihaletakip.IhaleGrid', {
        	model : this.ihaleTakipContractModel
        });
        this.westPanelContractGrid = Ext.create('My.view.ihaletakip.IhaleGrid',{
        	region : 'west',
        	store : this.ihaleTakipContractStore
        });

        
//        this.westSouthPanel = Ext.create('My.view.ihaletakip.IhaleDetayForm', {
//        	title : 'İhale Detay',
//        	region : 'south',
//        	height : 290,
//        	minHeight : 290,
//        	maxHeight : 290,
//        	autoScroll : true,
//        	collapsible : false,
//        	header : false
//        });

        // this.westBorderPanel.add(this.westCenterPanelGrid, this.westSouthPanel);
        this.westPanel.add(this.westPanelContractGrid);
        /* west panel */
        
        
        /* center panel */
        function change(val){
        	val = Ext.util.Format.currency(val,' TL',2,true);
            return val;
        }
        this.rowEditingFiyat1 = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        
        
        this.ihaleModel = Ext.create('My.model.ihalepanel.CollectorGroupGrid');
        this.ihaleStore = Ext.create('My.store.ihalepanel.CollectorGroupGrid', {
        	model : this.ihaleModel,
        	groupField: 'siraNo'
        });
        this.ihaleColumns = [
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
	                 },
	                 {
	                	    xtype:'actioncolumn',
	                	    width:20,
	                	    items: [
	                	        {
	                	            iconCls: 'iconRowDelete16',
	                	            tooltip: 'Edit this row',
	                	            handler: function(gridview, rowIndex, colIndex, item, e, record, row) {
	                	            	gridview.getStore().remove(record);
	                	                me.refreshGrids();
	                	                
	                	                if(me.droppedElements.length > 0){
	                	    	            for(var i=0; i<me.droppedElements.length; i++){
	                	    	        		if(record.data.siraNo == me.droppedElements[i]){
	                	    	        			me.droppedElements.splice(i, 1);
	                	    	        		}
	                	    	        	}
	                	                } 
	                	            }
	                	        }
	                	    ]
                	}
	                 
	             ];
		  
		  this.ihaleGroupingFeature = Ext.create('Ext.grid.feature.Grouping', {
				groupHeaderTpl: '<span class="searchResHeader">Sira No:</span> {name} '
					+'<span class="searchResHeader">Cinsi:</span> {[values.rows[0].data.cins]} '
					+'<span class="searchResHeader">Toplam:</span> ({rows.length} adet)',
				groupByText : 'siraNo',
			  // startCollapsed: true,
				disabled : true
		  });
        this.ihaleGrid = Ext.create('My.view.ihalepanel.SearchResultGroupGrid', {
        	title: 'Kesin İhale',
        	border : true,
        	autoScroll : true,
        	store : this.ihaleStore,
        	columns : this.ihaleColumns,
        	plugins : [this.rowEditingFiyat1],
        	features : [this.ihaleGroupingFeature, {
                ftype: 'summary',
                dock : 'bottom'
            }],
        	viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
//                    dragGroup: 'firstGridDDGroup'
                    dropGroup: 'secondGridDDGroup'
                }
        	}
        });

        this.droppedElements = [];
        this.deletedElements = [];
        
        this.ihaleGrid.getView().addListener('beforedrop', function(node, data, overModel, dropPosition, dropHandlers) {
            // Defer the handling
        	me.deletedElements = [];
            dropHandlers.wait = true;
            var flag = false;
            if(me.droppedElements.length > 0){
	            for(var i=0; i<me.droppedElements.length; i++){
	        		for(var j=0; j<data.records.length; j++){
		            	if(typeof data.records[j] != "undefined" && data.records[j].data.siraNo == me.droppedElements[i]){
		        			flag = true;
		        			me.deletedElements.push(me.droppedElements[i]);
		        			data.records.splice(j,1);
	        				j--;
		        		}
	        		}
	        	}
            } 
            if(!flag){
            	dropHandlers.processDrop();
            	for(var j=0; j<data.records.length; j++){
            		me.droppedElements.push(data.records[j].data.siraNo);
            	}
            } else {
	            Ext.MessageBox.alert('Drop', 'Sıra No: ' + me.deletedElements.toString() +' olan kayıtlar zaten var.', function(btn){

		            dropHandlers.processDrop();
		            for(var j=0; j<data.records.length; j++){
	            		me.droppedElements.push(data.records[j].data.siraNo);
	            	}
	            });
	            
            }
//            Ext.MessageBox.confirm('Drop', 'Aynı sira nolu kayıttan zaten var.', function(btn){
//            	debugger;
//            	for(var i=0; i<data.records.length; i++){
//            		if(data.records[i].data.siraNo == node.dragData.recors[0].data.siraNo){
//            			
//            		}
//            	}
//                if (btn === 'yes') {
//                    dropHandlers.processDrop();
//                } else {
//                    dropHandlers.cancelDrop();
//                }
//            });
        });
        
        this.ihaleGrid.getView().addListener('drop', function(record) {
        	me.refreshGrids();
        });
        
        this.btnIhaleGridTeklifPdf = Ext.create('Ext.Button', {
        	text : 'Teklif Mektubu',
		    name: 'btnIhaleGridTeklifPdf',
		    iconCls : 'iconPdf',
        	tooltip : 'Teklif Mektubu Oluştur',
		    handler : function(){
		    	me.downloadDocument("../../report/pdf");
		    }
		});
        
        this.btnIhaleGridGroup = Ext.create('Ext.Button', {
		    iconCls : 'iconCategoryGrouping',
		    name: 'btnIhaleGridGroup',
		    tooltip : 'Gurupla',
		    handler : function(btn){
		    	if(me.ihaleGroupingFeature.disabled){
		    		me.ihaleGroupingFeature.enable();
		    		btn.setTooltip('Gurubu Kaldır');
			    	me.refreshGrids();
		    	} else {
		    		me.ihaleGroupingFeature.disable();
		    		btn.setTooltip('Gurupla');
			    	me.refreshGrids();
		    	}
		    }
		});
        this.ihaleGridDockedItem = [{
            xtype: 'toolbar',
            dock: 'top',
            height : 30,
            items: [this.btnIhaleGridGroup, '->', this.btnIhaleGridTeklifPdf, {
                xtype: 'exportbutton',
                format : 'excel',
                text : 'Teklif Cetveli',
            	iconCls : 'iconXml',
            	tooltip : 'Teklif Cetveli Oluştur',
                component: this.ihaleGrid
              }]
        }];
        this.ihaleGrid.addDocked(this.ihaleGridDockedItem);
        
        
        /**************************************************************************************************************************/
        
        
        this.rowEditingFiyat2 = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        
        this.ihaleIcerigiModel = Ext.create('My.model.ihalepanel.CollectorGroupGrid');
        this.ihaleIcerigiStore = Ext.create('My.store.ihalepanel.CollectorGroupGrid', {
        	model : this.ihaleIcerigiModel,
        	groupField: 'siraNo'
        });
        this.ihaleIcerigiColumns = [
		             // { text: 'ID', dataIndex: 'id', width: 50, type: 'number'},
		             { text: 'Sıra No', dataIndex: 'siraNo', type: 'number', width : 35},
		             { text: 'Barkod', dataIndex: 'barkod', type: 'string' },
		             { text: 'Firma Adı', dataIndex: 'firmaAdi', type: 'string' },
		             { text: 'İlaç Adı', dataIndex: 'ilacAdi', type: 'string' },
		             { text: 'ATC Kodu', dataIndex: 'atcKodu', type: 'string' },
		             { text: 'Miktar', dataIndex: 'miktar', type: 'float' },
		             { text: 'Fiyat', dataIndex: 'fiyat', type: 'float',
		          	   renderer : function(value){
		          		   if(typeof value != "undefined" && value != null && value != ""){
		              		   return Ext.util.Format.currency(value,' TL',2,true);
		          		   } else {
		              		   return Ext.util.Format.currency(0,' TL',2,true);
		          		   }
		          	   }
		             },
		             { text: 'Yeni Fiyat', dataIndex: 'yeniFiyat', type: 'string',
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
		          	   type: 'float', 
		          	   width : 160,
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
		  
		  this.ihaleIcerigiGroupingFeature = Ext.create('Ext.grid.feature.Grouping', {
				groupHeaderTpl: '<span class="searchResHeader">Sira No:</span> {name} '
					+'<span class="searchResHeader">Cinsi:</span> {[values.rows[0].data.cins]} '
					+'<span class="searchResHeader">Toplam:</span> ({rows.length} adet)',
				groupByText : 'siraNo',
			  // startCollapsed: true,
				disabled : true
		  });
        this.ihaleIcerigiGrid = Ext.create('My.view.ihalepanel.SearchResultGroupGrid', {
        	title: 'İhale İçeriği',
        	border : true,
        	autoScroll : true,
        	store : this.ihaleIcerigiStore,
        	columns : this.ihaleIcerigiColumns,
        	plugins : [this.rowEditingFiyat2],
        	features : [this.ihaleIcerigiGroupingFeature, {
                ftype: 'summary',
                dock : 'bottom'
            }],
            selModel : {
                selType : 'checkboxmodel'
            },
        	viewConfig: {
        		copy: true,
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'secondGridDDGroup',
                    dropGroup: 'firstGridDDGroup'
                }
        	}
        });
        
        
        this.ihaleIcerigiGrid.on('edit', function(editor, e) {
        	console.log('Recalculate the data');
        	var rec = e.record;
        	if(typeof rec.get('yeniFiyat') != "undefined" && rec.get('yeniFiyat') != "0" && rec.get('yeniFiyat') != ""){
        		rec.set('tutar', rec.get('yeniFiyat') * rec.get('miktar'));
        	} else {
        		rec.set('tutar', rec.get('fiyat') * rec.get('miktar'));
        		rec.commit();
        	}
        	// rec.commit();
        	
        });
        
        
        this.btnIhaleIcerigiFormu = Ext.create('Ext.Button', {
        	text : 'Fiyat Teklif',
		    name: 'btnTeklifFormu',
		    iconCls : 'iconForm16',
        	tooltip : 'Fiyat Teklifi Oluştur'
		});
        
        this.btnIhaleIcerigiGridGroup = Ext.create('Ext.Button', {
		    iconCls : 'iconCategoryGrouping',
		    name: 'btnIhaleIcerigiGridGroup',
		    tooltip : 'Gurupla',
		    handler : function(btn){
		    	if(me.ihaleIcerigiGroupingFeature.disabled){
		    		me.ihaleIcerigiGroupingFeature.enable();
		    		btn.setTooltip('Gurubu Kaldır');
		    	} else {
		    		me.ihaleIcerigiGroupingFeature.disable();
		    		btn.setTooltip('Gurupla');
		    	}
		    	me.refreshGrids();
		    }
		});
        this.ihaleIcerigiGridDockedItem = [{
            xtype: 'toolbar',
            dock: 'top',
            height : 30,
            items: [this.btnIhaleIcerigiGridGroup, '->', this.btnIhaleIcerigiFormu, {
                xtype: 'exportbutton',
                format : 'excel',
                text : '',
            	iconCls : 'iconXml',
            	tooltip : 'XML Dökümanı',
                component: this.ihaleIcerigiGrid
              }]
        }];
        this.ihaleIcerigiGrid.addDocked(this.ihaleIcerigiGridDockedItem);

        this.hlayoutPanel1 = Ext.create('My.view.collection.HboxPanel',{
        	border : false,
        	flex : 1,
        	items : [this.ihaleIcerigiGrid,this.ihaleGrid]
        });

       //  me.ihaleIcerigiGrid.getStore().loadData(this.data)
        
        this.teklifFormuGridModel = Ext.create('My.model.ihaletakip.TeklifFormuGrid');
        
        this.teklifFormuStore = Ext.create('My.store.ihaletakip.TeklifFormuGrid', {
        	model : me.teklifFormuGridModel
        });
        this.teklifFormuGrid = Ext.create('My.view.ihaletakip.TeklifFormuGrid',{
        	title : 'İlaç Fiyat Teklifleri',
        	store : me.teklifFormuStore,
        	border : true,
        	flex : 1
        });
        
        this.teklifFiyatlariGrid = Ext.create('My.view.ihaletakip.TeklifFiyatlariGrid',{
        	title : 'Teklif Edilen Fiyat Listesi',
        	border : true,
        	flex : 1
        });
        
        this.hlayoutPanel2 = Ext.create('My.view.collection.HboxPanel',{
        	border : false,
        	flex : 1,
        	items : [this.teklifFormuGrid, this.teklifFiyatlariGrid]
        });
        
        this.vlayoutPanel = Ext.create('My.view.collection.VboxPanel',{
        	border : false,
        	items : [this.hlayoutPanel1,this.hlayoutPanel2]
        });
        
        
        
        
        

        this.centerPanel = Ext.create('My.view.collection.Panel', {
        	region : 'center',
        	layout : 'fit',
        	items : [this.vlayoutPanel]
        });
        /* center panel */
        
        this.mainPanel.add(this.westPanel, this.centerPanel);
        
        
    },

	setListeners : function(){
		var me = this;
		
		me.selectedContractId = -1;
		this.westPanelContractGrid.addListener('itemdblclick', function(dv, record, item, index, e){
			me.selectedContractId = record.data.id;

			me.droppedElements = [];
			me.ihaleGrid.getStore().removeAll();
			me.teklifFiyatlariGrid.getStore().removeAll();
			
			me.loadIhaleIcerigiGrid();
			me.loadTeklifFormuGrid();
		});
		
		me.selectedTeklifFormuId = -1;
		this.teklifFormuGrid.addListener('itemdblclick', function(dv, record, item, index, e){
			me.selectedTeklifFormuId = record.data.tenderId;
			me.loadTeklifFormuDetailGrid();
		});
	},
	loadIhaleIcerigiGrid : function(){
		var me = this;
		Ext.Ajax.request({
		   url: '../../ihale/getContractSolutionsByContractId.ajax',
		   params : { contractId : me.selectedContractId },
		   success: function(response, opts) {
		      var jsonData = Ext.util.JSON.decode(response.responseText.trim());
		      me.ihaleIcerigiGrid.getStore().loadData(jsonData.data);
		      me.refreshGrids();
		   },
		   failure: function(response, opts) {
		      console.log('server-side failure with status code ' + response.status);
		   }
		});
	},
	loadTeklifFormuGrid: function(){
		var me = this;
		Ext.Ajax.request({
		   url: '../../ihale/getTendersByContractId.ajax',
		   params : { contractId : me.selectedContractId },
		   success: function(response, opts) {
		      var jsonData = Ext.util.JSON.decode(response.responseText.trim());
		      me.teklifFormuGrid.getStore().loadData(jsonData.data);
		      me.refreshGrids();
		   },
		   failure: function(response, opts) {
		      console.log('server-side failure with status code ' + response.status);
		   }
		});
	},
	loadTeklifFormuDetailGrid : function(){
		var me = this;
		Ext.Ajax.request({
			   url: '../../ihale/getTenderDetailsByTenderId.ajax',
			   params : { tenderId: me.selectedTeklifFormuId },
			   success: function(response, opts) {
			      var jsonData = Ext.util.JSON.decode(response.responseText.trim());
			      me.teklifFiyatlariGrid.getStore().loadData(jsonData.data);
			      me.refreshGrids();
			   },
			   failure: function(response, opts) {
			      console.log('server-side failure with status code ' + response.status);
			   }
			});
	},
	setHandlers : function(){
		var me = this;
		
		this.firmaIlacTeklifWindow = Ext.create('My.view.collection.Window',{
			title : 'Firma Seçimi',
			width : 400,
			modal : true,
			resizable : false,
			closeAction : 'hide',
			destroy : function( item, eOpts ){
				item.hide();
			}
		});
		this.firmaIlacTeklifFormu = Ext.create('My.view.ihaletakip.IlacFiyatTeklifFormu',{
			firmaIlacTeklifWindow : this.firmaIlacTeklifWindow,
			ihaleTakipPanel : this
		});
		this.firmaIlacTeklifWindow.add(this.firmaIlacTeklifFormu);
		
		this.btnIhaleIcerigiFormu.setHandler(function(btn){
			
			me.firmaIlacTeklifWindow.show();
			
		});
	},
    getMainPanel : function(){
        return this.mainPanel;
    }
    
});