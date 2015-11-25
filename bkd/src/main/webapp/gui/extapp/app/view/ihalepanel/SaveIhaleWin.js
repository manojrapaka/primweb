Ext.define('My.view.ihalepanel.SaveIhaleWin', {
	extend : 'My.view.collection.Window',
	title : 'Ihale Kayıt',
	modal : true,
	width : 400,
	resizable : false,
	closeAction : 'hide',
	destroy : function( item, eOpts ){
		item.hide();
	}
});
