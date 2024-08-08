export const generateOptions = (now = new Date()) => {
  return [
    {
      code: 'anytime',
      label: 'Anytime',
      to: null,
      from: null,
    },
    {
      code: 'pastHour',
      label: 'Past Hour',
      to: now.toISOString(),
      from: new Date(now - 60 * 60 * 1000).toISOString(), // 1 hour ago
    },
    {
      code: 'past24Hours',
      label: 'Past 24 Hours',
      to: now.toISOString(),
      from: new Date(now - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    },
    {
      code: 'past3Days',
      label: 'Past 3 Days',
      to: now.toISOString(),
      from: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
      code: 'pastWeek',
      label: 'Past Week',
      to: now.toISOString(),
      from: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    },
    // {
    //   code: 'pastMonth',
    //   label: 'Past Month',
    //   to: now.toISOString(),
    //   from: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(), // 1 month days ago
    // },
  ];
};

export const timeAgo = timestamp => {
  const now = new Date();
  const then = new Date(timestamp);
  const differenceInSeconds = Math.floor((now - then) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;

  if (differenceInSeconds < secondsInMinute) {
    return `${differenceInSeconds} seconds ago`;
  } else if (differenceInSeconds < secondsInHour) {
    const minutes = Math.floor(differenceInSeconds / secondsInMinute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (differenceInSeconds < secondsInDay) {
    const hours = Math.floor(differenceInSeconds / secondsInHour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(differenceInSeconds / secondsInDay);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};
