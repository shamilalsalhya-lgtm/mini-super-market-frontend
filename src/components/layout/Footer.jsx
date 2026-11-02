import React, { useEffect, useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  ArrowUp 
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import ApiClient from '../../api/client';

const WHATSAPP_MESSAGE = 'Hello Al Salhiya, I would like to know more about your products.';
const WHATSAPP_URL = `https://wa.me/96597953527?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.44ZM12.07 21.3h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);

export const Footer = ({ onNavigate }) => {
  const { appearance } = usePlatform();
  const brandName = appearance?.platformName || 'Alfaysal Bakery';
  const brandLogo = appearance?.logoUrl || '/al-salhiya-logo.jpg';
  const brandTagline =
    appearance?.tagline ||
    'Premium products manufactured for supermarket partners since 1991.';

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    ApiClient.get('/categories')
      .then((res) => {
        if (!mounted) return;
        const list = Array.isArray(res?.data)
          ? res.data
          : (res?.data?.data || res || []);
        setCategories(Array.isArray(list) ? list.filter((c) => c?.name) : []);
      })
      .catch(() => {
        if (mounted) setCategories([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Product Catalog', route: 'shop' },
    { label: 'Our Story', route: 'about' },
    { label: 'Media', route: 'news' },
    { label: 'Contact', route: 'contact' },
  ];

  // Show a clean subset in the footer (avoid huge lists)
  const footerCategories = categories.slice(0, 8);

  return (
    <footer className="storefront-footer bg-[#181C2E] border-t border-stone-800 text-stone-300 relative z-20 font-sans pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 sm:pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start text-left">
          
          {/* Column 1: Brand Logo & Tagline */}
          <div className="space-y-4">
            <div 
              onClick={() => {
                onNavigate?.('home');
                scrollToTop();
              }}
              className="w-36 h-20 bg-white rounded-2xl border border-stone-700/60 shadow-2xs flex items-center justify-center p-2.5 overflow-hidden cursor-pointer hover:border-stone-500 transition-all"
              title={brandName}
            >
              <img 
                src={brandLogo} 
                alt={brandName} 
                className="h-full w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-[13px] text-stone-400 leading-relaxed max-w-[220px]">
              {brandTagline}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-white tracking-tight">
              Quick links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-400 font-normal">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      onNavigate?.(link.route);
                      scrollToTop();
                    }}
                    className="hover:text-[#FF7622] transition-colors cursor-pointer text-left block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Live Categories from API */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-white tracking-tight">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-400 font-normal">
              {footerCategories.length > 0 ? (
                footerCategories.map((cat) => (
                  <li key={cat._id || cat.name}>
                    <button
                      onClick={() => {
                        onNavigate?.('shop');
                        scrollToTop();
                      }}
                      className="hover:text-[#FF7622] transition-colors cursor-pointer text-left block"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))
              ) : (
                <li>
                  <button
                    onClick={() => {
                      onNavigate?.('shop');
                      scrollToTop();
                    }}
                    className="hover:text-[#FF7622] transition-colors cursor-pointer text-left block"
                  >
                    View all products
                  </button>
                </li>
              )}
              {categories.length > 8 && (
                <li>
                  <button
                    onClick={() => {
                      onNavigate?.('shop');
                      scrollToTop();
                    }}
                    className="text-[#FF7622] hover:text-orange-300 transition-colors cursor-pointer text-left block font-semibold"
                  >
                    View all →
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Get in touch */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-white tracking-tight">
              Get in touch
            </h4>
            <div className="space-y-2 text-xs sm:text-[13px] text-stone-400">
              <p>
                <a 
                  href="tel:+96597953527" 
                  className="hover:text-[#FF7622] transition-colors"
                >
                  +965 9795 3527
                </a>
              </p>
              <p>
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#FF7622] transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </p>
              <p>
                <a 
                  href="mailto:Mubarkiya075@gmail.com" 
                  className="hover:text-[#FF7622] transition-colors"
                >
                  Mubarkiya075@gmail.com
                </a>
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center space-x-3.5 pt-2 text-stone-300">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF7622] transition-colors"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF7622] transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4 fill-current stroke-none" />
                </a>
                <a 
                  href="https://www.instagram.com/al_salhiyaproducts" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF7622] transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF7622] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 fill-current stroke-none" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Scroll-to-Top Action Button */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex items-center justify-between">
          <p className="text-[11px] text-stone-500">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#272052] hover:bg-[#342b6d] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
