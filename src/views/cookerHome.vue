<template>
    <div id="main">
    <nav>
      <div class="nav-wrapper">
          
      <a href="#" class="brand-logo center "  id="mainlogo"> FreshEat </a>
     
      
      <ul id="nav-mobile" class="left">
        <li> 
           <router-link   to="/">
           <i class="material-icons left">keyboard_backspace</i>
               Disconnect
           </router-link>
         </li>
      </ul>


      <ul class="right">
          <li>
              <SwitchButton :id_cook="id_cook"></SwitchButton>
          </li>
        

      </ul>
    </div>

  </nav>
       

    <div class="mylinks">
        <p><router-link to="/commandTab"><i class="material-icons left ">shopping_cart</i>Commands</router-link> 
        </p>
           
            <a @click="displayasks"><i class="material-icons left">person_add</i> Friends requests </a>
           
    </div>

        <div class="container" @mouseover="actualise()">

             <h1> Your menu </h1>

     <router-link to="/addReceipes"><i class="material-icons left">add</i> Add a new receipe</router-link>
     <table v-for="receipes in menu" :key="receipes.id_rec">
            <div v-if='receipes.isActive=="TRUE"'>
            <thead>
              <tr> 
               
                <th scope="col"> <h2> {{receipes.name}}</h2> </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                 <th>
                   <p> Description:  </p>
                </th> 
                <th>
                  {{receipes.description}}
                </th>
              </tr>
                <tr>
                 <th>
                   <p> Sector:  </p>
                </th> 
                <th>
                  {{receipes.sector}}
                </th>
              </tr>
                <tr>
                 <th>
                   <p> Price:  </p>
                </th> 
                <th>
                  {{receipes.price}}
                </th>

                 <th>
                        <button class="waves-effect waves-light btn-small" @click="deletereceipe(receipes.id_rec)"> DELETE </button>
                  </th>
              </tr>

            </tbody>
            </div>
        </table>
            
        </div>
        <div id="myasks" v-if="display">
            <button class="waves-effect waves-light btn-large" @click="displayasks">Close</button>
            <h1>Your friends requests</h1>
            <div class="container">
            <FriendsRequests :id_cook="id_cook"></FriendsRequests>
            </div>
        </div>
      

      
    </div>
</template>

<script>

import SwitchButton from '../components/SwitchButton.vue'
import FriendsRequests from '../components/FriendsRequests'
import axios from 'axios'
export default {
    name:'CookerHome',
    components:{
        SwitchButton,
        FriendsRequests,
    },
    data() {
        return{
            id_cook:"",
            display:false,
            menu:[{}],
            orders:[{}]

        }
    },
   
    methods:{

        displayasks(){
            if(this.display==true){this.display=false}
            else{this.display=true}
        },
        deletereceipe(id_rec){
            axios.delete(`http://localhost:8081/receipe/delete/${id_rec}`,
                        {
                 headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`},
            },
            )
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
        },
        actualise(){
            axios.get(`http://localhost:8081/receipe/${this.id_cook}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
        .then(res=>{
            console.log(res)
            if(res.data.message=="NO match"){this.error=true;}
            else
            {this.menu=res.data;}
            if(res.status==404){console.log(res)}})
        .catch(err=>console.log(err))
        }

       

    },
    
    mounted(){
        this.id_cook=sessionStorage.getItem('id');
         axios.get(`http://localhost:8081/receipe/${this.id_cook}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
        .then(res=>{
            console.log(res)
            if(res.data.message=="NO match"){this.error=true;}
            else
            {this.menu=res.data;}
            if(res.status==404){console.log(res)}})
        .catch(err=>console.log(err))
         

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
h1,h2{
    text-align: center;
 font-family:"fresheat";

}
h1{
    text-decoration: underline;
}
.nav-wrapper{
      background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
.mylinks{
    padding-top:0.5%;
    padding: 1%;
   
}
#myasks{
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
#myasks:hover {
    transform: scale(1.1); 
  }
.container{
  background-color:rgb(255, 255, 255);
  border: 2px solid rgb(0, 0, 0);
  margin-bottom:150px;
  padding:5%;
}
button{
     background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
#nice{
   font-family:"fresheat";
}

#myasks>h1{
    text-align: center;}

</style>