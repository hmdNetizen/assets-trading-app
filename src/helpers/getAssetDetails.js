export const getAssetRate = (
  selectedAssets,
  defaultAsset,
  currentAsset,
  margin,
  leverage
) => {
  if (selectedAssets.length > 0) {
    if (Object.keys(currentAsset).length > 0) {
      return (margin / currentAsset.rate) * leverage;
    } else {
      return 0;
    }
  } else if (selectedAssets.length === 0) {
    if (Object.keys(defaultAsset).length > 0) {
      return (margin / defaultAsset.rate) * leverage;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

export const getAssetInfo = (selectedAssets, defaultAsset, currentAsset) => {
  if (selectedAssets.length > 0) {
    if (Object.keys(currentAsset).length > 0) {
      return currentAsset;
    }
  } else {
    return defaultAsset;
  }
};

// export const getAssetName = (selectedAssets, defaultAsset, currentAsset) => {
//   if (selectedAssets.length > 0) {
//     if (Object.keys(currentAsset).length > 0) {
//       return currentAsset.sy;
//     }
//   } else {
//     return defaultAsset.sy;
//   }
// };

// export const getAssetType = (selectedAssets, defaultAsset, currentAsset) => {
//   if (selectedAssets.length > 0) {
//     if (Object.keys(currentAsset).length > 0) {
//       return currentAsset.type;
//     }
//   } else {
//     return defaultAsset.type;
//   }
// };

// export const getAssetPrice = (selectedAssets, defaultAsset, currentAsset) => {
//   if (selectedAssets.length > 0) {
//     if (Object.keys(currentAsset).length > 0) {
//       return currentAsset.rate;
//     }
//   } else {
//     return defaultAsset.rate;
//   }
// };
