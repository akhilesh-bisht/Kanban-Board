export const sampleBoards = [
  { id: 1, title: "Work" },
  { id: 2, title: "Personal" },
];

export const sampleLists = {
  1: [
    { id: 101, title: "To Do", boardId: 1 },
    { id: 102, title: "In Progress", boardId: 1 },
    { id: 103, title: "done", boardId: 1 },
  ],
  2: [{ id: 201, title: "Ideas", boardId: 2 }],
};

export const sampleTasks = {
  101: [
    { id: 1001, title: "Fix bug", description: "Fix login issue" },
    { id: 1002, title: "Update Docs", description: "Improve API docs" },
  ],
  102: [{ id: 1003, title: "Design UI", description: "New landing page" }],
  201: [
    {
      id: 1004,
      title: "Brainstorm Ideas",
      description: "Discuss app features",
    },
  ],
};
