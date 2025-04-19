import { useState, useMemo } from "react";
import { doctors, specialties } from "../../lib/mocks/doctors";
import DoctorCard from "./DoctorCard";
import DoctorFilters from "../features/DoctorFilters";

const DoctorList: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | "All">("All");

  const filteredDoctors = useMemo(() => {
    if (selectedSpecialty === "All") {
      return doctors;
    }
    return doctors.filter((doctor) => doctor.specialty === selectedSpecialty);
  }, [selectedSpecialty]);

  const handleSpecialtyChange = (specialty: Specialty | "All") => {
    setSelectedSpecialty(specialty);
  };

  return (
    <div>
      <DoctorFilters specialties={specialties} selectedSpecialty={selectedSpecialty} onSpecialtyChange={handleSpecialtyChange} />

      {filteredDoctors.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No doctors found with this specialty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
