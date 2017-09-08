var fs = require('fs');

var k_v_path = 'specification/k_v.csv';
var specification_path = 'specification/input.csv';

var specReadStream = fs.createReadStream(specification_path);
var k_vReadStream = fs.createReadStream(k_v_path);

//读取。写文件
k_vReadStream.on('data',function(k_vData){
	var kv = JSON.parse(k_vData);
	// console.log('键值对-----',kv);

	specReadStream.on('data',function(data){
		var rows = data.toString('utf-8').split('\r\n');
		var gender = rows[0];
		var factoryNumber = rows[1];
		var clothingType = rows[2];
		var sName = rows[3];
		// 生成BosyItems
		var bodyItems = {};
		var columnNames = rows[4].split(',');
		var n_len = columnNames.length;
		for(var i=1;i<n_len;i++){
			var bName = columnNames[i];
			var kbName = kv[bName];
			if(kbName==undefined) {throw new Error('该部位未定义: ' + bName)};
			bodyItems[kbName] = bName;
		}

		// 定义规格单对象
		var specification = {};
			specification['_class'] = 'cn.com.icaifeng.model.produce.Specification';
			specification['name'] = sName;
			specification['factoryNumber'] = factoryNumber;
			specification['gender'] = (gender - 0);
			specification['status'] = 'NORMAL';
			specification['clothing'] = clothingType;
			specification['createTime'] = Date.parse(new Date());
			specification['bodyItems'] = bodyItems;
		var standard = {};

		// 数组长度
		var len = rows.length;
		// 尺寸开始行
		var i = 5 ;
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
					var bName = columnNames[j];
						// bName = bName.replace("\r","");
					var kbName = kv[bName];
					spec[kbName] = (couloms[j] - 0);
					standard[specNo] = spec;
				}
			}
		}

		specification['standard'] = standard;
		var wPath = 'specification/result/'+factoryNumber+'_'+clothingType+'_'+gender+'_'+sName+'.txt';
		// console.log('读取到数据：',specification);
	    var out = fs.createWriteStream(wPath);
			out.write(JSON.stringify(specification)); // 输出结果
			out.on('open',function(fd){
			    console.log('需要被写入的文件已打开');
			});
			
		    //将操作系统缓存区中的数据全部写入文件
		    // out.end('再见',function(){
		    out.end(function(){
		        console.log('文件全部写入完毕',wPath);
		        console.log('共写入'+out.bytesWritten+'数据');
		    });
			
	});
});


specReadStream.on('open',function(fd){
    console.log('【规格单】开始读取文件');
});
specReadStream.on('end',function(){
    console.log( '【规格单】文件已全部读取完毕');
});
specReadStream.on('close',function(){
    console.log('【规格单】文件被关闭');
});
specReadStream.on('error',function(err){
    console.log('【规格单】读取文件失败',err);
});

k_vReadStream.on('open',function(fd){
    console.log('【键值对】文件开始读取');
});
k_vReadStream.on('end',function(){
    console.log( '【键值对】文件已全部读取完毕');
});
k_vReadStream.on('close',function(){
    console.log('【键值对】文件被关闭');
});
k_vReadStream.on('error',function(err){
    console.log('【键值对】读取文件失败',err);
});
