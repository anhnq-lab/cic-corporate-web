"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CIC Web Error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold font-heading mb-3 text-foreground">
        Đã xảy ra lỗi
      </h1>
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        Rất tiếc, hệ thống gặp sự cố khi tải trang này. Vui lòng thử lại hoặc
        quay về trang chủ.
      </p>

      <div className="flex gap-3">
        <Button
          onClick={reset}
          variant="outline"
          className="rounded-full gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Thử lại
        </Button>
        <Link href="/">
          <Button className="rounded-full gap-2 bg-accent hover:bg-accent/90 text-white">
            <Home className="w-4 h-4" />
            Trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}
