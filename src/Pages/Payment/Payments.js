import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payments() {
	const [cardError, setCardError] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [{ basket, user }, dispatch] = useContext(DataContext);
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	// console.log(basket);
	const totalItem = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);

	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);

	const handelChange = (e) => {
		e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
	};

	const handelPayment = async (e) => {
		e.preventDefault();
		try {
			setProcessing(true);
			//1.backend || function ....>contact to the client secret
			const response = await axiosInstance({
				method: "post",
				url: `/payment/create?total=${total * 100}`,
			});

			// console.log(response.data);
			const clientSecret = response.data?.clientSecret;
			//2. client side (react side confirmation)
			const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: { card: elements.getElement(CardElement) },
			});

	
			//3. after the confirmation .....> order firestore database save, clear basket

			await db
				.collection("users")
				.doc(user.uid)
				.collection("orders")
				.doc(paymentIntent.id)
				.set({
					basket: basket,
					amount: paymentIntent.amount,
					create: paymentIntent.created,
				});
			//empty the basket
			dispatch({
				type: Type.EMPTY_BASKET,
			});
			setProcessing(false);
			navigate("/orders", { state: { msg: "you have placed new Order" } });
		} catch (error) {
			console.log(error);
			setProcessing(false);
		}
	};

	return (
		<LayOut>
			{/* header */}
			<div className={classes.payment__header}>Checkout ({totalItem}) item</div>
			<hr />
			{/* payment method */}
			<section className={classes.Payment}>
				{/* address */}
				<div className={classes.flex}>
					<h3>Shipping address </h3>
					<div>
						<div>{user?.email}</div>
						<div>Nifas Silk</div>
						<div>Saris</div>
					</div>
				</div>
				<hr />
				{/* product */}
				<div className={classes.flex}>
					<h3> Review items and shipping</h3>
					<div>
						{basket?.map((item) => (
							<ProductCard key={item.id} product={item} flex={true} />
						))}
					</div>
				</div>
				<hr />
				{/* card information */}
				<div className={classes.flex}>
					<h3>Payment methods </h3>
					<div className={classes.payment__card__container}>
						<div className={classes.payment__details}>
							<form action="" onSubmit={handelPayment}>
								{/* error */}
								{cardError && (
									<small style={{ color: "red" }}>{cardError}</small>
								)}
								{/* card element */}
								<CardElement onChange={handelChange} />

								{/* price */}
								<div className={classes.payment__price}>
									<div>
										<span style={{ display: "flex", gap: "10px" }}>
											<p>Total Order |</p> <CurrencyFormat amount={total} />
										</span>
									</div>
									<button type="submit">
										{processing ? (
											<div className={classes.loading}>
												<ClipLoader color="gray" size={12} />
												<p>Please Wait</p>
											</div>
										) : (
											"Pay Now"
										)}
									</button>
								</div>
							</form>
						</div>
						<div></div>
						<div></div>
					</div>
				</div>
			</section>
		</LayOut>
	);
}

export default Payments;
