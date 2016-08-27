var SnapshotLayer = cc.Layer.extend({
    flg:1,  // 1->up, 2->down, 3->end

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        //2. create a background image and set it's position at the center of the screen
        var mask = new cc.Sprite(res.White_png);
        mask.setPosition(centerpos);
        mask.setOpacity(135);   // Max.255(default)
        this.addChild(mask,7,500);

        this.scheduleUpdate();
    },
    update: function(){
        var opacity = this.getChildByTag(500).getOpacity();
        switch(this.flg){
            case 1:
                this.getChildByTag(500).setOpacity(opacity+20);
                if(opacity == 235) this.flg = 2;
                break;
            case 2:
                this.getChildByTag(500).setOpacity(opacity-20);
                if(opacity == 35) this.flg = 3;
                break;
            case 3:
                this.finish();
                break;
        }
    },
    finish: function(){
        this.removeFromParent();
    }
});