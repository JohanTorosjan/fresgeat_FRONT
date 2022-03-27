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
                <router-link to="/commandTab"><i class="material-icons left">shopping_cart</i>Commands</router-link> 
          </li>
          <li>
             <SwitchButton :id_cook="id_cook"></SwitchButton>
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
  type="text"
  name="name"
  label="Enter the name of your meat"
  validation="required"
/>
<FormulateInput
  type="text"
  name="description"
  label="Enter a quick description"
  validation="required"
/>
<FormulateInput
  type="text"
  name="sector"
  label="Say where your clients can comme get their meat"
  validation="required"
/>
<FormulateInput
  type="number"
  name="price"
  label="Enter the price"
  min="0"
  max="100"
  validation="required|number|between:1,100"
/>
 
 <button class="btn waves-effect waves-light" type="submit" name="action">Submit
  </button>
</FormulateForm>

 <p>{{msg}}</p>



  </div>

  </div>
</template>
<script>
import axios from 'axios'
import router from '@/router'
import SwitchButton from '../components/SwitchButton.vue'
export default {
    name:'addReceipes',
        components:{
        SwitchButton,
        },

    data() {
        return {
            id_cook:"",
            formValues:{},
            msg:""
            
        }
        
    },
    methods:{
        submit(){
             axios.put(`https://fresheat-api.herokuapp.com/receipe/add/${this.id_cook}`,

             {
            name:this.formValues.name,
            description:this.formValues.description,
            sector:this.formValues.sector,
            price:this.formValues.price,
            },
            {
                 headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`}
            
            }
            ,
           
            )
            .then(this.msg="Your receipe has been add ! ")
            .catch(error=>console.log(error))
            router.push("/cookerHome");
        }
    },

    
    mounted(){
        this.id_cook=sessionStorage.getItem('id');
    }

    
}
</script>



<style scoped>
#nice{
   font-family:"fresheat";
}
.container{
  background-color:rgb(255, 246, 246);
  border: 2px solid rgb(0, 0, 0);
  padding-bottom: 5%;
  margin-top:150px;
  padding:5%;
}
button{
     background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
.nav-wrapper{
      background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
</style>