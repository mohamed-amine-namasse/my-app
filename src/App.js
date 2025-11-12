import React, { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import Navbar from "./components/Navbar";
import "./App.css";

const API_URL =
  "https://mohamed-amine-namasse.students-laplateforme.io/wordpress-6.8.3/wordpress/wp-json/wp/v2/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    // 1. Récupération de la liste des articles avec fetch()
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);

        // Vérifie si la réponse est OK (statut 200-299)
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json(); // Convertit la réponse en JSON
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(`Erreur lors de la récupération des articles: ${err.message}`);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    window.scrollTo(0, 0);
  };
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <header className="navbar-container">
        <Navbar onBackToList={handleBackToList} />
      </header>
      <main>
        {selectedPostId ? (
          <BlogPost postId={selectedPostId} onBack={handleBackToList} />
        ) : (
          <BlogList posts={posts} onSelectPost={handleSelectPost} />
        )}
      </main>
      <footer className="footer-container">
        <div className="footer-content">
          <p>
            &copy; {currentYear} Mon Blog WordPress / React. Tous droits
            réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
