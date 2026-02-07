import React, { useState } from "react";
import { X, ChevronDown, ShoppingBag } from "lucide-react";
import { useProductData } from "../hooks/useProductData";
import { ProductInfo } from "./ProductInfo";
import { EmailForm } from "./EmailForm";

export const Widget = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { productData, loading, error, refreshProductData } = useProductData();

  if (!isVisible) {
    return null;
  }

  if (isMinimized) {
    return (
      <div className="bg-white rounded-full shadow-lg border border-gray-200 p-3 cursor-pointer hover:shadow-xl transition-shadow">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center space-x-2"
          title="Open Tactful Widget"
        >
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            Product Collector
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-96 max-w-[calc(100vw-40px)]">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-5 h-5" />
          <h2 className="font-semibold text-base">Product Collector</h2>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 hover:bg-blue-800 rounded-full transition-colors"
            title="Minimize"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 hover:bg-blue-800 rounded-full transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-sm text-gray-600">
              Extracting product data...
            </span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : (
          <>
            <ProductInfo
              productData={productData}
              onRefresh={refreshProductData}
            />
            <EmailForm productData={productData} />
          </>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-50 rounded-b-xl border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Powered by Tactful Widget
        </p>
      </div>
    </div>
  );
};
