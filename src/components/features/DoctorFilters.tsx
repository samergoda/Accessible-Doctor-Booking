interface DoctorFiltersProps {
  specialties: Specialty[];
  selectedSpecialty: Specialty | "All";
  onSpecialtyChange: (specialty: Specialty | "All") => void;
}

const DoctorFilters: React.FC<DoctorFiltersProps> = ({ specialties, selectedSpecialty, onSpecialtyChange }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="mb-4">
        {/* Title filter */}
        <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Specialty
        </label>

        {/* Specialty filter dropdown */}
        <select
          id="specialty-filter"
          value={selectedSpecialty}
          onChange={(e) => onSpecialtyChange(e.target.value as Specialty | "All")}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter doctors by specialty">
          <option value="All">All Specialties</option>
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DoctorFilters;
