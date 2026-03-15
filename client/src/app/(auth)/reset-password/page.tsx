import Image from "next/image";
import { Suspense } from "react";
import logo from "../../../../public/assets/logo/frame_3.png";
import ResetPasswordForm from "@/components/modules/auth/ResetPasswordForm";

export const metadata = { title: "Reset Password | QuickHire" };

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image src={logo} alt="QuickHire" width={36} height={36} />
          <span className="text-2xl font-bold text-text-dark">QuickHire</span>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <Suspense fallback={<div className="text-center text-text-body">Loading…</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
