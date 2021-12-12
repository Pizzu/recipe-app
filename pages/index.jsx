import Link from "next/link"
import Image from "next/image"
import Metatags from "../components/Metatags"
import { sanityClient, urlFor } from '../lib/sanity'

const recipesQuery = `*[_type == "recipe"] {
  _id,
  name,
  slug,
  mainImage
}`

export default function Home({ recipes }) {
  return (
    <>
      <Metatags />

      <h1>Welcome to Fast Fridge</h1>

      <ul className="recipes-list">
        {recipes?.length > 0 && recipes.map((recipe) => (
          <li key={recipe._id} className="recipe-card">
            <Link href={`/recipes/${recipe.slug.current}`} passHref>
              <a>
                <div className="recipe-card__img">
                  <Image src={urlFor(recipe.mainImage).url()} alt={recipe.name} layout="fill"/>
                </div>
                <span>{recipe.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps(context) {
  const recipes = await sanityClient.fetch(recipesQuery)

  return {
    props: {
      recipes
    }
  }
}