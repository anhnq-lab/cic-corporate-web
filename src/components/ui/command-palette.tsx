"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileText, Box, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, getPartners, getFeaturedNews, getServices, getProductDomains } from "@/lib/data";

interface SearchResult {
  id: string;
  title: string;
  type: "product" | "news" | "service" | "project" | "page";
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

const STATIC_PAGES: SearchResult[] = [
  { id: "home", title: "Trang chủ", type: "page", href: "/", description: "Trang chủ CIC" },
  { id: "about", title: "Giới thiệu", type: "page", href: "/gioi-thieu", description: "Về CIC - 30+ năm kinh nghiệm" },
  { id: "products", title: "Sản phẩm", type: "page", href: "/san-pham", description: "45+ phần mềm chuyên ngành" },
  { id: "services", title: "Dịch vụ", type: "page", href: "/dich-vu", description: "Dịch vụ tư vấn và triển khai" },
  { id: "news", title: "Tin tức", type: "page", href: "/tin-tuc", description: "Tin tức và sự kiện" },
  { id: "recruitment", title: "Tuyển dụng", type: "page", href: "/tuyen-dung", description: "Cơ hội nghề nghiệp tại CIC" },
  { id: "contact", title: "Liên hệ", type: "page", href: "/lien-he", description: "Thông tin liên hệ" },
];

const typeIcons = {
  product: <Box className="w-4 h-4" />,
  news: <FileText className="w-4 h-4" />,
  service: <ChevronRight className="w-4 h-4" />,
  project: <ArrowRight className="w-4 h-4" />,
  page: <ChevronRight className="w-4 h-4" />,
};

const typeColors = {
  product: "text-blue-500",
  news: "text-green-500",
  service: "text-purple-500",
  project: "text-orange-500",
  page: "text-slate-500",
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // Load all data on mount
  const [allData, setAllData] = React.useState<{
    products: SearchResult[];
    news: SearchResult[];
    services: SearchResult[];
    projects: SearchResult[];
  }>({ products: [], news: [], services: [], projects: [] });

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [products, news, services, projects] = await Promise.all([
          fetch("/api/search?type=products").then(r => r.json()),
          fetch("/api/search?type=news").then(r => r.json()),
          fetch("/api/search?type=services").then(r => r.json()),
          fetch("/api/search?type=projects").then(r => r.json()),
        ]);
        setAllData({ products, news, services, projects });
      } catch (e) {
        console.error("Failed to load search data:", e);
      }
    };
    loadData();
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (open) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  React.useEffect(() => {
    if (!search.trim()) {
      setResults(STATIC_PAGES.slice(0, 6));
      setSelectedIndex(0);
      return;
    }

    setLoading(true);
    const query = search.toLowerCase();
    const allResults: SearchResult[] = [];

    // Search static pages
    STATIC_PAGES.forEach(p => {
      if (p.title.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query)) {
        allResults.push(p);
      }
    });

    // Search products, news, services, projects
    ["products", "news", "services", "projects"].forEach(type => {
      const items = allData[type as keyof typeof allData] || [];
      items.forEach(item => {
        if (item.title.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query)) {
          allResults.push(item);
        }
      });
    });

    setResults(allResults.slice(0, 12));
    setSelectedIndex(0);
    setLoading(false);
  }, [search, allData]);

  React.useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      selectedEl?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex].href);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="outline"
        className="hidden md:flex items-center gap-2 h-9 px-3 text-sm text-muted-foreground hover:text-foreground border-border/60 hover:bg-muted/50 rounded-full"
        onClick={() => setOpen(true)}
      >
        <Search className="w-4 h-4" />
        <span>Tìm kiếm...</span>
        <kbd className="ml-auto flex items-center gap-0.5">
          <span className="text-[10px] px-1.5 py-0.5 bg-muted/80 rounded border border-border/40">⌘</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-muted/80 rounded border border-border/40">K</span>
        </kbd>
      </Button>

      {/* Mobile search icon */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Search className="w-4 h-4" />
      </Button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[95vw] max-w-xl z-[101]"
            >
              <div className="bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 border-b border-border/40">
                  <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tìm sản phẩm, tin tức, dịch vụ..."
                    className="flex-1 h-12 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 hover:bg-muted/50 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  className="max-h-[60vh] overflow-y-auto p-2"
                >
                  {loading && (
                    <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Đang tìm...
                    </div>
                  )}

                  {!loading && results.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      Không tìm thấy kết quả nào cho "{search}"
                    </div>
                  )}

                  {!loading && results.map((result, index) => (
                    <button
                      key={result.id + result.href}
                      onClick={() => handleSelect(result.href)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        index === selectedIndex
                          ? "bg-accent/10 text-accent-foreground"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <span className={typeColors[result.type]}>
                        {result.icon || typeIcons[result.type]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{result.title}</div>
                        {result.description && (
                          <div className="text-xs text-muted-foreground truncate">{result.description}</div>
                        )}
                      </div>
                      <span className="text-[10px] uppercase px-2 py-0.5 bg-muted/50 rounded-full text-muted-foreground">
                        {result.type}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 border-t border-border/40 flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span><kbd className="px-1 py-0.5 bg-muted/50 rounded">↑↓</kbd> Điều hướng</span>
                  <span><kbd className="px-1 py-0.5 bg-muted/50 rounded">↵</kbd> Chọn</span>
                  <span><kbd className="px-1 py-0.5 bg-muted/50 rounded">Esc</kbd> Đóng</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
