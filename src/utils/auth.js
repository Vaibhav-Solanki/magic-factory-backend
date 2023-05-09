export default function (resolver, realm, module) {
  return (agr) => {
    console.log(realm, module)
    return resolver(agr)
  }
}
