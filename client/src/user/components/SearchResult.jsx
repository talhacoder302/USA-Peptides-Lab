import { useLocation } from "react-router-dom";
import data from "../../data.json";

const SearchResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const results = data.filter((product) =>
    product.name.toLowerCase().includes(query?.toLowerCase() || "")
  );

  return (
    <div className="w-[90%] md:w-[80%] mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
      {results.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((product) => (
            <li key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm">{product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
