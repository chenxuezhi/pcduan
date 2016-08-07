
var utils = {
    //把类数组转化成数组
    listToArray : function (likeArray){
        try{
            return Array.prototype.slice.call(likeArray,0);
        }catch(e){
            var a = [];
            for(var i=0; i<likeArray.length; i++){
                a[a.length] = likeArray[i];
            }
            return a;
        }
    },
    //解析json字符串
    jsonParse : function (jsonStr){
        if('JSON' in window){
            return JSON.parse(jsonStr);
        }else{
            return eval('('+jsonStr+')');
        }
    },
    //offset获取ele到body的偏移量
    offset : function (ele){
        var offsetParent = ele.offsetParent;
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t +=  ele.offsetTop;
        while(offsetParent){
            l += offsetParent.clientLeft + offsetParent.offsetLeft;
            t +=  offsetParent.clientTop + offsetParent.offsetTop;
            offsetParent = offsetParent.offsetParent;
        }
        return {left:l,top:t};
    },

    win : function (attr,val){
        if(typeof val != 'undefined'){
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    },
    getCss : function (ele,attr){
        var val = null;
        if('getComputedStyle' in window){
            val = window.getComputedStyle(ele,null)[attr];
        }else{
            if(attr === 'opacity'){
                val = ele.currentStyle['filter'];

                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                if(reg.test(val)){
                    val = reg.exec(val)[1]/100;
                }else{
                    val = 1;
                }

            }else{
                val = ele.currentStyle[attr];
            }

        }

        var regDanwei = /^-?\d+(\.\d+)?(px|pt|em|rem|deg)?$/;
        val = regDanwei.test(val) ? parseFloat(val) : val;
        return val;
    },
    setCss : function (ele,attr,val){

        if(attr == 'opacity'){
            var userAgent = window.navigator.userAgent;
            var reg = /MSIE (7|8)/;
            if(reg.test(userAgent)){
                ele['style']['filter'] = 'alpha(opacity=' + val*100 + ')';
            }else{
                ele['style'][attr] = val;
            }
            return;
        }
        if(attr == 'float'){
            ele['style']['cssFloat'] = val;
            ele['style']['styleFloat']=val;
            return;
        }

        var reg = /^width|height|left|top|bottom|right|(margin|padding)(Left|Bottom|Right|Top)?$/; //后面的Left Bottom Right Top可以出现可以不出现
        if(reg.test(attr)){
            if(!isNaN(val)){
                val += 'px';
            }
        }
        ele['style'][attr] = val;
    },
    setGroupCss: function (ele,options){
        options = options ||  [];
        if(options.toString() == '[object Object]'){
            for(var attr in options){
                if(options.hasOwnProperty(attr)){
                    this.setCss(ele,attr,options[attr]);
                }
            }
        }
    },
    getElementsByClass : function (strClass,context){
        context = context || document;
        if('getComputedStyle' in window){
            return context.getElementsByClassName(strClass);
        }

        var ary = [];
        var nodeList = context.getElementsByTagName('*');
        var classArray = strClass.replace(/^ +| +$/g,'').split(/ +/g);
        for(var i=0; i<nodeList.length; i++){
            var culTag = nodeList[i];
            var flag = true;
            for(var j=0; j<classArray.length; j++){
                var curClass = classArray[j];
                var reg = new RegExp('\\b'+curClass+'\\b');
                if(!reg.test(culTag.className)){
                    flag = false;
                    break;
                }
            }
            if(flag){
                ary.push(culTag);
            }
        }
        return ary;
    }
};

