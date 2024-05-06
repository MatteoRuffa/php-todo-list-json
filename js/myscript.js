const {createApp} = Vue;

createApp({
    data(){
        return{
            carbonara: [],
            apiUrl: 'server.php',
            newObj: {
                id: '',
                text: '',
                done: ''
            },
            newAction: '',
            newId: 0
            
        }
    },
    methods:{
        toggleLineThrough(id){
            const item = this.carbonara.find((el)=>el.id === id);
            console.log(item);
            if(item){
                item.done = !item.done;
        
                const data = {
                    id: item.id,
                    text: item.text,
                    done: item.done
                };
        
                axios
                    .put(this.apiUrl, data)
                    .then((res)=> {
                        console.log(res.data);
                        this.carbonara = res.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        removeById(id){
            const data = {
                id: id,
            };
            axios
                .delete(this.apiUrl, { data })
                .then((res)=> {
                    console.log(res.data);
                    this.carbonara = res.data;
                    this.newId = this.carbonara.length - 1;
                })
        },
        addAction(){
            let newId = 0;
            this.carbonara.forEach((el)=> {
                if(newId < el.id){
                    newId = el.id;
                }
            });
        
            const obj = {
                id: newId + 1,
                text: this.newAction,
                done: false
            }
        
            const data = new FormData();
            data.append("id", obj.id);
            data.append("text", obj.text);
            data.append("done", obj.done);
        
            axios
                .post(this.apiUrl, data)
                .then((res)=> {
                    console.log(res);
                    this.carbonara.push(obj);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {});
            this.newAction = '';
        },
        getData(){
            axios
            .get(this.apiUrl)
            .then((res)=>{
                this.carbonara = res.data;
            })
        },
    },
    created(){
        this.getData();
    },
}).mount('#app')