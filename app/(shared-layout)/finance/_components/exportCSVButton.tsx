"use client"

import { Button } from "@/components/ui/button";
import { TimeFrame } from "@/lib/types";

export default function ExportCSVButton({ timeFrame }: { timeFrame: TimeFrame }) {


    function exportData() {
        if (timeFrame) {
            window.open(`/api/finance?timeFrame=${timeFrame}`)
        } else {
            window.open(`/api/finance`)
        }

    }
    return (
        <Button onClick={() => exportData()}>Export Data</Button>
    )
}