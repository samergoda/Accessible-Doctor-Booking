import { Doctor, Specialty } from '../types';

export const specialties: Specialty[] = [
  'Cardiology',
  'Dermatology',
  'Family Medicine',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry'
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    photoUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.8,
    location: 'Medical Center, New York',
    availableDays: ['Monday', 'Tuesday', 'Thursday']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    photoUrl: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.7,
    location: 'Westside Clinic, Chicago',
    availableDays: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    photoUrl: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.9,
    location: 'Children\'s Hospital, Boston',
    availableDays: ['Tuesday', 'Thursday', 'Friday']
  },
  {
    id: '4',
    name: 'Dr. Robert Williams',
    specialty: 'Orthopedics',
    photoUrl: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.6,
    location: 'Sports Medicine Center, Los Angeles',
    availableDays: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: '5',
    name: 'Dr. Aisha Kumar',
    specialty: 'Neurology',
    photoUrl: 'https://images.pexels.com/photos/5407214/pexels-photo-5407214.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.8,
    location: 'Neurological Institute, Houston',
    availableDays: ['Tuesday', 'Thursday', 'Friday']
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    specialty: 'Family Medicine',
    photoUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.7,
    location: 'Community Health Center, Seattle',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
  },
  {
    id: '7',
    name: 'Dr. Lisa Thompson',
    specialty: 'Psychiatry',
    photoUrl: 'https://images.pexels.com/photos/5207087/pexels-photo-5207087.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.9,
    location: 'Mental Health Clinic, San Francisco',
    availableDays: ['Wednesday', 'Thursday', 'Friday']
  },
  {
    id: '8',
    name: 'Dr. Daniel Lee',
    specialty: 'Cardiology',
    photoUrl: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.8,
    location: 'Heart Institute, Denver',
    availableDays: ['Monday', 'Wednesday', 'Thursday']
  }
];

export const generateTimeSlots = (doctorId: string): TimeSlot[] => {
  // Generate mock time slots for the next 7 days
  const slots = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip if not an available day for this doctor
    const doctor = doctors.find(d => d.id === doctorId);
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    
    if (doctor && doctor.availableDays.includes(dayName)) {
      // Add some time slots for this day
      const startHour = 9;
      const endHour = 17;
      
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute of [0, 30]) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const dateString = date.toISOString().split('T')[0];
          
          slots.push({
            id: `${doctorId}-${dateString}-${timeString}`,
            time: timeString,
            date: dateString,
            available: Math.random() > 0.3 // 70% of slots are available
          });
        }
      }
    }
  }
  
  return slots;
};

import { TimeSlot } from '../types';