var ReadyLayer = cc.Layer.extend({
    labelSavedStep:null,
    labelSavedTime:null,
    isShowReference:0,  // 0->hide, 1->show

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();
        isShowReference = 0;

        //2. create a background image and set it's position at the center of the screen
        if(lv == 1){
            var introbg = new cc.Sprite(res.Intro_png);
            var goBtn = new cc.MenuItemSprite(
                new cc.Sprite(res.GoBtn_png), // normal state image
                new cc.Sprite(res.GoBtn_s_png), //select state image
                new cc.Sprite(res.GoBtn_s_png), //disabled state image
                this.onPlay, this);
        } else {
            var introbg = new cc.Sprite("res/girls/"+currentGirl+"_ready.png");
            var goBtn = new cc.MenuItemSprite(
                new cc.Sprite(res.GoBtn_png), // normal state image
                new cc.Sprite(res.GoBtn_s_png), //select state image
                new cc.Sprite(res.GoBtn_s_png), //disabled state image
                this.onPlay, this);            
        }
        introbg.setPosition(centerpos);
        this.addChild(introbg);

        //3.create a menu and assign onPlay event callback to it
        var goMenu = new cc.Menu(goBtn);
        goMenu.setPosition(cc.p(w/2,60+goBtn.height/2));  // originally h/8
        this.addChild(goMenu,0,100);

        if(savedStep != 0){
            var menuItemReference = new cc.MenuItemSprite(
                new cc.Sprite(res.ReferenceBtn_png), // normal state image
                new cc.Sprite(res.ReferenceBtn_s_png), //select state image
                new cc.Sprite(res.ReferenceBtn_s_png), //disabled state image
                this.reference, this);

            var menu = new cc.Menu(menuItemReference);  //7. create the menu
            menu.setPosition(cc.p(w*0.85,h*0.9));
            this.addChild(menu);
        }
    },
    reference : function(){
        if(isShowReference == 1){
            this.remove();
            isShowReference = 0;
        } else {
            var grayout = new cc.Sprite(res.ReferenceCover_png);
            grayout.setPosition(centerpos);
            grayout.setOpacity(70);
            this.addChild(grayout,0,50);

            var bg = new cc.Sprite(res.ReferenceBG_png);
            bg.setPosition(cc.p(w/2,h/4));
            this.addChild(bg,0,55);

            this.getChildByTag(100).setEnabled(false);
            // display saved-record
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelSavedStep = new cc.LabelTTF("あと　" + savedStep + " Step!!", "res/font/logotypejp_mp_b_1.ttf", 40);
                this.labelSavedTime = new cc.LabelTTF("あと　"+ savedTimeLeft + " Sec.", "res/font/logotypejp_mp_b_1.ttf", 40);
            } else {
                this.labelSavedStep = new cc.LabelTTF("あと　" + savedStep + " Step!!", "Corporate-Logo-Bold", 40);
                this.labelSavedTime = new cc.LabelTTF("あと　"+ savedTimeLeft + " Sec.", "Corporate-Logo-Bold", 40);            
            }
            this.labelSavedStep.setColor(cc.color(0,0,0));//black color
            this.labelSavedStep.setPosition(cc.p(bg.width/2, bg.height*0.6));
            this.getChildByTag(55).addChild(this.labelSavedStep);
            this.labelSavedTime.setColor(cc.color(0,0,0));//black color
            this.labelSavedTime.setPosition(cc.p(bg.width/2, bg.height*0.4));
            this.getChildByTag(55).addChild(this.labelSavedTime);

            var menuItemRemove = new cc.MenuItemSprite(
                new cc.Sprite(res.RemoveBtn_png), // normal state image
                new cc.Sprite(res.RemoveBtn_s_png), //select state image
                new cc.Sprite(res.RemoveBtn_s_png), //disabled state image
                this.remove, this);

            var menuItemDustbox = new cc.MenuItemSprite(
                new cc.Sprite(res.dustboxBtn_png), // normal state image
                new cc.Sprite(res.dustboxBtn_s_png), //select state image
                new cc.Sprite(res.dustboxBtn_s_png), //disabled state image
                this.dustbox, this);

            var menuReferenceAction = new cc.Menu(menuItemRemove,menuItemDustbox);  //7. create the menu
            menuReferenceAction.setPosition(cc.p(bg.width/2,bg.height*0.15));
            menuReferenceAction.alignItemsHorizontallyWithPadding(30);
            this.getChildByTag(55).addChild(menuReferenceAction);

            isShowReference = 1;
        }
    },
    dustbox : function(){
        // save clear
        savedStep = 0;
        savedTimeLeft = 0;
        this.labelSavedStep.setString("あと　" + savedStep + " Step!!");
        this.labelSavedTime.setString("あと　"+ savedTimeLeft + " Sec.");
        this.schedule(this.remove,0.5);
    },
    remove : function(){
        this.unschedule(this.remove);
        this.removeChildByTag(50);
        this.removeChildByTag(55);
        this.getChildByTag(100).setEnabled(true);
    },
    onPlay : function(){
        //play-start
        this.getParent().playSet();
    }

});