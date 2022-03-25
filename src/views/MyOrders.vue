<template>
<div >
<nav>
      <div class="nav-wrapper">
      <a href="#" class="brand-logo center" id="mainlogo">FreshEat </a>
      <ul id="nav-mobile" class="left">
        <li> 
           <router-link  to="/customerHome">
           <i class="material-icons left">keyboard_backspace</i>
               Back
           </router-link>
         </li>
      </ul>
      
      </div>
    </nav>
    <div v-if='msg==""'  class="container" id="display">
       
        <table >
              <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col"> Cooked by</th>
      <th scope="col"> Location </th>
      <th scope="col">Hour</th>
      <th scope="col">Statut</th>
    </tr>
  </thead>
        <tbody>
             <tr @mouseover="actualise()" v-for="order in orders" :key="order.id_ord">
          <th scope="row"> {{order.name}}</th>
           <th scope="row"> {{order.quantity}}</th>
        <th scope="row"> {{order.prices}} $</th>
        <th scope="row"> {{order.pseudo}}</th>
<th scope="row"> {{order.sector}}</th>
<th scope="row"> {{order.hours}}</th>
<th scope="row" v-if='order.IsValidated=="0"'> <p id="yOn"> Not answred</p></th>
<th scope="row" v-else-if ='order.IsValidated=="1"'> <p id="y">Validated</p></th>
<th scope="row" v-else> <p id="n"> Cancelled</p></th>
       </tr> 
  </tbody>
  </table>    
</div>
<div v-else class="container" id="display"></div>
<h1>{{msg}}</h1>
    
</div>
    
</template>
<script>
import axios from "axios"

export default {
    data(){
        return{
            orders:[{}],
            msg:""

        }

    },
    methods: {
        actualise(){
           axios.get(`http://localhost:8081/order/getbyid/${sessionStorage.getItem('id')}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
          .then(response=>{var datas=response.data;
          if(Array.isArray(datas)){
              this.orders=datas.reverse()
          }
          else{
              this.msg="No orders for the moment";
          }
              })
          .catch(error => alert(error))

        }
    },
    beforeMount(){
           axios.get(`http://localhost:8081/order/getbyid/${sessionStorage.getItem('id')}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
          .then(response=>{var datas=response.data;
          if(Array.isArray(datas)){
              this.orders=datas.reverse()
          }
          else{
              this.msg="No orders for the moment";
          }
              })
          .catch(error => alert(error))

        }
    
}
</script>

<style scoped>
#y{
    color:green;
}
#n{
    color:red
}
#yOn{
    color:orange
}

@font-face
{
    font-family:"fresheat";
    src:url("../assets/fresheat.otf")   
}

#mainlogo{
       font-family:"fresheat";
}
h1{
    color: #ffffff;
    text-align: center;
    font-family:"fresheat";
}
.nav-wrapper{
   background:linear-gradient(180deg, #8a5b7e, #e419ff);
}

table{  
    background-color: azure;
    
   border-collapse:collapse;
    font-size: 0.9em;
    font-family: sans-serif;

   
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  
}
.container{
    margin-top: 3%;
        justify-content: center;
        overflow:scroll;
         height:800px;



}
</style>