var PlayScene = cc.Scene.extend({
    BackgroundLayer:null,
    AnimationLayer:null,
    StatusLayer:null,
    CountdownLayer:null,
    RecordStep:null,
    RecordTime:null,

    onEnter:function () {
        this._super();
        // init globals
        Timeup = 0;
        Outcome = 0;
        Timepast = 0;
        isPlaying = 0;
        
        // ReadyLayer
        this.addChild(new ReadyLayer(), 0, TagOfLayer.Ready);    //Tag0
        
        str = cc.sys.localStorage.getItem("userData");
        obj = JSON.parse(str);  //globals update

    },
    playSet:function (){
        this.removeChildByTag(TagOfLayer.Ready);
        this.addChild(new BackgroundLayer(), 0, TagOfLayer.Background);   //Tag1
        this.addChild(new StatusLayer(), 2, TagOfLayer.Status); //Tag3

        //count-down@countdownLayer
        this.addChild(new CountdownLayer(), 3, TagOfLayer.Countdown);
        this.getChildByTag(TagOfLayer.Countdown).cdstart();
    },
    playStart:function (){
        isPlaying = 1;
        startTime = new Date().getTime();

        if(savedTimeLeft == 0){
            Timeup = startTime + timeLimits[lv-1] * 1000;   // set at globals -> HUD
        } else {
            Timeup = startTime + savedTimeLeft * 1000;
            cc.log(savedStep); // あと何歩
            var statusLayer = this.getChildByTag(TagOfLayer.Status);
            var backgroundLayer = this.getChildByTag(TagOfLayer.Background);
            
            statusLayer.setCount(savedStep);   // initial
            backgroundLayer.setStep(savedStep);            
        }
        this.scheduleUpdate();
    },
    update:function(dt){
        Timeup += dt;   // HUD
    },
    playFinish:function (){
        this.unscheduleUpdate();    // -> stop Timeup -> stop HUD
        isPlaying = 0;

        //stop timer @HUD
        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        Outcome = timeLimits[lv-1] - statusLayer.timerStop(); // set at globals
        cc.log("outcome:"+Outcome);
    },
    goNext: function(flg){
        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        // clear HardBG
        if(statusLayer.HardFlg == 1){
            statusLayer.removeChildByTag(25);
        }
        this.removeChildByTag(TagOfLayer.Background);
        this.addChild(new AnimationLayer(), 1, TagOfLayer.Animation); //Tag2
        this.getChildByTag(TagOfLayer.Animation).over(flg);
    },
    setRecord:function(step,time){
        this.RecordStep = step; //　あと何歩
        this.RecordTime = time; // あと何秒
    },
    getRecord:function(){
        var record = [this.RecordStep,this.RecordTime];
        return record;
    },
    choice:function (flg){  // flg: 1->win, 2->lose
        var labelNew = 1;    // 0->show, 1->none
        var num;    // phrase[lv-1][num]

        num = Math.floor(Math.random() * clearLvTable[currentGirl-1].length);
        if(flg == 1){
            labelNew = clearLvTable[currentGirl-1][num];
        }
        this.getChildByTag(TagOfLayer.Phrase).animateControl(flg,num,labelNew);

/*
        var num;    //何番目のPhraseを表示させるか
        var check = 0;
        var unknown;    // 0->own, 1->unknown

        var x = own / open * 100; // x = {0~100}　所持率
        // y = {10~90}  未知との遭遇率
        if(x<=10){
            var y = 90;
        } else if (x >= 90) {
            var y = 10;
        } else {
            var y = 100 - x.toFixed(2);
        }
        // luck = {0~99}    出目
        var luck = Math.floor(Math.random() * 100);
//        cc.log("x:"+x+", y:"+y+",luck:"+luck);

        var rnd1;   // 何番目？の出目
        if(lv >= 10){
            // ownの中からランダム
            rnd1 = Math.floor(Math.random() * own) + 1;     // ownの中で何番目？(1,2,3...)
            for(var i = 0; i < 31; i++){
                if(clearLvTable[i] != 0){
                    check++;
                }
//                cc.log("rnd:"+rnd1+",check:"+check);
                if(check == rnd1){
                    num = i;
                    break;
                } else {
                    continue;
                }
            }
            unknown = 0;
        } else if(flg == 2 || open == own || luck >= y){
            // ownの中からランダム
            rnd1 = Math.floor(Math.random() * own) + 1;     // ownの中で何番目？(1,2,3...)
            for(var i = 0; i < openTable[lv] - 1; i++){
                if(clearLvTable[i] != 0){
                    check++;
                }
//                cc.log("rnd:"+rnd1+",check:"+check);
                if(check == rnd1){
                    num = i;
                    break;
                } else {
                    continue;
                }
            }
            unknown = 0;
        } else {
            // unknownの中からランダム(new)
            rnd1 = Math.floor(Math.random() * (open - own)) + 1;    // unknownの中で何番目？(1,2,3...)
            for(var i = 0; i < openTable[lv] - 1; i++){
                if(clearLvTable[i] == 0){
                    check++;
                }
//                cc.log("rnd:"+rnd1+",check:"+check);
                if(check == rnd1){
                    num = i;
                    break;
                } else {
                    continue;
                }
            }
            unknown = 1;
            cc.log("未知との遭遇率："+y+"%, 出目："+luck+", num:"+num);
        }

        this.getChildByTag(TagOfLayer.Phrase).animateControl(flg,num,unknown);
*/
    }
});