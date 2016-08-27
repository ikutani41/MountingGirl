var ReplayLayer = cc.Layer.extend({
    FaceWidth:0,
    level:0,    // phrase[level-1][num]
    num:0,   // phrase[level][num]
    count:0,    // caption speed
    beautyPhrase:null,  //label
    uglyPhrase:null,    //label
    stringBeauty:null,   // beauthPhrase
    stringUgly:null,   // uglyPhrase
    updateflg:0,  // 1->first phrase, 2->second phrase
    skipflg:0,  // 1->default, 2->skip

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        //2. create a background image and set it's position at the center of the screen
        var bg = new cc.Sprite(res.Result_png);
        bg.setPosition(centerpos);
        this.addChild(bg);

        //美人の顔とセリフの表示
        var beautyCallout = new cc.Sprite(res.Callout_beauty_png);  //美人吹きだし
        beautyCallout.setPosition(cc.p(w - beautyCallout.width / 2,h*13/16));

        var uglyCallout = new cc.Sprite(res.Callout_ugly_png);  //ブス吹き出し
        uglyCallout.setPosition(cc.p(uglyCallout.width / 2,h/2));

        this.addChild(beautyCallout);
        this.addChild(uglyCallout);

        var uglyFace = new cc.Sprite(res.Ugly_normal_png);  //ブス顏（ノーマル）
        uglyFace.setPosition(cc.p(w - uglyFace.width / 2,h/2));
        this.addChild(uglyFace,0,2);


        // position@showPhase
        this.FaceWidth = uglyFace.width;
        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.beautyPhrase = new cc.LabelTTF("", "res/font/cinecaption2.28.ttf", 20, cc.size(uglyCallout.width*0.8,uglyCallout.height*0.8), cc.TEXT_ALIGNMENT_LEFT);
        } else {
            this.beautyPhrase = new cc.LabelTTF("", "cinecaption", 20, cc.size(uglyCallout.width*0.8,uglyCallout.height*0.8), cc.TEXT_ALIGNMENT_LEFT);
        }
        this.beautyPhrase.setColor(cc.color(0,0,0));//black color
        this.beautyPhrase.setPosition(cc.p(w - uglyCallout.width / 2, h*0.77));
        this.beautyPhrase.textAlign = cc.TEXT_ALIGNMENT_LEFT;

        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.uglyPhrase = new cc.LabelTTF("", "res/font/cinecaption2.28.ttf", 20, cc.size(uglyCallout.width*0.8,uglyCallout.height*0.8), cc.TEXT_ALIGNMENT_LEFT);
        } else {
            this.uglyPhrase = new cc.LabelTTF("", "cinecaption", 20, cc.size(uglyCallout.width*0.8,uglyCallout.height*0.8), cc.TEXT_ALIGNMENT_LEFT);
        }
        this.uglyPhrase.setColor(cc.color(0,0,0));//black color
        this.uglyPhrase.setPosition(cc.p(uglyCallout.width / 2, h*0.46));
        this.uglyPhrase.textAlign = cc.TEXT_ALIGNMENT_LEFT;

        this.addChild(this.beautyPhrase);
        this.addChild(this.uglyPhrase);

        // skip
        var skipBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.Skip_png), // normal state image
            new cc.Sprite(res.Skip_s_png), //select state image
            new cc.Sprite(res.Skip_s_png), //disabled state image
            this.skip, this);
        var skipMenu = new cc.Menu(skipBtn);  //7. create the menu
        skipMenu.setPosition(cc.p(w/2, h/9));
        this.addChild(skipMenu,0,3);

    },
    animateControl:function(level,num){
        cc.log("now playing:["+(level-1)+"]["+num+"]");

        // 美女の顔をclearLvTableから判断して表示
        var beautyFace = new cc.Sprite("res/girls/"+level+".png");
        beautyFace.setPosition(cc.p(this.FaceWidth / 2,h*13/16));
        this.addChild(beautyFace,0,1);

        // save in variable to keep accessible from this layer.
        this.level = level;
        this.num = num;

        // num使ってリソース書き換えて美人のセリフ
        this.skipflg = 1;
        this.schedule(this.cut1,1.0);
    },
    cut1:function(){
        this.unschedule(this.cut1);
        // num使ってリソース書き換えて美人のセリフ
        var str1 = phrase[this.level-1][this.num][0];

        this.stringBeauty = str1;
        this.count = 1;
        this.updateflg = 1;

        switch(this.skipflg){
            case 1:
                this.scheduleUpdate();
                break;
            case 2:
                this.beautyPhrase.setString(str1);
                break;
        }
    },
    cut2:function(){
        this.unschedule(this.cut2);
        //ブスのセリフの表示
        var str2 = phrase[this.level-1][this.num][1];

        this.stringUgly = str2;
        this.count = 1;
        this.updateflg = 2;

        switch(this.skipflg){
            case 1:
                this.scheduleUpdate();
                break;
            case 2:
                this.uglyPhrase.setString(str2);
                break;
        }
    },
    cut3:function(){
        this.unschedule(this.cut3);
        //美人表情変化
        var beautyWin = new cc.Sprite("res/girls/"+this.level+"_lose.png");
        beautyWin.setPosition(cc.p(this.FaceWidth / 2,h*13/16));
        this.addChild(beautyWin);

        this.removeChildByTag(1);   // beauty Face
        if(this.skipflg == 1){
            this.schedule(this.cut4,0.5);
        }
    },
    cut4: function(){
        this.unschedule(this.cut4);
        //ブス表情変化
        var uglyWin = new cc.Sprite(res.Ugly_win_png);
        uglyWin.setPosition(cc.p(w - this.FaceWidth / 2,h/2));
        this.addChild(uglyWin);
        this.removeChildByTag(2);   // ugly Face

        //ボタン設置
        this.removeChildByTag(3);   // skipBtn
        this.showBtn();
    },
    update: function () {
        switch(this.updateflg){
            case 1:
                if(this.count / 3 >= this.stringBeauty.length){
                    this.unscheduleUpdate();
                    this.schedule(this.cut2,0.3);
                }
                var strD1 = this.stringBeauty.substr(0,this.count/3);
                this.beautyPhrase.setString(strD1);
                this.count++;
                return;
                break;
            case 2:
                if(this.count / 3 >= this.stringUgly.length){
                    this.unscheduleUpdate();
                    this.schedule(this.cut3,0.3);
                }
                var strD2 = this.stringUgly.substr(0,this.count/3);
                this.uglyPhrase.setString(strD2);
                this.count++;
                return;
                break;
            case 3:
                break;            
        }
    },
    skip:function (){
        cc.log("skip");

        this.unschedule(this.cut1);
        this.unschedule(this.cut2);
        this.unschedule(this.cut3);
        this.unschedule(this.cut4);
        this.unscheduleUpdate();

        this.skipflg = 2;
        this.cut1();
        this.cut2();
        this.cut3();
        this.cut4();
    },
    showBtn:function (){
        //配置。座標指定するか、alignメソッド使うか
        var homeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.HomeBtn_png), // normal state image
            new cc.Sprite(res.HomeBtn_s_png), //select state image
            new cc.Sprite(res.HomeBtn_s_png), //disabled state image
            this.home, this);

        var replayBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.ReplayBtn_png), // normal state image
            new cc.Sprite(res.ReplayBtn_s_png), //select state image
            new cc.Sprite(res.ReplayBtn_s_png), //disabled state image
            this.replay, this);

        var backBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.BackBtn_png), // normal state image
            new cc.Sprite(res.BackBtn_s_png), //select state image
            new cc.Sprite(res.BackBtn_s_png), //disabled state image
            this.back, this);

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

        var actionMenu = new cc.Menu(backBtn,replayBtn);
        actionMenu.setPosition(cc.p(w/2,h/5));
        actionMenu.alignItemsHorizontallyWithPadding(30);

        var HomeMenu = new cc.Menu(homeBtn);
        HomeMenu.setPosition(cc.p(w/2,h/9));
        HomeMenu.alignItemsHorizontallyWithPadding(30);

        var shareMenu = new cc.Menu(twitterBtn,facebookBtn);  //7. create the menu
        shareMenu.setPosition(cc.p(w*7/9, h*15/16));
        shareMenu.alignItemsHorizontallyWithPadding(30);

        // remove listview
        this.getParent().removeChildByTag(TagOfLayer.ListView); // 初回以降はエラーになるけど無視

        this.addChild(actionMenu);
        this.addChild(HomeMenu);
        this.addChild(shareMenu);
    },
    back:function(){
        cc.director.runScene(new CollectionScene());
    },
    home:function (){
        cc.director.runScene(new MenuScene());
    },
    replay:function (){
        this.getParent().play(this.level,this.num);
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
    }
});