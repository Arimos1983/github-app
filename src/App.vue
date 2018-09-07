<template>
    <v-ons-page>
      <AppToolbar/>
      <div class="center">
           <AppSearch :query.sync="query" />
           <v-ons-progress-circular indeterminate v-if="isLoading"></v-ons-progress-circular>
           <v-ons-list>
             <v-ons-list-header>Repositories of {{query}}</v-ons-list-header>
             <v-ons-list-item v-for="repo in repos" :key="repo.id">
               <div class="left">
                  <img class="list-item__thumbnail" :src="repo.owner.avatar_url">
              </div>
              <div class="center">
                <span class="list-item__title">{{repo.name}}</span>
                <span class="list-item__subtitle">{{repo.description}}</span>
              </div>
             </v-ons-list-item>
           </v-ons-list>
           <EmptyState v-if="error" :type="type" />
      </div>
    </v-ons-page>
</template>
<script>
import debounce from 'lodash/debounce'
import AppToolbar from './components/AppToolbar'
import AppSearch from './components/AppSearch'
import EmptyState from './components/EmptyState'
import { gitHub } from './services/GitHub'
import { error } from 'util';
  export default {
    components:{
      AppToolbar,
      AppSearch,
      EmptyState
    },
    data() {
      return {
        query:'',
        repos:[],
        isLoading: false,
        type: 'repository',
        error: ''
      };
    },

    
    methods:{
      getRepos: debounce(function () {
      
      gitHub.getRepos(this.query)
        .then((response) => {
          this.repos = response.data
          this.isLoading = false
        }).catch((error) => {
          this.error = error;
          this.repos = []
          this.isLoading = false
        })
    }, 500),
    },
  watch: {
    query (value) {
      this.isLoading = true
      this.getRepos(value)
    }
  },


    // watch:{
    //   query: debounce(function(NewValue){
    //     this.isLoading=true
    //     gitHub.getRepos(NewValue)
    //     .then((response)=>{
    //       this.repos = response.data
          
    //     })
    //     .catch((err)=>{
    //       console.log(err)
    //     })
    //     .finally(()=>{
    //       this.isLoading = false;
    //     })
    //   },500)
    // }
    
  }
</script>
