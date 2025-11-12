// src/components/BlogPost.jsx

import React, { useState, useEffect } from "react";

// REMPLACER par l'URL de base de votre API WordPress
const BASE_API_URL =
  "https://mohamed-amine-namasse.students-laplateforme.io/wordpress-6.8.3/wordpress/wp-json/wp/v2/posts";

// URL de base pour les médias (dérivée de BASE_API_URL en remplaçant '/posts' par '/media')
const MEDIA_API_URL = BASE_API_URL.replace("/posts", "/media");

/**
 * Affiche un article de blog unique en utilisant l'ID.
 * Reçoit 'postId' (ID de l'article) et 'onBack' (fonction de retour) en props.
 */
function BlogPost({ postId, onBack }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // NOUVEAU: État pour stocker l'URL de l'image de mise en avant
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer l'article unique et son image
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        setFeaturedImageUrl(null); // Réinitialiser l'URL pour le nouvel article

        // 1. Récupérer l'article spécifique
        const postResponse = await fetch(`${BASE_API_URL}/${postId}`);

        if (!postResponse.ok) {
          throw new Error(`Erreur HTTP: ${postResponse.status}`);
        }

        const postData = await postResponse.json();
        setPost(postData);

        // 2. Vérifier et récupérer l'image mise en avant
        const mediaId = postData.featured_media;

        if (mediaId && mediaId > 0) {
          // Effectuer la requête vers l'endpoint des médias
          const mediaResponse = await fetch(`${MEDIA_API_URL}/${mediaId}`);

          if (mediaResponse.ok) {
            const mediaData = await mediaResponse.json();
            // L'URL de l'image est généralement dans 'source_url'
            setFeaturedImageUrl(mediaData.source_url);
          } else {
            console.error(
              `Erreur lors de la récupération du média ID ${mediaId}: ${mediaResponse.status}`
            );
          }
        }

        setLoading(false);
      } catch (err) {
        setError(`Erreur lors de la récupération: ${err.message}`);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]); // L'effet s'exécute lorsque l'ID de l'article change

  // --- RENDU DU COMPOSANT ---

  if (loading) {
    return <p>Chargement de l'article...</p>;
  }

  if (error) {
    return <p className="error">Erreur : {error}</p>;
  }

  if (!post) {
    return <p>Article introuvable.</p>;
  }

  // Préparer le titre et le contenu pour l'affichage (avec dangerouslySetInnerHTML)
  const title = post.title.rendered;
  const content = { __html: post.content.rendered };

  return (
    <div className="blog-post-detail">
      <button onClick={onBack} className="back-button">
        Retour à la liste des articles
      </button>

      <h1>{title}</h1>

      {/* Affichage de l'image de mise en avant */}
      {featuredImageUrl && (
        <figure className="featured-image">
          <img src={featuredImageUrl} alt={`Image à la une pour ${title}`} />
        </figure>
      )}

      {/* Affichage du contenu HTML de WordPress */}
      <div className="post-content" dangerouslySetInnerHTML={content} />
    </div>
  );
}

export default BlogPost;
