const api = import.meta.env.VITE_API_URL
interface apiPropsModifiers{
 name:string;
 last_name:string;
 email:string;
}


export const saveOne = async (data:apiPropsModifiers) => {
  try {
    const response = await fetch(`${api}students/`,{
        method:'POST',
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    const res = await response.json();
    console.log(res);
    
    return res;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
};

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


export const updateOne = async (data:apiPropsModifiers) => {
  try {
    const response = await fetch(`${api}students/`,{
        method:'PATCH',
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    const res = await response.json();
    console.log(res);
    
    return res;
  } catch (error) {
    console.error('There was a problem with your  operation:', error);
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