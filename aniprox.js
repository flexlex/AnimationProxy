function aniprox(dur, fx) {
    if(!("requestAnimationFrame" in window)){
        requestAnimationFrame = mozAnimationFrame || oRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || function(fx){setTimeout(fx,16);}
    }
    var rap = function(i,v,x){return (v-i)/(x-i);}
    var start = new Date().getTime(), end = new Date(start + dur), now;
    var aframe = function()
    {
        var now = new Date().getTime(),r = rap(start,now,end);
        if(r >= 1){fx(1);return;}
        fx(r);
        requestAnimationFrame(aframe);
    };
    requestAnimationFrame(aframe);
}

Element.prototype.aniprox = function(dur,easing,concat){
    var xy = function(rap){
        return Math.pow(rap,1/1.5);
    }
    if(easing!==undefined && typeof easing == "string" && easing.length > 0)
    {
        switch(easing){
            case "linear":case "l":case "normal":
                xy = function(rap){return rap;}
                break;
            case "default":case "d":
                xy = function(rap){return rap;}
                break;
            case "sinus":case "sin":case "s":
                xy = function(rap){return Math.sin(rap*Math.PI/2);}
                break;
            case "quad":case "speedgain":case "sg":case "pow":
                xy = function(rap){return Math.pow(rap,2);}
                break;
            case "cool":case "aniprox":case "ap":case "powsin":
                xy = function(rap){return Math.pow(Math.sin(rap*Math.PI/2),2);}
                break;
            case "cool-i":case "aniprox-i":case "ap-i":case "powsin-i":
                xy = function(rap){return Math.pow(Math.sin(rap*Math.PI/2),1/2);}
                break;
            case "square":case "sqrt":case "squareroot":case "sr":
                xy = function(rap){return Math.sqrt(rap);}
                break;
        }
    }
    else if(easing!==undefined && typeof easing == "function" && "apply" in easing)
    {
        xy = easing;
    }
    var ele = this;
    var styles = getComputedStyle(ele);
    styles.scrollTop = ele.scrollTop;
    var changeObjects = {concat:concat}, lol;
    var changes = {};
    var anis = [];
    var anitypes={
        size:0,
        ratio:1,
        numeric:2
    };
    var unit = "";
    var up = function(rap){
        for(lol in changeObjects)
        {
            if(lol in styles && !(lol in changes))
            {
                var t = anitypes.size;
                if(lol == "opacity")
                {
                    t = anitypes.ratio;
                }
                if(lol == "scrollTop")
                {
                    t = anitypes.numeric;
                    var v = changeObjects[lol];
                    if(v == "bottom" || v=="end")
                    {
                        changeObjects[lol]=ele.scrollHeight-ele.offsetHeight;
                    }
                    else if(v == "top" || v=="start")
                    {
                        changeObjects[lol]=0;
                    }
                    else if(v == "mid" || v=="middle")
                    {
                        changeObjects[lol]=(ele.scrollHeight/2-ele.offsetHeight/2);
                    }
                    else if(v.indexOf("%")!==-1)
                    {
                        var i = parseFloat(v)/100;
                        changeObjects[lol]=(ele.scrollHeight-ele.offsetHeight)*i;
                    }
                }
                changes[lol]=[parseFloat(styles[lol]),parseFloat(changeObjects[lol])-parseFloat(styles[lol]),"px",t];
            }
        }
        for(lol in changes)
        {
            if(lol == "scrollTop")
            {
                var v = xy(rap)*changes[lol][1]+changes[lol][0]
                console.log(xy(rap),changes[lol][1],changes[lol][0]);
                console.log(v);
                ele.scrollTop = v;
                continue;
            }
            switch(changes[lol][3])
            {
                case anitypes.size:
                    unit = changes[lol][2];
                    break;
                case anitypes.ratio:
                case anitypes.numeric:
                    unit=0;
                    break;
            }
            ele.style[lol]=(xy(rap)*changes[lol][1]+changes[lol][0])+unit;
        }
    };
    aniprox(dur,up);
    setTimeout(up,0);
    return changeObjects;
};