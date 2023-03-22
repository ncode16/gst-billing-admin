export const columns = [
  {
    name: "Category Name",
    sortable: true,
    minWidth: "1090px",
    sortField: "category_name",
    selector: (row) => row.category_name,
    cell: (row) => (
      <>
        <span>{row.category_name}</span>
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
        />{" "}
        &nbsp;
        <Trash
          className="cursor-pointer"
          onClick={() => handleDelete(row.category_id)}
          size={17}
          id={`send-tooltip-${row.id}`}
        />
      </>
    ),
  },
];
