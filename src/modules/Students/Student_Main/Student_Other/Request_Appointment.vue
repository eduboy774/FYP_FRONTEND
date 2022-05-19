<template>
  <RequestAppointmentContent @submit-appointment="requestAppoint" />
</template>

<script>
import RequestAppointmentContent from "./RequestAppointmentContent.vue";
import gql from "graphql-tag";

const createAppointment = gql`
  mutation (
    $appointmentType: String!
    $appointmentDescription: String!
    $appointmentCategory: String!
    $staffId: String!
    $studentRegNumber: String!
  ) {
    createAppointment(
      appointmentType: $appointmentType
      appointmentDescription: $appointmentDescription
      appointmentCategory: $appointmentCategory
      staffId: $staffId
      studentRegNumber: $studentRegNumber
    ) {
      appointment {
        appointmentTime
      }
    }
  }
`;
export default {
  name: "Request_Appointment",
  components: {
    RequestAppointmentContent,
  },
  methods: {
    requestAppoint(data) {
      this.$apollo.mutate({
        mutation: createAppointment,
        variables: data,
        update: (cache, { data }) => {
          console.log(data);
          if (!data) {
            console.log("No data");
            {
              this.$swal.fire(
                "Good job!",
                "You clicked the button!",
                "success"
              );
            }
          }
        },
      });
    },
  },
};
</script>

<style></style>
