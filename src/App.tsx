import { useEffect, useState } from 'react';
import { RefreshCw, Download, RotateCw } from 'lucide-react';
import AvatarCanvas from './components/AvatarCanvas';
import { getRandomAvatarOption } from './utils/avatar-option';
import Footer from './components/Footer';

function App() {
  const [features, setFeatures] = useState<any>(null);

  useEffect(() => {
    const randomOption = getRandomAvatarOption()
    setFeatures(randomOption)
  }, [])

  const regenerateAvatar = () => {
    const randomOption = getRandomAvatarOption()
    setFeatures(randomOption)
  };

  const downloadAvatar = () => {
    const svg = document.querySelector('#avatar-svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-avatar.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Animated Art Avatar
          </h1>
          <p className="text-gray-600">
          Minimalist Animated Line Art Avatar Generator
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="aspect-square w-full mb-6 bg-gray-50 rounded-xl p-4 flex items-center justify-center">
            <AvatarCanvas features={features} />
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={regenerateAvatar}
              className="group flex items-center gap-3 px-5 py-2.5 bg-white text-gray-700 rounded-full 
                         border border-gray-200 shadow-sm hover:shadow-md 
                         transition-all duration-200 ease-in-out
                         dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
            >
              <RefreshCw 
                size={18} 
                className="group-hover:rotate-180 transition-transform duration-500" 
              />
              <span className="font-medium">Generate</span>
            </button>
            
            <button
              onClick={downloadAvatar}
              className="group flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-full 
                         shadow-sm hover:shadow-md hover:bg-gray-900
                         transition-all duration-200 ease-in-out
                         dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100"
            >
              <Download 
                size={18} 
                className="group-hover:translate-y-0.5 transition-transform duration-200" 
              />
              <span className="font-medium">Download</span>
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Click generate for a new avatar, Download for the svg file.
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
