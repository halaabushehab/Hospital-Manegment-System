"use client";
import { format, parseISO } from "date-fns";

export default function TimeSlotCalendar({
  appointments,
  selectedDate,
  onEdit,
  onCancel,
  onStatusChange,
}) {
  const timeSlots = [];
  for (let hour = 8; hour <= 17; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 17) timeSlots.push(`${hour}:30`);
  }

  // const getAppointmentsForTime = (time) => {
  //   return appointments.filter((appt) => {
  //     return appt.startTime <= time && appt.endTime > time;
  //   });
  // };
  const getAppointmentsForTime = (time) => {
    return appointments.filter((appt) => {
      const slotTime = time.split(":").map(Number);
      const startTimeParts = appt.startTime.split(":").map(Number);
      const endTimeParts = appt.endTime.split(":").map(Number);

      const slotMinutes = slotTime[0] * 60 + slotTime[1];
      const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
      const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];

      return slotMinutes >= startMinutes && slotMinutes < endMinutes;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map((time) => {
              const slotAppointments = getAppointmentsForTime(time);
              return slotAppointments.length > 0 ? (
                slotAppointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className={appt.emergency ? "bg-red-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appt.startTime} - {appt.endTime}
                      {appt.emergency && (
                        <span className="ml-2 text-xs text-red-500">
                          (Emergency)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appt.patientId?.name || "Unknown"}
                      <div className="text-sm text-gray-500">
                        {appt.patientId?.phoneNumber || ""}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{appt.reason}</div>
                      {appt.notes && (
                        <div className="text-sm text-gray-500">
                          {appt.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={appt.status}
                        onChange={(e) =>
                          onStatusChange(appt._id, e.target.value)
                        }
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          appt.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => onEdit(appt)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onCancel(appt._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={time}>
                  <td className="px-6 py-4 whitespace-nowrap">{time}</td>
                  <td colSpan="4" className="px-6 py-4 text-sm text-gray-500">
                    Available
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
