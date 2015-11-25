Ext.define('My.view.collection.Combobox', {
	extend : 'Ext.form.ComboBox',
    // fieldLabel: 'Choose State',
    store: Ext.create('Ext.data.Store', {
        fields: ['val', 'name'],
    }),
    queryMode: 'remote',
    displayField: 'name',
    valueField: 'val'
});