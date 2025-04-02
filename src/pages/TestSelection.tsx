
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TestCard from "@/components/TestCard";
import { testsData } from "@/data/testsData";

const TestSelection = () => {
  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="bg-sportBlue text-white p-6">
        <div className="flex items-center mb-2">
          <Link to="/dashboard" className="text-white mr-2">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">Select a Test</h1>
        </div>
        <p className="text-white/80">Choose a movement assessment to perform</p>
      </div>

      {/* Test List */}
      <div className="p-6 space-y-6">
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
