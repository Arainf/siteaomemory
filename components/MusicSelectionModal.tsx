import { useState, useRef } from 'react';
import { X, Upload, Music2 } from 'lucide-react';

interface MusicSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'none' | 'default' | 'custom', file?: File) => void;
}

const MusicSelectionModal = ({ isOpen, onClose, onSelect }: MusicSelectionModalProps) => {
  const [selectedOption, setSelectedOption] = useState<'none' | 'default' | 'custom'>('none');
  const [customFile, setCustomFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCustomFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === 'custom' && customFile) {
      onSelect('custom', customFile);
    } else {
      onSelect(selectedOption);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Background Music</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <button
              onClick={() => setSelectedOption('none')}
              className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition-colors ${
                selectedOption === 'none'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              <X className="w-5 h-5" />
              <span>No Music</span>
            </button>

            <button
              onClick={() => setSelectedOption('default')}
              className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition-colors ${
                selectedOption === 'default'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              <Music2 className="w-5 h-5" />
              <span>Default Music</span>
            </button>

  
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />

          {selectedOption === 'custom' && customFile && (
            <div className="bg-white/10 p-3 rounded-lg text-white">
              Selected: {customFile.name}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg transition-colors"
          >
            Start Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicSelectionModal; 