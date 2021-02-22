//src/mock/mockServer.js 虚拟服务器
//1:引入mock模块
import Mock from "mockjs"
//2:引入data.json数据
import data from "./data.json"
//3:创建三个接口
Mock.mock("/goods",'get',{code:0,data:data.goods})
Mock.mock("/ratings",'get',{code:0,data:data.ratings})
Mock.mock("/info",'get',{code:0,data:data.info})
