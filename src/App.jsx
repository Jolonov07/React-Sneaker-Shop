import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import Drawer from './components/Drawer'
import AppContext from './context'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'
import React from 'react'
// import { gsap } from 'gsap' 
import Swiper from './components/Swiper'

const App = () => {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  // let tl = gsap.timeline()
  //  let cursor = useRef(null)
  //  let posX = 0
  //  let posY = 0
  //  let mouseX = 0
  //  let mouseY = 0
   
  React.useEffect(() => {
    // tl.to({}, 0.016, {
    //   repeat: -1,
    //   onRepeat: function() {
    //     posX += (mouseX - posX) / 9
    //     posY += (mouseY - posY) / 9
  
    //     tl.set(cursor, {
    //       css: {
    //       left: posX - 1,
    //       top: posY - 1
    //       }
    //     })
    //   }
    // })
    // document.addEventListener("mousemove", (e) => {
    //   mouseX = e.pageX
    //   mouseY = e.pageY
    // })
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://631222c4f5cba498da8d43d6.mockapi.io/card'),
          axios.get('https://631222c4f5cba498da8d43d6.mockapi.io/favorites'),
          axios.get('https://631222c4f5cba498da8d43d6.mockapi.io/items'),
        ])

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных ;(')
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://631222c4f5cba498da8d43d6.mockapi.io/card/${findItem.id}`)
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://631222c4f5cba498da8d43d6.mockapi.io/card', obj)
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          }),
        )
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://631222c4f5cba498da8d43d6.mockapi.io/card/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
    } catch (error) {
      alert('Ошибка при удалении из корзины')
      console.error(error)
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://631222c4f5cba498da8d43d6.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post(
          'https://631222c4f5cba498da8d43d6.mockapi.io/favorites',
          obj,
        )
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Header onClickCart={() => setCartOpened(true)} />
        {/* <div className="cursor-react" ref={el => cursor = el} ></div> */}
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Routes>
        <Route path="/" exact element={ <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading} />} 
        />
        <Route path="favorites" exact element={ <Favorites />} />
        <Route path="orders" exact element={ <Orders />} />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default App
