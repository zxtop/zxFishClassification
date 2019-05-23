<template>
    <div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.option1?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option1')" ref="option1Title"></i>
            <span @click="tabShow(index,'option1')">
            小鱼配置
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option1">
           <div class="gam-content" ref="gamContent">
               <div class="fish_out" v-for="(optitem,optindex) in fishs">
                   <div class="game-title" style="margin-top:15px;">
                        <i :class="optitem ?'el-icon-arrow-down':'el-icon-arrow-right'"
                        @click="tabShow_child(optindex)" ref="fishs" :data-off = "true"></i>
                        <span @click="tabShow_child(optindex)">小鱼配置</span>

                        <i @click="changeArr('del',optindex)" class="game-title-icon el-icon-delete"></i>
                        <i @click="changeArr('copy',optindex)" class="game-title-icon el-icon-tickets"></i>
                        <i @click="changeArr('add',optindex)" class="game-title-icon el-icon-plus"></i>
                    </div>
                    
                    <div style="clear:both"></div>
                    <div class="fish_item" ref="fish_item">

                        <!--input-->
                        <el-input placeholder="请输入内容" v-model="optitem.text" size="mini" maxlength="5" @input="setElementStatus(index,'option'+optindex,'text',optitem,$event)">
                            <template slot="prepend"><b>文字 :</b></template>
                        </el-input>

                        <el-input placeholder="请输入0到1之间的小数" v-model="optitem.scale" size="mini" maxlength="5" @input="setElementStatus(index,'option'+optindex,'scale',optitem,$event)">
                            <template slot="prepend"><b>scale :</b></template>
                        </el-input>

                        <!--动画上传-->
                        <div class="upload">

                            <div class="animate-box">
                                <span v-text="optitem.name"></span>
                            </div>

                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改动画</span>
                                    <input type="file" multiple="multiple"
                                        @change="uploadAnimation(index,'option',$event,optindex)">
                                </div>
                            </div>
                        </div>


                        <div style="clear:both"></div>

                        <!--音频上传-->
                        <p class="file-title" style="margin-top:0px;margin-bottom:0px;">音频文件</p>
                        <div style="clear:both"></div>

                        <div class="upload">
                            <div class="animate-box">
                                <!-- 小鱼点击音频名字 -->
                                <span v-text="optitem.audio"></span>
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改音频</span>
                                    <input type="file" multiple="multiple" @change="uploadAudio(index,'option',$event,optindex)">
                                </div>
                            </div>
                        </div>  

                        <div style="clear:both"></div>

                    </div>
               </div>
           </div>



           <!-- 小鱼文字配置 -->

            <div class="game-title" style="margin-top:15px;">
                <i class="el-icon-arrow-down"
                @click="tabShow_child3()" ref="text_title" :data-off = "true"></i>
                <span @click="tabShow_child3()">文字配置</span>
            </div>

            <div class="fish_text" ref="text_out">

                <div class="edit-select">
                    <span>字体 :</span>
                    <el-select v-model="fish_text.fontFamily" placeholder="请选择" size="mini" @input="setFamily(index,fish_text.fontFamily)">
                        <el-option
                                v-for="item in fontFamily"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="edit-select">
                    <span>字号 :</span>
                    <el-select v-model="fish_text.fontSize" placeholder="请选择" size="mini" @input="setSize(index,fish_text.fontSize)">
                        <el-option
                                v-for="item in fontSize"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="edit-select" style="margin-bottom:20px;">
                    <span>颜色 :</span>
                    <el-color-picker v-model="fish_text.color" @input="setColor(index,fish_text.color)"></el-color-picker>
                </div>


            </div>

            <div style="clear:both"></div>

            <!-- 鱼篓配置 -->
            <div class="yulou" v-for="(rtitem,rtindex) in rightAnswers">

                <div class="game-title" style="margin-top:15px;">
                    <i :class="rtitem ?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabShow_child1(rtindex)" ref="yulous" :data-off = "true"></i>
                    <span @click="tabShow_child1(rtindex)">鱼篓配置</span>

                    <i @click="changeArr1('del',rtindex)" class="game-title-icon el-icon-delete"></i>
                    <i @click="changeArr1('copy',rtindex)" class="game-title-icon el-icon-tickets"></i>
                    <i @click="changeArr1('add',rtindex)" class="game-title-icon el-icon-plus"></i>
                </div>

                <div class="yulou_out" ref="yulou_item">
                    <p>答案：</p>
                    <textarea name="" id="" cols="30" rows="5" v-model="rtitem.text"
                            placeholder="请输入答案">
                    </textarea>

                    <!--图片-->
                    <!-- <el-checkbox v-model="testData.checked" size="small">图片</el-checkbox> -->
                    <p>图片：</p>
                    
                    <div style="clear:both"></div>
                    
                    <div class="upload">
                        <div class="img-box">
                            <img :src="resourceData[rtitem.name]" alt="" width="131" height="96">
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改图片</span>
                                <input type="file" @change="uploadImage(index,'rightAnswer',rtindex,$event)">
                            </div>
                        </div>
                    </div>

                    <div class="lockStatus" >
                        <!-- <el-input placeholder="请输入其宽度" v-model="rtitem.width" size="mini" @input.native="setElement(index,'rightAnswer'+rtindex,'width',rtitem,$event)">
                            <template slot="prepend">W :</template>
                        </el-input> -->
                        <el-input placeholder="请输入其宽度" v-model="rtitem.width" size="mini" @input="setElemented(index,'rightAnswer'+rtindex,'width',$event,rtitem.ratio,'image',rtindex)">
                            <template slot="prepend">W :</template>
                        </el-input>

                        <span class="lock_block" :lockRadio="rtitem.ratio"><img :src="rtitem.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusData(rtitem,$event)"></span>
                        <el-input placeholder="请输入其高度" v-model="rtitem.height" size="mini" @input="setElemented(index,'rightAnswer'+rtindex,'height',$event,rtitem.ratio,'image',rtindex)">
                            <template slot="prepend">H :</template>
                        </el-input>
                    </div>

                     <el-input placeholder="请输入其起始x" v-model="rtitem.x" size="mini" @input="setElemented(index,'rightAnswer'+rtindex,'x',$event,rtitem.ratio,'image',rtindex)">
                        <template slot="prepend">X :</template>
                    </el-input>

                    <el-input placeholder="请输入其起始y" v-model="rtitem.y" size="mini" @input="setElemented(index,'rightAnswer'+rtindex,'y',$event,rtitem.ratio,'image',rtindex)">
                        <template slot="prepend">Y :</template>
                    </el-input>

                    <!--动画-->
                    <!-- <el-checkbox v-model="testData.checked" size="small">动画</el-checkbox> -->
                    <p>动画：</p>
                    <div style="clear:both"></div>
                    <div class="upload">
                        <div class="animate-box">
                            <span v-text="rtitem.animate.name"></span>
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改文件</span>
                                <input type="file" multiple="multiple"
                                    @change="uploadAnimation1(index,'rightAnswer',$event,rtindex)">
                            </div>
                        </div>
                    </div>
                    <el-input placeholder="请输入内容" v-model="rtitem.animate.width" size="mini" @input="setElementStatus1(index,'width',rtitem,$event,rtindex,rtitem.animate.ratio)">
                        <template slot="prepend">W :</template>
                    </el-input>
                    <span class="lock_block" :lockRadio="rtitem.animate.radio"><img :src="rtitem.animate.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusData1(rtitem,$event)"></span>
                    <el-input placeholder="请输入内容" v-model="rtitem.animate.height" size="mini" @input="setElementStatus1(index,'height',rtitem,$event,rtindex,rtitem.animate.ratio)">
                        <template slot="prepend">H :</template>
                    </el-input>

                    <el-input placeholder="请输入内容" v-model="rtitem.animate.x" size="mini" @input="setElementStatus1(index,'x',rtitem,$event,rtindex,rtitem.animate.ratio)">
                        <template slot="prepend">X :</template>
                    </el-input>

                    <el-input placeholder="请输入内容" v-model="rtitem.animate.y" size="mini" @input="setElementStatus1(index,'y',rtitem,$event,rtindex,rtitem.animate.ratio)">
                        <template slot="prepend">Y :</template>
                    </el-input>
                    <div style="clear:both"></div>
                    <div style="width:100%;height:20px;"></div>
                </div>

            </div>

            <div style="clear:both"></div>


            <!-- 成功动画 -->
            <div class="game-title" style="margin-top:15px;">
                <i class="el-icon-arrow-down"
                @click="tabShow_child2()" ref="success_an" :data-off = "true"></i>
                <span @click="tabShow_child2()">成功动画配置</span>
            </div>
            <!-- <div style="clear:both"></div>
            <div style="width:100%;height:20px;"></div> -->
            <div class="success_out" ref="success_out">
                <div class="edit-switch" style="margin-left:-42px">
                    <el-switch
                            v-model="success_action.show"
                            active-color="#77DC04"
                            inactive-color="#ff4949">
                    </el-switch>
                    <span>动画</span>

                </div>
                <!-- <el-checkbox v-model="success_action.show" size="small">动画</el-checkbox> -->
                <div style="clear:both"></div>

                <el-input placeholder="请输入内容" v-model="success_action.width" size="mini" @input="setElementStatus2(index,'width',success_action,$event,success_action.ratio)">
                    <template slot="prepend">W :</template>
                </el-input>
                <span class="lock_block" :lockRadio="success_action.radio"><img :src="success_action.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusData(success_action,$event)"></span>

                <el-input placeholder="请输入内容" v-model="success_action.height" size="mini" @input="setElementStatus2(index,'height',success_action,$event,success_action.ratio)">
                    <template slot="prepend">H :</template>
                </el-input>

                <el-input placeholder="请输入内容" v-model="success_action.x" size="mini" @input="setElementStatus2(index,'x',success_action,$event,success_action.ratio)">
                    <template slot="prepend">X :</template>
                </el-input>

                <el-input placeholder="请输入内容" v-model="success_action.y" size="mini" @input="setElementStatus2(index,'y',success_action,$event,success_action.ratio)">
                    <template slot="prepend">Y :</template>
                </el-input>

                <div style="clear:both"></div>

                <div class="upload">
                    <div class="animate-box">
                        <span v-text="success_action.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple"
                                @change="uploadAnimation_success(index,'success_animate',$event)">
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>


</template>
<script>
    import DragElement from 'xes-tem-render/DragElement.js'

    import {CopyAndRender,DeleteEleByName,UploadAndRenderEle,RenderElementByIndex} from 'xes-tem-render'
    export default {
        name: "EditGamePrivate",
        data() {
            return {
                lockImg:this.resourceData['image_lock_on'],
                unLockImg:this.resourceData['image_lock_off'],
                checkbox:false,
                radio:1,
                switchStatus:false,
                audio_name:'',
                image:{
                    "show": true,
                    "x": 0,
                    "y": 0,
                    "lock":false,
                    "width":0,
                    "height":0,
                    "name": "",
                    "ratio":0
                },
                sprite:{
                    "show": false,
                    "x": "500",
                    "y": "0",
                    "name": "",
                    "scale": "1",
                    "loop": false
                },
                animate:{
                    "show": false,
                    "x": "100",
                    "y": "100",
                    "name": "",
                    "scale": "3",
                    "loop": true
                },

                fishs:[], //选项
                rightAnswers:[], //答案
                success_action:null,
                off:true,
                fish_text:null,
                fontFamily: [
                    {
                        label: '微软雅黑',
                        value: 'Microsoft YaHei'
                    },
                    {
                        label: '宋体',
                        value: 'SimSun'
                    },
                    {
                        label: '黑体',
                        value: 'SimHei'
                    }
                ],
                fontSize: [
                    {
                        label: '16px',
                        value: 16
                    },
                    {
                        label: '18px',
                        value: 18
                    },
                    {
                        label: '20px',
                        value: 20
                    },
                    {
                        label: '22px',
                        value: 22
                    },
                    {
                        label: '24px',
                        value: 24
                    },
                    {
                        label: '26px',
                        value: 26
                    },
                    {
                        label: '30px',
                        value: 30
                    },
                    {
                        label: '36px',
                        value: 36
                    },
                    {
                        label: '40px',
                        value: 40
                    },
                    {
                        label: '48px',
                        value: 48
                    },
                    {
                        label: '50px',
                        value: 50
                    },
                    {
                        label: '52px',
                        value: 52
                    },
                    {
                        label: '54px',
                        value: 54
                    }
                ]
            }
        },
        props: [
            "allData",
            "gameData",
            "resourceData",
            "item",
            "index",
            "tabShowStatus"
        ],
        created () {
               this.fishs = this.gameData[this.index].option;
               this.rightAnswers = this.gameData[this.index].rightAnswer;
               this.success_action = this.gameData[this.index].success_animate;
               this.fish_text = this.gameData[this.index].textStyle;
        },
        mounted() {
        },
        methods: {

verifyNumber(number){
                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number)
                };
                let reg = /^\d*\.+$/g;
                if(isNaN(number)){
                    number = 0;
                }
                if(parseFloat(number)>=0){
                    if(isFloat(parseFloat(number))){
                        number = parseFloat(number.split('.')[0]+'.'+number.split('.')[1].substr(0,1));
                    }else{
                        if(reg.test(number)){
                            number = parseFloat(number)+'.';
                        }else{
                            number = number?parseFloat(number):0;
                        }
                    }
                }else{
                    number = 0;
                }
                return number
            },
            setElemented(index,name,attr,e,ratio,type,rtindex){
                let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                let component = componentContainer.getChildByName(name);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                
                let data = this.item.rightAnswer[rtindex];

                if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                        component[attr].set(data[attr]);
                    }
                    else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                            component[attr] = data[attr];
                        }
                        if(attr === 'width'){
                            console.log(data.lock)
                            if(data.lock){
                                // console.log(parseFloat(e)/ratio,ratio)
                                data['height'] = (e/ratio).toFixed(0);
                                component['height'] = data['height'];
                                
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                data['width'] = (e*ratio).toFixed(0);
                                component['width'] = data['width']
                            }
                        }
                    }
                }
            },


            setColor(index,val){
                let box =stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                box.children.map((item,index)=>{
                   
                    if(String(item.name).indexOf('option')!=-1){
                     
                        item.getChildByName('paopao').children[0].style.fill = val;
                    }
                })
            },
            setSize(index,val){
                
                let box =stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                box.children.map((item,index)=>{
                    if(String(item.name).indexOf('option')!=-1){
                        item.getChildByName('paopao').children[0].style.fontSize = val;
                        // console.log(item.getChildByName('paopao').children[0].style.fontSize)
                    }
                })
            },
            setFamily(index,val){
                let box =stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                box.children.map((item,index)=>{
                   
                    if(String(item.name).indexOf('option')!=-1){
                        item.getChildByName('paopao').children[0].style.fontFamily = val;
                    }
                })
                
            },
            uploadAnimation_success(index, name, e) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name].name = res.resourceName;
                    // this.gameData[index][name].animate.animate_name = res.resourceName;
                })
            },
            tabShow_child2(){
                
                let title = this.$refs.success_an;
                let fish_item = this.$refs.success_out;
             
                if(title.getAttribute("data-off") == "true"){
                    title.className = 'el-icon-arrow-right';
                    fish_item.style.display = 'none';
                    title.setAttribute("data-off","false");
                }else{
                    title.className = 'el-icon-arrow-down';
                    fish_item.style.display = 'block';
                    title.setAttribute("data-off","true")
                   
                }
            },

            lockStatusData(item,e){
                //判断当前状态是否锁定
                if(item.show&&item.name){
                    if(item.width&&item.height){
                        if(e.currentTarget.getAttribute('data-lock')==='true'){
                            //锁定状态解除锁定，还原各变量
                            e.currentTarget.setAttribute('data-lock','false');
                            item.ratio = 0;
                            item.lock = false;
                        }else{
                            //未锁定添加锁定，添加变量
                            e.currentTarget.setAttribute('data-lock','true');
                            item.lock = true;
                            item.ratio = parseFloat(item.width)/parseFloat(item.height);
                        }
                    }else{
                        this.$message.error('绑定对象的宽高都不可为空');
                        return
                    }
                }else{
                    this.$message({
                        type: 'warning',
                        message: '舞台未绑定元素!'
                    });
                }
            },

            lockStatusData1(item,e){
                //判断当前状态是否锁定
                if(item.animate.name){
                    if(item.animate.width&&item.animate.height){
                        if(e.currentTarget.getAttribute('data-lock')==='true'){
                            //锁定状态解除锁定，还原各变量
                            e.currentTarget.setAttribute('data-lock','false');
                            item.animate.ratio = 0;
                            item.animate.lock = false;
                        }else{
                            //未锁定添加锁定，添加变量
                            e.currentTarget.setAttribute('data-lock','true');
                            item.animate.lock = true;
                            item.animate.ratio = parseFloat(item.animate.width)/parseFloat(item.animate.height);
                        }
                    }else{
                        this.$message.error('绑定对象的宽高都不可为空');
                        return
                    }
                }else{
                    this.$message({
                        type: 'warning',
                        message: '舞台未绑定元素!'
                    });
                }
            },
            setElementStatus2(index,attr,obj,e,ratio){
                //    let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                //    let component = componentContainer.getChildByName(name);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                
                let data = obj;
                console.log(data,attr)
                // if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                        // component[attr].set(data[attr]);
                    }
                    else{
                        // if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                        //     data[attr] = parseFloat(component[attr]).toFixed(0);
                        //     this.$message.error('输入数值超出范围 应为0-1920');
                        //     return false;
                        // }
                        // if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                        //     data[attr] = parseFloat(component[attr]).toFixed(0);
                        //     this.$message.error('输入数值超出范围 应为0-1920');
                        //     return false;
                        // }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                            // component[attr] = data[attr];
                        }
                        if(attr === 'width'){
                            console.log(data.lock)
                            if(data.lock){
                                // console.log(parseFloat(e)/ratio,ratio)
                                data['height'] = (e/ratio).toFixed(0);
                                // component['height'] = data['height'];
                                
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                data['width'] = (e*ratio).toFixed(0);
                                // component['width'] = data['width']
                            }
                        }
                    }
                // }
                
                
            },
            setElementStatus1(index,attr,obj,e,rtindex,ratio){
            //    let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
            //    let component = componentContainer.getChildByName(name);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                
                let data = this.item.rightAnswer[rtindex].animate;
                console.log(data,attr)
                // if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                        // component[attr].set(data[attr]);
                    }
                    else{
                        // if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                        //     data[attr] = parseFloat(component[attr]).toFixed(0);
                        //     this.$message.error('输入数值超出范围 应为0-1920');
                        //     return false;
                        // }
                        // if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                        //     data[attr] = parseFloat(component[attr]).toFixed(0);
                        //     this.$message.error('输入数值超出范围 应为0-1920');
                        //     return false;
                        // }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                            // component[attr] = data[attr];
                        }
                        if(attr === 'width'){
                            console.log(data.lock)
                            if(data.lock){
                                // console.log(parseFloat(e)/ratio,ratio)
                                data['height'] = (e/ratio).toFixed(0);
                                // component['height'] = data['height'];
                                
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                data['width'] = (e*ratio).toFixed(0);
                                // component['width'] = data['width']
                            }
                        }
                    }
                // }
                
            },
            setElementStatus(index,name,type,obj,e){
                let reg = /[a-zA-Z]/g;
                let box =stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                if(box&&box.getChildByName(name)){
                    switch (type) {
                        case 'left':
                        console.log(e)
                            //  obj.x = parseFloat(e.split('.')[0]+'.'+e.split('.')[1].substr(0,1));
                            // obj.x = parseFloat(e).toFixed(1);

                            if(parseFloat(e)<0||parseFloat(e)>1920){
                                this.$message({
                                type: 'error',
                                message: '输入数值超出范围，应为0-1920'
                                });
                                // obj.x = parseFloat(e).toFixed(1);
                                break;
                                
                            }
                            if(this.isFloat(e)){
                                console.log("ddd")
                                obj.x = parseFloat(e.split('.')[0]+'.'+e.split('.')[1].substr(0,1));
                            }
                            
                            if(reg.test(e)){
                                obj.x = parseFloat(e.replace(/\s/g,"").replace(/[a-zA-Z]/g,"").toLowerCase()).toFixed(1);
                            }
                          
                            // obj.x = e==''?0:parseFloat(e).toFixed(1);
                            box.getChildByName(name).x = obj.x;
                            // console.log(e)
                            break;
                        case 'top':
                            if(parseFloat(e)<0||parseFloat(e)>1080){
                                this.$message({
                                type: 'error',
                                message: '输入数值超出范围，应为0-1920'
                                });
                                obj.y = parseFloat(e).toFixed(1);
                               break;
                            }
                            if(this.isFloat(e)){
                                obj.y = parseFloat(e.split('.')[0]+'.'+e.split('.')[1].substr(0,1));
                            }
                            if(reg.test(e)){
                                obj.y = parseFloat(e.replace(/\s/g,"").replace(/[a-zA-Z]/g,"").toLowerCase()).toFixed(1);
                            }
                            box.getChildByName(name).y = obj.y;
                            break;
                        case 'width':
                            // console.log(index,name,type,obj,e);
                            if(parseFloat(e)<0||parseFloat(e)>1920){
                                this.$message({
                                type: 'error',
                                message: '输入数值超出范围，应为0-1920'
                                });
                                obj.width = parseFloat(e).toFixed(1);
                                break;
                            }
                            if(this.isFloat(e)){
                                obj.width = parseFloat(e.split('.')[0]+'.'+e.split('.')[1].substr(0,1));
                            }
                            if(reg.test(e)){
                                obj.width = parseFloat(e.replace(/\s/g,"").replace(/[a-zA-Z]/g,"").toLowerCase()).toFixed(1);
                            }
                            box.getChildByName(name).width = obj.width;
                            obj.radio?box.getChildByName(name).height = (parseFloat(e)/obj.radio).toFixed(1):"";
                            if(e){

                                obj.radio?obj.height = (parseFloat(e)/obj.radio).toFixed(1):"";
                            }
                            // console.log(obj.radio)
                            break;
                        case 'height':
                            if(parseFloat(e)<0||parseFloat(e)>1080){
                                this.$message({
                                type: 'error',
                                message: '输入数值超出范围，应为0-1080'
                                });
                                obj.height = parseFloat(e).toFixed(1);
                                break;
                            }
                            if(this.isFloat(e)){
                                obj.height = parseFloat(e.split('.')[0]+'.'+e.split('.')[1].substr(0,1));
                            }
                            if(reg.test(e)){
                                obj.height = parseFloat(e.replace(/\s/g,"").replace(/[a-zA-Z]/g,"").toLowerCase()).toFixed(1);
                            }
                            box.getChildByName(name).height = obj.height;
                            obj.radio?box.getChildByName(name).width = (parseFloat(e)*obj.radio).toFixed(1):"";
                            if(e){
                                obj.radio?obj.width = (parseFloat(e)*obj.radio).toFixed(1):"";
                            }
                            break;
                        case 'scale':
                            let value = e==''?0:parseFloat(e);
                            box.getChildByName(name).scale.set(value)
                            break;
                        case 'text':

                            let text = e==''?'':e;
                            // console.log(box.getChildByName(name));
                            
                            let text_w = box.getChildByName(name).getChildByName('paopao').children[0].width;
                            let text_h = box.getChildByName(name).getChildByName('paopao').children[0].height;
                            let text_base = text_w/text_h;

                            let pao_w = box.getChildByName(name).getChildByName('paopao').width;
                            let pao_h = box.getChildByName(name).getChildByName('paopao').height;
                            let pao_base = pao_w/pao_h;

                            let pao = box.getChildByName(name).getChildByName('paopao');

                            box.getChildByName(name).getChildByName('paopao').children[0].text = text;
                            if(text.length <= 2){
                                pao.scale.set(1,1);
                                box.getChildByName(name).getChildByName('paopao').children[0].style.fontSize = '48px';

                            }

                            if(text.length >= 3){
                                box.getChildByName(name).getChildByName('paopao').children[0].style.fontSize = '24px';
                                pao.scale.set(1.5,1.5);
                            }

                            // pao.scale.set(text_base,text_base);
                            console.log('lllllllll',text.length);
                            // console.log('文字的长度',text_w);
                            // console.log('文字的高度',text_h);
                            // console.log('宽/高',text_base);

                            break;
                        default:
                            break;
                    }
                }
            },
            isFloat(n){
                return /^-?\d*\.\d+$/.test(n);
            },
            // index,'rightAnswer'+rtindex,'width',rtitem,$event
            setElement(index,name,type,attr,e){
                let box =stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                let component = box.getChildByName(name);
                console.log(type === 'x');
                let reg1 = /[a-z]/i;
                // console.log(reg.test(e.data),String(attr[type]).split('.'))
                console.log(e)
                if(reg1.test(attr[type])){
                   attr[type] = attr[type]?parseFloat(attr[type]).toFixed(1):0;
                }
                if(type === 'scale'){
                    if(this.isFloat(attr[type])){
                        attr[type] = parseFloat(attr[type]).toFixed(1);
                    }
                    component[type].set(attr[type]);
                }else{
                    if(type === 'x'){
                        if(attr[type] > 1920 || attr[type] <0){
                            attr[type] = component[type]
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return
                        }
                    }
                    if(type === 'y'){
                        if(attr[type] > 1080 || attr[type] <0){
                            attr[type] = component[type]
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return
                        }
                    }
                    if(type === 'width'){
                        if(attr[type] > 1920 || attr[type] <0){
                            attr[type] = component[type]
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return
                        }else{
                            component.width = attr.width ==''?0:parseFloat(attr.width).toFixed(1);                                

                            attr.radio?component.height = (parseFloat(attr.width)/attr.radio).toFixed(1):"";
                            if(attr[type]){
                                attr.radio?attr.height = (parseFloat(attr.width)/attr.radio).toFixed(1):"";
                            }

                        }
                    }else if(type === 'height'){
                        if(attr[type] > 1080 || attr[type] <0){
                            attr[type] = component[type]
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return
                        }else{
                            component.height = attr.height==''?0:parseFloat(attr.height).toFixed(1);                                
                            attr.radio?component.width = (parseFloat(attr.height)*attr.radio).toFixed(1):"";
                            if(attr[type]){
                                attr.radio?attr.width = (parseFloat(attr.height)*attr.radio).toFixed(1):"";
                            }

                        }
                    }
                    if(attr.radio!=0&&(type === 'width'||type === 'height')){
                        
                        if(this.isFloat(attr[type])){
                            
                            attr[type] = parseFloat(attr[type]).toFixed(1);
                        }

                        
                    }else{
                        if(this.isFloat(attr[type])){
                            attr[type] = parseFloat(attr[type].split('.')[0]+'.'+attr[type].split('.')[1].substr(0,1));
                        }
                        if((type == 'x'||type == 'y')&&attr[type]<0){
                            attr[type] = component[type];
                        }
                        var reg = /^\d*\.+$/g;
                        if(attr[type]&&reg.test(attr[type])){
                            attr[type] = parseFloat(attr[type])+'.';
                        }else{
                            attr[type] = attr[type]?parseFloat(attr[type]):0;
                        }
                        component[type] = parseInt(attr[type]);
                    }
                }
            },


            uploadAnimation1(index, name, e,optindex) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name][optindex].animate.name = res.resourceName;
                    // this.gameData[index][name].animate.animate_name = res.resourceName;
                })
            },
            tabShow_child1(index){
                
                let title = this.$refs.yulous[index];
                let fish_item = this.$refs.yulou_item[index];
             
                if(title.getAttribute("data-off") == "true"){
                    title.className = 'el-icon-arrow-right';
                    fish_item.style.display = 'none';
                    title.setAttribute("data-off","false");
                }else{
                    title.className = 'el-icon-arrow-down';
                    fish_item.style.display = 'block';
                    title.setAttribute("data-off","true")
                   
                }
            },
            changeArr1(type, index) {
                let self = this;
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.rightAnswers[0]));
                    resetArr(arr);
                    arr.width = 0;
                    arr.height = 0;
                    arr.x = 0;
                    arr.y = 0;
                    arr.lockImg = 'image_lock_off';
                    this.gameData[this.index].rightAnswer.push(arr);
                    this.$nextTick(function(){
                       // console.log(self.$refs.gamContent);
                    })
                }
                else if (type === 'copy') {
                    let data = JSON.parse(JSON.stringify(this.gameData[this.index].rightAnswer[index]))
                    data.x = 0;
                    data.y = 0;
                    this.gameData[this.index].rightAnswer.push(data);
                    this.gameData[this.index].rightAnswer.forEach((item,idx)=>{
                        item.componentName = 'rightAnswer'+idx;
                    })
                    RenderElementByIndex(this.index,this.allData);
                }
                else if (type === 'del') {

                    if(this.gameData[this.index].rightAnswer.length>1){
                        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                        this.gameData[this.index].rightAnswer.splice(index, 1);
                        this.gameData[this.index].rightAnswer.forEach((item,idx)=>{
                            item.componentName = 'rightAnswer'+idx;
                        })
                        RenderElementByIndex(this.index,this.allData);
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });
                        
                    }else{
                        alert("就剩一个鱼篓了")
                    }
                }
            },
            tabShow_child3(){
                
                let title = this.$refs.text_title;
                let fish_item = this.$refs.text_out;
             
                if(title.getAttribute("data-off") == "true"){
                    title.className = 'el-icon-arrow-right';
                    fish_item.style.display = 'none';
                    title.setAttribute("data-off","false");
                }else{
                    title.className = 'el-icon-arrow-down';
                    fish_item.style.display = 'block';
                    title.setAttribute("data-off","true")
                   
                }
            },
            setImageLock(){
                this.image.lock = !this.image.lock;
                if(!this.image.height||!this.image.width){
                    this.$message({
                        message: 'X或Y为0或为空 无法计算比例',
                        type: 'warning'
                    });
                    return;
                }
                if(this.image.lock){
                    this.image.ratio = this.image.width/this.image.height;
                }
            },
            setAttr(name,attr){
                if(this.image.ratio>0&&(attr === 'width'||attr === 'height')&&this.image.lock){
                    if(attr === 'width'){
                        console.log(this.image.width,this.image.ratio);
                        this.image.height = this.image.width/this.image.ratio;
                    }else if(attr === 'height'){
                        this.image.width = this.image.height*this.image.ratio;
                    }
                }
            },
            tabShow(index, name) {
                let title = this.$refs[name + 'Title'];
                let nameTab = this.tabShowStatus[index].child[name];
                if (nameTab) {
                    this.tabShowStatus[index].child[name] = false;
                    title.className = 'el-icon-arrow-right'
                } else {
                    Object.keys(this.tabShowStatus[index].child).forEach((item, index1) => {
                        this.tabShowStatus[index].child[item] = false
                    })
                    this.tabShowStatus[index].child[name] = true;
                    title.className = 'el-icon-arrow-down'
                }
            },
            verifyAnimationFiles(filesArr) {
                let arr = Object.values(filesArr).map((item, index) => item.name);
                let extArr = [];
                let nameArr = arr.map((item)=>{
                    extArr.push(item.split('.')[1]);
                    return item.split('.')[0]
                });
                let extArrString = extArr.sort((a,b)=>a.length-b.length).toString();
                let extTestArrString = ["png", "json", "atlas"].toString();
                let testName = nameArr[0];
                let nameStatus = nameArr.every((item,index)=>{
                    return testName === item
                });
                let extStatus = extArrString === extTestArrString;
                return nameStatus&&extStatus;
            },
            verifySpriteFiles(filesArr) {
                let arr = Object.values(filesArr).map((item, index) => item.name);
                let extArr = [];
                let nameArr = arr.map((item)=>{
                    extArr.push(item.split('.')[1]);
                    return item.split('.')[0]
                });
                let extArrString = extArr.sort((a,b)=>a.length-b.length).toString();
                let extTestArrString = ["png", "json"].toString();
                let testName = nameArr[0];
                let nameStatus = nameArr.every((item,index)=>{
                    return testName === item
                });
                let extStatus = extArrString === extTestArrString;
                return nameStatus&&extStatus;
            },
            uploadImage(index, name, ids, e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length-1];
                let extArr = ['jpg','png'];
                if(extArr.indexOf(ext) === -1){
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                // console.log(e.target.files[0]);
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0],
                        render:true,
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    if(name === 'rightAnswer'){
                        this.gameData[this.index].rightAnswer[ids].name = res.resourceName;
                        this.gameData[this.index].rightAnswer[ids].componentName = name+ids;
                        this.gameData[this.index].rightAnswer[ids].width = res.width;
                        this.gameData[this.index].rightAnswer[ids].height = res.height;
                        this.gameData[this.index].rightAnswer[ids].x?"":this.gameData[this.index].rightAnswer[ids].x = 0;
                        this.gameData[this.index].rightAnswer[ids].y?"":this.gameData[this.index].rightAnswer[ids].y = 0;
                        UploadAndRenderEle(this.index,name+ids,res,this.allData,'','');
                    }
                    e.target.value = '';
                    this.updateResourceData();
                })
            },

            
            uploadAnimation(index, name, e,optindex) {
                if (e.target.files.length === 0 || e.target.files.length !== 3){
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                if(!this.verifyAnimationFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let type = 'Animate';
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    if(name === 'option'){
                        this.gameData[index][name][optindex].name = res.resourceName;
                        let text = this.gameData[index][name][optindex].text;
                        let text_bg = this.gameData[index][name][optindex].text_bg;
                        UploadAndRenderEle(this.index,name+optindex,res,this.allData,text,text_bg);
                    }
                    e.target.value = '';
                    this.updateResourceData();
                })
            },


            uploadSprite(name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 2) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                if(!this.verifySpriteFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['sprite' + (index + 1)] = item;
                });
                console.log(object);
                this.$http.post('/uploadingSprite', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.sprite.name = res.resourceName;
                    e.target.value = '';
                })
            },
            uploadAudio(index,name,e,optindex) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['mp3', 'wav'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name][optindex].audio = res.resourceName;
                    e.target.value = '';
                })
            },
            updateResourceData() {
                this.$emit('updateResourceData')
            },

            tabShow_child(index){
                
                let title = this.$refs.fishs[index];
                let fish_item = this.$refs.fish_item[index];
             
                if(title.getAttribute("data-off") == "true"){
                    title.className = 'el-icon-arrow-right';
                    fish_item.style.display = 'none';
                    title.setAttribute("data-off","false");
                }else{
                    title.className = 'el-icon-arrow-down';
                    fish_item.style.display = 'block';
                    title.setAttribute("data-off","true")
                   
                }
            },

            changeArr(type, index) {
                let self = this;
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.fishs[0]));
                    resetArr(arr);
                    arr.audio = this.fishs[0].audio;
                    arr.text_bg = this.fishs[0].text_bg;
                    arr.text = '';
                    arr.x = 0;
                    arr.y = 0;
                    this.gameData[this.index].option.push(arr);
                    // console.log(arr,this.fishs[0]);
                    this.gameData[this.index].option.forEach((item,idx)=>{
                        item.componentName = 'option'+idx;
                    })
                    this.$nextTick(function(){
                       // console.log(self.$refs.gamContent);
                    })
                }
                else if (type === 'copy') {
                    let datat = JSON.parse(JSON.stringify(this.gameData[this.index].option[index]))
                    datat.x = 0;
                    datat.y = 0;
                    this.gameData[this.index].option.push(datat);
                    this.gameData[this.index].option.forEach((item,idx)=>{
                        item.componentName = 'option'+idx;
                    })
                    RenderElementByIndex(this.index,this.allData);

                }
                else if (type === 'del') {
                    // this.$message('成功删除一条小鱼');
                    if(this.gameData[this.index].option.length>1){
                        

                    this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                    this.gameData[this.index].option.splice(index,1)
                    this.gameData[this.index].option.forEach((item,idx)=>{
                        item.componentName = 'option'+idx
                    })
                    RenderElementByIndex(this.index,this.allData);

                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });


                    }else{
                        alert("就剩一条小鱼了")
                    }
                }
            },

        }
    }
</script>
<style scoped lang="scss">
.edit .upload{margin-bottom: 20px;}
.edit .el-input-group{float:none;width:44%;}
     h4,p{color: #fff;}
    .fish{border: 1px solid #ccc}
    /* .fish_out{background: #303133;} */
    .fish_out b{color: red}
    .option-item {
        border-top:1px solid #ccc;
        overflow: hidden;
        width: 100%;
        margin-top: 15px;
        float: left;
        &:nth-of-type(1){
            border: none;
        }
    }
    .game-icon {
        height: 40px;
        line-height: 40px;
        color: #fff;
        float: left;
        width: 100%;
    }
    .audio-title{
        margin-top: 15px;
        margin-bottom: 0;
        float: left;
        padding: 0 5px;
    }
    .option-animate{
        color: #eee;
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
        padding-bottom: 10px;
        overflow: hidden;
        .option-animate-radio{
            >label{
                margin: 5px 0;
            }
        }
        .option-animate-title{
            margin-bottom: 15px;
            margin-top: 10px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-animate-radio{
            margin: 5px 0;
            >label{
                width: 50%;
            }
        }
    }
    .option-audio{
        color: #eee;
        .option-audio-title{
            margin-bottom: 10px;
            margin-top: 10px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-audio-inner{
            padding-left: 15px;
        }
    }
</style>