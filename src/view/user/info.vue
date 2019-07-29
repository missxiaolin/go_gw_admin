<template>
		 <div class="app-container">
	    <div class="routes-main-container" style="margin-top:30px;">
				<el-form ref="form" :model="form" label-width="80px">
					
					<el-button class="wallet" type="primary" @click="wallet(form)">申请提现</el-button>
					
						<el-form-item label="公司名称">
							<el-input v-model="form.company"></el-input>
						</el-form-item>
							
						<el-form-item label="地址">
							<el-input v-model="form.address"></el-input>
						</el-form-item>
						
						<el-form-item label="联系人">
							<el-input v-model="form.contact"></el-input>
						</el-form-item>
						
						<el-form-item label="邮箱">
							<el-input v-model="form.email"></el-input>
						</el-form-item>
						
						<el-form-item label="手机号">
							<el-input v-model="form.mobile"></el-input>
						</el-form-item>
						
						<el-form-item label="余额">
							<el-input v-model="form.wallet"></el-input>
						</el-form-item>
						
						<el-form-item label="状态">
							<el-input v-if="form.user_auth.status==1" value="审核通过"></el-input>
							<el-input v-else-if="form.user_auth.status==2" value="审核未通过"></el-input>
							<el-input v-else value="已提交"></el-input>
						</el-form-item>
						
				</el-form>
				
		</div>
	</div>
	
</template>

<script>
import {userInfo} from 'api/user'
import { ERR_OK } from '@/api/config'

export default{
  'name': 'user-info',
  data(){
    return {
      form:{
		  user_auth:{
			  status:'',
		  },
		}
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
        this.form = info.data
      }
    },
	wallet(from){
		var form = this.form;
		console.log(from);
		this.$router.push({
			path:'/user/wallet',
			query:{
				wallet:form.wallet
			}
		})
	},
  }
}
</script>

<style>
	.wallet{
		margin-bottom:20px;
		}
</style>
