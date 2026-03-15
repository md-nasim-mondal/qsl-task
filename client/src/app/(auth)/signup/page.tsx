import Image from "next/image";
import logo from "../../../../public/assets/logo/frame_3.png";
import SignupForm from "@/components/modules/auth/SignupForm";

export const metadata = { title: "Create Account | QuickHire" };

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image src={logo} alt="QuickHire" width={36} height={36} />
          <span className="text-2xl font-bold text-text-dark">QuickHire</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-text-dark mb-1">
            Create an Account
          </h1>
          <p className="text-text-body text-sm mb-6">
            Join QuickHire and start posting jobs today
          </p>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
