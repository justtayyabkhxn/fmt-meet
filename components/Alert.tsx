import Link from 'next/link';
import Image from 'next/image';

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="flex h-screen w-full items-center justify-center px-4" style={{ background: '#080808' }}>
      <div
        style={{
          background: 'linear-gradient(175deg, #141414 0%, #0d0d0d 100%)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 1px 0 rgba(255,255,255,0.07), 0 48px 80px rgba(0,0,0,0.7)',
        }}
        className="w-full max-w-[420px] rounded-[24px] p-8 text-center text-white"
      >
        {iconUrl && (
          <div className="mb-5 flex justify-center">
            <Image src={iconUrl} width={56} height={56} alt="icon" />
          </div>
        )}
        <p className="text-base font-semibold text-neutral-200">{title}</p>
        <Link
          href="/"
          style={{
            background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 6px 20px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.4)',
          }}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-black transition-all hover:brightness-105 active:scale-[0.985]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Alert;
