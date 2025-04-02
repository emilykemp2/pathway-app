
import { cn } from "@/lib/utils";

type RiskLevel = "low" | "moderate" | "high";

interface RiskScoreProps {
  score: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const RiskScore = ({ score, showLabel = true, size = "md" }: RiskScoreProps) => {
  const getRiskLevel = (score: number): RiskLevel => {
    if (score < 30) return "low";
    if (score < 70) return "moderate";
    return "high";
  };

  const riskLevel = getRiskLevel(score);

  const riskColorClass = {
    low: "bg-riskGreen",
    moderate: "bg-riskYellow",
    high: "bg-riskRed animate-pulse-risk",
  }[riskLevel];

  const riskLabel = {
    low: "Low Risk",
    moderate: "Moderate Risk",
    high: "High Risk",
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
        {score}%
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
