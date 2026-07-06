import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/providers/AuthProvider";

import { organizationService } from "../services/organization.service";

export function useMyMemberships() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["organizations", "memberships", user?.id],
    queryFn: () => organizationService.listMyMemberships(user!.id),
    enabled: !!user?.id,
    staleTime: 60_000,
  });
}