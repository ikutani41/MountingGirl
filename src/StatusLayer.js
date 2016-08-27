var StatusLayer = cc.Layer.extend({
    //制限時間の表示
    labelTimer:null,
    //ゴールまでの歩数と現在のステップ数の表示
    labelProgress:null,
    timeLeft:0,
    stepLeft:0,
    HardFlg:null,    // mode
    cheerString:null,
    count:0,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        var hudBG = new cc.Sprite(res.HUD_png);
        hudBG.setPosition(w/2, h - hudBG.height / 2);
        this.addChild(hudBG);

        // 女の子の画像＋セリフ
        var girl = new cc.Sprite("res/girls/"+currentGirl+"_cheer.png");
        girl.setPosition(w/2, h - hudBG.height / 2);
        this.addChild(girl);

        var callout = new cc.Sprite(res.CalloutCheer_png);
        callout.setPosition(w / 2, h - hudBG.height / 2);
        this.addChild(callout);

        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelCheers = new cc.LabelTTF("", "res/font/cinecaption2.28.ttf", 20, cc.size(w*0.4,callout.height), cc.TEXT_ALIGNMENT_LEFT);
        } else {
            this.labelCheers = new cc.LabelTTF("", "cinecaption", 20, cc.size(w*0.4,callout.height), cc.TEXT_ALIGNMENT_LEFT);
        }
        this.labelCheers.setPosition(cc.p(w*0.83, h*0.83));
//        this.labelCheers.setPosition(cc.p(w*0.75,h*0.93));
        this.labelCheers.setColor(cc.color(0,0,0));//black color
        this.addChild(this.labelCheers);

        //Goalまでの歩数表示
        this.stepLeft = goalSteps[lv -1];
        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelProgress = new cc.LabelTTF(this.stepLeft + " Step!!", "res/font/logotypejp_mp_b_1.ttf", 40);
        } else {
            this.labelProgress = new cc.LabelTTF(this.stepLeft + " Step!!", "Corporate-Logo-Bold", 40);
        }
        this.labelProgress.setColor(cc.color(255,255,255));//white color
        this.labelProgress.setPosition(cc.p(w*2/9, h*15/16));
        this.addChild(this.labelProgress);

        //Timer表示
        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelTimer = new cc.LabelTTF("0.00 Sec.", "res/font/logotypejp_mp_b_1.ttf", 40);
        } else {
            this.labelTimer = new cc.LabelTTF("0.00 Sec.", "Corporate-Logo-Bold", 40);
        }
        this.labelTimer.setColor(cc.color(255,255,255));//white color
        this.labelTimer.setPosition(cc.p(w*2/9, h*14/16));
        this.addChild(this.labelTimer);

        this.scheduleUpdate();
    },
    update:function (dt){
        // for cheers
        if(Timepast > 5){
            Timepast = 0;
        } else {
            Timepast += dt;
        }

        //Timer update
        if(!Timeup){
            return false;
        } else {
            this.timeLeft = ((Timeup - new Date().getTime()) / 1000).toFixed(2);
            if(this.timeLeft <= 0){
                //time-over
                this.getParent().playFinish();
                this.labelTimer.setString("0.00 Sec.");
                this.getParent().goNext(2);
            } else if (this.timeLeft <= 5){
                this.labelTimer.setString(this.timeLeft + " Sec.");
                this.labelTimer.setColor(cc.color(255,0,0));//red color

                // 画面自体を赤に
                if(!this.HardFlg){
                    var HardBG = new cc.Sprite(res.Hard_png);
                    HardBG.setPosition(centerpos);
                    HardBG.setOpacity(10);   // Max.255(default)
                    this.addChild(HardBG,0,25);
                    this.HardFlg = 1;
                } else {
                    var opacity = this.getChildByTag(25).getOpacity();
                    if(opacity != 100){
                        this.getChildByTag(25).setOpacity(opacity+1);
                    }
                }
            } else {
                this.labelTimer.setString(this.timeLeft + " Sec.");
            }
        }
        // 5秒に1回、プレイ中セリフの切り替え
        if(Timepast > 5){
            var rand = Math.floor(Math.random() * 14);
            this.cheerString = cheers[rand];
            this.count = 1;
        }

        // セリフ送り
        if(this.cheerString != null){
            if(this.count / 2 > this.cheerString.length){
                // 完了
                this.cheerString = null;
            } else {
                var str = this.cheerString.substr(0,this.count/2);
                this.labelCheers.setString(str);
                this.count++;
            }
        }

    },
    setCount:function (num){
        this.stepLeft = num;
        this.labelProgress.setString(num + " Step!!");
    },
    step:function(){
        this.stepLeft　-= 1;
        if(this.stepLeft){
            this.labelProgress.setString(this.stepLeft + " Step!!");
        } else {
            this.labelProgress.setString("");
        }
    },
    timerStop:function (){
        this.unscheduleUpdate();
        return this.timeLeft;
    },
    getTimeLeft:function(){
        return this.timeLeft;
    }
});