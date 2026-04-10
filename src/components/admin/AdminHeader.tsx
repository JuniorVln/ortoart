"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

interface AdminHeaderProps {
  user: { name: string; email: string } | null;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D1F3C]">
            <span className="text-sm font-bold text-[#87CEEB]">OA</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">OrtoArt CMS</span>
            <span className="ml-2 rounded bg-[#87CEEB]/20 px-1.5 py-0.5 text-[10px] font-medium text-[#0D1F3C]">
              Admin
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
