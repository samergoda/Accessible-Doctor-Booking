import { useState } from "react";
import { AppointmentProvider } from "./hooks/AppointmentContext";
import TabNavigation from "./components/layout/TabNavigation";
import BookingModal from "./components/features/BookingModal";
import DoctorDirectory from "./lib/views/DoctorDirectory";
import AppointmentsView from "./lib/views/AppointmentsView";
import Header from "./components/layout/Header";
import { ToastContainer } from "react-toastify";

function App() {
  const [activeTab, setActiveTab] = useState<"doctors" | "appointments">("doctors");

  return (
    <AppointmentProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />
        <ToastContainer />

        {/* Main Content */}
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "doctors" ? <DoctorDirectory /> : <AppointmentsView />}
          </div>
        </main>

        {/* Booking Modal */}
        <BookingModal />
      </div>
    </AppointmentProvider>
  );
}

export default App;
