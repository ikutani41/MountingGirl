var ShoppingLayer = cc.Layer.extend({
    loadingTime:0,
    labelLife:null,
    labelPoint:null,
    tutorialId:null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        var BG = new cc.Sprite(res.shoppingBG_png);
        BG.setPosition(centerpos);
        this.addChild(BG);

        cc.log("IAP status:"+isInitiationIAP);

        // display life and point
        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelLife = new cc.LabelTTF("Life." + life, "res/font/logotypejp_mp_b_1.ttf", 40);
            this.labelPoint = new cc.LabelTTF("Point." + point, "res/font/logotypejp_mp_b_1.ttf", 40);
        } else {
            this.labelLife = new cc.LabelTTF("Life." + life, "Corporate-Logo-Bold", 40);
            this.labelPoint = new cc.LabelTTF("Point." + point, "Corporate-Logo-Bold", 40);
        }
        this.labelLife.setColor(cc.color(0,0,0));//black color
        this.labelLife.setPosition(cc.p(w*2/16, h*12/16));
        this.labelPoint.setColor(cc.color(0,0,0));//black color
        this.labelPoint.setPosition(cc.p(w*7/16, h*12/16));
        this.addChild(this.labelLife);
        this.addChild(this.labelPoint);

        // SDKBOX IAP handler
        sdkbox.IAP.setListener({
            onProductRequestSuccess : function (products) {
                //Returns you the data for all the iap products
                //You can get each item using following method
                var msgStr = "list: [";
                for (var i = 0; i < products.length; i++) {
                    msgStr += products[i].id + "(" + products[i].name + "), ";
                }
                msgStr += "]";
                cc.log(msgStr);

                isInitiationIAP = 2;
                cc.log("IAP init:done.");
            },
            onProductRequestFailure : function (msg) {
                //When product refresh request fails.
                isInitiationIAP = 0;
                var msgStr = "request error";
                cc.log(msgStr+" : "+msg);
            },
            onSuccess : function (product) {
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
                        life += 3;
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
                        break;
                    case "com.yij.mountinggirl_2":
                        life += 8;
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
                        break;
                    case "com.yij.mountinggirl_3":
                        // remove Ad
                        if(cc.sys.os == cc.sys.OS_ANDROID){
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                            "hideAdView", 
                                                            "()V");
                        } else if(cc.sys.os == cc.sys.OS_IOS){
                            jsb.reflection.callStaticMethod("NativeOcClass", 
                                                           "disableBannerAd"); 
                        }

                        // change status.
                        removeBannerAd = 1;

                        if(cc.sys.os == cc.sys.OS_ANDROID){
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                            "showAlertDialog", 
                                                            "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                            "決済完了",
                                                            "画面下のバナー広告が表示されなくなりました！");
                        } else if(cc.sys.os == cc.sys.OS_IOS){
                            jsb.reflection.callStaticMethod("NativeOcClass", 
                                                           "callNativeUIWithTitle:andContent:", 
                                                           "決済完了", 
                                                           "画面下のバナー広告が表示されなくなりました！");
                        }

                        cc.log('done');
                        break;
                    case "com.yij.mountinggirl_4":

                        // change status.
                        premiumPhrase = 1;

                        if(cc.sys.os == cc.sys.OS_ANDROID){
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                            "showAlertDialog", 
                                                            "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                            "決済完了",
                                                            "新しいセリフが20個追加されました！");
                        } else if(cc.sys.os == cc.sys.OS_IOS){
                            jsb.reflection.callStaticMethod("NativeOcClass", 
                                                           "callNativeUIWithTitle:andContent:", 
                                                           "決済完了", 
                                                           "新しいセリフが20個追加されました！");
                        }

                        break;
                    case "com.yij.mountinggirl_5":

                        // change status.
                        premiumFunction = 1;

                        if(cc.sys.os == cc.sys.OS_ANDROID){
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                            "showAlertDialog", 
                                                            "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                            "決済完了",
                                                            "プレミアム機能が解放されました！");
                        } else if(cc.sys.os == cc.sys.OS_IOS){
                            jsb.reflection.callStaticMethod("NativeOcClass", 
                                                           "callNativeUIWithTitle:andContent:", 
                                                           "決済完了", 
                                                           "プレミアム機能が解放されました！");
                        }
                    default:
                        cc.log("Purchase Success with errors. productID:"+product.id)
                        break;
                }

                // save
                obj.others.life = life;
                obj.power.removeBannerAd = removeBannerAd;
                obj.power.premiumPhrase = premiumPhrase;
                obj.power.premiumFunction = premiumFunction;
                str = JSON.stringify(obj);
                cc.sys.localStorage.setItem("userData",str);
                cc.log("update data");

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
            },
            onRestored : function (product) {
                switch(product.id){
                    case "com.yij.mountinggirl_3":
                        removeBannerAd = 1;
                        break;
                    case "com.yij.mountinggirl_4":
                        premiumPhrase = 1;
                        break;
                    case "com.yij.mountinggirl_5":
                        premiumFunction = 1;
                        break;
                    default:
                        cc.log("odd restore");
                        break;
                }
                cc.log("product id:"+product.id);
            },
            onRestoreComplete : function (ok,msg){
                cc.log("restore complete");
                // hide indicator
                if(cc.sys.os == cc.sys.OS_ANDROID){
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                    "progressDismiss", 
                                                    "()V");
                } else if(cc.sys.os == cc.sys.OS_IOS){
                    jsb.reflection.callStaticMethod("NativeOcClass", 
                                                   "indicatorDismiss"); 
                }
                
                var msg = "";
                if(removeBannerAd == 0 && premiumPhrase == 0 && premiumFunction == 0){
                    msg += "リストアするものはありませんでした。";
                } else {
                    if(removeBannerAd == 1){
                        msg += "バナー広告排除をリストアしました。\n";
                    }
                    if(premiumPhrase == 1){
                        msg += "セリフ追加分をリストアしました。\n";
                    }
                    if(premiumFunction == 1){
                        msg += "プレミアム機能をリストアしました。\n";
                    }
                }

                // Complete message
                if(cc.sys.os == cc.sys.OS_ANDROID){
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                    "showAlertDialog", 
                                                    "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                   "リストア完了", 
                                                   msg);
                } else if(cc.sys.os == cc.sys.OS_IOS){
                    jsb.reflection.callStaticMethod("NativeOcClass", 
                                                   "callNativeUIWithTitle:andContent:", 
                                                   "リストア完了", 
                                                   msg);
                }

                // save
                obj.power.removeBannerAd = removeBannerAd;
                obj.power.premiumPhrase = premiumPhrase;
                obj.power.premiumFunction = premiumFunction;
                str = JSON.stringify(obj);
                cc.sys.localStorage.setItem("userData",str);
                cc.log("update data");

                cc.log("removeAd:"+removeBannerAd);
                
                // remove Ad
                if(removeBannerAd == 1){
                    if(cc.sys.os == cc.sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                        "hideAdView", 
                                                        "()V");
                    } else if(cc.sys.os == cc.sys.OS_IOS){
                        jsb.reflection.callStaticMethod("NativeOcClass", 
                                                       "disableBannerAd"); 
                    }
                }
            }
        });

        // SDKBOX AdColony handler
        sdkbox.PluginAdColony.setListener({
            onAdColonyReward : function (data, currencyName, amount, success) {
                // Called when AdColony v4vc ad finish playing
                cc.log("Reward are received. ZoneID:"+data.zoneID+", AdName:"+data.name+", Currency:"+currencyName+", amount:"+amount+", success:"+success);
                if(success){
                    life += 1;

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
                // hide indicator
                if(cc.sys.os == cc.sys.OS_ANDROID){
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                    "progressDismiss", 
                                                    "()V");
                } else if(cc.sys.os == cc.sys.OS_IOS){
                    jsb.reflection.callStaticMethod("NativeOcClass", 
                                                   "indicatorDismiss"); 
                }

                cc.log("AdColony start playing ad.");
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
                    life += 1;

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

        var loading = new cc.Sprite(res.loading_png);
        loading.setPosition(centerpos);
        this.addChild(loading,0,450);

        if(isInitiationIAP < 2){
            sdkbox.IAP.init();
            cc.log("init");
        } else {
            sdkbox.IAP.refresh();
            cc.log("refresh");
        }
        isInitiationIAP = 1;    // under processing
        this.scheduleUpdate();

        // navi btn
        var backBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.BackBtn_png), // normal state image
            new cc.Sprite(res.BackBtn_s_png), //select state image
            new cc.Sprite(res.BackBtn_s_png), //disabled state image
            this.back, this);

        var tutorialBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.TutorialBtn_png), // normal state image
            new cc.Sprite(res.TutorialBtn_s_png), //select state image
            new cc.Sprite(res.TutorialBtn_s_png), //disabled state image
            this.tutorialNavi, this);

        var naviMenu = new cc.Menu(backBtn,tutorialBtn);
        naviMenu.setPosition(cc.p(w/2,h*0.10));
        naviMenu.alignItemsHorizontallyWithPadding(30);
        
        this.addChild(naviMenu);
    },
    update:function(dt){
        if(isInitiationIAP == 2){

            isInitiationIAP++;

            // remove loading
            this.removeChildByTag(450);

            // items
            var purchaseMenu1 = new cc.MenuItemSprite(
                new cc.Sprite(res.item1_png), // normal state image
                new cc.Sprite(res.item1_png), //select state image
                new cc.Sprite(res.item1_png), //disabled state image
                this.noeffect, this);
            purchaseMenu1.setEnabled(false);

            var purchaseMenu2 = new cc.MenuItemSprite(
                new cc.Sprite(res.item2_png), // normal state image
                new cc.Sprite(res.item2_png), //select state image
                new cc.Sprite(res.item2_png), //disabled state image
                this.noeffect, this);
            purchaseMenu2.setEnabled(false);

            var purchaseMenu3 = new cc.MenuItemSprite(
                new cc.Sprite(res.item3_png), // normal state image
                new cc.Sprite(res.item3_png), //select state image
                new cc.Sprite(res.item3_png), //disabled state image
                this.noeffect, this);
            purchaseMenu3.setEnabled(false);

            var purchaseMenu4 = new cc.MenuItemSprite(
                new cc.Sprite(res.item4_png), // normal state image
                new cc.Sprite(res.item4_png), //select state image
                new cc.Sprite(res.item4_png), //disabled state image
                this.noeffect, this);
            purchaseMenu4.setEnabled(false);

            var purchaseMenu5 = new cc.MenuItemSprite(
                new cc.Sprite(res.item5_png), // normal state image
                new cc.Sprite(res.item5_png), //select state image
                new cc.Sprite(res.item5_png), //disabled state image
                this.noeffect, this);
            purchaseMenu5.setEnabled(false);

            var purchaseMenu6 = new cc.MenuItemSprite(
                new cc.Sprite(res.item6_png), // normal state image
                new cc.Sprite(res.item6_png), //select state image
                new cc.Sprite(res.item6_png), //disabled state image
                this.noeffect, this);
            purchaseMenu6.setEnabled(false);

            var shopMenu = new cc.Menu(purchaseMenu1,purchaseMenu2,purchaseMenu3,purchaseMenu4,purchaseMenu5,purchaseMenu6);
            shopMenu.setPosition(w*0.3,h*0.45);
            shopMenu.alignItemsVerticallyWithPadding(15);
            this.addChild(shopMenu,0,70);

            // purchase by money
            var purchase1Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.price1_png), // normal state image
                new cc.Sprite(res.price1_s_png), //select state image
                new cc.Sprite(res.price1_s_png), //disabled state image
                this.purchase1, this);

            var purchase2Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.price2_png), // normal state image
                new cc.Sprite(res.price2_s_png), //select state image
                new cc.Sprite(res.price2_s_png), //disabled state image
                this.purchase2, this);

            var purchase3Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.price3_png), // normal state image
                new cc.Sprite(res.price3_s_png), //select state image
                new cc.Sprite(res.price3_s_png), //disabled state image
                this.purchase3, this);

            var purchase4Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.price4_png), // normal state image
                new cc.Sprite(res.price4_s_png), //select state image
                new cc.Sprite(res.price4_s_png), //disabled state image
                this.purchase4, this);

            var purchase5Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.price5_png), // normal state image
                new cc.Sprite(res.price5_s_png), //select state image
                new cc.Sprite(res.price5_s_png), //disabled state image
                this.purchase5, this);

            var purchase6Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.price6_png), // normal state image
                new cc.Sprite(res.price6_s_png), //select state image
                new cc.Sprite(res.price6_s_png), //disabled state image
                this.purchase6, this);

            var shopPrice = new cc.Menu(purchase1Btn,purchase2Btn,purchase3Btn,purchase4Btn,purchase5Btn,purchase6Btn);
            shopPrice.setPosition(w*5/8,h*0.45);
            shopPrice.alignItemsVerticallyWithPadding(15);
            this.addChild(shopPrice,0,70);

            // purchase by point
            var point1Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.point1_png), // normal state image
                new cc.Sprite(res.point1_s_png), //select state image
                new cc.Sprite(res.point1_s_png), //disabled state image
                this.point1, this);

            var point2Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.point2_png), // normal state image
                new cc.Sprite(res.point2_s_png), //select state image
                new cc.Sprite(res.point2_s_png), //disabled state image
                this.point2, this);

            var point3Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.point3_png), // normal state image
                new cc.Sprite(res.point3_s_png), //select state image
                new cc.Sprite(res.point3_s_png), //disabled state image
                this.point3, this);

            var point4Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.point4_png), // normal state image
                new cc.Sprite(res.point4_s_png), //select state image
                new cc.Sprite(res.point4_s_png), //disabled state image
                this.point4, this);

            var point5Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.point5_png), // normal state image
                new cc.Sprite(res.point5_s_png), //select state image
                new cc.Sprite(res.point5_s_png), //disabled state image
                this.point5, this);

            var point6Btn = new cc.MenuItemSprite(
                new cc.Sprite(res.point6_png), // normal state image
                new cc.Sprite(res.point6_s_png), //select state image
                new cc.Sprite(res.point6_s_png), //disabled state image
                this.point6, this);

            var shopPoint = new cc.Menu(point1Btn,point2Btn,point3Btn,point4Btn,point5Btn,point6Btn);
            shopPoint.setPosition(w*7/8,h*0.45);
            shopPoint.alignItemsVerticallyWithPadding(15);
            this.addChild(shopPoint,0,70);

        }

        if(this.labelLife){
            this.labelLife.setString("Life."+life);
        }
    },
    refresh:function(){
        this.removeChildByTag(70);
        var loading = new cc.Sprite(res.loading_png);
        loading.setPosition(centerpos);
        this.addChild(loading,0,450);

        sdkbox.IAP.refresh();
        isInitiationIAP = 1;    // under processing
        this.scheduleUpdate();

    },
    noeffect:function(){
        return false;
    },
    purchase1:function(){
        // disable shopmenu (control double-tap)
        this.getChildByTag(70).setEnabled(false);

        // show loading
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "progressShow", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "indicatorShow");
        }
        sdkbox.IAP.purchase("remove_banner");
        this.refresh();

    },
    purchase2:function(){
        // disable shopmenu (control double-tap)
        this.getChildByTag(70).setEnabled(false);
        // show loading
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "progressShow", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "indicatorShow"); 
        }
        sdkbox.IAP.purchase("premium_function");
        this.refresh();

    },
    purchase3:function(){
        // alert
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "showAlertDialog", 
                                            "(Ljava/lang/String;Ljava/lang/String;)V", 
                                           "準備中です",
                                           "近々リリースします！お楽しみに。");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "callNativeUIWithTitle:andContent:", 
                                           "準備中です",
                                           "近々リリースします！お楽しみに。");
        }

/*
        // disable shopmenu (control double-tap)
        this.getChildByTag(70).setEnabled(false);

        // show loading
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "progressShow", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "indicatorShow"); 
        }
        sdkbox.IAP.purchase("premium_phrase");
*/
        this.refresh();

    },
    purchase4:function(){
        // disable shopmenu (control double-tap)
        this.getChildByTag(70).setEnabled(false);

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
        this.refresh();

    },
    purchase5:function(){
        // disable shopmenu (control double-tap)
        this.getChildByTag(70).setEnabled(false);

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
        this.refresh();

    },
    purchase6:function(){
        // disable shopmenu (control double-tap)
        this.getChildByTag(70).setEnabled(false);

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
            case 3:
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
        this.refresh();
    },
    point1:function(){
        // 40P for removeBannerAd
        if(point < 40){
            // alert
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            }
        } else {
            // change status.
            removeBannerAd = 1;
            point -= 40;

            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                "決済完了",
                                                "画面下のバナー広告が表示されなくなりました！");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "決済完了", 
                                               "画面下のバナー広告が表示されなくなりました！");
            }

            // save
            obj.others.life = life;
            obj.power.point = point;
            obj.power.removeBannerAd = removeBannerAd;
            obj.power.premiumPhrase = premiumPhrase;
            obj.power.premiumFunction = premiumFunction;
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);
            cc.log("update data");

            // remove Ad
            if(removeBannerAd == 1){
                if(cc.sys.os == cc.sys.OS_ANDROID){
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                    "hideAdView", 
                                                    "()V");
                } else if(cc.sys.os == cc.sys.OS_IOS){
                    jsb.reflection.callStaticMethod("NativeOcClass", 
                                                   "disableBannerAd"); 
                }
            }

            // update
            this.labelPoint.setString("Point."+point);
        }
    },
    point2:function(){
        // 15P for Premium Func
        if(point < 15){
            // alert
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            }
        } else {
            // change status.
            premiumFunction = 1;
            point -= 15;

            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                "決済完了",
                                                "プレミアム機能が解放されました！");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "決済完了", 
                                               "プレミアム機能が解放されました！");
            }

            // save
            obj.others.life = life;
            obj.power.point = point;
            obj.power.removeBannerAd = removeBannerAd;
            obj.power.premiumPhrase = premiumPhrase;
            obj.power.premiumFunction = premiumFunction;
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);
            cc.log("update data");

            // update
            this.labelPoint.setString("Point."+point);
        }
    },
    point3:function(){
        // alert
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "showAlertDialog", 
                                            "(Ljava/lang/String;Ljava/lang/String;)V", 
                                           "準備中です",
                                           "近々リリースします！お楽しみに。");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "callNativeUIWithTitle:andContent:", 
                                           "準備中です",
                                           "近々リリースします！お楽しみに。");
        }

/*
        // 15P for Premium Phrase
        if(point < 15){
            // alert
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            }
        } else {
            // change status.
            premiumPhrase = 1;
            point -= 15;

            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                "決済完了",
                                                "新しいセリフが20個追加されました！");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "決済完了", 
                                               "新しいセリフが20個追加されました！");
            }

            // save
            obj.others.life = life;
            obj.power.point = point;
            obj.power.removeBannerAd = removeBannerAd;
            obj.power.premiumPhrase = premiumPhrase;
            obj.power.premiumFunction = premiumFunction;
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);
            cc.log("update data");

            // update
            this.labelPoint.setString("Point."+point);
        }
*/
    },
    point4:function(){
        // 5P for Life 3
        if(point < 5){
            // alert
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            }
        } else {
            life += 3;
            point -= 5;

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

            // save
            obj.others.life = life;
            obj.power.point = point;
            obj.power.removeBannerAd = removeBannerAd;
            obj.power.premiumPhrase = premiumPhrase;
            obj.power.premiumFunction = premiumFunction;
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);
            cc.log("update data");

            // update
            this.labelLife.setString("Life."+life);
            this.labelPoint.setString("Point."+point);
        }
    },
    point5:function(){
        // 10P for Life 8
        if(point < 10){
            // alert
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            }
        } else {
            life += 8;
            point -= 10;
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

            // save
            obj.others.life = life;
            obj.power.point = point;
            obj.power.removeBannerAd = removeBannerAd;
            obj.power.premiumPhrase = premiumPhrase;
            obj.power.premiumFunction = premiumFunction;
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);
            cc.log("update data");

            // update
            this.labelLife.setString("Life."+life);
            this.labelPoint.setString("Point."+point);
        }

    },
    point6:function(){
        // 2P for Life 1
        if(point < 2){
            // alert
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "購入エラー",
                                               "ポイントが足りません！ログインボーナスで稼いでね。");
            }
        } else {
            life += 1;
            point -= 2;
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

            // save
            obj.others.life = life;
            obj.power.point = point;
            obj.power.removeBannerAd = removeBannerAd;
            obj.power.premiumPhrase = premiumPhrase;
            obj.power.premiumFunction = premiumFunction;
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);
            cc.log("update data");

            // update
            this.labelLife.setString("Life."+life);
            this.labelPoint.setString("Point."+point);
        }

    },
    back:function(){
        var layer = new OtherLayer();
        this.getParent().addChild(layer);
        this.removeFromParent();        
    },
    tutorialNavi:function(){

        var cover = new cc.Sprite(res.Cover_png);
        cover.setPosition(centerpos);
        cover.setOpacity(150);

        this.shop = new cc.Sprite(res.TutorialNaviBG_png);
        this.shop.setPosition(centerpos);

        this.addChild(cover,100,30);
        this.addChild(this.shop,100,40);

        var prologueBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.PrologueBtn_png), // normal state image
            new cc.Sprite(res.PrologueBtn_s_png), //select state image
            new cc.Sprite(res.PrologueBtn_s_png), //disabled state image
            this.prologue, this);

        var aboutSaveBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.AboutSaveBtn_png), // normal state image
            new cc.Sprite(res.AboutSaveBtn_s_png), //select state image
            new cc.Sprite(res.AboutSaveBtn_s_png), //disabled state image
            this.aboutSave, this);

        var restoreBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.restoreBtn_png), // normal state image
            new cc.Sprite(res.restoreBtn_s_png), //select state image
            new cc.Sprite(res.restoreBtn_s_png), //disabled state image
            this.restore, this);

        var cancelBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.CancelBtn_png), // normal state image
            new cc.Sprite(res.CacnelBtn_s_png), //select state image
            new cc.Sprite(res.CancelBtn_s_png), //disabled state image
            this.cancel, this);

        var shopMenu = new cc.Menu(prologueBtn,aboutSaveBtn,restoreBtn,cancelBtn);

        shopMenu.setPosition(cc.p(this.shop.width/2,this.shop.height*0.4));
        shopMenu.alignItemsVerticallyWithPadding(70);
        this.shop.addChild(shopMenu,0,102);

    },
    prologue:function(){
        this.tutorial(1);
    },
    aboutSave:function(){
        this.tutorial(2);
    },
    restore:function(){
        // disable shopmenu (control double-tap)
        this.getChildByTag(40).getChildByTag(102).setEnabled(false);

        // show loading
        if(cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                            "progressShow", 
                                            "()V");
        } else if(cc.sys.os == cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "indicatorShow"); 
        }

        sdkbox.IAP.restore();
        this.refresh();
        cc.log("restore");
        this.cancel();
    },
    tutorial:function(id){
        this.tutorialId = id;
        pageView = new ccui.PageView();
        pageView.setTouchEnabled(true);
        pageView.setContentSize(cc.size(640,960));
        pageView.setAnchorPoint(cc.p(0.5,0.5));
        pageView.setCustomScrollThreshold(w/5);
        pageView.x = w/2;
        pageView.y = h/2;

        for (var i = 0; i < 5; i++){
            var layout = new ccui.Layout();

            var imageView = new ccui.ImageView();
            switch(id){
                case 1:
                    imageView.loadTexture("res/Tutorial"+(i+1)+".png");
                    break;
                case 2:
                    imageView.loadTexture("res/aboutSave"+(i+1)+".png");
                    break;
                default:
                    cc.log("undefined tutorial id");
                    break;
            }
            imageView.x = w/2;
            imageView.y = h/2;
            layout.addChild(imageView);

            pageView.addPage(layout);
        }

        pageView.addEventListener(this.pageViewEvent, this);
        this.addChild(pageView,100,600);
        this.cancel();
    },
    pageViewEvent: function(sender, type){
        switch(type){
            case ccui.PageView.EVENT_TURNING:
                if((this.tutorialId == 1 && sender.getCurPageIndex() == 4)||(this.tutorialId == 2 && sender.getCurPageIndex() == 3)){
                    this.removeChildByTag(600);
                }

                cc.log("Page: " + sender.getCurPageIndex());
                break;
            default:
                cc.log("pageView other case");
                break;
        }
    },
    cancel:function(){
        if(this.getChildByTag(30)){
            this.removeChildByTag(30);
            this.removeChildByTag(40);
        }
    }
});