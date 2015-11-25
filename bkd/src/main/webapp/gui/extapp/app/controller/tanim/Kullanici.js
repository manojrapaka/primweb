Ext.define("My.controller.tanim.Kullanici", {
    name: 'cntKullanici',
    itemId : 'cntKullanici',
    extend: 'Ext.app.ViewController',
    initConfig: function () {

        var me = this;
        goc.add(me);
    	var model = Ext.create('My.model.tanim.Kullanici');
        
        me.loadGridStore = function(){
        	goc.getAll("kullanici", {}, function(res){
            	me.grid.getStore().loadData(res.data);
            });
        }
        
        var store = Ext.create('Ext.data.Store', {
            autoSync: false,
            model: model,
            listeners: {
                write: function (store, operation) {
                    var record = operation.getRecords()[0],
                            name = Ext.String.capitalize(operation.action),
                            verb;
                    if (name == 'Destroy') {
                        verb = 'Destroyed';
                    } else {
                        verb = name + 'd';
                    }
                    Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));

                }
            },
            autoLoad : false
        });
        

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
            	edit : function(editor, e) {
            		goc.saveOrUpdate('kullanici', e.record.data, function(){
            			me.loadGridStore();
            		});
            		
            	},
                cancelEdit: function (rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.data.kullaniciId == 0) {
                        store.remove(context.record);
                    }
                }
            }
        });


//        var gorev = Ext.create('Ext.data.Store', {
//            fields: ['kullaniciId', 'gorev'],
//            data: [
//                {"gorevId": 0, "gorev": "İhale Sorumlusu"},
//                {"gorevId": 1, "gorev": "Genel Müdür"},
//                {"gorevId": 2, "gorev": "Sekreterlik"}
//            ]
//        });
//
//        var comboGorev = Ext.create('My.view.collection.Combobox', {
//            store: gorev,
//            queryMode: 'local',
//            displayField: 'gorev',
//            valueField: 'gorevId',
//            autoSelect: true,
//            allowBlank: false
//        });
        
        this.grid = Ext.create('Ext.grid.Panel', {
            itemId: 'kullaniciGrid',
            plugins: [rowEditing],
            frame: false,
            border : false,
            title: 'Kullanicilar Tablosu',
            store: store,
            iconCls: 'icon-user',
            columns: [{
                    text: 'ID',
                    width: 50,
                    sortable: true,
                    dataIndex: 'kullaniciId',
                    hidden : true,
                    renderer: function (v, meta, rec) {
                        return rec.phantom ? '' : v;
                    }
                }, {
                    header: 'Adı',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'adi',
                    editor: {
                        xtype: 'textfield'
                    }
                }, {
                    header: 'Görev',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'password',
                    editor: {
                        xtype: 'textfield',
                        inputType:'password'
                    },
                    renderer: function (v, meta, rec) {
                        return '******';
                    }
                    
                }],
            dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                            text: 'Add',
                            iconCls: 'icn-user-add',
                            handler: function () {
                                // empty record
                                store.insert(0, Ext.create("My.model.tanim.Kullanici", {
                                	kullaniciId : "",
                                	adi : "Yeni Kullanıcı"
                                }));
                                rowEditing.startEdit(0, 0);
                            }
                        }, '-', {
                            itemId: 'delete',
                            text: 'Delete',
                            iconCls: 'icn-user-delete',
                            disabled: true,
                            handler: function () {
                                var selection = me.grid.getView().getSelectionModel().getSelection()[0];
                                if (selection) {
                                	goc.deleteById("kullanici", selection.data, function(){
                                		me.loadGridStore();
                                	});
                                }
                            }
                        }]
                }]
        });
        me.grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
            me.grid.down('#delete').setDisabled(selections.length === 0);
        });
        me.loadGridStore();

        

    },
    getMainPanel: function () {
        return this.grid;
    }
});