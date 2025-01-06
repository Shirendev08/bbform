"use server"

import { z } from "zod";

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


export async function otpVerification(otpCode:string, phoneNumber: string) {
  try {
    const res = await fetch('http://middleware.bogd.mn:9191/api-gateway/info/signup/otp/confirmation', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otpCode, phoneNumber }),
    }); 
    console.log(otpCode,phoneNumber)
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



export async function qr() {
  try {
    const res = await fetch('http://middleware.bogd.mn:9191/api-gateway/info/signup/q_pay/qr', {
      method: "POST",
      headers: { "Content-Type": "application/json" },

    }); 
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server error response:", errorData);
      throw new Error(errorData.message || "qr failed.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in sendSms:", error);
    throw error;
  }
}

export async function cardData() {
  try {
    const res = await fetch('http://middleware.bogd.mn:9191/api-gateway/info/signup/products', {
      method: "POST",
      headers: { "Content-Type": "application/json" },

    }); 
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server error response:", errorData);
      throw new Error(errorData.message || "qr failed.");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error in sendSms:", error);
    throw error;
  }
}

function calculateAge(birthdate: Date): number {
  const today = new Date();
  const birthYear = birthdate.getFullYear();
  const birthMonth = birthdate.getMonth();
  const birthDay = birthdate.getDate();

  let age = today.getFullYear() - birthYear;

  // Adjust if the birthday hasn't occurred yet this year
  if (
    today.getMonth() < birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() < birthDay)
  ) {
    age--;
  }

  return age;
}
// export async function sendFormData(data: FormData) {
//   try {
//     console.log("sendFormData.data:");

//     const entries = Array.from(data.entries());
//     for (const [key, value] of entries) {
//         console.log(`  ${key}:`, value);
//       }

//     const formData = new FormData();

//     // Map the form data fields
//     const fieldMappings: { key: string; value: string | boolean | number }[] = [
//       { key: "fullName", value: data.get("username") },
//       { key: "RegNo", value: data.get("regNo") },
//       { key: "customerAge", value: calculateAge(new Date(data.get("date"))) }, // Assuming a helper function
//       { key: "customerAddress", value: data.get("address") },
//       { key: "countyCode", value: "496" }, // Static value
//       { key: "mobileNumber", value: data.get("phoneNumber") },
//       { key: "emailAddress", value: data.get("email") },
//       { key: "hasAccBogd", value: data.get("hasBankAccount") ? 'YES': 'NO' },
//       { key: "promoCode", value: data.get("promoCode") ?? "123" },
//       { key: "productCode", value: data.get("productCode") }, 
//       { key: "branchCode", value: data.get("branch") },
//       { key: "paymentDescription", value: data.get("verification") || "description" },
//     ];

//     // Append text fields to FormData
//     fieldMappings.forEach(({ key, value }) => {
//       formData.append(key, String(value)); // Convert all values to strings
//     });

//     // Append files to FormData
//     const file = data.get("file");

//     if (file) {
//       if (Array.isArray(file)) {
//         file.forEach((f: File) => {
//           formData.append("file", f);
//         });
//       } else {
//         formData.append("file", file);
//       }
//     }

//     console.log("formData", formData);

//     // Send the POST request
//     const res = await fetch(
//       "http://192.168.44.178:8085/info/signup/save/",
//       {
//         method: "POST",
//         // headers: {
//         //   "Content-Type": "multipart/form-data"
//         // },
//         body: formData,
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Error in sendFormData:", error);
//     throw error;
//   }
// }

export async function sendFormData(data: FormData) {
  try {
    console.log("sendFormData.data:");

    const entries = Array.from(data.entries());
    for (const [key, value] of entries) {
      console.log(`  ${key}:`, value);
    }

    const formData = new FormData();

    // Map the form data fields
    const fieldMappings: { key: string; value: string | boolean | number }[] = [
      { key: "fullName", value: data.get("username") },
      { key: "RegNo", value: data.get("regNo") },
      { key: "customerAge", value: calculateAge(new Date(data.get("date"))) }, // Assuming a helper function
      { key: "customerAddress", value: data.get("address") },
      { key: "countyCode", value: "496" }, // Static value
      { key: "mobileNumber", value: data.get("phoneNumber") },
      { key: "emailAddress", value: data.get("email") },
      { key: "hasAccBogd", value: data.get("hasBankAccount") ? 'YES' : 'NO' },
      { key: "promoCode", value: data.get("promoCode") ?? "123" },
      { key: "productCode", value: data.get("productCode") },
      { key: "branchCode", value: data.get("branch") },
      { key: "paymentDescription", value: data.get("verification") || "description" },
    ];

    // Append text fields to FormData
    fieldMappings.forEach(({ key, value }) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value)); // Convert all values to strings
      }
    });

    // Append files to FormData
    const file = data.get("file");

    if (file) {
      if (file instanceof File) {
        // Single file case
        formData.append("file", file);
      } else if (Array.isArray(file)) {
        // Multiple files case (if the file input allows multiple)
        file.forEach((f: File) => {
          formData.append("file", f);
        });
      }
    }

    console.log("formData:", formData);

    // Send the POST request
    const res = await fetch(
      "http://middleware.bogd.mn:9191/api-gateway/info/signup/save",
      {
        method: "POST",
        body: formData, // Send the formData directly
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in sendFormData:", error);
    throw error;
  }
}


