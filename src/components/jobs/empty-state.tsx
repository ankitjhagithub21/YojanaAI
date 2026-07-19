import { SearchX } from "lucide-react";

import { Card } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card className="grid place-items-center px-6 py-14 text-center">
      <div className="max-w-sm space-y-3">
        <div className="bg-muted mx-auto grid size-12 place-items-center rounded-full">
          <SearchX aria-hidden="true" className="text-muted-foreground size-6" />
        </div>
        <h2 className="text-lg font-semibold">No matching vacancies found</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Try broadening your profile details or check again soon as new notifications are
          published.
        </p>
      </div>
    </Card>
  );
}
