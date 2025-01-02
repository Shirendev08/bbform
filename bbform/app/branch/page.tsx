"use client";
import React, { useState, useEffect } from "react";
import { branches } from "@/lib/service";
interface Branch {
    bus_hours: string;
    address: string;
    phone: string;
    img_url: string;
    loc_code: string;
    latitude: number;
    loc_type: string;
    loc_name: string;
    fax: string;
    email: string;
    longitude: number;
  }
  
const Page = () => {
  const [branchData, setBranchData] = useState<Branch[]>([]); // Use Branch[] type
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data: Branch[] = await branches(); // Expect data of type Branch[]
        console.log("Fetched Branch Data:", data);

        if (data.length > 0) {
          setBranchData(data);
        } else {
          setError("No branches available");
        }
      } catch (err) {
        setError("Failed to fetch branches");
        console.error(err);
      }
    };

    fetchBranches();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {branchData.map((branch) => (
          <li key={branch.loc_code}>
            <h3>{branch.loc_name}</h3>
            <p>{branch.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
