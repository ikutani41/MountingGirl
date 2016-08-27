var CollectionScene = cc.Scene.extend({

    onEnter:function () {
        this._super();

        this.addChild(new ListViewLayer(),0,TagOfLayer.ListView);
    },
    play:function(level,num){
        if(this.getChildByTag(TagOfLayer.Replay)){  // Replay時は既存Layer削除する
            this.removeChildByTag(TagOfLayer.Replay);
        }
    	// ListViewからセリフIDもらって、replayLayerを呼び出す
        this.addChild(new ReplayLayer(), 0, TagOfLayer.Replay);    //Tag4
        this.getChildByTag(TagOfLayer.Replay).animateControl(level,num);
    }
});