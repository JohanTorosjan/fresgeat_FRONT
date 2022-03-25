<template>
<div id="switch" @click="switchbutton" >
     <a v-if="isOnline==1"  id="a-online" class="btn-floating pulse"><i id="i-online" class="material-icons left">gamepad</i> </a>
     <a v-else id="a-offline"  class="btn-floating pulse"><i id="i-offline" class="material-icons left">flight</i></a>
<!--   
   <img @mouseover="updatebutton" :src='"../assets/"+picture+"button.jpg"'> -->
</div>
</template>
<script>
import axios from "axios"
export default {
    name:'SwitchButton',
    data(){
        return{
            isOnline:-1,
            picture:'offline'
        }

    },
    props:{ 
        id_cook:{
            type:String,
            required:true
        },
    },
    methods:{
        switchbutton(){
            axios.put(`http://localhost:8081/statut/change/${this.id_cook}`,

             {
            isonline:this.isOnline
            },
            {
                 headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`}
            
            }
            ,
           
            )
            .then(res=>console.log(res))
            .catch(error=>console.log(error))
            if(this.isOnline==1){
                this.picture='offline';}
            else{this.picture='online'}
            this.updatebutton();
        },


        updatebutton(){axios.get(`http://localhost:8081/statut/${sessionStorage.getItem('id')})}`,
        { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`}})
        .then(res=>{
            this.isOnline=res.data.statut;
            console.log(res);
            if(this.isOnline==1){this.picture='online'}
            if(this.isOnline==0){this.picture='offline'}
            console.log(res)
        })
        .catch(err=>console.log("a very weird error hapened :",err))}
            

        },

    computed:{
        
    },
    beforeMount(){
        axios.get(`http://localhost:8081/statut/${sessionStorage.getItem('id')})}`,
        { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('Token')}`}})
        .then(res=>{
            this.isOnline=res.data.statut;
            if(this.isOnline==1){this.picture='online'}
            if(this.isOnline==0){this.picture='offline'}
            console.log(this.isOnline)
        })
        .catch(err=>console.log("a very weird error hapened :",err))
    }
}
</script>

<style scoped>

#a-online{
    background-color: green;

}
#i-online{
    color:green
}

#a-offline{
    background-color: red;

}
#i-offline{
    color:red
}
</style>