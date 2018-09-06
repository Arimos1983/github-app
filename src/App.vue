<template>
    <v-ons-page>
      <AppToolbar/>
      <div class="center">
           <AppSearch :query.sync="query" />
           <v-ons-list>
             <v-ons-list-header>Repositories of {{query}}</v-ons-list-header>
             <v-ons-list-item v-for="repo in repos" :key="repo.id">
               <div class="left">
                  <img class="list-item__thumbnail" src="repo.owner.avatar_url">
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
  export default {
    components:{
      AppToolbar,
      AppSearch
    },
    data() {
      return {
        query:'',
        repos:[]
      };
    },
    watch:{
      query: debounce(function(NewValue){
        gitHub.getRepos(NewValue)
        .then((response)=>{
          this.repos = response.data
          console.log(this.repos)
        })
      },500)
    }
    
  };
</script>
