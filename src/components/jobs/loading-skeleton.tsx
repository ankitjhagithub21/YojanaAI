import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <section aria-busy="true" aria-label="Finding matching vacancies" className="space-y-5">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-60" />
      </div>
      {[0, 1, 2].map((index) => (
        <Card className="space-y-5 p-5" key={index}>
          <div className="space-y-3">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <Skeleton className="h-10 w-full" />
        </Card>
      ))}
    </section>
  );
}
