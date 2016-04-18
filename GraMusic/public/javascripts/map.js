var map = new BMap.Map("container");          // 创建地图实例
var point = new BMap.Point(108.953098, 37.2778);
map.centerAndZoom(point, 5);             // 初始化地图，设置中心点坐标和地图级别
map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_SMALL}));
// map.enableScrollWheelZoom(); // 允许滚轮缩放
function getMap(points) {
    var arr = [];
    for (var i = 0; i < points.length; i++) {
        var pt = {};
        pt.lng = points[i].lng;
        pt.lat = points[i].lat;
        pt.count = points[i].count;
        arr.push(pt);
    }
    if(!isSupportCanvas()){
      alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
    }
    //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
    //参数说明如下:
    /* visible 热力图是否显示,默认为true
     * opacity 热力的透明度,1-100
     * radius 势力图的每个点的半径大小   
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *  {
      .2:'rgb(0, 255, 255)',
      .5:'rgb(0, 110, 255)',
      .8:'rgb(100, 0, 255)'
    }
    其中 key 表示插值的位置, 0~1. 
        value 为颜色值. 
     */

    heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
    map.addOverlay(heatmapOverlay);
    heatmapOverlay.setDataSet({data:arr});
    function setGradient(){
    /*格式如下所示:
    {
      0:'rgb(102, 255, 0)',
    .5:'rgb(255, 170, 0)',
      1:'rgb(255, 0, 0)'
    }*/
        var gradient = {
            0:'rgb(102, 255, 0)',
            .5:'rgb(255, 170, 0)',
            1:'rgb(255, 0, 0)'
        };
        // var colors = document.querySelectorAll("input[type='color']");
        // console.log(colors);
        // colors = [].slice.call(colors,0);
        // colors.forEach( function(ele) {
        //     gradient[ele.getAttribute("data-key")] = ele.value; 
        // });
        heatmapOverlay.setOptions({"gradient":gradient});
    }
    //判断浏览区是否支持canvas
    function isSupportCanvas(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }   
}

function getBoundary() {       
    var bdary = new BMap.Boundary();
    var name = document.getElementById("districtName").value;
    var rate = getRate(name, points);
    // console.log('name: ' + name +' | rate: ' + rate);
    bdary.get(name, function(rs){       //获取行政区域
        map.clearOverlays();        //清除地图覆盖物       
        var count = rs.boundaries.length; //行政区域的点有多少个
        for(var i = 0; i < count; i++){
            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#FF0000"}); //建立多边形覆盖物
            map.addOverlay(ply);  //添加覆盖物
            // map.setViewport(ply.getPath());    //调整视野
            ply.addEventListener("click", function (e) {
                var latlng = e.point;
                // var info = new BMap.InfoWindow(name + " " + latlng.lat + "," + latlng.lng, {width:220});
                // map.openInfoWindow(info, latlng);
                var info = new BMap.InfoWindow(name + "用户比例: " + rate*100 + '%');
                map.openInfoWindow(info, latlng);

                //高亮闪烁显示鼠标点击的省
                delay = 0;
                for (flashTimes = 0; flashTimes < 3; flashTimes++) {
                    delay += 200;
                    setTimeout(function () {
                        ply.setFillColor("#FFFF00");
                    }, delay);

                    delay += 200;
                    setTimeout(function () {
                        ply.setFillColor("#FFFFFF");
                    }, delay);
                }
            });         
        }                
    })


    // var local = new BMap.LocalSearch(map, { 
    //     renderOptions:{map: map} 
    // }); 
    // var marker = new BMap.Marker(local.search(name));

}

function clearBoundary() {
    map.clearOverlays();
    getMap(points);
}

function showAll() {
    map.clearOverlays();
    
    var names = [
                    "安徽省", "北京市", "重庆市", "福建省", "甘肃省", "广东省", "广西壮族自治区", "贵州省", 
                    "海南省", "河北省", "河南省", "黑龙江省", "湖北省", "湖南省", "吉林省", "江苏省", 
                    "江西省", "辽宁省", "内蒙古自治区", "宁夏回族自治区", "青海省", "山东省", "山西省", "陕西省", 
                    "上海市", "四川省", "天津市", "西藏自治区", "新疆维吾尔族自治区", "云南省", "浙江省", "香港特别行政区"
                ];
    var colors = [
                    "#EEE5DE", "#EE9572", "#EEE9E9", "#EED8AE", "#F0F8FF", "#EE0000", "#EECFA1", "#EECBAD",
                    "#F5FFFA", "#EEE9E9", "#EEC900", "#EEC900", "#EEE0E5", "#EED8AE", "#F0FFF0", "#EE5C42",
                    "#EE9A49", "#EEE9BF", "#F0FFFF", "#F7F7F7", "#F7F7F7", "#EEC591", "#EEEED1", "#EEE8CD",
                    "#EECFA1", "#EEA9B8", "#F0F0F0", "#FCFCFC", "#EEDC82", "#EEEED1", "#EE7600", "#F8F8FF"
                ];
    for (var n in names) {
        // console.log('rate: ' + rate);
        (function(n) {
            var bdary = new BMap.Boundary();
            var name = names[n];
            var rate = getRate(name, points);
            bdary.get(name, function(rs){       //获取行政区域
                // map.clearOverlays();        //清除地图覆盖物       
                var count = rs.boundaries.length; //行政区域的点有多少个
                for(var i = 0; i < count; i++){
                    var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#FF0000"}); //建立多边形覆盖物
                    ply.setFillColor(colors[n]);
                    map.addOverlay(ply);  //添加覆盖物
                    // map.setViewport(ply.getPath());    //调整视野
                    ply.addEventListener("click", (function (e) {
                        console.log(name + ' | ' + rate)
                        var latlng = e.point;
                        // console.log(latlng);
                        // var info = new BMap.InfoWindow(name + " " + latlng.lat + "," + latlng.lng, {width:220});
                        // map.openInfoWindow(info, latlng);
                        var info = new BMap.InfoWindow(name + "用户比例: " + rate*100 + '%');

                        map.openInfoWindow(info, latlng);
                        // ply.setFillColor("#FFFF00");
                        // 高亮闪烁显示鼠标点击的省
                        delay = 0;
                        for (flashTimes = 0; flashTimes < 3; flashTimes++) {
                            delay += 200;
                            setTimeout(function () {
                                ply.setFillColor("#FFFF00");
                            }, delay);

                            delay += 200;
                            setTimeout(function () {
                                ply.setFillColor(colors[n]);
                            }, delay);
                        }
                    }))();
                }                
            })
        })(n)
    }
}

function getMarker(points) {
    map.clearOverlays();
    for (var p in points) {
        (function(p) {
            var point = new BMap.Point(points[p].lng, points[p].lat);
            var name = getNameByCode(points[p].code);
            var rate = getRate(name, points);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中   
            var label = new BMap.Label(name.substr(0, 2) + ' | ' + rate*100 + '%', {offset:new BMap.Size(20, -10)});
            label.setStyle({
             color : "blue",
             fontSize : "14px",
             height : "20px",
             lineHeight : "20px",
             fontFamily:"微软雅黑"
         });

            marker.setLabel(label);
        })(p)
    }
}

function getNameByCode(code) {
    var name;
    if (code == 11) {
        name = '北京市';
    }
    if (code == 31) {
        name = '上海市';
    }
    if (code == 12) {
        name = '天津市';
    }
    if (code == 44) {
        name = '广东省';
    }
    if (code == 37) {
        name = '山东省';
    }
    if (code == 32) {
        name = '江苏省';
    }
    if (code == 41) {
        name = '河南省';
    }
    if (code == 13) {
        name = '河北省';
    }
    if (code == 33) {
        name = '浙江省';
    }
    if (code == 81) {
        name = '香港特别行政区';
    }
    if (code == 61) {
        name = '陕西省';
    }
    if (code == 43) {
        name = '湖南省';
    }
    if (code == 50) {
        name = '重庆市';
    }
    if (code == 35) {
        name = '福建省';
    }
    if (code == 53) {
        name = '云南省';
    }
    if (code == 51) {
        name = '四川省';
    }
    if (code == 45) {
        name = '广西壮族自治区';
    }
    if (code == 34) {
        name = '安徽省';
    }
    if (code == 46) {
        name = '海南省';
    }
    if (code == 36) {
        name = '江西省';
    }
    if (code == 42) {
        name = '湖北省';
    }
    if (code == 14) {
        name = '山西省';
    }
    if (code == 71) {
        name = '台湾省';
    }
    if (code == 21) {
        name = '辽宁省';
    }
    if (code == 23) {
        name = '黑龙江';
    }
    if (code == 15) {
        name = '内蒙古自治区';
    }
    if (code == 82) {
        name = '澳门特别行政区';
    }
    if (code == 52) {
        name = '贵州省';
    }
    if (code == 62) {
        name = '甘肃省';
    }
    if (code == 63) {
        name = '青海省';
    }
    if (code == 65) {
        name = '新疆维吾尔族自治区';
    }
    if (code == 54) {
        name = '西藏自治区';
    }
    if (code == 22) {
        name = '吉林省';
    }
    if (code == 64) {
        name = '宁夏回族自治区';
    }
    return name;
}

function getAmount(points) {
     var amount = 0;
    var rate = 0;
    for (var i = 0; i < points.length; i++) {
        amount += points[i].count;
    }
    return amount;
}
function getRate(name, points) {
    var amount = getAmount(points);
    var provinceCode;
    if (name == '北京市') {
        provinceCode = 11;
        rate = points
    }
    if (name == '上海市') {
        provinceCode = 31;
    }
    if (name == '天津市') {
        provinceCode = 12;
    }
    if (name == '广东省') {
        provinceCode = 44;
    }
    if (name == '山东省') {
        provinceCode = 37;
    }
    if (name == '江苏省') {
        provinceCode = 32;
    }
    if (name == '河南省') {
        provinceCode = 41;
    }
    if (name == '河北省') {
        provinceCode = 13;
    }
    if (name == '浙江省') {
        provinceCode = 33;
    }
    if (name == '香港特别行政区') {
        provinceCode = 81;
    }
    if (name == '陕西省') {
        provinceCode = 61;
    }
    if (name == '湖南省') {
        provinceCode = 43;
    }
    if (name == '重庆市') {
        provinceCode = 50;
    }
    if (name == '福建省') {
        provinceCode = 35;
    }
    if (name == '云南省') {
        provinceCode = 53;
    }
    if (name == '四川省') {
        provinceCode = 51;
    }
    if (name == '广西壮族自治区') {
        provinceCode = 45;
    }
    if (name == '安徽省') {
        provinceCode = 34;
    }
    if (name == '海南省') {
        provinceCode = 46;
    }
    if (name == '江西省') {
        provinceCode = 36;
    }
    if (name == '湖北省') {
        provinceCode = 42;
    }
    if (name == '山西省') {
        provinceCode = 14;
    }
    if (name == '台湾省') {
        provinceCode = 71;
    }
    if (name == '辽宁省') {
        provinceCode = 21;
    }
    if (name == '黑龙江') {
        provinceCode = 23;
    }
    if (name == '内蒙古自治区') {
        provinceCode = 15;
    }
    if (name == '澳门特别行政区') {
        provinceCode = 82;
    }
    if (name == '贵州省') {
        provinceCode = 52;
    }
    if (name == '甘肃省') {
        provinceCode = 62;
    }
     if (name == '青海省') {
        provinceCode = 63;
    }
    if (name == '新疆维吾尔族自治区') {
        provinceCode = 65;
    }
    if (name == '西藏自治区') {
        provinceCode = 54;
    }
    if (name == '吉林省') {
        provinceCode = 22;
    }
    if (name == '宁夏回族自治区') {
        provinceCode = 64;
    }

    for(var n = 0; n < points.length; n++) {
        if (points[n].code == provinceCode) {
            rate = (points[n].count / amount).toFixed(4);
            console.log('count: ' + points[n].count);
        }
    }
    console.log('name: ' + name + ' | rate: ' + rate);
    return rate;
}
