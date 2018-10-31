# vue-select-city

> 这是一款基于vue + element 开发的一个城市选择组件

## Build Setup

``` bash
# 安装插件
npm i vue-select-city

# 插件的使用步骤
## 1.在main.js中引入
import vueCitySelect from 'vue-select-city'
Vue.use(vueCitySelect);

## 属性

| 属性名 | 类型 | 描述 |
| :--- | :--- | :--- |
| cityData | Array<ProvinceDAO> | 供选择的城市数据集|
| searchVal | String  | 搜索的内容 |
| isSearch | Boolean | 是否进行搜索 |

### isSearch的使用：配合input标签监听input的输入，如果输入不为空这认为触发搜索事件，否则不是
handleInputCityArea (val) {
  if (val !== '') {
    this.isSearch = true
  } else {
    this.isSearch = false
  }
}

## 事件
| 事件名 | 返回参数 | 描述 |
| :--- | :--- | :--- |
| selectComplete | data | 城市选择后的返回事件|

## ProvinceDAO
| 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| id | String | 省id|
| name | String | 省名|
| pinyin | String | 省拼音|
| firstLetter | String | 省首字母|
| cities | Array<CityDAO> | 市数据模型|

## CityDAO
| 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| id | String | 市id|
| name | String | 市名|
| pinyin | String | 市拼音|
| firstLetter | String | 市首字母|
| regions | Array<RegionDAO> | 区数据模型|

## RegionDAO
| 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| id | String | 区id|
| name | String | 区名|
| pinyin | String | 区拼音|
| firstLetter | String | 区首字母|


