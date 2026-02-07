import { Package, DollarSign, RefreshCw } from 'lucide-react';

export const ProductInfo = ({ productData, onRefresh }) => {
  if (!productData) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Product Details</h3>
        <button
          onClick={onRefresh}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          title="Refresh product data"
        >
          <RefreshCw className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="flex items-start space-x-2">
        <Package className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 mb-1">Product Name</p>
          <p className="text-sm text-gray-800 font-medium break-words">
            {productData.productName}
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <DollarSign className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">Price</p>
          <p className="text-sm text-gray-800 font-semibold">{productData.price}</p>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Source: <span className="font-medium text-gray-700 capitalize">{productData.source}</span>
        </p>
      </div>
    </div>
  );
};
