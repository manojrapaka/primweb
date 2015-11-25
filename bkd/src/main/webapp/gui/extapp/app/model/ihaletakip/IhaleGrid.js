Ext.define("My.model.ihaletakip.IhaleGrid", {
    extend : 'Ext.data.Model',
    idProperty : 'ihaleId',
    fields : [ 
               'name', 
               'contractDateTime', 
               'contractDeliveryPoint',
               'contractLocation',
               'contractRecordNo',
               'deliveryDateTime',
               'description',
               'extraInformation',
               'id',
               'recordDate',
               'userId'
               ]
});