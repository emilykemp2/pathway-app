
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TestCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
}

const TestCard = ({ id, title, description, imageUrl, duration }: TestCardProps) => {
  return (
    <Link to={`/tests/${id}/instructions`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow max-w-96 min-h-80">
        <div className="h-40 overflow-hidden bg-gray-100 relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-sportBlue text-white px-2 py-1 text-xs">
            {duration}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{title}</h3>
            <ArrowRight size={18} className="text-sportBlue" />
          </div>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TestCard;
