import { carbonara } from "./data.js";

const {createApp} = Vue;

createApp({
    data(){
        return{
            carbonara,
            newAction: '',
        }
    },
    methods:{
        toggleLineThrough(id){
            const item = this.carbonara.find((el)=>el.id === id);
            console.log(item);
            if(item){
                item.done = !item.done
            }
        },
        removeById(id){
            const index = this.carbonara.findIndex((el)=>el.id === id);
            if(index !== -1){
                this.carbonara.splice(index, 1);
            }
        },
        addAction(){
            const newObj = {
                id: null,
                text: this.newAction,
                done: false
            }
            let newId = 0;
            this.carbonara.forEach((el)=> {
                if(newId < el.id){
                    newId = el.id;
                }
            });
            newObj.id = newId + 1;
            this.carbonara.push(newObj);
            this.newAction = '';
            console.log(this.carbonara);
        }
    },
    
    mounted(){
        console.log(this.carbonara);
    }
}).mount('#app')