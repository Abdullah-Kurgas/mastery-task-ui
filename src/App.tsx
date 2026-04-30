import React from "react";

export default function App(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold underline">Welcome to React</h1>
        <p className="text-xl text-blue-100 mb-8">
          Built with Vite, React, TypeScript and Tailwind CSS
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
