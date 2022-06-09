<template>
  <v-app>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Appointment Id</th>
            <th class="text-left">Staff FirtName</th>
            <th class="text-left">Student FirtName</th>
            <th class="text-left">Staff PhoneNumber</th>
            <th class="text-left">Student PhoneNumber</th>
            <th class="text-left">Appointment Type</th>
            <th class="text-left">Appointment Category</th>
            <th class="text-left">Appointment Date</th>
            <th class="text-left">Appointment CreationDate</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in staffAllPreviousAppointments"
            :key="item.appointmentId"
          >
            <td>{{ item.appointmentId }}</td>
            <td>{{ item.staffFirstName }}</td>
            <td>{{ item.studentFirstName }}</td>
            <td>{{ item.staffPhoneNumber }}</td>
            <td>{{ item.studentPhoneNumber }}</td>
            <td>{{ item.appointmentType }}</td>
            <td>{{ item.appointmentCategory }}</td>
            <td>{{ item.appointmentDate }}</td>
            <td>{{ item.appointmentCreationDate }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-app>
</template>
<script>
import gql from "graphql-tag";

const staffAllPreviousAppointments = gql`
  query {
    staffAllPreviousAppointments(staffId: "2") {
      appointmentId
      staffFirstName
      studentFirstName
      staffPhoneNumber
      studentPhoneNumber
      appointmentType
      appointmentCategory
      appointmentDate
      appointmentCreationDate
    }
  }
`;

export default {
  apollo: {
    staffAllPreviousAppointments: {
      query: staffAllPreviousAppointments,
      update: (data) => data.staffAllPreviousAppointments,
    },
  },
  data: () => ({
    staffAllPreviousAppointments: [],
  }),
};
</script>

<style scoped>
.weka {
  justify-content: center;
  align-items: center;
}
</style>
