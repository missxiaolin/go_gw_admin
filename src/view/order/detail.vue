<template>
	<div class="app-container">
<el-form ref="form" :model="form" label-width="120px"> 

	 <el-form-item label="询价单标题:">
	  <el-col :span="11">
	    {{form.draw.title}}
	  </el-col>
	</el-form-item>
	    <el-form-item label="数量:">
	    <el-col :span="11">
	      {{form.draw.number}}
	    </el-col>
	  </el-form-item>
	  
  <el-form-item label="实际金额:">
    <el-col :span="11">
      {{form.price}}
    </el-col>
  </el-form-item>
    <el-form-item label="预记付款:">
    <el-col :span="11">
      {{form.front_price}}
    </el-col>
  </el-form-item>
  <el-form-item label="合同协议:">
    <el-col :span="11">
      {{form.content}}
    </el-col>
  </el-form-item>
    <el-form-item label="供方状态:">
    <el-col :span="11">
      {{form.status}}
    </el-col>
  </el-form-item>
    <el-form-item label="供方报价:">
    <el-col :span="11">
      {{form.offer.price}}
    </el-col>
  </el-form-item>
  
      <el-form-item label="供方公司:">
    <el-col :span="11">
      {{form.supplyUser.company}}
    </el-col>
  </el-form-item>
    <el-form-item label="供方公司:">
    <el-col :span="11">
      {{form.supplyUser.mobile}}
    </el-col>
  </el-form-item>
  
      <el-form-item label="需方公司:">
    <el-col :span="11">
      {{form.requireUser.company}}
    </el-col>
  </el-form-item>
    <el-form-item label="需方公司:">
    <el-col :span="11">
      {{form.requireUser.mobile}}
    </el-col>
  </el-form-item>
    <el-form-item label="需方状态:">
    <el-col :span="11">
      {{form.draw_statusice}}
    </el-col>
  </el-form-item>
  
      <el-form-item label="更新时间:">
    <el-col :span="11">
      {{form.created_at}}
    </el-col>
  </el-form-item>
  
 </el-form> 
</div>
</template>
<script>
	import { ERR_OK } from '@/api/config'
	import { Message } from 'element-ui'
	import { getToken } from '@/common/js/cache'
	import { orderDetail} from '@/api/order'
	
  export default {
    data() {
      return {
        form: {
			price:0,
			draw:{
				title:'',
			},
			offer:{
				price:0
			},
			requireUser:{
				company:'',
			},
			supplyUser:{
				company:'',
			}
        }
      }
    },
	created:function (){
		this.detail()
	},
    methods: {
		async detail()
		{
			var query = this.$route.query
			var detail = await orderDetail(query)
			console.log(detail)
			if(detail.code == ERR_OK) {
				this.form = detail.data
			}
		}
    }
  }
</script>
<style>
	
</style>