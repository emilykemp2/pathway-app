
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, PlayCircle, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTestById } from "@/data/testsData";
import { useEffect, useState } from "react";

const TestInstructions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(testId ? getTestById(testId) : undefined);

  useEffect(() => {
    if (testId) {
      const testData = getTestById(testId);
      setTest(testData);

      if (!testData) {
        navigate("/tests");
      }
    }
  }, [testId, navigate]);

  if (!test) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="bg-sportBlue text-white p-6">
        <div className="flex items-center mb-2">
          <Link to="/tests" className="text-white mr-2">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">{test.title}</h1>
        </div>
        <p className="text-white/80">Follow the instructions to perform the test correctly</p>
      </div>

      {/* Video Demo */}
      <div className="p-6">
        <Card className="overflow-hidden mb-6">
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <PlayCircle size={48} className="text-gray-400" />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center text-sportBlue mb-2">
              <Info size={16} className="mr-1" />
              <p className="text-sm font-medium">Watch the demonstration first</p>
            </div>
            <p className="text-sm text-gray-600">
              This video shows the proper technique for the {test.title.toLowerCase()}.
            </p>
          </CardContent>
        </Card>

        {/* Instructions */}
        <h2 className="text-lg font-semibold mb-3">Instructions</h2>
        <ul className="space-y-3 mb-6">
          {test.instructions.map((instruction, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle size={20} className="text-sportGreen mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{instruction}</span>
            </li>
          ))}
        </ul>

        <Button 
          onClick={() => navigate(`/tests/${testId}/capture`)} 
          className="w-full bg-sportBlue hover:bg-sportBlue/90 text-white"
        >
          Begin Test
        </Button>
      </div>
    </div>
  );
};

export default TestInstructions;
