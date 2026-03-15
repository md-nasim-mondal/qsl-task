import Image from "next/image";
import logo from "../../../../public/assets/logo/frame_3.png";
import LoginForm from "@/components/modules/auth/LoginForm";
import Link from "next/link";

export const metadata = { title: "Login | QuickHire" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image src={logo} alt="QuickHire" width={36} height={36} />
          <span className="text-2xl font-bold text-text-dark">QuickHire</span>
        </div>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-text-dark mb-1">
            Welcome Back 👋
          </h1>
          <p className="text-text-body text-sm mb-6">
            Sign in to your account to continue
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
