"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const pushSign = useSelector((state) => state.push.pushSign);

  useEffect(() => {
    if (!pushSign) {
      router.replace(`/?next=${encodeURIComponent(pathname)}`);
    }
  }, [pushSign, router, pathname]);

  return <>{children}</>;
};

export default AuthProvider;
