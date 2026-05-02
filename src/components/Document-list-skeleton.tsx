import React from "react";

const DocumentListSkeleton = (): React.ReactElement => {
  return (
    <li className="p-4 flex items-center justify-between border-b border-gray-100 last:border-0 animate-pulse">
      {/* Left side: Icon and Document Info */}
      <div className="flex items-center space-x-4 min-w-0 flex-1">
        {/* Icon Skeleton */}
        <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-200" />

        <div className="flex flex-col min-w-0 w-full max-w-sm">
          {/* Top row: Name and Status Badge */}
          <div className="flex items-center space-x-2">
            {/* Document Name */}
            <div className="h-4 bg-gray-200 rounded w-3/5" />
            {/* Status Badge */}
            <div className="h-4 bg-gray-200 rounded-full w-16" />
          </div>

          {/* Bottom row: Supplier, Type, Issue Date */}
          <div className="flex flex-wrap items-center gap-x-2 mt-2">
            <div className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="h-1 w-1 bg-gray-300 rounded-full" /> {/* Bullet */}
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-1 w-1 bg-gray-300 rounded-full" /> {/* Bullet */}
            <div className="h-3 bg-gray-200 rounded w-1/5" />
          </div>
        </div>
      </div>

      {/* Right side: Amount and Due Date */}
      <div className="flex items-center space-x-4 shrink-0 pl-4">
        <div className="flex flex-col items-end mr-2">
          {/* Total Amount */}
          <div className="h-4 bg-gray-200 rounded w-20" />
          {/* Due Date */}
          <div className="h-3 bg-gray-200 rounded w-24 mt-1.5" />
        </div>
      </div>
    </li>
  );
};

export default DocumentListSkeleton;
