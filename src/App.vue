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
      </div>
    </v-ons-page>
</template>
<script>
import debounce from 'lodash/debounce'
import AppToolbar from './components/AppToolbar'
import AppSearch from './components/AppSearch'
import { gitHub } from './services/GitHub'
import { error } from 'util';
  export default {
    components:{
      AppToolbar,
      AppSearch
    },
    data() {
      return {
        query:'',
        repos:[],
        isLoading: false,
      };
    },
    
  
    watch:{
      query: debounce(function(NewValue){
        this.isLoading=true
        gitHub.getRepos(NewValue)
        .then((response)=>{
          this.repos = response.data
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          this.isLoading = false;
        })
      },500)
    }
    
  }
</script>
