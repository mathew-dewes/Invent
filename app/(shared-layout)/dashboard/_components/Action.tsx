import ActionCard from "./ActionCard";

export default function Action(){
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary">
                  <h1 className="font-semibold text-xl py-3">Urgent action</h1>

                  <div className="grid lg:grid-cols-3 gap-3">
         <ActionCard title="Open requests" description="Requests awaiting to be picked"/>
         <ActionCard title="Ready requests" description="Requests ready for collection"/>
         <ActionCard title="Delayed purchases" description="Stock items waiting for delivery"/>
                  </div>
   
        </div>
    )
}