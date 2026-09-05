/**
 * Get weekend days from environment configuration
 * @returns {number[]} - Array of weekend day numbers (0-6, where 0 = Sunday)
 */
const getWeekendDays = () => {
  const weekendDaysConfig = import.meta.env.VITE_WEEKEND_DAYS || '0,6';
  return weekendDaysConfig.split(',').map(day => parseInt(day.trim()));
};

/**
 * Get holiday dates from environment configuration
 * @returns {string[]} - Array of holiday dates in YYYY-MM-DD format
 */
const getHolidayDates = () => {
  const holidaysConfig = import.meta.env.VITE_HOLIDAY_DATES || '';
  return holidaysConfig ? holidaysConfig.split(',').map(date => date.trim()) : [];
};

/**
 * Check if a date is a weekend
 * @param {Date} date - The date to check
 * @returns {boolean} - True if it's a weekend
 */
const isWeekend = (date) => {
  const weekendDays = getWeekendDays();
  return weekendDays.includes(date.getDay());
};

/**
 * Check if a date is a holiday
 * @param {Date} date - The date to check
 * @returns {boolean} - True if it's a holiday
 */
const isHoliday = (date) => {
  const holidays = getHolidayDates();
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
  return holidays.includes(dateString);
};

/**
 * Check if a date is a non-working day (weekend or holiday)
 * @param {Date} date - The date to check
 * @returns {boolean} - True if it's a non-working day
 */
const isNonWorkingDay = (date) => {
  return isWeekend(date) || isHoliday(date);
};

/**
 * Adds working hours (excluding weekends and holidays) to a given date
 * @param {Date} startDate - The starting date
 * @param {number} hours - Number of hours to add (excluding weekends and holidays)
 * @returns {Date} - The calculated end date
 */
export const addBusinessHours = (startDate, hours) => {
  const result = new Date(startDate);
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  let addedDays = 0;
  
  // Add business days first
  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    
    // Skip non-working days (weekends and holidays)
    if (!isNonWorkingDay(result)) {
      addedDays++;
    }
  }
  
  // Add remaining hours
  result.setHours(result.getHours() + remainingHours);
  
  // If adding hours pushes us into non-working day, move to next working day
  while (isNonWorkingDay(result)) {
    result.setDate(result.getDate() + 1);
    result.setHours(9); // Start at 9 AM on next working day
  }
  
  return result;
};

// Keep the old function for backward compatibility but rename it
export const addBusinessDays = (startDate, days) => {
  return addBusinessHours(startDate, days * 24);
};

/**
 * Calculates business days between two dates (excluding weekends and holidays)
 * @param {Date} startDate - The starting date
 * @param {Date} endDate - The ending date
 * @returns {number} - Number of business days
 */
export const getBusinessDaysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let businessDays = 0;
  
  const current = new Date(start);
  while (current <= end) {
    // Check if it's not a non-working day (weekend or holiday)
    if (!isNonWorkingDay(current)) {
      businessDays++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return businessDays;
};

/**
 * Get next working day from a given date
 * @param {Date} date - The starting date
 * @returns {Date} - Next working day
 */
export const getNextWorkingDay = (date) => {
  const result = new Date(date);
  
  do {
    result.setDate(result.getDate() + 1);
  } while (isNonWorkingDay(result));
  
  return result;
};

/**
 * Check if a date is a working day
 * @param {Date} date - The date to check
 * @returns {boolean} - True if it's a working day
 */
export const isWorkingDay = (date) => {
  return !isNonWorkingDay(date);
};