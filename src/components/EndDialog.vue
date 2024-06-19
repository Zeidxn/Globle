<script lang="ts">
import { Vue, Component } from "vue-facing-decorator";

@Component({})
export default class EndDialog extends Vue {
  dialog = true;
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Congratulations!</v-card-title>
      <v-card-text>You have completed the game</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
