import { useState } from "react";
import { X } from "lucide-react";
import { useAppointments } from "../../hooks/AppointmentContext";
import BookingPopup from "../common/BookingPopup";

const BookingModal: React.FC = () => {
  const { selectedDoctor, timeSlots, isBookingModalOpen, closeBookingModal, addAppointment } = useAppointments();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  if (!isBookingModalOpen || !selectedDoctor) return null;

  // Group time slots by date
  const timeSlotsByDate = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, typeof timeSlots>);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedSlotId(null);
  };

  const handleTimeSelect = (slotId: string, time: string) => {
    setSelectedTime(time);
    setSelectedSlotId(slotId);
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    addAppointment({
      doctorId: selectedDoctor.id,
      date: selectedDate,
      time: selectedTime,
    });
  };

  const availableDates = Object.keys(timeSlotsByDate).sort();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="booking-modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" aria-hidden="true" onClick={closeBookingModal}></div>

        <div className="relative bg-white rounded-lg max-w-md w-full mx-auto shadow-xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={closeBookingModal}
              aria-label="Close booking modal">
              <X className="h-6 w-6" />
            </button>
          </div>

          <BookingPopup
            selectedDoctor={selectedDoctor}
            timeSlots={timeSlots}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedSlotId={selectedSlotId}
            timeSlotsByDate={timeSlotsByDate}
            availableDates={availableDates}
            formatDate={formatDate}
            handleDateSelect={handleDateSelect}
            handleTimeSelect={handleTimeSelect}
            handleBookAppointment={handleBookAppointment}
            closeBookingModal={closeBookingModal}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
