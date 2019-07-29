<template>
	<div class="wallet">
<el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="提现金额">
			<el-input v-model="form.money"></el-input>
		  </el-form-item>
		  
		  <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
	</div>
</template>

<script>
	import { ERR_OK } from '@/api/config'
	import { userApply } from '@/api/user'
	
	export default{
		data(){
			return{
				rules: {
				    money: [{
				        required: true,
				        message: '请输入金额',
				        trigger: 'blur'
				    }],
					},
				form:{
					wallet:0,
					money:0
				}
			}
		},
		created(){
			var query = this.$route.query
			this.form.wallet = query.wallet
			this.form.money = query.wallet
			console.log(query)
		},
		methods:{
			async apply()
			{
				var money = this.form.money
				var money = Number(money)
				var query = {
					money:money
				}
				var res = await userApply(query);
				console.log(res)
				if (res.code == ERR_OK) {
				    this.$router.push({
				        path: '/user/info'
				    })
				}
			},
			onSubmit(form){
				let self = this
				this.$refs[form].validate((valid) => {
				    if (valid) {
				    self.apply()
				    } else {
				        console.log('error submit!!')
				        return false
				    }
				})
			}
		}
	}
</script>

<style>
	.wallet{
		margin-top:40px;
		}
</style>
