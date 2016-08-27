var EcountdownLayer = cc.Layer.extend({
    cd1:null,
    cd2:null,
    cd3:null,
    Time:null,
    mode:null,  //state-flg
    labelStatement1:null,
    labelStatement2:null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();
        //カウントダウン用の画像を読み込んでメンバ変数に格納しておく
        this.cd1 = new cc.Sprite(res.CD_1_png);
        this.cd1.retain();
        this.cd1.setPosition(centerpos);
        this.cd2 = new cc.Sprite(res.CD_2_png);
        this.cd2.retain();
        this.cd2.setPosition(centerpos);
        this.cd3 = new cc.Sprite(res.CD_3_png);
        this.cd3.retain();
        this.cd3.setPosition(centerpos);
    },
    cdstart:function(){
        this.Time = 2.1;
        this.mode = 3;

        this.addChild(this.cd3,1,1);

        if(cc.sys.os === cc.sys.OS_ANDROID){
            this.labelStatement1 = new cc.LabelTTF("100タップのクリアスピードで", "res/font/logotypejp_mp_b_1.ttf", 40);
            this.labelStatement2 = new cc.LabelTTF("運営チームにチャレンジ！！", "res/font/logotypejp_mp_b_1.ttf", 40);
        } else {
            this.labelStatement1 = new cc.LabelTTF("100タップのクリアスピードで", "Corporate-Logo-Bold", 40);
            this.labelStatement2 = new cc.LabelTTF("運営チームにチャレンジ！！", "Corporate-Logo-Bold", 40);
        }
        this.labelStatement1.setPosition(cc.p(w/2,h/3));
        this.labelStatement2.setPosition(cc.p(w/2,h/4));
        this.addChild(this.labelStatement1,10,4);
        this.addChild(this.labelStatement2,10,5);

        this.scheduleUpdate();
    },
    update:function(dt){
        this.Time -= dt;
        if(this.mode == 3 && this.Time <= 1.4){
            this.addChild(this.cd2,2,2);
            this.mode = 2;
        } else if(this.mode == 2 && this.Time <= 0.7){
            this.addChild(this.cd1,3,3);
            this.mode = 1;
        } else if(this.mode == 1 && this.Time <= 0.0){
            this.getParent().playStart();
            this.removeFromParent();
        }
    }
});