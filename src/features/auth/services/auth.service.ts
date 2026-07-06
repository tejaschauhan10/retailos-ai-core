import { supabase } from "@/integrations/supabase/client";

import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "../schemas";

export const authService = {
  async login(input: LoginInput) {
    const { data, error } = await supabase.auth.signInWithPassword(input);
    if (error) throw error;
    return data;
  },

  async register(input: RegisterInput) {
    const redirectTo =
      typeof window !== "undefined" ? window.location.origin : undefined;
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        emailRedirectTo: redirectTo,
        data: { full_name: input.fullName },
      },
    });
    if (error) throw error;

    const userId = data.user?.id;
    if (userId) {
      await supabase
        .from("profiles")
        .upsert(
          { id: userId, email: input.email, full_name: input.fullName },
          { onConflict: "id" },
        );
    }
    return data;
  },

  async forgotPassword({ email }: ForgotPasswordInput) {
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) throw error;
  },

  async resetPassword({ password }: ResetPasswordInput) {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};