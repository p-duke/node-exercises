import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'

/*

Instructions:
1. Fetch data from the mock mock api
2. Create a new component
3. Pass the data into a new component
4. Visualize the data in a table

BONUS:
5. Filter the data based on in-stock
6. Filter the data based on category

*/

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const newMockApi = () => {
  const groceryStoreProducts = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ];

  return {
    getProducts: async () => {
      await sleep(1000)
      return {
        json: JSON.stringify(groceryStoreProducts),
      }
    }
  }
}

const ProductTable = ({ products, inStockOnly }) => {
  return (
    <div>
      <h1>Grocery Store</h1>
      <table>
        <tr>
          <th>Category</th>
          <th>Price</th>
          <th>Stocked</th>
          <th>Name</th>
        </tr>
          {products.map((product, key) => {
            if (inStockOnly && !product.stocked) {
              return
            }

            return (
              <tr key={key}>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stocked.toString()}</td>
                <td>{product.name}</td>
              </tr>
            )})}
      </table>
      <div className="footer"></div>
    </div>
  )
};

const SearchFilter = ({
  inputValue,
  onFilter,
  inStockOnly,
  onInStockOnlyChange
}) => {

  return (
    <div className="header">
      <input type="text" value={inputValue} placeholder="Search by category ..." onChange={onFilter}></input>
      <label>
      <input  type="checkbox"  checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)}></input>
        Show In Stock
      </label>
    </div>
  )
};

function App() {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState(products);
  const [inStockOnly, setInStockOnly] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newMockApi().getProducts();
        setProducts(JSON.parse(response.json));
        setFilteredData(JSON.parse(response.json));
      } catch(e) {
        console.log("error fetching", e);
      }
    }

    fetchData();
  }, []);

  const onFilter = (e) => {
    const searchVal = e.target.value.toLowerCase();
    
    setInputValue(searchVal);
   
    const filtered = products.filter(product => {
      return product.category.toLowerCase().includes(searchVal);
    });

    setFilteredData(filtered);
  };

  const onInStockOnlyChange = ((value) => setInStockOnly(value));

  return (
    <div className="app">
        <SearchFilter inputValue={inputValue} onFilter={onFilter} inStockOnly={inStockOnly} onInStockOnlyChange={onInStockOnlyChange} />
      <div className="content">
        <ProductTable 
          products={filteredData} 
          inStockOnly={inStockOnly} 
        />
      </div>
    </div>
  )
}

export default App
