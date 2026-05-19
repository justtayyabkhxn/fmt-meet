import Image from 'next/image';
import Link from 'next/link';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-full items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
            <Image src="/icons/logo.svg" width={18} height={18} alt="yoom logo" />
          </div>
          <span className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors max-sm:hidden">
            YOOM
          </span>
        </Link>
        <MobileNav />
      </div>
    </header>
  );
};

export default Navbar;
