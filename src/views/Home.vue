<template>
  <div class="home">
    <Carousel :date-father="dateFather"/>
    <Table @emit-date="receive"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Carousel from '@/components/Carousel.vue'
import Table from '@/components/Table.vue'

@Component({
  components: {
    Carousel,
    Table
  }
})
export default class Home extends Vue {
  dateFather = ''

  receive (val: any) {
    this.dateFather = val
  }
}
</script>
