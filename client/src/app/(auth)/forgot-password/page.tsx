import Image from "next/image";
import logo from "../../../../public/assets/logo/frame_3.png";
import ForgotPasswordForm from "@/components/modules/auth/ForgotPasswordForm";

export const metadata = { title: "Forgot Password | QuickHire" };

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image src={logo} alt="QuickHire" width={36} height={36} />
          <span className="text-2xl font-bold text-text-dark">QuickHire</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
