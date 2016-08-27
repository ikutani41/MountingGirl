var MenuLayer = cc.Layer.extend({
    labelLv:null,
    labelExp:null,
    labelPt:null,
    loadingTime:0,  // wait user for launching
    launching:0,    // 0->none, 1->done

    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
        //call super class's super function
        this._super();

        //set position variable
        w = cc.director.getWinSize().width;
        h = cc.director.getWinSize().height;
        centerpos = cc.p(w/2,h/2);


        //init userData
        if(!obj){
            var arr1 = [
                [1,0,0],   // Collectionの初期状態エラーを防ぐ
                [0,0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ];
            cc.log(arr1);

            var today = new Date().getDate();
            obj = {
                power : {
                    userLv : 1,
                    userExp : 0,
                    point : 0,
                    lastLogin : today,
                    loginTimes : 0,
                    version : 1.61,
                    removeBannerAd : 0,
                    premiumPhrase : 0,
                    premiumFunction : 0,
                    currentGirl : 1
                },
                others : {
                    clearLvTable : arr1,
                    life : 3,
                    savedStep : 0,
                    savedTimeLeft : 0,
                    savedTimePassing : 0,
                    didReadSave : 0,
                    scores : [
                        [
                            "Engineering Producer\nYutaro Ikutani\n",
                            13.55
                        ],
                        [
                            "Lawyer Friend\nRyuhei Itaya\n",
                            13.87
                        ],
                        [
                            "Social Marketer\nFuko Koike\n",
                            15.72
                        ],
                        [
                            "Sales Producer\nYohei Yamazaki\n",
                            16.87
                        ],
                        [
                            "Partner\nYoshitaro Yonamoto",
                            19.55
                        ]
                    ]
                }
            };
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);
            this.tutorial();
        }

        cc.log("version:"+obj.power.version);

        // convert from old-version
        if(obj.power.version < 1.59){

            var before = obj.others.clearLvTable;
//            var before = [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];   // for test


            var lookup = [ // Old-ID -> [lv,no]
                // 1
                [6,1],
                // 2
                [2,1],
                // 3
                [3,1],
                // 4
                [6,2],
                // 5
                [9,3],
                // 6
                [5,1],
                // 7
                [8,1],
                // 8
                [5,2],
                // 9
                [9,1],
                // 10
                [8,2],
                // 11
                [8,3],
                // 12
                [3,2],
                // 13
                [6,3],
                // 14
                [2,2],
                // 15
                [2,3],
                // 16
                [7,1],
                // 17
                [1,1],
                // 18
                [2,4],
                // 19
                [1,2],
                // 20
                [1,3],
                // 21
                [4,1],
                // 22
                [7,2],
                // 23
                [7,3],
                // 24
                [9,2],
                // 25
                [5,3],
                // 26
                [4,2],
                // 27
                [4,3],
                // 28
                [3,3],
                // 29
                [10,1],
                // 30
                [10,2],
                // 31
                [10,3]
            ]

            var arr2 = [
                [0,0,0],   // Collectionの初期状態エラーを防ぐ
                [0,0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ];

            // convert (before[0]は不要)
            var convertLv;
            var convertNo;
            for(var i=0; i<stock; i++){
                if(before[i] != 0){
                    convertLv = lookup[i][0];
                    convertNo = lookup[i][1];
                    arr2[convertLv-1][convertNo-1] = 1;
                }
            }

            // start - score update
            // update ikutani's score
            var i = 0;
            while(i < 5){
                cc.log("in:"+i);
                if(obj.others.scores[i][0] == "Engineering Producer\nYutaro Ikutani\n"){
                    cc.log("name:"+obj.others.scores[i][0]);
                    obj.others.scores[i][1] = 13.55;
                    break;
                } else {
                    i++
                }
            }
            switch(i){
                case 1:
                    obj.others.scores[4] = obj.others.scores[3];
                    obj.others.scores[3] = obj.others.scores[2];
                    obj.others.scores[2] = obj.others.scores[1];
                    obj.others.scores[1] = ["Engineering Producer\nYutaro Ikutani\n",13.55];
                    break;
                case 2:
                    obj.others.scores[4] = obj.others.scores[3];
                    obj.others.scores[3] = obj.others.scores[2];
                    obj.others.scores[2] = ["Engineering Producer\nYutaro Ikutani\n",13.55];
                    break;
                case 3:
                    obj.others.scores[4] = obj.others.scores[3];
                    obj.others.scores[3] = ["Engineering Producer\nYutaro Ikutani\n",13.55];
                    break;
                case 4:
                    obj.others.scores[4] = ["Engineering Producer\nYutaro Ikutani\n",13.55];
                    break;
                default:
                    break;                                                
            }

            // update itaya's score
            var j = 0;
            while(j < 5){
                cc.log("in:"+j);
                if(13.87 < obj.others.scores[j][1]){
                    break;
                } else {
                    j++;
                }
            }

            switch(j){
                case 1:
                    obj.others.scores[4] = obj.others.scores[3];
                    obj.others.scores[3] = obj.others.scores[2];
                    obj.others.scores[2] = obj.others.scores[1];
                    obj.others.scores[1] = ["Lawyer Friend\nRyuhei Itaya\n",13.87];
                    break;
                case 2:
                    obj.others.scores[4] = obj.others.scores[3];
                    obj.others.scores[3] = obj.others.scores[2];
                    obj.others.scores[2] = ["Lawyer Friend\nRyuhei Itaya\n",13.87];
                    break;
                case 3:
                    obj.others.scores[4] = obj.others.scores[3];
                    obj.others.scores[3] = ["Lawyer Friend\nRyuhei Itaya\n",13.87];
                    break;
                case 4:
                    obj.others.scores[4] = ["Lawyer Friend\nRyuhei Itaya\n",13.87];
                    break;
                default:
                    break;                                                
            }
            // end - score update

            // point system
            var today = new Date().getDate();
            obj.power.point = 0;
            obj.power.lastLogin = today;
            obj.power.loginTimes = 0;

            // save
            obj.power.version = 1.61;
            if(!obj.power.removeBannerAd){
                obj.power.removeBannerAd = 0;
            }
            if(!obj.power.premiumPhrase){
                obj.power.premiumPhrase = 0;
            }
            if(!obj.power.premiumFunction){
                obj.power.premiumFunction = 0;
            }
            if(obj.power.userLv == 11){
                obj.power.currentGirl = 10;
            } else {
                obj.power.currentGirl = obj.power.userLv;
            }
            obj.others.life = 3;    // force update
            obj.others.didReadSave = 0;
            obj.others.clearLvTable = arr2;
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);

            cc.log("version update complete!");

            // show tutorial
            this.tutorial();
        }

        if(obj.power.version >= 1.59){
            // start - fix ikutani's score update bug
            var m = 0;
            if(obj.others.scores[4][1] < 14.37){
                while(m < 5){
                    cc.log("in:"+i);
                    if(13.55 < obj.others.scores[m][1]){
                        break;
                    } else {
                        m++;
                    }
                }
            } else {
                m = 5;
            }

            switch(m){
                case 1:
                    obj.others.scores[4] = obj.others.scores[3];
                    obj.others.scores[3] = obj.others.scores[2];
                    obj.others.scores[2] = obj.others.scores[1];
                    obj.others.scores[1] = ["Engineering Producer\nYutaro Ikutani\n",13.55];
                    break;
                case 2:
                    obj.others.scores[4] = obj.others.scores[3];
                    obj.others.scores[3] = obj.others.scores[2];
                    obj.others.scores[2] = ["Engineering Producer\nYutaro Ikutani\n",13.55];
                    break;
                case 3:
                    obj.others.scores[4] = obj.others.scores[3];
                    obj.others.scores[3] = ["Engineering Producer\nYutaro Ikutani\n",13.55];
                    break;
                case 4:
                    obj.others.scores[4] = ["Engineering Producer\nYutaro Ikutani\n",13.55];
                    break;
                default:
                    break;                                                
            }
            // end - score update

            cc.log("version update complete!");
        }
        // end version update.

        // update globals
        lv = obj.power.userLv;
        exp = obj.power.userExp;
        point = obj.power.point;
        lastLogin = obj.power.lastLogin;
        loginTimes = obj.power.logintTimes;
        clearLvTable = obj.others.clearLvTable;
        life = obj.others.life;
        removeBannerAd = obj.power.removeBannerAd;
        premiumPhrase = obj.power.premiumPhrase;
        premiumFunction = obj.power.premiumFunction;
        currentGirl = obj.power.currentGirl;
        savedStep = obj.others.savedStep;
        savedTimeLeft = obj.others.savedTimeLeft;
        savedTimePassing = obj.others.savedTimePassing;
        didReadSave = obj.others.didReadSave;
        scores = obj.others.scores;

        cc.log(clearLvTable);

        //display Splash under initiation.
        cc.log("init IAP:"+isInitiationIAP);
        cc.log("init AdColony:"+isInitiationAdColony);
        cc.log("init Vungle"+isInitiationVungle);
        cc.log("init GoogleAnalytics"+isInitiationGoogleAnalytics);
        cc.log("init Review"+isInitiationReview);


        if(isInitiationIAP != 2 || isInitiationAdColony != 2 || isInitiationVungle != 2){
            var splash = new cc.Sprite(res.Splash_png);
            splash.setPosition(centerpos);
            this.addChild(splash,0,100);
            // convert status : in progress -> none. (except GoogleAnalytics & Review)
            if(isInitiationIAP != 2){
                isInitiationIAP = 0;
            }
            if(isInitiationAdColony != 2){
                isInitiationAdColony = 0;
            }
            if(isInitiationVungle != 2){
                isInitiationVungle = 0;
            }
            // start
            this.scheduleUpdate();
        } else {
            this.launching = 1;
            this.launch();
        }

        // IAP
        sdkbox.IAP.setListener({    // required for refresh
            onProductRequestSuccess : function (products) {
                //Returns you the data for all the iap products
                //You can get each item using following method
                var msgStr = "list: [";
                for (var i = 0; i < products.length; i++) {
                    msgStr += products[i].id + "(" + products[i].name + "), ";
                }
                msgStr += "]";
                cc.log(msgStr);

                if(isInitiationIAP != 2){
                    isInitiationIAP = 2;
                    cc.log("IAP init:done.");
                }
            },
            onProductRequestFailure : function (msg) {
                //When product refresh request fails.
                isInitiationIAP = 0;
                var msgStr = "request error";
                cc.log(msgStr+" : "+msg);
            }
        });

        // AdColony
        sdkbox.PluginAdColony.setListener({
            onAdColonyChange : function (data, available) {
                // Called when AdColony finish loading
                cc.log("AdColony init:"+available);
                if(available){
                    isInitiationAdColony = 2;
                    cc.log("AdColony init:done.");
                }
            }
        });

        // vungle
        sdkbox.PluginVungle.setListener({
            onVungleCacheAvailable : function() {
                cc.log("onVungleCacheAvailable");
                isInitiationVungle = 2;
            }
        });
        cc.log("scores:"+scores);
    },
    update: function(dt){
        this.loadingTime += dt;
        // under initiation
        if(this.launching == 0 && this.loadingTime >= 3){
            cc.log("initiation too long.");
            // force app to launch keeping init going
            this.launching = 1;
            this.launch();
        } else if(this.loadingTime <= 2){
            return true;
        }
        
        switch(isInitiationGoogleAnalytics){
            case 0:
                cc.log("start GoogleAnalytics init");
                sdkbox.PluginGoogleAnalytics.init();
                isInitiationGoogleAnalytics = 1;
                break;
            default:
                break;
        }

        switch(isInitiationReview){
            case 0:
                cc.log("start Review init");
                // custom string for the rate prompt
                sdkbox.PluginReview.setTitle("私、何点ですか？");
                sdkbox.PluginReview.setMessage("マウンティングガールが\nあなたにコメントしてほしいようです");
                sdkbox.PluginReview.setCancelButtonTitle("絶対やだ");
                sdkbox.PluginReview.setRateButtonTitle("やってあげる");
                sdkbox.PluginReview.setRateLaterButtonTitle("ちょっと焦らす");

                // init
                sdkbox.PluginReview.init();
                isInitiationReview = 1;
                break;
            default:
                break;
        }

        switch(isInitiationIAP){
            case 0:
                // SDKBOX initiation
                cc.log("start IAP init");
                sdkbox.IAP.setDebug(true);  // logging
                sdkbox.IAP.init();
                isInitiationIAP = 1;
                break;
            default:
                break;
        }

        switch(isInitiationAdColony){
            case 0:
                cc.log("start AdColony init");
                sdkbox.PluginAdColony.init();
                isInitiationAdColony = 1;
                break;
            default:
                break;
        }

        switch(isInitiationVungle){
            case 0:
                cc.log("start Vungle init");
                sdkbox.PluginVungle.init();
                isInitiationVungle = 1;
                break;
            default:
                break;
        }

        if(isInitiationIAP == 2 && isInitiationAdColony == 2 && isInitiationVungle == 2 && isInitiationGoogleAnalytics == 2 && isInitiationReview == 2){
            cc.log("ALL init done.");
            this.unscheduleUpdate();
            this.launch();
        }
    },
    launch: function(){
        cc.log("start launch");
        //4. create a background image and set it's position at the center of the screen
        var spritebg = new cc.Sprite(res.Top_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);
        this.removeChildByTag(100); //splash

        //display User Lv. & Exp. & Point
        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelExp = new cc.LabelTTF("Exp." + exp, "res/font/logotypejp_mp_b_1.ttf", 40);            
        } else {
            this.labelExp = new cc.LabelTTF("Exp." + exp, "Corporate-Logo-Bold", 40);
        }
        this.labelExp.setColor(cc.color(0,0,0));//black color
        this.labelExp.setPosition(cc.p(w/5,h/5));
        this.addChild(this.labelExp);

        if(lv!=11){
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelLv = new cc.LabelTTF("Lv." + lv, "res/font/logotypejp_mp_b_1.ttf", 40);
                this.labelLv.setPosition(cc.p(w/7, h/4));
            } else {
                this.labelLv = new cc.LabelTTF("Lv." + lv, "Corporate-Logo-Bold", 40);
                this.labelLv.setPosition(cc.p(w/7, h/4));
            }
        } else {
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelLv = new cc.LabelTTF("Lv.100", "res/font/logotypejp_mp_b_1.ttf", 40);
                this.labelLv.setPosition(cc.p(w*0.145, h/4));
            } else {
                this.labelLv = new cc.LabelTTF("Lv.100", "Corporate-Logo-Bold", 40);
                this.labelLv.setPosition(cc.p(w*0.145, h/4));
            }
        }
        this.labelLv.setColor(cc.color(0,0,0));//black color
        this.addChild(this.labelLv);

        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelPt = new cc.LabelTTF("Point." + point, "res/font/logotypejp_mp_b_1.ttf", 40);            
        } else {
            this.labelPt = new cc.LabelTTF("Point." + point, "Corporate-Logo-Bold", 40);
        }
        this.labelPt.setColor(cc.color(0,0,0));//black color
        this.labelPt.setPosition(cc.p(w*6/7,h/5));
        this.addChild(this.labelPt);

        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.StartBtn_png), // normal state image
            new cc.Sprite(res.StartBtn_s_png), //select state image
            new cc.Sprite(res.StartBtn_s_png), //disabled state image
            this.onPlay, this);

        var menuItemOther = new cc.MenuItemSprite(
            new cc.Sprite(res.OtherBtn_png), // normal state image
            new cc.Sprite(res.OtherBtn_s_png), //select state image
            new cc.Sprite(res.OtherBtn_s_png), //disabled state image
            this.goOther, this);

        var menu = new cc.Menu(menuItemOther,menuItemPlay);  //7. create the menu
        menu.setPosition(cc.p(w/2,h/9));
        menu.alignItemsHorizontallyWithPadding(30);
        this.addChild(menu);

        //for develop
/*
        var menuItemClear = new cc.MenuItemSprite(
            new cc.Sprite(res.Clear_png), // normal state image
            new cc.Sprite(res.Clear_png), //select state image
            new cc.Sprite(res.Clear_png), //disabled state image
            this.clearExp, this);
*/
/*
        var menuClear = new cc.Menu(menuItemClear);  //7. create the menu
        menuClear.setPosition(cc.p(w*7/8, h/5+50));
        this.addChild(menuClear);
*/

        //for develop
/*
        var menuItemTest = new cc.MenuItemSprite(
            new cc.Sprite(res.Clear_png), // normal state image
            new cc.Sprite(res.Clear_png), //select state image
            new cc.Sprite(res.Clear_png), //disabled state image
            this.test, this);

        var menuTest = new cc.Menu(menuItemTest);  //7. create the menu
        menuTest.setPosition(cc.p(w*7/8, h/5+50));
        this.addChild(menuTest);
*/
        sdkbox.PluginGoogleAnalytics.startSession();
        cc.log("start session");

        this.login();

        cc.log("banner flg:"+removeBannerAd);
        cc.log("banner flg2:"+obj.power.removeBannerAd);

        // show baner Ad
        if(removeBannerAd == 0){
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAdView", 
                                                "()V");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("AppController", 
                                               "ShowAdView"); 
            }
            cc.log("show adview");
        }
    },
    login: function(){
        var todayFull = new Date();
        var yesterdayFull = new Date(todayFull.getFullYear(),todayFull.getMonth(),todayFull.getDate()-1);
        var today = todayFull.getDate();
        var yesterday = yesterdayFull.getDate();
        cc.log("yesterday:"+yesterday);

        if(lastLogin == today){
            cc.log("no bonus");
        } else if (lastLogin == yesterday && loginTimes == 1){
            // get 2 point
            var bonus1 = new cc.Sprite(res.Bonus_2_png);
            bonus1.setPosition(centerpos);
            this.addChild(bonus1,100,602);
            point += 1;
            loginTimes = 2;
        } else if (lastLogin == yesterday && loginTimes == 2){
            // get 3 point
            var bonus1 = new cc.Sprite(res.Bonus_3_png);
            bonus1.setPosition(centerpos);
            this.addChild(bonus1,100,602);
            point += 3;
            loginTimes = 3;
        } else {
            // get 1 point
            var bonus1 = new cc.Sprite(res.Bonus_1_png);
            bonus1.setPosition(centerpos);
            this.addChild(bonus1,100,602);
            point += 1;
            loginTimes = 1;
        }

        // ok btn
        if(lastLogin != today){
            var BG = new cc.Sprite(res.Cover_png);
            BG.setPosition(centerpos);
            BG.setOpacity(150);
            this.addChild(BG,50,601);

            var menuItemOk = new cc.MenuItemSprite(
                new cc.Sprite(res.closeBtn_png), // normal state image
                new cc.Sprite(res.closeBtn_s_png), //select state image
                new cc.Sprite(res.closeBtn_s_png), //disabled state image
                this.done, this);

            var ok = new cc.Menu(menuItemOk);  //7. create the menu
            ok.setPosition(cc.p(w/2,h*0.3));
            this.addChild(ok,100,603);
        }

        lastLogin = today;

        // save
        obj.power.point = point;
        obj.power.lastLogin = lastLogin;
        obj.power.loginTimes = loginTimes;
        str = JSON.stringify(obj);
        cc.sys.localStorage.setItem("userData",str);
        cc.log("saved");

        // update display
        this.labelPt.setString("Point." + point);
    },
    done: function(){
        if(this.getChildByTag(601)){
            this.removeChildByTag(601);
            this.removeChildByTag(602);
            this.removeChildByTag(603);
        }
    },
    onPlay: function(){
        //Go to Play-Scene
        cc.director.runScene(new PlayScene());
    },
    goOther: function(){
        var layer = new OtherLayer();
        this.getParent().addChild(layer);
        this.removeFromParent();
    }/*,
    test: function(){
        
        // remove Ad
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "hideAdView", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "disableBannerAd"); 
        }
        cc.log('done');
    }*/,
    tutorial:function(){
        pageView = new ccui.PageView();
        pageView.setTouchEnabled(true);
        pageView.setContentSize(cc.size(640,960));
        pageView.setAnchorPoint(cc.p(0.5,0.5));
        pageView.setCustomScrollThreshold(w/5);
        pageView.x = w/2;
        pageView.y = h/2;

        for (var i = 0; i < 6; i++){
            var layout = new ccui.Layout();

            var imageView = new ccui.ImageView();
            imageView.loadTexture("res/Tutorial"+i+".png");
            imageView.x = w/2;
            imageView.y = h/2;
            layout.addChild(imageView);

            pageView.addPage(layout);
        }

        pageView.addEventListener(this.pageViewEvent, this);
        this.addChild(pageView,100,600);
    },
    pageViewEvent: function(sender, type){
        switch(type){
            case ccui.PageView.EVENT_TURNING:
                if(sender.getCurPageIndex() == 5){
                    this.removeChildByTag(600);
                }

                cc.log("Page: " + sender.getCurPageIndex());
                break;
            default:
                cc.log("pageView other case");
                break;
        }
    }/*,
    clearExp: function(){
         //init userData
        if(obj){
            cc.sys.localStorage.removeItem("userData");
        }
        var arr1 = [];
        arr1.push(1);
        for (var i = 1; i < stock; i++){
            arr1.push(0);
        }
        obj = {
            power : {
                userLv : 1,
                userExp : 0
            },
            others : {
                clearLvTable : arr1,
                life : 7,
                savedStep : 0,
                savedTimeLeft : 0,
                savedTimePassing : 0,
                scores : [
                    [
                        "Engineering Producer\nYutaro Ikutani\n",
                        10.50
                    ],
                    [
                        "Sales Producer\nYohei Yamazaki\n",
                        15.00
                    ],
                    [
                        "Designer\nRena Muto",
                        20.00
                    ],
                    [
                        "user",
                        50.00
                    ],
                    [
                        "user",
                        55.00
                    ]
                ]
            }
        };
        str = JSON.stringify(obj);
        cc.sys.localStorage.setItem("userData",str);

        lv = obj.power.userLv;
        exp = obj.power.userExp;
        clearLvTable = obj.others.clearLvTable;
        life = obj.others.life;
        savedStep = obj.others.savedStep;
        savedTimeLeft = obj.others.savedTimeLeft;
        savedTimePassing = obj.others.savedTimePassing;
        scores = obj.others.scores;
        
        open = openTable[lv]-1;
        own = 0;
        for (var i = 0; i < openTable[lv]-1; i++){
            if(clearLvTable[i] != 0) own++;
        }
        cc.log("clear:"+str);

        this.labelLv.setString("Lv."+lv);
        this.labelExp.setString("Exp."+exp);
    }*/
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});