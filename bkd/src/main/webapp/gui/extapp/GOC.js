function GOC() {
};

GOC.prototype = {
	singleton : false,
	add : function(obj) {
		if (typeof obj.itemId == "undefined") {
			this[obj.id] = obj;
		} else {
			this[obj.itemId] = obj;
		}
	},
	get : function(itemId) {
		return this[itemId];
	},
	toastSuccess : function(msg) {

		Ext.toast({
			html : msg,
			// title: 'My Title',
			width : 200,
			align : 't',
			alwaysOnTop : true,
			bodyStyle : {
				textAlign : 'center',
				fontWeight : 'bold',
				fontSize : '14px',
				color : 'White',
				background : 'lightGreen'
			},
			autoDestroy : true,
			stickOnClick : false,
			slideInDuration : 600,
			border : false,
			shadow : true,
			closable : false
		});

	},
	toastFailure : function(msg) {

		Ext.toast({
			html : msg,
			// title: 'My Title',
			width : 200,
			align : 't',
			alwaysOnTop : true,
			bodyStyle : {
				textAlign : 'center',
				fontWeight : 'bold',
				fontSize : '14px',
				color : 'White',
				background : 'Red'
			},
			autoDestroy : true,
			stickOnClick : false,
			slideInDuration : 600,
			border : false,
			shadow : true,
			closable : false
		});

	},
	saveOrUpdate : function(url, datavalue, callBack) {

		Ext.Ajax.request({
			url : '../../' + url + "/saveOrUpdate.ajax",
			params : {
				data : Ext.encode(datavalue)
			},
			success : function(response, opts) {
				var obj = Ext.decode(response.responseText);

				if (obj.success == true) {
					callBack();
					goc.toastSuccess('Kayıt Başarılı');

				} else {
					goc.toastFailure('Kayıt Başarısız');
				}

			},
			failure : function(response, opts) {
				console.log('server-side failure with status code '
						+ response.status);
			}
		});

	},
	deleteById : function(url, datavalue, callBack) {

		Ext.Msg.show({
			title : 'Kayıt Sonucu',
			message : 'Kaydı silmek istediğinizden emin misiniz ?',
			buttons : Ext.Msg.YESNO, // YESNOCANCEL
			icon : Ext.Msg.INFO,
			fn : function(btn) {
				if (btn === 'yes') {
					Ext.Ajax.request({
						url : '../../' + url + "/deleteById.ajax",
						params : {
							data : Ext.encode(datavalue)
						},
						success : function(response, opts) {
							var obj = Ext.decode(response.responseText);

							if (obj.success == true) {
								callBack();
								goc.toastSuccess('Silme İşlemi Başarılı');

							} else {
								goc.toastFailure('Silme İşlemi Başarısız');
							}

						},
						failure : function(response, opts) {
							console.log('server-side failure with status code '
									+ response.status);
						}
					});
				} else if (btn === 'no') {
					console.log('No pressed');
				} else {
					console.log('Cancel pressed');
				}
			}
		});

	},
	getAll : function(url, data, callback) {
		var result = {};

		Ext.Ajax.request({
			url : '../../' + url + "/getAll.ajax",
			params : data,
			success : function(response, opts) {
				var obj = Ext.decode(response.responseText);

				if (obj.success == true) {
					var obj = Ext.decode(response.responseText);
					callback(obj);
				} else {
					goc.toastFailure('İşlem Başarısız');
				}

			},
			failure : function(response, opts) {
				console.log('server-side failure with status code '
						+ response.status);
			}
		});
	}

}

var goc = new GOC();