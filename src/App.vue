<template>
  <el-container class="container">
    <el-header>
      <TopBar/>
    </el-header>
    <el-divider></el-divider>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TopBar from '@/components/TopBar.vue'

@Component({
  components: {
    TopBar
  }
})
export default class App extends Vue {
}

</script>

<style lang="scss">
.container {
  font-family: sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
