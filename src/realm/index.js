import fs from 'fs'
import path from 'path'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadSchema } from '@graphql-tools/load'
import { typeDefs } from './app/delivery/schema.js'

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
export async function fetchResolvers (authWrapper) {
  const cwd = path.join(process.cwd(), 'src', 'realm')
  const realms = await getDir(cwd)

  return await realms.reduce(async (acc, realm) => {
    const modulesDir = path.join(cwd, realm)
    const modules = await getDir(modulesDir)
    for (const module of modules) {
      const mutationDir = path.join(modulesDir, module, 'mutation')
      const mutations = fs.readdirSync(mutationDir)
      for (const mutation of mutations) {
        const key = mutation.split('.')[0]
        const resolver = (await import(path.join(mutationDir, mutation))).default
        acc.Mutation[key] = authWrapper(resolver, realm, module)
      }
      const queryDir = path.join(modulesDir, module, 'query')
      const queries = fs.readdirSync(queryDir)
      for (const query of queries) {
        const key = query.split('.')[0]
        const resolver = (await import(path.join(queryDir, query))).default
        acc.Query[key] = authWrapper(resolver, realm, module)
      }
    }
    return acc
  }, { Mutation: {}, Query: {} })
}

export async function fetchSchema () {
  const cwd = path.join(process.cwd(), 'src', 'realm')
  const realms = await getDir(cwd)

  return await realms.reduce(async (acc, realm) => {
    const modulesDir = path.join(cwd, realm)
    const modules = await getDir(modulesDir)
    for (const module of modules) {
      const schemaDir = path.join(modulesDir, module, 'schema.js')
      const { typeDefs } = await import(schemaDir)
      acc = mergeTypeDefs([acc, typeDefs])
    }
    return acc
  }, '')
}
