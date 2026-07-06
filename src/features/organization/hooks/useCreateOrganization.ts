import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/providers/AuthProvider";

import type { CreateOrganizationInput } from "../schemas";
import { organizationService } from "../services/organization.service";

export function useCreateOrganization() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateOrganizationInput) => {
      if (!user?.id) throw new Error("Not signed in");
      return organizationService.createOrganization(user.id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}