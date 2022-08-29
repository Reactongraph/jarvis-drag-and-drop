import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DRAG_IMAGES } from "../../metaComponent";
import { getItemStyle, getListStyle } from "../../utils";
import Swal from "sweetalert2";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {
  const [state, setState] = useState({ items: DRAG_IMAGES });

  const onDragEnd = (result) => {
    Swal.fire({
      icon: "question",
      text: "Do you want to replace Image A for image B ?)",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((res) => {
      if (res.value) {
        const items = reorder(
          state.items,
          result.source.index,
          result.destination.index
        );
        setState({
          items,
        });
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="imageWrap pt-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" onDragEnd={onDragEnd}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {state.items.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(provided.draggableProps.style)}
                          >
                            <div className="img-wrap">
                              <img src={item.src} />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default App;
