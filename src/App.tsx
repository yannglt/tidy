import { framer, CanvasNode } from "framer-plugin";
import { useState, useEffect } from "react";
import "./App.css";

framer.showUI({
  title: "Tidy",
  position: "top left",
  width: 256,
  height: 512,
});

function useSelection() {
  const [selection, setSelection] = useState<CanvasNode[]>([]);

  useEffect(() => {
    return framer.subscribeToSelection(setSelection);
  }, []);

  return selection;
}

function sortSelection(selection: CanvasNode[]) {
  return selection.sort(
    (firstObject, secondObject) =>
      getPosition(firstObject.left) - getPosition(secondObject.left),
  );
}

function getPosition(property: string) {
  return parseFloat(property.replace("px", ""));
}

export function App() {
  const selection = useSelection();
  const sortedSelection = sortSelection(selection);

  const tidySelection = async () => {
    let lastPosition = getPosition(sortedSelection[0].left);

    sortedSelection.forEach((node) => {
      node.setAttributes({
        left: `${lastPosition}px`,
      });
      lastPosition = lastPosition + getPosition(node.width) + 24;
    });
  };

  return (
    <main>
      <button className="framer-button-primary" onClick={tidySelection}>
        Tidy
      </button>
    </main>
  );
}
