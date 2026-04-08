// tag display labels and CSS class names.
export const TAGS = [
  { value: "combat", label: "Combat", colorClass: "tag--combat" },
  { value: "location", label: "Location", colorClass: "tag--location" },
  { value: "npc", label: "NPC", colorClass: "tag--npc" },
  { value: "quest", label: "Quest", colorClass: "tag--quest" },
  { value: "loot", label: "Loot", colorClass: "tag--loot" },
  { value: "curse", label: "Curse", colorClass: "tag--curse" },
  { value: "blessing", label: "Blessing", colorClass: "tag--blessing" },
  { value: "event", label: "Event", colorClass: "tag--event" },
];

// Returns the colorClass for a given tag value string.
export const getTagColorClass = (value) => {
  const found = TAGS.find((t) => t.value === value.toLowerCase());
  return found ? found.colorClass : "tag--default";
};
