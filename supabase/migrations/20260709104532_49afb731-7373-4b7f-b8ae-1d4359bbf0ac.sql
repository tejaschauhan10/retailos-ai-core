CREATE POLICY organizations_select_owner ON public.organizations
FOR SELECT TO authenticated
USING (owner_id = auth.uid());