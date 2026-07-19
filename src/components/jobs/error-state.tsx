import { RefreshCw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ErrorStateProps = { message: string; onRetry: () => void };

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="grid place-items-center px-6 py-14 text-center">
      <div className="max-w-md space-y-4">
        <div className="bg-destructive/10 mx-auto grid size-12 place-items-center rounded-full">
          <TriangleAlert aria-hidden="true" className="text-destructive size-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">We couldn&apos;t find vacancies</h2>
          <p className="text-muted-foreground text-sm leading-6">{message}</p>
        </div>
        <Button onClick={onRetry} variant="outline">
          <RefreshCw aria-hidden="true" />
          Try again
        </Button>
      </div>
    </Card>
  );
}
