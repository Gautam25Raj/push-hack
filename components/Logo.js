import Image from "next/image";

const Logo = ({ size, textSize }) => {
  return (
    <div className="flex gap-2 items-center">
      <Image
        src="/push-meets.svg"
        alt="Push Meets Logo"
        width={size}
        height={size}
      />

      <p className={textSize}>
        <strong>Push Meets</strong>
      </p>
    </div>
  );
};

export default Logo;
