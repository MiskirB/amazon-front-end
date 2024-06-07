import React, { useContext, useState } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loding, setLoding] = useState({
		signin: false,
		signup: false,
	});
	const [{ user }, dispatch] = useContext(DataContext);
	const navigate = useNavigate();
	const navStateData = useLocation();

	// console.log(user)
	// console.log(password, email)
	const authHandeler = async (e) => {
		e.preventDefault();

		// console.log(e.target.name)
		if (e.target.name == "signin") {
			setLoding({ ...loding, signin: true });
			//firebase auth
			signInWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					console.log(userInfo);
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setLoding({ ...loding, signin: false });
					navigate(navStateData?.state?.redirect || "/");
				})
				.catch((err) => {
					console.log(err);
					setError(err.message);
					setLoding({ ...loding, signup: false });
				});
		} else {
			setLoding({ ...loding, signup: true });

			createUserWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					// console.log(userInfo)
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setLoding({ ...loding, signup: false });
					navigate(navStateData?.state?.redirect || "/");
				})
				.catch((err) => {
					console.log(err);
					setError(err.message);
					setLoding({ ...loding, signup: false });
				});
		}
	};
	return (
		<div className={classes.login}>
			<Link to="/">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
					alt="amazon logo"
				/>
			</Link>
			<div className={classes.login__container}>
				<h1>Sign In</h1>
				{navStateData?.state?.message && (
					<small
						style={{
							padding: "5px",
							textAlign: "center",
							color: "red",
							fontWeight: "bold",
						}}
					>
						{navStateData?.state?.message}
					</small>
				)}
				<form action="">
					<div>
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
						/>
					</div>
					<button
						type="submit"
						name="signin"
						onClick={authHandeler}
						className={classes.login__signInButton}
					>
						{loding.signin ? <ClipLoader color="#ffff" /> : " Sign In"}
					</button>
				</form>
				<p>
					By signing-in you agreed to the AMAZON FAKE CLONE Condition of Use &
					Sale. Please see our Privacy Notice, our Cookies Notice and our
					Interest-Based Ads Notice
				</p>
				<button
					type="submit"
					name="signup"
					onClick={authHandeler}
					className={classes.login__registerButton}
				>
					{loding.signup ? (
						<ClipLoader color="#ffff" />
					) : (
						" Create your Amazon Account"
					)}
				</button>
				{error && (
					<small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
				)}
			</div>
		</div>
	);
}

export default Auth;
