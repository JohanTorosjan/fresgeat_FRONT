<template>
    <div class="logingpage">
        <nav>
      <div class="nav-wrapper">
      <a href="#" class="brand-logo center hide-on-small-only" id="mainlogo">FreshEat</a>
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

    <LoginCook></LoginCook>
    <p><router-link to="CookerSignup"> Register with your secret code here </router-link> </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginCook from '../components/LoginCook.vue'

export default {
  name: 'CookerLogin',
  components: {
    LoginCook
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

</style>