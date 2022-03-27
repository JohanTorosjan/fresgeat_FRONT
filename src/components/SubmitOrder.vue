<template>
    
      <div id="orderform">
    <FormulateForm
  v-model="formValues"
  @submit="submit()"
>
<p>Quantity</p>
     <FormulateInput
  type="number"
  name="quantity"
  validation="required|number|between:0,100"
  min="1"
  max="100"
/>
<p>Hour</p>
<FormulateInput
  type="time"
  name="hour"
  label="Hour wanted"
  placeholder="Enter the hour you would like to recup your command"
  validation="required"
/>
  <button class="btn waves-effect waves-light" type="submit" name="action">Command
  </button>
</FormulateForm>

  </div>
</template>

<script>
import axios from "axios";
import router from '@/router';
export default {
    name:'SubmitOrder',
    props: {
		id_cook: {  
			type: Number,
			required: true
		},
        id_rec:{
            type:Number,
            required: true
        },
        price:{
            type:Number,
            required:true
        }
    },
    data(){
        return{
            formValues:{},
            hour:"",
            product:"",
            quantity:0,
            message:"",

        }
    },
    methods:{
        calculprice(quantity,price){
            return quantity*price;
        },
        submit(){
            if(this.formValues.quantity==0 || this.formValues.hour==""){return 0}
            console.log(this.formValues.quantity)
            console.log(this.calculprice(this.formValues.quantity,this.price))
            axios.post("https://fresheat-api.herokuapp.com/order/Create",{
                id_cook:this.id_cook,
                quantity:this.formValues.quantity,
                hours:this.formValues.hour,
                id_rec:this.id_rec,
                id_cust:sessionStorage.getItem('id'),
                price:this.calculprice(this.formValues.quantity,this.price)
                },
                {
                    headers:{ Authorization :  `Bearer ${sessionStorage.getItem("Token")}`}
                }) 
                
            .then((result) =>{ 
                    router.push("/MyOrders")
                    console.log(result);

                    })
        .catch(error=>alert("unknow error during creating order: "+error))
        
    }
    },
    mounted(){

    }

}

</script>
<style scoped>
button{
    
     background:linear-gradient(180deg, #8a5b7e, #e419ff);
}
#orderform{

    border:1px solid black
}

</style>