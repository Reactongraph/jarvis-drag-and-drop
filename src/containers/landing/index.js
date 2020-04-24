import React, { Component } from "react";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: DRAG_IMAGES
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    Swal.fire({
      icon: "question",
      text: "Do you want to replace Image A for image B ?)",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(res => {
      if (res.value) {
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
        this.setState({
          items
        });
      }
    });
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="imageWrap pt-4">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" onDragEnd={this.onDragEnd}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.items.map((item, index) => {
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {provided => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                provided.draggableProps.style
                              )}
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
  }
}

export default App;
