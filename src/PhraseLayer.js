var PhraseLayer = cc.Layer.extend({
    labelLv:null,
    labelExp:null,
    labelGet:null,  //getExp
    labelExpAfter:null,
    labelNew:null,
    Get:0,
    _end:0,     //Progressbar one-end
    _from:0,   //Progressbar present position
    _to:0,     //Progressbar finish position
    _loadingBar:null,
    CalloutWidth:0,
    FaceWidth:0,
    flg:0,  // 1->win, 2->lose
    level:0,    // phrase[level-1][num]
    num:0,   // phrase[level-1][num]
    slice:0, //Progressbar grow by update
    count:0,
    beautyPhrase:null,  //label
    uglyPhrase:null,    //label
    stringBeauty:null,   // beauthPhrase
    stringUgly:null,   // uglyPhrase
    updateflg:0,  // 1->first phrase, 2->second phrase, 3->Progressbar
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

        // init
        lv = obj.power.userLv;
        exp = obj.power.userExp;

        //美人の顔とセリフの表示
        var uglyFace = new cc.Sprite(res.Ugly_normal_png);  //ブス顏（ノーマル）
        uglyFace.setPosition(cc.p(w - uglyFace.width / 2,h/2));

        var uglyCallout = new cc.Sprite(res.Callout_ugly_png);  //ブス吹き出し
        uglyCallout.setPosition(cc.p(uglyCallout.width / 2,h/2));

        var beautyFace = new cc.Sprite("res/girls/"+currentGirl+".png");  //美人顏（ノーマル）
        beautyFace.setPosition(cc.p(uglyFace.width / 2,h*13/16));

        var beautyCallout = new cc.Sprite(res.Callout_beauty_png);  //美人吹きだし
        beautyCallout.setPosition(cc.p(w - beautyCallout.width / 2,h*13/16));


        this.addChild(bg);
        this.addChild(uglyFace,0,2);
        this.addChild(beautyFace,0,1);
        this.addChild(uglyCallout);
        this.addChild(beautyCallout);

        // position@showPhase
        this.CalloutWidth = uglyCallout.width;
        this.FaceWidth = uglyFace.width;

        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.beautyPhrase = new cc.LabelTTF("", "res/font/cinecaption2.28.ttf", 20, cc.size(this.CalloutWidth*0.8,uglyCallout.height*0.8), cc.TEXT_ALIGNMENT_LEFT);
        } else {
            this.beautyPhrase = new cc.LabelTTF("", "cinecaption", 20, cc.size(this.CalloutWidth*0.8,uglyCallout.height*0.8), cc.TEXT_ALIGNMENT_LEFT);
        }
        this.beautyPhrase.setColor(cc.color(0,0,0));//black color
        this.beautyPhrase.setPosition(cc.p(w - this.CalloutWidth / 2, h*0.77));

        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.uglyPhrase = new cc.LabelTTF("", "res/font/cinecaption2.28.ttf", 20, cc.size(this.CalloutWidth*0.8,uglyCallout.height*0.8), cc.TEXT_ALIGNMENT_LEFT);
        } else {
            this.uglyPhrase = new cc.LabelTTF("", "cinecaption", 20, cc.size(this.CalloutWidth*0.8,uglyCallout.height*0.8), cc.TEXT_ALIGNMENT_LEFT);
        }
        this.uglyPhrase.setColor(cc.color(0,0,0));//black color
        this.uglyPhrase.setPosition(cc.p(this.CalloutWidth / 2, h*0.46));

        this.addChild(this.beautyPhrase);
        this.addChild(this.uglyPhrase);

        //現在Lv. & Exp.　獲得Exp表示
        //配置。
        if(lv!=11){
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelLv = new cc.LabelTTF("Lv." + lv, "res/font/logotypejp_mp_b_1.ttf", 40);
                this.labelLv.setPosition(cc.p(w/7, h*0.28));
            } else {
                this.labelLv = new cc.LabelTTF("Lv." + lv, "Corporate-Logo-Bold", 40);
                this.labelLv.setPosition(cc.p(w/7, h*0.28));
            }
        } else {
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelLv = new cc.LabelTTF("Lv.100", "res/font/logotypejp_mp_b_1.ttf", 40);
                this.labelLv.setPosition(cc.p(w*0.145, h*0.28));
            } else {
                this.labelLv = new cc.LabelTTF("Lv.100", "Corporate-Logo-Bold", 40);                
                this.labelLv.setPosition(cc.p(w*0.145, h*0.28));
            }
        }
        this.labelLv.setColor(cc.color(255,255,255));//white color

        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelExpAfter = new cc.LabelTTF("Exp."+exp, "res/font/logotypejp_mp_b_1.ttf", 40);
        } else {
            this.labelExpAfter = new cc.LabelTTF("Exp."+exp, "Corporate-Logo-Bold", 40);
        }
        this.labelExpAfter.setColor(cc.color(255,255,255));//black color
        this.labelExpAfter.setPosition(cc.p(w*0.5, h*0.28));

        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelGet = new cc.LabelTTF("+ 0", "res/font/logotypejp_mp_b_1.ttf", 40);
        } else {
            this.labelGet = new cc.LabelTTF("+ 0", "Corporate-Logo-Bold", 40);
        }
        this.labelGet.setColor(cc.color(255,0,0));//red color
        this.labelGet.setPosition(cc.p(w*7/8, h*0.28));

        this.addChild(this.labelLv);
        this.addChild(this.labelExpAfter);
        this.addChild(this.labelGet);

        if(lv == 1){
            this._from = exp;
            this._to = exp;
            this._end = lvup[lv-1];
        } else if(lv == 11){
            this._from = exp;
            this._to = exp;
            this._end = exp;
        } else {
            this._from = exp - lvup[lv-2];
            this._to = exp - lvup[lv-2];
            this._end = lvup[lv-1] - lvup[lv-2];
        }
//        cc.log("from:"+this._from+"/to:"+this._to+"/end:"+this._end+"  _initiatied.");

        // Progressbar
        this.createLoadingBar();
    },
    animateControl:function(flg,num,labelNew){
        cc.log("渡されたNum："+num);

        // save in variable to keep accessible from this layer.
        this.flg = flg; // 1 -> win, 2 -> lose
        this.num = num;
        this.level = currentGirl;

        // num使ってリソース書き換えて美人のセリフ
        this.skipflg = 1;
        this.schedule(this.cut1,0.5);

        // 新規獲得だったらラベル
        if(labelNew == 0){
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelNew = new cc.LabelTTF("NEW!!", "res/font/logotypejp_mp_b_1.ttf", 40);
            } else {
                this.labelNew = new cc.LabelTTF("NEW!!", "Corporate-Logo-Bold", 40);                
            }
            this.labelNew.setColor(cc.color(255,0,0));//red color
            this.labelNew.setPosition(cc.p(w/2, h*15/16));
            this.addChild(this.labelNew);
    
            // update clearLvTable only when win.
            clearLvTable[this.level-1][num] = 1;
            obj.others.clearLvTable[this.level-1][num] = 1;
        }
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

        var skipBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.Skip_png), // normal state image
            new cc.Sprite(res.Skip_s_png), //select state image
            new cc.Sprite(res.Skip_s_png), //disabled state image
            this.skip, this);
        var skipMenu = new cc.Menu(skipBtn);  //7. create the menu
        skipMenu.setPosition(cc.p(w/2, h/9));
        this.addChild(skipMenu,0,3);

    },
    cut2:function(){
        this.unschedule(this.cut2);
        //ブスのセリフの表示
        switch(this.flg){
            case 1:
                // win
                var str2 = phrase[this.level-1][this.num][1];
                this.stringUgly = str2;
                break;
            default:
                // lose or time-up（固定のセリフ）
                var str2 = phrase[this.level-1][this.num][2];
                this.stringUgly = str2;
                break;
        }
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
        //表情変化　<- flg によって変化先が決定
        switch(this.flg){
            case 1:
                var beautyWin = new cc.Sprite("res/girls/"+currentGirl+"_lose.png");
                beautyWin.setPosition(cc.p(this.FaceWidth / 2,h*13/16));
                this.addChild(beautyWin);

                break;
            default:
                var beautyLose = new cc.Sprite("res/girls/"+currentGirl+"_win.png");
                beautyLose.setPosition(cc.p(this.FaceWidth / 2,h*13/16));
                this.addChild(beautyLose);

                break;
        }
        this.removeChildByTag(1);
        if(this.skipflg == 1){
            this.schedule(this.cut4,0.5);
        }
    },
    cut4: function(){
        this.unschedule(this.cut4);
        //表情変化　<- flg によって変化先が決定
        switch(this.flg){
            case 1:
                var uglyWin = new cc.Sprite(res.Ugly_win_png);
                uglyWin.setPosition(cc.p(w - this.FaceWidth / 2,h/2));
                this.addChild(uglyWin);
                break;
            default:
                var uglyLose = new cc.Sprite(res.Ugly_lose_png);
                uglyLose.setPosition(cc.p(w - this.FaceWidth / 2,h/2));
                this.addChild(uglyLose);
                break;
        }
        this.removeChildByTag(2);
        if(this.skipflg == 1){
            this.schedule(this.getExp,0.3);
        }
    },
    getExp:function (){
        this.unschedule(this.getExp);
        if(lv!=11 && this.flg == 1){
            //calc exp
            var E = expTable[lv-1];
            if(Outcome != 0){
                this.Get = Math.ceil(Math.pow(timeLimits[lv-1] / Outcome,2.0) * E);
            }
            cc.log("get:"+this.Get);
            exp += this.Get;
            this.labelGet.setString("+ "+this.Get);

            // Progressbar
            this._to = this._from + this.Get;
            this.slice = this.Get / 40;    //40フレで完了

            //userData書き込み
            obj.power.userExp = exp;
            if(exp >= lvup[lv-1]){  // lv-up.
                lv++;
                obj.power.userLv = lv;
//                open = openTable[lv] - 1;   // update open
                if(lv == 11){
                    currentGirl = 10;
                    obj.power.currentGirl = 10;
                } else {
                    currentGirl = lv;
                    obj.power.currentGirl = lv;
                }
            }
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);
            Outcome = 0;
            cc.log("update:"+JSON.stringify(obj));
        }
        //Progress-bar start
        this.updateflg = 3;
        this.scheduleUpdate();

        //ボタン設置
        this.removeChildByTag(3);   // skipBtn
        this.showBtn(); //次へボタン
    },
    createLoadingBar:function(){
        var ProgressBG = new cc.Sprite(res.ProgressBG_png);
        ProgressBG.setPosition(cc.p(w*0.45, h/5));
        var loadingBar = new ccui.LoadingBar();
        loadingBar.setName("LoadingBar");
        loadingBar.loadTexture(res.Progress_png);
        loadingBar.setPosition(cc.p(w*0.45,h/5));

        loadingBar.setPercent(Math.floor(this._from / this._end * 100));

        this.addChild(ProgressBG);
        this.addChild(loadingBar);
        this._loadingBar = loadingBar;

//        this.scheduleUpdate();
//        cc.log("from:"+this._from+",to:"+this._to);
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

        // Progressbar        
        if (this._from >= this._to) {
            this.labelGet.setString("+ 0");
            this.unscheduleUpdate();
        } else {
            this._from += this.slice
            this.Get -= this.slice
            this._loadingBar && this._loadingBar.setPercent((this._from / this._end * 100).toFixed(1));

            if(lv == 1){
                this.labelExpAfter.setString("Exp："+ this._from.toFixed(0));
                this.labelGet.setString("+ "+this.Get.toFixed(0));
            } else {
                this.labelExpAfter.setString("Exp："+(this._from + lvup[lv-2]).toFixed(0));
                this.labelGet.setString("+ "+this.Get.toFixed(0));
            }

            // Lv.up
            if(this._from >= this._end){

                //from,to,endの更新
                this._from = 0;
                this._to = exp - lvup[lv-2];
                this._end = lvup[lv-1] - lvup[lv-2];

                var l;
                (lv == 11)?  l = 10: l = lv;
                if(lv == 11) this.unscheduleUpdate();
                
                this.labelLv.setString("Lv:" + l);

                if(cc.sys.os == cc.sys.OS_ANDROID){
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                    "showAlertDialog", 
                                                    "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                   "Lv.アップ", 
                                                   "マウント完了！\nTwitterで@MountingGirlに向かって\nつぶやいてね。\nレベル"+l+"の女子もお楽しみに！");
                } else if(cc.sys.os == cc.sys.OS_IOS){
                    jsb.reflection.callStaticMethod("NativeOcClass", 
                                                   "callNativeUIWithTitle:andContent:", 
                                                   "Lv.アップ", 
                                                   "マウント完了！\nTwitterで@MountingGirlに向かって\nつぶやいてね。\nレベル"+l+"の女子もお楽しみに！");
                }
            }
        }
    },
    showBtn:function (){
        //配置。座標指定するか、alignメソッド使うか
        var homeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.HomeBtn_png), // normal state image
            new cc.Sprite(res.HomeBtn_s_png), //select state image
            new cc.Sprite(res.HomeBtn_s_png), //disabled state image
            this.home, this);

        var retryBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.RetryBtn_png), // normal state image
            new cc.Sprite(res.RetryBtn_s_png), //select state image
            new cc.Sprite(res.RetryBtn_s_png), //disabled state image
            this.retry, this);

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

        var resultMenu = new cc.Menu(homeBtn,retryBtn);
        resultMenu.setPosition(cc.p(w/2,h/9));
        resultMenu.alignItemsHorizontallyWithPadding(30);

        var shareMenu = new cc.Menu(twitterBtn,facebookBtn);  //7. create the menu
        shareMenu.setPosition(cc.p(w*7/9, h*15/16));
        shareMenu.alignItemsHorizontallyWithPadding(30);

        this.addChild(resultMenu);
        this.addChild(shareMenu);
    },
    skip:function (){
        cc.log("skip");

        this.unschedule(this.cut1);
        this.unschedule(this.cut2);
        this.unschedule(this.cut3);
        this.unschedule(this.cut4);
        this.unschedule(this.getExp);
        this.removeChildByTag(3);

        this.skipflg = 2;
        this.cut1();
        this.cut2();
        this.cut3();
        this.cut4();
        this.getExp();
    },
    home:function (){
        cc.director.runScene(new MenuScene());
    },
    retry:function (){
        cc.director.runScene(new PlayScene());
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