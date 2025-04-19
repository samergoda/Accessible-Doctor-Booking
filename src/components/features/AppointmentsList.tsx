import { Calendar, MapPin, Clock } from "lucide-react";
import { useAppointments } from "../../hooks/AppointmentContext";
import { doctors } from "../../lib/mocks/doctors";

const AppointmentsList: React.FC = () => {
  const { appointments } = useAppointments();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
          <p className="text-gray-500 max-w-sm">
            You don't have any scheduled appointments. Go to the doctor directory to book your first appointment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const doctor = doctors.find((d) => d.id === appointment.doctorId);
        if (!doctor) return null;

        return (
          <div key={appointment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                  <img src={doctor.photoUrl} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
                </div>

                <div className="sm:ml-6 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {appointment.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">{doctor.specialty}</p>

                  <div className="mt-4 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {formatDate(appointment.date)}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {formatTime(appointment.time)}
                    </div>

                    <div className="flex items-center text-sm text-gray-500 sm:col-span-2">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {doctor.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentsList;
