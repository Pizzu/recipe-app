import { useState } from 'react';
import { sanityClient, urlFor, usePreviewSubscription, PortableText } from '../../lib/sanity'

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  mainImage,
  ingredients[] {
    _key,
    wholeNumber,
    unit,
    ingredient -> {
      name
    }
  },
  instructions,
  likes
}`


export default function RecipePage({ data, preview }) {

  // if we want to have a live preview from the sanity editor
  // const { data: recipe } = usePreviewSubscription(recipeQuery, {
  //   params: { slug: data.recipe?.slug.current },
  //   initialData: data,
  //   enabled: preview
  // })

  const { recipe } = data

  const [likes, setLikes] = useState(data?.recipe?.likes)

  const addLike = async () => {
    const res = await fetch('/api/handle-like', {
      method: 'POST',
      body: JSON.stringify({ _id: recipe._id }),
    }).catch((error) => console.log(error))

    const data = await res.json()
    setLikes(data.likes)
  }

  return (
    <article className="recipe">
      <h1>{recipe.name}</h1>

      <button className="like-button" onClick={addLike}>
        {likes} ❤️
      </button>

      <div className="content">
        <img src={urlFor(recipe?.mainImage).url()} alt={recipe.name} />
        <div className="breakdown">
          <ul className="ingredients">
            {recipe.ingredients?.map((ingredient) => (
              <li key={ingredient._key} className="ingredient">
                {ingredient?.wholeNumber}
                {ingredient?.unit}
                <br />
                {ingredient?.ingredient?.name}
              </li>
            ))}
          </ul>
          <PortableText
            blocks={recipe?.instructions}
            className="instructions"
          />
        </div>
      </div>
    </article>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params

  const recipe = await sanityClient.fetch(recipeQuery, { slug })

  if (!recipe) {
    return {
      notFound: true
    }
  }

  return { props: { data: { recipe }, preview: true } };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == recipe && defined(slug.current)]{
      "params": {
        "slug": slug.current
      }
    }`
  )

  return {
    paths,
    fallback: 'blocking'
  }

}
