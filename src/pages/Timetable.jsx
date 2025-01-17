import React, { useState } from 'react';
import { useStore } from '../context/Context';  
import { useNavigate } from 'react-router-dom';

function Timetable() {
    const [courseCount, setCourseCount] = useState(5);
    const {courseData,updateCourseData,courseNames,updateCourseNames} = useStore();
    const navigate = useNavigate();

    const toCalculatePage = () => {
        navigate('/calculate')
    }
    
    const handleCheckboxChange = (index, day, checked) => {
        updateCourseData(index, day, checked);  
    };

    const handleCourseNameChange = (index,value) => {
        updateCourseNames(index,value);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Course Scheduler</h2>
                <form>
                    {/* Course List */}
                    <div id="courseList" className="space-y-6">
                        {/* Single Course Row */}
                        {[...Array(courseCount)].map((_, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-7 items-center gap-4 border-b pb-4"
                            >
                                <input
                                    type="text"
                                    value={courseNames[index] || ''}
                                    onChange={(e) => handleCourseNameChange(index,e.target.value)}
                                    placeholder={`Course ${index + 1} Name`}
                                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                                    <div key={day} className="flex items-center space-x-2">
                                        <input 
                                            type="checkbox" 
                                            id={`${day}-${index}`}
                                            checked={courseData[index]?.[day] || false}

                                            onChange={(e) => handleCheckboxChange(index, day, e.target.checked)}  
                                        />
                                        <label
                                            htmlFor={`${day}-${index}`}
                                            className="text-sm text-gray-700"
                                        >
                                            {day}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Add Course Button */}
                    <div className="mt-6">
                        <button
                            type="button"
                            className="flex items-center justify-center w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            onClick={() => setCourseCount(courseCount + 1)}  
                        >
                            + Add More Courses
                        </button>
                    </div>

                    {/* {Submit Button} */}
                    <div className="mt-6 flex items-center justify-center">
                        <button
                            type="submit"
                            onClick={() => toCalculatePage()}
                            className="w-1/2 px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Timetable;
