"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, Package, SlidersHorizontal, ArrowDownAZ, ArrowUpZA, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CmsProduct, type CmsCategory } from "@/lib/types";
import { normalizeImageUrl } from "@/lib/utils";

// Helper formatter
const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

interface ProductCatalogProps {
  initialProducts: CmsProduct[];
  categories: CmsCategory[];
  categorySlug?: string;
}

export function ProductCatalog({ initialProducts, categories, categorySlug }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(categorySlug ? [categorySlug] : []));
  const [selectedLines, setSelectedLines] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'a-z' | 'z-a' | 'price-asc' | 'price-desc' | 'newest'>('a-z');

  // Sync selectedCategories if categorySlug props changes (e.g., from Navbar dropdown)
  useEffect(() => {
    if (categorySlug) {
      setSelectedCategories(new Set([categorySlug]));
    }
  }, [categorySlug]);

  // Extract unique product lines, ignoring null/empty
  const productLines = useMemo(() => {
    const lines = new Set<string>();
    initialProducts.forEach(p => {
      if (p.product_line && p.product_line.trim() !== '') {
        lines.add(p.product_line);
      }
    });
    return Array.from(lines).sort();
  }, [initialProducts]);

  // Derived filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = initialProducts;

    // Search text
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    // Filter categories (using slugs for comparison to support URL-like states if needed)
    if (selectedCategories.size > 0) {
      result = result.filter(p => {
        const cat = (p as any).product_categories || p.cms_categories;
        return cat && selectedCategories.has(cat.slug);
      });
    }

    // Filter product lines
    if (selectedLines.size > 0) {
      result = result.filter(p => p.product_line && selectedLines.has(p.product_line));
    }

    // Sorting
    result = [...result];
    result.sort((a, b) => {
      if (sortBy === 'a-z') return a.name.localeCompare(b.name);
      if (sortBy === 'z-a') return b.name.localeCompare(a.name);
      if (sortBy === 'price-asc') return (a.base_price || 0) - (b.base_price || 0);
      if (sortBy === 'price-desc') return (b.base_price || 0) - (a.base_price || 0);
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return 0;
    });

    return result;
  }, [initialProducts, searchQuery, selectedCategories, selectedLines, sortBy]);

  const toggleCategory = (slug: string) => {
    const next = new Set(selectedCategories);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setSelectedCategories(next);
  };

  const toggleLine = (line: string) => {
    const next = new Set(selectedLines);
    if (next.has(line)) next.delete(line);
    else next.add(line);
    setSelectedLines(next);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories(new Set());
    setSelectedLines(new Set());
    setSortBy('a-z');
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
      
      {/* Mobile Toolbar */}
      <div className="flex md:hidden items-center justify-between mb-6 pb-6 border-b border-border/50">
        <h2 className="text-lg font-bold font-heading">
          {filteredProducts.length} sản phẩm
        </h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>Thiết lập lại</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Search */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-lg flex items-center gap-2">
              <Search className="w-5 h-5 text-accent" />
              Tìm kiếm sản phẩm
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập từ khoá..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div className="h-px bg-border/50 w-full" />

          {/* Categories Filter */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-[15px] uppercase tracking-wider text-muted-foreground">
              Lọc theo lĩnh vực
            </h3>
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox"
                      checked={selectedCategories.has(cat.slug)}
                      onChange={() => toggleCategory(cat.slug)}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-muted-foreground/30 rounded md:rounded-[4px] peer-checked:bg-accent peer-checked:border-accent transition-colors" />
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-accent transition-colors">
                    {cat.name_vi}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-border/50 w-full" />

          {/* Product Lines Filter */}
          {productLines.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-[15px] uppercase tracking-wider text-muted-foreground">
                Lọc theo hãng sản xuất
              </h3>
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {productLines.map((line, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox"
                        checked={selectedLines.has(line)}
                        onChange={() => toggleLine(line)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-muted-foreground/30 rounded md:rounded-[4px] peer-checked:bg-accent peer-checked:border-accent transition-colors" />
                      <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-accent transition-colors">
                      {line}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3">
          
          {/* Top Bar */}
          <div className="hidden md:flex items-center justify-between mb-8 bg-card border border-border/50 p-4 rounded-2xl">
            <div className="text-[15px] font-medium text-foreground/80">
              Tìm thấy <strong className="text-foreground">{filteredProducts.length}</strong> sản phẩm
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <select 
                  className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="a-z">Tên từ A-Z</option>
                  <option value="z-a">Tên từ Z-A</option>
                  <option value="newest">Ngày cập nhật mới nhất</option>
                  <option value="price-asc">Giá: Thấp tới cao</option>
                  <option value="price-desc">Giá: Cao tới thấp</option>
                </select>
              </div>
              
              <div className="w-px h-5 bg-border mx-1" />
              
              <button 
                onClick={resetFilters}
                className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
              >
                Thiết lập lại
              </button>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Link
                  key={product.id}
                  href={`/san-pham/${product.slug}`}
                  className="group flex flex-col bg-card border border-border/60 hover:border-accent/40 rounded-2xl overflow-hidden hover-lift transition-all duration-300"
                >
                  {/* Thumbnail Area */}
                  <div className="relative aspect-[4/3] bg-white p-6 border-b border-border/40 flex items-center justify-center">
                    {product.thumbnail_url && normalizeImageUrl(product.thumbnail_url) ? (
                        <Image 
                          src={normalizeImageUrl(product.thumbnail_url)!} 
                          alt={product.name} 
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <Package className="w-16 h-16 text-muted-foreground/20 group-hover:text-accent/20 transition-colors duration-500" />
                      )}
                      
                    {/* Badge */}
                    {product.is_featured_web && (
                      <div className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm z-10">
                        Nổi bật
                      </div>
                    )}
                  </div>
                  
                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-heading font-bold text-[15px] leading-snug group-hover:text-accent transition-colors line-clamp-2 min-h-[44px]">
                      {product.name}
                    </h3>
                    
                    <div className="mt-3 text-[15px] font-semibold text-accent flex-1">
                      {product.base_price ? (
                        <span className="text-foreground">Giá: <span className="text-accent">{formatVND(product.base_price)}</span></span>
                      ) : (
                        <span className="text-destructive font-bold">Giá: Liên hệ</span>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="font-medium">Chi tiết sản phẩm</span>
                      <ArrowRight className="w-4 h-4 text-accent/50 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-dashed border-border text-center">
              <Package className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <h3 className="font-bold font-heading text-lg mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-muted-foreground text-sm max-w-sm mb-6">Xin lỗi, không có sản phẩm nào khớp với bộ lọc của bạn. Thử thay đổi các điều kiện lọc nhé!</p>
              <Button onClick={resetFilters} variant="outline">
                Xoá tất cả bộ lọc
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
