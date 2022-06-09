<template>
  <RequestAppointmentContent @submit-appointment="requestAppoint" />
</template>

<script>
import RequestAppointmentContent from "./RequestAppointmentContent.vue";
import gql from "graphql-tag";

const createAppointment = gql`
  mutation createAppointment(
    $appointmentTime: String!
    $appointmentType: String!
    $appointmentDescription: String!
    $appointmentCategory: String!
    $staffId: String!
    $studentRegNumber: String!
    $appointmentDate: String!
  ) {
    createAppointment(
      appointmentTime: $appointmentTime
      appointmentType: $appointmentType
      appointmentDescription: $appointmentDescription
      appointmentCategory: $appointmentCategory
      appointmentDate: $appointmentDate
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
          if (!data.createAppointment.appointment.appointmentId) {
            console.log(data.createAppointment.appointmentId);
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Appointment Success Requested",
              showConfirmButton: true,
              timer: 1500,
            });
          }
        },
      });
    },
  },
};
</script>

<style></style>
