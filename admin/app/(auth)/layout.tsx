import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center h-screen">{children}</div>
  );
}

export default AuthLayout;
