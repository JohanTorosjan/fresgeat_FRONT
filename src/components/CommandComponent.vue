<template>
    <div id="main" v-if="!error">
    
      <div class="col s6" id="DisplayMenu">
        <h1>Menu of {{pseudo}}</h1>
         <table v-for="item in menu" :key="item.id_rec">
          
         
            <div v-if='item.isActive=="TRUE"'>
            <thead>
              <tr> 
               
                <th scope="col"> <h2> {{item.name}}</h2> </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                 <th>
                   <p> Description:  </p>
                </th> 
                <th>
                  {{item.description}}
                </th>
              </tr>
                <tr>
                 <th>
                   <p> Sector:  </p>
                </th> 
                <th>
                  {{item.sector}}
                </th>
              </tr>
                <tr>
                 <th>
                   <p> Price:  </p>
                </th> 
                <th>
                  {{item.price}}
                </th>
              </tr>
                              
              
              
              
            
        
            </tbody>
            <SubmitOrder :id_cook="id_cook" :id_rec="item.id_rec" :price="item.price" ></SubmitOrder> 
         </div>
          </table>
        
 
        
    
        
    </div>

          
    </div>
    <div id="nomenus" v-else>
      This cooker hasn't published menus yet...
    </div>
</template>

<script>
import axios from "axios"
import SubmitOrder from "./SubmitOrder.vue"
export default {
    name:'CommandComponent',
    components:{
      SubmitOrder},
    props: {
		id_cook: {
			type: Number,
			required: true
		},
    pseudo:{
      type:String,
      required: true
    }
    },
    data(){
        return{
          menu:{},
          error:false
        }
    },
    beforeMount(){

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
h1{
    font-family:"fresheat";

}
#DisplayMenu{
  padding:5%
}
h1{ 
  text-decoration: underline;
  text-align: center;
}
h2{

  font-family:"fresheat";
}
</style>