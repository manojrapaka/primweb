Ext.define('My.model.tanim.Grup', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'grupId',
        type: 'int',
        useNull: true
    },'adi', { name: 'katsayi', type : 'float'}]
});