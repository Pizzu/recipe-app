export default function Home({ recipes }) {
  return (
    <main>
      <h1>{recipes[0].title}</h1>
    </main>
  )
}

export function getStaticProps(context) {
  return {
    props: {
      recipes: [{title: 'Pineapple Smoothie'}]
    }
  }
}