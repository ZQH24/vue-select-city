<template>
  <div id="app">
    <el-popover
      placement="right"
      width="500"
      trigger="focus">
        <vue-city-select
          :cityData="allCityList"
          @selectComplete="handleSelectReceive"
          :searchVal="searchVal"
          :isSearch="isSearch"
        >
        </vue-city-select>
        <el-input slot="reference" style="width:200px" v-model="searchVal" placeholder="请输入内容"  v-on:input="handleInputCityArea"></el-input>
    </el-popover>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      allCityList: [],//城市列表
      searchVal: '', //搜索内容
      isSearch: false, //标识是否是搜索
    }
  }, 
  methods: {
    handleSelectReceive (data) {
      console.log(data)
    },
    handleInputCityArea (val) {
      if (val !== '') {
        this.isSearch = true
      } else {
        this.isSearch = false
      }
    }
  },
  mounted () {
    axios.get('http://mock.lucky1001.com/api/luckychain/common/getProvinces')
    .then( (res) => {
      this.allCityList = res.data.provinces
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>

<style>

</style>
