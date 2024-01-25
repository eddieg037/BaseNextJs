"use client";

import { Person, Promotion } from "@/data/definitions";
import { apiHandler } from "@/helpers/apiHandler/apiHandler";
import { useEffect, useState } from "react";

export default function ClientPromotions() {
  const [clients, setClients] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    apiHandler
      .getData("/api/insights/userpromotions")
      .then((res) => res)
      .then((data) => {
        setClients(data);
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="h-[400px] bg-gray-800 container mx-auto rounded-md">
        <p>Loading...</p>
      </div>
    );

  if (clients.length === 0)
    return (
      <div className="h-[400px] scroll-auto overflow-auto bg-gray-800 container mx-auto rounded-md mt-3">
        <p className="text-2xl text-center pt-[180px]">
          No Client data Available
        </p>
      </div>
    );

  return (
    <div className="h-[400px] scroll-auto overflow-auto bg-gray-800 container mx-auto rounded-md mt-3">
      <h1 className="text-center mb-4 text-2xl">Client Promotions</h1>
      <div className="grid grid-cols-1 divide-y">
        {clients.map((client: Person) => (
          <div key={client.id+client.firstName} className="mb-2 mx-3">
            <div className="text-lg font-medium">
              {`${client.firstName} ${client.surname} (${client.email})`}
            </div>
            <div>
              <div className="ml-4 grid grid-cols-2">
                {client.promotions.map((promotion: Promotion) => (
                  <div className="mx-auto" key={promotion.id}>
                    <div>Promotion: {promotion.promotion}</div>
                    <div> Response: {promotion.responded}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
