export const prepareMapContainer = (visualizationId, height, width, isFullscreen) => {
  const mapContainerId = `${visualizationId}-child-view-port`;

  const parentElement = document.getElementById(`map-view-port-${visualizationId}`);
  const mapContainer = document.getElementById(mapContainerId);

  if (mapContainer) {
    mapContainer.parentNode.removeChild(mapContainer);
  }

  const div = document.createElement('div');

  div.setAttribute('id', mapContainerId);

  div.style.width = isFullscreen ? '100%' : width;
  div.style.height = height;
  div.style.background = '#FCFAF8';

  // Append map div to the parent div.
  if (parentElement) {
    parentElement.appendChild(div);
  }
  return mapContainerId;
};
