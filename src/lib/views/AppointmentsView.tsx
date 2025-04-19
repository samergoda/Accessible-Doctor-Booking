import PageHeader from "../../components/layout/PageHeader";
import AppointmentsList from "../../components/features/AppointmentsList";

const AppointmentsView: React.FC = () => {
  return (
    <div>
      <PageHeader title="My Appointments" description="View and manage your upcoming appointments." />
      <AppointmentsList />
    </div>
  );
};

export default AppointmentsView;
