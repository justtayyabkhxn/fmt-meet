"use client";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date?: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="flex min-h-[200px] w-full flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.04] px-6 py-6 backdrop-blur-2xl xl:max-w-[568px]">
      <article className="flex flex-col gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} alt="meeting type" width={20} height={20} className="opacity-70" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-white truncate">{title}</h1>
          {date ? (
            <p className="mt-1 text-sm text-neutral-500">{date}</p>
          ) : (
            <p className="mt-1 text-sm text-neutral-600">No date set</p>
          )}
        </div>
      </article>

      {!isPreviousMeeting && (
        <article className="flex gap-2 mt-4">
          <Button
            onClick={handleClick}
            className="rounded-xl bg-white px-5 h-9 text-sm font-medium text-black hover:bg-neutral-100 gap-2"
          >
            {buttonIcon1 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={buttonIcon1} alt="action" width={16} height={16} />
            )}
            {buttonText}
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast({ title: "Link Copied" });
            }}
            className="rounded-xl border border-white/10 bg-white/[0.06] px-5 h-9 text-sm font-medium text-white hover:bg-white/[0.10] gap-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/copy.svg" alt="copy" width={16} height={16} />
            Copy Link
          </Button>
        </article>
      )}
    </section>
  );
};

export default MeetingCard;
