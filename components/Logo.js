import Image from "next/image";
import Link from "next/link";

const Logo = ({ size, textSize }) => {
  return (
    <Link className="flex gap-2 items-center" href="/home">
      <Image
        src="/push-meets.svg"
        alt="Push Meets Logo"
        width={size}
        height={size}
      />

      <p className={textSize}>
        <strong>Push Meets</strong>
      </p>
    </Link>
  );
};

export default Logo;
