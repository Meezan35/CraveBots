import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { query } = await req.json();

  const prompt = `You are a food search assistant. The user typed: "${query}"

Return a JSON object with these fields:
{
  "tags": [],
  "dietary": [],
  "dietaryType": "",
  "mainIngredients": [],
  "spiceLevel": "",
  "excludeCategories": []
}

CRITICAL RULES:
1. **Dietary Type Priority**: If user mentions "vegetarian", "vegan", or "non-vegetarian", this is the MOST IMPORTANT filter
   - For "chicken", "mutton", "fish", "meat" queries: dietaryType = "non-vegetarian"
   - For "vegetarian" queries: dietaryType = "vegetarian" 
   - For "vegan" queries: dietaryType = "vegan"

2. **Main Ingredients**: Extract the primary food items mentioned
   - Examples: ["chicken"], ["paneer"], ["lentils"], ["vegetables"]

3. **Tags**: Include descriptive keywords like 'chicken', 'spicy', 'creamy', 'curry', 'gravy', 'red sauce'

4. **Dietary**: Must be from ['vegan', 'vegetarian', 'gluten-free', 'dairy-free']

5. **Spice Level**: 
   - "Mild" for "not spicy", "not too spicy", "mild"
   - "Medium" for "moderate spice", "medium spicy"  
   - "Hot" for "very spicy", "fiery", "angara", "extra spicy"

6. **Exclude Categories**: If user wants savory dishes with sauce/gravy, add "dessert" to exclude desserts

Examples:
- "chicken gravy red color" → dietaryType: "non-vegetarian", mainIngredients: ["chicken"], tags: ["chicken", "gravy", "red sauce"]
- "vegetarian creamy sauce" → dietaryType: "vegetarian", tags: ["vegetarian", "creamy", "sauce"], excludeCategories: ["dessert"]
- "vegan spicy food" → dietaryType: "vegan", tags: ["vegan", "spicy"]

Output must be **valid JSON only**`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1, // Lower temperature for more consistent results
    });

    const content = completion.choices[0].message?.content?.trim();
    const parsed = JSON.parse(content || '{}');
    
    return NextResponse.json(parsed);
  } catch (err) {
    console.error('OpenAI error:', err);
    return NextResponse.json({ error: 'AI failed to parse search' }, { status: 500 });
  }
}