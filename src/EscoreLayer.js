var EscoreLayer = cc.Layer.extend({
    _array:[],

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        //2. create a background image and set it's position at the center of the screen
        var bgImg = new cc.Sprite(res.RankingBG_png);
        bgImg.setPosition(cc.p(w/2, h/2));
        this.addChild(bgImg);

        this._array = [];
        for (var i = 0; i < 5; ++i) {
            this._array.push((i+1)+"　：　"+scores[i][1].toFixed(2)+" Sec.");
        }

        // Create the list view
        var listView = new ccui.ListView();
        // set list view ex direction
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setTouchEnabled(true);
        listView.setBounceEnabled(false);
        listView.setContentSize(cc.size(w,h-350));    //あとで変える
        listView.x = 0;
        listView.y = 100;
        listView.addEventListener(this.selectedItemEvent, this);
        this.addChild(listView);

        // create model
        var default_button = new ccui.Button();
        default_button.setName("TextButton");
        default_button.setTouchEnabled(true);
        default_button.loadTextures(res.CollectionItemBtn_png,res.CollectionItemBtn_s_png,res.CollectionItemBtn_s_png);

        var default_item = new ccui.Layout();
        default_item.setTouchEnabled(true);
        default_item.setContentSize(default_button.getContentSize());
        default_item.width = listView.width;
        default_item.height = default_button.height;
        default_button.x = default_item.width / 2;
        default_button.y = default_item.height / 2;
        default_item.addChild(default_button);

        // set model
        listView.setItemModel(default_item);
        listView.setItemsMargin(default_button.height / 2)

        // add default item
        var count = this._array.length;

        for (var i = 0; i < count; i++) {
            listView.pushBackDefaultItem();
        }
        var items = listView.getItems();
        var items_count = items.length;

        // set item data
        for (var i = 0; i < items_count; i++) {
            var item = listView.getItem(i);
            var button = item.getChildByName("TextButton");
            var index = listView.getIndex(item);
            button.setTitleText(this._array[index]);
            button.setTitleFontSize(32);
            button.setTitleFontName("cinecaption");

            // disabled
            if(scores[i][0] != "user"){
                button.setTouchEnabled(true);
            } else {
                button.setTouchEnabled(false);
                button.setBright(false);
            }
        }

        // set all items layout gravity
        listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);

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
        shareMenu.setPosition(cc.p(w*7/8, h*15/16));
        shareMenu.alignItemsHorizontallyWithPadding(20);

        this.addChild(resultMenu);
        this.addChild(shareMenu);

        this.scheduleUpdate();
        this.schedule(this.alert,0.5);
    },
    alert: function(){
        this.unschedule(this.alert);
        this.unscheduleUpdate();

        var rank = this.getParent().getRank();
        if(rank != null && rank != 100){
            // popup
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                               "ランクイン！", 
                                               "ランキング"+rank+"位の記録を塗り替えました！\nTwitterで運営チーム@MountingGirlに教えてね。");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "ランクイン！", 
                                               "ランキング"+rank+"位の記録を塗り替えました！\nTwitterで運営チーム@MountingGirlに教えてね。");
            }
        }
    },
    selectedItemEvent: function (sender, type) {
        switch (type) {
            case ccui.ListView.ON_SELECTED_ITEM_END:

                var listViewEx = sender;
                var num = listViewEx.getCurSelectedIndex();
                cc.log("select child index = " + listViewEx.getCurSelectedIndex());
                if(scores[num][0] == "user"){
                    cc.log("blocked");
                    return false;
                }

                // popup
                if(cc.sys.os == cc.sys.OS_ANDROID){
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                    "showAlertDialog", 
                                                    "(Ljava/lang/String;Ljava/lang/String;)V", 
                                                   "運営チームスコア", 
                                                   scores[num][0]+"\nBest score : "+scores[num][1].toFixed(2));
                } else if(cc.sys.os == cc.sys.OS_IOS){
                    jsb.reflection.callStaticMethod("NativeOcClass", 
                                                   "callNativeUIWithTitle:andContent:", 
                                                   "運営チームスコア", 
                                                   scores[num][0]+"\nBest score : "+scores[num][1].toFixed(2));
                }

                break;

            default:
                break;
        }
    },
    home:function (){
        cc.director.runScene(new MenuScene());
    },
    retry:function (){
        cc.director.runScene(new EndlessScene());
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