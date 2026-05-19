'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky left-0 top-0 flex h-screen w-fit flex-col border-r border-white/8 bg-black/60 backdrop-blur-xl p-4 pt-6 max-sm:hidden lg:w-[220px]">
      <div className="flex flex-1 flex-col gap-1">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route ||
            pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex gap-3 items-center px-3 py-2.5 rounded-xl transition-all text-sm font-medium',
                isActive
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-neutral-500 hover:text-white hover:bg-white/[0.05]'
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={18}
                height={18}
                className="opacity-70"
              />
              <p className="max-lg:hidden">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
