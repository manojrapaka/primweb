Ext.define('My.model.base.Havuz', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int', useNull: true },
        { name : 'date', type : 'string' }, 
        { name : 'startDate', type : 'string' }, 
        { name : 'endDate', type : 'string' }, 
        'cost'
    ]
});