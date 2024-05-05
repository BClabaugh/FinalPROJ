import React from 'react';
import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; 
import './App.css';


const App = () => {

  const HomeScreen = () => {
    const navigate = useNavigate();
    const cardStyle = {
      maxWidth: '18rem',
    };
   



    return(
      <div>
        {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}

       
        
        {/* CARDS */}
        <div class="card-group justify-content-center">

          <div class="card text-white bg-danger  " style={cardStyle}>
            <div class="card-header bg-transparent text-center">Create Account</div>
            <div class="card-body text-center">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postuser")}>Sign Up</button>
            </div>
          </div>
        

          <div class="card text-white bg-primary " style={cardStyle}>
            <div class="card-header text-center">View Livestock</div>
            <div class="card-body text-center">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>View</button>
            </div>
          </div>

        </div>        
        {/* CARDS */}
         

      </div>);
  }

  const GetLivestock = () => {

    const [livestock, setLivestock] = useState([]);
    const navigate = useNavigate();
    const cardStyle = {
      maxWidth: '18rem',
    };

    useEffect(() => {
      fetch("http://localhost:8081/livestock")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show Catalog of Livestock :", data);
          setLivestock(data);
        });
    }, []);

    return(
      <div>
  {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}
        
        {/* The Card View */}
        <h1 class="ms-5">Read All Livestock:</h1>
        <div className="row mx-4" >
          {livestock.map((el) => (
            <div className="col-md-3 mb-3" key={el.animal_id}>
              <div className={`card d-flex flex-column h-100 p-2 ${el.sold ? "bg-danger" : ""}`}>
              {el.sold ? (
                  <div className="card-header text-white">Sold</div>
                ) : (
                  <div className="card-header">Available</div>
                )}
                <img
                  className="card-img-top"
                  src={el.image}
                  alt="Livestock Image Here"
                  style={{ objectFit: "cover", transition: "padding 0.3s ease" }}
                />
                <div className="card-body d-flex flex-column justify-content-end">
                  <h5 className="card-title">Farmer: {el.username} User ID: {el.user_id}</h5>
                  <h4 className="card-title">Animal ID: {el.animal_id}</h4>
                  <h5 className="card-title mt-auto">Name: {el.name}</h5>
                  <p className="card-text">Species: {el.species}</p>
                  <p className="card-text">{el.description}</p>
                  
                  
                </div>

               
                
               {el.sold ? (
                  <div className="card-footer d-flex justify-content-between align-items-center">
                  <p className="card-text text-white">Price: ${el.price}</p>
                  <button class="btn btn-light my-2" onClick={() => navigate("/putlivestock/" + (el.animal_id - 1) )}>Sell</button>
                </div>
                ) : (
                  <div className="card-footer d-flex justify-content-between align-items-center">
                  <p className="card-text text-success">Price: ${el.price}</p>
                  <button class="btn btn-outline-success my-2" onClick={() => navigate("/putlivestock/" + (el.animal_id - 1) )}>Buy</button>
                </div>
                )}

              </div>
            </div>
          ))}
        </div>
        {/* The Card View */}
         

      </div>);
  }

  const GetLivestockUserID = () => {

    const [livestock, setLivestock] = useState([]);
    
    const navigate = useNavigate();
    const cardStyle = {
      maxWidth: '18rem',
    };

    const [id, setId] = useState("");

    useEffect(() => {
      if (id) {
      fetch(`http://localhost:8081/livestock/user/` + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show Catalog of Livestock :", data);
          setLivestock(data);
        });
      }
    }, [id]);

    const [users, setUsers] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8081/users")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show All Users:", data);
          setUsers(data);
        });
    }, []);

    return(
      <div>
        {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}

        <h1 class="ms-5">Get Livestock by Farmer:</h1> 
          <select class="ms-5 mb-5" onChange={(e) => setId(e.target.value)}>
            <option value="">Select Farmer</option>
            {users.map((el, index) => (
              <option key={index} value={el.user_id}>
                {el.first_name}  {el.last_name}
              </option>
            ))}
          </select>
        
        {/* The Card View */}
        
        <div className="row mx-4" >
          {livestock.map((el) => (
            <div className="col-md-3 mb-3" key={el.animal_id}>
              <div className={`card d-flex flex-column h-100 p-2 ${el.sold ? "bg-danger" : ""}`}>
              {el.sold ? (
                  <div className="card-header text-white">Sold</div>
                ) : (
                  <div className="card-header">Available</div>
                )}
                <img
                  className="card-img-top"
                  src={el.image}
                  alt="Livestock Image Here"
                  style={{ objectFit: "cover", transition: "padding 0.3s ease" }}
                />
                <div className="card-body d-flex flex-column justify-content-end">
                  <h5 className="card-title">Farmer: {el.username} User ID: {el.user_id}</h5>
                  <h4 className="card-title">Animal ID: {el.animal_id}</h4>
                  <h5 className="card-title mt-auto">Name: {el.name}</h5>
                  <p className="card-text">Species: {el.species}</p>
                  <p className="card-text">{el.description}</p>
                  
                  
                </div>

               {el.sold ? (
                  <div className="card-footer d-flex justify-content-between align-items-center">
                  <p className="card-text text-white">Price: ${el.price}</p>
                  <button class="btn btn-light my-2" onClick={() => navigate("/putlivestock/" + (el.animal_id - 1) )}>Sell</button>
                </div>
                ) : (
                  <div className="card-footer d-flex justify-content-between align-items-center">
                  <p className="card-text text-success">Price: ${el.price}</p>
                  <button class="btn btn-outline-success my-2" onClick={() => navigate("/putlivestock/" + (el.animal_id - 1) )}>Buy</button>
                </div>
                )}

              </div>
            </div>
          ))}
        </div>
        {/* The Card View */}
         

      </div>);
  }

  const GetLivestockSpecies = () => {

    const [livestock, setLivestock] = useState([]);
    const navigate = useNavigate();
    const cardStyle = {
      maxWidth: '18rem',
    };

    const [species, setSpecies] = useState("");

    useEffect(() => {
      if (species) {
        
      fetch(`http://localhost:8081/livestock/species/` + species)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show Catalog of Livestock :", data);
          setLivestock(data);
        });
      }
    }, [species]);

    const [option, setOption] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8081/livestock")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show Catalog of Livestock :", data);
                // Extract unique species tags using Set
            const uniqueSpecies = [...new Set(data.map(item => item.species))];
            
            // Create an array of objects with unique species
            const uniqueLivestock = uniqueSpecies.map(species => {
              // Find the first item with the species tag
              const item = data.find(item => item.species === species);
              return item;
            });

            // Set the state with unique livestock
            setOption(uniqueLivestock);
        });
    }, []);

    return(
      <div>
  {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}

        <h1 class="ms-5">Get Livestock by Species:</h1>
          <select class="ms-5 mb-5" onChange={(e) => setSpecies(e.target.value)}>
            <option value="">Select Species</option>
            {option.map((el, index) => (
              <option key={index} value={el.species}>
                {el.species}
              </option>
            ))}
          </select>
 
        {/* The Card View */}
        
        <div className="row mx-4" >
          {livestock.map((el) => (
            <div className="col-md-3 mb-3" key={el.animal_id}>
              <div className={`card d-flex flex-column h-100 p-2 ${el.sold ? "bg-danger" : ""}`}>
              {el.sold ? (
                  <div className="card-header text-white">Sold</div>
                ) : (
                  <div className="card-header">Available</div>
                )}
                <img
                  className="card-img-top"
                  src={el.image}
                  alt="Livestock Image Here"
                  style={{ objectFit: "cover", transition: "padding 0.3s ease" }}
                />
                <div className="card-body d-flex flex-column justify-content-end">
                  <h5 className="card-title">Farmer: {el.username} User ID: {el.user_id}</h5>
                  <h4 className="card-title">Animal ID: {el.animal_id}</h4>
                  <h5 className="card-title mt-auto">Name: {el.name}</h5>
                  <p className="card-text">Species: {el.species}</p>
                  <p className="card-text">{el.description}</p>
                  
                  
                </div>

               {el.sold ? (
                  <div className="card-footer d-flex justify-content-between align-items-center">
                  <p className="card-text text-white">Price: ${el.price}</p>
                  <button class="btn btn-light my-2" onClick={() => navigate("/putlivestock/" + (el.animal_id - 1) )}>Sell</button>
                </div>
                ) : (
                  <div className="card-footer d-flex justify-content-between align-items-center">
                  <p className="card-text text-success">Price: ${el.price}</p>
                  <button class="btn btn-outline-success my-2" onClick={() => navigate("/putlivestock/" + (el.animal_id - 1) )}>Buy</button>
                </div>
                )}

              </div>
            </div>
          ))}
        </div>
        {/* The Card View */}
         

      </div>);
  }
   
  const GetLivestockID = () => {
    // Define hooks
    const [livestock, setLivestock] = useState({
      animal_id: '',
      name: '',
      species: '',
      user_id: '',
      username: '',
      description: '',
      price: '',
      sold: '',
      image: ''
    });
    

    const navigate = useNavigate();
    const [id, setId] = useState(1);
    
  

    useEffect(() => {
      if (id) {
      fetch(`http://localhost:8081/livestock/` + id)
      .then((response) => response.json())
      .then((data) => {
      console.log("Show one livestock :", data);
      setLivestock(data);
      });
      }
      }, [id]);


      

    return (  
      <div>
   {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}




        {/* The Card View */}
        <h1 class="ms-5">Read One Livestock:</h1>
        <input class="ms-5 mb-5" type="text" placeholder="Enter Animal ID" onChange={(e) => setId(e.target.value)} />
        

          <div className="container-fluid"> 
           
                <div className={`card mx-4 d-flex flex-column h-100 p-2 ${livestock.sold ? "bg-danger" : ""}`}>
                {livestock.sold ? (
                    <div className="card-header text-white">Sold</div>
                  ) : (
                    <div className="card-header">Available</div>
                  )}

<div class="row">
  <div class = "col text-center">
                  <img
                    className="card-img-top"
                    src={livestock.image}
                    alt="Livestock Image Here"
                    style={{ maxWidth: "18rem" }}
                  />
</div>
<div class = "col">
                  <div className="card-body d-flex flex-column justify-content-end">
                    <h5 className="card-title">Farmer: {livestock.username} User ID: {livestock.user_id}</h5>
                    <h4 className="card-title">Animal ID: {livestock.animal_id}</h4>
                    <h5 className="card-title mt-auto">Name: {livestock.name}</h5>
                    <p className="card-text">Species: {livestock.species}</p>
                    <p className="card-text">{livestock.description}</p>
                   
                  </div>
                  
</div>
</div>


                {livestock.sold ? (
                  <div className="card-footer d-flex justify-content-between align-items-center">
                  <p className="card-text text-white">Price: ${livestock.price}</p>
                  <button class="btn btn-light my-2" onClick={() => navigate("/putlivestock/" + (livestock.animal_id - 1) )}>Sell</button>
                </div>
                  ) : (
                  <div className="card-footer d-flex justify-content-between align-items-center">
                  <p className="card-text text-success">Price: ${livestock.price}</p>
                  <button class="btn btn-outline-success my-2" onClick={() => navigate("/putlivestock/" + (livestock.animal_id - 1) )}>Buy</button>
                </div>
                )}



                </div>
              </div>
           
            
        
        
      </div>);
  }

  const PostLivestock = () => {
      
    // Define HOOKS
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      animal_id: '',
      name: '',
      species: '',
      user_id: '',
      username: '',
      description: '',
      price: '',
      sold: '',
      image: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      const [fieldName, nestedFieldName] = name.split('.');
      
      console.log(nestedFieldName);
    
      if (nestedFieldName && formData[fieldName]) {
        setFormData(prevState => ({
          ...prevState,
          [fieldName]: {
            ...prevState[fieldName],
            [nestedFieldName]: value
          }
        }));
        console.log(value);
      } else {
        if (name === 'user_id') {
          // Find the user with the selected user_id
          const selectedUser = users.find(user => user.user_id === parseInt(value));
          // Set the username based on the selected user
          setFormData(prevState => ({
            ...prevState,
            [name]: value,
            username: selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : ''
          }));
        } else {
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        }
        console.log(value);
      }
    };
    

    const [livestock, setLivestock] = useState([]);
    
    useEffect(() => {
      fetch("http://localhost:8081/livestock")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show Catalog of Livestock :", data);
          setLivestock(data);
        });
    }, []);
    
    const [users, setUsers] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8081/users")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show All Users:", data);
          setUsers(data);
        });
    }, []);
  
        const parsedFormData = {
          ...formData,
          price: parseFloat(formData.price),
          user_id: parseInt(formData.user_id),
          animal_id: livestock.length + 1,
          sold: false
        };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value);
      console.log(JSON.stringify(parsedFormData));
      fetch("http://localhost:8081/livestock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedFormData),
      
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert("Animal added successfully!");
          window.location.href = '/';
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding Animal:" + error.message);
        });
    }; 
  
    return(
      <div>
  
  {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}
  
        {/* Form to input data */}
        <form class="mx-5" onSubmit={handleSubmit}>
          <h1 >Create New Livestock:</h1>

          <div className="mb-3">
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="species" value={formData.species} onChange={handleChange} placeholder="Species" required />
          </div>


          <div className="mb-3">
            <select className="form-control" name="user_id" value={formData.user_id} onChange={handleChange} required>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.user_id} value={user.user_id}>{user.first_name} {user.last_name}</option>
              ))}
            </select>
          </div>



          <div className="mb-3">
            <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>);
    
  }
  
  const PutLivestock = () => {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      animal_id: '',
      name: '',
      species: '',
      user_id: '',
      username: '',
      description: '',
      price: '',
      sold: '',
      image: ''
    });

    const [livestock, setLivestock] = useState([{
      animal_id: '',
      name: '',
      species: '',
      user_id: '',
      username: '',
      description: '',
      price: '',
      sold: '',
      image: ''
    }]);

    const [index, setIndex] = useState(0);

    const handleChange = (e) => {
      const { name, value } = e.target;
      const [fieldName, nestedFieldName] = name.split('.');
      
      console.log(nestedFieldName);
    
      if (nestedFieldName && formData[fieldName]) {
        setFormData(prevState => ({
          ...prevState,
          [fieldName]: {
            ...prevState[fieldName],
            [nestedFieldName]: value
          }
        }));
        console.log(value);
      } else {
        if (name === 'user_id') {
          // Find the user with the selected user_id
          const selectedUser = users.find(user => user.user_id === parseInt(value));
          // Set the username based on the selected user
          setFormData(prevState => ({
            ...prevState,
            [name]: value,
            username: selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : ''
          }));
        } else {
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        }
        console.log(value);
      }
    };
          
    useEffect(() => {
      fetch("http://localhost:8081/livestock")
      .then((response) => response.json())
      .then((data) => {
      setLivestock(data);
      console.log(data);
      });
    }, []);

    const [users, setUsers] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8081/users")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show All Users:", data);
          setUsers(data);
        });
    }, []);
     
    function getOneByOneProductNext() {
      if (livestock.length > 0) {
        if (index === livestock.length - 1) setIndex(0);
        else setIndex(index + 1);
      }
    }
  
    function getOneByOneProductPrev() {
      if (livestock.length > 0) {
        if (index === 0) setIndex(livestock.length - 1);
        else setIndex(index - 1);
      }
    }

    const parsedFormData = {
      ...formData,
      user_id: parseInt(formData.user_id),
    };
  
    const handleSubmit = () => {

      const id = livestock[index].animal_id;

      const parsedFormData = {
          ...formData,
          animal_id: livestock[index].animal_id,
          name: livestock[index].name,
          species: livestock[index].species,
          user_id: livestock[index].user_id,
          username: livestock[index].username,
          description: livestock[index].description,
          price: parseFloat(formData.price),
          sold: livestock[index].sold,
          image: livestock[index].image
      };
  
      fetch("http://localhost:8081/livestock/" + id, {
          method: "PUT",
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(parsedFormData)
      })
      .then((response) => response.json())
      .then((json) => {
          console.log(json);
          window.alert("Animal updated successfully!"); 
      })
      .catch((error) => {
          console.error("Error updating animal:", error);
          alert("Error updating Animal: " + error.message);
      });
      
      console.log("Data Submitted");
  }; 

      return(
      
        <div>

  {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}

        
  
  <div class = "row">
  
  <div class = "col">
      {/* Form to input data */}
      <form class="ms-5" onSubmit={handleSubmit}>
      <h1>Update One Animal:</h1>

      <div className="mb-3">
        <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} placeholder={"Current Price: $" + livestock[index].price} required />
      </div>
    
    
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>

 </div>

 <div class = "col">
      {/* Buttons to simulate carousel */}
      <div className="btn-group m-3">
        <button className="btn btn-outline-secondary" onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button className="btn btn-outline-secondary" onClick={() => getOneByOneProductNext()}>Next</button>
      </div>
    
      {/* Show livestock properties, one by one */}
      <div className="container-fluid"> 
           
        <div className={`card mx-4 d-flex flex-column h-100 p-2 ${livestock[index].sold ? "bg-danger" : ""}`}>
                {livestock[index].sold ? (
                    <div className="card-header text-white">Sold</div>
                  ) : (
                    <div className="card-header">Available</div>
                  )}

          <div class="row">
            <div class = "col text-center">
                  <img
                    className="card-img-top"
                    src={livestock[index].image}
                    alt="Livestock Image Here"
                    style={{ maxWidth: "18rem" }}
                  />
            </div>
            <div class = "col">
              <div className="card-body d-flex flex-column justify-content-end">
                <h5 className="card-title">Farmer: {livestock[index].username} User ID: {livestock[index].user_id}</h5>
                <h4 className="card-title">Animal ID: {livestock[index].animal_id}</h4>
                <h5 className="card-title mt-auto">Name: {livestock[index].name}</h5>
                <p className="card-text">Species: {livestock[index].species}</p>
                <p className="card-text">{livestock[index].description}</p>
                <p className="card-text">Price: ${livestock[index].price}</p> 
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>

      </div>

      </div>);
  
  
  }

  const PutLivestockID = () => {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      animal_id: '',
      name: '',
      species: '',
      user_id: '',
      username: '',
      description: '',
      price: '',
      sold: '',
      image: ''
    });

    const [livestock, setLivestock] = useState([{
      animal_id: '',
      name: '',
      species: '',
      user_id: '',
      username: '',
      description: '',
      price: '',
      sold: '',
      image: ''
    }]);

    let { id } = useParams();
    const [index, setIndex] = useState(0);

    

    const handleChange = (e) => {
      const { name, value } = e.target;
      const [fieldName, nestedFieldName] = name.split('.');
      
      console.log(nestedFieldName);
    
      if (nestedFieldName && formData[fieldName]) {
        setFormData(prevState => ({
          ...prevState,
          [fieldName]: {
            ...prevState[fieldName],
            [nestedFieldName]: value
          }
        }));
        console.log(value);
      } else {
        if (name === 'user_id') {
          // Find the user with the selected user_id
          const selectedUser = users.find(user => user.user_id === parseInt(value));
          // Set the username based on the selected user
          setFormData(prevState => ({
            ...prevState,
            [name]: value,
            username: selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : ''
          }));
        } else {
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        }
        console.log(value);
      }
    };

    const [users, setUsers] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8081/users")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show All Users:", data);
          setUsers(data);
        });
    }, []);
          
    useEffect(() => {
      fetch("http://localhost:8081/livestock")
      .then((response) => response.json())
      .then((data) => {
      setLivestock(data);
      console.log(data);

      const idNumber = parseInt(id, 10);

      if (!isNaN(idNumber)) {
        setIndex(idNumber);
      }

      });
    }, []);
 
    

    const parsedFormData = {
      ...formData,
      user_id: parseInt(formData.user_id),
    };
  
    const handleSubmit = () => {

      const id = livestock[index].animal_id;

      const parsedFormData = {
          ...formData,
          animal_id: livestock[index].animal_id,
          name: livestock[index].name,
          species: livestock[index].species,
          user_id: parseInt(formData.user_id),
          username: formData.username,
          description: livestock[index].description,
          price: livestock[index].price,
          sold: !livestock[index].sold,
          image: livestock[index].image
      };
  
      fetch("http://localhost:8081/livestock/" + id, {
          method: "PUT",
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(parsedFormData)
      })
      .then((response) => response.json())
      .then((json) => {
          console.log(json);
          window.alert("Animal updated successfully!"); 
      })
      .catch((error) => {
          console.error("Error updating animal:", error);
          alert("Error updating Animal: " + error.message);
      });
      
      console.log("Data Submitted");
  }; 

      return(
      
        <div>

      {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}

        
  
  <div class = "row">
  
  <div class = "col">
      {/* Form to input data */}
      <form class="ms-5" onSubmit={handleSubmit}>
      
      {livestock[index].sold ? (<h1>Sell One Product:</h1>) : (<h1>Purchase One Product:</h1>)}

      

      <div className="mb-3">
            <select className="form-control" name="user_id" value={formData.user_id} onChange={handleChange} required>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.user_id} value={user.user_id}>{user.first_name} {user.last_name}</option>
              ))}
            </select>
          </div>
    
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>

 </div>

 <div class = "col">
  
      {/* Show livestock properties, one by one */}
      <div className="container-fluid"> 
           
        <div className={`card mx-4 d-flex flex-column h-100 p-2 ${livestock[index].sold ? "bg-danger" : ""}`}>
                {livestock[index].sold ? (
                    <div className="card-header text-white">Sold</div>
                  ) : (
                    <div className="card-header">Available</div>
                  )}

          <div class="row">
            <div class = "col text-center">
                  <img
                    className="card-img-top"
                    src={livestock[index].image}
                    alt="Livestock Image Here"
                    style={{ maxWidth: "18rem" }}
                  />
            </div>
            <div class = "col">
              <div className="card-body d-flex flex-column justify-content-end">
                <h5 className="card-title">Farmer: {livestock[index].username} User ID: {livestock[index].user_id}</h5>
                <h4 className="card-title">Animal ID: {livestock[index].animal_id}</h4>
                <h5 className="card-title mt-auto">Name: {livestock[index].name}</h5>
                <p className="card-text">Species: {livestock[index].species}</p>
                <p className="card-text">{livestock[index].description}</p>
                <p className="card-text">Price: {livestock[index].price}</p> 
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>

      </div>

      </div>);
  
  
  }
 
  const DeleteLivestock = () => {
    // Define HOOKS
    const [livestock, setLivestock] = useState([{
      animal_id: '',
      name: '',
      species: '',
      user_id: '',
      username: '',
      description: '',
      price: '',
      sold: '',
      image: ''
    }]);

    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      fetch("http://localhost:8081/livestock")
        .then((response) => response.json())
        .then((data) => {
          setLivestock(data);
          console.log("Load initial Catalog of Livestock in DELETE :", data);
        });
    }, []);

    function getOneByOneProductNext() {
      if (livestock.length > 0) {
        if (index === livestock.length - 1) setIndex(0);
        else setIndex(index + 1);
      }
    }

    function getOneByOneProductPrev() {
      if (livestock.length > 0) {
        if (index === 0) setIndex(livestock.length - 1);
        else setIndex(index - 1);
      }
    }

    const deleteOneProduct = (id) => {
      console.log("Product to delete :", id);
      fetch("http://localhost:8081/livestock/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animal_id: id }),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Delete a Livestock completed : ", id);
          console.log(data);
          const newProducts = livestock.filter((livestock) => livestock.id !== id);
          setLivestock(newProducts);
          setIndex(0);
          if (data) {
            const key = Object.keys(data);
            const value = Object.values(data);
            alert("livestock Deleted");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding robot:" + error.message);
        });
    };
    // return
    return (
      <div>

   {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}
        
        

        {/* Buttons to simulate carousel */}
        <h1 class="ms-5">Delete One Product:</h1>

        <div className="btn-group mb-3 me-3 ms-5">
          <button className="btn btn-outline-secondary" onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button className="btn btn-outline-secondary" onClick={() => getOneByOneProductNext()}>Next</button>
        </div>

        <button class="btn btn-danger mb-3" onClick={() => deleteOneProduct(livestock[index].animal_id)}>Delete</button>

        {/* Show livestock properties, one by one */}
        <div className="container-fluid"> 
           
        <div className={`card mx-4 d-flex flex-column h-100 p-2 ${livestock[index].sold ? "bg-danger" : ""}`}>
                {livestock[index].sold ? (
                    <div className="card-header text-white">Sold</div>
                  ) : (
                    <div className="card-header">Available</div>
                  )}

          <div class="row">
            <div class = "col text-center">
                  <img
                    className="card-img-top"
                    src={livestock[index].image}
                    alt="Livestock Image Here"
                    style={{ maxWidth: "18rem" }}
                  />
            </div>
            <div class = "col">
              <div className="card-body d-flex flex-column justify-content-end">
                <h5 className="card-title">Farmer: {livestock[index].username} User ID: {livestock[index].user_id}</h5>
                <h4 className="card-title">Animal ID: {livestock[index].animal_id}</h4>
                <h5 className="card-title mt-auto">Name: {livestock[index].name}</h5>
                <p className="card-text">Species: {livestock[index].species}</p>
                <p className="card-text">{livestock[index].description}</p>
                <p className="card-text">Price: ${livestock[index].price}</p> 
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  const StudentInfo = () => {

    const navigate = useNavigate();

    return(
<div>
  {/* HEADER */}
        <div class="bg-primary mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestock")}>Get Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockid")}>Get One By Animal ID</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockuserid")}>Livestock By Farmer</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/getlivestockspecies")}>Livestock By Species</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postlivestock")}>Create Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/putlivestock")}>Update Livestock</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deletelivestock")}>Delete Livestock</button>  
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}


        <div class="container">
<div class="row">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Team Member 1</h5>
        <p class="card-text">Zach Schmitz</p>
        <p class="card-text">zach24@iastate.edu</p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Team Member 2</h5>
        <p class="card-text">Blake Clabaugh</p>
        <p class="card-text">clab22@iastate.edu</p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">COMS 319</h5>
        <p class="card-text">4/27/2024</p>
        <p class="card-text">Dr. Abraham Aldaco</p>
        <p class="card-text">"Welcome to our vibrant MERN website, where we showcase the power of CRUD operations – Create, Read, Update, and Delete. Dive into the seamless blend of style and functionality, crafted with meticulous attention to detail. We invite you to explore and experience the culmination of our hard work and passion. Enjoy your journey!"</p>
      </div>
    </div>
  </div>
</div>
</div>




</div>
    )

  }

  const PostUser = () => {
      
    // Define HOOKS
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      user_id: '',
      first_name: '',
      last_name: '',
      password: '',
      phone_number: '',
      email: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      const [fieldName, nestedFieldName] = name.split('.');
      
      console.log(nestedFieldName);
    
      if (nestedFieldName && formData[fieldName]) {
        setFormData(prevState => ({
          ...prevState,
          [fieldName]: {
            ...prevState[fieldName],
            [nestedFieldName]: value
          }
        }));
        console.log(value);
      } else {
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        
        console.log(value);
      }
    };


    const [users, setUsers] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8081/users")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show All Users:", data);
          setUsers(data);
        });
    }, []);
    

    
  
        const parsedFormData = {
          ...formData,
          user_id: users.length + 1,
          phone_number: parseInt(formData.phone_number)
        };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value);
      console.log(JSON.stringify(parsedFormData));
      fetch("http://localhost:8081/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedFormData),
      
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert("User added successfully!");
          window.location.href = '/';
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding User:" + error.message);
        });
    }; 
  
    return(
      <div>
  
  {/* HEADER */}
        <div class="bg-danger mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deleteuser")}>Delete User</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postuser")}>Create User</button> 
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}
  
        {/* Form to input data */}
        <form class="mx-5" onSubmit={handleSubmit}>
          <h1 >Create New User:</h1>

          <div className="mb-3">
            <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
          </div>

          <div className="mb-3">
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          </div>

          <div className="mb-3">
            <input type="tel" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" pattern="[0-9]{10}" title="Phone number must be 10 digits long" required />
          </div>

          <div className="mb-3">
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Please enter a valid email address" required />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>);
    
  }

  const DeleteUser = () => {
    // Define HOOKS
    const [user, setUser] = useState([{
      user_id: '',
      first_name: '',
      last_name: '',
      password: '',
      phone_number: '',
      email: ''
    }]);

    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      fetch("http://localhost:8081/users")
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          console.log("Load initial Catalog of Users in DELETE :", data);
        });
    }, []);

    function getOneByOneProductNext() {
      if (user.length > 0) {
        if (index === user.length - 1) setIndex(0);
        else setIndex(index + 1);
      }
    }

    function getOneByOneProductPrev() {
      if (user.length > 0) {
        if (index === 0) setIndex(user.length - 1);
        else setIndex(index - 1);
      }
    }

    const deleteOneProduct = (id) => {
      console.log("Product to delete :", id);
      fetch("http://localhost:8081/users/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animal_id: id }),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Delete a User completed : ", id);
          console.log(data);
          const newProducts = user.filter((user) => user.id !== id);
          setUser(newProducts);
          setIndex(0);
          if (data) {
            const key = Object.keys(data);
            const value = Object.values(data);
            alert("User Deleted");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding User:" + error.message);
        });
    };
    // return
    return (
      <div>

   {/* HEADER */}
        <div class="bg-danger mb-5">
          <div className="d-flex justify-content-center">
          <h1 class="text-white">Schmitz Sales</h1>
            <div class="btn-group d-flex ms-3">
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/")}>Home</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/deleteuser")}>Delete User</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/postuser")}>Create User</button>
              <button class="btn btn-outline-light my-2" onClick={() => navigate("/studentinfo")}>Student Info</button>
            </div>
          </div>
        </div>
        {/* HEADER */}
        
        

        {/* Buttons to simulate carousel */}
        <h1 class="ms-5">Delete One Product:</h1>

        <div className="btn-group mb-3 me-3 ms-5">
          <button className="btn btn-outline-secondary" onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button className="btn btn-outline-secondary" onClick={() => getOneByOneProductNext()}>Next</button>
        </div>

        <button class="btn btn-danger mb-3" onClick={() => deleteOneProduct(user[index].user_id)}>Delete</button>

        {/* Show user properties, one by one */}
        <div className="container-fluid"> 
           
        <div className={`card mx-4 d-flex flex-column h-100 p-2`}>
                
          
              <div className="card-body d-flex flex-column justify-content-end">
                <h5 className="card-title">Farmer: {user[index].first_name} {user[index].last_name} </h5>
                <h4 className="card-title">Email: {user[index].email}</h4>
                 
              </div>
            </div>
          </div>
        </div>
      
    );
  }


  return (
    <Router>
      <Routes>
        <Route path="/postuser" element={<PostUser />} />
        <Route path="/deleteuser" element={<DeleteUser />} />
        <Route path="/putlivestock/:id" element={<PutLivestockID />} />
        <Route path="/putlivestock" element={<PutLivestock />} />
        <Route path="/deletelivestock" element={<DeleteLivestock />} />
        <Route path="/postlivestock" element={<PostLivestock />} />
        <Route path="/getlivestockspecies" element={<GetLivestockSpecies />} />
        <Route path="/getlivestockuserid" element={<GetLivestockUserID />} />
        <Route path="/getlivestockid" element={<GetLivestockID />} />
        <Route path="/getlivestock" element={<GetLivestock />} />
        <Route path="/studentinfo" element={<StudentInfo />} />




        <Route path="/" element={<HomeScreen />} /> {/* Default view */}
      </Routes>
    </Router>
  );
}


export default App;
