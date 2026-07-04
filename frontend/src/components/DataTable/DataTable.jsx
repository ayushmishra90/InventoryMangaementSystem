import "./DataTable.css";

function DataTable({
    columns,
    data,
    renderActions
}) {

    return (

        <table className="data-table">

            <thead>

                <tr>

                    {
                        columns.map((column) => (

                            <th key={column.key}>
                                {column.label}
                            </th>

                        ))
                    }

                    {
                        renderActions &&
                        <th>Actions</th>
                    }

                </tr>

            </thead>

            <tbody>

                {
                    data.length === 0 ?

                        (
                            <tr>

                                <td
                                    colSpan={
                                        columns.length + 1
                                    }
                                    className="empty-row"
                                >
                                    No Records Found
                                </td>

                            </tr>
                        )

                        :

                        (
                            data.map((row) => (

                                <tr key={row.id}>

                                    {
                                        columns.map((column) => (

                                            <td key={column.key}>
                                                {row[column.key]}
                                            </td>

                                        ))
                                    }

                                    {
                                        renderActions &&
                                        <td>

                                            {
                                                renderActions(row)
                                            }

                                        </td>
                                    }

                                </tr>

                            ))
                        )

                }

            </tbody>

        </table>

    );

}

export default DataTable;