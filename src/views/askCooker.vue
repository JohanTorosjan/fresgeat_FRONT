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
          <li> <router-link to="/AvailablesCook">
                    <i class="material-icons right hide-on-small-only">pan_tool</i>
                        Your cookers 
                        </router-link>
          </li>
      </ul>
      </div>
    </nav>

    <div class="container">
        <h1>{{cookername}}</h1>
         <textarea id="icon_prefix2" class="materialize-textarea" v-model="msg" autofocus required placeholder="Type your message, maximum 180 characters" maxlength="100"  cols="50" rows="10" wrap="hard">
         </textarea>
         <button class="waves-effect waves-light btn-large" @click="submit">SEND</button>
  <p>{{displaymsg}}</p>     </div>
    </div>
</template>
<script>
import axios from "axios";
import router from "@/router";
//import router from "@/router";
export default {
    data(){
        return{
            cookername:sessionStorage.getItem("searchedcooker"),
            cookerid:sessionStorage.getItem("idsearchedcooker"),
            msg:"",
            displaymsg:""
            
        }
    },
    methods: {
    submit(){
            if(this.msg==""){alert("Please enter something...");return;}
                axios.post("http://localhost:8081/message/post",
                {
                    id_cook:this.cookerid,
                    id_cust:sessionStorage.getItem('id'),
                    msg:this.msg
                    
                },
                {
                    headers:{ Authorization :  `Bearer ${sessionStorage.getItem("Token")}`}
                }) 
                
            .then((result) =>{ 
                    this.displaymsg=result.data.message;
                    console.log(result)
                    })
        .catch(error=>this.displaymsg=error.response.data.message)    
    },
            gotoOrders(){router.push("/MyOrders")},
        gotoCooks(){router.push("/AvailablesCook")},


}

    

}
</script>

<style scoped>
p{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
button{
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
     font-family:"fresheat";
  background-color:rgb(255, 255, 255);
  border: 2px solid rgb(0, 0, 0);
  margin-top:150px;
  margin-bottom:150px;
  padding:5%;
}
</style>