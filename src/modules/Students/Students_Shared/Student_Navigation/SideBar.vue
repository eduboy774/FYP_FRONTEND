<template>
  <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent app>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <!-- <v-img src="../../../../assets/images/bibinabwana.png"></v-img> -->
      </v-list-item-avatar>

      <v-list-item-title>Student</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        router
        :to="item.route"
        link
      >
        <v-list-item-icon>
          <v-tool-tip>
            <v-icon>{{ item.icon }}</v-icon>
          </v-tool-tip>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-spacer></v-spacer>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["mini"],
  data() {
    return {
      drawer: false,
      //  mini:true,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      items: [
        {
          icon: "mdi-gesture-tap",
          title: "Request Appointment",
          route: "/students/request_appointment",
        },

        {
          title: "Previous",
          icon: "mdi-skip-previous-circle-outline",
          route: "/students/student_previous_appointment",
        },
        {
          title: "Track Complains",
          icon: "mdi-lightbulb",
          route: "/students/track_complains",
        },
      ],
    };
  },
};
</script>

<style></style>
