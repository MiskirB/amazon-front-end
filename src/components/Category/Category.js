import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryInfo } from "./CategoryFullinfos";
import classes from './Category.module.css'
function Category() {
	return (
		<div className={classes.category__container}>
			{categoryInfo.map((infos) => (
				<CategoryCard data={infos} />
			))}
		</div>
	);
}

export default Category;
