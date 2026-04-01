import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export default function SiteLogo({
  className,
  imageClassName,
  priority = false,
}: SiteLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src="/logo-ortoart-completo.png"
        alt="OrtoArt Materiais Cirurgicos"
        width={1050}
        height={276}
        priority={priority}
        className={cn("h-auto w-[156px] sm:w-[178px]", imageClassName)}
      />
    </Link>
  );
}
