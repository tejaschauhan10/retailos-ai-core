/**
 * RetailOS AI — shared UI barrel.
 *
 * Every future module imports UI primitives from `@/shared/ui` rather than
 * reaching into `@/components/ui/*` directly. This keeps the shadcn layer
 * an implementation detail we can swap or extend without touching features.
 */

// shadcn primitives (re-exports)
export { Button, buttonVariants } from "@/components/ui/button";
export { Input } from "@/components/ui/input";
export { Textarea } from "@/components/ui/textarea";
export { Label } from "@/components/ui/label";
export { Checkbox } from "@/components/ui/checkbox";
export { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export { Switch } from "@/components/ui/switch";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export { Badge, badgeVariants } from "@/components/ui/badge";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export { Separator } from "@/components/ui/separator";
export { Skeleton } from "@/components/ui/skeleton";
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export { Toaster } from "@/components/ui/sonner";

// Composite / RetailOS components
export { WidgetCard } from "@/components/common/WidgetCard";
export { StatCard } from "@/components/common/StatCard";
export { ComingSoonCard } from "@/components/common/ComingSoonCard";
export { EmptyState } from "@/components/common/EmptyState";
export { PageHeader } from "@/components/common/PageHeader";
export { Breadcrumbs } from "@/components/common/Breadcrumbs";
export { LoadingSkeleton, CardSkeleton } from "@/components/common/LoadingSkeleton";
export { Logo } from "@/components/common/Logo";
export { ThemeToggle } from "@/components/common/ThemeToggle";

// Typography
export {
  Text,
  Display,
  H1,
  H2,
  H3,
  H4,
  Body,
  BodyLg,
  BodySm,
  Caption,
  Label as TypographyLabel,
  Mono,
  textVariants,
} from "./typography/Typography";

// Feedback
export { Spinner } from "./feedback/Spinner";
export { ErrorCard } from "./feedback/ErrorCard";
export { ErrorPage } from "./feedback/ErrorPage";
export { ConfirmationDialog } from "./feedback/ConfirmationDialog";
export { GlobalLoadingOverlay } from "./feedback/GlobalLoadingOverlay";
export { ProgressIndicator } from "./feedback/ProgressIndicator";
export { ButtonLoader } from "./feedback/ButtonLoader";
export { RouteLoader } from "./feedback/RouteLoader";
export { AppErrorBoundary } from "./feedback/AppErrorBoundary";

// Form primitives
export { FormField } from "./form/FormField";
export { PasswordInput } from "./form/PasswordInput";
export { SearchBox } from "./form/SearchBox";

// Table
export { DataTable } from "./table/DataTable";
export type { DataTableColumn, DataTableProps } from "./table/DataTable";

// Skeletons
export { PageSkeleton } from "./skeletons/PageSkeleton";
export { TableSkeleton } from "./skeletons/TableSkeleton";
export { DashboardSkeleton } from "./skeletons/DashboardSkeleton";
export { FormSkeleton } from "./skeletons/FormSkeleton";

// Motion
export { PageTransition } from "./motion/PageTransition";
export * as motionVariants from "./motion/variants";

// Icons
export { Icons } from "./icons";
export type { LucideIcon } from "./icons";