<template>
  <div class="signuppage">
    <nav>
      <div class="nav-wrapper">
       <a href="#" class="brand-logo center hide-on-small-only"  id="mainlogo">FreshEat</a>
      <ul class="left">
                   <li>
                <router-link to="/">Home </router-link> 
           </li>
        <li> 
           <router-link  to="/CustomerLogin">
               Customer
           </router-link>
         </li>
        <li><router-link  to="/CookerLogin">
               Cooker
           </router-link>
           </li>

      </ul>
    </div>
  </nav>

    <div class="container">
  <FormulateForm
  v-model="formValues"
  @submit="submit()"
>
  <FormulateInput
  name="msg"
  label="Enter the secret code"
/>

<FormulateInput
  name="pseudo"
  label="Choose a pseudo"
  validation="between:8,20,length"
  error-behavior="live"
  :validation-messages="{ matches: 'Pseudo must be between 8 and 20 characters.' }"
/>

<FormulateInput
  type="password"
  name="password"
  label="Choose a password"
  validation="between:8,20,length"
  error-behavior="live"
  :validation-messages="{ matches: 'Passwords must be between 8 and 20 characters.' }"
/>
  <button class="btn waves-effect waves-light" type="submit" name="action">Submit
  </button>
</FormulateForm>
<p id="ok" v-if='message=="created"'> Your account has been created ! Go back to <router-link to="../CookerLogin"> connection </router-link>  </p>
<p v-else-if='message=="INVALID SECRET CODE"'>Sorry, your secret code is wrong...</p>

    </div>





  </div>
</template>

<script>

import axios from 'axios'
const CryptoJS = require("crypto-js")
export default {
  name: 'CustomerLogin',
  data(){
    return{
   formValues:{},
    message:"",
    }
  },
  methods:{
    submit(){
      var password=CryptoJS.AES.encrypt(this.formValues.password, "IShallNotPostAnyPasswordsInClear").toString()
      axios.post("https://fresheat-api.herokuapp.com/signup/cooker/",{msg:this.formValues.msg,pseudo:this.formValues.pseudo,password:password})
      .then((response) =>{console.log(response) ;this.message=response.data.message})
      .catch((error) =>alert(error))
    }
  }
}

</script>
<style scoped>
@font-face
{
    font-family:"fresheat";
    src:url("../assets/fresheat.otf")   
}

#mainlogo{
       font-family:"fresheat";
}
.nav-wrapper{
   background:linear-gradient(180deg, #8a5b7e, #e419ff);
}

.container{
  background-color:rgb(255, 255, 255);
  border: 2px solid rgb(0, 0, 0);
  margin-top:150px;
  margin-bottom:150px;
  padding:5%;
}
button{
     background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
#ok{
  color:black
}
p{
  color:red;
}

</style>