export const getItemStyle = draggableStyle => ({
  userSelect: "none",
  width: 205,
  paddingTop: 30,
  paddingLeft: 30,
  ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#fff7b7" : "#f5f5f5"
});
