<template>
<div id="main">
    <nav>
      <div class="nav-wrapper">
      <a href="#" class="brand-logo center hide-on-small-only"  id="mainlogo">FreshEat</a>
      <ul id="nav-mobile" class="left">
        <li> 
           <router-link  to="/">
           <i class="material-icons left hide-on-small-only">keyboard_backspace</i>
               Disconnect
           </router-link>
         </li>
      </ul>


      <ul class="right">
          <li>
      <router-link to="/MyOrders">
<i class="material-icons right hide-on-small-only">thumb_up</i>
               My Orders
               </router-link>
          </li>  
          <li> <router-link to="/AvailablesCook">
                    <i class="material-icons right hide-on-small-only">pan_tool</i>
                        Your cookers 
                        </router-link>
          </li>
      </ul>
    </div>
  </nav>
  <div class="container">
    
          
    <div id=research>

        <FormulateForm
        v-model="searchedcooker"
            @submit="submit()"
            
>
          <FormulateInput
            name="name"
            label="Search a cooker"
/>

        <button class="waves-effect waves-light btn-large">Search </button> <i  class="material-icons right">search</i>
        <p v-if='msg=="NO match"'>Sorry, this cooker doesn't exists... </p>
</FormulateForm>
    
    
  

    
    
    </div>
    


           
      </div>



</div>
</template>
<script>
import router from '@/router'
import axios from 'axios'
export default {
    name:'customerHome',
    data(){
        return{
            msg:"",
            searchedcooker:{},
        }   
    },
    methods:{
       
        submit(){
            axios.get(`https://fresheat-api.herokuapp.com/cooker/getbypseudo/${this.searchedcooker.name}`,
             { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
             .then(response => {this.msg=response.data.message;
             if (this.msg!="NO match"){sessionStorage.setItem("searchedcooker",response.data.pseudo);sessionStorage.setItem("idsearchedcooker",response.data.id_cook);router.push("/askCooker")}})
             .catch(error=>alert(error))

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

p{
    color:red;
}


</style>