'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px] sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={28}
            height={28}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-r border-white/8 bg-black/90 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <Image src="/icons/logo.svg" width={18} height={18} alt="yoom logo" />
            </div>
            <p className="text-sm font-semibold text-white">YOOM</p>
          </Link>
          <div className="flex flex-col gap-1">
            {sidebarLinks.map((item) => {
              const isActive = pathname === item.route;
              return (
                <SheetClose asChild key={item.route}>
                  <Link
                    href={item.route}
                    className={cn(
                      'flex gap-3 items-center px-3 py-2.5 rounded-xl transition-all text-sm font-medium',
                      isActive
                        ? 'bg-white/10 text-white border border-white/10'
                        : 'text-neutral-500 hover:text-white hover:bg-white/[0.05]'
                    )}
                  >
                    <Image src={item.imgURL} alt={item.label} width={18} height={18} className="opacity-70" />
                    <p>{item.label}</p>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
