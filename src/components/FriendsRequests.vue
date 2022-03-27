<template>
<div v-if="length>0"  @mouseover="actualise">
<table> 
    <thead>
        <tr>
      <th scope="col">Name</th>
      <th scope="col">Message</th>
    </tr>
  </thead>
    <tbody>
        <tr v-for="requests in FriendsRequests" :key="requests.id_cust">
            <th scope="row"> {{requests.pseudo}}</th>
            <th scope="row"> {{requests.message}}</th>
            <th scope="row"> <button  class="waves-effect waves-light btn-small" @click="acceptrequest(requests.id_cust)"> Accept </button>
         <button  class="waves-effect waves-light btn-small" @click="deleterequest(requests.id_cust)"> Delete </button> </th>

        </tr>
    </tbody>

</table>

    
    </div>
    <div v-else> You don't have any friends requests</div>
</template>

<script>
import axios from "axios"
export default {
    name:'FriendsRequests',
    data() {
        return {
            FriendsRequests:[{}],
            choice:"",
           
        }
        
    },
    props:{
        id_cook:{
            type:String,
            required:true,
        }
    },
    computed:{
        length: function(){
            return this.FriendsRequests.length;
        }

    },
    methods:{
         actualise(){
        axios.get(`https://fresheat-api.herokuapp.com/message/getbyid/${this.id_cook}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
        .then(res=>{console.log(res);this.FriendsRequests=res.data})
        .catch(err=>console.log(err))

    },
        acceptrequest(id_cust){
            axios.put(`https://fresheat-api.herokuapp.com/demands/accept/${this.id_cook}`,

             {
            id_cust:id_cust
            },
            {
                 headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`}
            
            }
            )
            .then(res=>console.log(res))
            .catch(err=>console.log(err));
        
        },
        deleterequest(id_cust){
            axios.delete(`https://fresheat-api.herokuapp.com/demands/reject`,
                        {
                 headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`},
            
            

             data:{
                 
            id_cust:id_cust,
            id_cook:this.id_cook
        
            },
            },

            )
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            axios.get(`https://fresheat-api.herokuapp.com/message/getbyid/${this.id_cook}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
            .then(res=>{console.log(res);this.FriendsRequests=res.data})
            .catch(err=>console.log(err))            

        },
       
    },
    mounted(){
        axios.get(`https://fresheat-api.herokuapp.com/message/getbyid/${this.id_cook}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`} })
        .then(res=>{console.log(res);this.FriendsRequests=res.data})
        .catch(err=>console.log(err))

      
    },
   
    
}
</script>




<style scoped>
button{
     background:linear-gradient(180deg, #8a5b7e, #e419ff);
}

</style>