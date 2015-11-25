Ext.define('My.controller.MainController', {
    extend: 'Ext.app.Controller',
    requires: ['My.view.collection.BorderPanel'],
    initConfig: function () {

        this.setViewComponents();
        this.setHandlers();
        this.callParent(arguments);

    },
    setViewComponents: function () {
        var me = this;

        /* USER BTNS */
        this.btnSatis = Ext.create('Ext.Button', {
            text: 'Satiş',
            iconCls: 'btnIconSatis24',
            scale: 'medium'
        });

        this.btnHakedis = Ext.create('Ext.Button', {
            text: 'Hakediş',
            iconCls: 'btnIconHakedis24',
            scale: 'medium'
        });

        this.btnHavuz = Ext.create('Ext.Button', {
            text: 'Havuz',
            iconCls: 'btnIconHavuz24',
            scale: 'medium'
        });
        /* USER BTNS */

        /* MANAGER BTNS */
        this.btnKullaniciTanim = Ext.create('Ext.Button', {
            text: 'Kullanici Tanım',
            iconCls: 'btnIconKullanici24',
            scale: 'medium'
        });

        this.btnPrim = Ext.create('Ext.Button', {
            text: 'Prim Tanım',
            iconCls: 'btnIconPrim24',
            scale: 'medium'
        });

        this.btnGrup = Ext.create('Ext.Button', {
            text: 'Grup Tanım',
            iconCls: 'btnIconGrup24',
            scale: 'medium'
        });

        this.btnUlke = Ext.create('Ext.Button', {
            text: 'Ulke Tanım',
            iconCls: 'btnIconUlke24',
            scale: 'medium'
        });

        this.btnGorev = Ext.create('Ext.Button', {
            text: 'Gorev Tanım',
            iconCls: 'btnIconGorev24',
            scale: 'medium'
        });

        this.btnCalisan = Ext.create('Ext.Button', {
            text: 'Calışan Tanım',
            iconCls: 'btnIconCalisan24',
            scale: 'medium'
        });
        /* MANAGER BTNS */
        
        this.toolPanel = Ext.extend(Ext.Panel, {
            header: false,
            region: 'north',
            collapsible: true,
            collapseMode: 'mini',
            layout: 'fit',
            border: false,
            initComponent: function () {

                this.tbar = [me.btnSatis, me.btnHakedis, me.btnHavuz, '->', me.btnKullaniciTanim, me.btnPrim, me.btnGrup, me.btnUlke, me.btnGorev, me.btnCalisan];
                this.callParent(arguments);
            }
        });

        this.tabPanel = Ext.extend(Ext.TabPanel, {
            region: 'center',
            border: false,
            activeTab: 0,
            autoDestroy: false,
            autoScroll: false,
            defaults: {
                border: false
            },
            initComponent: function () {
                
                this.items = [{
                        title: 'Foo',
                        iconCls: 'iconApplicationHomePage16',
                        tooltip: 'A button tooltip'
                    }];

                this.callParent(arguments);
                
            }
        });

        this.centerTabPanel = new this.tabPanel();
        this.northPanel = new this.toolPanel();

        this.borderPanel = Ext.create('My.view.collection.BorderPanel', {
            items: [this.centerTabPanel, this.northPanel]
        });
    },
    getBorderPanel: function () {
        return this.borderPanel;
    },
    setHandlers: function () {
        var me = this;

        this.btnSatis.setHandler(function (btn) {
            me.ihalepanelcontroller = Ext.create('My.controller.ihalepanel.IhalePanel');
            var ihaleCozumlemePanel = me.ihalepanelcontroller.getMainPanel();
            me.addTabItem(ihaleCozumlemePanel, btn);
        });

        this.btnHavuz.setHandler(function (btn) {
            me.ihaleTakipcontroller = Ext.create('My.controller.ihaletakip.IhaleTakip');
            var ihaleTakipPanel = me.ihaleTakipcontroller.getMainPanel();
            me.addTabItem(ihaleTakipPanel, btn);
        });
        
        this.btnKullaniciTanim.setHandler(function(btn){
            me.cntKullaniciTanim = Ext.create('My.controller.tanim.Kullanici');
            var kullaniciTanimPanel = me.cntKullaniciTanim.getMainPanel();
            me.openInWindow(kullaniciTanimPanel, btn);
        });
        
        this.btnPrim.setHandler(function(btn){
            me.cntPrimTanim = Ext.create('My.controller.tanim.Prim');
            var primTanimPanel = me.cntPrimTanim.getMainPanel();
            me.openInWindow(primTanimPanel, btn);
        });

        this.btnGrup.setHandler(function(btn){
            me.cntGrupTanim = Ext.create('My.controller.tanim.Grup');
            var grupTanimPanel = me.cntGrupTanim.getMainPanel();
            me.openInWindow(grupTanimPanel, btn);
        });
        
        this.btnUlke.setHandler(function(btn){
            me.cntUlkeTanim = Ext.create('My.controller.tanim.Ulke');
            var ulkeTanimPanel = me.cntUlkeTanim.getMainPanel();
            me.openInWindow(ulkeTanimPanel, btn);
        });
        
        this.btnGorev.setHandler(function(btn){
            me.cntGorevTanim = Ext.create('My.controller.tanim.Gorev');
            var gorevTanimPanel = me.cntGorevTanim.getMainPanel();
            me.openInWindow(gorevTanimPanel, btn);
        });
        
        this.btnCalisan.setHandler(function(btn){
            me.cntCalisanTanim = Ext.create('My.controller.tanim.Calisan');
            var calisanTanimPanel = me.cntCalisanTanim.getMainPanel();
            me.openInWindow(calisanTanimPanel, btn);
        });
        
        this.btnSatis.setHandler(function(btn){
            me.cntStaisTanim = Ext.create('My.controller.base.Satis');
            var satisBasePanel = me.cntStaisTanim.getMainPanel();
            me.addTabItem(satisBasePanel, btn);
        });
        
        this.btnHakedis.setHandler(function(btn){
            me.cntHakedisTanim = Ext.create('My.controller.base.Hakedis');
            var hakedisBasePanel = me.cntHakedisTanim.getMainPanel();
            me.addTabItem(hakedisBasePanel, btn);
        });
        
        this.btnHavuz.setHandler(function(btn){
            me.cntHavuzTanim = Ext.create('My.controller.base.Havuz');
            var havuzBasePanel = me.cntHavuzTanim.getMainPanel();
            me.addTabItem(havuzBasePanel, btn);
        });
        
    },
    addTabItem: function (item, btn) {
        var me = this;
        var exist = false;

        me.centerTabPanel.items.each(function (c) {
            if (c.itemId === item.itemId) {
                exist = true;
            }
            item.iconCls = btn.iconCls.replace("24", "16");
            item.title = btn.text;
            item.closable = true;
        });
        if (!exist) {
            me.centerTabPanel.add(item);
        }
        me.centerTabPanel.setActiveTab(item);
    },
    openInWindow : function(item, btn){
        // item.getHeader().hide();
        item.title = "";
        item.iconCls = "";
        
        this.firmaIlacTeklifWindow = Ext.create('My.view.collection.Window',{
                title : btn.text,
                iconCls : btn.iconCls.replace("24", "16"),
                width : 400,
                height : 300,
                modal : false,
                resizable : true,
                closeAction : 'hide',
                destroy : function( item, eOpts ){
                        item.hide();
                }
        });
        
        this.firmaIlacTeklifWindow.add(item);
        this.firmaIlacTeklifWindow.show();
        
    }


});