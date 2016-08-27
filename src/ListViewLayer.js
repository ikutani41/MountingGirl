var ListViewLayer = cc.Layer.extend({
    _array:[],
    level:0,    // lv of the girl displayed 
//    tag:300,
    labelLv:null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        //2. create a background image and set it's position at the center of the screen
        var bgImg = new cc.Sprite(res.CollectionBG_png);
        bgImg.setPosition(cc.p(w/2, h/2));
        this.addChild(bgImg);

        this.loadImages(currentGirl);

        // lv
        switch(cc.sys.os){
            case cc.sys.OS_ANDROID:
                this.labelLv = new cc.LabelTTF("Lv." + currentGirl, "res/font/logotypejp_mp_b_1.ttf", 65,cc.TEXT_ALIGNMENT_LEFT);
                break;
            default:
                this.labelLv = new cc.LabelTTF("Lv." + currentGirl, "Corporate-Logo-Bold", 65,cc.TEXT_ALIGNMENT_LEFT);
                break;
        }
        this.labelLv.setColor(cc.color(255,255,0));//yellow color
        this.labelLv.setPosition(cc.p(w/2, h*0.72));
        this.addChild(this.labelLv);

        // List
        this._array = [];
        var len;
        len = phrase[currentGirl-1].length;
        this.level = currentGirl;

        for (var i = 0; i < len; ++i) {
            var str = phrase[currentGirl-1][i][0].substr(0,10);
            this._array.push("No." + (i+1)+"　"+str);                
        }
//        cc.log("array:"+this._array);
//        cc.log("level:"+this.level);
//        cc.log("current:"+currentGirl);

        // Create the list view
        var listView = new ccui.ListView();
        // set list view ex direction
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setTouchEnabled(true);
        listView.setBounceEnabled(true);
        listView.setContentSize(cc.size(w,265));    //あとで変える
        listView.x = 0;
        listView.y = 150;
        listView.addEventListener(this.selectedItemEvent, this);
        this.addChild(listView,0,300);


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
        listView.setItemsMargin(default_button.height / 4)

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
            var index = listView.getIndex(item);    // セリフIDと連動させる必要あり
            button.setTitleText(this._array[index]);
            button.setTitleFontSize(32);
            button.setTitleFontName("cinecaption");

            // disabled
            if(clearLvTable[this.level-1][i] != 0){
                button.setTouchEnabled(true);
            } else {
                button.setTouchEnabled(false);
                button.setBright(false);
                button.setTitleColor(cc.color(0,0,0));  // black-color
            }
        }

        // set all items layout gravity
        listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);

        var homeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.HomeBtn_png), // normal state image
            new cc.Sprite(res.HomeBtn_s_png), //select state image
            new cc.Sprite(res.HomeBtn_s_png), //disabled state image
            this.home, this);

        var changeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.ChangeBtn_png), // normal state image
            new cc.Sprite(res.ChangeBtn_s_png), //select state image
            new cc.Sprite(res.ChangeBtn_s_png), //disabled state image
            this.change, this);

        var homeMenu = new cc.Menu(homeBtn,changeBtn);
        homeMenu.setPosition(cc.p(w/2,h/9));
        homeMenu.alignItemsHorizontallyWithPadding(30);
        this.addChild(homeMenu);

        return true;
    },
    selectedItemEvent: function (sender, type) {
        switch (type) {
            case ccui.ListView.ON_SELECTED_ITEM_END:

                var listViewEx = sender;
                var num = listViewEx.getCurSelectedIndex();
                cc.log("select child index = " + listViewEx.getCurSelectedIndex());
                if(clearLvTable[num] == 0){
                    cc.log("blocked");
                    return false;
                }
                this.getParent().play(this.level,num);
                break;

            default:
                break;
        }
    },
    goDetail1: function(){
        this.loadImages(1);
        this.loadItems(1);
    },
    goDetail2: function(){
        if(lv >= 2){
            this.loadImages(2);
            this.loadItems(2);
        } else {
            return false;
        }
    },
    goDetail3: function(){
        if(lv >= 3){
            this.loadImages(3);
            this.loadItems(3);
        } else {
            return false;
        }
    },
    goDetail4: function(){
        if(lv >= 4){
            this.loadImages(4);
            this.loadItems(4);
        } else {
            return false;
        }
    },
    goDetail5: function(){
        if(lv >= 5){
            this.loadImages(5);
            this.loadItems(5);
        } else {
            return false;
        }
    },
    goDetail6: function(){
        if(lv >= 6){
            this.loadImages(6);
            this.loadItems(6);
        } else {
            return false;
        }
    },
    goDetail7: function(){
        if(lv >= 7){
            this.loadImages(7);
            this.loadItems(7);
        } else {
            return false;
        }
    },
    goDetail8: function(){
        if(lv >= 8){
            this.loadImages(8);
            this.loadItems(8);
        } else {
            return false;
        }
    },
    goDetail9: function(){
        if(lv >= 9){
            this.loadImages(9);
            this.loadItems(9);
        } else {
            return false;
        }
    },
    goDetail10: function(){
        if(lv >= 10){
            this.loadImages(10);
            this.loadItems(10);
        } else {
            return false;
        }
    },
    loadImages: function(req){
        if(this.getChildByTag(105)){
            this.removeChildByTag(105);
            this.removeChildByTag(106);
        }

        // girls
        var str;

        if(req == 1){
            str = "res/girls/1_current.png";
        } else {
            str = "res/girls/1_clear.png";
        }
        var girl1 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail1, this);

        if(lv >= 2){
            if(req == 2){
                str = "res/girls/2_current.png";
            } else {
                str = "res/girls/2_clear.png";
            }
        } else {
            str = "res/girls/2_unknown.png";            
        }
        var girl2 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail2, this);

        if(lv >= 3){
            if(req == 3){
                str = "res/girls/3_current.png";
            } else {
                str = "res/girls/3_clear.png";
            }
        } else {
            str = "res/girls/3_unknown.png";            
        }
        var girl3 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail3, this);

        if(lv >= 4){
            if(req == 4){
                str = "res/girls/4_current.png";
            } else {
                str = "res/girls/4_clear.png";
            }
        } else {
            str = "res/girls/4_unknown.png";            
        }
        var girl4 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail4, this);

        if(lv >= 5){
            if(req == 5){
                str = "res/girls/5_current.png";
            } else {
                str = "res/girls/5_clear.png";
            }
        } else {
            str = "res/girls/5_unknown.png";            
        }
        var girl5 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail5, this);

        if(lv >= 6){
            if(req == 6){
                str = "res/girls/6_current.png";
            } else {
                str = "res/girls/6_clear.png";
            }
        } else {
            str = "res/girls/6_unknown.png";            
        }
        var girl6 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail6, this);

        if(lv >= 7){
            if(req == 7){
                str = "res/girls/7_current.png";
            } else {
                str = "res/girls/7_clear.png";
            }
        } else {
            str = "res/girls/7_unknown.png";
        }
        var girl7 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail7, this);

        if(lv >= 8){
            if(req == 8){
                str = "res/girls/8_current.png";
            } else {
                str = "res/girls/8_clear.png";
            }
        } else {
            str = "res/girls/8_unknown.png";            
        }
        var girl8 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail8, this);

        if(lv >= 9){
            if(req == 9){
                str = "res/girls/9_current.png";
            } else {
                str = "res/girls/9_clear.png";
            }
        } else {
            str = "res/girls/9_unknown.png";            
        }
        var girl9 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail9, this);

        if(lv >= 10){
            if(req == 10){
                str = "res/girls/10_current.png";
            } else {
                str = "res/girls/10_clear.png";                
            }
        } else {
            str = "res/girls/10_unknown.png";            
        }
        var girl10 = new cc.MenuItemSprite(
            new cc.Sprite(str), // normal state image
            new cc.Sprite(str), //select state image
            new cc.Sprite(str), //disabled state image
        this.goDetail10, this);

        var girlsMenu1 = new cc.Menu(girl1,girl2,girl3,girl4,girl5);
        girlsMenu1.setPosition(cc.p(w/2,h*0.62));
        girlsMenu1.alignItemsHorizontallyWithPadding(w/40);

        var girlsMenu2 = new cc.Menu(girl6,girl7,girl8,girl9,girl10);
        girlsMenu2.setPosition(cc.p(w/2,h*0.50));
        girlsMenu2.alignItemsHorizontallyWithPadding(w/40);
        
        this.addChild(girlsMenu1,0,105);
        this.addChild(girlsMenu2,0,106);
    },
    loadItems: function(req){
//        this.tag++;
        this.level = req;
        
        // List
        this._array = [];
        var len = phrase[this.level-1].length;

        for (var i = 0; i < len; ++i) {
            var str = phrase[this.level-1][i][0].substr(0,10);
            this._array.push("No." + (i+1)+"　"+str);                
        }

        this.removeChildByTag(300);

        // Create the list view
        var listView = new ccui.ListView();
        // set list view ex direction
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setTouchEnabled(true);
        listView.setBounceEnabled(true);
        listView.setContentSize(cc.size(w,265));    //あとで変える
        listView.x = 0;
        listView.y = 150;
        listView.addEventListener(this.selectedItemEvent, this);
        this.addChild(listView,0,300);

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
        listView.setItemsMargin(default_button.height / 4)

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
            var index = listView.getIndex(item);    // セリフIDと連動させる必要あり
            button.setTitleText(this._array[index]);
            button.setTitleFontSize(32);
            button.setTitleFontName("cinecaption");

            // disabled
            if(clearLvTable[this.level-1][i] != 0){
                button.setTouchEnabled(true);
            } else {
                button.setTouchEnabled(false);
                button.setBright(false);
                button.setTitleColor(cc.color(0,0,0));  // black-color
            }
        }

        // set all items layout gravity
        listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);

        this.labelLv.setString("Lv."+this.level);
//        cc.log("scores:"+clearLvTable);
    },
    home:function (){
        cc.director.runScene(new MenuScene());
    },
    change:function(){
        if(premiumFunction == 1){
            currentGirl = this.level;

            // save
            obj.power.currentGirl = currentGirl;
            str = JSON.stringify(obj);
            cc.sys.localStorage.setItem("userData",str);
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                               "プレミアム・モード", 
                                               "対戦相手の女子を変更しました！\n取り逃がしたセリフを獲得して、コレクション・コンプリートを目指そう！");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "プレミアム・モード",
                                               "対戦相手の女子を変更しました！\n取り逃がしたセリフを獲得して、コレクション・コンプリートを目指そう！");
            }

            this.init();
        } else {
            // message
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
                                                "showAlertDialog", 
                                                "(Ljava/lang/String;Ljava/lang/String;)V", 
                                               "プレミアム機能を購入してね", 
                                               "取り逃がしたセリフを獲得して、コレクション・コンプリートを目指そう！\n\n> 購入はモアページから");
            } else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                               "callNativeUIWithTitle:andContent:", 
                                               "プレミアム機能を購入してね",
                                               "取り逃がしたセリフを獲得して、コレクション・コンプリートを目指そう！\n\n> 購入はモアページから");
            }
        }
    }
});