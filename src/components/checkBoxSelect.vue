<template>
  <a-select
  class="select-container"
    v-model="internalValue"
    mode="tags"
    option-label-prop="label"
    @change="handleChange"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div slot="dropdownRender" slot-scope="menu">
      <div v-if="optionArr.length" class="SelectAll" >
        <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="handleCheckAll" ></a-checkbox>
        全选
      </div>
      <v-nodes :vnodes="menu" />
    </div>
    <a-select-option v-for="item in optionArr" :key="item.value" :label="item.label" :value="item.value" >
      <a-checkbox :checked="item.check" ></a-checkbox>
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: () => {
        return []
      }
    },
    options: {
      required: false,
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      internalValue: this.value,
      indeterminate: false,
      checkAll: false,
      optionArr:[]
    }
  },
  watch: {
    value: {
      handler: function(val) {
        const len = val.length
        const length = this.options.length
        if (len === length) {
          this.indeterminate = false
          this.checkAll = true
        } else {
          if (len === 0) {
            this.checkAll = false
            this.indeterminate = false
          } else {
            this.indeterminate = true
          }
        }
        this.internalValue = val
        this.optionArr = this.options.map(item => {
          if (this.internalValue.includes(item.value)) {
            return { ...item, check: true }
          } else {
            return { ...item, check: false }
          }
        })
      },
      immediate: true
    },
    options: {
      handler: function(val) {
        this.optionArr = val
      },
      immediate:true
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', e)
      this.optionArr = this.optionArr.map(item => {
        if (e.includes(item.value)) {
          return { ...item, check: true }
        } else {
          return { ...item, check: false }
        }
      })
    },
    handleCheckAll(e) {
      this.optionArr = this.optionArr.map(item => {
        return { ...item, check: e.target.checked }
      })
      this.$emit('change', e.target.checked ? this.optionArr.map(item => item.value) : [])
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>
<style lang="less" scpoed >
.SelectAll {
  position: relative;
  display: block;
  padding: 5px 12px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.65);
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease;
  &:hover {
    background-color: #e6f7ff;
  }
}
.select-container {
  width: 150px;
}
</style>
