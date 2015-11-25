Ext.define("My.controller.tanim.Ulke", {
    name: 'cntUlke',
    extend: 'Ext.app.ViewController',
    initConfig: function () {

        var me = this;
        var store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            autoSync: true,
            model: Ext.create('My.model.tanim.Ulke'),
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


        var tanimGrupStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'value'],
            data: [
                {"id": 0, "value": "İhale Sorumlusu"},
                {"id": 1, "value": "Genel Müdür"},
                {"id": 2, "value": "Sekreterlik"}
            ]
        });

        this.grid = Ext.create('Ext.grid.Panel', {
            itemId: 'ulkeGrid',
            plugins: [rowEditing],
            frame: false,
            border : false,
            title: 'Ülkeler Tablosu',
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
                    header: 'Adı',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'adi',
                    editor: {
                        xtype: 'textfield'
                    }
                }, {
                    text: 'Grup',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'fkGrupId',
                    editor: Ext.create('Ext.form.ComboBox', {
                        store: tanimGrupStore,
                        queryMode: 'local',
                        displayField: 'value',
                        valueField: 'id',
                        autoSelect: true,
                        allowBlank: false
                    }),
                    renderer: function (value) {

                        var result = '';

                        tanimGrupStore.findBy(function (record) {
                            if (record.getId() == value) {
                                result = record.get('value');
                            }
                        });

                        return result;
                    }
                }],
            dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                            text: 'Add',
                            iconCls: 'icn-user-add',
                            handler: function () {
                                // empty record
                                store.insert(0, Ext.create('My.model.tanim.Ulke'));
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