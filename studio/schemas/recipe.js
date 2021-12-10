const recipeSchema = {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Recipe Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'chef',
      title: 'Chef',
      type: 'reference',
      to: {
        type: 'chef'
      }
    },
    {
      name: 'mainImage',
      title: 'Recipe Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'ingredient',
              title: 'Ingredient',
              type: 'reference',
              to: [{type: 'ingredient'}]
            },
            {
              name: 'wholeNumber',
              title: 'Whole Number',
              type: 'number'
            },
            {
              name: 'unit',
              title: 'Unit',
              type: 'string',
              options: {
                list: ['g', 'kg', 'l', 'ml']
              }
            }
          ],
          preview: {
            select: {
              title: 'ingredient.name',
              name: 'ingredient.name',
              media: 'ingredient.image',
              wholeNumber: 'wholeNumber',
              unit: 'unit'
            },
            prepare({title, media, wholeNumber = '(No whole number set)', unit = '(No unit set)'}) {
              return {
                title,
                subtitle: `${wholeNumber} ${unit}`,
                media
              }
            }
          }
        }
      ]
    },
    {
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
}

export default recipeSchema