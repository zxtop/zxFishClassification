import {Application,Container,Graphics,Sprite, Point} from 'pixi.js';
import { getAnimation, getSound, load, createSprite,  getTexture} from '../loader';
import {TweenLite,TimeLine,TweenMax} from 'gsap';
import {AnswerInfo} from 'xes-answer';
import {RenderPageByIndex} from 'xes-tem-render'
import { Store} from 'vuex';

class Fish{
    constructor(){

        this.game = null;
        this.config = question.sources[0];  //单题
        this.fishArr = [];
        this.asArr = [];

        this.gameBgAnimate = null; // 开场动画存储
        this.leftfishArr = [];
        this.rightfishArr = [];
        this.isInit = false;

        this.fishAnswer = [];//鱼篓
        this.classPosArr = [];//鱼篓临时数组
        this.tempArr = [];
        this.temfishAnswer = [];
        this.allfishAnswer = [];

        this.success_animate = question.sources[0].success_animate;
        this.cursorSprite = null;
        this.cursorSprite2 = null;

    
    }
    exec(){
        this.game = stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber);
        RenderPageByIndex(store.state.pageNumber);
        this.init();
        this.cur();
        this.entrance(); // 开场动画
        this.initFishBox(); //初始化鱼框
        this.sportFish();
    }
    init(){
        console.log("小鱼放置数组中=============");
        let option = this.game.getChildByName("componentContainer");
        let _that = this;
        let temfish = [];
        option.children.map((item,index)=>{
            if(String(item.name).indexOf('option')!=-1){
                temfish.push(item);
            }
            if(String(item.name).indexOf('rightAnswer')!=-1){
                item.anchor.set(.5,.5);
                item.x = item.x + item.width/2;
                item.y = item.y + item.height/2;
                _that.asArr.push(item);
            }
        })
        this.config.option.forEach((item,index)=>{
            temfish.map((titem,tindex)=>{
                if(titem.name == item.componentName){
                    _that.fishArr.push({obj:titem,audio:item.audio,text:item.text,scale:item.scale});
                }
            })

        })
        console.log("所有鱼.......",_that.fishArr)
    }
    cur(){
        console.log("加入小手==================")
        // document.body.style.cursor = 'pointer';

        this.cursorSprite = createSprite(getTexture("image_cursor_img_hover"));
        this.game.addChild(this.cursorSprite);

        this.cursorSprite2 = createSprite(getTexture("image_cursor_img_down"));
        this.game.addChild(this.cursorSprite2);
       
        this.game.setChildIndex(this.cursorSprite,this.game.children.length-1);
        this.game.setChildIndex(this.cursorSprite2,this.game.children.length-2);

        // console.log(this.cursorSprite.alpha,this.cursorSprite2.alpha);
        
         this.cursorSprite2.alpha=0;
         this.game.interactive = true;

         let self = this;

         this.game.on('pointerover',function(ev){
            document.body.style.cursor = 'none';
            self.cursorSprite.x = ev.data.global.x;
            self.cursorSprite.y = ev.data.global.y;
         });

         this.game.on('pointerout',function(ev){
             document.body.style.cursor = 'normal';
         });

         this.game.on('pointermove',function(ev){
           self.cursorSprite.x = ev.data.global.x;
           self.cursorSprite.y = ev.data.global.y;
        })

    }
  
    style(){
        return{
            fontSize:this.config.textStyle.fontSize,
            fontFamily:this.config.textStyle.fontFamily,
            fill:this.config.textStyle.color,
            fontWeight:this.config.textStyle.fontWeight    
        }
    }
    entrance(){ // 入场动画
        console.log("入场动画=============",this.config)
        this.gameBgAnimate = getAnimation('animation_kaichang');
        this.gameBgAnimate.state.setAnimation(1,'animation',false);
        this.gameBgAnimate.x = 960;
        this.gameBgAnimate.y = 560;
        this.gameBgAnimate.scale.set(1,1)
        this.game.addChild(this.gameBgAnimate);
   
    }
    initFishBox(){ //初始化鱼框
       console.log("初始化鱼框===========");
        let _that = this;
        this.config.rightAnswer.forEach((item)=>{
            
            _that.asArr.map((asitem,asindex)=>{
                if(item.componentName == asitem.name){
                    let rightoption = item.text.split(',');
                    _that.fishAnswer.push({
                        'obj':asitem,
                        'animateName':item.animate,
                        'success_animate':_that.success_animate,
                        'rightoption':rightoption
                    })
                    _that.temfishAnswer.push(rightoption);
                }
            })

        })

        this.fishAnswer.map((item)=>{
            var curX = item.obj.x-(item.obj.width/2);
            var curY = item.obj.y-(item.obj.height/2);
            var curW =
                parseFloat(item.obj.width/2) + parseFloat(curX);
            var curH =
                parseFloat(item.obj.height/2) + parseFloat(curY);
                this.classPosArr.push({ top: curY, left: curX, width: curW, height: curH });
        });

        this.temfishAnswer.map((temitem)=>{
            temitem.map((item)=>{
                this.allfishAnswer.push(item);
            })
        });
    }
    sportFish(){
        if(!this.isInit){
            this.fishArr.forEach((item,index)=>{
                if(index<6){
                    this.leftFish1(item,index);
                }else{
                    this.rightFish1(item,index);
                }
            })
            this.isInit = true;
        }

        if(this.isInit){
            console.log("初始化完毕===============")
            this.init_left_sport(this.leftfishArr);
            this.init_right_sport(this.rightfishArr);
        }
        this.game.setChildIndex(this.gameBgAnimate,this.game.children.length-1);

    }
    leftFish1(item,index){  //初始化左边小鱼

        let mainSprite = item.obj;
        let firstName = mainSprite.state.data.skeletonData.animations[0].name;
        mainSprite.state.setAnimation(0, firstName, true);

        mainSprite.x = Math.floor(Math.random()*1080 + 154);
        mainSprite.y = Math.floor(Math.random()*500 + 360);

        mainSprite.buttonMode = true;
        mainSprite.interactive =  true;
        mainSprite.reverse = false;
        mainSprite.audio = item.audio;
        mainSprite.scaleValue = item.scale;
        let scaleValue = item.scale;
        mainSprite.itemAnimate = new TimelineMax();

        this.leftfishArr.push({
            'obj':mainSprite,
            "scale":scaleValue,
            "itemAnimate":mainSprite.itemAnimate
           
        });
        mainSprite.draging = false;
        mainSprite.text = item.text;
        mainSprite.index = index;
        mainSprite.startX = null;
        mainSprite.startY = null;
        mainSprite.upX = null;
        mainSprite.upY = null;
        mainSprite.time = null;
        mainSprite.move = false;
        mainSprite.answerInfo = null;
        mainSprite.offplay = false;
        mainSprite.status = true;
        let self = this;
        mainSprite.audios = {
            error:self.config.audios.error_name,
            success:self.config.audios.success_name
        }
        mainSprite.on('pointerover',function(ev){self.onDragOver(ev,mainSprite,self)});
        mainSprite.on('pointerdown',function(ev){self.onDragDown(ev,mainSprite,self)});
        mainSprite.on('pointermove',function(ev){self.onDragMove(ev,mainSprite,self)});
        mainSprite.on('pointerup',function(ev){self.onDragUp(ev,mainSprite,self)});
    }
    
    rightFish1(item,index){ //初始化右边小鱼
        let mainSprite = item.obj;
        let scaleValue = item.scale;
        mainSprite.scale.set(parseFloat(-scaleValue),parseFloat(scaleValue));
        mainSprite.children[2].children[0].scale.set(parseFloat(-scaleValue),parseFloat(scaleValue));
        let firstName = mainSprite.state.data.skeletonData.animations[0].name;
        mainSprite.state.setAnimation(0, firstName, true); 

        mainSprite.x = Math.floor(Math.random()*1080 + 154);
        mainSprite.y = Math.floor(Math.random()*500 + 360);
        
        mainSprite.reverse = true;
        mainSprite.buttonMode = true;
        mainSprite.interactive =  true;
        mainSprite.audio = item.audio;
        mainSprite.scaleValue = scaleValue;
        mainSprite.itemAnimate = new TimelineMax();
        this.rightfishArr.push({
            'obj':mainSprite,
            "scale":scaleValue,
            "itemAnimate":mainSprite.itemAnimate,
           
        });
        mainSprite.draging = false;
        mainSprite.text = item.text;
        mainSprite.status = true;

        mainSprite.index = index;
        mainSprite.startX = null;
        mainSprite.startY = null;
        mainSprite.upX = null;
        mainSprite.upY = null;
        mainSprite.time = null;
        mainSprite.move = false;
        mainSprite.answerInfo = null;
        mainSprite.offplay = false;

        let self = this;
        mainSprite.audios = {
            error:self.config.audios.error_name,
            success:self.config.audios.success_name
        }

        mainSprite.on('pointerover',function(ev){self.onDragOver(ev,mainSprite,self)});
        mainSprite.on('pointerdown',function(ev){self.onDragDown(ev,mainSprite,self)});
        mainSprite.on('pointermove',function(ev){self.onDragMove(ev,mainSprite,self)});
        mainSprite.on('pointerup',function(ev){self.onDragUp(ev,mainSprite,self)});

    }

    init_left_sport(item){ //初始化向左运动
        let _this = this;
        // let itemArr = [];
        item.map((i,n)=>{
            // itemArr.push(i.obj);
            // let itemAnimate = new TimelineMax();
            i.itemAnimate.to(
                i.obj,
                n+10,
                {
                    x:0,
                    ease:Power0.easeNone,
                    onComplete:function(){
                        i.obj.reverse = !i.obj.reverse;
                        _this.rTurn(i.obj); //转向
                        _this.rightSport(i.itemAnimate,i.obj,n)
                        
                    }
                }
            )
        })
    }

    rTurn(obj){ // 右转向
        obj.scale.set(-(parseFloat(obj.scaleValue)),parseFloat(obj.scaleValue));
        obj.children[2].children[0].scale.set(-(parseFloat(obj.scaleValue)),parseFloat(obj.scaleValue))
    }

    rightSport(itemAnimate,obj,n){ //从此位置往右运动，完成后往左运动，repeat
        let _this = this;
        itemAnimate.fromTo(
            obj,
            n+10,
            {
                x:0
            },
            {
                x:1920,
                ease:Power0.easeNone,
                onComplete:function(){
                    obj.reverse = !obj.reverse;
                    _this.lTurn(obj);
                    _this.leftSport(itemAnimate,obj,n)
                },
                
            }
        )

    }

    lTurn(obj){ // 左转向      
        obj.scale.set(parseFloat(obj.scaleValue),parseFloat(obj.scaleValue));
        obj.children[2].children[0].scale.set((parseFloat(obj.scaleValue)),parseFloat(obj.scaleValue))
    }

    init_right_sport(item){  //初始化向右运动
        let _this = this;
        // let itemArr = [];
        item.map((i,n)=>{
            // itemArr.push(i.obj);
            // let itemAnimate = new TimelineMax();
            i.itemAnimate.to(
                i.obj,
                n+10,
                {
                    x:1920,
                    ease:Power0.easeNone,
                    onComplete:function(){
                        i.obj.reverse = !i.obj.reverse;
                        _this.lTurn(i.obj);
                        _this.leftSport(i.itemAnimate,i.obj,n);
                        // console.log(i.obj.reverse)
                    }
                }
            )
        })
  
        
    }

    leftSport(itemAnimate,obj,n){ //从此位置往左运动，完成后往右运动，repeat
        let _this = this;
        itemAnimate.fromTo(
            obj,
            n+10,
            {
                x:1920
            },
            {
                x:0,
                ease:Power0.easeNone,
                onComplete:function(){
                    obj.reverse = !obj.reverse;

                    _this.rTurn(obj);
                    _this.rightSport(itemAnimate,obj,n);
                },
                
            }
    
        )
    }

    onDragOver(ev,mainSprite,self){
        mainSprite.cursor = 'none'
        self.cursorSprite.alpha = 1;
        self.cursorSprite2.alpha = 0;
        self.game.setChildIndex(self.cursorSprite,self.game.children.length-1);
    }

    onDragDown(ev,mainSprite,self){
       mainSprite.cursor = 'none';
       self.cursorSprite.alpha = 0;
       self.cursorSprite2.alpha = 1;
       //self.game.setChildIndex(self.cursorSprite2,self.game.children.length-2);

       mainSprite.startX = mainSprite.x;
       mainSprite.startY = mainSprite.y;
       mainSprite.data = ev.data;
       mainSprite.draging = true;
       self.cursorSprite.x = mainSprite.x;
       self.cursorSprite.y = mainSprite.y;

       self.cursorSprite2.x = mainSprite.x;
       self.cursorSprite2.y = mainSprite.y;
       
       self.game.getChildByName("componentContainer").setChildIndex(mainSprite,self.game.getChildByName("componentContainer").children.length-3);

       mainSprite.time = setTimeout(()=>{
        let nextName = mainSprite.state.data.skeletonData.animations[1].name;
        mainSprite.state.setAnimation(1,nextName,true);
        self.game.getChildByName("componentContainer").setChildIndex(mainSprite,self.game.getChildByName("componentContainer").children.length-3);
        self.game.setChildIndex(self.cursorSprite2,self.game.children.length-2);
        mainSprite.move = true;

       },300)
       mainSprite.itemAnimate.paused(true);
        // res[question.one.gameBgSound.audio].sound.volume = 0.3; //背景音乐
       console.log(mainSprite.audio);
       res[mainSprite.audio].sound.play();   
    }
    onDragMove(ev,mainSprite,self){
        if(mainSprite.draging){
            mainSprite.cursor = 'none';
            if(mainSprite.move){
                self.cursorSprite.alpha = 0;
                self.cursorSprite2.x = ev.data.global.x-self.cursorSprite2.width/2;
                self.cursorSprite2.y = ev.data.global.y-self.cursorSprite2.height/2;
                self.game.setChildIndex(self.cursorSprite2,self.game.children.length-1);

            }
            let newPosition = ev.data.getLocalPosition(mainSprite.parent);
            if( newPosition.x > 30 && 
                newPosition.x < 1890 && 
                newPosition.y > 40 && 
                newPosition.y < 1040
            ){
                mainSprite.x = newPosition.x;
                mainSprite.y = newPosition.y;
                
                // 碰撞检测
                for(var j = 0; j < self.classPosArr.length; j++){
                    if(mainSprite.reverse){
                        if(
                            (mainSprite.x+(mainSprite.width/2))>parseFloat(self.classPosArr[j].width)||
                            (mainSprite.x-(mainSprite.width/2))<parseFloat(self.classPosArr[j].left)||
                            (mainSprite.y-(mainSprite.height/2))>parseFloat(self.classPosArr[j].height)||
                            (mainSprite.y+(mainSprite.height/2))<parseFloat(self.classPosArr[j].top))
                        {//没碰到
                            console.log("反向没碰到")
                            self.fishAnswer[j].obj.scale.set(1,1);

                        }else{
                            console.log("方向碰到了");
                            self.fishAnswer[j].obj.scale.set(1.2,1.2);
                        }

                    }else{

                        if(
                            (mainSprite.x-(mainSprite.width/2))>parseFloat(self.classPosArr[j].width)||
                            (mainSprite.x+(mainSprite.width/2))<parseFloat(self.classPosArr[j].left)||
                            (mainSprite.y-(mainSprite.height/2))>parseFloat(self.classPosArr[j].height)||
                            (mainSprite.y+(mainSprite.height/2))<parseFloat(self.classPosArr[j].top))
                        {//没碰到
                            console.log("2222没碰到")
                            self.fishAnswer[j].obj.scale.set(1,1);
                        }else{
                            console.log("2222碰到了");
                            self.fishAnswer[j].obj.scale.set(1.2,1.2);

                        }
                    }


                }

            }else{
                console.log('从别处放开了')
                clearTimeout(mainSprite.time);
                let firstName = mainSprite.stateData.skeletonData.animations[0].name;
                mainSprite.state.setAnimation(1,firstName,true);
                mainSprite.draging = false;
                mainSprite.itemAnimate.paused(true);          // 暂停原来的移动;

                mainSprite.reverse = !mainSprite.reverse;     // 反方向移动;
                if(mainSprite.reverse){
                    self.rTurn(mainSprite);
                    let newitemAnimate = new TimelineMax();
                    self.rt(mainSprite,newitemAnimate,mainSprite.index);
                    mainSprite.itemAnimate = newitemAnimate;
                }else{
                    self.lTurn(mainSprite);
                    let newitemAnimate = new TimelineMax();
                    self.lt(mainSprite,newitemAnimate,mainSprite.index);
                    mainSprite.itemAnimate = newitemAnimate;
    
                }
                
            }
        }
    }
    onDragUp(ev,mainSprite,self){

        let game = self.game;
        self.cursorSprite2.alpha = 0;
        self.cursorSprite.alpha = 1;
        mainSprite.move = false;
        let _this = ev.target;
        mainSprite.upX = _this.x;
        mainSprite.upY = _this.y;
        mainSprite.x = mainSprite.upX;
        mainSprite.y = mainSprite.upY;
        clearTimeout(mainSprite.time);
        let firstName = mainSprite.stateData.skeletonData.animations[0].name;
        mainSprite.state.setAnimation(1,firstName,true);
        game.getChildByName("componentContainer").setChildIndex(mainSprite,game.getChildByName("componentContainer").children.length-3);

        mainSprite.draging = false;
        _this.data = null;

        if(mainSprite.upX == mainSprite.startX || mainSprite.upY == mainSprite.startY){
            console.log("没拖拽");
            mainSprite.itemAnimate.paused(false);

        }else{
            console.log("拖拽了.....");
            if(mainSprite.upX < 30 ){mainSprite.upX = 30}
            if(mainSprite.upX > 1890){mainSprite.upX = 1890}
            if(mainSprite.upY < 400 ){mainSprite.upY = 400}
            if(mainSprite.upY > 1030){mainSprite.upY = 1030}
            mainSprite.itemAnimate.paused(true);//暂停原来的移动;
            mainSprite.reverse = !mainSprite.reverse;//反方向移动;
            if(mainSprite.reverse){
                self.rTurn(mainSprite);
                let newitemAnimate = new TimelineMax();
                self.rt(mainSprite,newitemAnimate,mainSprite.index);
                mainSprite.itemAnimate = newitemAnimate;
            }else{
                self.lTurn(mainSprite);
                let newitemAnimate = new TimelineMax();
                self.lt(mainSprite,newitemAnimate,mainSprite.index);
                mainSprite.itemAnimate = newitemAnimate;

            }
        }


        for(var j = 0; j < self.classPosArr.length; j++){
            if(mainSprite.reverse){
                if(
                    (mainSprite.x+(mainSprite.width/2))>parseFloat(self.classPosArr[j].width)||
                    (mainSprite.x-(mainSprite.width/2))<parseFloat(self.classPosArr[j].left)||
                    (mainSprite.y-(mainSprite.height/2))>parseFloat(self.classPosArr[j].height)||
                    (mainSprite.y+(mainSprite.height/2))<parseFloat(self.classPosArr[j].top))
                {//没碰到
                    console.log("up反向没碰到")

                }else{
                    console.log("up反向碰到了");
                    mainSprite.answerInfo = self.fishAnswer[j];
                    mainSprite.offplay = true;
                }

            }else{

                if(
                    (mainSprite.x-(mainSprite.width/2))>parseFloat(self.classPosArr[j].width)||
                    (mainSprite.x+(mainSprite.width/2))<parseFloat(self.classPosArr[j].left)||
                    (mainSprite.y-(mainSprite.height/2))>parseFloat(self.classPosArr[j].height)||
                    (mainSprite.y+(mainSprite.height/2))<parseFloat(self.classPosArr[j].top))
        {//没碰到
                    console.log("2222up没碰到")
                }else{
                    console.log("2222up碰到了");
                    mainSprite.answerInfo = self.fishAnswer[j];
                    mainSprite.offplay = true;
                }
            }


        }




        if(mainSprite.answerInfo==null){
            return;
        }else{
            if(self.IsInArray(mainSprite.answerInfo.rightoption,mainSprite.text) && mainSprite.status){
                self.tempArr.push(mainSprite.text); 
                console.log("正确");
                let animation = new TimelineMax();
                animation.to(
                    mainSprite.answerInfo.obj,
                    .1,
                    {
                        alpha:0,
                        onComplete:function(){
                            console.log(mainSprite.answerInfo.animateName.name)
                            let waterSprite = getAnimation(mainSprite.answerInfo.animateName.name);
                            // waterSprite.name = answerInfo.animateName.name;
                            waterSprite.state.setAnimation(1,'animation',false);
                            waterSprite.pivot.set(parseInt(waterSprite.width/2),parseInt(waterSprite.height));
                            waterSprite.x = parseInt(waterSprite.width) + parseInt(mainSprite.answerInfo.animateName.x);
                            waterSprite.y = parseInt(waterSprite.height*2) + parseInt(mainSprite.answerInfo.animateName.y)-50;
                            game.addChild(waterSprite);

                
                            
                            // 播放音效
                            res[mainSprite.audios.success].sound.play();
                            game.getChildByName("componentContainer").removeChild(mainSprite);
                            mainSprite.status = false;
                            if(!mainSprite.status){
                                let t = setTimeout(()=>{
                                    waterSprite.destroy();
                                    mainSprite.answerInfo.obj.alpha = 1;
                                    mainSprite.answerInfo.obj.scale.set(1,1)
                                    clearTimeout(t)
                                },1000)
                    
                            }
                            // 判断是否全部正确
                            if(self.allfishAnswer.length == self.tempArr.length && waterSprite.off){
                                let entTime = setTimeout(()=>{
                                    console.log("全部正确");
                                    // cursorSprite.alpha = 0;
                                    // document.body.style.cursor = 'default';
                                   
                                    if(self.success_animate.show){

                                        let successAnimation = getAnimation(self.success_animate.name);
                                        successAnimation.state.setAnimation(0,'animation',false);
                                        successAnimation.pivot.set(parseInt(successAnimation.width/2),parseInt(successAnimation.height));
                                        
                                        successAnimation.x = parseInt(successAnimation.width) + parseInt(mainSprite.answerInfo.success_animate.x);
                                        successAnimation.y = parseInt(successAnimation.height*2) + parseInt(mainSprite.answerInfo.success_animate.y-50);
                                        self.fishAnswer.map((fishitem)=>{
                                            game.getChildByName("componentContainer").removeChild(fishitem.obj)
                                        })
                                        game.addChild(successAnimation);
                                        
                                    }
                                    // 提交答案
                                    setTimeout(() => {
                                        if(question.interface){
                                            let answer = new AnswerInfo();
                                           
                                            answer.init({type: 0, useranswer:'', answer:'', id:0, rightnum: 1, wrongnum: 0});
                                     
               
                                            store.dispatch('pushToPostArr', answer);
                                            store.dispatch('postAnswer');
                                        }else{
                                            let answer = new AnswerInfo();
                                            
                                            answer.init({type: 0, useranswer:'', answer:'', id:0, rightnum: 1, wrongnum: 0});

                                            store.dispatch('pushToPostArr', answer);
                                            store.dispatch('postAnswer');
                                            
                                        }
                                    }, question.one.end.jumpResultTime);
            
                                    clearTimeout(entTime);

                                },1500)
            
                            }else{
                                console.log("88888888888")
                            }
                        }
                    }
                )
  
                
            }else{

                console.log("错误")
                if(mainSprite.offplay){
                    res[mainSprite.audios.error].sound.play();
                    mainSprite.offplay = false;
                    mainSprite.answerInfo.obj.scale.set(1,1);
                    mainSprite.upX = mainSprite.startX;
                    mainSprite.upY = mainSprite.startY;
                    mainSprite.itemAnimate.paused(true);//暂停原来的移动;

                    mainSprite.reverse = !mainSprite.reverse;

                    if(mainSprite.reverse){
                        self.lTurn(mainSprite);
                        let newitemAnimate = new TimelineMax();
                        self.lt(mainSprite,newitemAnimate,mainSprite.index);
                        mainSprite.itemAnimate = newitemAnimate;
                    }else{
                        self.rTurn(mainSprite);
                        let newitemAnimate = new TimelineMax();
                        self.rt(mainSprite,newitemAnimate,mainSprite.index);
                        mainSprite.itemAnimate = newitemAnimate;
    
                    }

                }else{
                    mainSprite.answerInfo.obj.scale.set(1,1);
                }
             


            }
    }


    }

    rt(obj,itemAnimate,n){
        let _this = this;
        itemAnimate.fromTo(
            obj,
            n+5,
            {
                x:obj.upX,
                y:obj.upY
            },
            {
                x:1920,
                y:obj.upY,
                ease:Power0.easeNone,
                onComplete:function(){
                    obj.reverse = !obj.reverse;
                    _this.lTurn(obj);
                    _this.leftSport(itemAnimate,obj,n);
                },
                
            }
        )
    }

    lt(obj,itemAnimate,n){
        let _this = this;
        itemAnimate.fromTo(
            obj,
            n+5,
            {
                x:obj.upX,
                y:obj.upY
            },
            {
                x:0,
                y:obj.upY,
                ease:Power0.easeNone,
                onComplete:function(){
                    obj.reverse = !obj.reverse;
                    _this.rTurn(obj);
                    _this.rightSport(itemAnimate,obj,n);

                },
                
            }
        )
    }

    IsInArray(arr,val){ 
        if(arr!==null){
        　　var testStr=','+arr.join(",")+","; 
        　　return testStr.indexOf(","+val+",")!=-1; 
            
        }
    }
}
export {Fish}