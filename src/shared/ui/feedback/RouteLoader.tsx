import { Spinner } from "./Spinner";

/** Fallback used for lazy routes and suspense boundaries. */
export function RouteLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size={28} label={label} />
    </div>
  );
}