import React from "react";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const TableDashboard = ({ columns, data }) => {
  return (
    <div className="bg-white rounded-lg overflow-x-auto mt-5">
      <div className="overflow-auto">
        <table className="w-full bg-white">
          <thead className="bg-white">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`py-2 px-4 text-left text-main border-b border-main border-opacity-35 ${
                    col.width || "w-auto"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-main border-opacity-35"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-4 px-4 text-main whitespace-nowrap border-b border-main border-opacity-35 ${
                      col.width || "w-auto"
                    }`}
                  >
                    {col.field === "action" ? (
                      <div className="cursor-pointer">{item[col.field]}</div>
                    ) : col.field === "gambar" ? (
                      <img
                        // src={`https://paudterpaducisa.sch.id/api/storage/uploads/${
                        //   item[col.field]
                        // }`}
                        src={`${import.meta.env.VITE_API_URL}/storage/uploads/${
                          item[col.field]
                        }`}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div>
                        {item[col.field] &&
                          truncateText(item[col.field], col.truncate)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDashboard;
