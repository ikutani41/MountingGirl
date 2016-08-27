var ProfileLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        var BG = new cc.Sprite(res.Status_bg_png);
        BG.setPosition(centerpos);

        var headline = new cc.Sprite(res.StatusTitle_png);
        headline.setPosition(cc.p(w/2,h*0.5));

        this.addChild(BG);
        this.addChild(headline);

        // girls
        var str;

        str = "res/girls/1_clear.png";
        var girl1 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail1, this);

        if(lv >= 2){
            str = "res/girls/2_clear.png";
        } else {
            str = "res/girls/2_unknown.png";            
        }
        var girl2 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail2, this);

        if(lv >= 3){
            str = "res/girls/3_clear.png";
        } else {
            str = "res/girls/3_unknown.png";            
        }
        var girl3 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail3, this);

        if(lv >= 4){
            str = "res/girls/4_clear.png";
        } else {
            str = "res/girls/4_unknown.png";            
        }
        var girl4 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail4, this);

        if(lv >= 5){
            str = "res/girls/5_clear.png";
        } else {
            str = "res/girls/5_unknown.png";            
        }
        var girl5 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail5, this);

        if(lv >= 6){
            str = "res/girls/6_clear.png";
        } else {
            str = "res/girls/6_unknown.png";            
        }
        var girl6 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail6, this);

        if(lv >= 7){
            str = "res/girls/7_clear.png";
        } else {
            str = "res/girls/7_unknown.png";
        }
        var girl7 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail7, this);

        if(lv >= 8){
            str = "res/girls/8_clear.png";
        } else {
            str = "res/girls/8_unknown.png";            
        }
        var girl8 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail8, this);

        if(lv >= 9){
            str = "res/girls/9_clear.png";
        } else {
            str = "res/girls/9_unknown.png";            
        }
        var girl9 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail9, this);

        if(lv >= 10){
            str = "res/girls/10_clear.png";
        } else {
            str = "res/girls/10_unknown.png";            
        }
        var girl10 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail10, this);

        var girlsMenu1 = new cc.Menu(girl1,girl2,girl3,girl4,girl5);
        girlsMenu1.setPosition(cc.p(w/2,h*0.40));
        girlsMenu1.alignItemsHorizontallyWithPadding(w/40);

        var girlsMenu2 = new cc.Menu(girl6,girl7,girl8,girl9,girl10);
        girlsMenu2.setPosition(cc.p(w/2,h*0.28));
        girlsMenu2.alignItemsHorizontallyWithPadding(w/40);
        
        this.addChild(girlsMenu1);
        this.addChild(girlsMenu2);

        var backBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.BackBtn_png), // normal state image
            new cc.Sprite(res.BackBtn_s_png), //select state image
            new cc.Sprite(res.BackBtn_s_png), //disabled state image
            this.back, this);

        var homeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.HomeBtn_png), // normal state image
            new cc.Sprite(res.HomeBtn_s_png), //select state image
            new cc.Sprite(res.HomeBtn_s_png), //disabled state image
            this.home, this);

        var twitterBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.Twitter_png), // normal state image
            new cc.Sprite(res.Twitter_png), //select state image
            new cc.Sprite(res.Twitter_png), //disabled state image
            this.tweet, this);

        var facebookBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.Facebook_png), // normal state image
            new cc.Sprite(res.Facebook_png), //select state image
            new cc.Sprite(res.Facebook_png), //disabled state image
            this.fbpost, this);

        var shareMenu = new cc.Menu(twitterBtn,facebookBtn);
        shareMenu.setPosition(cc.p(w*0.85,h*0.95));
        shareMenu.alignItemsHorizontallyWithPadding(30);

        var backMenu = new cc.Menu(backBtn,homeBtn);
        backMenu.setPosition(cc.p(w/2,h*0.15));
        backMenu.alignItemsHorizontallyWithPadding(30);
        
        this.addChild(shareMenu);
        this.addChild(backMenu);

        switch(cc.sys.os){
            case cc.sys.OS_ANDROID:
                if(lv!=11){
                    this.labelLv = new cc.LabelTTF("Lv." + lv, "res/font/logotypejp_mp_b_1.ttf", 40,cc.TEXT_ALIGNMENT_LEFT);
                } else {
                    this.labelLv = new cc.LabelTTF("Lv.100", "res/font/logotypejp_mp_b_1.ttf", 40,cc.TEXT_ALIGNMENT_LEFT);
                }
                break;
            default:
                if(lv!=11){
                    this.labelLv = new cc.LabelTTF("Lv." + lv, "Corporate-Logo-Bold", 40,cc.TEXT_ALIGNMENT_LEFT);
                } else {
                    this.labelLv = new cc.LabelTTF("Lv.100", "Corporate-Logo-Bold", 40,cc.TEXT_ALIGNMENT_LEFT);
                }
                break;
        }
        this.labelLv.setColor(cc.color(0,0,0));//black color
        this.labelLv.setPosition(cc.p(w*0.22, h*0.75));

        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelExp = new cc.LabelTTF("Exp."+exp, "res/font/logotypejp_mp_b_1.ttf", 40,cc.TEXT_ALIGNMENT_LEFT);
        } else {
            this.labelExp = new cc.LabelTTF("Exp."+exp, "Corporate-Logo-Bold", 40,cc.TEXT_ALIGNMENT_LEFT);
        }
        this.labelExp.setColor(cc.color(0,0,0));//black color
        this.labelExp.setPosition(cc.p(w*0.24, h*0.7));
        
        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelPoint = new cc.LabelTTF("Point."+point, "res/font/logotypejp_mp_b_1.ttf", 40,cc.TEXT_ALIGNMENT_LEFT);
        } else {
            this.labelPoint = new cc.LabelTTF("Point."+point, "Corporate-Logo-Bold", 40,cc.TEXT_ALIGNMENT_LEFT);
        }
        this.labelPoint.setColor(cc.color(0,0,0));//black color
        this.labelPoint.setPosition(cc.p(w*0.24, h*0.65));

        this.addChild(this.labelExp);
        this.addChild(this.labelLv);
        this.addChild(this.labelPoint);

        this.createLoadingBar();
    },
    createLoadingBar:function(){
        var ProgressBG = new cc.Sprite(res.ProgressBG_png);
        ProgressBG.setPosition(cc.p(w/2, h*0.57));
        var loadingBar = new ccui.LoadingBar();
        loadingBar.loadTexture(res.Progress_png);
        loadingBar.setPosition(cc.p(w/2,h*0.57));

//        this._from = Math.floor(exp / lvup[lv-1] * 100);
//        this._to = this._from;
        var exp = obj.power.userExp;
        if(lv==1){
            var barEnd = lvup[lv-1];
        } else if (lv != 11){
            var barEnd = lvup[lv-1] - lvup[lv-2];
        } else {
            var barEnd = exp;
        }
        loadingBar.setPercent(Math.floor(exp / barEnd * 100));

        this.addChild(ProgressBG);
        this.addChild(loadingBar);
    },
    home:function (){
        cc.director.runScene(new MenuScene());
    },
    tweet:function (){
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "twitterPost", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            this.getParent().addChild(new SnapshotLayer(), 6, TagOfLayer.Snapshot);
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "postToTwitter");
        }
    },
    fbpost:function (){
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "facebookPost", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            this.getParent().addChild(new SnapshotLayer(), 6, TagOfLayer.Snapshot);
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "postToFacebook");
        }
    },
    back:function(){
        var layer = new OtherLayer();
        this.getParent().addChild(layer);
        this.removeFromParent();        
    },
    goDetail1: function(){
        this.showReady(1);
    },
    goDetail2: function(){
        if(lv >= 2){
            this.showReady(2);
        } else {
            return false;
        }
    },
    goDetail3: function(){
        if(lv >= 3){
            this.showReady(3);
        } else {
            return false;
        }
    },
    goDetail4: function(){
        if(lv >= 4){
            this.showReady(4);
        } else {
            return false;
        }
    },
    goDetail5: function(){
        if(lv >= 5){
            this.showReady(5);
        } else {
            return false;
        }
    },
    goDetail6: function(){
        if(lv >= 6){
            this.showReady(6);
        } else {
            return false;
        }
    },
    goDetail7: function(){
        if(lv >= 7){
            this.showReady(7);
        } else {
            return false;
        }
    },
    goDetail8: function(){
        if(lv >= 8){
            this.showReady(8);
        } else {
            return false;
        }
    },
    goDetail9: function(){
        if(lv >= 9){
            this.showReady(9);
        } else {
            return false;
        }
    },
    goDetail10: function(){
        if(lv >= 10){
            this.showReady(10);
        } else {
            return false;
        }
    },
    showReady: function(level){
        var ready = new cc.Sprite("res/girls/"+level+"_ready.png");
        ready.setPosition(centerpos);

        var goBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.GoBtn_png), // normal state image
            new cc.Sprite(res.GoBtn_s_png), //select state image
            new cc.Sprite(res.GoBtn_s_png), //disabled state image
            this.removeReady, this);

        var goMenu = new cc.Menu(goBtn);
        goMenu.setPosition(cc.p(w/2,60+goBtn.height/2));  // originally h/8
        ready.addChild(goMenu);

        this.addChild(ready,0,500);
    },
    removeReady: function(level){
        this.removeChildByTag(500);
    }
});