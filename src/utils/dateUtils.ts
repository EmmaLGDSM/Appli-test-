// Format date string to more readable format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  
  // Check if date is today or tomorrow
  if (isSameDay(date, today)) {
    return 'Today';
  } else if (isSameDay(date, tomorrow)) {
    return 'Tomorrow';
  }
  
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: today.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
  });
};

// Check if two dates represent the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};