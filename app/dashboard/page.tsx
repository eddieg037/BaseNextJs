import AllTransfersTable from "../ui/dashboard/AllTransfersTable";
import ClientPromotions from "../ui/dashboard/ClientPromotions";
import PromotionsTotal from "../ui/dashboard/PromotionsTotal";
import StoreInsight from "../ui/dashboard/StoreInsight";

export default function Dashboard() {
  return (
    <div className="w-full container mx-3 flex flex-wrap text-white">
      <div className="w-1/3">
        <ClientPromotions />
      </div>
      <div className="w-1/3">
        <StoreInsight />
      </div>
      <div className="w-1/3">
        <PromotionsTotal />
      </div>
      <div className="basis-full">
        <AllTransfersTable />
      </div>
    </div>
  );
}
