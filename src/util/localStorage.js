export const getItem = (key) => {
     const value = localStorage.getItem(key); 

     return value ? JSON.parse(value) : []; 
} 

export const setItem = (key, value) => {
     if(!value) return; 
     
     const data = JSON.stringify(value); 
     localStorage.setItem(key, data); 
}