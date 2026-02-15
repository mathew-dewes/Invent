
import { getRequestCount } from "@/lib/queries/request";
import DeleteDemoDataButton from "./DeleteDemoDataButton";
import LoadDemoDataButton from "./LoadDemoDataButton";

export default async function WalkThrough(){

  const requests = await getRequestCount();


  if (requests > 0) return

 



    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2">
                           <div>
                      <h1 className="font-semibold text-xl py-3 ml-1">Walk through</h1>
                       <div>
                      <p>Welcome to Invent! inorder to proceed, you must add data to activate the dashboard.</p>
                      <p>If you want to see a demo of how the app works, Please press the load data button below to get started</p>
                      </div>
                      <div className="mt-5 flex gap-2">
                        <div>
                    <LoadDemoDataButton/>
                        </div>
                      
                  
                          <DeleteDemoDataButton/>
                    
                
                      </div>
                     
                           </div>
                          </div>
    )
}