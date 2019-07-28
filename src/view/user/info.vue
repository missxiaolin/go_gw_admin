<template>
  <div>{{result.address}}</div>
</template>

<script>
import {userInfo} from 'api/user'
import { ERR_OK } from '@/api/config'

export default{
  'name': 'user-info',
  data(){
    return {
      result:''
    }
  },
  created(){
    this.userInfo()
  },
  methods:{
    async userInfo()
    {
      let info = await userInfo()
      console.log(111)
      console.log(info)
      if(info.code == ERR_OK){
        this.result = info.data
      }
    },
  }
}
</script>

<style>
</style>
