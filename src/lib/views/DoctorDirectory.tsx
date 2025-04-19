import PageHeader from "../../components/layout/PageHeader";
import DoctorList from "../../components/common/DoctorList";

const DoctorDirectory: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Find Your Doctor"
        description="Browse our network of trusted healthcare professionals and book your appointment in minutes."
      />
      <DoctorList />
    </div>
  );
};

export default DoctorDirectory;
