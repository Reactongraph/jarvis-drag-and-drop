export const getItemStyle = draggableStyle => ({
  userSelect: "none",
  width: 205,
  paddingTop: 30,
  paddingLeft: 30,
  ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#2B547E" : "#368BC1"
});
