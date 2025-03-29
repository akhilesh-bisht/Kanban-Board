import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { sampleLists, sampleTasks } from "../data";

const ListView = ({ boardId }) => {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    setLists(sampleLists[boardId] || []);
    setTasks(sampleTasks);
  }, [boardId]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceListId = source.droppableId;
    const destListId = destination.droppableId;

    if (sourceListId === destListId) {
      // Reorder tasks within the same list
      const newTasks = [...tasks[sourceListId]];
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);

      setTasks((prev) => ({ ...prev, [sourceListId]: newTasks }));
    } else {
      // Move task to another list
      const sourceTasks = [...tasks[sourceListId]];
      const destTasks = [...(tasks[destListId] || [])];

      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      setTasks((prev) => ({
        ...prev,
        [sourceListId]: sourceTasks,
        [destListId]: destTasks,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {lists.map((list) => (
          <div key={list.id} className="w-64 bg-gray-100 p-4 rounded shadow">
            <h3 className="font-bold mb-2">{list.title}</h3>

            <Droppable droppableId={list.id.toString()}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[100px] p-2 bg-white rounded">
                  {tasks[list.id]?.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-blue-200 p-2 my-2 rounded shadow cursor-pointer"
                        >
                          {task.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ListView;

