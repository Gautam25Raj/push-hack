import AuthProvider from "@/providers/AuthProvider";

export default function HomeLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
