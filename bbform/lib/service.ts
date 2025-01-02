// branches.ts (or wherever the function is defined)
export async function branches() {
    const res = await fetch("http://192.168.10.177:1987/internalnes/main/info/branches", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (res.ok) {
      const branch_data = await res.json();
      console.log({branch_data})
      return branch_data.data; // This should be an array of branch objects
    } else {
      throw new Error('Failed to fetch branches');
    }
  }
  