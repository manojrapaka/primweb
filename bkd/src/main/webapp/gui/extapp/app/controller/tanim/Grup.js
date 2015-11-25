Ext.define("My.controller.tanim.Grup", {
    name: 'cntGrup',
    itemId : 'cntGrup',
    extend: 'Ext.app.ViewController',
    initConfig: function () {

        var me = this;
        goc.add(me);
        var model = Ext.create('My.model.tanim.Grup');
        
        var loadGridStore = function(){
        	goc.getAll("grup", {}, function(res){
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
            		goc.saveOrUpdate('grup', e.record.data, function(){
            			loadGridStore();
            		});
            		
            	},
                cancelEdit: function (rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.data.primId == 0) {
                        store.remove(context.record);
                    }
                }
            }
        });

       
        this.grid = Ext.create('Ext.grid.Panel', {
            itemId: 'grupGrid',
            plugins: [rowEditing],
            frame: false,
            border : false,
            title: 'Grup Tablosu',
            store: store,
            iconCls: 'icon-user',
            columns: [{
                    header: 'ID',
                    width: 50,
                    sortable: true,
                    dataIndex: 'grupId',
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
                    header: 'Katsayı  %',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'katsayi',
                    editor: {
                        xtype: 'numberfield',
                        minValue: 0, //prevents negative numbers
                        maxValue : 100,
                        step: 0.1,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: false,
                        keyNavEnabled: true,
                        mouseWheelEnabled: true
                    }
                }],
            dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        text: 'Add',
                        iconCls: 'icn-user-add',
                        handler: function () {
                            // empty record
                            store.insert(0, Ext.create("My.model.tanim.Grup", {
                            	primId : "",
                            	adi : "Yeni Grup"
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
                            	goc.deleteById("grup", selection.data, function(){
                            		loadGridStore();
                            	});
                            }
                        }
                    }]
                }]
        });
        me.grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
            me.grid.down('#delete').setDisabled(selections.length === 0);
        });
        loadGridStore();
    },
    getMainPanel: function () {
        return this.grid;
    }
});