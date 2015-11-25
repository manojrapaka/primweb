Ext.define("My.controller.base.Satis", {
    name: 'cntSatis',
    extend: 'Ext.app.ViewController',
    initConfig: function () {

        var me = this;
        var store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            autoSync: true,
            model: Ext.create('My.model.base.Satis'),
            proxy: {
                type: 'rest',
                url: 'app.php/users',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json'
                }
            },
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
            }
        });

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
                cancelEdit: function (rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                }
            }
        });


        var calisanGrupStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'value'],
            data: [
                {"id": 0, "value": "İhale Sorumlusu"},
                {"id": 1, "value": "Genel Müdür"},
                {"id": 2, "value": "Sekreterlik"}
            ]
        });
        
        var ulkeGrupStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'value'],
            data: [
                {"id": 0, "value": "Amerika"},
                {"id": 1, "value": "İran"},
                {"id": 2, "value": "Hindistan"}
            ]
        });

        this.grid = Ext.create('Ext.grid.Panel', {
            itemId: 'satisGrid',
            plugins: [rowEditing],
            frame: false,
            border : false,
            title: 'Satiş Girişi',
            store: store,
            iconCls: 'icon-user',
            columns: [{
                    text: 'ID',
                    width: 50,
                    sortable: true,
                    dataIndex: 'id',
                    hidden : true,
                    renderer: function (v, meta, rec) {
                        return rec.phantom ? '' : v;
                    }
                }, {
                    header: 'Tarih',
                    width : 197,
                    sortable: true,
                    dataIndex: 'date',
                    xtype: 'datecolumn',   
                    format:'d.m.Y',
                    editor: {
                        xtype: 'datefield',
                        anchor: '100%',
                        name: 'date',
                        // The value matches the format; will be parsed and displayed using that format.
                        format: 'd.m.Y',
                        value: '2 4 1978',
                        handler: function(picker, date) {
                            // do something with the selected date
                        }
                    }
                }, {
                    text: 'Çalışan',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'fkCalisanId',
                    editor: Ext.create('Ext.form.ComboBox', {
                        store: calisanGrupStore,
                        queryMode: 'local',
                        displayField: 'value',
                        valueField: 'id',
                        autoSelect: true,
                        allowBlank: false
                    }),
                    renderer: function (value) {

                        var result = '';

                        calisanGrupStore.findBy(function (record) {
                            if (record.getId() == value) {
                                result = record.get('value');
                            }
                        });

                        return result;
                    }
                }, {
                    text: 'Ülke',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'fkUlkeId',
                    editor: Ext.create('Ext.form.ComboBox', {
                        store: ulkeGrupStore,
                        queryMode: 'local',
                        displayField: 'value',
                        valueField: 'id',
                        autoSelect: true,
                        allowBlank: false
                    }),
                    renderer: function (value) {

                        var result = '';

                        ulkeGrupStore.findBy(function (record) {
                            if (record.getId() == value) {
                                result = record.get('value');
                            }
                        });

                        return result;
                    }
                }, {
                    header: 'Fatura No',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'billNo',
                    editor: {
                        xtype: 'textfield'
                    }
                }, {
                    header: 'Tutar',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'cost',
                    editor: {
                        xtype: 'numberfield',
                        minValue: 0, //prevents negative numbers
                        step: 0.1,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false
                    }
                }],
            dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                            text: 'Add',
                            iconCls: 'icn-user-add',
                            handler: function () {
                                // empty record
                                store.insert(0, Ext.create('My.model.base.Satis'));
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
                                    store.remove(selection);
                                }
                            }
                        }]
                }]
        });
        me.grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
            me.grid.down('#delete').setDisabled(selections.length === 0);
        });

    },
    getMainPanel: function () {
        return this.grid;
    }
});