import fs from 'fs'
import path from 'path'

const getDir = (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err)
        reject(err)
        return
      }

      // Filter out only the directories
      const folderNames = files
        .filter((file) => file.isDirectory())
        .map((folder) => folder.name)
      resolve(folderNames)
    })
  })
}

// Function to fetch resolvers from all modules
export async function resolvers () {
  const cwd = path.join(process.cwd(), 'src', 'realm')
  const realms = await getDir(cwd)

  return await realms.reduce(async (acc, realm) => {
    acc[realm] = {}
    const modulesDir = path.join(cwd, realm)
    const modules = await getDir(modulesDir)
    for (const module of modules) {
      acc[realm][module] = { Mutation: {}, Query: {} }
      const mutationDir = path.join(modulesDir, module, 'mutation')
      const mutations = fs.readdirSync(mutationDir)
      for (const mutation of mutations) {
        const resolver = await import(path.join(mutationDir, mutation))
        acc[realm][module].Mutation = { ...resolver, ...(acc[realm][module].Mutation) }
      }
      const queryDir = path.join(modulesDir, module, 'query')
      const queries = fs.readdirSync(queryDir)
      for (const query of queries) {
        const resolver = await import(path.join(queryDir, query))
        acc[realm][module].Query = { ...resolver, ...(acc[realm][module].Query) }
      }
    }
    return acc
  }, {})
}
