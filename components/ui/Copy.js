import { useState } from "react";
import { Copy as CopyIcon, Check } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";

const Copy = ({ text, color = "black" }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    copyToClipboard(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {isCopied ? (
        <Check size={16} color="green" />
      ) : (
        <CopyIcon size={16} color={color} />
      )}
    </div>
  );
};

export default Copy;
