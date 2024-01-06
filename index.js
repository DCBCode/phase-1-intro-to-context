function createEmployeeRecord(employeeData) {
    let employeeRecord = {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  
    return employeeRecord;
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeData => createEmployeeRecord(employeeData));
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    let [date, time] = dateTimeString.split(" ");
    let hour = time.slice(0, -2); // Extract the hour from the time string
  
    // Check if the hour has leading zeros
    if (hour.length === 1) {
      hour = "0" + hour; // Add a leading zero if necessary
    }
  
    hour = parseInt(hour, 10) * 100; // Convert the hour to the desired format
  
    let timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: hour,
    };
  
    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    let [date, time] = dateTimeString.split(" ");
    let hour = time.slice(0, -2); // Extract the hour from the time string
  
    // Check if the hour has leading zeros
    if (hour.length === 1) {
      hour = "0" + hour; // Add a leading zero if necessary
    }
  
    hour = parseInt(hour, 10) * 100; // Convert the hour to the desired format
  
    let timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: hour,
    };
  
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      return 0;
    }
  
    let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    let wagesEarned = hoursWorked * employeeRecord.payPerHour;
  
    return wagesEarned;
  }
  
  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
  
    employeeRecords.forEach(employeeRecord => {
      let employeeWages = 0;
  
      employeeRecord.timeInEvents.forEach(timeInEvent => {
        let date = timeInEvent.date;
        let wagesEarned = wagesEarnedOnDate(employeeRecord, date);
        employeeWages += wagesEarned;
      });
  
      totalPayroll += employeeWages;
    });
  
    return totalPayroll;
  }
  
  const employeeRecord = {
    firstName: "John",
    familyName: "Doe",
    title: "Software Engineer",
    payPerHour: 25,
    timeInEvents: [
      { type: "TimeIn", date: "2022-01-01", hour: 900 },
      { type: "TimeIn", date: "2022-01-02", hour: 1000 }
    ],
    timeOutEvents: [
      { type: "TimeOut", date: "2022-01-01", hour: 1100 },
      { type: "TimeOut", date: "2022-01-02", hour: 1200 }
    ]
  };
  
  const date = "2022-01-01";
  
  const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
  console.log(wagesEarned);
  
  function allWagesFor(employeeRecord) {
    let totalWages = 0;
  
    employeeRecord.timeInEvents.forEach((timeInEvent) => {
      let date = timeInEvent.date;
      let wagesEarned = wagesEarnedOnDate(employeeRecord, date);
      totalWages += wagesEarned;
    });
  
    return totalWages;
  }