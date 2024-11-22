"use client";

export function ImageUpload() {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Upload Images
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex h-40 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="mt-2 block text-sm text-gray-600">Add Image</span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}