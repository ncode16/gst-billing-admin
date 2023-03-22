import { Edit, Trash } from "react-feather";

export const columns = [
  {
    name: "Feature Name",
    sortable: true,
    minWidth: "1090px",
    sortField: "feature_name",
    selector: (row) => row.feature_name,
    cell: (row) => (
      <>
        <span>{row.feature_name}</span>
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
