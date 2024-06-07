import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

const Header = () => {
	const [{ user, basket }, dispatch] = useContext(DataContext);
	// console.log(basket.length)
	const totalItem = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);

	return (
		<section className={classes.fixed}>
			<section className={classes.header__container}>
				<div className={classes.logo__container}>
					{/* log */}
					<Link to="/">
						<img
							src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
							alt="amazon log"
						/>
					</Link>
					{/* delivery */}
					<div className={classes.delivery}>
						<span>
							<SlLocationPin />
						</span>
						<div>
							<p>Deliver to</p>
							<span>Nifas Silk Lafto, Ethiopia</span>
						</div>
					</div>
				</div>
				<div className={classes.search}>
					{/* search */}
					<select name="" id="">
						<option value="">All</option>
					</select>
					<input type="text" name="" id="" placeholder="search product" />
					{/* search icon */}
					<BsSearch size={38} />
				</div>
				{/* right side link */}
				<div className={classes.order__container}>
					<Link to="" className={classes.language}>
						<img
							src="https://img.freepik.com/free-vector/illustration-usa-flag_53876-18165.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=ais_user"
							alt=""
						/>
						<select>
							<option value="">EN</option>
						</select>
					</Link>
					<Link to={!user && "/auth"}>
						<div>
							{user ? (
								<>
									<p>Hello {user?.email?.split("@")[0]}</p>
									<span onClick={() => auth.signOut()}>Sign Out</span>
								</>
							) : (
								<>
									<p> Hello, Sign In</p>
									<span>Account & Lists</span>
								</>
							)}
						</div>
					</Link>
					<Link to="/orders">
						<p>returns</p>
						<span>& Orders</span>
					</Link>
					<Link to="/cart" className={classes.cart__main}>
						<div className={classes.cart}>
							<span className={classes.cart__span}>{totalItem}</span>
							<BiCart size={35} />
						</div>
						<span className={classes.cart__name}>Cart</span>
					</Link>
				</div>
			</section>
			<LowerHeader />
		</section>
	);
};

export default Header;
