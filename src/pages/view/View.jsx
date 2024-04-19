import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../config/API";

const View = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const readId = useParams();
  const [userDetail, setUserDetail] = useState({});

  const fetchReadData = async () => {
    try {
      const response = await api.get(
        `http://localhost:3001/products/${readId?.id}`
      );
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetchReadData();
  }, []);
  return (
    <div>
      <div>
        <div class="card text-center">
          <div class="card-header">Featured</div>
          <div class="card-body">
            <h5 class="card-title">{userDetail?.title}</h5>
            <h5 class="card-text">{userDetail?.price}</h5>
          </div>
          <div class="card-footer text-body-secondary">
            {userDetail?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
