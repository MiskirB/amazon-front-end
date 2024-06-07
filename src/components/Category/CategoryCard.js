import React from "react";
import classes from "./Category.module.css"
import {Link} from 'react-router-dom'
function CategoryCard({ data }) {
	return (
		<div className={classes.category}>
			<Link to={`/category/${data.name}`}>
				<span>
					<h1>{data.title}</h1>
				</span>
				<img src={data.imgLink} alt="" />
				<p>shop now</p>
			</Link>
		</div>
	);
}

export default CategoryCard;
