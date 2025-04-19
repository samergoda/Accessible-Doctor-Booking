import { Star } from "lucide-react";
import { useAppointments } from "../../hooks/AppointmentContext";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { openBookingModal } = useAppointments();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      <img src={doctor.photoUrl} alt={`Dr. ${doctor.name}`} className="w-full h-48 object-cover" loading="lazy" />

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
          </div>
        </div>

        <span className="inline-block px-2 py-1 mt-2 text-xs font-medium text-teal-800 bg-teal-100 rounded-full">{doctor.specialty}</span>

        <p className="mt-2 text-sm text-gray-600">{doctor.location}</p>

        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Available on:</p>
          <div className="flex flex-wrap gap-1">
            {doctor.availableDays.map((day) => (
              <span key={day} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                {day.substring(0, 3)}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => openBookingModal(doctor.id)}
          className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          aria-label={`Book appointment with ${doctor.name}`}>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
