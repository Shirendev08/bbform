"use server"
export async function branches() {
  try {
    const res = await fetch("http://192.168.10.177:1987/internalnes/main/info/branches", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'no auth',
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch branches. Response status:', res.status);
      throw new Error('Failed to fetch branches');
    }

    const branch_data = await res.json();
    console.log({ branch_data });

    if (branch_data && branch_data.data) {
      return branch_data.data.br_list;   // Return the branch list
    } else {
      console.error('Invalid response structure');
      return []; // Return empty if no data is found
    }
  } catch (err) {
    console.error('Error during fetch or response processing:', err);
    throw err; // Re-throw after logging the error
  }
}

export async function sendSms(regNo:string, phoneNumber: string) {
  try {
    const res = await fetch('http://middleware.bogd.mn:9191/api-gateway/info/sms/sendOtp/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo, phoneNumber }),
    });
    console.log(regNo,phoneNumber)
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server error response:", errorData);
      throw new Error(errorData.message || "SMS sending failed.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in sendSms:", error);
    throw error;
  }
}

