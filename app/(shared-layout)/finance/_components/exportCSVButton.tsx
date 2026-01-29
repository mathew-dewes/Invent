"use client"

import { Button } from "@/components/ui/button";

export default function ExportCSVButton(){
    return (
        <Button onClick={()=> window.open("/api/finance")}>Export Data</Button>
    )
}