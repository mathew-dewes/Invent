import { getSession } from "@/lib/actions/auth";
import NavbarClient from "./NavClient";




export default async function NavbarNew() {

    const session = await getSession();


    return (

        <div>
       <NavbarClient session={!!session}/>
        </div>

    )
}

