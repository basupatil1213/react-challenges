import { useState, useMemo } from "react";

const DATA = [
  "Apple", "Banana", "Orange", "Mango",
  "Pineapple", "Grapes", "Strawberry",
  "Blueberry", "Watermelon", "Peach"
];

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    return DATA.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search fruits..."
      />

      {filteredData.length > 0 ? (
        filteredData.map(item => (
          <Display key={item} text={item} />
        ))
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

const Display = ({ text }) => <p>{text}</p>;

export default Search;
