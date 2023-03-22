import { Trash, Edit } from "react-feather";

export const columns = [
  {
    name: "Image Link",
    sortable: true,
    minWidth: "1090px",
    sortField: "imageLink",
    selector: (row) => row.ImageLink,
    cell: (row) => (
      <>
        <span>{row.ImageLink}</span>
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
