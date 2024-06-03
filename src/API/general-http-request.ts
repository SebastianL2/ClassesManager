const api = import.meta.env.VITE_API_URL
interface apiPropsModifiers{
 id:string;

}

export const deleteOne = async (id:string) => {
  try {
    const response = await fetch(`${api}students/${id}`,{
        method:'DELETE',
        headers:{
            'content-Type':'application/json'
        }
    });
    const res = await response.json();
    console.log(res);
    
    return res;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
};

export const deleteMany = async () => {
    try {
      const response = await fetch(api);
      const res = await response.json();
      console.log(res);
      
      return res;
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };