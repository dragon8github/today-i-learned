/**
 * 数字每隔三位加逗号
 * @param {*} num 
 * 如：
 * formattedNumber(1000) => 1,000
 */
export function formattedNumber(num) {
    var num = (num || 0).toString();
    var result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

/**
 * 设配大屏
 * @param {*} pcSize 
 * @param {*} wallSize 
 */
export function adaptaWall(pcSize = 16, wallSize){
    if(wallSize){
        return window.innerWidth > 5000 ? wallSize : pcSize;
    }
    return window.innerWidth > 5000 ? pcSize*3 : pcSize;
}

/**
 * 用于滚动到底部就开始加载数据
 * @param {*} e 
 * @param {*} callBack 
 * 调用：
 * <ul @scroll="scrollFun($event, 'nextFun')"></ul>
 */
export function scrollFun(e, callBack = null){
    let target = e.target;
    // 可见高度
    let viewH = target.offsetHeight;
    // 内容高度
    let contentH = target.scrollHeight;
    //滚动高度
    let scrollTop = target.scrollTop;
    //当滚动到距离底部5%时
    if(scrollTop/(contentH -viewH) >= 0.95){ 
        this[callBack] && this[callBack]()
    }
}

//js 加法计算
//调用：accAdd(arg1,arg2)
//返回值：arg1加arg2的精确结果
export function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return ((arg1*m+arg2*m)/m);
}
		
//js 减法计算
//调用：Subtr(arg1,arg2)
//返回值：arg1减arg2的精确结果
export function Subtr(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m);
}
 
//js 乘法函数
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
export function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
 
//js 除法函数
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
export function accDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    // while(Math){
        r1=Number(arg1.toString().replace(".",""))
        r2=Number(arg2.toString().replace(".",""))
        return (r1/r2)*Math.pow(10,t2-t1);
    // }
}
