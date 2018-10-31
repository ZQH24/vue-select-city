<template>
  <div>
    <el-tabs
      v-model="tabIndex"
      @tab-click="handleClickTab"
      v-if="!isSearch"
      >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.id"
        :label="item.name"
        :name="item.name.toLocaleLowerCase()">
        <el-tag
          v-if="selectCity"
          class="select-city"
          :closable="closable"
          type="danger"
          @close="cancelSelectCity">
          {{selectCity}}
        </el-tag>
        <div
          class="city-list"
          v-for="(items, index) in cityList.slice(item.start, item.end)"
          :key="index"
          v-show="cityListIsShow"
          v-if="items.list.length > 0"
          >
          <a class="category">{{items.name}}</a>
          <a
            v-for="(item, index) in items.list"
            :key="index"
            @click="handleSelectCity(item, item.name)">
            {{item.name}}
          </a>
        </div>
        <div
          class="city-list"
          v-show="!cityListIsShow">
          <a
            v-for="item in selectAreaList.regions"
            :key="item.id"
            @click="handleSelectArea(item)">
            {{item.name}}
          </a>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="search-list"  v-if="isSearch">
      <div class="search-item" v-for="(item, index) of searchData" :key="index" @click="handleSelectSearchItem(item)">
        {{item.provinceName + '-' + item.cityName + '-' + item.regionName}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vueCitySelect',
  props: {
    isSearch: Boolean,
    searchVal: String,
    cityData: Array,
    index: {
      default: 0
    }
  },
  data () {
    return {
      tabIndex: 'abcdef',
      closable: true,
      selectCity: '',
      cityList: [],
      formatCityList: [], // 格式化后的城市数据
      searchData: [], // 存放过滤的数据
      selectAreaList: {
      },
      // 完整选择的地址对象
      selectObj: {
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        regionId: '',
        regionName: ''
      },
      tabList: [
        { name: 'ABCDEF', start: 0, end: 6 },
        { name: 'GHIJ', start: 6, end: 10 },
        { name: 'KLMNO', start: 10, end: 15 },
        { name: 'PQRSTUVW', start: 15, end: 23 },
        { name: 'XYZ', start: 23, end: 26 }
      ]
    }
  },
  methods: {
    // 点击标签页重置
    handleClickTab () {
      this.resetData()
    },
    resetData () {
      this.selectCity = ''
      this.selectObj = {
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        regionId: '',
        regionName: ''
      }
    },
    // 删除选中的城市
    cancelSelectCity () {
      this.selectCity = ''
      this.selectObj = {
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        regionId: '',
        regionName: ''
      }
    },
    // 城市按字母分组
    filterAddressList (list) {
      const letterArr = []
      const dist = []
      for (var i = 65; i <= 90; i++) {
        letterArr.push(String.fromCharCode(i))
      }
      letterArr.forEach(v => {
        let arr = []
        list.forEach(c => {
          c.cities.forEach(item => {
            if (item.firstLetter === v) {
              Object.assign(item, {
                provinceId: c.id,
                provinceName: c.name
              })
              arr.push(item)
            }
          })
        })
        dist.push({
          id: v,
          name: v,
          list: arr
        })
      })
      this.cityList = dist
      this.filterSearchAddress(this.cityData)
    },
    // 城市搜索
    filterSearchAddress (list) {
      let arr = []
      list.forEach(c => {
        c.cities.forEach(item => {
          item.regions.forEach(item1 => {
            arr.push({
              provinceId: c.id,
              provinceName: c.name,
              provincePinyin: c.pinyin,
              cityId: item.id,
              cityName: item.name,
              cityPinyin: item.pinyin,
              regionId: item1.id,
              regionName: item1.name,
              regionPinyin: item1.pinyin
            })
          })
        })
      })
      this.formatCityList = arr
    },
    // 选择城市
    handleSelectCity (item, name) {
      this.selectCity = name
      this.selectAreaList = item
      this.selectObj.provinceId = item.provinceId
      this.selectObj.provinceName = item.provinceName
      this.selectObj.cityId = item.id
      this.selectObj.cityName = item.name
    },
    // 选择区域
    handleSelectArea (item) {
      this.selectObj.regionId = item.id
      this.selectObj.regionName = item.name
      this.$emit('selectComplete', Object.assign(this.selectObj, {
        index: this.index
      }))
      this.resetData()
    },
    // 省市区查询
    searchCity () {
      this.searchData = []
      this.formatCityList.forEach((item, index) => {
        if (item.provinceName.indexOf(this.searchVal) >= 0 || item.provincePinyin.toLowerCase().indexOf(this.searchVal.toLowerCase()) >= 0 ||
            item.cityName.indexOf(this.searchVal) >= 0 || item.cityPinyin.toLowerCase().indexOf(this.searchVal.toLowerCase()) >= 0 ||
            item.regionName.indexOf(this.searchVal) >= 0 || item.regionPinyin.toLowerCase().indexOf(this.searchVal.toLowerCase()) >= 0) {
          this.searchData.push(item)
        }
      })
    },
    // 过滤选择
    handleSelectSearchItem (item) {
      this.$emit('selectComplete', Object.assign(item, {
        index: this.index
      }))
      this.resetData()
    }
  },
  computed: {
    cityListIsShow () {
      return !this.selectCity
    }
  },
  watch: {
    cityData (val) {
      this.filterAddressList(val)
    },
    searchVal (val) {
      if (val && this.isSearch) {
        this.searchCity()
      }
    }
  },
  mounted () {
    this.filterAddressList(this.cityData)
  }
}
</script>
<style lang="scss" scoped>
$v-font-extra-extra-small: 14px;
// 一行或多行出省略号
@mixin x-textEllipsis($num:1) {
  overflow: hidden;
  @if $num==1 {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @else {
    display: -webkit-box;
    -webkit-line-clamp: $num;
    -webkit-box-orient: vertical;
  }
}
.shipment-panel {
  margin-bottom: 10px;
}
.el-tab-pane {
  button {
    margin-bottom: 10px;
  }
}
.popover-panel {
  height: 200px;
  overflow-y: auto;
  h4 {
    color: #ff6666;
    margin-bottom: 4px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 6px;
  }
  a {
    cursor: pointer;
    display: block;
    font-size: 12px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a:hover {
    background: #ff6666;
    color: #fff;
  }
}
.usual {
    display: flex;
    margin-bottom: 10px;
    .tag {
      flex: 1;
      font-size: $v-font-extra-extra-small;
      color: #fc727f;
    }
    .list {
      flex: 9;
      .el-table {
        font-size: $v-font-extra-extra-small;
        td {
          padding: 0;
        }
      }
    }
    &.hot-city {
      .list {
        display: flex;
        flex-wrap: wrap;
        a {
          width: 90px;
          text-align: center;
          font-size: $v-font-extra-extra-small;
          cursor: pointer;
          &:hover {
            background: #fc727f;
            color: #fff;
          }
        }
      }
    }
  }
  .city-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    a {
      @include x-textEllipsis;
      height: 20px;
      width: 108px;
      line-height: 20px;
      font-size: $v-font-extra-extra-small;
      text-align: center;
      &.category {
        color: #fc727f;
      }
      &:not(.category) {
        cursor: pointer;
        &:hover {
          color: #fc727f;
        }
      }
    }
  }
  .receiver-address-list {
    .el-table {
      font-size: $v-font-extra-extra-small;
      margin-bottom: 20px;
    }
    .pagination-right {
      text-align: right;
    }
  }
  .search-addres {
    text-align: right;
    margin-bottom: 20px;
    .el-input {
      width: auto;
    }
  }

  .search-list {
    height: 260px;
    overflow: auto;
    .search-item {
      padding: 10px 20px;
    }
    .search-item:hover {
      background-color: #ff6666;
      color: #ffffff;
    }
  }
</style>
