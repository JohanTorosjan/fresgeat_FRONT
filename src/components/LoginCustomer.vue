<template>
<div id="main">
<FormulateForm
  v-model="formValues"
  @submit="submit()"
>
  <FormulateInput
  type="email"
  name="email_"
  label="Enter your email address"
  validation="email"
/>
<FormulateInput
  type="password"
  name="password"
  label="Password"
/>
  <button class="btn waves-effect waves-light" type="submit" name="action">Login
  </button>
</FormulateForm>
<p v-show="failed">No matching users with this email or password </p>
</div>
</template>

<script>
import axios from "axios";
import router from "@/router";
const CryptoJS = require("crypto-js")
export default {
  name: 'LoginCustomer',
 data(){
    return{
      formValues:{},
      failed:false,
    }
},
methods: {
  submit(){
    var password=CryptoJS.AES.encrypt(this.formValues.password, "IShallNotPostAnyPasswordsInClear").toString()
    console.log(password);
    axios.post("http://localhost:8081/login/customer",{email_:this.formValues.email_,password:password})
    .then((result) =>{ 
    console.log(result);  
    sessionStorage.setItem("Token",result.data.token);
    sessionStorage.setItem("id",result.data.id)
    router.push('/customerHome')
    })
    .catch(this.failed=true)
  }

}


}

</script>



<style scoped>

button{
     background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
p{
  color:red
}
</style>
