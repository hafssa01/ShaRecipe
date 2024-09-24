import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Controller function to add a new recipe
exports.addRecipe = async (req, res) => {
  try {
    const { title, category, ingredients, prepTime, cookTime } = req.body;

    // Validate request data here (similar to React form validation)

    // Save the recipe in the database using Prisma
    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        category,
        ingredients,
        prepTime: parseInt(prepTime),
        cookTime: parseInt(cookTime),
      },
    });

    res.status(201).json({ success: true, data: newRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Controller function to get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
