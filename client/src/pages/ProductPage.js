// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, useEffect } from "react"; 
import { useParams, Link } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState({}); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();

  useEffect(() => { 
    const token = localStorage.getItem("token"); 
    if (token) { 
        setIsLoggedIn(true); 
    } 
    fetch(`http://localhost:8000/product/${id}`) 
    .then((response) => response.json()) 
    .then((data) => setProduct(data.book)) 
    .catch((error) => console.error("Error fetching book data:", error)); 
}, [id]);

    if (!product || Object.keys(product).length===0){
        return <div>Loading...</div>
    }

    return(
        <div className="book-container-book"> 
            <h1 className="book-title">{book.title}</h1> 
            <h5 className="book-author">Written by {book.author}</h5> 
            <div className="book-details">
                <p>Rating: {book.rating}</p> 
                <p>Pages: {book.pages}</p> 
                <label>Genres:</label> 
                <ul> 
                    {book.genres.map((genre) => ( 
                    <li key={genre}>{genre}</li> 
                    ))} 
                </ul> 
            </div> 
            <div className="book-btn-container"> 
            {isLoggedIn && ( 
                <div> 
                    <Link 
                    className="book-btn edit-book-btn" 
                    to={`/book/edit/${book._id}`} 
                    > 
                    Edit Book 
                    </Link> 
                    <button 
                        className="book-btn delete-book-btn" 
                        data-id={book._id} 
                        onClick={handleDelete} 
                        > 
                        Delete Book 
                    </button> 
                </div> )} 
            </div> 
        </div>
    )
};
  
  export default Product;