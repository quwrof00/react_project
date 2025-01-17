import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/Context';

function Calculate() {
  const {dayCount,updateDayCount} = useStore();
  const navigate = useNavigate();

  const toResult = () => {
    navigate('/result');
  }

  const handleCountChange = (index,count,type) => {
    updateDayCount(index,count,type);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Attendance Input</h2>
      <form>
        {/* Attendance List */}
        <div className="space-y-6">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day,index) => (
            <div key={day} className="grid grid-cols-4 items-center gap-4 border-b pb-4">
              <label className="text-sm text-gray-700">{day}</label>
              <input
                type="number"
                onChange={(e) => handleCountChange(index,e.target.value,"total")}
                placeholder="Total Days"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                onChange={(e) => handleCountChange(index,e.target.value,"attended")}
                placeholder="Attended Days"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}
        </div>
        {/*Calculate Button*/}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={toResult}
            className="w-full px-4 py-2 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  </div>

  )
}

export default Calculate