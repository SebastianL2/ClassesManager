const api = import.meta.env.VITE_API_URL
interface apiPropsModifiers{
 name?:string;
 description?:string;
 last_name?:string;
 email?:string;
}

export const fetchData = async (urlPlus:string) => {
  try {
    
    
    const response = await fetch(api+urlPlus);
    const res = await response.json();
    console.log(res);
    
    return res;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
};

export const saveOne = async (data:apiPropsModifiers,urlPlus:string) => {
  try {
    const response = await fetch(`${api}${urlPlus}/`,{
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

export const deleteOne = async (id:string,urlPlus:string) => {
  try {
    const response = await fetch(`${api}${urlPlus}/${id}`,{
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

export const addOne = async (idClass:string,idUser:string,urlPlus:string) => {
  try {
    const response = await fetch(`${api}${urlPlus}/${idClass}/assign-teacher`,{
        method:'PATCH',
        headers:{
            'content-Type':'application/json'
        },
        body: JSON.stringify({
          id: idUser
        })
    });
    const res = await response.json();
    console.log(res);
    
    return res;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
};


export const updateOne = async (data:apiPropsModifiers,urlPlus:string) => {
  try {
    const response = await fetch(`${api}${urlPlus}/`,{
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