import React, { useEffect, useState } from "react";
import axios from "axios";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/lists")
      .then((res) => setLists(res.data))
      .catch((err) => console.error("Error fetching lists", err));
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    // Handle drag logic here
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        <SortableContext items={lists} strategy={verticalListSortingStrategy}>
          {lists.map((list) => (
            <KanbanColumn key={list._id} list={list} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
