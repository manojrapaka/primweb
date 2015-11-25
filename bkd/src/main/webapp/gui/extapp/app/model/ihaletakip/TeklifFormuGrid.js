Ext.define("My.model.ihaletakip.TeklifFormuGrid", {
    extend : 'Ext.data.Model',
    idProperty : 'tenderId',
    fields : [ 'tenderId', 
               'pharmaWhouseId', 
               'pharmaWhouseName', 
               'tenderStatusName',
               'statusDate'
               ]
});