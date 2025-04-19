import { Calendar, Clock } from "lucide-react";

interface BookingPopupProps {
  selectedDoctor: {
    id: string;
    name: string;
    photoUrl: string;
    specialty: string;
  };
  timeSlots: Array<{
    id: string;
    date: string;
    time: string;
    available: boolean;
  }>;
  selectedDate: string | null;
  selectedTime: string | null;
  selectedSlotId: string | null;
  timeSlotsByDate: Record<
    string,
    Array<{
      id: string;
      date: string;
      time: string;
      available: boolean;
    }>
  >;
  availableDates: string[];
  formatDate: (dateString: string) => string;
  handleDateSelect: (date: string) => void;
  handleTimeSelect: (slotId: string, time: string) => void;
  handleBookAppointment: () => void;
  closeBookingModal: () => void;
}

export default function BookingPopup({
  selectedDoctor,
  timeSlotsByDate,
  selectedDate,
  selectedTime,
  selectedSlotId,
  availableDates,
  formatDate,
  handleDateSelect,
  handleTimeSelect,
  handleBookAppointment,
  closeBookingModal,
}: BookingPopupProps) {
  return (
    <div className="p-6">
      <h2 id="booking-modal-title" className="text-xl font-semibold text-gray-900 mb-4">
        Book Appointment
      </h2>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <img src={selectedDoctor.photoUrl} alt={selectedDoctor.name} className="w-10 h-10 rounded-full object-cover mr-3" />
          <div>
            <h3 className="font-medium text-gray-900">{selectedDoctor.name}</h3>
            <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-medium text-gray-900">Select a date</h3>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {availableDates.map((date) => (
            <button
              key={date}
              onClick={() => handleDateSelect(date)}
              className={`p-2 text-center text-sm rounded-md transition-colors
              ${selectedDate === date ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              aria-pressed={selectedDate === date}>
              {formatDate(date)}
            </button>
          ))}
        </div>

        {selectedDate && (
          <>
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-gray-900">Select a time</h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {timeSlotsByDate[selectedDate] &&
                timeSlotsByDate[selectedDate]
                  .filter((slot) => slot.available)
                  .map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot.id, slot.time)}
                      disabled={!slot.available}
                      className={`p-2 text-center text-sm rounded-md transition-colors
                    ${selectedSlotId === slot.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                      aria-pressed={selectedSlotId === slot.id}>
                      {slot.time}
                    </button>
                  ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          onClick={closeBookingModal}>
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBookAppointment}
          disabled={!selectedDate || !selectedTime}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
