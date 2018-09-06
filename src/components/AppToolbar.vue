<template>
   
      <v-ons-toolbar>
        <div class="left">
            <slot></slot>
        </div>
        <div class="center">
             {{title}}
             
        </div>

         <div class="right">
             <slot></slot>
         </div>
      </v-ons-toolbar>
    
</template>
<script>
  export default {
    data(){
        return {
            title: "GitHub App"
        }
    }
  }
</script>




