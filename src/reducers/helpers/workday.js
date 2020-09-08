const updateMonth = (draft, month) => {
    const monthId = month._id;
    // Update the month
    draft.months.byIds[monthId].totalHours = month.totalHours;
    draft.months.byIds[monthId].totalWorkdays = month.totalWorkdays;
    draft.months.byIds[monthId].totalDaysOff = month.totalDaysOff;
};

export const addWorkday = (draft, { workday, month }) => {
    const monthId = month._id;
    const workdayId = workday._id;

    // Add workday to workdays entity
    draft.workdays[workdayId] = workday;

    // Add the workday id to the month workday ids
    draft.months.byIds[monthId].workdays.push(workdayId);
    // Update the month
    updateMonth(draft, month);
};

export const updateWorkday = (draft, { workday, month }) => {
    // Assign the updated workday
    draft.workdays[workday._id] = { ...workday };

    // Update the month
    updateMonth(draft, month);
};

export const deleteWorkday = (draft, { workday, month }) => {
    // Delete the workday from state
    delete draft.workdays[workday._id];
    // Get the workday ids array index of the deleted workday
    const arrayIndex = draft.months.byIds[month._id].workdays.indexOf(
        workday._id
    );

    // Remove the workday id from the month
    draft.months.byIds[month._id].workdays.splice(arrayIndex, 1);

    // Update the month
    updateMonth(draft, month);
};
