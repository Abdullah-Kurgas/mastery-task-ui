import { FolderUp, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { MediaType } from "../enums/media-type";
import { documentService } from "../services/document-service";
import ScanningOverlay from "./Scanning-overlay";
import { useNavigate } from "react-router-dom";

const acceptTypes = [
  MediaType.CSV,
  MediaType.IMAGEJPEG,
  MediaType.IMAGEPNG,
  MediaType.PDF,
  MediaType.TXT,
];

const UploadWrapper = (): React.ReactElement => {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];

    if (!acceptTypes.includes(file.type as MediaType)) return;
    if (!file) return;

    setIsDragging(false);
    handleFileUpload(file);
  };

  const handleFileUpload = async (file: File) => {
    setIsScanning(true);

    try {
      const { data } = await documentService.uploadDocument(file);

      setTimeout(() => {
        setIsScanning(false);
        navigate(`/documents/${data._id}/details`);
      }, 3000);
    } catch (error) {
      setIsScanning(false);
      console.error("Upload failed", error);
    }
  };

  return (
    <>
      {isScanning && <ScanningOverlay fileName={"test-file.txt"} />}

      <div className="max-w-5xl mx-auto mb-10">
        <div
          onDragOver={handleDragOver}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            relative group border-2 border-dashed rounded-3xl p-20 
            transition-all duration-300 ease-in-out
            ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-transparent"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="application/pdf,text/csv,text/plain,image/png,image/jpeg"
            onChange={(e) => handleFileUpload(e.target.files?.[0]!)}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <FolderUp size={150} />

            <div className="flex flex-col justify-between items-center mt-7 mb-6 text-sm">
              <p className="text-xl font-medium mb-3">
                Drag & Drop files to upload
              </p>
              <p className="text-slate-400">
                Supported Formats: PDF, TXT, XLSX, PNG
              </p>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:cursor-pointer hover:bg-blue-700 transition-all"
            >
              <Upload size={20} />
              Upload Files
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadWrapper;
