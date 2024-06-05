const api = import.meta.env.VITE_API_URL
interface apiPropsModifiers{
 name?:string;
 description?:string;
 last_name?:string;
 email?:string;
}

export const fetchData = async (urlPlus:string) => {
  console.log('aaaaaaa');
  
  try {
    
    
    const response = await fetch(api+urlPlus);
    const res = await response.json();
   
    
    return res;
  } catch (error) {
   
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
  
    
    return res;
  } catch (error) {
 
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
    
    return res;
  } catch (error) {
   
  }
};

export const addOne = async (idClass:string,idUser:string,urlPlus:string,urlPlus2:string) => {
  try {
    
    const response = await fetch(`${api}${urlPlus}/${idClass}/${urlPlus2}`,{
        method:'PATCH',
        headers:{
            'content-Type':'application/json'
        },
        body: JSON.stringify({
          id: idUser
        })
    });
    const res = await response.json();
    
    
    return res;
  } catch (error) {
   
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
    
    
    return res;
  } catch (error) {
   
  }
};

export const deleteMany = async () => {
    try {
      const response = await fetch(api);
      const res = await response.json();
      
      return res;
    } catch (error) {
     
    }
  };