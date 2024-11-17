// utils/fetchHelper.js
export async function fetchRequest(url, method = 'GET', token = null, body = null) {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      };
  
      const res = await fetch(url, options);
  
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${url}`);
      }
  
      return res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  