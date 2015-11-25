Ext.define('My.model.base.Satis', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int', useNull: true },
        { name : 'date', type : 'string' }, 
        'fkCalisanId',
        'fkUlkeId',
        'billNo',
        'cost'
    ]
});