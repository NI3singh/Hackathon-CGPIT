import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUploadCloud } from 'react-icons/fi';

const ImageUpload = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-4xl mb-4 text-primary" />
        <p className="text-lg font-medium">
          {isDragActive ? 'Drop your image here' : 'Drag & drop an image or click to select'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Upload a product image to find similar items
        </p>
      </div>
    </motion.div>
  );
};

export default ImageUpload;