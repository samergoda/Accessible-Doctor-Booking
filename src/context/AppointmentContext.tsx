import { createContext, useState, useContext, ReactNode } from "react";
import { initialAppointments } from "../lib/mocks/appointments";
import { doctors, generateTimeSlots } from "../lib/mocks/doctors";

interface AppointmentContextType {
  appointments: Appointment[];
  selectedDoctor: Doctor | null;
  timeSlots: TimeSlot[];
  isBookingModalOpen: boolean;
  addAppointment: (appointment: Omit<Appointment, "id" | "status">) => void;
  openBookingModal: (doctorId: string) => void;
  closeBookingModal: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId) || null;
    setSelectedDoctor(doctor);

    if (doctor) {
      const slots = generateTimeSlots(doctor.id);
      setTimeSlots(slots);
    }

    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDoctor(null);
    setTimeSlots([]);
  };

  const addAppointment = (appointment: Omit<Appointment, "id" | "status">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `appointment-${Date.now()}`,
      status: "confirmed",
    };

    setAppointments((prev) => [...prev, newAppointment]);
    closeBookingModal();
  };

  const value = {
    appointments,
    selectedDoctor,
    timeSlots,
    isBookingModalOpen,
    addAppointment,
    openBookingModal,
    closeBookingModal,
  };

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
}
