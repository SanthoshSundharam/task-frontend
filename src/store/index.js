import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  state: {
     task:[]
  },
  mutations: {
    update(state,tas){
      const index = state.task.findIndex(task => task.id ===tas.id);
     
      if (index !== -1) {
        Vue.set(state.task, index,tas);
      }
    },
    delete(state,taskId){
      state.task = state.task.filter(task => task.id !== taskId);
        console.log(state.task)
    },
     setdata(state,data){
        state.task=data;
        console.log(state.task[0].title)
        
     }
  },
  actions: {
        async update({commit},tasks){
            try{
            let {id,title,description,status}=tasks
          //  let task={id,title,description,status}
           
            //console.log(task)
             const res= await axios.put("http://127.0.0.1:8000/api/update",
                tasks
             );
           console.log(res)
             commit('update',tasks);
            }
            catch(error){
                console.log(error)
            }                                                         
       },
       async get({commit},id){
        console.log(id);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/getdata/${id}`);
            console.log(res.data.task.length)
            if(res.data.task.length>0){
            commit('setdata', res.data.task);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
       },
       async  delete({commit},id){
        
        const res =await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`);
        if(res)
        commit('delete',id);
       }
  },
  getters: {
    gettask: (state) => state.task
  }
});