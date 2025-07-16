import { useEffect, useState } from "react";
import { useVehicleStore } from "../../store/vehicleStore";
import styles from "./VehicleList.module.scss";

type SortKey = "year" | "price" | null;
type SortDirection = "asc" | "desc";

export const VehicleList = () => {
  const { vehicles, fetchVehicles, updateVehicle, deleteVehicle } = useVehicleStore();
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    return sortDirection === "asc" ? valA - valB : valB - valA;
  });

  const startEdit = (id: number, name: string, price: number) => {
    setEditingId(id);
    setEditName(name);
    setEditPrice(price.toString());
  };

  const saveEdit = () => {
    if (editingId !== null) {
      updateVehicle(editingId, {
        name: editName,
        price: Number(editPrice),
      });
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(sortedVehicles.length / itemsPerPage);

  const paginatedVehicles = sortedVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Vehicles</h2>
      <div className={styles.table__container}>
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Model</th>
                <th
                  className={`${styles.sortable}`}
                  onClick={() => handleSort("year")}
                >
                  Year
                  {sortKey === "year" && (
                    <span className={styles["sort-icon"]}>
                    {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className={`${styles.sortable}`}
                  onClick={() => handleSort("price")}
                >
                  Price
                  {sortKey === "price" && (
                    <span className={styles["sort-icon"]}>
                    {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {paginatedVehicles.map((v) => (
                <tr key={v.id}>
                <td>
                    {editingId === v.id ? (
                    <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    ) : (
                    v.name
                    )}
                </td>
                <td>{v.model}</td>
                <td>{v.year}</td>
                <td>
                    {editingId === v.id ? (
                    <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                    />
                    ) : (
                    `$${v.price}`
                    )}
                </td>
                <td>
                    {editingId === v.id ? (
                    <>
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </>
                    ) : (
                    <>
                        <button onClick={() => startEdit(v.id, v.name, v.price)}>Edit</button>
                        <button onClick={() => deleteVehicle(v.id)}>Delete</button>
                    </>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className={styles.pagination}>
          <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
            &lt; Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
            key={i + 1}
            onClick={() => changePage(i + 1)}
            className={currentPage === i + 1 ? styles.activePage : ""}
            >
            {i + 1}
            </button>
          ))}

          <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
