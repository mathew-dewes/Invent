import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function DashboardLoader({showLoader}:{showLoader: boolean}) {
  return (
    <div className={`flex items-center gap-4 [--radius:1.2rem] ${showLoader ? "" : "invisible"}`}>
      <Badge>
        <Spinner data-icon="inline-start" />
        Loading dashboard...
      </Badge>

    </div>
  )
}
