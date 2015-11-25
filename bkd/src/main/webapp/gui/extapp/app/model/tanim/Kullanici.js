Ext.define('My.model.tanim.Kullanici', {
    extend: 'Ext.data.Model',
    autoLoad : false,
    fields: [{
	        name: 'kullaniciId',
	        type: 'int',
	        useNull: true
	    },
	    'adi', 
	    'password'
    ]
});