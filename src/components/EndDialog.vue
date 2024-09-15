<script lang="ts">
import { Vue, Component, Prop } from "vue-facing-decorator";

@Component({})
export default class EndDialog extends Vue {
  @Prop({ default: false }) dialog!: boolean;
  @Prop({ default: "" }) message!: string;
  restartGame() {
    this.$emit("restart");
  }

  closeDialog() {
    this.$emit("close");
  }
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Congratulations!</v-card-title>
      <v-card-text>You have completed the game</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="restartGame">Restart Game</v-btn>
        <v-btn color="secondary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
