var EndlessScene = cc.Scene.extend({
    EbackgroundLayer:null,
    EanimationLayer:null,
    EstatusLayer:null,
    EcountdownLayer:null,
    RecordTimePassing:0, // セーブ可能なデータ
    NewScore:0, //　今回の記録
    Rank:null,    // ランキングの何位？

    onEnter:function () {
        this._super();
        // init globals
        startTime = 0;
        Outcome = 0;
        Timepast = 0;
        this.RecordTimePassing = 0;
        this.NewScore = 0;
        isPlaying = 0;

        // ReadyLayer
        this.addChild(new EreadyLayer(), 0, TagOfLayer.Eready);
        
        str = cc.sys.localStorage.getItem("userData");
        obj = JSON.parse(str);  //globals update

    },
    playSet:function (){
        this.removeChildByTag(TagOfLayer.Eready);
        this.addChild(new EbackgroundLayer(), 0, TagOfLayer.Ebackground);
        this.addChild(new EstatusLayer(), 2, TagOfLayer.Estatus);

        //count-down@countdownLayer
        this.addChild(new EcountdownLayer(), 3, TagOfLayer.Ecountdown);
        this.getChildByTag(TagOfLayer.Ecountdown).cdstart();
    },
    playStart:function (){
        isPlaying = 1;

        var estatusLayer = this.getChildByTag(TagOfLayer.Estatus);
        var ebackgroundLayer = this.getChildByTag(TagOfLayer.Ebackground);

        if(savedTimePassing == 0){
            startTime = new Date().getTime();
            estatusLayer.setCountTimer(100,0.00);
        } else {
            startTime = new Date().getTime() - savedTimePassing * 1000;
            estatusLayer.setCountTimer(50,savedTimePassing);
            ebackgroundLayer.setStep(50);            
        }
    },
    playFinish:function (flg){
        isPlaying = 0;
        //stop timer @HUD
        var estatusLayer = this.getChildByTag(TagOfLayer.Estatus);
        var newscore = estatusLayer.timerStop();

        if(flg == 1){
            this.NewScore = newscore;
        }
    },
    goNext: function(flg){
        this.removeChildByTag(TagOfLayer.Ebackground);
        this.addChild(new EanimationLayer(), 1, TagOfLayer.Eanimation);
        this.getChildByTag(TagOfLayer.Eanimation).over(flg);
    },
    setRecord:function(time){
        this.RecordTimePassing = time; // セーブ
    },
    getRecord:function(){
        return this.RecordTimePassing;
    },
    getNewScore:function(){
        return this.NewScore;
    },
    setRank: function(rank){
        this.Rank = rank;
    },
    getRank: function(){
        return this.Rank;
    }
});