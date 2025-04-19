declare type Specialty = "Cardiology" | "Dermatology" | "Family Medicine" | "Neurology" | "Orthopedics" | "Pediatrics" | "Psychiatry";

declare type Doctor = {
  id: string;
  name: string;
  specialty: Specialty;
  photoUrl: string;
  rating: number;
  location: string;
  availableDays: string[];
};

declare type TimeSlot = {
  id: string;
  time: string;
  date: string;
  available: boolean;
};

declare type Appointment = {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled" | "completed";
};
