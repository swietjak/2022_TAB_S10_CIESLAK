import { useState } from "react";
import { CustomTabs } from "shared/components";
import { useTabEntries } from "./CareTakerReservations.utils";

const CareTakerReservations = () => {
  const [selectedTabId, setSelectedTabId] = useState(0);
  const tabsEntries = useTabEntries();

  return (
    <CustomTabs
      handleIdChange={setSelectedTabId}
      selectedTabId={selectedTabId}
      entries={tabsEntries}
    />
  );
};

export default CareTakerReservations;
