import { useEffect, useState } from "react";

type AlertBannerProps = {
  type: "success" | "fail";
  message: string;
  show: boolean;
};

export default function AlertBanner({ type, message, show }: AlertBannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible]);

  const className = `p-4 rounded absolute top-4 left-4 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  } text-white`;

  return visible ? (
    <div className={className}>
      <p>{message}</p>
    </div>
  ) : null;
}
