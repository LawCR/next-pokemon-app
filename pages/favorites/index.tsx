import { FC, useState, useEffect } from 'react';
import { Layout } from '../../components/layouts'
import { FavoritePokemons } from '../../components/pokemon';
import { Nofavorites } from '../../components/ui'
import { localFavorites } from '../../utils';

const FavoritesPage: FC = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])
  
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons)
  }, [])
  
  
  return (
    <Layout title='Pokemons - Favoritos'>

        {
          favoritePokemons.length === 0
          ? ( <Nofavorites /> )
          : ( <FavoritePokemons pokemons={favoritePokemons} /> )
        }
        
    </Layout>
  )
}

export default FavoritesPage