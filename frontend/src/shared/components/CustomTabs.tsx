import { Tab, Tabs } from "@mui/material";
import { TabEntry } from "shared/types";

const Panel = () => {
  return;
};

interface CustomTabsProps {
  entries: TabEntry[];
  selectedTabId: number;
  handleIdChange: (id: number) => void;
}

const CustomTabs = ({
  entries,
  handleIdChange,
  selectedTabId,
}: CustomTabsProps) => (
  <>
    <Tabs
      value={selectedTabId}
      onChange={(_, newValue) => handleIdChange(newValue)}
    >
      {entries.map(({ label }, i) => (
        <Tab key={`tab-label-${i}`} label={label} />
      ))}
    </Tabs>
    {entries[selectedTabId].panel}
  </>
);

export default CustomTabs;
