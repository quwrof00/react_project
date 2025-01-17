import React, { useState } from 'react';
import { useStore } from '../context/Context';
import { useNavigate } from 'react-router-dom';

function Result() {
  const navigate = useNavigate();
  const {courseData,dayCount,courseNames,resetData} = useStore();  
  
  console.log("courseData:", courseData);
console.log("courseNames:", courseNames);

const extendedResetData = () => {
  resetData();
  navigate('/');
};


  const calculatePercentage = (attended, total) => {
    return ((attended / total) * 100).toFixed(2) + '%';
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
          <div className="space-y-4">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-4 font-bold text-gray-700">
              <div>Course Name</div>
              <div>Attended Classes</div>
              <div>Total Classes</div>
              <div>Percentage</div>
            </div>

            {/* Dynamic Rows */}
         {courseData.map((classDays, index) => {
            let attendedDays = 0;
            let totalDays = 0;
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
            daysOfWeek.forEach((day, index) => {
                if (classDays[day]) {
                    const attended = dayCount[index] ? parseInt(dayCount[index]['attended'], 10) : 0;
                    const total = dayCount[index] ? parseInt(dayCount[index]['total'], 10) : 0;
                    attendedDays += attended;
                    totalDays += total;
  }
});
         return ( 
    <div key={index} className={`grid grid-cols-4 gap-4 ${parseInt(calculatePercentage(attendedDays,totalDays)) >= 74 ? 'text-green-700' : 'text-red-700'}`}>
      <div>{courseNames[index]}</div>
      <div>{attendedDays}</div>
      <div>{totalDays}</div>
      <div>{calculatePercentage(attendedDays, totalDays)}</div>
    </div>
  );
})}
<button 
class=" mt-5 px-4 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
onClick={extendedResetData}>
    Reset Data
</button>
</div>
        
        
        

      </div>
    </div>
    </>
  );
}

export default Result;
