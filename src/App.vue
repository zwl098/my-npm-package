<template>
  <div  id="app">
    <CheckBoxSelect :options="options" v-model="value"></CheckBoxSelect>
  </div>
</template>

<script>
import CheckBoxSelect from './components/checkBoxSelect.vue'

export default {
  name: 'App',
  components: {
    CheckBoxSelect
  },
  data(){
    return {
      options:[
        {
          label:'123',
          value:'123'
        },
        {
          label:'222',
          value:'222'
        },
        {
          label:'33',
          value:'33'
        },
      ],
      value:[]
    }
  }
}
</script>

<style>
</style>
