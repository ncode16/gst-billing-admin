import { Trash, Edit } from "react-feather";

export const columns = [
  {
    name: "Title",
    sortable: true,
    minWidth: "550px",
    sortField: "title",
    selector: (row) => row.title,
    cell: (row) => (
      <>
        <span>{row.title}</span>
      </>
    ),
  },
  {
    name: "Description",
    sortable: true,
    minWidth: "550px",
    sortField: "imageLink",
    selector: (row) => row.desc,
    cell: (row) => (
      <>
        <span>{row.desc}</span>
      </>
    ),
  },
  {
    name: "Action",
    minWidth: "110px",
    cell: (row) => (
      <>
        <Edit
          className="cursor-pointer"
          onClick={() => console.log("eee", row.id)}
          size={17}
          id={`send-tooltip-${row.id}`}
        />
        <Trash
          className="trash-pointer"
          onClick={() => console.log("trash", row.id)}
          size={17}
          id={`send-tooltip-${row.id}`}
        />
      </>
    ),
  },
];
