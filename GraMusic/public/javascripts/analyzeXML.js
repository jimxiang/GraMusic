var points = [];
var array = [];
var topComments = [];
var plLists = [];
// var playLists = [];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		var array = analyze(xhttp);
		var points = mapPoints(array);
		

		var topComments = topTen(xhttp);
		getTopten(topComments);

		getPlayLists(xhttp);

		playList();

		getMap(points);
	}
};

xhttp.open('GET', '/xml/musicInfo.xml', true);
xhttp.send();

function analyze(xml) {
	var xmlDoc = xml.responseXML;
	var len = xmlDoc.getElementsByTagName('music').length;
	var provinceArr = xmlDoc.getElementsByTagName('province');
	// console.log(provinceArr[5].childNodes[0].nodeValue);
	for (var i = 0; i < len; i++) {
		var provinceObj = {};
		var provinceCode = provinceArr[i].childNodes[0].nodeValue;
		if (provinceCode !== 'null') {
			// console.log(i + ' : ' + province);
			if(array.length == 0) {
				provinceObj.provinceCode = provinceCode;
				provinceObj.number = 1;
				array.push(provinceObj);
			} else if(array.length > 0){
				for (var n = 0; n < array.length; n++) {
					if (array[n].provinceCode == provinceCode) {
						array[n].number++;
						break;
					} else if(n == (array.length - 1)) {
						provinceObj.provinceCode = provinceCode;
						provinceObj.number = 0;
						array.push(provinceObj);
					}
				}
			}
		}
	}
	array[array.length - 1].number++;
	return array;
}

function mapPoints(array) {
	for (var i = 0; i < array.length; i++) {
		var point = {};
		// 安徽省用户
		if (array[i].provinceCode.substr(0, 2) == '34') {
			point.lng = 117.220074;
			point.lat = 31.834853;
			point.count = array[i].number;
			point.code = 34;
			points.push(point);
		}
		//北京市用户
		if (array[i].provinceCode.substr(0, 2) == '11') {
			point.lng = 116.396795;
			point.lat = 39.936625;
			point.count = array[i].number;
			point.code = 11;
			points.push(point);
		}
		// 重庆市用户
		if (array[i].provinceCode.substr(0, 2) == '50') {
			point.lng = 106.554241;
			point.lat = 29.605782;
			point.count = array[i].number;
			point.code = 50;
			points.push(point);
		}
		// 福建省用户
		if (array[i].provinceCode.substr(0, 2) == '35') {
			point.lng = 119.275972;
			point.lat = 26.098988;
			point.count = array[i].number;
			point.code = 35;
			points.push(point);
		}
		// 甘肃省用户
		if (array[i].provinceCode.substr(0, 2) == '62') {
			point.lng = 103.84064;
			point.lat = 36.105877;
			point.count = array[i].number;
			point.code = 62;
			points.push(point);
		}
		// 广东省用户
		if (array[i].provinceCode.substr(0, 2) == '44') {
			point.lng = 113.223261;
			point.lat = 23.198832;
			point.count = array[i].number;
			point.code = 44;
			points.push(point);
		}
		// 广西省用户
		if (array[i].provinceCode.substr(0, 2) == '45') {
			point.lng = 108.297234;
			point.lat = 22.806493;
			point.count = array[i].number;
			point.code = 45;
			points.push(point);
		}
		// 贵州省用户
		if (array[i].provinceCode.substr(0, 2) == '52') {
			point.lng = 106.709177;
			point.lat = 26.629907;
			point.count = array[i].number;
			point.code = 52;
			points.push(point);
		}
		// 海南省用户
		if (array[i].provinceCode.substr(0, 2) == '46') {
			point.lng = 110.330802;
			point.lat = 20.022071;
			point.count = array[i].number;
			point.code = 46;
			points.push(point);
		}
		// 河北省用户
		if (array[i].provinceCode.substr(0, 2) == '13') {
			point.lng = 114.522082;
			point.lat = 38.048958;
			point.count = array[i].number;
			point.code = 13;
			points.push(point);
		}
		// 黑龙江省用户
		if (array[i].provinceCode.substr(0, 2) == '23') {
			point.lng = 126.657717;
			point.lat = 45.773225;
			point.count = array[i].number;
			point.code = 23;
			points.push(point);
		}
		// 河南省用户
		if (array[i].provinceCode.substr(0, 2) == '41') {
			point.lng = 113.649644;
			point.lat = 34.75661;
			point.count = array[i].number;
			point.code = 41;
			points.push(point);
		}
		// 湖北省用户
		if (array[i].provinceCode.substr(0, 2) == '42') {
			point.lng = 114.3162;
			point.lat = 30.581084;
			point.count = array[i].number;
			point.code = 42;
			points.push(point);
		}
		// 湖南省用户
		if (array[i].provinceCode.substr(0, 2) == '43') {
			point.lng = 112.979353;
			point.lat = 28.213478;
			point.count = array[i].number;
			point.code = 43;
			points.push(point);
		}
		// 内蒙古省用户
		if (array[i].provinceCode.substr(0, 2) == '15') {
			point.lng = 111.660351;
			point.lat = 40.828319;
			point.count = array[i].number;
			point.code = 15;
			points.push(point);
		}
		// 江苏省用户
		if (array[i].provinceCode.substr(0, 2) == '32') {
			point.lng = 118.778074;
			point.lat = 32.057236;
			point.count = array[i].number;
			point.code = 32;
			points.push(point);
		}
		// 江西省用户
		if (array[i].provinceCode.substr(0, 2) == '36') {
			point.lng = 115.893528;
			point.lat = 28.689578;
			point.count = array[i].number;
			point.code = 36;
			points.push(point);
		}
		// 吉林省用户
		if (array[i].provinceCode.substr(0, 2) == '22') {
			point.lng = 125.313642;
			point.lat = 43.898338;
			point.count = array[i].number;
			point.code = 22;
			points.push(point);
		}
		// 辽宁省用户
		if (array[i].provinceCode.substr(0, 2) == '21') {
			point.lng = 123.432791;
			point.lat = 41.808645;
			point.count = array[i].number;
			point.code = 21;
			points.push(point);
		}
		// 宁夏省用户
		if (array[i].provinceCode.substr(0, 2) == '64') {
			point.lng = 106.206479;
			point.lat = 38.502621;
			point.count = array[i].number;
			point.code = 64;
			points.push(point);
		}
		// 青海省用户
		if (array[i].provinceCode.substr(0, 2) == '63') {
			point.lng = 101.767921;
			point.lat = 36.640739;
			point.count = array[i].number;
			point.code = 63;
			points.push(point);
		}
		// 山西省用户
		if (array[i].provinceCode.substr(0, 2) == '14') {
			point.lng = 112.550864;
			point.lat = 37.890277;
			point.count = array[i].number;
			point.code = 14;
			points.push(point);
		}
		// 山东省用户
		if (array[i].provinceCode.substr(0, 2) == '37') {
			point.lng = 117.024967;
			point.lat = 36.682785;
			point.count = array[i].number;
			point.code = 37;
			points.push(point);
		}
		// 上海市用户
		if (array[i].provinceCode.substr(0, 2) == '31') {
			point.lng = 121.487899;
			point.lat = 31.249162;
			point.count = array[i].number;
			point.code = 31;
			points.push(point);
		}
		// 四川省用户
		if (array[i].provinceCode.substr(0, 2) == '51') {
			point.lng = 104.067923;
			point.lat = 30.679943;
			point.count = array[i].number;
			point.code = 51;
			points.push(point);
		}
		// 天津省用户
		if (array[i].provinceCode.substr(0, 2) == '12') {
			point.lng = 117.217774;
			point.lat = 39.09141;
			point.count = array[i].number;
			point.code = 12;
			points.push(point);
		}
		// 西藏省用户
		if (array[i].provinceCode.substr(0, 2) == '54') {
			point.lng = 91.111891;
			point.lat = 29.662557;
			point.count = array[i].number;
			point.code = 54;
			points.push(point);
		}
		// 新疆用户
		if (array[i].provinceCode.substr(0, 2) == '65') {
			point.lng = 87.564988;
			point.lat = 43.84038;
			point.count = array[i].number;
			point.code = 65;
			points.push(point);
		}
		// 云南省用户
		if (array[i].provinceCode.substr(0, 2) == '53') {
			point.lng = 102.714601;
			point.lat = 25.049153;
			point.count = array[i].number;
			point.code = 53;
			points.push(point);
		}
		// 浙江省用户
		if (array[i].provinceCode.substr(0, 2) == '33') {
			point.lng = 120.219375;
			point.lat = 30.259244;
			point.count = array[i].number;
			point.code = 33;
			points.push(point);
		}
		// 陕西省用户
		if (array[i].provinceCode.substr(0, 2) == '61') {
			point.lng = 108.953098;
			point.lat = 34.2778;
			point.count = array[i].number;
			point.code = 61;
			points.push(point);
		}
		// 台湾用户
		if (array[i].provinceCode.substr(0, 2) == '71') {
			point.lng = 120.361326;
			point.lat = 23.777223;
			point.count = array[i].number;
			point.code = 71;
			points.push(point);
		}
		// 香港用户
		if (array[i].provinceCode.substr(0, 2) == '81') {
			point.lng = 114.186124;
			point.lat = 22.293586;
			point.count = array[i].number;
			point.code = 81;
			points.push(point);
		}
		// 澳门用户
		if (array[i].provinceCode.substr(0, 2) == '82') {
			point.lng = 113.557519;
			point.lat = 22.204118;
			point.count = array[i].number;
			point.code = 82;
			points.push(point);
		}
	}
	return points;
}

function topTen(xml) {
	var xmlDoc = xml.responseXML;
	var len = xmlDoc.getElementsByTagName('music').length;

	var musicNameArr = xmlDoc.getElementsByTagName('musicName');
	var artistNameArr = xmlDoc.getElementsByTagName('artistName');
	var musicUrlArr = xmlDoc.getElementsByTagName('musicUrl');
	var blurPicUrlArr = xmlDoc.getElementsByTagName('blurPicUrl');
	var albumNameArr = xmlDoc.getElementsByTagName('albumName');
	var commentsArr = xmlDoc.getElementsByTagName('comments');

	for (var i = 0; i < len; i++) {
		var toptenObj = {};
		var musicName = musicNameArr[i].childNodes[0].nodeValue;
		var artistName = artistNameArr[i].childNodes[0].nodeValue;
		var musicUrl = musicUrlArr[i].childNodes[0].nodeValue;
		var comments = commentsArr[i].childNodes[0].nodeValue;
		var blurPicUrl = blurPicUrlArr[i].childNodes[0].nodeValue;
		var albumName = albumNameArr[i].childNodes[0].nodeValue;

		if (musicName != 'null' && artistName != 'null' && musicUrl != 'null' && comments != 'null') {
			toptenObj.musicName = musicName;
			toptenObj.artistName = artistName;
			toptenObj.musicUrl = musicUrl;
			toptenObj.blurPicUrl = blurPicUrl;
			toptenObj.albumName = albumName;
			toptenObj.comments = parseInt(comments);
			topComments.push(toptenObj);
		}
	}
	topComments.sort(compare("comments"));
	// console.log(topComments);
	return topComments;
}

function compare(property) {
	return function(obj1, obj2) {
		var value1 = obj1[property];
		var value2 = obj2[property];

		if (value2 < value1) {
			return -1;
		} else if (value2 > value1) {
			return 1;
		} else {
			return 0;
		}
	}
}

function getPlayLists(xml) {
	var lists = [];
	var xmlDoc = xml.responseXML;
	var len = xmlDoc.getElementsByTagName('music').length;

	var nickNameArr = xmlDoc.getElementsByTagName('nickName');
	var createTimeArr = xmlDoc.getElementsByTagName('createTime');
	var playListNameArr = xmlDoc.getElementsByTagName('playListName');

	for (var i = 0; i < len; i++) {
		var playListObj = {};
		var nickName = nickNameArr[i].childNodes[0].nodeValue;
		var createTime = createTimeArr[i].childNodes[0].nodeValue.substr(0, 10);
		var playListName = playListNameArr[i].childNodes[0].nodeValue;

		if (nickName != 'null' && createTime != 'null' && playListName != 'null') {
			var date = getDate(createTime);
			playListObj.nickName = nickName;
			playListObj.date = date;
			playListObj.playListName = playListName;
			lists.push(playListObj);
		}
	}
	var listLen = lists.length;
	for (var i = 0; i < listLen; i++) {
		var listObj = {};
		if(plLists.length == 0) {
			listObj.date = lists[0].date;
			listObj.number = 1;
			plLists.push(listObj);
		} else if(plLists.length > 0){
			for (var n = 0; n < plLists.length; n++) {
				if (plLists[n].date == lists[i].date) {
					plLists[n].number++;
					break;
				} else if(n == (plLists.length - 1)) {
					listObj.date = lists[i].date;
					listObj.number = 0;
					plLists.push(listObj);
				}
			}
		}
		
	}
	// console.log(plLists);
	// return plLists;
}

function getDate(tm){ 
	var tt=new Date(parseInt(tm) * 1000).toLocaleString().substr(0,13); 
	return tt; 
}