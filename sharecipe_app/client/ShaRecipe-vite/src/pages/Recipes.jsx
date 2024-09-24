// src/pages/Recipes.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h1>Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {recipes.map(recipe => (
            <Col key={recipe.id}>
              <Card>
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{recipe.category}</Card.Subtitle>
                    <Card.Text>
                        <strong>Prep Time:</strong> {recipe.prepTime} minutes<br />
                        <strong>Cook Time:</strong> {recipe.cookTime} minutes<br />
                        <strong>Ingredients:</strong><br />
                        <ul>
                        {recipe.ingredients.split(', ').map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                        </ul>
                    </Card.Text>
                    <Link to={`/recipes/${recipe.id}`} className="btn btn-primary">View Details</Link>
              </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Recipes;
