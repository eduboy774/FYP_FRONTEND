<template>
  <v-app>
    <v-form v-model="valid">
      <v-container fluid>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 sm6 md3 lg3>
              <v-spacer></v-spacer>
            </v-flex>
          </v-layout>
          <br /><br />
          <v-divider> </v-divider>

          <br />
          <center left>
            <h3 color="indigo">Make Appointment</h3>
          </center>
          <v-card class="my-5">
            <v-container fluid class="my-5">
              <v-card class="pa-13" outline>
                <form>
                  <v-layout row wrap>
                    <v-col cols="12" sm="6" class="d-flex">
                      <v-autocomplete
                        v-model="appointmentType"
                        :rules="[(v) => !!v || 'Item is required']"
                        :items="items2"
                        dense
                        chips
                        small-chips
                        label="Type Of Appointment"
                        outlined
                        small
                      ></v-autocomplete>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-autocomplete
                        v-model="appointmentCategory"
                        :rules="[(v) => !!v || 'Item is required']"
                        :items="items1"
                        dense
                        chips
                        small-chips
                        label="Category"
                        outlined
                        small
                      ></v-autocomplete>
                    </v-col>
                  </v-layout>
                  <v-layout row wrap>
                    <v-col cols="12" sm="6" class="d-flex">
                      <v-select
                        v-model="with_who_appointment"
                        :rules="[(v) => !!v || 'Item is required']"
                        label="with"
                        dense
                        small-chips
                        outlined
                        :items="allStaffs"
                        item-value="staffId"
                        :item-text="
                          (item) =>
                            `${item.staffFirstName} ${item.staffSurname}`
                        "
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" class="d-flex">
                      <v-textarea
                        v-model="appointmentDescription"
                        label="Reason"
                        auto-grow
                        outlined
                        rows="3"
                        row-height="25"
                        shaped
                        required
                        :rules="reasonRules"
                      ></v-textarea>
                    </v-col>
                  </v-layout>
                  <v-layout row wrap>
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="dialog2"
                        v-model="modal2"
                        :return-value.sync="time"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="appointmentTime"
                            label="Favoride Time"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="modal2"
                          v-model="appointmentTime"
                          full-width
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal2 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog2.save(appointmentTime)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-dialog
                        ref="dialog"
                        v-model="date"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="appointmentDate"
                            label="Pick Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="appointmentDate" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(appointmentDate)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-layout>
                  <v-layout row wrap>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-btn
                        color="primary"
                        class="hange"
                        @click="createAppointment"
                      >
                        Submit</v-btn
                      >
                    </v-col>
                  </v-layout>
                </form>
              </v-card>
            </v-container>
          </v-card>
        </v-card>
      </v-container>
    </v-form>
  </v-app>
</template>
<script>
import gql from "graphql-tag";

const allStaffs = gql`
  query {
    allStaffs {
      staffId
      staffFirstName
      staffSurname
    }
  }
`;
export default {
  apollo: {
    allStaffs: {
      query: allStaffs,
      update: (data) => data.allStaffs,
    },
  },
  data: () => ({
    items2: ["Individual", "Group"],
    items1: ["Academic Advisor ", "Private", "FYP", "Other"],
    allStaffs: [],
    menu2: false,
    modal2: false,
    phone: null,
    dialog2: null,
    dialog: null,
    modal: null,
    appointmentType: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentDescription: "",
    with_who_appointment: "",
    appointmentCategory: "",
    studentRegNumber: "1",
    reasonRules: [(v) => !!v || "The input is required"],
  }),
  methods: {
    createAppointment() {
      let data = {
        appointmentDescription: this.appointmentDescription,
        appointmentTime: this.appointmentTime,
        appointmentType: this.appointmentType,
        appointmentDate: this.appointmentDate,
        appointmentCategory: this.appointmentCategory,
        staffId: this.with_who_appointment,
        studentRegNumber: this.studentRegNumber,
      };
      console.log(data);
      this.$emit("create-appointment", data);
    },
  },
};
</script>
<style scoped>
.weka {
  justify-content: center;
  align-items: center;
}
.hange {
  text-transform: unset !important;
}
</style>
