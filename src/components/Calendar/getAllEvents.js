import sickLeaveService from '../../services/sickLeaveService';
import dayOffService from '../../services/dayOffService';
import vacationsService from '../../services/vacationsService';

async function getAllEvents(employeeId) {
    try {
        const [sickLeaves, dayOffs, vacations] = await Promise.all([
            sickLeaveService.getAllSearchByEmployeeIdSickLeaves(employeeId),
            dayOffService.getAllSearchByEmployeeIdDaysOff(employeeId),
            vacationsService.getAllSearchByEmployeeIdVacations(employeeId),
        ]);

        console.log(sickLeaves);
        console.log(dayOffs);
        console.log(vacations);

        const allEvents = [
            ...sickLeaves.map(event => ({
                ...event,
                type: 'sickLeave',
                color: 'blue',
                title: `Больничный. Диагноз: ${event.diagnosis}` || 'Больничный', // Добавлено для отображения в календаре
                start: new Date(event.start_date),
                end: new Date(event.end_date),
            })),
            ...dayOffs.map(event => ({
                ...event,
                type: 'dayOff',
                color: 'yellow',
                title: `Прогул. Причина: ${event.reason}` || 'Прогул', // Добавлено для отображения в календаре
                start: new Date(event.start_date),
                end: new Date(event.end_date),
            })),
            ...vacations.map(event => ({
                ...event,
                type: 'vacation',
                color: 'green',
                title: `Отпуск. Тип отпуска: ${event.type}` || 'Отпуск', // Добавлено для отображения в календаре
                start: new Date(event.start_date),
                end: new Date(event.end_date),
            })),
        ];

        return allEvents;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return [];
    }
}

export default getAllEvents;