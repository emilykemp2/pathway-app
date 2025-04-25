import { cn } from "@/lib/utils";

type RiskLevel = "low" | "moderate" | "high";

interface RiskScoreProps {
  degrees: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const RiskScore = ({ degrees, showLabel = true, size = "md" }: RiskScoreProps) => {
  const getRiskLevel = (degrees: number): RiskLevel => {
    if (degrees < 5) return "low";
    if (degrees < 10) return "moderate";
    return "high";
  };

  const riskLevel = getRiskLevel(degrees);

  const riskColorClass = {
    low: "bg-riskGreen",
    moderate: "bg-riskYellow",
    high: "bg-[#f66a6a]",
  }[riskLevel];

  const riskLabel = {
    low: "Good",
    moderate: "Mid",
    high: "High",
  }[riskLevel];

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-lg",
    lg: "w-24 h-24 text-2xl",
  }[size];

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white",
          riskColorClass,
          sizeClasses
        )}
      >
        {degrees}°
      </div>
      {showLabel && (
        <p className={cn(
          "mt-2 font-medium",
          {
            "text-riskGreen": riskLevel === "low",
            "text-riskYellow": riskLevel === "moderate",
            "text-riskRed": riskLevel === "high",
          }
        )}>
          {riskLabel}
        </p>
      )}
    </div>
  );
};

export default RiskScore;
