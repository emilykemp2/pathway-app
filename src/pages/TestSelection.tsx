import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TestCard from "@/components/TestCard";
import { testsData } from "@/data/testsData";

const TestSelection = () => {
  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white text-sportBlue p-6">
        <div className="flex items-center mb-2">
          <Link to="/dashboard" className="text-sportBlue mr-2">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">Select a Test</h1>
        </div>
        <p className="text-sportBlue/80 ml-8">Choose a movement assessment to perform</p>
      </div>

      {/* Test List */}
      <div className="flex flex-row items-center justify-center p-6 space-x-6">
        {testsData.map(test => (
          <TestCard
            key={test.id}
            id={test.id}
            title={test.title}
            description={test.description}
            imageUrl={test.imageUrl}
            duration={test.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default TestSelection;
