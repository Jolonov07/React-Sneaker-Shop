import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useState } from 'react'
import '../../index.scss'

const Header = props => {
	const { totalPrice } = useCart()
	const [navbar, setNavbar] = useState(false)

	const changeBacground = () => {
		if (window.scrollY > 1) {
			setNavbar(true)
		} else {
			setNavbar(false)
		}
	}

	window.addEventListener('scroll', changeBacground)

	return (
		<header
			className={
				navbar
					? 'd-flex justify-between align-center header active'
					: 'd-flex justify-between align-center header'
			}
		>
			<Link to='/' className='links-logo'>
				<div className='d-flex align-center'>
					<img
						width={100}
						height={100}
						src='img/logo-sneakers.png'
						alt='Logotype'
						className='logo'
					/>
					<div>
						<h3 className='text-uppercase'>MY МАГАЗИН</h3>
						<p className=''>Магазин модных кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className='d-flex'>
				<li onClick={props.onClickCart} className='mr-30 cu-p'>
					<img
						width={22}
						height={22}
						src='img/cart.svg'
						alt='Корзина'
						className='icons'
					/>
					<span>{totalPrice} руб.</span>
				</li>
				<li className='mr-20 cu-p'>
					<Link to='/favorites'>
						<img
							width={22}
							height={22}
							src='img/heart.svg'
							alt='Закладки'
							className='icons'
						/>
					</Link>
				</li>
				<li>
					<Link to='/orders'>
						<img
							width={22}
							height={22}
							src='img/user.svg'
							alt='Пользователь'
							className='icons'
						/>
					</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header
