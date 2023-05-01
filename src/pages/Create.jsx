import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';
import RecipeSteps from '../components/RecipeSteps';

export default function Create() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const ingredients = JSON.parse(localStorage.getItem('ingredients'));
    const [steps, setSteps] = useState([]);
    const products = ingredients.map(ingredient => {
        return ingredient.name;
    });
    let navigate = useNavigate();

    const getRecipe = event => {
        const name = event.target.textContent;
        setIsLoading(true);

        axios
            .post('/recipe/make', {
                products: products.join(', '),
                recipe: name,
            })
            .then(response => {
                setIsLoading(false);
                let data = JSON.parse(response.data.message.choices[0].text);

                setSteps(data);
            })
            .catch(err => {
                setIsLoading(false);
                setIsError(true);
            });
    };

    useEffect(() => {
        if (ingredients.length < 5) {
            navigate('/');
        }

        axios
            .post('/recipe/list', {
                products: products.join(', '),
            })
            .then(response => {
                setIsLoading(false);
                setRecipes(JSON.parse(response.data.message.choices[0].text));
            })
            .catch(err => {
                setIsLoading(false);
                setIsError(true);
            });
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center p-10">
                    <Watch
                        height="80"
                        width="80"
                        radius="48"
                        color="white"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </div>
            ) : (
                <>
                    {steps.length > 0 && <RecipeSteps steps={steps} />}
                    <div>
                        {isError ? (
                            <h1 className="text-xl font-bold text-center">
                                There was an error please go back!
                            </h1>
                        ) : (
                            <h1 className="text-xl font-bold text-center">
                                Choose one of these recipes:
                            </h1>
                        )}
                    </div>
                    <ul className="mt-4 space-y-2">
                        <Link
                            to="/"
                            className="recipe-item block bg-red-700 text-center font-bold"
                        >
                            Go Back
                        </Link>
                        {recipes.map((recipe, key) => (
                            <li
                                className="recipe-item"
                                key={key}
                                onClick={getRecipe}
                            >
                                {recipe}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}
