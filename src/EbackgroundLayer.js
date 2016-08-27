var EbackgroundLayer = cc.Layer.extend({
    // set member-variables
    Rnd:0,          //乱数
    Answer:[],
    Ready:0,    //amount of imgs ready
    Step:0, //amount of steps
    Goal:100,
    Fucknum:101,    //ゲームの最大歩数+1で初期化する
    _rm:0,      //追加読み込み終了後のscrollエラー回避
    Saveline:0, // 0 -> removed, 1-> present

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        // set ReadyBG(to set scrollY in advance)
        var ReadyBG = new cc.Sprite(res.ReadyBG_png);
        // set scrollY
        scrollY = ReadyBG.height;

        ReadyBG.setPosition(cc.p(w/2,ReadyBG.height / 2));    // minus Ad-height
        this.addChild(ReadyBG);
        
        // set PlayBGs(1by1)
        for(i = 0; i < 6; i++){
            this.Rnd = Math.floor(Math.random() * 4);
            var PlayBG = new cc.Sprite("res/PlayBG0/" + currentGirl + "_" + this.Rnd+".png");
            PlayBG.setPosition(cc.p(w/2,scrollY*(i+1.5)));
            this.addChild(PlayBG,0,this.Ready);
            this.Answer[this.Ready] = this.Rnd;
            this.Ready++;
       }

        //EventLister
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                // disable tap in ready.
                if(isPlaying == 0) {
                    return false;
                }

                var target = event.getCurrentTarget();
                var pos = touch.getLocation();

                if(target.Step == target.Goal){
                    this.Step++;    //Goal連打防止
                    target.winAnimate();
                } else if (pos.y < scrollY * 1.0 || pos.y > scrollY * 3.0){
                    cc.log("out-range!");
                    cc.log("pos.y = "+pos.y);
                    return false;
                } else {
                    target.touched(pos.x);
                }
                return false;
            }
        });
        cc.eventManager.addListener(listener, this);
        this.scheduleUpdate();
    },
    setStep: function(num){
        // when revive
        this.Goal = num;
    },
    touched: function (posX){
        //正誤判断
        var num = this.Answer[this.Step];
        if(w/4 * num < posX & posX < w/4 * (num + 1)){
            //正解を踏んだとき
            this.Step++;
            
            //Fuckスタンプ
            var Fuck = new cc.Sprite(res.bom_png);
            Fuck.setPosition(cc.p(w/8 + w/4 * num,scrollY * 1.5));
            this.addChild(Fuck,0,this.Fucknum);
            this.Fucknum++;

            //スクロール
            this.scroll();

            //HUD-update : step-count
            var estatusLayer = this.getParent().getChildByTag(TagOfLayer.Estatus);
            estatusLayer.step();

            //画像追加(1by1)
            this.addImage();

            if(this.Step == 50){
                var recordTime = estatusLayer.getTimePassing();
                this.getParent().setRecord(recordTime);
                cc.log("recorded!");
            }
        } else {
            //不正解のとき
            cc.eventManager.pauseTarget(this);
            this.getParent().playFinish(2);

            // どこがタップされたか特定
            var tappedNum;
            if(posX < w/4){
                tappedNum = 0;
            } else if(posX < w/2){
                tappedNum = 1;
            } else if(posX < w*3/4){
                tappedNum = 2;
            } else {
                tappedNum = 3;
            }

            // 誤タップ位置表示
            var FailFace = new cc.Sprite(res.Fail_png);
            FailFace.setPosition(cc.p(w/8 + w/4 * tappedNum, scrollY * 1.5));
            this.addChild(FailFace);

            // 負けアニメーション
            FailFace.runAction(
                cc.sequence(
                    cc.ScaleTo(0.25,1.5,1.5),
                    cc.ScaleTo(0.25,1.0,1.0)
                )
            );

            this.schedule(this.lose,1.0);
        }
    },
    scroll:function(){
        //BGs
        for (var j = this.Ready-6; j < this.Ready - this._rm; j++){
            this.getChildByTag(j).runAction(cc.MoveBy.create(0.15,cc.p(0,-scrollY)));
        }
        //Fuck最新
        this.getChildByTag(this.Fucknum-1).runAction(cc.MoveBy.create(0.13,cc.p(0,-scrollY)));

        //Fuck1個前の（初回のみエラー回避）
        if(this.Step!=1){
            this.getChildByTag(this.Fucknum-2).runAction(cc.MoveBy.create(0.13,cc.p(0,-scrollY)));
        }

        //saveline
        if(this.Saveline == 1){
            this.getChildByTag(500).runAction(cc.MoveBy.create(0.15,cc.p(0,-scrollY)));
        }
    },
    addImage:function(){
        //set BG(fixed-position)
        if(this.Ready < this.Goal){
            //set
            this.Rnd = Math.floor(Math.random() * 4);
            var AdditionalBG = new cc.Sprite("res/PlayBG0/" + currentGirl + "_" + this.Rnd+".png");
            AdditionalBG.setPosition(cc.p(w/2,scrollY * 6.5));
            this.addChild(AdditionalBG,0,this.Ready);

            this.Answer[this.Ready] = this.Rnd;    //正解格納(1枚ずつパターン)
            this.Ready++;

            //remove
            if(this.Ready > 8){
                this.removeChildByTag(this.Ready-8);    //BG
            }
            if(this.Step!=1){
                this.removeChildByTag(this.Fucknum-2);      //Fuck
            }
            if(this.Step == 53 && this.Saveline == 1){
                this.removeChildByTag(500); //saveline
                this.Saveline = 0;
            }

            // saveline
            if(this.Ready == 50){
                var saveline = new cc.Sprite(res.Saveline_png);
                saveline.setPosition(cc.p(w/2,scrollY * 7));
                this.addChild(saveline,1,500);
                this.Saveline = 1;
            }
        } else if (this.Ready == this.Goal) {
            //set Goal
            var Goal = new cc.Sprite(res.Goal_png);
            Goal.setPosition(cc.p(w/2, scrollY * 7.5));
            this.addChild(Goal,0,this.Ready);
            this.Ready++;
        } else {
            this.Ready++;
            this._rm++;
        }
    },
    winAnimate: function(){
        cc.eventManager.pauseTarget(this);
        this.getParent().playFinish(1);

        // 勝ちアニメーション
        this.getChildByTag(this.Goal).runAction(
            cc.sequence(
                cc.ScaleTo(0.25,1.5,1.5),
                cc.ScaleTo(0.25,1.0,1.0)
            )
        );

        this.schedule(this.win,1.0);
    },
    win: function(){
        this.unschedule(this.win);
        this.getParent().goNext(1);
    },
    lose: function(){
        this.unschedule(this.lose);
        this.getParent().goNext(2);
    }
});