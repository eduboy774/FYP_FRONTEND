<template>
  <v-app>
    <v-container fluid>
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 lg3>
            <v-spacer></v-spacer>
            <v-btn class="mx-2" fab dark small color="pink">
              <template>
                <v-icon dark>{{ countNewStaffAppointments }} </v-icon>
              </template>
            </v-btn>
          </v-flex>
        </v-layout>
        <br /><br />
        <v-divider> </v-divider>
        <br />
        <center>
          <h3 color="indigo">New Appointment</h3>
        </center>
        <v-card class="my-5">
          <v-container fluid class="my-5">
            <v-card class="pa-13" outline>
              <v-layout row wrap>
                <v-row>
                  <v-col cols="12" sm="6">
                    <!-- <div
                      v-for="allAppointment in allAppointments"
                      :key="allAppointment.appointmentId"
                    >
                      {{ allAppointment.appointmentId }}
                    </div> -->
                    <v-select outline solo>
                      <options
                        v-for="allAppointment in allAppointments"
                        :key="allAppointment.allAppointmentId"
                      >
                        {{ allAppointment.appointmentId }}
                      </options>
                    </v-select>
                    <div></div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="text-center">
                      <div class="my-2">
                        <template>
                          <v-row justify="center">
                            <v-dialog
                              v-model="dialog"
                              persistent
                              max-width="400px"
                              max-height="400"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="success"
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                  x-small
                                  outlined
                                  class="captosmall"
                                >
                                  Accept
                                </v-btn>
                              </template>
                              <v-card>
                                <v-card-title>
                                  <span class="text-h6"
                                    >Schedule Appointment</span
                                  >
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <v-layout row wrap class="d-flex">
                                      <v-menu
                                        ref="menu"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="time"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                      >
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-text-field
                                            v-model="time"
                                            label="Pick Time"
                                            prepend-icon="mdi-clock-time-four-outline"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                          ></v-text-field>
                                        </template>
                                        <v-time-picker
                                          v-if="menu2"
                                          v-model="time"
                                          full-width
                                          @click:minute="$refs.menu.save(time)"
                                        ></v-time-picker>
                                      </v-menu>
                                    </v-layout>
                                    <v-layout row wrap>
                                      <v-dialog
                                        ref="dialog"
                                        v-model="modal"
                                        :return-value.sync="date"
                                        persistent
                                        width="290px"
                                      >
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-text-field
                                            v-model="date"
                                            label="Pick Date"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                          ></v-text-field>
                                        </template>
                                        <v-date-picker
                                          v-model="date"
                                          scrollable
                                        >
                                          <v-spacer></v-spacer>
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="modal = false"
                                          >
                                            Cancel
                                          </v-btn>
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.dialog.save(date)"
                                          >
                                            OK
                                          </v-btn>
                                        </v-date-picker>
                                      </v-dialog>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    class="captosmall"
                                    color="primary"
                                    text
                                    outlined
                                    x-small
                                    roundedallStaffs
                                    @click="dialog = false"
                                  >
                                    Schedule
                                  </v-btn>
                                  <v-btn
                                    class="captosmall"
                                    color="blue darken-1"
                                    text
                                    outlined
                                    x-small
                                    @click="dialog = false"
                                  >
                                    Save
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-row>
                        </template>
                      </div>
                      <br />
                      <div class="my-2">
                        <v-btn
                          x-small
                          outlined
                          rounded
                          color="error"
                          @click="showAlert"
                          class="captosmall"
                        >
                          Reject
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-layout>
            </v-card>
          </v-container>
        </v-card>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
import gql from "graphql-tag";

// query to fetch all the allappointment
const allAppointments = gql`
  query {
    allAppointments {
      appointmentStatus
      appointmentId
      appointmentTime
      appointmentStatus
      appointmentCategory
    }
  }
`;
// count new staffappointment
const countNewStaffAppointments = gql`
  query {
    countNewStaffAppointments(staffId: "3")
  }
`;
export default {
  apollo: {
    allAppointments: {
      query: allAppointments,
      update: (data) => data.allAppointments,
    },
    countNewStaffAppointments: {
      query: countNewStaffAppointments,
      update: (data) => data.countNewStaffAppointments,
    },
  },
  data: () => ({
    dialog: false,
    time: null,
    menu2: false,
    modal2: false,
    allStaffs: [],
    allAppointments: [],
  }),
  methods: {
    showAlert() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          }
        });
    },
  },
};
</script>
<style scoped>
.weka {
  justify-content: center;
  align-items: center;
}
.captosmall {
  text-transform: unset !important;
}
</style>
