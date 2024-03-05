export const getGlobos = async (url: string) => {
  try {
    const response = await fetch(`https://c16-11-m-node-react-1.onrender.com/globos/globosBySubCategory/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    
    })

    const data = await response.json()
    
    return data 
  } catch (error) {
    console.log(error)
  }
}

