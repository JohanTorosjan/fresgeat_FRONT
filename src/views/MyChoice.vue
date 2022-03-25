<template>
<div class="main">

    <nav>
      <div class="nav-wrapper">
      <a href="#" class="brand-logo center" id="mainlogo">FreshEat</a>
      <ul id="nav-mobile" class="left">
        <li> 
           <router-link  to="/CustomerLogin">
               Customer
           </router-link>
         </li>
       </ul>
      <ul class="right">
       <li><router-link  to="/CookerLogin">
               Cooker
           </router-link></li>
           </ul>
    </div>
  </nav>
  <div class="container">
    <h1> WELCOME TO FRESHEAT</h1>

  </div>
</div>     
      
</template>
<script>


export default {
  data() {
    return{}
    
  },
  beforeMount(){
    sessionStorage.clear();
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
  color:rgb(152, 127, 163);
   padding-top:150px;
    padding-bottom:150px;
    margin-bottom: 120px;
   text-align: center;
}
</style>