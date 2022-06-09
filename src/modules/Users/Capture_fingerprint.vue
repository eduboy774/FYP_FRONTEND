<template>
  <v-app>
    <div class="Create_User">
      <v-card class="my-5">
        <v-container fluid class="my-5">
          <center><span class="center"> Add FingerPrint </span></center>
          <v-card class="pa-13" outline>
            <v-layout row wrap>
              <v-col cols="12" sm="6" class="d-flex">
                <v-autocomplete
                  v-model="user_id"
                  dense
                  chips
                  small-chips
                  label="Select Users"
                  outlined
                  small
                  :rules="[(v) => !!v || 'users is required']"
                  :items="users.edges"
                  item-value="id"
                  :item-text="(item) => `${item.firstName} ${item.lastName}`"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="d-flex">
                <span>Capture</span>
                <br />
                <v-btn rounded raised small @click="takingFingerPrint">
                  <v-icon dark> mdi-fingerprint </v-icon>
                </v-btn>
              </v-col>
            </v-layout>
          </v-card>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import gql from "graphql-tag";

const users = gql`
  query allusers {
    users {
      edges {
        node {
          id
          email
          username
          isStaff
          firstName
          lastName
          pk
        }
      }
    }
  }
`;
export default {
  apollo: {
    users: {
      query: users,
      update: (data) => data.users,
    },
    data: () => ({
      users: [],
      user_id: 0,
    }),
  },
  methods: {
    takingFingerPrint() {
      let data = {
        id: this.user_id,
      };
      console.log(data);
    },
  },
};
</script>

<style>
.border_radius {
  border-radius: 20px;
  text-transform: unset !important;
}
</style>
