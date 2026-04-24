"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Trang chủ", href: "/" }];

  let accumulatedPath = "";
  for (let i = 0; i < segments.length; i++) {
    accumulatedPath += `/${segments[i]}`;
    const segment = segments[i];

    // Convert slug to readable text
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // Check if it's the last segment (current page)
    const isLast = i === segments.length - 1;

    breadcrumbs.push({
      label,
      href: isLast ? undefined : accumulatedPath,
    });
  }

  return breadcrumbs;
}

export function Breadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  // Don't show on homepage
  if (pathname === "/") return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="container max-w-screen-xl mx-auto px-4 lg:px-8 py-4"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                {index === 0 && <Home className="w-3.5 h-3.5" />}
                <span>{crumb.label}</span>
              </Link>
            ) : (
              <span className="text-foreground font-medium">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
}
