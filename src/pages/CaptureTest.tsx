
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Camera, PlayCircle, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { getTestById } from "@/data/testsData";

const CaptureTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(testId ? getTestById(testId) : undefined);
  const [captureMode, setCaptureMode] = useState<"ready" | "capturing" | "review">("ready");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (testId) {
      const testData = getTestById(testId);
      setTest(testData);

      if (!testData) {
        navigate("/tests");
      }
    }

    return () => {
      // Clean up video stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [testId, navigate]);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" }, 
        audio: false 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunksRef.current, { type: "video/mp4" });
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = url;
        }
        
        setCaptureMode("review");
      };
      
      chunksRef.current = [];
      mediaRecorder.start();
      setCaptureMode("capturing");
      
      // Auto-stop after 5 seconds (for demo purposes)
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
          
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
        }
      }, 5000);
      
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Handle error - show appropriate message to user
    }
  };

  const retakeVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl(null);
    }
    
    chunksRef.current = [];
    setCaptureMode("ready");
  };

  const acceptVideo = () => {
    // In a real app, you'd upload the video for analysis here
    // For demo, we'll just navigate to the results page
    navigate(`/tests/${testId}/results`);
  };

  if (!test) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-sportBlue text-white p-4 flex items-center">
        <Link to={`/tests/${testId}/instructions`} className="text-white mr-2">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">{test.title}</h1>
      </div>

      {/* Video Capture Area */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          {captureMode === "ready" ? (
            <div className="text-center text-white px-6">
              <Camera size={48} className="mx-auto mb-4 opacity-70" />
              <p className="mb-4">Position yourself correctly and tap the button below to start recording</p>
              <Button 
                onClick={startCapture} 
                className="bg-white text-sportBlue hover:bg-white/90"
              >
                Start Recording
              </Button>
            </div>
          ) : (
            <video 
              ref={videoRef} 
              autoPlay={captureMode === "capturing"}
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {captureMode === "capturing" && (
            <div className="absolute top-4 right-4 flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Recording
            </div>
          )}
        </div>

        {/* Review Controls */}
        {captureMode === "review" && (
          <div className="flex p-4 bg-white border-t">
            <Button 
              variant="outline" 
              className="flex-1 mr-4"
              onClick={retakeVideo}
            >
              <X size={20} className="mr-2" />
              Retake
            </Button>
            <Button 
              className="flex-1 bg-sportBlue text-white"
              onClick={acceptVideo}
            >
              <Check size={20} className="mr-2" />
              Use Video
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptureTest;
