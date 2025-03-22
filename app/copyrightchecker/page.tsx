'use client';
import { useState } from 'react';

export default function CopyrightChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = async (endpoint: string) => {
    if (!file) return alert('Please upload a file');

    const formData = new FormData();
    formData.append(endpoint === 'copyright-video' ? 'video' : 'audio', file);

    try {
      const response = await fetch(`http://localhost:7200/${endpoint}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to contact the API');
    }
  };

  const handleUrlCheck = async () => {
    if (!url) return alert('Please enter a YouTube URL');

    try {
      const response = await fetch('http://localhost:7200/copyright-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to contact the API');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Copyright Checker</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Check Video/Audio</h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
          />
          <div className="flex gap-4">
            <button
              onClick={() => handleFileUpload('copyright-video')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Check Video
            </button>
            <button
              onClick={() => handleFileUpload('copyright-audio')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Check Audio
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Check YouTube URL</h2>
          <input
            type="text"
            placeholder="Enter YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
          />
          <button
            onClick={handleUrlCheck}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Check URL
          </button>
        </div>

        {result && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-2">Result:</h3>
            <pre className="text-sm text-gray-800 overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}