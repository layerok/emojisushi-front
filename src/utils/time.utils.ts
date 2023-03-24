export const isClosed = ({ start, end }) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return (
    hours < start[0] ||
    (start[0] === hours && minutes < start[1]) ||
    hours > end[0] ||
    (end[0] === hours && minutes > end[1])
  );
};
