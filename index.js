
var fs = require("fs");


console.log('开始读取文件 ---------- 同步读取');

var k_v_path = 'bodySize/k_v.csv';
var bodySize_path = 'bodySize/input.csv';

//读取key value 文件
var k_v_data = fs.readFileSync(k_v_path);
var kv = JSON.parse( k_v_data );
// console.log( kv['半胸围'] );

//读取待配置的数据
var data = fs.readFileSync(bodySize_path);


// 判断data是不是buffer
// console.log(data instanceof Buffer);
/*data 为Buffer 类型 将其转换为String 类型*/
// console.log(typeof data.toString());


var rows = data.toString().split('\n');

//判断分割后是不是数组
// console.log( rows instanceof  Array);

// 性别
var gender = rows[0].replace("\r","");
console.log('性别：' + gender);
// 工厂ID
var factoryNumber = rows[1].replace("\r","");
console.log('当前工厂是：' + factoryNumber);
// 服装类别
var clothingType = rows[2].replace("\r","");
console.log('服装类别是：'+ clothingType );
// 规格名称
var sName = rows[3].replace("\r","");
console.log('规格名称：'+ sName);
// 列名：
var names = rows[4].replace("\r","").split(',');
console.log(names);
var bodyItems = {};
// 生成BosyItems
var n_len = names.length;
for(var i=1;i<n_len;i++){
	var bName = names[i];
	// if(kbName.contains('\r')){
		bName = bName.replace("\r","");
	// }
	var kbName = kv[bName];
	if(!kbName) {throw new Error('该部位未定义: ' + bName)};
	bodyItems[kbName] = bName;
}

// 定义规格单对象
var specification = {};
	specification['_class'] = 'cn.com.icaifeng.model.produce.Specification';
	specification['name'] = sName;
	specification['factoryNumber'] = factoryNumber;
	specification['gender'] = gender;
	specification['status'] = 'NORMAL';
	specification['clothing'] = clothingType;
	specification['createTime'] = Date.parse(new Date());
	specification['bodyItems'] = bodyItems;
var standard = {};

// 数组长度
var len = rows.length;
// 尺寸开始行
var i = 6 ;
for(i;i<len-1;i++){
	var row = rows[i].replace("\r","");
	console.log(row);
	if(row){
		var couloms  =  row.split(',');
		// 尺码（型号）
		var specNo = couloms[0];
		console.log('尺码（型号）：' + specNo);
		var spec = {};
		for(var j = 1;j<couloms.length;j++){
			var bName = names[j];
				bName = bName.replace("\r","");
			
			var kbName = kv[bName];
			spec[kbName] = couloms[j];
			standard[specNo] = spec;
		}
	}
}

specification['standard'] = standard;
// console.log(specification);
// console.log('------------------------------------------------------------------');
// console.log(JSON.stringify(specification));

console.log("准备写入文件");
var date = new Date();
var ts = date.getTime();
var wPath = 'bodySize/result/'+factoryNumber+'_'+clothingType+'_'+gender+'_'+sName+'.txt';
fs.writeFile(wPath, JSON.stringify(specification),  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");

});



// console.log("同步读取: " + data);
console.log("程序执行完毕。");



