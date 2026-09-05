/ Add this test function to your CountdownTimer component temporarily
const testWeekendLogic = () => {
  // Test different scenarios
  const testCases = [
    new Date('2024-12-06 23:59:00'), // Friday 11:59 PM
    new Date('2024-12-07 10:00:00'), // Saturday 10:00 AM
    new Date('2024-12-08 15:30:00'), // Sunday 3:30 PM
    new Date('2024-12-09 00:00:00'), // Monday 12:00 AM
    new Date('2024-12-09 09:00:00'), // Monday 9:00 AM
  ];

  testCases.forEach(testDate => {
    const currentDay = testDate.getDay();
    const currentHour = testDate.getHours();
    const currentMinute = testDate.getMinutes();
    
    const isInWeekendPause = (
      (currentDay === 5 && currentHour === 23 && currentMinute >= 59) ||
      currentDay === 6 || 
      currentDay === 0 ||
      (currentDay === 1 && currentHour === 0 && currentMinute === 0)
    );
    
    console.log(`${testDate.toLocaleString()}: ${isInWeekendPause ? 'PAUSED' : 'RUNNING'}`);
  });
};

// Call this in useEffect temporarily
useEffect(() => {
  testWeekendLogic();
}, []);