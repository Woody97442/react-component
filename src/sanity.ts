// sanity.js
import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'sav6siqx',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-11-06', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})


export async function getCategories() {
    const Categorie = await client.fetch('*[_type == "categories"]{name}')
    return Categorie
}

export async function getSubCategories() {
    const SubCategorie = await client.fetch(`*[_type == "sub-categories"]
    {name,href,"refCat":Categories->name}`)
    return SubCategorie
}