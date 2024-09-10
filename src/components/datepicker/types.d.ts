export default interface IDatePicker {
    currentDate: Date;
    setDate: (date: Date) => void;
    schoolYear: {
        start: Date;
        end: Date;
    };
}
