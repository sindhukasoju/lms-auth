// src/pages/student/Calendar.jsx
const Calendar = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4">Calendar & Schedule</h1>
        <p className="text-gray-600">Your upcoming classes and events.</p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-gray-500 text-sm">
          No upcoming events.
        </div>
      </div>
    </div>
  );
};
export default Calendar;