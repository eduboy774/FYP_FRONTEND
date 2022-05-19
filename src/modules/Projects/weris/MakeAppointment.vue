<template>
  <MakeAppointmentContent @create-appointment="appointment_create" />
</template>

<script>
import gql from "graphql-tag";

export const createAppointment = gql`
  mutation CreateAppointment(
    $appointmentTime: String!
    $appointmentDate: String!
    $appointmentType: String!
    $appointmentDescription: String!
    $appointmentCategory: String!
    $staffId: String!
    $studentRegNumber: String!
  ) {
    createAppointment(
      appointmentTime: $appointmentTime
      appointmentDate: $appointmentDate
      appointmentType: $appointmentType
      appointmentDescription: $appointmentDescription
      appointmentCategory: $appointmentCategory
      staffId: $staffId
      studentRegNumber: $studentRegNumber
    ) {
      appointment {
        appointmentId
      }
    }
  }
`;

import MakeAppointmentContent from "./MakeAppointmentContent.vue";
export default {
  components: {
    MakeAppointmentContent,
  },
  methods: {
    appointment_create(data) {
      this.$apollo.mutate({
        mutation: createAppointment,
        variables: { data },
        update: (cache, { data }) => {
          console.log(data);
          if (!data.errors) {
            console.log("success");
          } else {
            console.log("error");
          }
        },
      });
      console.log(data);
    },
    data: () => ({
      errors: [],
    }),
  },
};
</script>
