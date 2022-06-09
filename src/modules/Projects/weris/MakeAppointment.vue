<template>
  <MakeAppointmentContent @create-appointment="appointment_create" />
</template>

<script>
import createAppointment from "../../../gql/createAppointment.gql";

import MakeAppointmentContent from "./MakeAppointmentContent.vue";
export default {
  components: {
    MakeAppointmentContent,
  },
  methods: {
    appointment_create(data) {
      this.$apollo.mutate({
        mutation: createAppointment,
        variables: data,
        update: (cache, { data }) => {
          console.log(data);
          if (!data.success) {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Appointment Success Requested",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
      });
    },
  },
};
</script>
