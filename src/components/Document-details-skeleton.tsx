import React from "react";

const DocumentDetailsSkeleton = (): React.ReactElement => (
  <div className="flex flex-col xl:flex-row gap-6 h-full animate-pulse">
    <div className="w-full xl:w-1/2 rounded-xl border-gray-100 p-6">
      <div className="h-6 bg-gray-300 rounded w-1/4 mb-8"></div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
        </div>

        <div className="w-full h-10 bg-gray-200 rounded"></div>

        <div className="flex gap-4">
          <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
        </div>

        <div className="h-10 bg-gray-200 rounded w-full mb-3"></div>
      </div>

      <hr className="border-gray-200 my-10" />

      <div className="space-y-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-8"></div>

        <div className="flex gap-4">
          <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <div className="w-full xl:w-1/2 flex flex-col">
      <div className="flex justify-between mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="rounded-lg border border-gray-300 p-8 grow">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-10"></div>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

export default DocumentDetailsSkeleton;
