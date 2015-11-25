Ext.define('My.controller.ihalepanel.IhalePanel', {
	extend : 'Ext.app.ViewController',
    requires : ['My.view.collection.Panel', 
                'My.view.ihalepanel.MainPanel', 
                'My.view.ihalepanel.IhaleGrid', 
                'My.view.collection.FormPanel', 
                'My.view.ihalepanel.SearchResultGroupGrid',
                'My.model.ihalepanel.IhaleGrid',
                'My.model.ihalepanel.SearchResultGroupGrid',
                'My.model.ihalepanel.CollectorGroupGrid',
                'My.store.ihalepanel.IhaleGrid',
                'My.store.ihalepanel.SearchResultGroupGrid',
                'My.store.ihalepanel.CollectorGroupGrid',
                'My.view.ihalepanel.SaveIhaleWin',
                'My.view.ihalepanel.SaveIhaleForm'
    ],
	initConfig : function() {

		this.setViewComponents();
		this.callParent(arguments);
        
	},
    setViewComponents : function(){
        
    	var me = this;
    	
    	this.ihaleWin = Ext.create('My.view.ihalepanel.SaveIhaleWin');
    	this.ihaleForm = Ext.create('My.view.ihalepanel.SaveIhaleForm');
        /* form buttons */
        this.btnFileUpload = Ext.create(Ext.form.field.File, {
			fieldLabel : 'İhale Dosyası Seçin',
			labelWidth : 120,
			width : 350,
			padding : 0,
			margin : 0,
			name : 'fileUploadField'
		});
        
        this.fileUploadForm = Ext.create('My.view.collection.FormPanel', {frame : true, border:false, padding: 0});
        
        
        this.btnSend = Ext.create('Ext.Button', {
		    // text: 'Oku',
		    iconCls : 'iconUploadIhale16',
		    name: 'btnSend',
		    handler: function() {
		        me.sendRequest();
		    }
		});

        
        /* form buttons */
        
        /* panel definitions */
        
        this.mainPanel = Ext.create('My.view.ihalepanel.MainPanel');
        
        this.centerPanel = Ext.create('My.view.collection.Panel', {
			region : 'center',
			border : true,
			layout : 'fit'
		});
        this.westPanel = Ext.create('My.view.collection.Panel', {
			title : 'Ihale Listesi',
			region : 'west',
			width : 500,
			minWidth: 470,
			maxWidth : 600,
			collapsible : true,
			border : true,
			layout : 'fit'
		});
        
        this.btnSearch = Ext.create('Ext.Button', {
		    // text: 'ARA',
		    iconCls : 'iconSearch16',
		    name: 'btnSearch',
		    handler : function(){
		    	me.sendSearchRequest();
		    }
		});
        
        
        this.btnSave = Ext.create('Ext.Button', {
		    text: 'Ihale Oluştur',
		    iconCls : 'iconTick16',
		    name: 'btnSave',
		    handler : function(){
		    	me.saveContract();
		    }
		});
        
        
        
        
        this.rowEditingCinsi = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        this.ihaleModel = Ext.create('My.model.ihalepanel.IhaleGrid');
        this.ihaleStore = Ext.create('My.store.ihalepanel.IhaleGrid', {
        	model : this.ihaleModel
        });
        
        this.ihaleGrid = Ext.create('My.view.ihalepanel.IhaleGrid', {
        	store : this.ihaleStore,
        	plugins : [this.rowEditingCinsi]
        });
        
        this.fileUploadForm.add(this.btnFileUpload);
        this.ihaleGridDockedItem = [{
            xtype: 'toolbar',
            dock: 'top',
            height : 30,
            items: [this.fileUploadForm, '-', this.btnSend, '->',this.btnSearch]
        }];
        
        this.ihaleGrid.addDocked(this.ihaleGridDockedItem);
        
        this.westPanel.add(this.ihaleGrid);
        
        
        /* search result grid panel */
        var searchResultModel = Ext.create('My.model.ihalepanel.SearchResultGroupGrid');
        var searchResultStore = Ext.create('My.store.ihalepanel.SearchResultGroupGrid', {
        	model : searchResultModel,
        	groupField: 'siraNo'
        });
        
        
        var searchResultColumns = [
                       // { text: 'ID', dataIndex: 'id', width: 50, type: 'number'},
                       // { text: 'Sıra No', dataIndex: 'sirano', width: 50, type: 'number'},
                       { text: 'Barkod', dataIndex: 'barkod', width: 100 },
                       { text: 'Firma Adı', dataIndex: 'firmaAdi', width: 100 },
                       { text: 'İlaç Adı', dataIndex: 'ilacAdi', flex : 1 },
                       { text: 'ATC Kodu', dataIndex: 'atcKodu', width: 80 },
                       { text: 'Fiyat', dataIndex: 'fiyat', width: 70,
                    	   renderer : function(value){
                    		   return Ext.util.Format.currency(value,' TL',2,true);
                    	   }
                       }
                       ];
        
        this.searchResultGroupingFeature = Ext.create('Ext.grid.feature.Grouping', {
        	groupHeaderTpl: '<span class="searchResHeader">Sira No:</span> {name} '
        		+'<span class="searchResHeader">Cinsi:</span> {[values.rows[0].data.cins]} '
        		+'<span class="searchResHeader">Toplam:</span> ({rows.length} adet)',
        	groupByText : 'siraNo'
            // startCollapsed: true
        });
        
        this.searchResultGroupedGrid = Ext.create('My.view.ihalepanel.SearchResultGroupGrid', {
        	store : searchResultStore,
        	title : 'Arama Sonuçları',
        	columns : searchResultColumns,
        	layout : 'auto',
        	features : [this.searchResultGroupingFeature],
        	forceFit : true,
        	viewConfig : {
        		plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'firstGridDDGroup',
                    dropGroup: 'secondGridDDGroup'
                }
        	}
        });
        /* search result grid panel */
        
        
        /* collector grid panel */
        this.eastPanel = Ext.create('My.view.collection.Panel', {
			title : 'Eklenenler',
			region : 'east',
			width : 550,
			minWidth: 300,
			collapsible : true,
			border : true,
			layout : 'fit'
		});
        this.collectorModel = Ext.create('My.model.ihalepanel.CollectorGroupGrid');
        this.collectorStore = Ext.create('My.store.ihalepanel.CollectorGroupGrid', {
        	model : this.collectorModel,
        	groupField: 'siraNo'
        });
        
        

        function change(val){
        	val = Ext.util.Format.currency(val,' TL',2,true);
//            if(val > 100000){
//                return '<span style="color:red;">' + val + '</span>';
//            }else if(val < 100000){
//                return '<span style="color:green;">' + val + '</span>';
//            }
            return val;
        }
        
        this.rowEditingFiyat = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        
        this.collectorColumns = [
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
        
        this.collectorGroupingFeature = Ext.create('Ext.grid.feature.Grouping', {
        	groupHeaderTpl: '<span class="searchResHeader">Sira No:</span> {name} '
        		+'<span class="searchResHeader">Cinsi:</span> {[values.rows[0].data.cins]} '
        		+'<span class="searchResHeader">Toplam:</span> ({rows.length} adet)',
        	groupByText : 'siraNo',
            // startCollapsed: true,
            disabled : true
        });
        this.collectorGroupedGrid = Ext.create('My.view.ihalepanel.SearchResultGroupGrid', {
        	store : this.collectorStore,
        	columns : this.collectorColumns,
        	forceFit : true,
        	plugins : [this.rowEditingFiyat],
        	features : [this.collectorGroupingFeature, {
                ftype: 'summary',
                dock : 'bottom'
            }],
        	viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'secondGridDDGroup',
                    dropGroup: 'firstGridDDGroup'
                }
        	}
        });
        this.eastPanel.add(this.collectorGroupedGrid);
        
        this.collectorGroupedGrid.on('edit', function(editor, e) {
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
        /* collector grid panel */
        
        
        
        /* Text form search for one by one search */
        this.searchByTextForm = Ext.create('My.view.collection.FormPanel', {frame : true, border:false, padding: 0});
        this.searchTextField = Ext.create('Ext.form.field.Text', {
        	name: 'etkenAdi',
        	enableKeyEvents : true,
            fieldLabel: 'Etken Adı',
            allowBlank: false,
			padding : 0,
			margin : '0 0 0 5'
        });
        this.searchTextField.on("keyup",
                function(sender, e, eOpts) {
            		if(e.keyCode==13){
            			me.sendTextSearchRequest();
            		} else if(sender.getValue().length>2){
            			me.sendTextSearchRequest();
            		}
        		}
        );
        this.searchByTextForm.add(this.searchTextField);
        
        
        this.btnTextSearch = Ext.create('Ext.Button', {
		    text: 'ARA',
		    iconCls : 'iconSearch16',
		    name: 'btnSearch',
		    handler : function(){
		    	me.sendTextSearchRequest();
		    }
		});
        this.btnTeklifFormu = Ext.create('Ext.Button', {
		    name: 'btnTeklifFormu',
		    iconCls : 'iconPdf',
        	tooltip : 'PDF Dökümanı',
		    handler : function(){
		    	me.downloadDocument("../../report/pdf");
		    }
		});
        
        this.btnClearCollectorGrid = Ext.create('Ext.Button', {
		    text: 'Temizle',
		    iconCls : 'iconClearData16',
		    name: 'btnClearCollectorGrid',
		    handler : function(){
		    	me.collectorGroupedGrid.getStore().removeAll();
            	me.searchResultGroupedGrid.getStore().loadData(me.searchResultJsonData);
		    }
		});
        this.searchResGridDockedItem = [{
            xtype: 'toolbar',
            dock: 'top',
            height : 30,
            items: [this.searchByTextForm, '-', this.btnTextSearch]
        }];
        this.searchResultGroupedGrid.addDocked(this.searchResGridDockedItem);
        
        this.collectorGridBottomDockedItem = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->', this.btnClearCollectorGrid, this.btnSave]
        }];
        
//        {
//            xtype: 'exportbutton',
//            store: this.collectorStore
//          }
        
        this.btnCollectorGridGroup = Ext.create('Ext.Button', {
		    iconCls : 'iconCategoryGrouping',
		    name: 'btnCollectorGridGroup',
		    tooltip : 'Gurupla',
		    handler : function(btn){
		    	if(me.collectorGroupingFeature.disabled){
		    		me.collectorGroupingFeature.enable();
		    		btn.setTooltip('Gurubu Kaldır');
		    	} else {
		    		me.collectorGroupingFeature.disable();
		    		btn.setTooltip('Gurupla');
		    	}
		    }
		});
        this.collectorGridDockedItem = [{
            xtype: 'toolbar',
            dock: 'top',
            height : 30,
            items: [this.btnCollectorGridGroup, '->', this.btnTeklifFormu, {
                xtype: 'exportbutton',
                format : 'excel',
                text : '',
            	iconCls : 'iconXml',
            	tooltip : 'XML Dökümanı',
                component: this.collectorGroupedGrid
              }]
        }];
        this.collectorGroupedGrid.addDocked(this.collectorGridDockedItem);
        this.collectorGroupedGrid.addDocked(this.collectorGridBottomDockedItem);
        
        this.centerPanel.add(this.searchResultGroupedGrid);
        
        this.mainPanel.add(this.westPanel, this.centerPanel, this.eastPanel);
        
        
        /* panel definitions */
        
    },
    
    getMainPanel : function(){
        return this.mainPanel;
    },
    sendRequest : function(){
		var me = this;
		var formData = me.fileUploadForm.getForm();
		
		if (formData.isValid()) {
            // Submit the Ajax request and handle the response
			formData.submit({
				url:'../../ihale/loadXmlToGrid.ajax',
				waitMsg: 'Uploading your file...',
                success: function(formData, action) {
                	me.ihaleGrid.getStore().loadData(action.result.data);
                },
                failure: function(formData, action) {
                	
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }
		
	},
	sendSearchRequest : function(){
		var me = this;
		var selection = me.ihaleGrid.getSelectionModel().getSelection();
		var jsonData = {};
		var jsonArr = [];
		var encodedData = "";
    	// features : [this.searchResultGroupingFeature],
		me.searchResultGroupingFeature.enable();
		if (me.ihaleGrid.getSelectionModel().hasSelection()) {
			for(var i=0; i<selection.length; i++){
			   var row = selection[i];
			   jsonArr.push(row.data);
			}
			jsonData.selectedData = jsonArr;
			encodedData = Ext.encode(jsonArr);
		}
		
		console.log(encodedData);
		Ext.Ajax.request({
		   url: '../../ihale/searchEtkenMadde.ajax',
		   params : { type : 1,  data : encodedData },
		   success: function(response, opts) {
		      var jsonData = Ext.util.JSON.decode(response.responseText.trim());
		      me.searchResultGroupedGrid.getStore().loadData(jsonData.data);
		      me.searchResultJsonData = jsonData.data;
		      // me.searchResultGroupingFeature.collapseAll();
		   },
		   failure: function(response, opts) {
		      console.log('server-side failure with status code ' + response.status);
		   }
		});
		
	},
	
	sendTextSearchRequest : function(){
		var me = this;
		var searchText = me.searchTextField.getValue();
		me.searchResultGroupingFeature.disable();
		Ext.Ajax.request({
		   url: '../../ihale/searchEtkenMadde.ajax',
		   params : { type : 2, data : searchText },
		   success: function(response, opts) {
		      var jsonData = Ext.util.JSON.decode(response.responseText.trim());
		      me.searchResultGroupedGrid.getStore().loadData(jsonData.data);
		      me.searchResultJsonData = jsonData.data;
		   },
		   failure: function(response, opts) {
		      console.log('server-side failure with status code ' + response.status);
		   }
		});
		
	},
	
	downloadDocument : function(url){
		var me = this;
//		var selection = me.collectorGroupedGrid.getSelectionModel().getSelection();
		var jsonData = {};
		var jsonArr = [];
		var encodedData = "";

		var storeData = me.collectorGroupedGrid.getStore().getRange();

		if (storeData!=null) {
			for(var i=0; i<storeData.length; i++){
			   var row = storeData[i];
			   jsonArr.push(row.data);
			}
			jsonData.selectedData = jsonArr;
			encodedData = Ext.encode(jsonArr);
		}
		Ext.Ajax.request({
			   url: '../../report/setdata',
			   params : { data : encodedData },
			   success: function(response, opts) {
			      
				   var iframeComponent = Ext.create('Ext.Component', {
			            xtype : "component",
			            border : false,
			            autoEl : {
			                tag : "iframe",
			                src : url // "../../report/pdf"
			            }
			        });
			        
			        new Ext.Window({
			            title : "iframe",
			            width : 900,
			            height: 500,
			            layout : 'fit',
			            maximizable: true,
			           // closeAction : 'hide',
			            items : [iframeComponent]
			        }).show();
				   
			   },
			   failure: function(response, opts) {
			      console.log('server-side failure with status code ' + response.status);
			   }
			});
		
	},
	
	saveContract : function(){
		var me = this;
		
		me.ihaleForm.cont = me.ihaleWin;
		me.ihaleForm.ihalePanel = me;
		
		me.ihaleWin.add(me.ihaleForm);
		me.ihaleWin.show();
		
		/*
		var me = this;
//		var selection = me.collectorGroupedGrid.getSelectionModel().getSelection();
		var jsonData = {};
		var jsonArr = [];
		var contractDetail = [];
		var contractSollution = [];

		var detailData = me.ihaleGrid.getStore().getRange();
		if (detailData!=null) {
			for(var i=0; i<detailData.length; i++){
			   var row = detailData[i];
			   contractDetail.push(row.data);
			}
		}
		
		jsonData = {};
		jsonArr = [];
		var solutionData = me.collectorGroupedGrid.getStore().getRange();
		if (solutionData!=null) {
			for(var i=0; i<solutionData.length; i++){
			   var row = solutionData[i];
			   contractSollution.push(row.data);
			}
		}
		
		jsonData = {
				detail : contractDetail,
				sollution : contractSollution
		};
		jsonArr = [jsonData];
		
		*/
		
		/*
		Ext.Ajax.request({
			   url: '../../report/setdata',
			   params : { data : Ext.encode(jsonArr) },
			   success: function(response, opts) {
		
			   },
			   failure: function(response, opts) {
			      console.log('server-side failure with status code ' + response.status);
			   }
			});
		*/
	}
    
});