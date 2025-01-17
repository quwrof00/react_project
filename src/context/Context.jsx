import React, { createContext, useState, useContext, useEffect } from 'react';

export const storeContext = createContext();

export const useStore = () => {
    return useContext(storeContext);
};

export const StoreProvider = ({ children }) => {

    const [courseData, setCourseData] = useState(() => {
        const storedData = localStorage.getItem('courseData');
        return storedData ? JSON.parse(storedData) : [];
    });
    const [courseNames, setCourseNames] = useState(() => {
        const storedNames = localStorage.getItem('courseNames');
        return storedNames ? JSON.parse(storedNames) : [];
    });
    const [dayCount, setDayCount] = useState(() => {
        const storedDayCount = localStorage.getItem('dayCount');
        return storedDayCount ? JSON.parse(storedDayCount) : [];
    });

    useEffect(() => {
        localStorage.setItem('courseData', JSON.stringify(courseData));
    }, [courseData]);

    useEffect(() => {
        localStorage.setItem('courseNames', JSON.stringify(courseNames));
    }, [courseNames]);

    useEffect(() => {
        localStorage.setItem('dayCount', JSON.stringify(dayCount));
    }, [dayCount]);

    const resetData = () => {
        setCourseData([]);
        setCourseNames([]);
        setDayCount([]);
    };

    const updateCourseData = (index, day, checked) => {
        const newCourseData = [...courseData];
        if (!newCourseData[index]) {
            newCourseData[index] = {};
        }
        newCourseData[index][day] = checked;
        setCourseData(newCourseData);
        console.log("Updated courseData:", newCourseData);
    };

    const updateCourseNames = (index, name) => {
        const updatedNames = [...courseNames];
        updatedNames[index] = name || '';
        setCourseNames(updatedNames);
    };

    const updateDayCount = (index, value, type) => {
        const updatedCount = [...dayCount];

        if (!updatedCount[index]) {
            updatedCount[index] = { total: 0, attended: 0 };
        }

        updatedCount[index][type] = value;
        setDayCount(updatedCount);
        console.log(updatedCount);
    };

    return (
        <storeContext.Provider value={{ courseData, courseNames, updateCourseData, updateCourseNames, dayCount, updateDayCount, resetData }}>
            {children}
        </storeContext.Provider>
    );
};
