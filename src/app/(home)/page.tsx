import { supabase } from "@/lib/supabase";

// Define the type for your table data
interface TestTable {
  id: number;
  name: string;
  // Add other fields that exist in your table
}

export default async function HomePage() {
  // Fetch all records from test_table
  const { data, error } = await supabase
    .from("test_table")
    .select("*")
    .returns<TestTable[]>();

  // Handle the case when data is null
  const items = data ?? [];

  return (
    <div>
      <h1>Test Table Contents</h1>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <div>
        {items.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{item.id}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found in test_table.</p>
        )}
      </div>
    </div>
  );
}
