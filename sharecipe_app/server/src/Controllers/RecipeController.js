//This will define the controller methods for handling recipe-related requests
//such as getAllRecipes, getRecipeById, createRecipe, updateRecipe, and deleteRecipe.
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class RecipeController {
  // Get all recipes
  async getAllRecipes(req, res) {
    try {
      const recipes = await prisma.recipe.findMany();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipes' });
    }
  }

  // Get recipe by ID
  async getRecipeById(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID' });
    }

    try {
      const recipe = await prisma.recipe.findUnique({ where: { id } });
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipe' });
    }
  }

  // Create a new recipe
  async createRecipe(req, res) {
    const { title, category, ingredients, prepTime, cookTime } = req.body;

    // Validate required fields
    if (!title || !ingredients || !prepTime || !cookTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const recipe = await prisma.recipe.create({
        data: { title, category, ingredients, prepTime, cookTime }
      });
      res.status(201).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Error creating recipe' });
    }
  }

  // Update an existing recipe
  async updateRecipe(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID' });
    }

    const { title, category, ingredients, prepTime, cookTime } = req.body;

    try {
      const recipe = await prisma.recipe.update({
        where: { id },
        data: { title, category, ingredients, prepTime, cookTime }
      });
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Error updating recipe' });
    }
  }

  // Delete a recipe
  async deleteRecipe(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID' });
    }

    try {
      await prisma.recipe.delete({ where: { id } });
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting recipe' });
    }
  }
}

export default new RecipeController();
