Ext.define("My.model.ihalepanel.CollectorGroupGrid", {
    extend : 'Ext.data.Model',
    idProperty : 'id',
    fields : [ {name:'baseEfiId'}, 
               {name:'barkod'}, 
               {name:'firmaAdi'}, 
               {name:'ilacAdi'}, 
               {name:'atcKodu'}, 
               {name:'fiyat'},
               {name:'yeniFiyat'},
               {name:'siraNo'}, 
               {name:'cins'},
               {name:'birim'},
               {name:'miktar'},
               {name:'tutar'}
           ]
});