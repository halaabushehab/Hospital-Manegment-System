export default function DepartmentSelector({ departments, onSelect }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-medium mb-4">Select Department</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((department) => (
          <button
            key={department}
            onClick={() => onSelect(department)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 text-left flex items-center transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <span className="text-blue-600 text-lg">
                {department.charAt(0)}
              </span>
            </div>
            <span>{department}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
