var OtherLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        var BG = new cc.Sprite(res.OtherBG_png);
        BG.setPosition(centerpos);
        this.addChild(BG);

        var CollectionBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.CollectionBtn_png), // normal state image
            new cc.Sprite(res.CollectionBtn_s_png), //select state image
            new cc.Sprite(res.CollectionBtn_s_png), //disabled state image
            this.goCollection, this);

        var StatusBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.StatusBtn_png), // normal state image
            new cc.Sprite(res.StatusBtn_s_png), //select state image
            new cc.Sprite(res.StatusBtn_s_png), //disabled state image
            this.goProfile, this);

        var TimeattackBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.TimeattackBtn_png), // normal state image
            new cc.Sprite(res.TimeattackBtn_s_png), //select state image
            new cc.Sprite(res.TimeattackBtn_s_png), //disabled state image
            this.goTimeattack, this);

        var MoreBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.MoreBtn_png), // normal state image
            new cc.Sprite(res.MoreBtn_s_png), //select state image
            new cc.Sprite(res.MoreBtn_s_png), //disabled state image
            this.goMore, this);

        var homeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.HomeBtn_png), // normal state image
            new cc.Sprite(res.HomeBtn_s_png), //select state image
            new cc.Sprite(res.HomeBtn_s_png), //disabled state image
            this.home, this);

        var naviMenu = new cc.Menu(CollectionBtn,StatusBtn,TimeattackBtn,MoreBtn);
        naviMenu.setPosition(centerpos);
        naviMenu.alignItemsVerticallyWithPadding(30);
        this.addChild(naviMenu);

        var HomeMenu = new cc.Menu(homeBtn);
        HomeMenu.setPosition(cc.p(w/2,h/8));
        HomeMenu.alignItemsHorizontallyWithPadding(30);
        this.addChild(HomeMenu);

    },
    goCollection: function(){
        cc.director.runScene(new CollectionScene());
    },
    goProfile: function(){
        var layer = new ProfileLayer();
        this.getParent().addChild(layer);
        this.removeFromParent();
    },
    goMore: function(){
        var layer = new ShoppingLayer();
        this.getParent().addChild(layer);
        this.removeFromParent();
    },
    goTimeattack: function(){
        cc.director.runScene(new EndlessScene());
    },
    home:function (){
        cc.director.runScene(new MenuScene());
    }
});