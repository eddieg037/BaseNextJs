"use client";

import { AllTransfers } from "@/data/definitions";
import { apiHandler } from "@/helpers/apiHandler/apiHandler";
import { useEffect, useState } from "react";

export default function AllTransfersTable() {
  const [allTransfers, setAllTransfers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    apiHandler
      .getData("/api/insights/transfers")
      .then((res) => res)
      .then((data) => {
        setAllTransfers(data);
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="h-[400px] bg-gray-800 container mx-8 rounded-md ml-4">
        <p>Loading...</p>
      </div>
    );
  if (allTransfers.length === 0)
    return (
      <div className="h-[400px] scroll-auto overflow-auto bg-gray-800 container mx-auto rounded-md">
        <div className="h-full items-center">
          <p className="text-2xl text-center pt-[180px]">
            No Transfer data Available
          </p>
        </div>
      </div>
    );
  return (
    <div className="h-[500px] bg-gray-800 container mx-6 rounded-md mt-3 overflow-scroll scroll-auto overflow-x-hidden">
      <h1 className="text-center my-4 text-2xl">Total Transfers</h1>
      <table className="table-auto w-full text-left ml-4">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {allTransfers.map((transfer: AllTransfers) => (
            <tr
              key={transfer.sender + transfer.date}
              className="even:bg-gray-500"
            >
              <td>{transfer.sender}</td>
              <td>{transfer.recipient}</td>
              <td>{transfer.amount} $</td>
              <td>{transfer.date.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
