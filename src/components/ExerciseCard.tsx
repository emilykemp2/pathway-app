
import { Card, CardContent } from "@/components/ui/card";

interface ExerciseCardProps {
  title: string;
  description: string;
  imageUrl: string;
  sets?: string;
  reps?: string;
}

const ExerciseCard = ({ title, description, imageUrl, sets, reps }: ExerciseCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        {(sets || reps) && (
          <p className="text-sm text-sportBlue-light font-medium mt-1">
            {sets && `${sets} sets`} {reps && `× ${reps} reps`}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
