import { getSettings, getServices } from "@/lib/data";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export async function Footer() {
  const settings = await getSettings();
  const services = await getServices();
  return (
    <footer className="bg-[#0A1628] text-slate-300 mt-auto relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container mx-auto px-4 xl:px-8 py-14 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1: Branding */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/cic-logo.png" alt="CIC Logo" width={32} height={32} />
              <span className="font-bold font-heading text-white text-lg">CIC Software</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Hơn 30 năm phát triển phần mềm chuyên ngành xây dựng, giao thông và công nghiệp tại Việt Nam.
            </p>
          </div>

          {/* Column 2: Sản phẩm */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Sản phẩm</h3>
            <ul className="space-y-2.5 text-sm">
              {["Xây dựng", "Giao thông", "Thuỷ lợi", "Môi trường", "Điện lực", "Cơ khí"].map((item) => (
                <li key={item}>
                  <Link href="/san-pham" className="text-slate-400 hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dịch vụ */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Dịch vụ</h3>
            <ul className="space-y-2.5 text-sm">
              {services.slice(0, 8).map((service) => (
                <li key={service.id}>
                  <Link href={`/dich-vu/${service.slug}`} className="text-slate-400 hover:text-accent transition-colors">
                    {service.name_vi}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Liên hệ */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Liên hệ</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <span className="text-slate-400">{settings?.company_address_hn}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-slate-400">{settings?.company_phone_hn}</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-slate-400">{settings?.company_email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Công ty CP Công nghệ và Tư vấn CIC. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-300 transition-colors">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
