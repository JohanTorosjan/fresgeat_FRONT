<template>
<div>   
      <nav>
      <div class="nav-wrapper">
      <a href="#" class="brand-logo center hide-on-small-only"  id="nice">FreshEat </a>
      <ul id="nav-mobile" class="left">
        <li> 
           <router-link   to="/cookerHome">
           <i class="material-icons left ">keyboard_backspace</i>
               Back
           </router-link>
         </li>
      </ul>


      <ul class="right">
          <li>
             <router-link to="/addReceipes"><i class="material-icons left">add</i> Add a new receipe</router-link>
          </li>
          <li>
             <SwitchButton :id_cook="id_cook"></SwitchButton>
          </li>
      </ul>
    </div>
  </nav>

    <div class="container">

    <table @mouseover="actualise()" > 
    <thead>
        <tr>
      <th scope="col">Pseudo</th>
      <th scope="col">Product</th>
      <th scope="col">Hour</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total</th>
      <th scope="col">Statut</th>
    </tr>
  </thead>
    <tbody>
        <tr v-for="order in orders" :key="order.id_ord">
            <th scope="row"> {{order.pseudo}}</th>
            <th scope="row"> {{order.name}}</th>
            <th scope="row"> {{order.hours}}</th>
            <th scope="row"> {{order.quantity}}</th>
            <th scope="row"> {{order.prices}} $ </th>
        <th> <p v-if='order.isValidated=="0"'> <button class="waves-effect waves-light btn-small" @click="check(1,order.id_ord)">VALIDATE</button> <button class="waves-effect waves-light btn-small" @click="check(2,order.id_ord)">REJECT</button></p>
                <p v-else-if='order.isValidated=="1"'> <i class="material-icons left">check</i> </p>
                <p v-else> <i id="closeicon" class="material-icons left"> close</i></p></th>
        </tr>
    </tbody>

</table>

</div>


</div>
    
</template>
<script>
import axios from "axios";
import SwitchButton from '../components/SwitchButton.vue'
export default {
    name:'commandTab',
        components:{
        SwitchButton,
        },
    data() {
        return {
            id_cook:"",
            orders:[{}]
        }
        
    },
    methods:{
        check(yOn,id_ord){

             axios.put(`http://localhost:8081/order/check/${id_ord}`,

             {
            yOn:yOn
            },
            {
                 headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`}
            
            }
            ,
           
            )
            .then(res=>console.log(res))
            .catch(error=>console.log(error))

        },
        actualise(){
             axios.get(`http://localhost:8081/order/getbyid/cook/${sessionStorage.getItem('id')}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
          .then(response=>{var datas=response.data;
          if(Array.isArray(datas)){
              console.log(datas)
              this.orders=datas.reverse()
          } 
          })
          .catch(error => alert(error))


        }

    },


    
    mounted(){
        this.id_cook=sessionStorage.getItem('id');
        axios.get(`http://localhost:8081/order/getbyid/cook/${sessionStorage.getItem('id')}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
          .then(response=>{var datas=response.data;
          if(Array.isArray(datas)){
              console.log(datas)
              this.orders=datas.reverse()
          } 
          })
          .catch(error => alert(error))

    },
    
}
</script>

<style scoped>
@font-face
{
   font-family:"fresheat";
    src:url("../assets/fresheat.otf")   
}
h1{
  text-align: center;
  font-family:"fresheat";
}
#nice{
   font-family:"fresheat";
}
.nav-wrapper{
      background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
table{  
    background-color: azure;
    
   border-collapse: collapse;
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
button{
     background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
</style>
