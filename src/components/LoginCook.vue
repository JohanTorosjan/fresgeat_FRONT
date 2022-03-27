<template>
  <div id="logincook">
    <!-- <label for="pseudo">Pseudo : </label>
    <input type="pseudo" v-model="pseudo" id="pseudo">
    <label for="password">Password : </label>
    <input type="password" v-model="password" id="password">
    <button @click="submit">Send</button> -->
    <FormulateForm
  v-model="formValues"
  @submit="submit()"
>
  <FormulateInput
  name="pseudo"
  label="Enter your pseudo"
/>
<FormulateInput
  type="password"
  name="password"
  label="Password"
/>
  <button class="btn waves-effect waves-light" type="submit" name="action">login
  </button>
</FormulateForm>
<div v-show="failed">
<p >No matching users with this email or password </p>
</div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'
const CryptoJS = require("crypto-js")
export default {
  name: 'LoginCook',
  data(){
    return{
    formValues:{},
    failed:false,
    }
},

  methods:{
    submit(){
      var password=CryptoJS.AES.encrypt(this.formValues.password, "IShallNotPostAnyPasswordsInClear").toString()
      axios.post("https://fresheat-api.herokuapp.com/login/cooker",{pseudo:this.formValues.pseudo,password:password})
      .then((result) =>{ 
      console.log(result);  
      sessionStorage.setItem("Token",result.data.token);
      sessionStorage.setItem("id",result.data.id);
      router.push('/cookerHome')
      })
      .catch(this.failed=true)
    },
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
