// src/components/BlogPost.jsx

import React, { useState, useEffect } from "react";

// REMPLACER par l'URL de base de votre API WordPress
const BASE_API_URL =
  "https://mohamed-amine-namasse.students-laplateforme.io/wordpress-6.8.3/wordpress/wp-json/wp/v2/posts";

/**
 * Affiche un article de blog unique en utilisant l'ID.
 * Reçoit 'postId' (ID de l'article) et 'onBack' (fonction de retour) en props.
 */
function BlogPost({ postId, onBack }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer l'article unique
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Construire l'URL pour l'article spécifique : .../wp/v2/posts/123
        const response = await fetch(`${BASE_API_URL}/${postId}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(`Erreur lors de la récupération de l'article: ${err.message}`);
        setLoading(false);
      }
    };

    fetchPost();
    // Le tableau de dépendances garantit que l'appel est relancé si l'ID change
  }, [postId]);

  if (loading) {
    return <p className="loading-message">Chargement de l'article...</p>;
  }

  if (error) {
    return (
      <p className="error-message" style={{ color: "red" }}>
        Erreur: {error}
      </p>
    );
  }

  if (!post) {
    return null; // Ne rien afficher si l'article est chargé mais vide
  }

  return (
    <article className="blog-post-detail">
      <button onClick={onBack} className="back-button">
        &larr; Retour à la liste des articles
      </button>

      {/* Titre */}
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

      {/* Contenu complet */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <button onClick={onBack} className="back-button bottom-button">
        &larr; Retour à la liste des articles
      </button>
    </article>
  );
}

export default BlogPost;
