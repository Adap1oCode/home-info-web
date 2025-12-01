import Link from "next/link";
import Image from "next/image";

export default function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const dimensions = size === "large" 
    ? { width: 200, height: 67 } 
    : { width: 144, height: 48 };
    
  return (
    <Link href="/" className="inline-flex" aria-label="Property Search Solutions">
      <Image
        src="/images/logo.png"
        alt="Home Information SEARCHES"
        width={dimensions.width}
        height={dimensions.height}
        className="h-auto w-auto"
        priority
      />
    </Link>
  );
}
