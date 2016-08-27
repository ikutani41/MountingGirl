var EanimationLayer = cc.Layer.extend({
    labelSavedStep:null,
    labelSavedTime:null,
    labelProgress:null,
    labelTime:null,
    labelLife:null,
    shop:null,  // shopmenu

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();
        this.scheduleUpdate();
    },
    over:function (flg){
        // img: win/lose
        var str;
        switch(flg){
            case 1:
                str = res.Win_png;
                break;
            case 2:
                str = res.Lose_png; // change
                break;
            default:
                break;
        }
        var rsltImg = new cc.Sprite(str);
        rsltImg.setPosition(centerpos);
        this.addChild(rsltImg);

        // win?
        switch(flg){
            case 1:
                this.schedule(this.win,2.0);
                break;
            default:
                this.schedule(this.lose,1.5);
                break;
        }
    },
    update:function(){
        if(this.labelLife){
            this.labelLife.setString(""+life);  // for IAP
        }
    },
    win:function(){
        this.unschedule(this.win);
        // save clear
        savedTimePassing = 0;

        // update scores
        cc.log("scores:"+scores);
        var newscore = parseFloat(this.getParent().getNewScore());
        if(newscore != 0){
            var i = 0;
            while(i < 5){
                cc.log("in:"+i);
                if(newscore < scores[i][1]){
                    break;
                } else {
                    i++
                }
            }
            switch(i){
                case 0:
                    scores[4] = scores[3];
                    scores[3] = scores[2];
                    scores[2] = scores[1];
                    scores[1] = scores[0];
                    scores[0] = ["user",newscore];
                    break;
                case 1:
                    scores[4] = scores[3];
                    scores[3] = scores[2];
                    scores[2] = scores[1];
                    scores[1] = ["user",newscore];
                    break;
                case 2:
                    scores[4] = scores[3];
                    scores[3] = scores[2];
                    scores[2] = ["user",newscore];
                    break;
                case 3:
                    scores[4] = scores[3];
                    scores[3] = ["user",newscore];
                    break;
                case 4:
                    scores[4] = ["user",newscore];
                    break;
                default:
                    break;                                                
            }
            if(i >= 5){
                this.getParent().setRank(100);  // ランク外
            } else {
                this.getParent().setRank(i+1);
            }
            cc.log(scores);
        }

        // write
        obj.others.savedTimePassing = savedTimePassing;
        obj.others.scores = scores;
        str = JSON.stringify(obj);
        cc.sys.localStorage.setItem("userData",str);
        cc.log("update:"+JSON.stringify(obj.others));

        this.getParent().addChild(new EscoreLayer(), 5, TagOfLayer.Escore);
        this.getParent().getChildByTag(TagOfLayer.Estatus).removeFromParent();
        this.removeFromParent();
    },
    lose:function(){    //save?
        this.unschedule(this.lose);
        // bg
        var bg = new cc.Sprite(res.ResultBG_png);
        bg.setPosition(centerpos);
        this.addChild(bg, 0, 10);

        // life
        var lifeview;
        if(!life){
            lifeview = 0;
        } else {
            lifeview = life;
        }
        
        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelLife = new cc.LabelTTF(""+lifeview, "res/font/logotypejp_mp_b_1.ttf", 60);
        } else {
            this.labelLife = new cc.LabelTTF(""+lifeview, "Corporate-Logo-Bold", 60);
        }
        this.labelLife.setColor(cc.color(0,0,0));//black color
        this.labelLife.setPosition(cc.p(w/2,h*0.23));
        this.addChild(this.labelLife);

        // display saved-record
        if(savedTimePassing == 0){
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelSavedStep = new cc.LabelTTF("記録なし", "res/font/logotypejp_mp_b_1.ttf", 30);
            } else {
                this.labelSavedStep = new cc.LabelTTF("記録なし", "Corporate-Logo-Bold", 30);
            }
            this.labelSavedStep.setColor(cc.color(0,0,0));//black color
            this.labelSavedStep.setPosition(cc.p(w/4, h*0.65));
            this.addChild(this.labelSavedStep);
        } else {
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelSavedStep = new cc.LabelTTF("あと 50" + " Step!!", "res/font/logotypejp_mp_b_1.ttf", 30);
                this.labelSavedTime = new cc.LabelTTF(savedTimePassing + "Sec.", "res/font/logotypejp_mp_b_1.ttf", 30);
            } else {
                this.labelSavedStep = new cc.LabelTTF("あと 50" + " Step!!", "Corporate-Logo-Bold", 30);
                this.labelSavedTime = new cc.LabelTTF(savedTimePassing + "Sec.", "Corporate-Logo-Bold", 30);
            }
            this.labelSavedStep.setColor(cc.color(0,0,0));//black color
            this.labelSavedStep.setPosition(cc.p(w/4, h*0.65));
            this.labelSavedTime.setColor(cc.color(0,0,0));//black color
            this.labelSavedTime.setPosition(cc.p(w/4, h*0.6));
            this.addChild(this.labelSavedStep);
            this.addChild(this.labelSavedTime);
        }

        // load game-record
        var record = this.getParent().getRecord();

        // display game-record
        if(record == 0){
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelProgress = new cc.LabelTTF("記録なし", "res/font/logotypejp_mp_b_1.ttf", 30);
            } else {
                this.labelProgress = new cc.LabelTTF("記録なし", "Corporate-Logo-Bold", 30);
            }
            this.labelProgress.setColor(cc.color(0,0,0));//black color
            this.labelProgress.setPosition(cc.p(w*3/4, h*0.65));
            this.addChild(this.labelProgress);

            // redirect
            this.schedule(this.nosave,2.0);
        } else {
            if(cc.sys.os === cc.sys.OS_ANDROID){
                this.labelProgress = new cc.LabelTTF("あと 50"+ " Step!!", "res/font/logotypejp_mp_b_1.ttf", 30);
                this.labelTime = new cc.LabelTTF(record + " Sec.", "res/font/logotypejp_mp_b_1.ttf", 30);
            } else {
                this.labelProgress = new cc.LabelTTF("あと 50"+ " Step!!", "Corporate-Logo-Bold", 30);
                this.labelTime = new cc.LabelTTF(record + " Sec.", "Corporate-Logo-Bold", 30);
            }
            this.labelProgress.setColor(cc.color(0,0,0));//black color
            this.labelProgress.setPosition(cc.p(w*3/4, h*0.65));
            this.labelTime.setColor(cc.color(0,0,0));//black color
            this.labelTime.setPosition(cc.p(w*3/4, h*0.6));
            this.addChild(this.labelProgress);
            this.addChild(this.labelTime);

            // button
            var saveBtn = new cc.MenuItemSprite(
                new cc.Sprite(res.SaveBtn_png), // normal state image
                new cc.Sprite(res.SaveBtn_s_png), //select state image
                new cc.Sprite(res.SaveBtn_s_png), //disabled state image
                this.check, this);

            var nosaveBtn = new cc.MenuItemSprite(
                new cc.Sprite(res.ContinueBtn_png), // normal state image
                new cc.Sprite(res.ContinueBtn_s_png), //select state image
                new cc.Sprite(res.ContinueBtn_s_png), //disabled state image
                this.nosave, this);

            var saveMenu = new cc.Menu(saveBtn,nosaveBtn);
            saveMenu.setPosition(cc.p(w/2,h*0.25));
            saveMenu.alignItemsVerticallyWithPadding(170);
            this.addChild(saveMenu,0,50);

            // tutorial about Save
            if(!didReadSave){
                this.tutorial();
            }
        }
    },
    check:function(){
        if(life > 0){
            this.save();
        } else {
            var cover = new cc.Sprite(res.Cover_png);
            cover.setPosition(centerpos);
            cover.setOpacity(150);

            this.shop = new cc.Sprite(res.ShopBG_png);
            this.shop.setPosition(w/2,h*2/5);

            this.addChild(cover,0,30);
            this.addChild(this.shop,0,40);

            var purchase1Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.Item1_png), // normal state image
                new cc.Sprite(res.Item1_png), //select state image
                new cc.Sprite(res.Item1_png), //disabled state image
                this.purchase1, this);

            var purchase2Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.Item2_png), // normal state image
                new cc.Sprite(res.Item2_png), //select state image
                new cc.Sprite(res.Item2_png), //disabled state image
                this.purchase2, this);

            var movieBtn = new cc.MenuItemSprite(
                new cc.Sprite(res.Item3_png), // normal state image
                new cc.Sprite(res.Item3_png), //select state image
                new cc.Sprite(res.Item3_png), //disabled state image
                this.movie, this);

            var cancelBtn = new cc.MenuItemSprite(
                new cc.Sprite(res.CancelBtn_png), // normal state image
                new cc.Sprite(res.CacnelBtn_s_png), //select state image
                new cc.Sprite(res.CancelBtn_s_png), //disabled state image
                this.cancel, this);

            var shopMenu = new cc.Menu(purchase1Btn,purchase2Btn,movieBtn,cancelBtn);

            shopMenu.setPosition(cc.p(this.shop.width/2,this.shop.height/2));
            shopMenu.alignItemsVerticallyWithPadding(70);
            this.shop.addChild(shopMenu,0,70);

            // disable menu.
            this.getChildByTag(50).setEnabled(false);

            // SDKBOX IAP handler
            sdkbox.IAP.setListener({
                onSuccess : function (product) {    // property: id, name
                    // hide indicator
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "progressDismiss", 
                                                        "()V");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "indicatorDismiss");
                    }

                    //Purchase success
                    switch(product.id){
                        case "com.yij.mountinggirl_1":
                            life = 3;
                            break;
                        case "com.yij.mountinggirl_2":
                            life = 8;
                            break;
                        default:
                            cc.log("Purchase Success with errors. productID:"+product.id)
                            break;
                    }

                    // save
                    obj.others.life = life;
                    str = JSON.stringify(obj);
                    cc.sys.localStorage.setItem("userData",str);
                    cc.log("update data");

                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "showAlertDialog", 
                                                        "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                       "決済完了", 
                                                       "残りセーブ回数が"+life+"になった！");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "callNativeUIWithTitle:andContent:", 
                                                       "決済完了", 
                                                       "残りセーブ回数が"+life+"になった！");
                    }
                },
                onFailure : function (product, msg) {
                    // hide indicator
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "progressDismiss",
                                                        "()V");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "indicatorDismiss");
                    }

                    //Purchase failed
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "showAlertDialog", 
                                                        "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                       "決済失敗",
                                                       "決済に失敗しました。\n回線状況を確認し、もう一度お試しください。");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "callNativeUIWithTitle:andContent:", 
                                                       "決済失敗",
                                                       "決済に失敗しました。\n回線状況を確認し、もう一度お試しください。");
                    }
                    //msg is the error message
                    cc.log("purchase failure. productID: " + product.id + ", error: " + msg);
                },
                onCanceled : function (product) {
                    // hide indicator
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "progressDismiss", 
                                                        "()V");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "indicatorDismiss"); 
                    }

                    //Purchase was canceled by user
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "showAlertDialog", 
                                                        "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                       "決済キャンセル", 
                                                       "決済をキャンセルしました。");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "callNativeUIWithTitle:andContent:", 
                                                       "決済キャンセル", 
                                                       "決済をキャンセルしました。");
                    }
                    cc.log("processing is canceled by user.")
                }
            });

            // SDKBOX AdColony handler
            sdkbox.PluginAdColony.setListener({
                onAdColonyReward : function (data, currencyName, amount, success) {
                    // Called when AdColony v4vc ad finish playing
                    cc.log("Reward are received. ZoneID:"+data.zoneID+", AdName:"+data.name+", Currency:"+currencyName+", amount:"+amount+", success:"+success);
                    if(success){
                        life = 1;
                        // save
                        obj.others.life = life;
                        str = JSON.stringify(obj);
                        cc.sys.localStorage.setItem("userData",str);
                        cc.log("update data");

                        if(cc.sys.os == cc.sys.OS_ANDROID){
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                            "showAlertDialog", 
                                                            "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                           "成果通知",
                                                           "残りセーブ回数が"+life+"になった！");
                        } else if(cc.sys.os == cc.sys.OS_IOS){
                            jsb.reflection.callStaticMethod("NativeOcClass", 
                                                           "callNativeUIWithTitle:andContent:", 
                                                           "成果通知",
                                                           "残りセーブ回数が"+life+"になった！");
                        }
                    }
                },
                onAdColonyStarted : function (data) {
                    // Called when ad starts playing
                    cc.log("AdColony start playing ad.");
                    // hide indicator
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "progressDismiss", 
                                                        "()V");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "indicatorDismiss"); 
                    }
                },
                onAdColonyFinished : function (data) {
                    // Called when an ad finish displaying
                    cc.log("AdColony finish playing ad.");
                    // hide indicator
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "progressDismiss", 
                                                        "()V");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "indicatorDismiss"); 
                    }
                }
            });

            // SDKBOX Vungle handler
            sdkbox.PluginVungle.setListener({
                onVungleStarted : function() {
                    cc.log("onVungleStarted");
                    // hide indicator
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "progressDismiss", 
                                                        "()V");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "indicatorDismiss"); 
                    }
                },
                onVungleFinished : function() {
                    cc.log("onVungleFinished");
                    // hide indicator
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "progressDismiss", 
                                                        "()V");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "indicatorDismiss"); 
                    }
                },
                onVungleAdViewed : function(isComplete) {
                    cc.log("onVungleAdViewed" + isComplete);
                    if(isComplete){
                        life = 1;
                        // save
                        obj.others.life = life;
                        str = JSON.stringify(obj);
                        cc.sys.localStorage.setItem("userData",str);
                        cc.log("update data");

                        if(cc.sys.os == cc.sys.OS_ANDROID){
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                            "showAlertDialog", 
                                                            "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                           "成果通知",
                                                           "残りセーブ回数が"+life+"になった！");
                        } else if(cc.sys.os == cc.sys.OS_IOS){
                            jsb.reflection.callStaticMethod("NativeOcClass", 
                                                           "callNativeUIWithTitle:andContent:", 
                                                           "成果通知",
                                                           "残りセーブ回数が"+life+"になった！");
                        }
                    }
                }
            });

        }
    },
    cancel:function(){
        this.unschedule(this.cancel);
        this.unschedule(this.cancel);
        if(this.getChildByTag(30)){
            this.removeChildByTag(30);
            this.removeChildByTag(40);
            this.getChildByTag(50).setEnabled(true);
        }
    },
    purchase1:function(){
        // disable shopmenu
        this.shop.getChildByTag(70).setEnabled(false);
        // show loading
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "progressShow", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "indicatorShow");
        }
        sdkbox.IAP.purchase("save3times");

        this.schedule(this.cancel, 1.5);
    },
    purchase2:function(){
        // disable shopmenu
        this.shop.getChildByTag(70).setEnabled(false);
        // show loading
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "progressShow", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "indicatorShow"); 
        }
        sdkbox.IAP.purchase("save8times");

        this.schedule(this.cancel, 1.5);
    },
    movie:function(){
        // disable shopmenu
        this.shop.getChildByTag(70).setEnabled(false);
        // SDK for MovieAd
        cc.log("adcolony show");

        // show loading
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "progressShow", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "indicatorShow");
        }

        // check -> show
        if(cc.sys.os == cc.sys.OS_ANDROID){
            var c = sdkbox.PluginAdColony.zoneStatusForZone("vzac88160f2b2d4237b4");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            var c = sdkbox.PluginAdColony.zoneStatusForZone("vz4ea9ffe6705549ab89");
        }
        cc.log("status:"+c);

        switch(c){
            case 5:
                cc.log("show");
                sdkbox.PluginAdColony.show("v4vc");
                break;
            default:
                cc.log("adcolony show error.");
                var v = sdkbox.PluginVungle.isCacheAvailable();
                cc.log("Vungle status:"+v);
                
                // for hack of bug of Vungle.
                if(cc.sys.os == cc.sys.OS_ANDROID){
                    v = true;
                }

                // check -> show Vungle.
                if(v){
                    sdkbox.PluginVungle.show("reward");
                } else {
                    // hide loading
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "progressDismiss", 
                                                        "()V");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "indicatorDismiss");
                    }

                    // alert
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "showAlertDialog", 
                                                        "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                       "通信エラー",
                                                       "動画の取得に失敗しました。もう一度お試しください。");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "callNativeUIWithTitle:andContent:", 
                                                       "通信エラー",
                                                       "動画の取得に失敗しました。もう一度お試しください。");
                    }
                }                
                break;
        }

        this.schedule(this.cancel, 1.5);
    },
    save:function(){
        // disabled buttons.
        this.getChildByTag(50).setEnabled(false);
        // game record
        savedTimePassing = this.getParent().getRecord();
        life--;

        // write
        obj.others.savedTimePassing = savedTimePassing;
        obj.others.life = life;
        str = JSON.stringify(obj);
        cc.sys.localStorage.setItem("userData",str);
        cc.log("update:"+JSON.stringify(obj.others));

        // feedback-effect
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "showAlertDialog", 
                                            "(Ljava/lang/String;Ljava/lang/String;)V", 
                                           "セーブ完了", 
                                           "あと 50 Step\n残り"+savedTimePassing+" Sec.");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "callNativeUIWithTitle:andContent:", 
                                           "セーブ完了", 
                                           "あと 50 Step\n残り"+savedTimePassing+" Sec.");
        }

        this.schedule(this.nosave,2.0);
    },
    nosave:function(){
        this.unschedule(this.nosave);
        // hide loading　(developing: AdColony showのエラーハンドリングできたら削除する)
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "progressDismiss", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "indicatorDismiss");
        }

        this.getParent().addChild(new EscoreLayer(), 5, TagOfLayer.Escore);
        this.getParent().getChildByTag(TagOfLayer.Estatus).removeFromParent();
        this.removeFromParent();
    },
    tutorial:function(){
        pageView = new ccui.PageView();
        pageView.setTouchEnabled(true);
        pageView.setContentSize(cc.size(640,960));
        pageView.setAnchorPoint(cc.p(0.5,0.5));
        pageView.setCustomScrollThreshold(w/5);
        pageView.x = w/2;
        pageView.y = h/2;

        for (var i = 0; i < 4; i++){
            var layout = new ccui.Layout();

            var imageView = new ccui.ImageView();
            imageView.loadTexture("res/aboutSave"+(i+1)+".png");
            imageView.x = w/2;
            imageView.y = h/2;
            layout.addChild(imageView);

            pageView.addPage(layout);
        }

        pageView.addEventListener(this.pageViewEvent, this);
        this.getParent().addChild(pageView,100,600);
    },
    pageViewEvent: function(sender, type){
        switch(type){
            case ccui.PageView.EVENT_TURNING:
                if(sender.getCurPageIndex() == 3){
                    this.getParent().removeChildByTag(600);
                    didReadSave = 1;
                }

                cc.log("Page: " + sender.getCurPageIndex());
                break;
            default:
                cc.log("pageView other case");
                break;
        }
    }
});