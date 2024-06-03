const students = import.meta.env.VITE_API_URL + 'students';


export const fetchData = async () => {
  try {
    const response = await fetch(students);
    const res = await response.json();
    console.log(res);
    
    return res;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
};
