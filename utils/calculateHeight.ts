// Event heights in viewport height (vh)
const EVENT_HEIGHTS = {
  'compono': 150, // h-[150vh]
  'siteaoplus': 250,
  'orsem': 400,
  'genass': 300,
  'induction': 300,
  'lanyard': 175,
  'sweeteao': 200,
  'ambas': 250,
  'donation': 100,
  'justice': 200,
  'midterm': 200,
  'olympics': 240,
  'atfest': 350,
  'iggy': 120,
  'end': 120
};

export const calculateTotalHeight = () => {
  // Get viewport height
  const vh = window.innerHeight;
  
  // Calculate total height in pixels
  const totalHeight = Object.values(EVENT_HEIGHTS).reduce((sum, height) => sum + height, 0) * (vh / 100);
  
  // Add extra space for headers and gaps
  const extraSpace = vh * 2; // 2 viewport heights for headers and gaps
  
  return totalHeight + extraSpace;
}; 