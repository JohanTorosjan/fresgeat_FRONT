<template>
<div id="main">
    <nav>
      <div class="nav-wrapper">
      <a href="#" class="brand-logo center" id="mainlogo">FreshEat </a>
      <ul id="nav-mobile" class="left">
        <li> 
           <router-link  to="/customerHome">
           <i class="material-icons left hide-on-small-only">keyboard_backspace</i>
               Back
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
         
      </ul>
      </div>
    </nav>

    <div class="container">
    <div id="display" v-if="!error">
        <table>
  <caption><h2>Your cookers </h2></caption>
  <thead>

  </thead>
  <tbody>
      <tr v-for="cooker in Cookers" :key="cooker.id_cook">
          <th scope="row"> {{cooker.pseudo}}</th>
          <th v-if='cooker.isAvailable=="TRUE"'> <i id="online" class="material-icons left"> fiber_manual_record</i> </th>
          <th v-else><i id="offline" class="material-icons left"> fiber_manual_record</i> </th>
          <th v-if='cooker.isAvailable=="TRUE"'><a @click="ChosedCooker(cooker.id_cook,cooker.pseudo)" class="waves-effect waves-light btn-small">Order</a> </th>
          <th v-else><a class="btn disabled">Order</a> </th>
       </tr> 
  </tbody>
  </table>    
    </div>
    
    <div id="nodisplay" v-else>
        Sorry, you don't have cookers yet...
    </div>
    </div>
     <div id="askcooker" v-if="wanttoorder">
         <i id="closeicon" class="material-icons left" @click="closeask"> close</i>
            <CommandComponent :id_cook="chosedcooker" :pseudo="pseudocooker"></CommandComponent>

    </div>
</div>
</template>

<script>
import axios from "axios"
import router from "@/router"
import CommandComponent from '../components/CommandComponent.vue'

export default {
    name:'AvailablesCook',
    components:{
        CommandComponent,
    },
    data(){
    return{
        Cookers:[{}],
        error:false,
        wanttoorder:false,
        chosedcooker:"",
        pseudocooker:"",
        }
    },
    methods:{
        ChosedCooker(id_cook,pseudo){
            this.wanttoorder=true;
            this.chosedcooker=id_cook;
            this.pseudocooker=pseudo;
        },
        closeask(){
            this.wanttoorder=false;
            this.chosedcooker="";

        },
        gotoOrders(){router.push("/MyOrders")},

    },
 

    beforeMount() {
        axios.get(`https://fresheat-api.herokuapp.com/names/${sessionStorage.getItem('id')}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
        .then(res=>{
            console.log(res)
            if(res.data.message=="NO match"){this.error=true;}
            else
            {this.Cookers=res.data;}
            if(res.status==404){console.log(res)}})
        .catch(err=>console.log(err))
    },
       created(){
            if (this.Cookers.length==0){this.error=true;}
        }
}
</script>
<style scoped >

h2{
    font-family:"fresheat";
    text-decoration: underline;
}
a{
     background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
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
  margin-top:5%;
  margin-bottom:5%;
  padding:5%;
}


#online{
    color:rgb(27, 255, 38)
}
#offline{
    color:rgb(255, 0, 0)
}

#askcooker{
    z-index:1;
        background-color: rgba(236, 236, 236, 0.904);
        position: fixed;
        top: 10%;
        bottom: 10%;
        right: 10%;
        left: 10%;
        transition: transform .2s;
        border: 4px solid rgb(161, 161, 161);
        overflow: auto;
}



#askcooker:hover {
    transform: scale(1.1); 
  }

    #closeicon{

    }

</style>