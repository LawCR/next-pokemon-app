import { pokeApi } from "../api"
import { Pokemon } from "../interfaces"

export const getPokemonInfo = async(nameOrId: string) => {

    const nameMin = nameOrId.toLocaleLowerCase()
    
    try {
        const {data} = await pokeApi.get<Pokemon>(`/pokemon/${nameMin}`)

        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites
        }
    } catch (error) {
        return null
    }
}