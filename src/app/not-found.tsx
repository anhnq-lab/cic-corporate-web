import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* 404 Number */}
      <div className="relative mb-6">
        <span className="text-[120px] md:text-[160px] font-bold font-heading leading-none text-transparent bg-clip-text bg-gradient-to-b from-accent/30 to-accent/5 select-none">
          404
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold font-heading mb-3 text-foreground">
        Không tìm thấy trang
      </h1>
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không
        khả dụng.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <Button className="rounded-full gap-2 bg-accent hover:bg-accent/90 text-white">
            <Home className="w-4 h-4" />
            Trang chủ
          </Button>
        </Link>
        <Link href="/tin-tuc">
          <Button variant="outline" className="rounded-full gap-2">
            <Search className="w-4 h-4" />
            Tin tức
          </Button>
        </Link>
        <Link href="/lien-he">
          <Button variant="ghost" className="rounded-full gap-2">
            <ArrowLeft className="w-4 h-4" />
            Liên hệ hỗ trợ
          </Button>
        </Link>
      </div>
    </div>
  );
}
