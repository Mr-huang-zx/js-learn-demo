
//对象浅拷贝转深拷贝封装
function toCopy(nullObj,copyObj) { 
    var o =nullObj;
    for(var key in copyObj){
        if(typeof copyObj[key] ==='object'){ //判断要拷贝的对象里面有没有对象//对象和数组的类型都是object
            o[key] = (copyObj[key].constructor==Array)?[]:{}   //因为数组和对象通过typeof都是object 所以用过.constructor具体判断是数组还是对象
            toCopy(O[key],copyObj[key]) //实现递归
        }else{
            o[key] =copyObj[key] //里面的不是对象
        }
    }
    return o
 }

 //图片放大镜
//注意。 左边小的div的大小是大的div的大小的几倍，那么右边图片的大小也要是左边图片大小的几倍,然后右图距离右边盒子的距离也要是5倍
 var bigger = {
    selector: function $(name) {
        return document.querySelector(name)
    },
    bind: function () {
        this.locat = this.selector('.left_div') //左边外面的盒子
        this.small_box = this.selector('.small_div') //左边小盒子
        this.right_div = this.selector('.right_div') //右边盒子名字
        this.right_img = this.selector('.right_img') //右边图片

        var that =this
        this.locat.onmousemove = function (event) {


            that.small_box.style.display = 'block'
            that.right_div.style.display = 'block'
            var top = event.clientY - that.small_box.offsetHeight / 2
            var left = event.clientX - that.small_box.offsetWidth / 2
            var w = that.locat.offsetWidth - that.small_box.offsetWidth
            var h = that.locat.offsetHeight - that.small_box.offsetHeight


            //超出范围时    
            if (top > h) {
                top = h
            }
            if (left > w) {
                left = w
            }
            if (top < 0) {
                top = 0
            }
            if (left < 0) {
                left = 0
            }
            that.small_box.style.left = left + "px" //获取小盒子距离左边的距离
            that.small_box.style.top = top + "px" //获取小盒子距离上边的距离
            that.right_img.style.left = -(left * 5) + "px" //获取小盒子距离左边的距离
            that.right_img.style.top = -(top * 5) + "px" //获取小盒子距离上边的距离
        }

        this.locat.onmouseleave = function (event) {
            that.small_box.style.display = 'none'
            that.right_div.style.display = 'none'
        }
    }
}

//统计图封装
//id 容器的id名
//type 图标类型 在series中的type设定
//xAxisData x轴数据 传入的是个字符串数组
//yAxisData y轴数据 传入的是个字符串数组
//

var echartss ={
    option : {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        color: ['#5b9bd5','#ed7d31'],
        legend: {
            data:['降水量','平均温度']
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '水量',
                max: function(value) {
                    if(Math.abs(value.max) > Math.abs(value.min)){
                        return (Math.abs(value.max)).toFixed(2);
                    }else{
                        return (Math.abs(value.min)).toFixed(2);
                    }
                },
                min: function(value) {
                    if(Math.abs(value.max) > Math.abs(value.min)){
                        return (-Math.abs(value.max)).toFixed(2);
                    }else{
                        return (-Math.abs(value.min)).toFixed(2);
                    }
                },
                axisLabel: {
                    margin: 2,
                    formatter: function (value, index) {
                        if (value > 0) {
                            value = value + "ml";
                        } else {
                            value = "";
                        }
                        return value;
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:'rgba(91,155,213,0.3)',
                        type:'solid'
                    }
                }
            },
            {
                type: 'value',
                name: '温度',
                max: function(value) {
                    if(Math.abs(value.max) > Math.abs(value.min)){
                        return (Math.abs(value.max)).toFixed(2);
                    }else{
                        return (Math.abs(value.min)).toFixed(2);
                    }
                },
                min: function(value) {
                    if(Math.abs(value.max) > Math.abs(value.min)){
                        return (-Math.abs(value.max)).toFixed(2);
                    }else{
                        return (-Math.abs(value.min)).toFixed(2);
                    }
                },
                axisLabel: {
                    formatter: '{value} °C'
                },
                splitLine:{
                    lineStyle:{
                        color:'rgba(237,125,49,0.3)',
                        type:'solid'
                    }
                }
            }
        ],
        series: [
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                label: {
                    normal: {
                        show: true,            //显示数字
                        position: 'top'       //这里可以自己选择位置
                    }
                }
            },
            {
                name:'平均温度',
                type:'line',
                yAxisIndex: 1,
                data:[2.0, -2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
                label: {
                    normal: {
                        show: true,            //显示数字
                        position: 'top'       //这里可以自己选择位置
                    }
                }
            }
        ]
    },
    allDatas:function(id,type,xAxisData,yAxisData){
        var myChart = echarts.init(id);
        this.option.series[0].type =type;
        this.option.xAxis[0].data =xAxisData
        this.option.yAxis[0].data =yAxisData

        myChart.setOption(this.option);
    }
}

//金额转换成大写
function changeMoneyToChinese(money) {
    var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
    var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
    var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字

    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义
    if (money == "") {
        return "";
    }
    money = parseFloat(money);
    if (money >= maxNum) {
        $.alert('超出最大处理数字');
        return "";
    }
    if (money == 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = '';
    } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
        zeroCount = 0;
        IntLen = IntegerNum.length;
        for (i = 0; i < IntLen; i++) {
            n = IntegerNum.substr(i, 1);
            p = IntLen - i - 1;
            q = p / 4;
            m = p % 4;
            if (n == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    ChineseStr += cnNums[0];
                }
                zeroCount = 0; //归零
                ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                ChineseStr += cnIntUnits[q];
            }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
    }
    if (DecimalNum != '') { //小数部分
        decLen = DecimalNum.length;
        for (i = 0; i < decLen; i++) {
            n = DecimalNum.substr(i, 1);
            if (n != '0') {
                ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (ChineseStr == '') {
        ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (DecimalNum == '') {
        ChineseStr += cnInteger;
    }
    return ChineseStr;
}

// 金额加,
function toMoney(a) {
    a = a.toString().replace(/\$|\,/g, '');
    if (isNaN(a)) {
        a = "0";
    }
    let sign = (a == (a = Math.abs(a)));
    a = Math.floor(a * 100 + 0.50000000001);
    let cents = a % 100;
    a = Math.floor(a / 100).toString();
    if (cents < 10) {
        cents = "0" + cents
    }
    for (var i = 0; i < Math.floor((a.length - (1 + i)) / 3); i++) {
        a = a.substring(0, a.length - (4 * i + 3)) + ',' + a.substring(a.length - (4 * i + 3));
    }

    return (((sign) ? '' : '-') + a + '.' + cents);
}

// 高德地图
// mapId 装地图容器的ID名
// mapFunction 返回地理信息
function GDMap(mapId,mapFunction) {
    var mapObj = new AMap.Map(mapId);
    mapObj.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //显示定位按钮，默认：true
            buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', mapFunction); //返回定位信息
        // AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
    });
}
// 高德地图根据经纬度获取城市名
// lng:传入的经度
// lat:传入的纬度
// returnAddress(address) 获取成功后回调的函数
function LngLatToAddress(lng, lat) {
    var lnglatXY = [lng, lat];// 地图上所标点的坐标
    AMap.service('AMap.Geocoder', function() {// 回调函数
        geocoder = new AMap.Geocoder({});
        geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                var address = result.regeocode.formattedAddress;
                // console.log(address);
                returnAddress(address)
            } else {
            }
        });
    });
}

// ajax封装
var getJSON =function(url,type,data=null){
    var p =new Promise(function(resolve,reject){
        var xmlHttp =new XMLHttpRequest();
        xmlHttp.open(type,url);
        if(type=="get"){
            xmlHttp.send()
        }else{
            xmlHttp.setRequestHeader('')
            xmlHttp.send(JSON.stringify(data))
        }
        xmlHttp.responseType ="json" ;//响应的数据类型
        // 监听状态
        xmlHttp.onreadystatechange =function(){
            if(xmlHttp.readyState !==4) return
            if(xmlHttp.status===200){
                resolve(xmlHttp.response)
            }else{
                reject(xmlHttp.statusText)
            }
        }
    })
    return p
}

// form表单提交植入自定义数组
// 使用直接var formda = $("#table").serializeJson()
//          formda.list=[{},{}]
$.fn.serializeJson = function() {
    var serializeObj = {};
    var array = this.serializeArray();
    $(array).each(function() { // 遍历数组的每个元素 
        if (serializeObj[this.name]) { // 判断对象中是否已经存在 name，如果存在name 
            if ($.isArray(serializeObj[this.name])) {
                serializeObj[this.name].push(this.value); // 追加一个值 hobby : ['音乐','体育'] 
            } else {
                serializeObj[this.name] = [serializeObj[this.name], this.value];
            }
        } else {
            serializeObj[this.name] = this.value; // 如果元素name不存在，添加一个属性 name:value 
        }
    });
    return serializeObj;
}

// 单文件上传回显
function showFile(inputId,imgId){
    var iptId = document.getElementById(inputId)
    var imgId = document.getElementById(imgId)
    iptId.onchange=function(e){
        var file =e.target.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload =function(e){
            imgId.src = e.target.result
        }
    }

}
// 实时获取当前时间
function getlocation(containId){
    setInterval(function() {
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var mon = date.getMonth() + 1; //获取当前月份   
        var da = date.getDate(); //获取当前日   
        var day = date.getDay(); //获取当前星期几   
        var h = date.getHours(); //获取小时   
        var m = date.getMinutes(); //获取分钟   
        var s = date.getSeconds(); //获取秒   
        var d = document.getElementById(containId);

    //判断当数字小于等于9时 显示 01 02 ----- 08 09
        if (mon >= 1 && mon <= 9) {
            mon = "0" + mon;
        }
        if (da >= 0 && da <= 9) {
            da = "0" + da;
        }
        if (h >= 0 && h <= 9) {
            h = "0" + h;
        }

        if (m >= 0 && m <= 9) {
            m = "0" + m;
        }

        if (s >= 0 && s <= 9) {
            s = "0" + s;
        }

        d.innerHTML = year + '-' + mon + '-' + da + ' ' + h + ':' + m + ':' + s;

    }, 1000)
}