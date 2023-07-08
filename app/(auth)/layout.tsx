import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <div className="flex items-center justify-center h-screen">{children}</div>
  );
}

export default AuthLayout;
