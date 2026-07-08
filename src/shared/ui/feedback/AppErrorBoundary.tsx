import { Component, type ErrorInfo, type ReactNode } from "react";

import { errorLogger } from "@/core/logger/logger";
import { reportLovableError } from "@/lib/lovable-error-reporting";

import { ErrorPage } from "./ErrorPage";

interface AppErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface AppErrorBoundaryState {
  error: Error | null;
}

/**
 * Top-level error boundary. Renders a resilient fallback and reports to
 * the Lovable telemetry sink + application logger.
 */
export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    errorLogger.error("Uncaught render error", { message: error.message, stack: error.stack, info });
    reportLovableError(error, { componentStack: info.componentStack });
  }

  private reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <ErrorPage
          kind="500"
          title="Something went wrong"
          description={this.state.error.message || "An unexpected error occurred."}
          onRetry={this.reset}
        />
      );
    }
    return this.props.children;
  }
}