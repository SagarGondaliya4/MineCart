import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/API";

export const User = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      console.log("response.data: ", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (productId) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      try {
        await api.delete(`/products/${productId}`);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredItems = products.filter((user) =>
      user.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setProducts(filteredItems);
    setSearchItem("");
  };
  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <div className="d-flex justify-content-between m-2">
          <h1>List of products</h1>
          <div className="d-flex">
            <input
              class="form-control"
              name="name"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              type="text"
              placeholder="Search..."
              value={searchItem}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              class="btn btn-success"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex  justify-content-end">
        <Link to={"/user/create"}>
          <button type="button" class="btn btn-success">
            Add +
          </button>
        </Link>
      </div>
      <div className="container mt-4">
        <h3 className="mt-4">Product List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Product Title</th>
              <th>Product Price</th>
              <th>Product Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <Link to={`/user/read/${product?.id}`}>
                    <button className="btn btn-info m-1">View</button>
                  </Link>
                  <Link to={`/user/update/${product?.id}`}>
                    <button className="btn btn-warning m-1">Update</button>
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
