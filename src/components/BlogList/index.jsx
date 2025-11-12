// src/components/BlogList.js
import React from "react";

/**
 * Composant pour afficher la liste des articles.
 * Il reçoit:
 * - posts: La liste des articles récupérée depuis l'API.
 * - onSelectPost: La fonction pour changer l'état dans App.js et afficher l'article unique.
 */
function BlogList({ posts, onSelectPost }) {
  return (
    <section className="blog-list-container">
      <h1>Derniers Articles du Blog</h1>
      {posts.map((post) => (
        <article key={post.id} className="post-summary">
          {/* Titre */}
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

          {/* Extrait */}
          <div
            className="post-excerpt"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />

          {/* Bouton/Lien pour voir l'article complet */}
          {/* En cliquant, on appelle la fonction onSelectPost avec l'ID de l'article */}
          <button
            onClick={() => onSelectPost(post.id)}
            className="read-more-button"
          >
            Lire la suite &rarr;
          </button>

          <hr />
        </article>
      ))}
    </section>
  );
}

export default BlogList;
