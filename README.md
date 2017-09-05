# factoryBodySize
generate json for Factory setting 

# 项目简介


# how to use
* install nodeJs
* config the input.csv
 
 ``` txt
    1
    ABBO
    C
    5KN011-双排扣6R
    尺码,腰围,胸围,前衣长,后中长
    42,81,89,57,55.5
    44,85,93,57.5,56
    46,89,97,58,56.5
    48,93,101,58.5,57
    50,97,105,59,57.5
    52,101,109,59.5,58
    54,105,113,60,58.5
    56,109,117,60.5,59
    58,113,121,61,59.5
    60,117,125,61.5,60
    62,121,129,62,60.5
    64,125,133,62.5,61
    66,129,137,63,61.5
    68,133,141,63.5,62
    70,137,145,64,62.5
    72,141,149,64.5,63
 ```
 
  *第一行是性别：1 男 ，0 女**
  
  *第二行是工厂 ID 比如ABBO**
  
  *第三行是服装类型**
  
  *第四行是规格单名称**
  
  *第五行除第一个 `,` 前外都是部位名称，第一个 `,` 前的值是为格式而设定，必须保留，你可以设任何值**
  
  *从第六行开始一下的部分，第一列是尺码，后面的列对应第五行的不为名称**
  
  
* 打开根目录（factoryBodySize），并进入dos（windows）窗口。
* run ***`node index.js`*** ，结果会在result文件夹下输出，文件以 ‘ 工厂号_服装类型_性别_规格单名称.txt ’ 格式命名。

# Summery
 
 我们有更多的方式写小脚本，比如 `java`,`.net`,'php` 等语言，此处是利用 `NodeJs` 完成，有兴趣的可以多种方式实现。
